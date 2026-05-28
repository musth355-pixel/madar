import type { StudentDNA, AcademicHealth, DiagnosticResult } from './types';

const KEY = 'madar_student';

export function getStudent(): StudentDNA | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as StudentDNA; } catch { return null; }
}

export function saveStudent(student: StudentDNA): void {
  localStorage.setItem(KEY, JSON.stringify(student));
}

export function clearStudent(): void {
  localStorage.removeItem(KEY);
}

export function updateStudent(patch: Partial<StudentDNA>): StudentDNA | null {
  const s = getStudent();
  if (!s) return null;
  const updated = { ...s, ...patch };
  saveStudent(updated);
  return updated;
}

export function saveDiagnostic(result: DiagnosticResult): void {
  const s = getStudent();
  if (!s) return;
  saveStudent({ ...s, diagnostic: result });
}

const SUBJECT_LABELS: Record<string, string> = {
  math: 'الرياضيات',
  arabic: 'لغتي',
  science: 'العلوم',
  english: 'الإنجليزية',
};

const SUBJECT_ICONS: Record<string, string> = {
  math: '🔢',
  arabic: '📖',
  science: '🔬',
  english: '🌍',
};

export function computeAcademicHealth(diagnostic: DiagnosticResult): AcademicHealth {
  const { scores } = diagnostic;
  const weights: Record<string, number> = { arabic: 0.35, math: 0.35, science: 0.30 };

  let total = 0;
  let wSum = 0;
  for (const [subj, w] of Object.entries(weights)) {
    if (scores[subj] !== undefined) {
      total += scores[subj] * w;
      wSum += w;
    }
  }
  const score = wSum > 0 ? Math.round(total / wSum) : 0;

  let label = 'ممتاز';
  let color = '#4FB286';
  if (score < 60) { label = 'يحتاج دعم'; color = '#E86A8E'; }
  else if (score < 75) { label = 'متوسط'; color = '#FFC93C'; }
  else if (score < 90) { label = 'جيد'; color = '#5BA3D9'; }

  const strengths = diagnostic.strengths.map(s => SUBJECT_LABELS[s] || s);
  const weaknesses = diagnostic.weaknesses.map(s => SUBJECT_LABELS[s] || s);

  const plan = diagnostic.weaknesses.map((subj, i) => ({
    subject: SUBJECT_LABELS[subj] || subj,
    icon: SUBJECT_ICONS[subj] || '📚',
    action: getPlanAction(subj, scores[subj] ?? 0),
    priority: (i === 0 ? 'high' : i === 1 ? 'medium' : 'low') as 'high' | 'medium' | 'low',
  }));

  return { score, label, color, strengths, weaknesses, plan };
}

function getPlanAction(subject: string, score: number): string {
  if (score < 40) {
    const map: Record<string, string> = {
      math: 'راجع الأرقام والعمليات الأساسية',
      arabic: 'تدرب على القراءة وتهجئة الكلمات',
      science: 'استكشف مفاهيم العلوم الأساسية',
      english: 'ابدأ بالحروف والكلمات البسيطة',
    };
    return map[subject] || 'راجع المفاهيم الأساسية';
  }
  if (score < 70) {
    const map: Record<string, string> = {
      math: 'حل تمارين الجمع والطرح يومياً',
      arabic: 'اقرأ قصة قصيرة كل يوم',
      science: 'أكمل وحدة الكائنات الحية',
      english: 'تعلم 5 كلمات جديدة يومياً',
    };
    return map[subject] || 'أكثر من التمارين التطبيقية';
  }
  const map: Record<string, string> = {
    math: 'انتقل لمسائل الضرب والقسمة',
    arabic: 'تدرب على كتابة الجمل والفقرات',
    science: 'اكتشف تجارب علمية ممتعة',
    english: 'تحدث وكوّن جملاً كاملة',
  };
  return map[subject] || 'تحدّ نفسك بمستوى أعلى';
}
