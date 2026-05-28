"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BEHAVIORAL_QUESTIONS, DIAGNOSTIC_QUESTIONS } from "@/lib/assessment-data";
import { buildAndSaveDiagnostic, getStudent } from "@/lib/storage";
import type { LearningStyle } from "@/lib/types";
import type { AnswerRecord } from "@/lib/storage";

type Phase = "behavioral" | "academic" | "done";

const SUBJECT_LABELS: Record<string, string> = { math: 'الرياضيات', arabic: 'لغتي', science: 'العلوم' };
const SUBJECT_ICONS: Record<string, string> = { math: '🔢', arabic: '📖', science: '🔬' };

export default function AssessmentPage() {
  const router = useRouter();
  const student = typeof window !== "undefined" ? getStudent() : null;

  const [phase, setPhase] = useState<Phase>("behavioral");
  const [current, setCurrent] = useState(0);
  const [behavioralVotes, setBehavioralVotes] = useState<LearningStyle[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  // Academic question state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Summary scores for the result screen
  const [summary, setSummary] = useState<Record<string, { correct: number; total: number }>>({});

  if (!student && typeof window !== "undefined") {
    router.replace("/");
    return null;
  }

  // ── Behavioral phase ─────────────────────────────────────────────────────

  function chooseBehavioral(style: LearningStyle) {
    const updated = [...behavioralVotes, style];
    setBehavioralVotes(updated);

    if (current + 1 < BEHAVIORAL_QUESTIONS.length) {
      setCurrent(c => c + 1);
    } else {
      setCurrent(0);
      setPhase("academic");
    }
  }

  // ── Academic phase ───────────────────────────────────────────────────────

  function chooseAcademic(idx: number) {
    if (revealed) return;
    const q = DIAGNOSTIC_QUESTIONS[current];
    const correct = idx === q.correct;
    setSelectedOption(idx);
    setRevealed(true);

    setAnswers(prev => [...prev, {
      skillId: q.skill,
      skillLabel: q.skillLabel,
      subject: q.subject,
      correct,
      difficulty: q.difficulty,
    }]);

    setSummary(prev => ({
      ...prev,
      [q.subject]: {
        correct: (prev[q.subject]?.correct ?? 0) + (correct ? 1 : 0),
        total: (prev[q.subject]?.total ?? 0) + 1,
      },
    }));
  }

  function nextAcademic() {
    if (current + 1 >= DIAGNOSTIC_QUESTIONS.length) {
      finalize();
    } else {
      setCurrent(c => c + 1);
      setSelectedOption(null);
      setRevealed(false);
    }
  }

  function finalize() {
    buildAndSaveDiagnostic({ answers, behavioralVotes });
    setPhase("done");
  }

  // ── Progress ─────────────────────────────────────────────────────────────

  const totalSteps = BEHAVIORAL_QUESTIONS.length + DIAGNOSTIC_QUESTIONS.length;
  const doneSteps = phase === "behavioral"
    ? current
    : BEHAVIORAL_QUESTIONS.length + current;
  const progress = (doneSteps / totalSteps) * 100;

  // ── Done screen ───────────────────────────────────────────────────────────

  if (phase === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6" style={{ background: "var(--cream)" }}>
        <div className="text-7xl animate-bounce">🎉</div>
        <div>
          <h2 className="text-3xl font-black">أحسنت، {student?.name}!</h2>
          <p className="text-lg mt-2" style={{ color: "var(--text-muted)" }}>
            انتهى التشخيص وعالمك التعليمي جاهز
          </p>
        </div>

        <div className="w-full max-w-sm rounded-3xl p-5 space-y-3" style={{ background: "var(--cream-md)" }}>
          {Object.entries(summary).map(([subj, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            const color = pct >= 70 ? "#4FB286" : pct >= 50 ? "#FFC93C" : "#E86A8E";
            return (
              <div key={subj}>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>{SUBJECT_ICONS[subj]} {SUBJECT_LABELS[subj]}</span>
                  <span style={{ color }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => router.push("/world")}
          className="w-full max-w-sm py-4 rounded-2xl font-black text-xl text-white"
          style={{ background: "var(--primary)" }}
        >
          ادخل عالمك 🌟
        </button>
      </div>
    );
  }

  // ── Behavioral question ───────────────────────────────────────────────────

  if (phase === "behavioral") {
    const bq = BEHAVIORAL_QUESTIONS[current];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
        <div className="h-1.5 w-full" style={{ background: "var(--cream-dk)" }}>
          <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: "var(--primary)" }} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 max-w-md mx-auto w-full">
          <div className="self-end text-sm font-bold" style={{ color: "var(--text-muted)" }}>
            {current + 1} / {BEHAVIORAL_QUESTIONS.length + DIAGNOSTIC_QUESTIONS.length}
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold self-start" style={{ background: "#F3E8FB", color: "#9B7EDE" }}>
            🧠 اكتشف أسلوب تعلّمك
          </div>

          <div
            className="w-full rounded-3xl p-6 space-y-2 text-center"
            style={{ background: "white", minHeight: 100 }}
          >
            <p className="text-xl font-black" style={{ color: "var(--text-main)" }}>{bq.text}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{bq.note}</p>
          </div>

          <div className="w-full space-y-3">
            {bq.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => chooseBehavioral(opt.style)}
                className="w-full rounded-2xl py-4 px-5 font-bold text-base text-right transition-all active:scale-95"
                style={{ background: "var(--cream-md)", color: "var(--text-main)" }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Academic question ─────────────────────────────────────────────────────

  const q = DIAGNOSTIC_QUESTIONS[current];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <div className="h-1.5 w-full" style={{ background: "var(--cream-dk)" }}>
        <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: "var(--primary)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 max-w-md mx-auto w-full">
        <div className="self-end text-sm font-bold" style={{ color: "var(--text-muted)" }}>
          {BEHAVIORAL_QUESTIONS.length + current + 1} / {BEHAVIORAL_QUESTIONS.length + DIAGNOSTIC_QUESTIONS.length}
        </div>

        {/* Subject + Skill badge */}
        <div className="flex items-center gap-2 self-start flex-wrap">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold" style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}>
            {SUBJECT_ICONS[q.subject]} {SUBJECT_LABELS[q.subject]}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "var(--cream-dk)", color: "var(--text-muted)" }}>
            {q.skillLabel}
          </div>
        </div>

        {/* Question */}
        <div
          className="w-full rounded-3xl p-6 text-center text-xl font-black leading-relaxed"
          style={{ background: "white", color: "var(--text-main)", minHeight: 120 }}
        >
          {q.text}
        </div>

        {/* Options */}
        <div className="w-full grid grid-cols-2 gap-3">
          {q.options.map((opt, idx) => {
            let bg = "var(--cream-md)", col = "var(--text-main)";
            if (revealed) {
              if (idx === q.correct) { bg = "#4FB286"; col = "white"; }
              else if (idx === selectedOption) { bg = "#E86A8E"; col = "white"; }
            }
            return (
              <button
                key={idx}
                onClick={() => chooseAcademic(idx)}
                className="rounded-2xl py-4 px-3 font-bold text-base transition-all active:scale-95"
                style={{ background: bg, color: col }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {revealed && (
          <div
            className="w-full rounded-2xl px-4 py-3 text-center font-bold"
            style={{
              background: selectedOption === q.correct ? "#DFF3E9" : "#FCE3EA",
              color: selectedOption === q.correct ? "#4FB286" : "#E86A8E",
            }}
          >
            {selectedOption === q.correct
              ? "✅ إجابة صحيحة!"
              : `❌ الجواب الصحيح: ${q.options[q.correct]}`}
          </div>
        )}

        {revealed && (
          <button
            onClick={nextAcademic}
            className="w-full py-4 rounded-2xl font-black text-lg text-white"
            style={{ background: "var(--primary)" }}
          >
            {current + 1 >= DIAGNOSTIC_QUESTIONS.length ? "انتهى الاختبار 🎯" : "السؤال التالي →"}
          </button>
        )}
      </div>
    </div>
  );
}
