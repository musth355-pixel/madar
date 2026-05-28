"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent, computeAcademicHealth } from "@/lib/storage";
import {
  LEARNING_STYLE_LABELS,
  FOCUS_LABELS,
  type StudentDNA,
  type AcademicHealth,
  type FocusLevel,
  type RiskSeverity,
} from "@/lib/types";

// ── Small components ──────────────────────────────────────────────────────────

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 58;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--cream-dk)" strokeWidth="14" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - score / 100)}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black" style={{ color }}>{score}</span>
        <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>/ 100</span>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: RiskSeverity }) {
  const map: Record<RiskSeverity, { label: string; color: string }> = {
    high:   { label: "خطر مرتفع", color: "#E86A8E" },
    medium: { label: "تحذير",     color: "#FFC93C" },
    low:    { label: "ملاحظة",    color: "#5BA3D9" },
  };
  const { label, color } = map[severity];
  return (
    <span
      className="text-xs font-black px-2 py-0.5 rounded-full flex-shrink-0"
      style={{ background: color + "22", color }}
    >
      {label}
    </span>
  );
}

function FocusIndicator({ level }: { level: FocusLevel }) {
  const levels: FocusLevel[] = ["low", "medium", "high"];
  const colors: Record<FocusLevel, string> = {
    low: "#E86A8E", medium: "#FFC93C", high: "#4FB286",
  };
  const { label, color } = FOCUS_LABELS[level];
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {levels.map(l => (
          <div
            key={l}
            className="flex-1 h-3 rounded-full transition-all"
            style={{
              background: levels.indexOf(l) <= levels.indexOf(level) ? colors[level] : "var(--cream-dk)",
            }}
          />
        ))}
      </div>
      <p className="text-sm font-black" style={{ color }}>{label}</p>
    </div>
  );
}

// ── Empty states ──────────────────────────────────────────────────────────────

function EmptyNoStudent({ onGo }: { onGo: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ background: "var(--cream)" }}>
      <div className="text-6xl">👨‍👦</div>
      <h2 className="text-2xl font-black">لا يوجد طفل مسجّل بعد</h2>
      <p style={{ color: "var(--text-muted)" }}>اطلب من طفلك تسجيل حسابه أولاً</p>
      <button onClick={onGo} className="px-8 py-3 rounded-2xl font-black text-white" style={{ background: "var(--primary)" }}>
        ابدأ التسجيل
      </button>
    </div>
  );
}

function EmptyNoDiagnostic({ name, onGo }: { name: string; onGo: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ background: "var(--cream)" }}>
      <div className="text-6xl">⏳</div>
      <h2 className="text-2xl font-black">لم يُكمل {name} الاختبار بعد</h2>
      <p style={{ color: "var(--text-muted)" }}>يجب إتمام الاختبار التشخيصي أولاً</p>
      <button onClick={onGo} className="px-8 py-3 rounded-2xl font-black text-white" style={{ background: "var(--primary)" }}>
        ابدأ الاختبار
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const SUBJECT_LABELS: Record<string, string> = {
  math: "🔢 الرياضيات", arabic: "📖 لغتي", science: "🔬 العلوم",
};

const PRIORITY_COLOR: Record<string, string> = {
  high: "#E86A8E", medium: "#FFC93C", low: "#4FB286",
};
const PRIORITY_LABEL: Record<string, string> = {
  high: "عاجل", medium: "مهم", low: "تحسين",
};

export default function ParentPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDNA | null | undefined>(undefined);
  const [health, setHealth] = useState<AcademicHealth | null>(null);

  useEffect(() => {
    const s = getStudent();
    setStudent(s ?? null);
    if (s?.diagnostic) setHealth(computeAcademicHealth(s));
  }, []);

  if (student === undefined) return null; // hydrating
  if (!student) return <EmptyNoStudent onGo={() => router.push("/")} />;
  if (!student.diagnostic || !health) {
    return <EmptyNoDiagnostic name={student.name} onGo={() => router.push("/assessment")} />;
  }

  const { scores } = student.diagnostic;
  const ls = LEARNING_STYLE_LABELS[health.learningStyle];

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b"
        style={{ background: "var(--cream)", borderColor: "var(--cream-dk)" }}
      >
        <div>
          <h1 className="text-lg font-black">لوحة المتابعة</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {student.avatar} {student.name}
          </p>
        </div>
        <button
          onClick={() => router.push("/world")}
          className="text-sm font-bold px-4 py-2 rounded-full text-white"
          style={{ background: "var(--primary)" }}
        >
          عالم الطفل
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-6 space-y-4">

        {/* ── 1. Academic Health Score ── */}
        <div className="rounded-3xl p-6 text-center" style={{ background: "white" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            المؤشر الأكاديمي العام
          </p>
          <ScoreRing score={health.score} color={health.color} />
          <div
            className="inline-block mt-3 px-4 py-1 rounded-full text-sm font-black"
            style={{ background: health.color + "22", color: health.color }}
          >
            {health.label}
          </div>

          {/* Learning style */}
          <div
            className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-2xl mx-auto max-w-xs"
            style={{ background: "var(--cream-md)" }}
          >
            <span className="text-xl">{ls.icon}</span>
            <div className="text-right">
              <p className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>أسلوب التعلم</p>
              <p className="text-sm font-black">{ls.label} — {ls.desc}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "المستوى", value: student.level,  icon: "⭐" },
              { label: "النقاط",  value: student.xp,     icon: "🔥" },
              { label: "الأيام",  value: student.streak,  icon: "📅" },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-3 text-center" style={{ background: "var(--cream-md)" }}>
                <div className="text-xl">{stat.icon}</div>
                <div className="font-black text-lg">{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Behavioral Indicators ── */}
        <div className="rounded-3xl p-5 space-y-5" style={{ background: "white" }}>
          <h2 className="font-black text-base">المؤشرات السلوكية</h2>

          {/* Confidence */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black">💪 مؤشر الثقة الذاتية</span>
              <span
                className="text-sm font-black"
                style={{ color: health.confidenceScore >= 70 ? "#4FB286" : health.confidenceScore >= 50 ? "#FFC93C" : "#E86A8E" }}
              >
                {health.confidenceScore} / 100
              </span>
            </div>
            <ScoreBar
              value={health.confidenceScore}
              color={health.confidenceScore >= 70 ? "#4FB286" : health.confidenceScore >= 50 ? "#FFC93C" : "#E86A8E"}
            />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {health.confidenceScore >= 70
                ? "يُجيب بثقة ودون تردد"
                : health.confidenceScore >= 50
                ? "بعض التردد في الأسئلة السهلة"
                : "يحتاج تعزيز الثقة وتقليل القلق"}
            </p>
          </div>

          <div className="h-px" style={{ background: "var(--cream-dk)" }} />

          {/* Self-learning */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black">📈 مؤشر التعلم الذاتي</span>
              <span
                className="text-sm font-black"
                style={{ color: health.selfLearningScore >= 70 ? "#4FB286" : health.selfLearningScore >= 50 ? "#FFC93C" : "#E86A8E" }}
              >
                {health.selfLearningScore} / 100
              </span>
            </div>
            <ScoreBar
              value={health.selfLearningScore}
              color={health.selfLearningScore >= 70 ? "#4FB286" : health.selfLearningScore >= 50 ? "#FFC93C" : "#E86A8E"}
            />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {health.selfLearningScore >= 70
                ? "فضولي ومتحمس للاكتشاف بمفرده"
                : health.selfLearningScore >= 50
                ? "يحتاج تشجيعاً لاستكشاف المواد بمفرده"
                : "يعتمد على التوجيه المباشر — زوده بمصادر ممتعة"}
            </p>
          </div>

          <div className="h-px" style={{ background: "var(--cream-dk)" }} />

          {/* Focus */}
          <div className="space-y-2">
            <span className="text-sm font-black">🎯 مستوى التركيز</span>
            <FocusIndicator level={health.focusLevel} />
          </div>
        </div>

        {/* ── 3. Subject Scores ── */}
        <div className="rounded-3xl p-5" style={{ background: "white" }}>
          <h2 className="font-black text-base mb-4">أداء المواد</h2>
          <div className="space-y-4">
            {Object.entries(scores).map(([subj, score]) => {
              const color = score >= 70 ? "#4FB286" : score >= 50 ? "#FFC93C" : "#E86A8E";
              return (
                <div key={subj}>
                  <div className="flex justify-between text-sm font-bold mb-1.5">
                    <span>{SUBJECT_LABELS[subj] || subj}</span>
                    <span style={{ color }}>{score}%</span>
                  </div>
                  <ScoreBar value={score} color={color} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 4. Top 3 Weakest Skills ── */}
        {health.weakSkills.length > 0 && (
          <div className="rounded-3xl p-5" style={{ background: "white" }}>
            <h2 className="font-black text-base mb-1">⚠️ أخطر ٣ مهارات تحتاج تدخلاً</h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              المهارات الأدنى أداءً — تؤثر على المواد المرتبطة بها
            </p>
            <div className="space-y-4">
              {health.weakSkills.map((skill, i) => {
                const color = skill.score >= 70 ? "#4FB286" : skill.score >= 40 ? "#FFC93C" : "#E86A8E";
                return (
                  <div key={skill.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: color }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-black">{skill.label}</p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {skill.subjectIcon} {skill.subject}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-black" style={{ color }}>{skill.score}%</span>
                    </div>
                    <ScoreBar value={skill.score} color={color} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 5. Risk Predictions ── */}
        {health.riskPredictions.length > 0 && (
          <div className="rounded-3xl p-5" style={{ background: "white" }}>
            <h2 className="font-black text-base mb-1">🔮 توقعات المخاطر القادمة</h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              بناءً على الأنماط الحالية — تتطلب انتباهاً مبكراً
            </p>
            <div className="space-y-3">
              {health.riskPredictions.map(risk => (
                <div
                  key={risk.id}
                  className="rounded-2xl p-4 flex gap-3"
                  style={{ background: "var(--cream-md)" }}
                >
                  <SeverityBadge severity={risk.severity} />
                  <div>
                    <p className="text-sm font-black">{risk.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{risk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 6. Strengths & Weaknesses ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl p-4" style={{ background: "white" }}>
            <h3 className="font-black text-sm mb-3">💪 نقاط القوة</h3>
            {health.strengths.length > 0 ? (
              <ul className="space-y-2">
                {health.strengths.map(s => (
                  <li key={s} className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#4FB286" }} />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>تحتاج مراجعة</p>
            )}
          </div>
          <div className="rounded-3xl p-4" style={{ background: "white" }}>
            <h3 className="font-black text-sm mb-3">🎯 تحتاج تركيزاً</h3>
            {health.weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {health.weaknesses.map(w => (
                  <li key={w} className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#E86A8E" }} />
                    {w}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>ممتاز في كل المواد!</p>
            )}
          </div>
        </div>

        {/* ── 7. Remediation Plan ── */}
        {health.plan.length > 0 && (
          <div className="rounded-3xl p-5" style={{ background: "white" }}>
            <h2 className="font-black text-base mb-4">📋 الخطة العلاجية المقترحة</h2>
            <div className="space-y-3">
              {health.plan.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl p-4" style={{ background: "var(--cream-md)" }}>
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-sm">{item.subject}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: PRIORITY_COLOR[item.priority] + "22", color: PRIORITY_COLOR[item.priority] }}
                      >
                        {PRIORITY_LABEL[item.priority]}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs pb-6" style={{ color: "var(--text-muted)" }}>
          آخر تحديث: {new Date(student.diagnostic.completedAt).toLocaleDateString("ar-SA")}
        </p>
      </div>
    </div>
  );
}
