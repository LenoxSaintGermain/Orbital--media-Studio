import React, { useRef, useEffect, useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { CanvasLayer } from '../../types';
import { ContextualToolbar } from '../compose/ContextualToolbar';

export const PageCanvas: React.FC = () => {
  const { project, ui, updateLayer, addLayerToActivePage, setSelectedLayerId } = useAppStore();
  const page = project.pages[project.activePageId];
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [dragState, setDragState] = useState<{ id: string, startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  // If not in compose mode, don't show the canvas (Feed shows instead)
  if (ui.mode !== 'compose') return null;

  // Calculate pixel dimensions based on DPI (96) and zoom
  const DPI = 96;
  const widthPx = project.settings.trimWidth * DPI;
  const heightPx = project.settings.trimHeight * DPI;
  const scale = ui.zoom / 100;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const assetUrl = e.dataTransfer.getData('assetUrl');

    if (assetUrl && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate position relative to canvas, accounting for zoom
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      const newLayer: CanvasLayer = {
        id: `img_${Date.now()}`,
        type: 'image',
        content: assetUrl,
        x: x - 100, // Center approx
        y: y - 100,
        width: 200,
        height: 200,
        rotation: 0,
        style: { opacity: 1 }
      };
      addLayerToActivePage(newLayer);
      setSelectedLayerId(newLayer.id);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.stopPropagation(); // Prevent background click
    if (ui.activeTool === 'select') {
        setSelectedLayerId(layerId);
        
        const layer = page.layers.find(l => l.id === layerId);
        if (!layer) return;

        setDragState({
            id: layerId,
            startX: e.clientX,
            startY: e.clientY,
            initialX: layer.x,
            initialY: layer.y
        });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
     if (e.target === e.currentTarget && ui.activeTool === 'select') {
         setSelectedLayerId(null);
     }

     if (ui.activeTool === 'text' && containerRef.current) {
         const rect = containerRef.current.getBoundingClientRect();
         const x = (e.clientX - rect.left) / scale;
         const y = (e.clientY - rect.top) / scale;
         
         const newLayer: CanvasLayer = {
             id: `txt_${Date.now()}`,
             type: 'text',
             content: 'Double click to edit',
             x,
             y,
             width: 200,
             height: 50,
             rotation: 0,
             style: { fontFamily: 'Libre Baskerville', fontSize: '16px', color: '#000000' }
         };
         addLayerToActivePage(newLayer);
         setSelectedLayerId(newLayer.id);
     }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState) {
        const deltaX = (e.clientX - dragState.startX) / scale;
        const deltaY = (e.clientY - dragState.startY) / scale;
        updateLayer(dragState.id, {
          x: dragState.initialX + deltaX,
          y: dragState.initialY + deltaY
        });
      }
    };

    const handleMouseUp = () => {
      setDragState(null);
    };

    if (dragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, scale, updateLayer]);

  return (
    <div className="flex-1 bg-neutral-200 overflow-auto flex items-center justify-center relative shadow-inner p-8">
      
      {/* Contextual Toolbar Logic is internal to itself, checking state */}
      <ContextualToolbar />

      {/* Canvas DOM Element */}
      <div 
        ref={containerRef}
        className="bg-white relative shadow-2xl transition-transform duration-200 ease-out"
        style={{
          width: widthPx,
          height: heightPx,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          cursor: ui.activeTool === 'text' ? 'text' : 'default'
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseDown={handleCanvasClick}
      >
        {/* Render Layers */}
        {page.layers.map((layer) => (
          <div
            key={layer.id}
            onMouseDown={(e) => handleMouseDown(e, layer.id)}
            className={`absolute group hover:ring-1 hover:ring-primary-500 ${ui.selectedLayerId === layer.id ? 'ring-2 ring-primary-500' : ''} ${ui.activeTool === 'select' ? 'cursor-move' : ''}`}
            style={{
              left: layer.x,
              top: layer.y,
              width: layer.width,
              height: layer.height,
              transform: `rotate(${layer.rotation}deg)`,
              ...layer.style // Apply style props like opacity, filter directly to wrapper or element?
            }}
          >
            {layer.type === 'image' && (
              <img 
                src={layer.content} 
                alt="layer" 
                className="w-full h-full object-cover pointer-events-none select-none" 
                style={layer.style} // Apply filters here
              />
            )}
            {layer.type === 'text' && (
              <div 
                className="w-full h-full p-2 outline-none"
                style={layer.style} // Fonts/Colors applied here
                contentEditable={ui.activeTool === 'select'}
                suppressContentEditableWarning
                onBlur={(e) => updateLayer(layer.id, { content: e.currentTarget.innerText })}
              >
                {layer.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};