import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { 
  Trash2, Type, Image as ImageIcon, RotateCw, 
  Move, Bold, Italic, Palette, Sliders, Upload
} from 'lucide-react';

export const ContextualToolbar: React.FC = () => {
  const { project, ui, updateLayer, deleteLayer } = useAppStore();
  const selectedLayerId = ui.selectedLayerId;
  
  if (!selectedLayerId) return null;

  const page = project.pages[project.activePageId];
  const layer = page.layers.find(l => l.id === selectedLayerId);

  if (!layer) return null;

  const handleStyleChange = (key: string, value: any) => {
    updateLayer(layer.id, {
      style: {
        ...layer.style,
        [key]: value
      }
    });
  };

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLayer(layer.id, { rotation: parseInt(e.target.value) || 0 });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateLayer(layer.id, { content: url });
    }
  };

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-neutral-200 p-2 flex items-center gap-4 z-50 animate-in fade-in slide-in-from-top-4">
      
      {/* Type Indicator */}
      <div className="flex items-center gap-2 px-2 border-r border-neutral-200 text-neutral-400">
        {layer.type === 'text' ? <Type size={16} /> : <ImageIcon size={16} />}
        <span className="text-xs font-medium uppercase tracking-wider">{layer.type}</span>
      </div>

      {/* Common: Transformation */}
      <div className="flex items-center gap-2 border-r border-neutral-200 pr-4">
        <div className="flex items-center gap-1" title="Rotation">
          <RotateCw size={14} className="text-neutral-400" />
          <input 
            type="number" 
            value={layer.rotation} 
            onChange={handleRotationChange}
            className="w-12 bg-neutral-100 border border-neutral-200 rounded px-1 text-xs py-1"
          />
        </div>
      </div>

      {/* Text Specific */}
      {layer.type === 'text' && (
        <div className="flex items-center gap-2 border-r border-neutral-200 pr-4">
           {/* Font Family */}
           <select 
             value={layer.style?.fontFamily || 'Inter'}
             onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
             className="w-24 bg-neutral-100 border border-neutral-200 rounded px-1 text-xs py-1 outline-none"
           >
             <option value="Inter">Inter</option>
             <option value="Libre Baskerville">Serif</option>
             <option value="JetBrains Mono">Mono</option>
             <option value="Plus Jakarta Sans">Sans</option>
             <option value="cursive">Handwriting</option>
           </select>

           {/* Font Size */}
           <input 
             type="number"
             value={parseInt(layer.style?.fontSize) || 16}
             onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
             className="w-12 bg-neutral-100 border border-neutral-200 rounded px-1 text-xs py-1"
           />

           {/* Color */}
           <div className="relative group">
              <div 
                className="w-6 h-6 rounded border border-neutral-300 cursor-pointer"
                style={{ backgroundColor: layer.style?.color || '#000000' }}
              />
              <input 
                type="color"
                value={layer.style?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
           </div>

           {/* Toggles */}
           <button 
             onClick={() => handleStyleChange('fontWeight', layer.style?.fontWeight === 'bold' ? 'normal' : 'bold')}
             className={`p-1 rounded hover:bg-neutral-100 ${layer.style?.fontWeight === 'bold' ? 'bg-neutral-200 text-black' : 'text-neutral-500'}`}
           >
             <Bold size={14} />
           </button>
           <button 
             onClick={() => handleStyleChange('fontStyle', layer.style?.fontStyle === 'italic' ? 'normal' : 'italic')}
             className={`p-1 rounded hover:bg-neutral-100 ${layer.style?.fontStyle === 'italic' ? 'bg-neutral-200 text-black' : 'text-neutral-500'}`}
           >
             <Italic size={14} />
           </button>
        </div>
      )}

      {/* Image Specific */}
      {layer.type === 'image' && (
        <div className="flex items-center gap-4 border-r border-neutral-200 pr-4">
            
            {/* Opacity */}
            <div className="flex items-center gap-2">
                <Sliders size={14} className="text-neutral-400" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={layer.style?.opacity !== undefined ? layer.style.opacity : 1}
                    onChange={(e) => handleStyleChange('opacity', parseFloat(e.target.value))}
                    className="w-20 accent-primary-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Filter */}
            <select 
                value={layer.style?.filter || 'none'}
                onChange={(e) => handleStyleChange('filter', e.target.value)}
                className="bg-neutral-100 border border-neutral-200 rounded px-2 text-xs py-1 outline-none"
            >
                <option value="none">Normal</option>
                <option value="grayscale(100%)">B&W</option>
                <option value="sepia(100%)">Sepia</option>
                <option value="blur(2px)">Blur</option>
                <option value="contrast(150%)">High Contrast</option>
            </select>

            {/* Replace */}
            <label className="cursor-pointer text-neutral-500 hover:text-primary-600 flex items-center gap-1 text-xs font-medium">
                <Upload size={14} />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                Replace
            </label>
        </div>
      )}

      {/* Delete */}
      <button 
        onClick={() => deleteLayer(layer.id)}
        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
        title="Delete Layer"
      >
        <Trash2 size={16} />
      </button>

    </div>
  );
};