"use client";

import { useState } from "react";

type Step = {
  type: "intro" | "explain" | "example" | "practice" | "done";
  title?: string;
  body?: string;
  visual?: React.ReactNode;
  question?: string;
  options?: string[];
  correct?: number;
  hint?: string;
};

type Lesson = {
  title: string;
  subject: string;
  subjectColor: string;
  icon: string;
  xp: number;
  steps: Step[];
};

type Props = {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (xp: number) => void;
};

export default function LessonScreen({ lesson, onClose, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [xpEarned, setXpEarned] = useState(0);

  const step = lesson.steps[stepIndex];
  const progress = ((stepIndex) / lesson.steps.length) * 100;
  const isLast = stepIndex === lesson.steps.length - 1;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === step.correct) {
      setXpEarned((x) => x + Math.floor(lesson.xp / lesson.steps.filter(s => s.type === "practice").length));
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(xpEarned + 10);
      return;
    }
    setSelected(null);
    setAnswered(false);
    setStepIndex((i) => i + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "var(--cream)" }}>

      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--cream-dk)", background: "white" }}>
        <button onClick={onClose} className="text-2xl" style={{ color: "var(--text-muted)" }}>✕</button>

        {/* Progress Bar */}
        <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--track)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: lesson.subjectColor }}
          />
        </div>

        {/* Hearts */}
        <div className="flex gap-0.5">
          {[1, 2, 3].map((h) => (
            <span key={h} className="text-lg">{h <= hearts ? "❤️" : "🖤"}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-6 max-w-lg mx-auto w-full">

        {/* Mascot */}
        <div className="text-6xl mb-4 animate-bounce">{lesson.icon}</div>

        {/* INTRO */}
        {step.type === "intro" && (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-black" style={{ color: "var(--text-main)" }}>{lesson.title}</h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.body}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white text-sm" style={{ background: lesson.subjectColor }}>
              {lesson.icon} {lesson.subject}
            </div>
          </div>
        )}

        {/* EXPLAIN */}
        {step.type === "explain" && (
          <div className="w-full space-y-4">
            <h2 className="text-xl font-black text-center" style={{ color: "var(--text-main)" }}>{step.title}</h2>
            <div className="rounded-2xl p-5 text-base leading-loose" style={{ background: "white", color: "var(--text-main)" }}>
              {step.body}
            </div>
            {step.visual && (
              <div className="rounded-2xl p-4 flex items-center justify-center" style={{ background: "var(--cream-md)" }}>
                {step.visual}
              </div>
            )}
          </div>
        )}

        {/* EXAMPLE */}
        {step.type === "example" && (
          <div className="w-full space-y-4">
            <h2 className="text-xl font-black text-center" style={{ color: "var(--text-main)" }}>{step.title}</h2>
            <div className="rounded-2xl p-5" style={{ background: "white" }}>
              <p className="text-base leading-loose mb-3" style={{ color: "var(--text-muted)" }}>{step.body}</p>
              {step.visual && (
                <div className="flex items-center justify-center py-3">
                  {step.visual}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRACTICE */}
        {step.type === "practice" && (
          <div className="w-full space-y-4">
            <h2 className="text-lg font-black text-center" style={{ color: "var(--text-main)" }}>
              {step.question}
            </h2>
            {step.visual && (
              <div className="rounded-2xl p-4 flex items-center justify-center" style={{ background: "white" }}>
                {step.visual}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {step.options?.map((opt, i) => {
                const isCorrect = i === step.correct;
                const isSelected = i === selected;
                let bg = "white";
                let border = "var(--cream-dk)";
                if (answered && isSelected && isCorrect) { bg = "#d4f5e7"; border = "#4FB286"; }
                if (answered && isSelected && !isCorrect) { bg = "#fde8e8"; border = "#e74c3c"; }
                if (answered && !isSelected && isCorrect) { bg = "#d4f5e7"; border = "#4FB286"; }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className="rounded-2xl p-4 font-black text-lg border-2 transition-all"
                    style={{ background: bg, borderColor: border, color: "var(--text-main)" }}
                  >
                    {opt}
                    {answered && isCorrect && <span className="mr-2">✓</span>}
                    {answered && isSelected && !isCorrect && <span className="mr-2">✗</span>}
                  </button>
                );
              })}
            </div>
            {answered && !selected !== null && (
              <div
                className="rounded-2xl p-4 text-center font-bold"
                style={{
                  background: selected === step.correct ? "#d4f5e7" : "#fde8e8",
                  color: selected === step.correct ? "#2e7d52" : "#c0392b",
                }}
              >
                {selected === step.correct
                  ? "🎉 ممتاز! إجابة صحيحة!"
                  : `💡 ${step.hint || "حاول مرة أخرى في الدرس القادم!"}`}
              </div>
            )}
          </div>
        )}

        {/* DONE */}
        {step.type === "done" && (
          <div className="text-center space-y-5">
            <div className="text-7xl">🎊</div>
            <h2 className="text-2xl font-black" style={{ color: "var(--text-main)" }}>أحسنت! أكملت الدرس!</h2>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-black" style={{ color: lesson.subjectColor }}>+{xpEarned + 10}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>نقطة XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black">{"❤️".repeat(hearts)}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>قلوب متبقية</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-6 pt-2">
        {step.type === "practice" && !answered ? (
          <button
            disabled
            className="w-full rounded-2xl py-4 font-black text-lg text-white opacity-40"
            style={{ background: lesson.subjectColor }}
          >
            اختر إجابة
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full rounded-2xl py-4 font-black text-lg text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: lesson.subjectColor }}
          >
            {isLast ? "إنهاء الدرس 🎉" : "التالي →"}
          </button>
        )}
      </div>
    </div>
  );
}
