"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent } from "@/lib/storage";
import type { StudentDNA } from "@/lib/types";

type State = "loading" | "guest" | "needs-assessment" | "ready";

// ── Logo ──────────────────────────────────────────────────────────────────────

function MadarLogo() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
      {/* Dashed orbit ring */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full">
        <circle
          cx="60" cy="60" r="56"
          fill="none"
          stroke="#FF8A3D"
          strokeWidth="2"
          strokeDasharray="5 5"
          opacity="0.35"
        />
        {/* Orbiting dot */}
        <circle cx="60" cy="4" r="5" fill="#FF8A3D" opacity="0.7" />
        <circle cx="116" cy="60" r="3.5" fill="#FFB347" opacity="0.5" />
      </svg>
      {/* Center circle */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg, #FF8A3D 0%, #FFB347 100%)" }}
      >
        <span style={{ fontSize: 38 }}>🌟</span>
      </div>
    </div>
  );
}

// ── Feature pills ─────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: "🧠", label: "تشخيص ذكي" },
  { icon: "🗺️", label: "خطة شخصية" },
  { icon: "🏆", label: "تعلّم ممتع" },
];

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();
  const [state, setState] = useState<State>("loading");
  const [student, setStudent] = useState<StudentDNA | null>(null);

  useEffect(() => {
    const s = getStudent();
    if (!s) {
      setState("guest");
    } else if (!s.diagnostic) {
      setStudent(s);
      setState("needs-assessment");
    } else {
      setStudent(s);
      setState("ready");
    }
  }, []);

  const ctaLabel =
    state === "guest"            ? "ابدأ الرحلة 🚀"             :
    state === "needs-assessment" ? "أكمل التشخيص 🎯"           :
    state === "ready"            ? "ادخل إلى عالم مدار 🌟"     : "";

  const ctaRoute =
    state === "guest"            ? "/register"   :
    state === "needs-assessment" ? "/assessment" :
    state === "ready"            ? "/world"      : "/";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--cream)" }}
    >
      {/* ── Top bar ── */}
      <header className="flex items-center justify-end px-5 pt-5">
        <button
          onClick={() => router.push("/parent")}
          className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}
        >
          <span>👨‍👦</span> لوحة ولي الأمر
        </button>
      </header>

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5 pb-10">

        {/* Loading */}
        {state === "loading" && (
          <div className="text-5xl animate-bounce">🌟</div>
        )}

        {state !== "loading" && (
          <>
            {/* Logo */}
            <MadarLogo />

            {/* App name */}
            <div>
              <h1
                className="text-5xl font-black tracking-tight"
                style={{ color: "var(--primary)" }}
              >
                مدار
              </h1>
              <p
                className="text-base mt-2 max-w-xs mx-auto leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                معلم ذكي يكتشف طريقة تعلّم طفلك<br />
                ويبني له رحلة تعليمية شخصية
              </p>
            </div>

            {/* ── Guest: feature pills ── */}
            {state === "guest" && (
              <div className="flex gap-3 flex-wrap justify-center">
                {FEATURES.map(f => (
                  <div
                    key={f.label}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold"
                    style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}
                  >
                    <span>{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>
            )}

            {/* ── Needs assessment: warning + student card ── */}
            {state === "needs-assessment" && student && (
              <div className="w-full max-w-xs space-y-3">
                {/* Student chip */}
                <div
                  className="flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{ background: "white" }}
                >
                  <span className="text-3xl">{student.avatar}</span>
                  <div className="text-right">
                    <p className="font-black text-sm">{student.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>مسجّل — التشخيص غير مكتمل</p>
                  </div>
                </div>
                {/* Warning */}
                <div
                  className="flex items-start gap-2.5 rounded-2xl px-4 py-3 text-right"
                  style={{ background: "#FFF0D4", border: "1.5px solid #FFD89E" }}
                >
                  <span className="text-lg flex-shrink-0">⚠️</span>
                  <div>
                    <p className="text-sm font-black" style={{ color: "#C04010" }}>الاختبار التشخيصي غير مكتمل</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      أكمله حتى يتعرف مدار على مستوى {student.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Ready: returning student card ── */}
            {state === "ready" && student && (
              <div
                className="w-full max-w-xs rounded-3xl px-5 py-4 flex items-center gap-4"
                style={{ background: "white" }}
              >
                <div className="text-4xl">{student.avatar}</div>
                <div className="text-right flex-1">
                  <p className="font-black">أهلاً، {student.name}!</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    المستوى {student.level} · {student.xp} XP · 🔥 {student.streak}
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--cream-md)" }}
                >
                  <span className="text-sm">✓</span>
                </div>
              </div>
            )}

            {/* ── Primary CTA ── */}
            <button
              onClick={() => router.push(ctaRoute)}
              className="w-full max-w-xs py-4 rounded-2xl text-lg font-black text-white transition-transform active:scale-95"
              style={{ background: "var(--primary)" }}
            >
              {ctaLabel}
            </button>

            {/* ── Footer note ── */}
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              مناهج المرحلة الابتدائية السعودية · ذكاء اصطناعي
            </p>
          </>
        )}
      </main>
    </div>
  );
}
