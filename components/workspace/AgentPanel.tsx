import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { Sparkles, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export const AgentPanel: React.FC = () => {
  const { ui, project, createStudioTask } = useAppStore();
  
  if (!ui.sidebarOpen) return null;

  const { bible } = project;
  
  // Simple "Agent" logic to determine suggestions
  const suggestions = [];
  
  if (!bible.logline) {
      suggestions.push({
          label: "Draft Logline",
          action: () => createStudioTask('text' as any, 'Draft a compelling logline for this project') // Handled loosely for now
      });
  }
  
  if (bible.characters.length === 0) {
      suggestions.push({
          label: "Create Protagonist",
          action: () => createStudioTask('character', 'Create a compelling protagonist')
      });
  } else if (bible.characters.length < 2) {
      suggestions.push({
          label: "Create Antagonist",
          action: () => createStudioTask('character', 'Create an antagonist that challenges the protagonist')
      });
  }

  if (bible.locations.length === 0) {
      suggestions.push({
          label: "Establish Setting",
          action: () => createStudioTask('location', 'Create the main setting location')
      });
  }

  if (bible.plotOutline.length === 0 && bible.characters.length > 0) {
      suggestions.push({
          label: "Generate Plot Outline",
          action: () => createStudioTask('plot', 'Create a plot outline')
      });
  }

  return (
    <div className="w-80 bg-white border-l border-neutral-200 flex flex-col h-full z-20 shadow-xl">
      <div className="p-4 border-b border-neutral-100 bg-neutral-50">
        <h2 className="font-heading font-bold text-neutral-800 flex items-center gap-2">
            <Sparkles className="text-primary-500" size={16} />
            Studio Director
        </h2>
        <p className="text-xs text-neutral-500 mt-1">Guiding your project from concept to completion.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        
        {/* Project Health / Status */}
        <div className="mb-8">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Project Checklist</h3>
            <div className="space-y-3">
                <StatusItem label="Core Concept" complete={!!bible.title && !!bible.logline} />
                <StatusItem label="Cast of Characters" complete={bible.characters.length >= 2} />
                <StatusItem label="World Building" complete={bible.locations.length >= 1} />
                <StatusItem label="Story Arc" complete={bible.plotOutline.length > 0} />
            </div>
        </div>

        {/* Actionable Suggestions */}
        {suggestions.length > 0 && (
            <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Suggested Actions</h3>
                <div className="space-y-3">
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={s.action}
                            className="w-full text-left p-3 rounded-xl border border-primary-100 bg-primary-50 hover:bg-primary-100 transition-colors group"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-primary-900">{s.label}</span>
                                <ArrowRight size={14} className="text-primary-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-xs text-primary-700 mt-1 opacity-80">Gemini will draft this for you.</p>
                        </button>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

const StatusItem = ({ label, complete }: { label: string, complete: boolean }) => (
    <div className="flex items-center gap-3">
        {complete ? (
            <CheckCircle2 size={16} className="text-green-500" />
        ) : (
            <Circle size={16} className="text-neutral-300" />
        )}
        <span className={`text-sm ${complete ? 'text-neutral-900 font-medium' : 'text-neutral-500'}`}>{label}</span>
    </div>
);