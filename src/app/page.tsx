"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent } from "@/lib/storage";
import type { StudentDNA } from "@/lib/types";

type State = "loading" | "guest" | "needs-assessment" | "ready";

function MadarLogo() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 130, height: 130 }}>
      <svg viewBox="0 0 130 130" className="absolute inset-0 w-full h-full">
        <circle cx="65" cy="65" r="60" fill="none" stroke="#FF8A3D" strokeWidth="2" strokeDasharray="5 5" opacity="0.3" />
        <circle cx="65" cy="5" r="6" fill="#FF8A3D" opacity="0.75" />
        <circle cx="125" cy="65" r="4" fill="#FFB347" opacity="0.5" />
        <circle cx="20" cy="105" r="3" fill="#FF8A3D" opacity="0.35" />
      </svg>
      <div
        className="w-22 h-22 rounded-full flex items-center justify-center shadow-lg"
        style={{
          width: 88, height: 88,
          background: "linear-gradient(135deg, #FF8A3D 0%, #FFB347 100%)",
        }}
      >
        <span style={{ fontSize: 42 }}>🌟</span>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [state, setState] = useState<State>("loading");
  const [student, setStudent] = useState<StudentDNA | null>(null);

  useEffect(() => {
    const s = getStudent();
    if (!s)              { setState("guest"); }
    else if (!s.diagnostic) { setStudent(s); setState("needs-assessment"); }
    else                 { setStudent(s); setState("ready"); }
  }, []);

  const cta =
    state === "guest"            ? { label: "ابدأ المغامرة 🚀",           route: "/register"   } :
    state === "needs-assessment" ? { label: "أكمل اكتشاف قدراتك 🎯",     route: "/assessment" } :
    state === "ready"            ? { label: "ادخل عالمي 🌍",              route: "/world"      } :
    null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6 pb-8"
      style={{ background: "var(--cream)" }}>

      {state === "loading" && <div className="text-5xl animate-bounce">🌟</div>}

      {state !== "loading" && (
        <>
          <MadarLogo />

          {/* App name + tagline */}
          <div className="space-y-2">
            <h1 className="text-5xl font-black" style={{ color: "var(--primary)" }}>مدار</h1>
            <p className="text-base max-w-xs mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
              عالمك الذكي للتعلم والمغامرة
            </p>
          </div>

          {/* Guest: feature pills */}
          {state === "guest" && (
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { icon: "🧠", label: "تشخيص ذكي" },
                { icon: "🗺️", label: "عالم مغامرات" },
                { icon: "🏆", label: "جوائز ومكافآت" },
              ].map(f => (
                <div key={f.label}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold"
                  style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}>
                  {f.icon} {f.label}
                </div>
              ))}
            </div>
          )}

          {/* Needs assessment: student chip + warning */}
          {state === "needs-assessment" && student && (
            <div className="w-full max-w-xs space-y-3">
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "white" }}>
                <span className="text-3xl">{student.avatar}</span>
                <div className="text-right flex-1">
                  <p className="font-black text-sm">{student.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>التشخيص غير مكتمل بعد</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl px-4 py-3 text-right"
                style={{ background: "#FFF0D4", border: "1.5px solid #FFD89E" }}>
                <span className="text-lg flex-shrink-0">⚠️</span>
                <p className="text-xs" style={{ color: "#C04010" }}>
                  أكمل اكتشاف قدراتك حتى ينطلق مدار معك في رحلة تعلّم مخصصة لك!
                </p>
              </div>
            </div>
          )}

          {/* Ready: welcome back chip */}
          {state === "ready" && student && (
            <div className="w-full max-w-xs rounded-3xl px-5 py-4 flex items-center gap-4" style={{ background: "white" }}>
              <span className="text-4xl">{student.avatar}</span>
              <div className="text-right flex-1">
                <p className="font-black">أهلاً، {student.name}!</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  المستوى {student.level} · {student.xp} XP · 🔥 {student.streak}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          {cta && (
            <button
              onClick={() => router.push(cta.route)}
              className="w-full max-w-xs py-4 rounded-2xl text-lg font-black text-white active:scale-95 transition-transform"
              style={{ background: "var(--primary)" }}
            >
              {cta.label}
            </button>
          )}

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            مناهج المرحلة الابتدائية السعودية
          </p>
        </>
      )}
    </div>
  );
}
