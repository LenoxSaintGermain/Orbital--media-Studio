import { GoogleGenAI } from "@google/genai";
import { TaskParams, IPBible } from "../types";

// Models
const CHAT_MODEL = 'gemini-3.1-pro-preview';
const FLASH_MODEL = 'gemini-flash-latest';
const IMAGE_MODEL = 'gemini-3-pro-image-preview'; 
const FLASH_IMAGE_MODEL = 'gemini-3.1-flash-image-preview';
const VIDEO_MODEL = 'veo-3.1-fast-generate-preview';
const MAPS_MODEL = 'gemini-flash-latest';

// Helper to get client with fresh key
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper for AI Studio Key Selection
const ensureApiKey = async () => {
    if ((window as any).aistudio) {
        const aistudio = (window as any).aistudio;
        if (!await aistudio.hasSelectedApiKey()) {
            await aistudio.openSelectKey();
        }
    }
};

export const GeminiService = {
  
  async chat(message: string, params: TaskParams) {
    if (!process.env.API_KEY) return "Error: No API Key configured.";
    
    try {
      const ai = getAiClient();
      const model = params.thinkingBudget ? CHAT_MODEL : FLASH_MODEL;
      const tools = [];
      
      if (params.grounding) {
          tools.push({ googleSearch: {} });
      }

      const config: any = {
        tools: tools.length > 0 ? tools : undefined
      };

      if (params.thinkingBudget) {
          config.thinkingConfig = { thinkingBudget: params.thinkingBudget };
      }

      const response = await ai.models.generateContent({
        model: model,
        contents: message,
        config: config
      });
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      let text = response.text || "";
      
      if (groundingChunks) {
          const sources = groundingChunks
            .map((c: any) => c.web?.uri ? `[${c.web.title}](${c.web.uri})` : null)
            .filter(Boolean)
            .join('\n');
          if (sources) text += `\n\n**Sources:**\n${sources}`;
      }

      return text;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "Error connecting to Gemini.";
    }
  },

  // Structured Generation for Studio Tools
  async generateBibleAsset(type: 'character' | 'location' | 'plot', context: string, currentBible: IPBible) {
    if (!process.env.API_KEY) throw new Error("No API Key");

    const prompt = `
      You are a creative director for a graphic novel studio.
      Task: Create a ${type} based on this request: "${context}".
      Current Project Context: Title: ${currentBible.title}, Genre: ${currentBible.genre}, Style: ${currentBible.styleGuide}.
      
      Return ONLY a JSON object with the following structure:
      ${type === 'character' ? '{ "name": "string", "role": "protagonist|antagonist|supporting", "description": "string", "visualPrompt": "detailed visual description for image generator" }' : ''}
      ${type === 'location' ? '{ "name": "string", "description": "string", "visualPrompt": "detailed visual description for image generator" }' : ''}
      ${type === 'plot' ? '{ "outline": ["chapter 1 summary", "chapter 2 summary", ...] }' : ''}
    `;

    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: FLASH_MODEL,
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error("Bible Asset Gen Error", e);
        return null;
    }
  },

  async generateImagePrompt(basePrompt: string, styleGuide: string) {
    if (!process.env.API_KEY) return basePrompt;
    try {
        const ai = getAiClient();
        const prompt = `Rewrite this image prompt to be more descriptive and follow this style guide: "${styleGuide}". 
        Original prompt: "${basePrompt}".
        Output only the new prompt.`;
        
        const response = await ai.models.generateContent({
            model: FLASH_MODEL,
            contents: prompt
        });
        return response.text || basePrompt;
    } catch (e) {
        console.error("Prompt Enhancement Error:", e);
        return basePrompt;
    }
  },

  async generateImage(prompt: string, params: TaskParams) {
    // Check key for Pro model
    if (params.model === IMAGE_MODEL || params.imageSize === '2K' || params.imageSize === '4K') {
        await ensureApiKey();
    }
    
    if (!process.env.API_KEY) throw new Error("No API Key");

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: params.model || IMAGE_MODEL,
        contents: prompt,
        config: {
           imageConfig: {
               aspectRatio: params.aspectRatio || "1:1",
               imageSize: params.imageSize || "1K"
           }
        }
      });

      const candidates = response.candidates;
      if (candidates && candidates[0].content.parts) {
        for (const part of candidates[0].content.parts) {
             if (part.inlineData && part.inlineData.data) {
                 return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
             }
        }
      }
      return `https://picsum.photos/seed/${encodeURIComponent(prompt.slice(0,10))}/1024/1024`;
    } catch (error) {
      console.error("Image Gen Error:", error);
      throw error;
    }
  },

  async generateVideo(prompt: string, params: TaskParams) {
      // Veo always requires key selection
      await ensureApiKey();
      
      if (!process.env.API_KEY) throw new Error("No API Key");
      
      // Mocking video gen for demo responsiveness, replace with actual Veo call below when ready
      return new Promise<string>((resolve) => {
          setTimeout(() => {
              resolve("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
          }, 4000); 
      });

      /* 
      const ai = getAiClient();
      let operation = await ai.models.generateVideos({
        model: VIDEO_MODEL,
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            aspectRatio: params.aspectRatio === "9:16" ? "9:16" : "16:9",
        }
      });
      // ... poll operation ...
      */
  },

  async getMapsInfo(query: string) {
      if (!process.env.API_KEY) return "No API Key";
      try {
          const ai = getAiClient();
          const response = await ai.models.generateContent({
              model: MAPS_MODEL,
              contents: query,
              config: { tools: [{ googleMaps: {} }] }
          });
          return response.text;
      } catch (e) {
          return "Maps error";
      }
  }
};
