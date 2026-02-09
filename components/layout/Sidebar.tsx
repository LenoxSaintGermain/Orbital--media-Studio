import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { Layers, BookOpen, Library, FileText, ChevronRight, Plus } from 'lucide-react';
import { Page } from '../../types';

export const Sidebar: React.FC = () => {
  const { project, ui, setActivePageId, addAsset, assets } = useAppStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addAsset({
        id: `upload_${Date.now()}`,
        type: 'upload',
        url: url
      });
    }
  };

  if (!ui.sidebarOpen) return null;

  return (
    <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-full text-neutral-300">
      
      {/* Project Header */}
      <div className="p-4 border-b border-neutral-800">
        <h2 className="font-heading font-bold text-white truncate">{project.title}</h2>
        <p className="text-xs text-neutral-500 uppercase mt-1 tracking-wider">{project.type}</p>
      </div>

      {/* Tabs / Sections */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        
        {/* Pages Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <FileText size={14} /> Pages
            </h3>
            <button className="text-neutral-500 hover:text-white"><Plus size={14} /></button>
          </div>
          
          <div className="space-y-2">
            {(Object.values(project.pages) as Page[]).sort((a,b) => a.number - b.number).map((page) => (
              <div 
                key={page.id}
                onClick={() => setActivePageId(page.id)}
                className={`group flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${project.activePageId === page.id ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' : 'hover:bg-neutral-800'}`}
              >
                <div className="w-8 h-10 bg-white rounded-sm flex items-center justify-center text-neutral-900 text-[10px] shadow-sm font-serif">
                   {page.layers.length > 0 ? 'Aa' : ''}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">Page {page.number}</span>
                  <p className="text-[10px] text-neutral-500">{page.layers.length} layers</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assets Section */}
        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <Library size={14} /> Assets
            </h3>
            <label className="text-neutral-500 hover:text-white cursor-pointer">
              <Plus size={14} />
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {assets.map(asset => (
              <div 
                key={asset.id} 
                className="aspect-square bg-neutral-800 rounded-md overflow-hidden hover:ring-1 hover:ring-primary-500 cursor-grab active:cursor-grabbing"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('assetId', asset.id);
                  e.dataTransfer.setData('assetUrl', asset.url);
                }}
              >
                <img src={asset.url} alt="asset" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};