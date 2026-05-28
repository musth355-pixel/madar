"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AVATARS, GRADE_LABELS, INTERESTS, type Grade } from "@/lib/types";
import { saveStudent } from "@/lib/storage";
import type { StudentDNA } from "@/lib/types";

type Step = "name" | "grade" | "avatar" | "interests";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade>(2);
  const [avatar, setAvatar] = useState("🦊");
  const [interests, setInterests] = useState<string[]>([]);

  const steps: Step[] = ["name", "grade", "avatar", "interests"];
  const stepIndex = steps.indexOf(step);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  function toggleInterest(id: string) {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }

  function finish() {
    const student: StudentDNA = {
      id: crypto.randomUUID(),
      name,
      grade,
      avatar,
      interests,
      createdAt: new Date().toISOString(),
      diagnostic: null,
      xp: 0,
      level: 1,
      streak: 0,
      completedLessons: [],
      // Student DNA — populated after diagnostic
      learningStyle: null,
      confidenceScore: 0,
      selfLearningScore: 0,
      focusLevel: null,
      skillMastery: {},
      riskPredictions: [],
    };
    saveStudent(student);
    router.push("/assessment");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Progress bar */}
      <div className="h-1.5 w-full" style={{ background: "var(--cream-dk)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "var(--primary)" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8 max-w-md mx-auto w-full">

        {stepIndex > 0 && (
          <button
            onClick={() => setStep(steps[stepIndex - 1])}
            className="self-start text-sm font-bold flex items-center gap-1"
            style={{ color: "var(--text-muted)" }}
          >
            ← رجوع
          </button>
        )}

        {/* STEP: name */}
        {step === "name" && (
          <div className="w-full flex flex-col gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">👋</div>
              <h2 className="text-2xl font-black">ما اسمك؟</h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>سيناديك مدار بهذا الاسم</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="اكتب اسمك هنا..."
              className="w-full text-center text-xl font-bold rounded-2xl px-4 py-4 outline-none border-2 transition-colors"
              style={{
                background: "white",
                borderColor: name ? "var(--primary)" : "var(--cream-dk)",
                color: "var(--text-main)",
              }}
              maxLength={20}
              autoFocus
            />
            <button
              onClick={() => name.trim() && setStep("grade")}
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl font-black text-lg text-white transition-opacity"
              style={{ background: "var(--primary)", opacity: name.trim() ? 1 : 0.4 }}
            >
              التالي →
            </button>
          </div>
        )}

        {/* STEP: grade */}
        {step === "grade" && (
          <div className="w-full flex flex-col gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">🎒</div>
              <h2 className="text-2xl font-black">في أي صف أنت؟</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(GRADE_LABELS) as [string, string][]).map(([g, label]) => (
                <button
                  key={g}
                  onClick={() => setGrade(Number(g) as Grade)}
                  className="rounded-2xl py-4 px-3 font-bold text-sm transition-all"
                  style={{
                    background: grade === Number(g) ? "var(--primary)" : "var(--cream-md)",
                    color: grade === Number(g) ? "white" : "var(--text-main)",
                    transform: grade === Number(g) ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("avatar")}
              className="w-full py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "var(--primary)" }}
            >
              التالي →
            </button>
          </div>
        )}

        {/* STEP: avatar */}
        {step === "avatar" && (
          <div className="w-full flex flex-col gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">{avatar}</div>
              <h2 className="text-2xl font-black">اختر شخصيتك</h2>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {AVATARS.map(a => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className="text-4xl rounded-2xl p-3 transition-all"
                  style={{
                    background: avatar === a ? "var(--primary)" : "var(--cream-md)",
                    transform: avatar === a ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("interests")}
              className="w-full py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "var(--primary)" }}
            >
              التالي →
            </button>
          </div>
        )}

        {/* STEP: interests */}
        {step === "interests" && (
          <div className="w-full flex flex-col gap-6">
            <div className="text-center">
              <div className="text-5xl mb-3">✨</div>
              <h2 className="text-2xl font-black">ما اهتماماتك؟</h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                اختر حتى ٤ — يشرح مدار الدروس بأسلوبك المفضل
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map(i => {
                const selected = interests.includes(i.id);
                return (
                  <button
                    key={i.id}
                    onClick={() => toggleInterest(i.id)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-sm transition-all"
                    style={{
                      background: selected ? "var(--primary)" : "var(--cream-md)",
                      color: selected ? "white" : "var(--text-main)",
                    }}
                  >
                    <span className="text-2xl">{i.icon}</span>
                    {i.label}
                    {selected && <span className="mr-auto">✓</span>}
                  </button>
                );
              })}
            </div>
            <button
              onClick={finish}
              disabled={interests.length === 0}
              className="w-full py-4 rounded-2xl font-black text-lg text-white transition-opacity"
              style={{ background: "var(--primary)", opacity: interests.length > 0 ? 1 : 0.4 }}
            >
              ابدأ الاختبار 🎯
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
