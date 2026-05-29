"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStudent } from "@/lib/storage";
import type { StudentDNA } from "@/lib/types";

function MissionCompleteContent() {
  const router = useRouter();
  const params = useSearchParams();
  const xpGained = Number(params.get("xp") ?? 25);

  const [student, setStudent] = useState<StudentDNA | null>(null);

  useEffect(() => {
    const s = getStudent();
    if (!s) { router.replace("/"); return; }
    setStudent(s);
  }, [router]);

  if (!student) return null;

  const xpMax = student.level * 200;
  const xpPercent = Math.min(Math.round((student.xp / xpMax) * 100), 100);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6 pb-10"
      style={{ background: "var(--cream)" }}
    >
      {/* Celebration */}
      <div className="space-y-2">
        <div className="text-8xl animate-bounce">🎉</div>
        <div className="flex justify-center gap-2 text-3xl">
          <span>⭐</span><span>🏆</span><span>⭐</span>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-black" style={{ color: "var(--text-main)" }}>
          أحسنت، {student.name}!
        </h1>
        <p className="text-base mt-1" style={{ color: "var(--text-muted)" }}>
          أكملت مهمة اليوم بنجاح 🌟
        </p>
      </div>

      {/* XP card */}
      <div className="w-full max-w-xs rounded-3xl p-5 space-y-4" style={{ background: "white" }}>

        {/* XP gained */}
        <div className="flex items-center justify-between rounded-2xl px-4 py-3"
          style={{ background: "#FFF0D4" }}>
          <span className="font-bold text-sm" style={{ color: "var(--text-muted)" }}>حصلت على</span>
          <span className="text-2xl font-black" style={{ color: "#C04010" }}>+{xpGained} XP ⭐</span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>المستوى {student.level}</span>
            <span style={{ color: "var(--text-muted)" }}>{student.xp} / {xpMax} XP</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
            <div className="h-full rounded-full" style={{ width: `${xpPercent}%`, background: "var(--primary)" }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
            {xpPercent}% نحو المستوى {student.level + 1}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--cream-dk)" }} />

        {/* Motivational stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: "⭐", label: "المستوى", value: student.level },
            { icon: "🔥", label: "الأيام",  value: student.streak },
            { icon: "🏆", label: "الدروس",  value: student.completedLessons.length },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-xl">{stat.icon}</div>
              <div className="font-black text-lg">{stat.value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Better than yesterday */}
      <div className="w-full max-w-xs rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{ background: "var(--cream-md)" }}>
        <span className="text-2xl">📈</span>
        <div className="text-right flex-1">
          <p className="font-black text-sm">أنت أفضل من أمس!</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            تقدمت خطوة في رحلتك التعليمية
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => router.push("/world")}
        className="w-full max-w-xs py-4 rounded-2xl font-black text-xl text-white active:scale-95 transition-transform"
        style={{ background: "var(--primary)" }}
      >
        العودة إلى عالمي 🌍
      </button>
    </div>
  );
}

export default function MissionCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-5xl animate-bounce">🎉</div>
      </div>
    }>
      <MissionCompleteContent />
    </Suspense>
  );
}
