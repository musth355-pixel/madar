export type Grade = 1 | 2 | 3 | 4 | 5 | 6;
export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading';
export type FocusLevel = 'high' | 'medium' | 'low';
export type RiskSeverity = 'high' | 'medium' | 'low';
export type Priority = 'high' | 'medium' | 'low';

export const GRADE_LABELS: Record<Grade, string> = {
  1: 'الصف الأول الابتدائي',
  2: 'الصف الثاني الابتدائي',
  3: 'الصف الثالث الابتدائي',
  4: 'الصف الرابع الابتدائي',
  5: 'الصف الخامس الابتدائي',
  6: 'الصف السادس الابتدائي',
};

export const LEARNING_STYLE_LABELS: Record<LearningStyle, { label: string; icon: string; desc: string }> = {
  visual:      { label: 'بصري',    icon: '👁️',  desc: 'يتعلم أفضل بالصور والرسوم' },
  auditory:    { label: 'سمعي',    icon: '👂',  desc: 'يتعلم أفضل بالاستماع والشرح' },
  kinesthetic: { label: 'حركي',    icon: '🤲',  desc: 'يتعلم أفضل بالتجريب والممارسة' },
  reading:     { label: 'قرائي',   icon: '📖',  desc: 'يتعلم أفضل بالقراءة والكتابة' },
};

export const FOCUS_LABELS: Record<FocusLevel, { label: string; color: string }> = {
  high:   { label: 'تركيز عالٍ',    color: '#4FB286' },
  medium: { label: 'تركيز متوسط',  color: '#FFC93C' },
  low:    { label: 'تركيز منخفض',  color: '#E86A8E' },
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

// ─── Skill ───────────────────────────────────────────────────────────────────

export interface WeakSkill {
  id: string;
  label: string;
  subject: string;
  subjectIcon: string;
  score: number;
}

// ─── Risk ────────────────────────────────────────────────────────────────────

export interface RiskPrediction {
  id: string;
  label: string;
  description: string;
  severity: RiskSeverity;
  relatedSkill?: string;
}

// ─── Diagnostic ──────────────────────────────────────────────────────────────

export interface DiagnosticResult {
  completedAt: string;
  scores: Record<string, number>;        // subject-level: { math: 75, arabic: 50, ... }
  skillScores: Record<string, number>;   // skill-level:  { 'math.addition': 100, ... }
  strengths: string[];                   // subject ids with score ≥ 70
  weaknesses: string[];                  // subject ids with score < 70 (sorted worst-first)
  weakSkills: string[];                  // top 3 weakest skill ids
  learningStyle: LearningStyle;
  confidenceScore: number;               // 0–100
  selfLearningScore: number;             // 0–100
  focusLevel: FocusLevel;
  wrongOnEasy: number;
}

// ─── Student DNA ─────────────────────────────────────────────────────────────

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
  // Derived from diagnostic (cached top-level for easy access)
  learningStyle: LearningStyle | null;
  confidenceScore: number;
  selfLearningScore: number;
  focusLevel: FocusLevel | null;
  skillMastery: Record<string, number>;  // skillId → 0–100
  riskPredictions: RiskPrediction[];
}

// ─── Academic Health (display model) ─────────────────────────────────────────

export interface AcademicHealth {
  score: number;
  label: string;
  color: string;
  strengths: string[];
  weaknesses: string[];
  weakSkills: WeakSkill[];
  plan: PlanItem[];
  riskPredictions: RiskPrediction[];
  confidenceScore: number;
  selfLearningScore: number;
  focusLevel: FocusLevel;
  learningStyle: LearningStyle;
}

export interface PlanItem {
  subject: string;
  icon: string;
  action: string;
  priority: Priority;
}
