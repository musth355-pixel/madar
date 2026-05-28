import type {
  StudentDNA, AcademicHealth, DiagnosticResult,
  RiskPrediction, WeakSkill, LearningStyle, FocusLevel, Priority,
} from './types';
import type { Difficulty } from './assessment-data';

const KEY = 'madar_student';

// ── CRUD ──────────────────────────────────────────────────────────────────────

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

// ── Raw input from assessment page ────────────────────────────────────────────

export interface AnswerRecord {
  skillId: string;
  skillLabel: string;
  subject: string;
  correct: boolean;
  difficulty: Difficulty;
}

export interface RawDiagnosticInput {
  answers: AnswerRecord[];
  behavioralVotes: LearningStyle[];
}

// ── Main builder ──────────────────────────────────────────────────────────────

export function buildAndSaveDiagnostic(input: RawDiagnosticInput): DiagnosticResult {
  const student = getStudent();
  if (!student) throw new Error('no student');

  const { answers, behavioralVotes } = input;

  // 1. Skill scores
  const skillBuckets: Record<string, { correct: number; total: number }> = {};
  let wrongOnEasy = 0;

  for (const a of answers) {
    if (!skillBuckets[a.skillId]) skillBuckets[a.skillId] = { correct: 0, total: 0 };
    skillBuckets[a.skillId].correct += a.correct ? 1 : 0;
    skillBuckets[a.skillId].total += 1;
    if (!a.correct && a.difficulty === 'easy') wrongOnEasy++;
  }

  const skillScores: Record<string, number> = {};
  for (const [id, { correct, total }] of Object.entries(skillBuckets)) {
    skillScores[id] = total > 0 ? Math.round((correct / total) * 100) : 0;
  }

  // 2. Subject scores (avg of their skill scores)
  const subjectBuckets: Record<string, number[]> = {};
  for (const a of answers) {
    if (!subjectBuckets[a.subject]) subjectBuckets[a.subject] = [];
    subjectBuckets[a.subject].push(a.correct ? 100 : 0);
  }
  const scores: Record<string, number> = {};
  for (const [subj, vals] of Object.entries(subjectBuckets)) {
    scores[subj] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }

  // 3. Strengths / weaknesses (subject level)
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const strengths = sorted.filter(([, v]) => v >= 70).map(([k]) => k);
  const weaknesses = sorted.filter(([, v]) => v < 70).map(([k]) => k);

  // 4. Top 3 weakest skills
  const weakSkills = Object.entries(skillScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([k]) => k);

  // 5. Learning style (majority vote from behavioral answers)
  const votes: Record<string, number> = {};
  for (const v of behavioralVotes) votes[v] = (votes[v] ?? 0) + 1;
  const learningStyle = (
    Object.entries(votes).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'visual'
  ) as LearningStyle;

  // 6. Confidence score
  //    Base 80, subtract 15 for each wrong-on-easy (wrong on simple questions = confidence issue)
  const confidenceScore = Math.max(0, Math.min(100, 80 - wrongOnEasy * 15));

  // 7. Self-learning score
  //    Driven by curiosity (interests), breadth of knowledge, and overall performance
  const interestBonus = Math.min(20, student.interests.length * 5);
  const breadthBonus = strengths.length >= 2 ? 20 : strengths.length === 1 ? 10 : 0;
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / (Object.values(scores).length || 1);
  const avgBonus = avgScore >= 70 ? 15 : avgScore >= 50 ? 5 : 0;
  const selfLearningScore = Math.min(100, 45 + interestBonus + breadthBonus + avgBonus);

  // 8. Focus level
  //    Consistency across the test — wrong answers on easy questions signal distraction
  let focusLevel: FocusLevel = 'high';
  if (avgScore < 55 || wrongOnEasy >= 2) focusLevel = 'low';
  else if (avgScore < 75 || wrongOnEasy >= 1) focusLevel = 'medium';

  // 9. Risk predictions
  const riskPredictions = computeRisks(scores, skillScores, confidenceScore, focusLevel);

  const diagnostic: DiagnosticResult = {
    completedAt: new Date().toISOString(),
    scores,
    skillScores,
    strengths,
    weaknesses,
    weakSkills,
    learningStyle,
    confidenceScore,
    selfLearningScore,
    focusLevel,
    wrongOnEasy,
  };

  saveStudent({
    ...student,
    diagnostic,
    learningStyle,
    confidenceScore,
    selfLearningScore,
    focusLevel,
    skillMastery: skillScores,
    riskPredictions,
  });

  return diagnostic;
}

// ── Display model ─────────────────────────────────────────────────────────────

export function computeAcademicHealth(student: StudentDNA): AcademicHealth {
  const { diagnostic, riskPredictions } = student;
  if (!diagnostic) throw new Error('no diagnostic');

  const { scores, skillScores, strengths: sIds, weaknesses: wIds, weakSkills: wsIds } = diagnostic;

  // Weighted academic score
  const weights: Record<string, number> = { arabic: 0.35, math: 0.35, science: 0.30 };
  let total = 0, wSum = 0;
  for (const [subj, w] of Object.entries(weights)) {
    if (scores[subj] !== undefined) { total += scores[subj] * w; wSum += w; }
  }
  const score = wSum > 0 ? Math.round(total / wSum) : 0;

  let label = 'ممتاز', color = '#4FB286';
  if (score < 60) { label = 'يحتاج دعم'; color = '#E86A8E'; }
  else if (score < 75) { label = 'متوسط'; color = '#FFC93C'; }
  else if (score < 90) { label = 'جيد'; color = '#5BA3D9'; }

  const weakSkillObjects: WeakSkill[] = wsIds.map(id => {
    const meta = SKILL_META[id] ?? { label: id, subject: '', icon: '📚' };
    return {
      id,
      label: meta.label,
      subject: SUBJECT_LABELS[meta.subject] || meta.subject,
      subjectIcon: SUBJECT_ICONS[meta.subject] || '📚',
      score: skillScores[id] ?? 0,
    };
  });

  const plan = wIds.map((subj, i) => ({
    subject: SUBJECT_LABELS[subj] || subj,
    icon: SUBJECT_ICONS[subj] || '📚',
    action: getPlanAction(subj, scores[subj] ?? 0),
    priority: (i === 0 ? 'high' : i === 1 ? 'medium' : 'low') as Priority,
  }));

  return {
    score,
    label,
    color,
    strengths: sIds.map(s => SUBJECT_LABELS[s] || s),
    weaknesses: wIds.map(s => SUBJECT_LABELS[s] || s),
    weakSkills: weakSkillObjects,
    plan,
    riskPredictions,
    confidenceScore: diagnostic.confidenceScore,
    selfLearningScore: diagnostic.selfLearningScore,
    focusLevel: diagnostic.focusLevel,
    learningStyle: diagnostic.learningStyle,
  };
}

// ── Risk engine ───────────────────────────────────────────────────────────────

function computeRisks(
  scores: Record<string, number>,
  skillScores: Record<string, number>,
  confidenceScore: number,
  focusLevel: FocusLevel,
): RiskPrediction[] {
  const risks: RiskPrediction[] = [];

  if ((scores.math ?? 100) < 50) {
    risks.push({
      id: 'r1', severity: 'high', relatedSkill: 'math',
      label: 'تراجع في الرياضيات',
      description: 'الأداء دون المتوسط والمادة تزداد صعوبةً في المراحل التالية',
    });
  }
  if ((skillScores['arabic.grammar'] ?? 100) < 50) {
    risks.push({
      id: 'r2', severity: 'high', relatedSkill: 'arabic.grammar',
      label: 'ضعف في قواعد اللغة',
      description: 'صعوبة في القواعد تؤثر على التعبير الكتابي والقراءة الصحيحة',
    });
  }
  if (confidenceScore < 55) {
    risks.push({
      id: 'r3', severity: 'medium',
      label: 'انخفاض الثقة الذاتية',
      description: 'أخطاء في أسئلة سهلة تشير إلى تردد أو قلق عند الإجابة',
    });
  }
  if (focusLevel === 'low') {
    risks.push({
      id: 'r4', severity: 'medium',
      label: 'صعوبة في التركيز',
      description: 'أنماط الإجابة تشير إلى تشتت قد يعيق الاستيعاب والتحصيل',
    });
  }
  if ((scores.science ?? 100) < 40) {
    risks.push({
      id: 'r5', severity: 'low', relatedSkill: 'science',
      label: 'فجوة في مادة العلوم',
      description: 'المستوى يحتاج دعماً قبل تراكم الفجوة في المناهج القادمة',
    });
  }

  return risks;
}

// ── Lookup tables ─────────────────────────────────────────────────────────────

const SUBJECT_LABELS: Record<string, string> = {
  math: 'الرياضيات', arabic: 'لغتي', science: 'العلوم', english: 'الإنجليزية',
};

const SUBJECT_ICONS: Record<string, string> = {
  math: '🔢', arabic: '📖', science: '🔬', english: '🌍',
};

const SKILL_META: Record<string, { label: string; subject: string }> = {
  'math.addition':     { label: 'الجمع',             subject: 'math'    },
  'math.subtraction':  { label: 'الطرح',             subject: 'math'    },
  'math.geometry':     { label: 'الأشكال الهندسية', subject: 'math'    },
  'math.numbers':      { label: 'الأرقام والتسلسل', subject: 'math'    },
  'arabic.phonics':    { label: 'الحروف والأصوات',  subject: 'arabic'  },
  'arabic.grammar':    { label: 'القواعد والصرف',   subject: 'arabic'  },
  'arabic.vocabulary': { label: 'المفردات والمعاني',subject: 'arabic'  },
  'science.animals':   { label: 'عالم الحيوان',     subject: 'science' },
  'science.plants':    { label: 'عالم النبات',      subject: 'science' },
};

function getPlanAction(subject: string, score: number): string {
  const actions: Record<string, [string, string, string]> = {
    math:    ['راجع الأرقام والعمليات الأساسية', 'حل تمارين الجمع والطرح يومياً', 'انتقل لمسائل الضرب والقسمة'],
    arabic:  ['تدرب على القراءة وتهجئة الكلمات', 'اقرأ قصة قصيرة كل يوم', 'تدرب على كتابة الجمل والفقرات'],
    science: ['استكشف مفاهيم العلوم الأساسية', 'أكمل وحدة الكائنات الحية', 'اكتشف تجارب علمية ممتعة'],
    english: ['ابدأ بالحروف والكلمات البسيطة', 'تعلم 5 كلمات جديدة يومياً', 'تحدث وكوّن جملاً كاملة'],
  };
  const [low, mid, high] = actions[subject] ?? ['راجع المفاهيم الأساسية', 'أكثر من التمارين', 'تحدّ نفسك'];
  if (score < 40) return low;
  if (score < 70) return mid;
  return high;
}
