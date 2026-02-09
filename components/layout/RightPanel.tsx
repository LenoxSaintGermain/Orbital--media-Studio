import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { AIChatPanel } from '../ai/AIChatPanel';
import { ImageGenPanel } from '../ai/ImageGenPanel';
import { MessageSquare, Image, Book } from 'lucide-react';

export const RightPanel: React.FC = () => {
  const { ui, setPanel } = useAppStore();
  const { activePanel } = ui;

  return (
    <div className="w-80 border-l border-neutral-200 bg-white flex flex-col h-full shadow-xl z-10">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-neutral-200">
        <button 
          onClick={() => setPanel('chat')}
          className={`flex-1 py-3 text-sm font-medium flex justify-center items-center gap-2 border-b-2 transition-colors ${activePanel === 'chat' ? 'border-primary-500 text-primary-600' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
        >
          <MessageSquare size={16} /> Assistant
        </button>
        <button 
          onClick={() => setPanel('image-gen')}
          className={`flex-1 py-3 text-sm font-medium flex justify-center items-center gap-2 border-b-2 transition-colors ${activePanel === 'image-gen' ? 'border-accent-500 text-accent-600' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
        >
          <Image size={16} /> Image Gen
        </button>
        <button 
          onClick={() => setPanel('bible')}
          className={`flex-1 py-3 text-sm font-medium flex justify-center items-center gap-2 border-b-2 transition-colors ${activePanel === 'bible' ? 'border-neutral-800 text-neutral-900' : 'border-transparent text-neutral-500 hover:bg-neutral-50'}`}
        >
          <Book size={16} /> IP Bible
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activePanel === 'chat' && <AIChatPanel />}
        {activePanel === 'image-gen' && <ImageGenPanel />}
        {activePanel === 'bible' && (
            <div className="p-6 text-center text-neutral-500 mt-10">
                <Book size={48} className="mx-auto mb-4 opacity-20" />
                <h3 className="font-bold text-neutral-800">IP Bible</h3>
                <p className="text-sm mt-2">World rules, characters, and plot outlines are managed here.</p>
                <div className="mt-8 text-xs text-left bg-neutral-50 p-4 rounded border border-neutral-200">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(useAppStore.getState().project.bible, null, 2)}</pre>
                </div>
            </div>
        )}
      </div>

    </div>
  );
};