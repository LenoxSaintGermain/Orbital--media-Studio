import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { Task } from '../../types';
import { Loader2, PlayCircle, Image as ImageIcon, MessageSquare } from 'lucide-react';

const TaskCard: React.FC<{ task: Task; active: boolean; onClick: () => void }> = ({ task, active, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all border ${
        active ? 'ring-2 ring-primary-500 border-transparent shadow-lg shadow-primary-500/10' : 'border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50'
      }`}
    >
      {/* Content */}
      <div className="aspect-square bg-neutral-900 relative">
        {task.status === 'running' || task.status === 'queued' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500">
            <Loader2 className="animate-spin mb-2" size={24} />
            <span className="text-xs font-mono uppercase tracking-widest">{task.status}</span>
          </div>
        ) : task.output?.url ? (
           task.output.kind === 'video' ? (
             <video src={task.output.url} className="w-full h-full object-cover" muted loop autoPlay />
           ) : (
             <img src={task.output.url} alt="gen" className="w-full h-full object-cover" />
           )
        ) : (
          <div className="p-4 text-sm text-neutral-400 font-serif leading-relaxed">
             {task.output?.text || task.prompt}
          </div>
        )}

        {/* Overlay Icon */}
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md p-1.5 rounded-md text-white/80">
          {task.type === 'image' && <ImageIcon size={14} />}
          {task.type === 'video' && <PlayCircle size={14} />}
          {task.type === 'text' && <MessageSquare size={14} />}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-neutral-900/50 backdrop-blur-sm border-t border-neutral-800">
        <p className="text-xs text-neutral-300 line-clamp-1 font-medium">{task.prompt}</p>
        <p className="text-[10px] text-neutral-500 mt-1 capitalize">{task.type} • {task.params.model.split('-')[0]}</p>
      </div>
    </div>
  );
};

export const Feed: React.FC = () => {
  const { tasks, ui, setActiveTaskId } = useAppStore();

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 p-8">
        <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
          <ImageIcon size={24} className="opacity-20" />
        </div>
        <p className="font-medium">No creations yet</p>
        <p className="text-sm mt-1 max-w-xs text-center text-neutral-600">Enter a prompt below to start creating with Orbital Studio.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            active={ui.activeTaskId === task.id}
            onClick={() => setActiveTaskId(task.id)}
          />
        ))}
      </div>
    </div>
  );
};