"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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

const MASCOT_STATES = {
  idle:    "😊",
  talking: "🗣️",
  cheer:   "🎉",
  wrong:   "😅",
  think:   "🤔",
  done:    "🥳",
};

const STARS = ["⭐","🌟","✨","💫","⭐","🌟"];

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({length: 18}).map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${(i * 5.5) % 100}%`,
            animation: `fall ${1.2 + (i % 4) * 0.3}s ease-in forwards`,
            animationDelay: `${(i % 6) * 0.1}s`,
            top: "-40px",
          }}
        >
          {STARS[i % STARS.length]}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-8deg); }
          50%      { transform: rotate(8deg); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MascotBubble({ text, color }: { text: string; color: string }) {
  return (
    <div
      className="relative rounded-2xl px-4 py-3 text-sm font-bold text-right leading-relaxed max-w-xs"
      style={{ background: color + "22", border: `2px solid ${color}44`, color: "#3A2210", animation: "pop 0.3s ease" }}
    >
      {text}
      <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45" style={{ background: color + "22", borderRight: `2px solid ${color}44`, borderBottom: `2px solid ${color}44` }} />
    </div>
  );
}

export default function LessonScreen({ lesson, onClose, onComplete }: Props) {
  const [stepIndex, setStepIndex]   = useState(0);
  const [selected, setSelected]     = useState<number | null>(null);
  const [answered, setAnswered]     = useState(false);
  const [hearts, setHearts]         = useState(3);
  const [xpEarned, setXpEarned]     = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascot, setMascot]         = useState<keyof typeof MASCOT_STATES>("idle");
  const [bubble, setBubble]         = useState("");

  const step     = lesson.steps[stepIndex];
  const progress = (stepIndex / lesson.steps.length) * 100;
  const isLast   = stepIndex === lesson.steps.length - 1;
  const practiceCount = lesson.steps.filter(s => s.type === "practice").length || 1;
  const xpPerQ   = Math.floor(lesson.xp / practiceCount);

  useEffect(() => {
    if (step.type === "intro") {
      setMascot("talking");
      setBubble(`أهلاً! سنتعلم اليوم: ${lesson.title} 🌟`);
    } else if (step.type === "explain" || step.type === "example") {
      setMascot("talking");
      setBubble("ركّز معي جيداً! 👀");
    } else if (step.type === "practice") {
      setMascot("think");
      setBubble("فكّر وأجب! أنت تستطيع 💪");
    } else if (step.type === "done") {
      setMascot("done");
      setBubble("أحسنت! أنت بطل! 🏆");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setSelected(null);
    setAnswered(false);
  }, [stepIndex]);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === step.correct) {
      setXpEarned(x => x + xpPerQ);
      setMascot("cheer");
      setBubble("ممتاز! إجابة صحيحة تماماً! 🎉");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    } else {
      setHearts(h => Math.max(0, h - 1));
      setMascot("wrong");
      setBubble(step.hint ? `تلميح: ${step.hint} 💡` : "حاول مرة أخرى في الدرس القادم! 💪");
    }
  };

  const handleNext = () => {
    if (isLast) { onComplete(xpEarned + 10); return; }
    setStepIndex(i => i + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "var(--cream)" }}>
      {showConfetti && <Confetti />}

      {/* ── Top Bar ── */}
      <div className="flex items-center gap-3 px-4 py-3 shadow-sm" style={{ background: "white" }}>
        <button onClick={onClose} className="text-2xl transition-transform hover:scale-110" style={{ color: "var(--text-muted)" }}>✕</button>

        {/* Progress */}
        <div className="flex-1 h-4 rounded-full overflow-hidden relative" style={{ background: "var(--track)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${lesson.subjectColor}, ${lesson.subjectColor}cc)` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex gap-0.5">
          {[1,2,3].map(h => (
            <span key={h} className="text-xl transition-all" style={{ filter: h <= hearts ? "none" : "grayscale(1)", opacity: h <= hearts ? 1 : 0.3 }}>❤️</span>
          ))}
        </div>

        {/* XP */}
        <div className="text-xs font-black px-2 py-1 rounded-full text-white" style={{ background: lesson.subjectColor }}>
          +{xpEarned} XP
        </div>
      </div>

      {/* ── Subject badge ── */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black text-white" style={{ background: lesson.subjectColor }}>
          {lesson.icon} {lesson.subject}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto px-4 py-2 max-w-lg mx-auto w-full space-y-4">

        {/* Mascot Row */}
        <div className="flex items-end gap-3 justify-end">
          <MascotBubble text={bubble} color={lesson.subjectColor} />
          <div
            className="text-5xl flex-shrink-0"
            style={{
              animation: mascot === "cheer" ? "wiggle 0.4s ease infinite" :
                         mascot === "done"  ? "float 2s ease infinite" : "float 3s ease infinite",
            }}
          >
            {MASCOT_STATES[mascot]}
          </div>
        </div>

        {/* ── INTRO ── */}
        {step.type === "intro" && (
          <div className="rounded-3xl p-6 text-center space-y-4" style={{ background: lesson.subjectColor + "15", border: `2px solid ${lesson.subjectColor}33` }}>
            <div className="text-7xl" style={{ animation: "float 2s ease infinite" }}>{lesson.icon}</div>
            <h1 className="text-2xl font-black" style={{ color: "var(--text-main)" }}>{lesson.title}</h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.body}</p>
          </div>
        )}

        {/* ── EXPLAIN ── */}
        {(step.type === "explain" || step.type === "example") && (
          <div className="space-y-3">
            {step.title && (
              <div className="rounded-2xl px-4 py-2 font-black text-lg text-white text-center" style={{ background: lesson.subjectColor }}>
                {step.title}
              </div>
            )}
            <div className="rounded-3xl p-5 space-y-3" style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              {step.body && (
                <pre className="whitespace-pre-wrap font-sans text-base leading-loose" style={{ color: "var(--text-main)" }}>
                  {step.body}
                </pre>
              )}
              {step.visual && (
                <div className="rounded-2xl p-4" style={{ background: lesson.subjectColor + "10" }}>
                  {step.visual}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PRACTICE ── */}
        {step.type === "practice" && (
          <div className="space-y-4">
            {/* Question card */}
            <div className="rounded-3xl p-5 text-center" style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div className="text-4xl mb-3">🤔</div>
              <h2 className="text-lg font-black leading-relaxed" style={{ color: "var(--text-main)" }}>{step.question}</h2>
            </div>

            {step.visual && (
              <div className="rounded-2xl p-4" style={{ background: lesson.subjectColor + "10" }}>
                {step.visual}
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {step.options?.map((opt, i) => {
                const isCorrect  = i === step.correct;
                const isSelected = i === selected;
                let bg     = "white";
                let border = "#E0D0C0";
                let scale  = "1";
                if (answered && isSelected && isCorrect)  { bg = "#d4f5e7"; border = "#4FB286"; }
                if (answered && isSelected && !isCorrect) { bg = "#fde8e8"; border = "#e74c3c"; }
                if (answered && !isSelected && isCorrect) { bg = "#d4f5e7"; border = "#4FB286"; }
                if (!answered && isSelected)              { scale = "0.97"; }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className="rounded-2xl p-4 font-black text-lg border-2 transition-all active:scale-95 text-center"
                    style={{
                      background: bg,
                      borderColor: border,
                      color: "var(--text-main)",
                      transform: `scale(${scale})`,
                      boxShadow: answered && isCorrect ? `0 0 0 4px ${lesson.subjectColor}44` : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {answered && isCorrect  && <span className="text-green-500 ml-1">✓ </span>}
                    {answered && isSelected && !isCorrect && <span className="text-red-500 ml-1">✗ </span>}
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Result banner */}
            {answered && (
              <div
                className="rounded-2xl p-4 text-center font-black text-base"
                style={{
                  background: selected === step.correct ? "#d4f5e7" : "#fde8e8",
                  color:      selected === step.correct ? "#2e7d52" : "#c0392b",
                  animation: "pop 0.3s ease",
                }}
              >
                {selected === step.correct
                  ? `🎉 ممتاز! +${xpPerQ} XP`
                  : `💡 ${step.hint || "حاول مجدداً!"}`}
              </div>
            )}
          </div>
        )}

        {/* ── DONE ── */}
        {step.type === "done" && (
          <div className="rounded-3xl p-8 text-center space-y-5" style={{ background: lesson.subjectColor + "15", border: `3px solid ${lesson.subjectColor}` }}>
            <div className="text-8xl" style={{ animation: "float 1.5s ease infinite" }}>🎊</div>
            <h2 className="text-3xl font-black" style={{ color: "var(--text-main)" }}>أحسنت! 🏆</h2>
            <p className="text-lg font-bold" style={{ color: "var(--text-muted)" }}>لقد أكملت الدرس بنجاح!</p>

            <div className="flex justify-center gap-6 mt-4">
              <div className="text-center">
                <div className="text-4xl font-black" style={{ color: lesson.subjectColor }}>+{xpEarned + 10}</div>
                <div className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>نقطة XP</div>
              </div>
              <div className="text-center">
                <div className="flex gap-0.5 justify-center">
                  {[1,2,3].map(h => <span key={h} className="text-2xl">{h <= hearts ? "❤️" : "🖤"}</span>)}
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>قلوب</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black" style={{ color: lesson.subjectColor }}>
                  {hearts === 3 ? "🌟" : hearts === 2 ? "⭐" : "✨"}
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
                  {hearts === 3 ? "ممتاز" : hearts === 2 ? "جيد جداً" : "جيد"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Button ── */}
      <div className="px-4 pb-6 pt-3 max-w-lg mx-auto w-full">
        {step.type === "practice" && !answered ? (
          <div className="rounded-2xl py-4 font-black text-lg text-center opacity-40 text-white" style={{ background: lesson.subjectColor }}>
            اختر إجابتك 👆
          </div>
        ) : (
          <button
            onClick={handleNext}
            className="w-full rounded-2xl py-4 font-black text-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${lesson.subjectColor}, ${lesson.subjectColor}bb)`,
              boxShadow: `0 6px 20px ${lesson.subjectColor}55`,
            }}
          >
            {isLast ? "إنهاء الدرس 🎉" : step.type === "done" ? "إغلاق 🏠" : "التالي ←"}
          </button>
        )}
      </div>
    </div>
  );
}
