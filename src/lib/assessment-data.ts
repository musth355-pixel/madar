import type { LearningStyle } from './types';

export type SubjectId = 'math' | 'arabic' | 'science';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  subject: SubjectId;
  skill: string;
  skillLabel: string;
  difficulty: Difficulty;
  text: string;
  options: string[];
  correct: number;
}

export interface BehavioralOption {
  label: string;
  style: LearningStyle;
}

export interface BehavioralQuestion {
  id: string;
  text: string;
  note: string;
  options: BehavioralOption[];
}

export const BEHAVIORAL_QUESTIONS: BehavioralQuestion[] = [
  {
    id: 'b1',
    text: 'عندما تتعلم شيئاً جديداً، أي طريقة تساعدك أكثر؟',
    note: 'لا توجد إجابة صح أو خطأ — فقط أخبرنا ما يناسبك',
    options: [
      { label: '🖼️ أرى صوراً ورسوماً توضيحية', style: 'visual' },
      { label: '🔊 أسمع شرحاً من معلم', style: 'auditory' },
      { label: '✋ أجرّب بيدي مباشرة', style: 'kinesthetic' },
      { label: '📖 أقرأ عنه في كتاب', style: 'reading' },
    ],
  },
  {
    id: 'b2',
    text: 'ماذا تفضّل أكثر عند المذاكرة؟',
    note: 'اختر الأقرب لك',
    options: [
      { label: '🎨 مشاهدة فيديو مع رسوم ملوّنة', style: 'visual' },
      { label: '🎧 الاستماع لشرح صوتي', style: 'auditory' },
      { label: '🎮 حل تمارين وألعاب تفاعلية', style: 'kinesthetic' },
      { label: '✍️ القراءة والكتابة الهادئة', style: 'reading' },
    ],
  },
];

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  // ── الرياضيات ────────────────────────────────────────────────────────────
  {
    id: 'q1', subject: 'math', skill: 'math.addition', skillLabel: 'الجمع', difficulty: 'easy',
    text: 'كم ناتج ٥ + ٧ ؟',
    options: ['١٠', '١١', '١٢', '١٣'], correct: 2,
  },
  {
    id: 'q2', subject: 'math', skill: 'math.subtraction', skillLabel: 'الطرح', difficulty: 'easy',
    text: 'كم ناتج ١٥ - ٨ ؟',
    options: ['٥', '٦', '٧', '٨'], correct: 2,
  },
  {
    id: 'q3', subject: 'math', skill: 'math.geometry', skillLabel: 'الأشكال الهندسية', difficulty: 'easy',
    text: 'كم عدد أضلاع المثلث؟',
    options: ['٢', '٣', '٤', '٥'], correct: 1,
  },
  {
    id: 'q4', subject: 'math', skill: 'math.numbers', skillLabel: 'الأرقام والتسلسل', difficulty: 'easy',
    text: 'أي رقم يأتي بعد ٢٩ ؟',
    options: ['٢٨', '٣٠', '٣١', '٢٠'], correct: 1,
  },
  // ── لغتي ─────────────────────────────────────────────────────────────────
  {
    id: 'q5', subject: 'arabic', skill: 'arabic.phonics', skillLabel: 'الحروف والأصوات', difficulty: 'easy',
    text: 'أي الكلمات التالية تبدأ بحرف "شين"؟',
    options: ['سمكة', 'شجرة', 'صقر', 'زهرة'], correct: 1,
  },
  {
    id: 'q6', subject: 'arabic', skill: 'arabic.grammar', skillLabel: 'القواعد والصرف', difficulty: 'medium',
    text: 'ما جمع كلمة "قلم"؟',
    options: ['قلوم', 'أقلام', 'قلمان', 'قُلُم'], correct: 1,
  },
  {
    id: 'q7', subject: 'arabic', skill: 'arabic.grammar', skillLabel: 'القواعد والصرف', difficulty: 'medium',
    text: 'أكمل الجملة: "الطالب _____ إلى المدرسة"',
    options: ['ذهبَ', 'يذهبُ', 'يذهبُون', 'ذهبوا'], correct: 1,
  },
  {
    id: 'q8', subject: 'arabic', skill: 'arabic.vocabulary', skillLabel: 'المفردات والمعاني', difficulty: 'easy',
    text: 'ما مضاد كلمة "كبير"؟',
    options: ['طويل', 'عالٍ', 'صغير', 'واسع'], correct: 2,
  },
  // ── العلوم ───────────────────────────────────────────────────────────────
  {
    id: 'q9', subject: 'science', skill: 'science.animals', skillLabel: 'عالم الحيوان', difficulty: 'easy',
    text: 'أي الحيوانات التالية يعيش في الماء؟',
    options: ['أسد', 'سمكة', 'حصان', 'دجاجة'], correct: 1,
  },
  {
    id: 'q10', subject: 'science', skill: 'science.plants', skillLabel: 'عالم النبات', difficulty: 'easy',
    text: 'ماذا تحتاج النباتات لتنمو؟',
    options: ['الظلام فقط', 'الماء والهواء والضوء', 'الملح فقط', 'الثلج'], correct: 1,
  },
];
