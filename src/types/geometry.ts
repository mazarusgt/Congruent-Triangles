export type CongruenceConditionId = 'SAS' | 'ASA' | 'AAS' | 'SSS' | 'RHS';

export interface SideMarkDefinition {
  p1: [number, number];
  p2: [number, number];
  count: number;
}

export interface CongruenceCondition {
  id: CongruenceConditionId;
  thaiName: string;
  thaiAbbr: string;
  englishName: string;
  category: 'sides' | 'angles' | 'special';
  summary: string;
  criteria: string[];
  memoryTrick: string;
  dangerPitfall: string;
  correspondingElements: {
    sides: string[];
    angles: string[];
  };
  svgData: {
    t1: { points: string; labels: { x: number; y: number; text: string }[] };
    t2: { points: string; labels: { x: number; y: number; text: string }[] };
    sideMarks: {
      t1Marks: SideMarkDefinition[];
      t2Marks: SideMarkDefinition[];
      t1Lines?: { x1: number; y1: number; x2: number; y2: number; count?: number }[];
      t2Lines?: { x1: number; y1: number; x2: number; y2: number; count?: number }[];
    };
    angleMarks: {
      t1Arcs: { cx: number; cy: number; r: number; startAngle: number; endAngle: number; isRight?: boolean; count?: number }[];
      t2Arcs: { cx: number; cy: number; r: number; startAngle: number; endAngle: number; isRight?: boolean; count?: number }[];
    };
  };
}

export interface MindMapNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  sectionId?: string;
  iconName: string;
  level: number;
  children?: MindMapNode[];
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  contextText?: string;
  diagramType: 'SAS' | 'ASA' | 'AAS' | 'SSS' | 'RHS' | 'SSA_FAIL' | 'ISOSCELES' | 'PARALLELOGRAM' | 'MISSING_ANGLE';
  svgRenderInfo?: {
    title: string;
    description: string;
  };
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  hint: string;
  explanation: string;
}

export type SimulatorShapeType = 'arrows' | 'drops' | 'triangles' | 'non_congruent';
