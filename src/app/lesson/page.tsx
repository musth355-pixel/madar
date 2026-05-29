"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStudent, updateStudent } from "@/lib/storage";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/assessment-data";
import type { StudentDNA } from "@/lib/types";

const MISSION_XP = 25;

const SKILL_LABELS: Record<string, string> = {
  "math.addition": "الجمع", "math.subtraction": "الطرح",
  "math.geometry": "الأشكال الهندسية", "math.numbers": "الأرقام والتسلسل",
  "arabic.phonics": "الحروف والأصوات", "arabic.grammar": "القواعد والصرف",
  "arabic.vocabulary": "المفردات والمعاني",
  "science.animals": "عالم الحيوان", "science.plants": "عالم النبات",
};

const ZONE_BY_SKILL: Record<string, { name: string; icon: string; color: string }> = {
  "math.addition":     { name: "محطة الرياضيات",  icon: "🔢", color: "#FF8A3D" },
  "math.subtraction":  { name: "محطة الرياضيات",  icon: "🔢", color: "#FF8A3D" },
  "math.geometry":     { name: "محطة الرياضيات",  icon: "🔢", color: "#FF8A3D" },
  "math.numbers":      { name: "محطة الرياضيات",  icon: "🔢", color: "#FF8A3D" },
  "arabic.phonics":    { name: "واحة لغتي",        icon: "📖", color: "#E5602A" },
  "arabic.grammar":    { name: "واحة لغتي",        icon: "📖", color: "#E5602A" },
  "arabic.vocabulary": { name: "واحة لغتي",        icon: "📖", color: "#E5602A" },
  "science.animals":   { name: "مختبر العلوم",     icon: "🔬", color: "#4FB286" },
  "science.plants":    { name: "مختبر العلوم",     icon: "🔬", color: "#4FB286" },
};

type Phase = "question" | "correct" | "wrong";

export default function LessonPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDNA | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [question, setQuestion] = useState(DIAGNOSTIC_QUESTIONS[0]);
  const [zoneInfo, setZoneInfo] = useState(ZONE_BY_SKILL["math.addition"]);
  const [skillLabel, setSkillLabel] = useState("الجمع");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const s = getStudent();
    if (!s) { router.replace("/"); return; }
    if (!s.diagnostic) { router.replace("/assessment"); return; }
    setStudent(s);

    // Pick a question from the student's weakest skill
    const weakSkillId = s.diagnostic.weakSkills?.[0];
    const q = weakSkillId
      ? (DIAGNOSTIC_QUESTIONS.find(q => q.skill === weakSkillId) ?? DIAGNOSTIC_QUESTIONS[0])
      : DIAGNOSTIC_QUESTIONS[Math.floor(Math.random() * DIAGNOSTIC_QUESTIONS.length)];
    setQuestion(q);
    setZoneInfo(ZONE_BY_SKILL[q.skill] ?? ZONE_BY_SKILL["math.addition"]);
    setSkillLabel(SKILL_LABELS[q.skill] ?? q.skillLabel);
  }, [router]);

  function choose(idx: number) {
    if (phase !== "question") return;
    if (idx === question.correct) {
      setPhase("correct");
    } else {
      setAttempts(a => a + 1);
      setPhase("wrong");
    }
  }

  function tryAgain() {
    setPhase("question");
  }

  function finishMission() {
    const updated = updateStudent({ xp: (student?.xp ?? 0) + MISSION_XP });
    if (updated) setStudent(updated);
    router.push(`/mission-complete?xp=${MISSION_XP}`);
  }

  if (!student) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>

      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4">
        <button onClick={() => router.push("/world")} className="text-2xl" style={{ color: "var(--text-muted)" }}>←</button>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
          style={{ background: zoneInfo.color + "22", color: zoneInfo.color }}>
          <span>{zoneInfo.icon}</span>
          {zoneInfo.name}
        </div>
        <div className="mr-auto flex items-center gap-1.5 text-sm font-bold" style={{ color: "var(--text-muted)" }}>
          <span>🎯</span> مهمة اليوم
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-6 pb-10 max-w-md mx-auto w-full">

        {/* Skill badge */}
        <div className="self-start px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}>
          مهارة: {skillLabel}
        </div>

        {/* Madar */}
        <div className="w-full rounded-3xl p-4 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #FF8A3D, #FFB347)" }}>
          <span className="text-4xl">🤖</span>
          <p className="text-sm font-black text-white">
            {phase === "question" && `هيا ${student.name}! فكّر جيداً وأجب على السؤال 🧠`}
            {phase === "correct"  && `رائع ${student.name}! إجابة صحيحة تماماً! 🎉`}
            {phase === "wrong"    && `لا بأس ${student.name}! حاول مرة أخرى، أنت تستطيع! 💪`}
          </p>
        </div>

        {/* Question card */}
        <div className="w-full rounded-3xl p-6 text-center" style={{ background: "white", minHeight: 110 }}>
          <p className="text-xl font-black leading-relaxed" style={{ color: "var(--text-main)" }}>
            {question.text}
          </p>
        </div>

        {/* Options */}
        {phase !== "correct" && (
          <div className="w-full grid grid-cols-2 gap-3">
            {question.options.map((opt, idx) => {
              const isCorrect = idx === question.correct;
              let bg = "var(--cream-md)", col = "var(--text-main)";
              if (phase === "wrong" && isCorrect)     { bg = "#4FB286"; col = "white"; }
              if (phase === "wrong" && !isCorrect)    { bg = "var(--cream-md)"; col = "var(--text-muted)"; }
              return (
                <button key={idx} onClick={() => choose(idx)}
                  className="rounded-2xl py-4 px-3 font-bold text-base active:scale-95 transition-all"
                  style={{ background: bg, color: col, opacity: phase === "wrong" && !isCorrect ? 0.45 : 1 }}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Wrong feedback */}
        {phase === "wrong" && (
          <div className="w-full space-y-3">
            <div className="w-full rounded-2xl px-4 py-3 text-center font-bold" style={{ background: "#FCE3EA", color: "#E86A8E" }}>
              ❌ ليست هذه! الإجابة الصحيحة باللون الأخضر ↑
            </div>
            <button onClick={tryAgain}
              className="w-full py-4 rounded-2xl font-black text-lg text-white active:scale-95 transition-transform"
              style={{ background: "var(--primary)" }}>
              حاول مرة أخرى 🔄
            </button>
          </div>
        )}

        {/* Correct feedback */}
        {phase === "correct" && (
          <div className="w-full space-y-3">
            <div className="w-full rounded-2xl px-4 py-3 text-center font-bold" style={{ background: "#DFF3E9", color: "#4FB286" }}>
              ✅ إجابة صحيحة! أحسنت!{attempts > 0 ? ` (حاولت ${attempts + 1} مرات)` : ""}
            </div>
            <div className="w-full flex items-center justify-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "#FFF0D4" }}>
              <span className="text-2xl">⭐</span>
              <span className="font-black text-lg" style={{ color: "#C04010" }}>ستحصل على {MISSION_XP} XP</span>
            </div>
            <button onClick={finishMission}
              className="w-full py-4 rounded-2xl font-black text-xl text-white active:scale-95 transition-transform"
              style={{ background: "var(--primary)" }}>
              أنهِ المهمة 🏁
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
