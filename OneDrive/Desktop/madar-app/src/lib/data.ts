export const SUBJECTS = [
  { id: 'math',    ar: 'الرياضيات',       icon: '🔢', color: '#FF8A3D', tint: '#FFE3D6', lessons: 18, done: 12 },
  { id: 'science', ar: 'العلوم',           icon: '🔬', color: '#4FB286', tint: '#DFF3E9', lessons: 14, done: 6  },
  { id: 'arabic',  ar: 'لغتي',             icon: '📖', color: '#E5602A', tint: '#FFF0D4', lessons: 22, done: 9  },
  { id: 'english', ar: 'الإنجليزية',       icon: '🌍', color: '#5BA3D9', tint: '#D6EAF8', lessons: 16, done: 5  },
  { id: 'quran',   ar: 'القرآن الكريم',   icon: '🕌', color: '#9B7EDE', tint: '#F3E8FB', lessons: 30, done: 20 },
  { id: 'arts',    ar: 'الفنون',           icon: '🎨', color: '#E86A8E', tint: '#FCE3EA', lessons: 8,  done: 3  },
  { id: 'social',  ar: 'الاجتماعيات',     icon: '🌿', color: '#FFC93C', tint: '#FFF0D4', lessons: 10, done: 2  },
  { id: 'tech',    ar: 'المهارات الرقمية', icon: '💻', color: '#7AC4D9', tint: '#D6EFF5', lessons: 12, done: 4  },
];

export const USER = {
  name: 'أحمد',
  grade: 'الصف الثالث الابتدائي',
  level: 7,
  xp: 1240,
  nextXp: 1500,
  streak: 12,
  avatar: '🦊',
};

export const ACHIEVEMENTS = [
  { id: 'a1', icon: '🏆', title: 'أول خطوة',     sub: 'أكملت أول درس',           unlocked: true  },
  { id: 'a2', icon: '🔥', title: 'شعلة ٧ أيام',   sub: '٧ أيام متتالية',           unlocked: true  },
  { id: 'a3', icon: '🧠', title: 'عقل مفكّر',      sub: '١٠٠ إجابة صحيحة',         unlocked: true  },
  { id: 'a4', icon: '⚡', title: 'البرق السريع',   sub: 'اختبار بدون أخطاء',        unlocked: true  },
  { id: 'a5', icon: '🎯', title: 'صائد الأهداف',   sub: 'أنهيت ٣ مواد بنسبة ١٠٠٪', unlocked: false },
  { id: 'a6', icon: '🚀', title: 'صاروخ المعرفة', sub: '١٠٠٠ نقطة في يوم',         unlocked: false },
  { id: 'a7', icon: '👑', title: 'تاج البطل',      sub: 'اهزم البطل النهائي',       unlocked: false },
];
