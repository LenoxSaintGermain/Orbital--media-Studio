import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { Users, MapPin, Scroll, Plus, Wand2, Image as ImageIcon } from 'lucide-react';
import { Character, Location } from '../../types';

export const BibleDashboard: React.FC = () => {
  const { project, updateBible, createStudioTask, createTask } = useAppStore();
  const { bible } = project;
  const [activeTab, setActiveTab] = useState<'chars' | 'locs' | 'plot'>('chars');

  const handleGenerateVisual = (item: Character | Location, type: 'character' | 'location') => {
      createTask('image', item.visualPrompt, {
          model: 'gemini-3-pro-image-preview',
          aspectRatio: type === 'character' ? '3:4' : '16:9',
          imageSize: '2K'
      });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
            <input 
                value={bible.title}
                onChange={(e) => updateBible({ title: e.target.value })}
                className="text-3xl font-heading font-bold text-neutral-900 w-full outline-none placeholder-neutral-300"
                placeholder="Project Title"
            />
            <div className="mt-4 flex gap-4">
                <input 
                    value={bible.genre}
                    onChange={(e) => updateBible({ genre: e.target.value })}
                    className="bg-neutral-100 px-3 py-1 rounded-md text-sm font-medium text-neutral-600 outline-none"
                    placeholder="Genre (e.g., Sci-Fi)"
                />
                 <input 
                    value={bible.styleGuide}
                    onChange={(e) => updateBible({ styleGuide: e.target.value })}
                    className="flex-1 bg-neutral-100 px-3 py-1 rounded-md text-sm font-medium text-neutral-600 outline-none"
                    placeholder="Visual Style (e.g., Noir, Watercolor)"
                />
            </div>
            <textarea 
                value={bible.logline}
                onChange={(e) => updateBible({ logline: e.target.value })}
                className="mt-4 w-full bg-transparent text-lg text-neutral-600 outline-none resize-none font-serif italic"
                placeholder="Logline: A brief summary of your story..."
                rows={2}
            />
        </div>

        {/* Studio Controls */}
        <div className="flex items-center gap-4 border-b border-neutral-200 pb-1">
            <button onClick={() => setActiveTab('chars')} className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'chars' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500 hover:text-neutral-800'}`}>
                <Users size={18} /> Characters
            </button>
            <button onClick={() => setActiveTab('locs')} className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'locs' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500 hover:text-neutral-800'}`}>
                <MapPin size={18} /> Locations
            </button>
            <button onClick={() => setActiveTab('plot')} className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'plot' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-neutral-500 hover:text-neutral-800'}`}>
                <Scroll size={18} /> Plot
            </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Characters Tab */}
            {activeTab === 'chars' && (
                <>
                    {bible.characters.map((char, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden group">
                            <div className="aspect-[3/2] bg-neutral-100 relative">
                                {char.avatarUrl ? (
                                    <img src={char.avatarUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                                        <Users size={32} opacity={0.2} />
                                    </div>
                                )}
                                <button 
                                    onClick={() => handleGenerateVisual(char, 'character')}
                                    className="absolute bottom-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600"
                                    title="Generate Visual"
                                >
                                    <Wand2 size={14} />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg">{char.name}</h3>
                                    <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded">{char.role}</span>
                                </div>
                                <p className="text-sm text-neutral-500 mt-2 line-clamp-3">{char.description}</p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add New Card */}
                    <button 
                        onClick={() => createStudioTask('character', 'Create a new main character suitable for this story')}
                        className="border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center text-neutral-400 hover:border-primary-500 hover:text-primary-500 transition-colors min-h-[200px]"
                    >
                        <Plus size={32} />
                        <span className="mt-2 font-medium">Generate Character</span>
                    </button>
                </>
            )}

            {/* Locations Tab */}
            {activeTab === 'locs' && (
                <>
                    {bible.locations.map((loc, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden group">
                             <div className="aspect-video bg-neutral-100 relative">
                                <button 
                                    onClick={() => handleGenerateVisual(loc, 'location')}
                                    className="absolute bottom-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600"
                                >
                                    <Wand2 size={14} />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{loc.name}</h3>
                                <p className="text-sm text-neutral-500 mt-2 line-clamp-3">{loc.description}</p>
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={() => createStudioTask('location', 'Create a key location for this story')}
                        className="border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center text-neutral-400 hover:border-primary-500 hover:text-primary-500 transition-colors min-h-[200px]"
                    >
                        <Plus size={32} />
                        <span className="mt-2 font-medium">Generate Location</span>
                    </button>
                </>
            )}
        </div>

        {/* Plot Tab (Full Width) */}
        {activeTab === 'plot' && (
             <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 space-y-6">
                 <div className="flex items-center justify-between">
                     <h3 className="font-heading font-bold text-xl">Story Outline</h3>
                     <button 
                        onClick={() => createStudioTask('plot', 'Outline a 5 chapter arc based on the characters and genre')}
                        className="flex items-center gap-2 text-primary-600 text-sm font-bold hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                     >
                         <Wand2 size={16} /> Auto-Outline
                     </button>
                 </div>
                 {bible.plotOutline.length > 0 ? (
                     <div className="space-y-4">
                         {bible.plotOutline.map((chapter, i) => (
                             <div key={i} className="flex gap-4">
                                 <span className="font-mono text-neutral-400 font-bold pt-1">{String(i + 1).padStart(2, '0')}</span>
                                 <p className="text-neutral-700 leading-relaxed border-b border-neutral-100 pb-4 w-full">{chapter}</p>
                             </div>
                         ))}
                     </div>
                 ) : (
                     <div className="text-center py-12 text-neutral-400">
                         <p>No plot outline yet.</p>
                     </div>
                 )}
             </div>
        )}

      </div>
    </div>
  );
};