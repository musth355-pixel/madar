// data.jsx — curriculum content, mascots, quiz banks

const SUBJECTS = [
  { id: 'math',    ar: 'الرياضيات',   en: 'Math',     icon: 'math',    color: '#FF8A3D', tint: '#FFE3D6', tone: '#C0392B', lessons: 18, done: 12 },
  { id: 'science', ar: 'العلوم',      en: 'Science',  icon: 'science', color: '#4FB286', tint: '#DFF3E9', tone: '#357A5B', lessons: 14, done: 6  },
  { id: 'arabic',  ar: 'لغتي',        en: 'Arabic',   icon: 'arabic',  color: '#E5602A', tint: '#FFF0D4', tone: '#C77B3A', lessons: 22, done: 9  },
  { id: 'english', ar: 'الإنجليزية',  en: 'English',  icon: 'english', color: '#5BA3D9', tint: '#D6EAF8', tone: '#2E6DA4', lessons: 16, done: 5  },
  { id: 'quran',   ar: 'القرآن',      en: 'Quran',    icon: 'quran',   color: '#9B7EDE', tint: '#F3E8FB', tone: '#6A4F9E', lessons: 30, done: 20 },
  { id: 'arts',    ar: 'الفنون',      en: 'Arts',     icon: 'arts',    color: '#E86A8E', tint: '#FCE3EA', tone: '#B83A60', lessons: 8,  done: 3  },
  { id: 'social',  ar: 'الاجتماعيات', en: 'Social',   icon: 'social',  color: '#FFC93C', tint: '#FFF0D4', tone: '#A87800', lessons: 10, done: 2  },
  { id: 'tech',    ar: 'المهارات الرقمية', en: 'Tech', icon: 'tech',  color: '#7AC4D9', tint: '#D6EFF5', tone: '#2E7D8E', lessons: 12, done: 4  },
];

// Adventure-style lesson path per subject (Duolingo style)
const MATH_PATH = [
  { id: 'm1', title: 'الأعداد حتى ١٠٠',      type: 'lesson',     state: 'done',     xp: 20 },
  { id: 'm2', title: 'الجمع بدون حمل',         type: 'lesson',     state: 'done',     xp: 25 },
  { id: 'm3', title: 'تحدّي الجمع',            type: 'quiz',       state: 'done',     xp: 30 },
  { id: 'm4', title: 'الجمع مع الحمل',         type: 'lesson',     state: 'done',     xp: 25 },
  { id: 'm5', title: 'الطرح بدون استلاف',      type: 'lesson',     state: 'done',     xp: 25 },
  { id: 'm6', title: 'صندوق الكنز',            type: 'reward',     state: 'done',     xp: 50 },
  { id: 'm7', title: 'الطرح مع الاستلاف',      type: 'lesson',     state: 'done',     xp: 30 },
  { id: 'm8', title: 'مسائل كلامية',           type: 'lesson',     state: 'done',     xp: 25 },
  { id: 'm9', title: 'تحدّي الطرح',            type: 'quiz',       state: 'done',     xp: 35 },
  { id: 'm10',title: 'مغامرة المتاهة',         type: 'game',       state: 'done',     xp: 40 },
  { id: 'm11',title: 'الضرب — جدول ٢',         type: 'lesson',     state: 'done',     xp: 30 },
  { id: 'm12',title: 'الضرب — جدول ٣',         type: 'lesson',     state: 'done',     xp: 30 },
  { id: 'm13',title: 'اختبار الجمع والطرح',    type: 'boss',       state: 'current',  xp: 100, badge: '🏆' },
  { id: 'm14',title: 'الضرب — جدول ٤',         type: 'lesson',     state: 'locked',   xp: 30 },
  { id: 'm15',title: 'الضرب — جدول ٥',         type: 'lesson',     state: 'locked',   xp: 30 },
  { id: 'm16',title: 'تحدّي الضرب',            type: 'quiz',       state: 'locked',   xp: 40 },
  { id: 'm17',title: 'القسمة البسيطة',         type: 'lesson',     state: 'locked',   xp: 35 },
  { id: 'm18',title: 'البطل النهائي',           type: 'boss',       state: 'locked',   xp: 150, badge: '👑' },
];

// Lesson content for the "lesson player" screen
const SAMPLE_LESSON = {
  id: 'm13',
  subjectId: 'math',
  title: 'اختبار الجمع والطرح',
  subtitle: 'الوحدة الثالثة · الصف الثالث',
  chapters: [
    { id: 'c1', title: 'مراجعة سريعة', mins: 3, done: true },
    { id: 'c2', title: 'الفكرة الأساسية', mins: 5, done: true },
    { id: 'c3', title: 'أمثلة محلولة', mins: 4, done: false, current: true },
    { id: 'c4', title: 'تحدّي سريع', mins: 6, done: false },
    { id: 'c5', title: 'الاختبار النهائي', mins: 8, done: false },
  ],
  hero: {
    headline: 'كيف نجمع الأعداد الكبيرة؟',
    body: 'نتعلم اليوم كيف نجمع الأعداد المكونة من رقمين باستخدام طريقة العمود. هيا نبدأ مغامرتنا الحسابية مع روبو!',
  },
  example: {
    operands: [27, 35],
    answer: 62,
    steps: [
      'نضع الأعداد في عمود — الآحاد تحت الآحاد، والعشرات تحت العشرات',
      'نجمع الآحاد: 7 + 5 = 12 (نكتب 2 ونحمل 1)',
      'نجمع العشرات: 2 + 3 + 1 = 6',
      'الإجابة: 62 🎉',
    ],
  },
};

// Quiz bank
const QUIZ = {
  subjectId: 'math',
  title: 'تحدّي الجمع والطرح',
  questions: [
    {
      id: 'q1',
      kind: 'multiple-choice',
      prompt: 'كم يساوي ٢٧ + ٣٥؟',
      visual: 'cols-add',
      operands: [27, 35],
      options: ['٥٢', '٦٢', '٥٧', '٧٢'],
      answer: 1,
      hint: 'جمّع الآحاد أولاً ثم العشرات',
    },
    {
      id: 'q2',
      kind: 'drag-match',
      prompt: 'اسحب كل عملية لإجابتها الصحيحة',
      pairs: [
        { left: '٤٠ − ١٥', right: '٢٥' },
        { left: '١٨ + ٧',  right: '٢٥' },
        { left: '٥٠ − ٢٥', right: '٢٥' },
        { left: '٣٠ − ١٢', right: '١٨' },
      ],
    },
    {
      id: 'q3',
      kind: 'multiple-choice',
      prompt: 'في الحديقة ٤٣ زهرة. قطفت سارة ١٧ زهرة. كم زهرة بقيت؟',
      visual: 'word-problem',
      art: 'garden',
      options: ['٢٤', '٢٦', '٣٠', '٦٠'],
      answer: 1,
      hint: 'نطرح ما قُطف من المجموع',
    },
    {
      id: 'q4',
      kind: 'tap-tiles',
      prompt: 'كوّن العدد ٥٦ من الكتل',
      target: 56,
      tiles: [
        { v: 10, c: 'rod' }, { v: 10, c: 'rod' }, { v: 10, c: 'rod' }, { v: 10, c: 'rod' }, { v: 10, c: 'rod' },
        { v: 1,  c: 'unit' }, { v: 1, c: 'unit' }, { v: 1, c: 'unit' }, { v: 1, c: 'unit' }, { v: 1, c: 'unit' }, { v: 1, c: 'unit' },
      ],
    },
    {
      id: 'q5',
      kind: 'multiple-choice',
      prompt: 'كم يساوي ٨٤ − ٢٩؟',
      visual: 'cols-sub',
      operands: [84, 29],
      options: ['٥٥', '٦٥', '٤٥', '٥٧'],
      answer: 0,
      hint: 'استلف ١ من العشرات',
    },
  ],
};

// Achievements
const ACHIEVEMENTS = [
  { id: 'a1', icon: '🏆', title: 'أول خطوة',      sub: 'أكملت أول درس', unlocked: true,  rare: 'common',    date: 'قبل شهر' },
  { id: 'a2', icon: '🔥', title: 'شعلة ٧ أيام',    sub: '٧ أيام متتالية', unlocked: true,  rare: 'uncommon',  date: 'قبل ٣ أيام' },
  { id: 'a3', icon: '🧠', title: 'عقل مفكّر',       sub: '١٠٠ إجابة صحيحة', unlocked: true,  rare: 'uncommon',  date: 'قبل أسبوع' },
  { id: 'a4', icon: '⚡', title: 'البرق السريع',    sub: 'حللت اختبار بدون أخطاء', unlocked: true,  rare: 'rare',      date: 'قبل يومين' },
  { id: 'a5', icon: '🌙', title: 'قارئ الليل',      sub: 'قرأت ١٠ آيات', unlocked: true,  rare: 'common',    date: 'قبل ٤ أيام' },
  { id: 'a6', icon: '🎯', title: 'صائد الأهداف',    sub: 'أنهيت ٣ مواد بنسبة ١٠٠٪', unlocked: false, rare: 'rare' },
  { id: 'a7', icon: '🚀', title: 'صاروخ المعرفة',  sub: 'اربح ١٠٠٠ نقطة في يوم', unlocked: false, rare: 'epic' },
  { id: 'a8', icon: '👑', title: 'تاج البطل',       sub: 'اهزم البطل النهائي', unlocked: false, rare: 'legendary' },
  { id: 'a9', icon: '🦉', title: 'البومة الحكيمة', sub: 'ادرس ٥٠ ساعة', unlocked: false, rare: 'rare' },
];

// Profile / user data
const USER = {
  name: 'أحمد',
  fullname: 'أحمد المالكي',
  grade: 'الصف الثالث الابتدائي',
  school: 'مدرسة الفيصلية الابتدائية',
  level: 7,
  xp: 1240,
  nextXp: 1500,
  streak: 12,
  weekGoal: 5,
  weekDone: 3,
  weekDays: [true, true, false, true, false, false, false], // Sun..Sat (Sa first in AR)
  avatar: 'fox',
};

const MASCOT = {
  name: 'روبو',
  role: 'مساعدك الذكي',
};

// Map quiz answer index -> chosen tile
const PERSIST = {
  // session state for the prototype
};

Object.assign(window, { SUBJECTS, MATH_PATH, SAMPLE_LESSON, QUIZ, ACHIEVEMENTS, USER, MASCOT });
