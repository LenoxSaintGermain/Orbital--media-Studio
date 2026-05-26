import { create } from 'zustand';
import { Project, ToolType, WorkspaceMode, Asset, CanvasLayer, Task, TaskType, TaskParams, IPBible } from '../types';
import { GeminiService } from '../services/gemini';

type RightPanelType = 'chat' | 'image-gen' | 'bible';

interface AppState {
  project: Project;
  ui: {
    activeTool: ToolType;
    mode: WorkspaceMode;
    sidebarOpen: boolean;
    zoom: number;
    activeTaskId: string | null;
    selectedLayerId: string | null;
    activePanel: RightPanelType;
    isGenerating: boolean;
  };
  tasks: Task[];
  assets: Asset[];
  
  // UI Actions
  setTool: (tool: ToolType) => void;
  setMode: (mode: WorkspaceMode) => void;
  toggleSidebar: () => void;
  setZoom: (zoom: number) => void;
  setActiveTaskId: (id: string | null) => void;
  setSelectedLayerId: (id: string | null) => void;
  setPanel: (panel: RightPanelType) => void;
  setGenerating: (isGenerating: boolean) => void;

  // Project Actions
  updateProject: (updates: Partial<Project>) => void;
  updateBible: (updates: Partial<IPBible>) => void;
  addCharacter: (char: any) => void;
  addLocation: (loc: any) => void;
  
  setActivePageId: (pageId: string) => void;
  addLayerToActivePage: (layer: CanvasLayer) => void;
  updateLayer: (layerId: string, updates: Partial<CanvasLayer>) => void;
  deleteLayer: (layerId: string) => void;
  
  // Asset/Task Actions
  addAsset: (asset: Asset) => void;
  createTask: (type: TaskType, prompt: string, params: TaskParams) => Promise<void>;
  createStudioTask: (type: 'character' | 'location' | 'plot', prompt: string) => Promise<void>;
}

const initialProject: Project = {
  id: 'proj_1',
  title: 'Untitled Project',
  type: 'graphic_novel',
  settings: { trimWidth: 6, trimHeight: 9, orientation: 'portrait' },
  bible: {
    title: 'Untitled Project',
    logline: '',
    genre: 'Fantasy',
    characters: [],
    locations: [],
    plotOutline: [],
    styleGuide: 'Cinematic, detailed, 4k',
  },
  pages: {
    'p1': { id: 'p1', number: 1, layers: [] },
  },
  activePageId: 'p1'
};

export const useAppStore = create<AppState>((set, get) => ({
  project: initialProject,
  ui: {
    activeTool: 'select',
    mode: 'create',
    sidebarOpen: true,
    zoom: 100,
    activeTaskId: null,
    selectedLayerId: null,
    activePanel: 'chat',
    isGenerating: false,
  },
  tasks: [],
  assets: [],

  setTool: (tool) => set((state) => ({ ui: { ...state.ui, activeTool: tool } })),
  setMode: (mode) => set((state) => ({ ui: { ...state.ui, mode } })),
  toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
  setZoom: (zoom) => set((state) => ({ ui: { ...state.ui, zoom } })),
  setActiveTaskId: (id) => set((state) => ({ ui: { ...state.ui, activeTaskId: id } })),
  setSelectedLayerId: (id) => set((state) => ({ ui: { ...state.ui, selectedLayerId: id } })),
  setPanel: (panel) => set((state) => ({ ui: { ...state.ui, activePanel: panel } })),
  setGenerating: (isGenerating) => set((state) => ({ ui: { ...state.ui, isGenerating } })),

  addAsset: (asset) => set((state) => ({ assets: [asset, ...state.assets] })),

  updateProject: (updates) => set((state) => ({ project: { ...state.project, ...updates } })),
  
  updateBible: (updates) => set((state) => ({
      project: {
          ...state.project,
          bible: { ...state.project.bible, ...updates }
      }
  })),

  addCharacter: (char) => set((state) => ({
      project: {
          ...state.project,
          bible: {
              ...state.project.bible,
              characters: [...state.project.bible.characters, char]
          }
      }
  })),

  addLocation: (loc) => set((state) => ({
      project: {
          ...state.project,
          bible: {
              ...state.project.bible,
              locations: [...state.project.bible.locations, loc]
          }
      }
  })),

  setActivePageId: (pageId) => set((state) => ({ project: { ...state.project, activePageId: pageId } })),

  addLayerToActivePage: (layer) => set((state) => {
    const pageId = state.project.activePageId;
    const currentLayers = state.project.pages[pageId].layers;
    return {
      project: {
        ...state.project,
        pages: {
          ...state.project.pages,
          [pageId]: { ...state.project.pages[pageId], layers: [...currentLayers, layer] }
        }
      }
    };
  }),

  updateLayer: (layerId, updates) => set((state) => {
    const pageId = state.project.activePageId;
    const layers = state.project.pages[pageId].layers.map(l => 
      l.id === layerId ? { ...l, ...updates } : l
    );
    return {
      project: {
        ...state.project,
        pages: {
          ...state.project.pages,
          [pageId]: { ...state.project.pages[pageId], layers }
        }
      }
    };
  }),

  deleteLayer: (layerId) => set((state) => {
    const pageId = state.project.activePageId;
    const layers = state.project.pages[pageId].layers.filter(l => l.id !== layerId);
    return {
      project: {
        ...state.project,
        pages: {
          ...state.project.pages,
          [pageId]: { ...state.project.pages[pageId], layers }
        }
      },
      ui: { ...state.ui, selectedLayerId: null }
    };
  }),

  createTask: async (type, prompt, params) => {
    const taskId = `task_${Date.now()}`;
    const newTask: Task = {
      id: taskId,
      type,
      status: 'queued',
      prompt,
      params,
      createdAt: Date.now()
    };

    set(state => ({ tasks: [newTask, ...state.tasks], ui: { ...state.ui, activeTaskId: taskId } }));

    try {
      set(state => ({ tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'running' } : t) }));
      
      let output: any = null;

      if (type === 'image') {
        const url = await GeminiService.generateImage(prompt, params);
        output = { id: `out_${taskId}`, kind: 'image', url };
      } 
      else if (type === 'video') {
        const url = await GeminiService.generateVideo(prompt, params);
        output = { id: `out_${taskId}`, kind: 'video', url };
      }
      else if (type === 'text') {
        const text = await GeminiService.chat(prompt, params);
        output = { id: `out_${taskId}`, kind: 'text', text };
      }
      else if (type === 'audio') {
         output = { id: `out_${taskId}`, kind: 'audio', text: 'Audio generated' };
      }

      set(state => {
          const updatedTasks = state.tasks.map(t => t.id === taskId ? { ...t, status: 'completed' as const, output } : t);
          const newAsset = output?.url ? { id: `asset_${taskId}`, url: output.url, type: 'ai' as const, prompt } : null;
          return {
              tasks: updatedTasks,
              assets: newAsset ? [newAsset, ...state.assets] : state.assets
          };
      });

    } catch (error) {
      console.error(error);
      set(state => ({ tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'failed' } : t) }));
    }
  },

  createStudioTask: async (type, prompt) => {
      const state = get();
      const taskId = `studio_${Date.now()}`;
      // Add a loading task
      set(state => ({ tasks: [{ id: taskId, type: 'text', status: 'running', prompt: `Generating ${type}...`, params: { model: 'gemini-flash-latest' }, createdAt: Date.now() }, ...state.tasks] }));

      const result = await GeminiService.generateBibleAsset(type, prompt, state.project.bible);
      
      if (result) {
          if (type === 'character') state.addCharacter({ ...result, id: `char_${Date.now()}` });
          if (type === 'location') state.addLocation({ ...result, id: `loc_${Date.now()}` });
          if (type === 'plot') state.updateBible({ plotOutline: result.outline });
          
          set(state => ({ tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'completed', output: { id: `out_${taskId}`, kind: 'text', text: 'Asset added to Bible.' } } : t) }));
      } else {
          set(state => ({ tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'failed' } : t) }));
      }
  }
}));
