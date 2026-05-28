"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/assessment-data";
import { saveDiagnostic, getStudent } from "@/lib/storage";

const SUBJECT_LABELS: Record<string, string> = {
  math: 'الرياضيات',
  arabic: 'لغتي',
  science: 'العلوم',
};

const SUBJECT_ICONS: Record<string, string> = {
  math: '🔢',
  arabic: '📖',
  science: '🔬',
};

export default function AssessmentPage() {
  const router = useRouter();
  const student = typeof window !== "undefined" ? getStudent() : null;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(DIAGNOSTIC_QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [scores, setScores] = useState<Record<string, { correct: number; total: number }>>({});

  const q = DIAGNOSTIC_QUESTIONS[current];
  const progress = ((current) / DIAGNOSTIC_QUESTIONS.length) * 100;

  function choose(idx: number) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);

    const updatedAnswers = [...answers];
    updatedAnswers[current] = idx;
    setAnswers(updatedAnswers);

    const subj = q.subject;
    setScores(prev => ({
      ...prev,
      [subj]: {
        correct: (prev[subj]?.correct ?? 0) + (idx === q.correct ? 1 : 0),
        total: (prev[subj]?.total ?? 0) + 1,
      },
    }));
  }

  function next() {
    if (current + 1 >= DIAGNOSTIC_QUESTIONS.length) {
      finalize();
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function finalize() {
    const subjectScores: Record<string, number> = {};
    for (const [subj, data] of Object.entries(scores)) {
      subjectScores[subj] = Math.round((data.correct / data.total) * 100);
    }

    const sorted = Object.entries(subjectScores).sort((a, b) => b[1] - a[1]);
    const strengths = sorted.filter(([, v]) => v >= 70).map(([k]) => k);
    const weaknesses = sorted.filter(([, v]) => v < 70).sort((a, b) => a[1] - b[1]).map(([k]) => k);

    saveDiagnostic({
      completedAt: new Date().toISOString(),
      scores: subjectScores,
      strengths,
      weaknesses,
    });
    setDone(true);
  }

  if (!student && typeof window !== "undefined") {
    router.replace("/");
    return null;
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6" style={{ background: "var(--cream)" }}>
        <div className="text-7xl animate-bounce">🎉</div>
        <div>
          <h2 className="text-3xl font-black">أحسنت، {student?.name}!</h2>
          <p className="text-lg mt-2" style={{ color: "var(--text-muted)" }}>
            انتهى الاختبار التشخيصي وعالمك التعليمي جاهز
          </p>
        </div>

        <div className="w-full max-w-sm rounded-3xl p-5 space-y-3" style={{ background: "var(--cream-md)" }}>
          {Object.entries(scores).map(([subj, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            return (
              <div key={subj}>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>{SUBJECT_ICONS[subj]} {SUBJECT_LABELS[subj]}</span>
                  <span style={{ color: pct >= 70 ? "#4FB286" : "#E86A8E" }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: pct >= 70 ? "#4FB286" : pct >= 50 ? "#FFC93C" : "#E86A8E",
                    }}
                  />
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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Progress */}
      <div className="h-1.5 w-full" style={{ background: "var(--cream-dk)" }}>
        <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: "var(--primary)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 max-w-md mx-auto w-full">
        {/* Counter */}
        <div className="self-end text-sm font-bold" style={{ color: "var(--text-muted)" }}>
          {current + 1} / {DIAGNOSTIC_QUESTIONS.length}
        </div>

        {/* Subject badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold self-start"
          style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}
        >
          {SUBJECT_ICONS[q.subject]} {SUBJECT_LABELS[q.subject]}
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
            let bg = "var(--cream-md)";
            let col = "var(--text-main)";
            if (revealed) {
              if (idx === q.correct) { bg = "#4FB286"; col = "white"; }
              else if (idx === selected) { bg = "#E86A8E"; col = "white"; }
            } else if (selected === idx) {
              bg = "var(--primary)"; col = "white";
            }
            return (
              <button
                key={idx}
                onClick={() => choose(idx)}
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
              background: selected === q.correct ? "#DFF3E9" : "#FCE3EA",
              color: selected === q.correct ? "#4FB286" : "#E86A8E",
            }}
          >
            {selected === q.correct ? "✅ إجابة صحيحة!" : `❌ الجواب الصحيح: ${q.options[q.correct]}`}
          </div>
        )}

        {revealed && (
          <button
            onClick={next}
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
