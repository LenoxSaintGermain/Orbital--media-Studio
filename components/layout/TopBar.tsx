import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { Layout, Palette, PenTool, BookOpen, UserCircle } from 'lucide-react';
import { WorkspaceMode } from '../../types';

export const TopBar: React.FC = () => {
  const { ui, setMode, project } = useAppStore();

  const modes: { id: WorkspaceMode; label: string; icon: any }[] = [
    { id: 'create', label: 'Feed', icon: Palette },
    { id: 'refine', label: 'Bible', icon: BookOpen },
    { id: 'compose', label: 'Canvas', icon: Layout },
  ];

  return (
    <div className="h-14 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 text-neutral-300 z-50 relative">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center font-bold text-white font-heading text-lg">
          O
        </div>
        <div>
           <h1 className="font-heading font-bold text-white leading-tight">Orbital Studio</h1>
           <p className="text-[10px] text-neutral-500 font-mono tracking-wider">{project.title}</p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center bg-neutral-950 p-1 rounded-full border border-neutral-800/50">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              ui.mode === m.id 
                ? 'bg-neutral-800 text-white shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <m.icon size={14} />
            {m.label}
          </button>
        ))}
      </div>

      {/* User */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-white font-medium">Demo User</p>
          <p className="text-[10px] text-neutral-500">Pro Plan</p>
        </div>
        <UserCircle className="text-neutral-400 hover:text-white cursor-pointer" size={28} />
      </div>
    </div>
  );
};