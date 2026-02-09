export type ProjectType = 'novel' | 'manga' | 'photobook' | 'graphic_novel' | 'comic';

export type TaskType = "image" | "video" | "text" | "audio";
export type TaskStatus = "queued" | "running" | "completed" | "failed";
export type WorkspaceMode = 'create' | 'refine' | 'compose';

export interface TaskParams {
  model: string;
  aspectRatio?: string;
  imageSize?: "1K" | "2K" | "4K";
  durationSec?: number;
  thinkingBudget?: number;
  grounding?: boolean;
  context?: any; // To pass specific character/location data
}

export interface TaskOutput {
  id: string;
  kind: "image" | "video" | "text" | "audio";
  url?: string;
  text?: string;
  thumbnailUrl?: string;
  data?: any; // For structured JSON responses
}

export interface Task {
  id: string;
  type: TaskType;
  status: TaskStatus;
  prompt: string;
  params: TaskParams;
  output?: TaskOutput;
  createdAt: number;
}

export interface ProjectSettings {
  trimWidth: number;
  trimHeight: number;
  orientation: 'portrait' | 'landscape';
}

export interface Character {
  id: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting';
  description: string;
  visualPrompt: string;
  avatarUrl?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  visualPrompt: string;
  imageUrl?: string;
}

export interface IPBible {
  title: string;
  logline: string;
  genre: string;
  characters: Character[];
  locations: Location[];
  plotOutline: string[]; 
  styleGuide: string;
}

export interface CanvasLayer {
  id: string;
  type: 'text' | 'image';
  content: string; 
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  style?: Record<string, any>;
}

export interface Page {
  id: string;
  number: number;
  layers: CanvasLayer[];
  thumbnailUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  settings: ProjectSettings;
  bible: IPBible;
  pages: Record<string, Page>;
  activePageId: string;
}

export type ToolType = 'select' | 'text' | 'image' | 'hand';

export interface Asset {
  id: string;
  url: string;
  type: 'upload' | 'ai';
  prompt?: string;
  meta?: any;
}