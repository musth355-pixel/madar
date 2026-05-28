"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent, computeAcademicHealth } from "@/lib/storage";
import type { StudentDNA, AcademicHealth } from "@/lib/types";

const PRIORITY_COLOR: Record<string, string> = {
  high: "#E86A8E",
  medium: "#FFC93C",
  low: "#4FB286",
};

const PRIORITY_LABEL: Record<string, string> = {
  high: "عاجل",
  medium: "مهم",
  low: "تحسين",
};

export default function ParentPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDNA | null>(null);
  const [health, setHealth] = useState<AcademicHealth | null>(null);

  useEffect(() => {
    const s = getStudent();
    if (!s) { setStudent(null); return; }
    setStudent(s);
    if (s.diagnostic) {
      setHealth(computeAcademicHealth(s));
    }
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ background: "var(--cream)" }}>
        <div className="text-6xl">👨‍👦</div>
        <h2 className="text-2xl font-black">لا يوجد طفل مسجّل بعد</h2>
        <p style={{ color: "var(--text-muted)" }}>اطلب من طفلك تسجيل حسابه أولاً</p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-2xl font-black text-white"
          style={{ background: "var(--primary)" }}
        >
          ابدأ التسجيل
        </button>
      </div>
    );
  }

  if (!student.diagnostic || !health) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ background: "var(--cream)" }}>
        <div className="text-6xl">⏳</div>
        <h2 className="text-2xl font-black">لم يُكمل {student.name} الاختبار بعد</h2>
        <p style={{ color: "var(--text-muted)" }}>يجب إتمام الاختبار التشخيصي أولاً</p>
        <button
          onClick={() => router.push("/assessment")}
          className="px-8 py-3 rounded-2xl font-black text-white"
          style={{ background: "var(--primary)" }}
        >
          ابدأ الاختبار
        </button>
      </div>
    );
  }

  const scores = student.diagnostic.scores;

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--cream-dk)" }}>
        <div>
          <h1 className="text-xl font-black">لوحة المتابعة</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>تقرير {student.name} {student.avatar}</p>
        </div>
        <button
          onClick={() => router.push("/world")}
          className="text-sm font-bold px-4 py-2 rounded-full"
          style={{ background: "var(--primary)", color: "white" }}
        >
          عالم الطفل
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-6 space-y-5">

        {/* Academic Health Score */}
        <div className="rounded-3xl p-6 text-center" style={{ background: "white" }}>
          <p className="text-sm font-bold mb-3" style={{ color: "var(--text-muted)" }}>Academic Health Score</p>

          {/* Ring */}
          <div className="relative inline-flex items-center justify-center mb-3">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="var(--cream-dk)" strokeWidth="14" />
              <circle
                cx="70" cy="70" r="58"
                fill="none"
                stroke={health.color}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - health.score / 100)}`}
                transform="rotate(-90 70 70)"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black" style={{ color: health.color }}>{health.score}</span>
              <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>/ 100</span>
            </div>
          </div>

          <div className="inline-block px-4 py-1 rounded-full text-sm font-black" style={{ background: health.color + "22", color: health.color }}>
            {health.label}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "المستوى", value: student.level, icon: "⭐" },
              { label: "النقاط",  value: student.xp,    icon: "🔥" },
              { label: "الأيام",  value: student.streak, icon: "📅" },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-3 text-center" style={{ background: "var(--cream-md)" }}>
                <div className="text-xl">{stat.icon}</div>
                <div className="font-black text-lg">{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject scores */}
        <div className="rounded-3xl p-5" style={{ background: "white" }}>
          <h2 className="font-black text-lg mb-4">نتائج التشخيص</h2>
          <div className="space-y-4">
            {Object.entries(scores).map(([subj, score]) => {
              const color = score >= 70 ? "#4FB286" : score >= 50 ? "#FFC93C" : "#E86A8E";
              const labels: Record<string, string> = { math: "🔢 الرياضيات", arabic: "📖 لغتي", science: "🔬 العلوم" };
              return (
                <div key={subj}>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>{labels[subj] || subj}</span>
                    <span style={{ color }}>{score}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl p-5" style={{ background: "white" }}>
            <h3 className="font-black mb-3">💪 نقاط القوة</h3>
            {health.strengths.length > 0 ? (
              <ul className="space-y-2">
                {health.strengths.map(s => (
                  <li key={s} className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>تحتاج مراجعة</p>
            )}
          </div>
          <div className="rounded-3xl p-5" style={{ background: "white" }}>
            <h3 className="font-black mb-3">🎯 تحتاج تركيز</h3>
            {health.weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {health.weaknesses.map(w => (
                  <li key={w} className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>ممتاز في كل المواد!</p>
            )}
          </div>
        </div>

        {/* Remediation Plan */}
        {health.plan.length > 0 && (
          <div className="rounded-3xl p-5" style={{ background: "white" }}>
            <h2 className="font-black text-lg mb-4">📋 الخطة العلاجية المقترحة</h2>
            <div className="space-y-3">
              {health.plan.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl p-4"
                  style={{ background: "var(--cream-md)" }}
                >
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-sm">{item.subject}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: PRIORITY_COLOR[item.priority] + "22",
                          color: PRIORITY_COLOR[item.priority],
                        }}
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

        {/* Last updated */}
        <p className="text-center text-xs pb-4" style={{ color: "var(--text-muted)" }}>
          آخر تحديث: {new Date(student.diagnostic.completedAt).toLocaleDateString("ar-SA")}
        </p>
      </div>
    </div>
  );
}
