import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { Sparkles, Send, Mic, Image as ImageIcon, Video } from 'lucide-react';
import { TaskType, TaskParams } from '../../types';

export const BottomDock: React.FC = () => {
  const { createTask, ui } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [activeType, setActiveType] = useState<TaskType>('image');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    // Default Params based on type
    const params: TaskParams = {
        model: activeType === 'image' ? 'gemini-3-pro-image-preview' : 'veo-3.1-fast-generate-preview',
        aspectRatio: '16:9',
        imageSize: '2K'
    };
    
    // Switch to simpler model if text
    if (activeType === 'text') params.model = 'gemini-3-pro-preview';

    createTask(activeType, prompt, params);
    setPrompt('');
  };

  if (ui.mode === 'compose') return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40">
      <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 shadow-2xl rounded-2xl p-2 flex flex-col gap-2">
        
        {/* Type Switcher */}
        <div className="flex items-center gap-1 px-2">
           <button onClick={() => setActiveType('image')} className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'image' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}>Image</button>
           <button onClick={() => setActiveType('video')} className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'video' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}>Video</button>
           <button onClick={() => setActiveType('text')} className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'text' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}>Chat</button>
        </div>

        <div className="flex items-end gap-2 bg-neutral-950/50 rounded-xl p-2 border border-neutral-800">
           <button className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors">
             <ImageIcon size={20} />
           </button>
           
           <textarea
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
             placeholder={`Describe the ${activeType} you want to create...`}
             className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-neutral-500 resize-none py-2 max-h-32"
             rows={1}
             style={{ minHeight: '40px' }}
           />

           <div className="flex items-center gap-1">
             <button className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors">
               <Mic size={20} />
             </button>
             <button 
               onClick={handleSubmit}
               disabled={!prompt.trim()}
               className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20"
             >
               <Send size={18} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};