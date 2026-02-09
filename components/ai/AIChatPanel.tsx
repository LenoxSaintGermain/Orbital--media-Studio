import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { GeminiService } from '../../services/gemini';
import { Send, Bot, Copy, PlusCircle } from 'lucide-react';
import { TaskParams } from '../../types';

export const AIChatPanel: React.FC = () => {
  const { project, ui, setGenerating, addLayerToActivePage } = useAppStore();
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: `Greetings, creator. I have loaded the IP Bible for "${project.title}". How can I help you today?` }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setGenerating(true);

    const activePage = project.pages[project.activePageId];
    // Gather simple context from active page text layers
    const pageContext = activePage.layers
      .filter(l => l.type === 'text')
      .map(l => l.content)
      .join('\n');

    const bibleContext = JSON.stringify(project.bible);

    // Combine context into a single prompt string
    const fullPrompt = `Context from current page:\n${pageContext}\n\nIP Bible Context:\n${bibleContext}\n\nUser Question: ${userMsg}`;
    
    // Default params for chat
    const params: TaskParams = { model: 'gemini-3-pro-preview' };

    const response = await GeminiService.chat(fullPrompt, params);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setGenerating(false);
  };

  const insertText = (text: string) => {
    addLayerToActivePage({
        id: `ai_txt_${Date.now()}`,
        type: 'text',
        content: text,
        x: 50, y: 50, width: 300, height: 100, rotation: 0,
        style: { fontSize: '16px', fontFamily: 'Libre Baskerville' }
    });
  };

  return (
    <div className="flex flex-col h-full bg-white text-neutral-900">
      <div className="p-4 border-b border-neutral-200 flex items-center gap-2">
        <Bot className="text-primary-500" size={20} />
        <h3 className="font-heading font-bold">Orbital AI</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
             <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
               msg.role === 'user' 
                ? 'bg-neutral-900 text-white rounded-br-none' 
                : 'bg-neutral-100 text-neutral-800 rounded-bl-none border border-neutral-200'
             }`}>
               {msg.text}
             </div>
             {msg.role === 'ai' && (
                 <div className="flex gap-2 mt-1">
                     <button onClick={() => insertText(msg.text)} className="text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium">
                        <PlusCircle size={12} /> Insert
                     </button>
                     <button onClick={() => navigator.clipboard.writeText(msg.text)} className="text-xs flex items-center gap-1 text-neutral-500 hover:text-neutral-700">
                        <Copy size={12} /> Copy
                     </button>
                 </div>
             )}
          </div>
        ))}
        {ui.isGenerating && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 p-2">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"/> Thinking...
          </div>
        )}
      </div>

      <div className="p-4 border-t border-neutral-200 bg-neutral-50">
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask about plot, dialogue, or descriptions..."
            className="w-full bg-white border border-neutral-300 rounded-lg p-3 pr-10 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none h-20"
          />
          <button 
            onClick={handleSend}
            disabled={ui.isGenerating}
            className="absolute right-2 bottom-2 p-1.5 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};