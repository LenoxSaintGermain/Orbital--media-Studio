import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { GeminiService } from '../../services/gemini';
import { Sparkles, Image as ImageIcon, Plus } from 'lucide-react';
import { TaskParams } from '../../types';

export const ImageGenPanel: React.FC = () => {
  const { project, ui, setGenerating, addAsset } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGeneratedImage(null);

    // 1. Enhance prompt with style guide
    const enhancedPrompt = await GeminiService.generateImagePrompt(prompt, project.bible.styleGuide);
    
    // 2. Generate
    try {
        const params: TaskParams = {
            model: 'gemini-3-pro-image-preview',
            aspectRatio: '1:1',
            imageSize: '1K'
        };
        const imageUrl = await GeminiService.generateImage(enhancedPrompt, params);
        setGeneratedImage(imageUrl);
        
        // Add to assets immediately
        addAsset({
            id: `ai_${Date.now()}`,
            type: 'ai',
            url: imageUrl,
            prompt: prompt
        });

    } catch (e) {
        console.error(e);
    } finally {
        setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-neutral-900">
      <div className="p-4 border-b border-neutral-200 flex items-center gap-2">
        <Sparkles className="text-accent-500" size={20} />
        <h3 className="font-heading font-bold">Vision Engine</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Input */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase">Prompt</label>
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A cyberpunk street market at night, neon rain..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-accent-500 outline-none h-24 resize-none"
            />
        </div>

        {/* Style Reference (Read-only view) */}
        <div className="space-y-2">
             <label className="text-xs font-bold text-neutral-500 uppercase">Active Style Guide</label>
             <div className="p-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-600 line-clamp-3 italic">
                 {project.bible.styleGuide}
             </div>
        </div>

        <button 
            onClick={handleGenerate}
            disabled={ui.isGenerating || !prompt}
            className="w-full bg-gradient-to-r from-accent-500 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
        >
            {ui.isGenerating ? 'Dreaming...' : 'Generate Image'}
        </button>

        {/* Result */}
        {generatedImage && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                <label className="text-xs font-bold text-neutral-500 uppercase">Result</label>
                <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 group relative">
                    <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">Saved to Assets</span>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};