export interface Question {
  id: string;
  subject: 'math' | 'arabic' | 'science';
  text: string;
  options: string[];
  correct: number;
}

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  // Math
  {
    id: 'q1', subject: 'math',
    text: 'كم ناتج ٥ + ٧ ؟',
    options: ['١٠', '١١', '١٢', '١٣'],
    correct: 2,
  },
  {
    id: 'q2', subject: 'math',
    text: 'كم ناتج ١٥ - ٨ ؟',
    options: ['٥', '٦', '٧', '٨'],
    correct: 2,
  },
  {
    id: 'q3', subject: 'math',
    text: 'كم عدد أضلاع المثلث؟',
    options: ['٢', '٣', '٤', '٥'],
    correct: 1,
  },
  {
    id: 'q4', subject: 'math',
    text: 'أي رقم يأتي بعد ٢٩ ؟',
    options: ['٢٨', '٣٠', '٣١', '٢٠'],
    correct: 1,
  },
  // Arabic
  {
    id: 'q5', subject: 'arabic',
    text: 'أي الكلمات التالية تبدأ بحرف "شين"؟',
    options: ['سمكة', 'شجرة', 'صقر', 'زهرة'],
    correct: 1,
  },
  {
    id: 'q6', subject: 'arabic',
    text: 'ما جمع كلمة "قلم"؟',
    options: ['قلوم', 'أقلام', 'قلمان', 'قُلُم'],
    correct: 1,
  },
  {
    id: 'q7', subject: 'arabic',
    text: 'أكمل الجملة: "الطالب _____ إلى المدرسة"',
    options: ['ذهبَ', 'يذهبُ', 'يذهبُون', 'ذهبوا'],
    correct: 1,
  },
  {
    id: 'q8', subject: 'arabic',
    text: 'ما مضاد كلمة "كبير"؟',
    options: ['طويل', 'عالٍ', 'صغير', 'واسع'],
    correct: 2,
  },
  // Science
  {
    id: 'q9', subject: 'science',
    text: 'أي الحيوانات التالية يعيش في الماء؟',
    options: ['أسد', 'سمكة', 'حصان', 'دجاجة'],
    correct: 1,
  },
  {
    id: 'q10', subject: 'science',
    text: 'ماذا تحتاج النباتات لتنمو؟',
    options: ['الظلام فقط', 'الماء والهواء والضوء', 'الملح فقط', 'الثلج'],
    correct: 1,
  },
];
