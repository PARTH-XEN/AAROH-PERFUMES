export interface Manifest {
  count: number;
  pattern: string;
  aspectRatio: number;
  width: number;
  height: number;
}

export interface NoteDetail {
  title: string;
  subtitle: string;
  ingredients: string[];
  description: string;
  characteristics: string;
}

export type OlfactoryTier = 'opening' | 'heart' | 'base';
