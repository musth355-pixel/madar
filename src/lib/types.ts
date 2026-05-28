export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export const GRADE_LABELS: Record<Grade, string> = {
  1: 'الصف الأول الابتدائي',
  2: 'الصف الثاني الابتدائي',
  3: 'الصف الثالث الابتدائي',
  4: 'الصف الرابع الابتدائي',
  5: 'الصف الخامس الابتدائي',
  6: 'الصف السادس الابتدائي',
};

export const INTERESTS = [
  { id: 'space',    label: 'الفضاء',       icon: '🚀' },
  { id: 'animals',  label: 'الحيوانات',    icon: '🦁' },
  { id: 'sports',   label: 'الرياضة',      icon: '⚽' },
  { id: 'art',      label: 'الرسم',        icon: '🎨' },
  { id: 'stories',  label: 'القصص',        icon: '📚' },
  { id: 'music',    label: 'الموسيقى',     icon: '🎵' },
  { id: 'cooking',  label: 'الطبخ',        icon: '🍳' },
  { id: 'games',    label: 'الألعاب',      icon: '🎮' },
  { id: 'nature',   label: 'الطبيعة',      icon: '🌿' },
  { id: 'robots',   label: 'الروبوتات',    icon: '🤖' },
];

export const AVATARS = ['🦊', '🐻', '🦁', '🐸', '🐨', '🦋', '🐙', '🦄', '🐧', '🐯'];

export interface DiagnosticResult {
  completedAt: string;
  scores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
}

export interface StudentDNA {
  id: string;
  name: string;
  grade: Grade;
  avatar: string;
  interests: string[];
  createdAt: string;
  diagnostic: DiagnosticResult | null;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
}

export interface AcademicHealth {
  score: number;
  label: string;
  color: string;
  strengths: string[];
  weaknesses: string[];
  plan: PlanItem[];
}

export interface PlanItem {
  subject: string;
  icon: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}
