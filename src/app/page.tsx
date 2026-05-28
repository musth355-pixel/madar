"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent } from "@/lib/storage";
import type { StudentDNA } from "@/lib/types";

type State = "loading" | "guest" | "needs-assessment" | "ready";

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-black" style={{ color: "var(--primary)" }}>مدار</span>
        <button
          onClick={() => router.push("/parent")}
          className="text-sm font-bold px-4 py-2 rounded-full"
          style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}
        >
          لوحة ولي الأمر
        </button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 pb-16">

        {state === "loading" && (
          <div className="text-4xl animate-bounce">🌟</div>
        )}

        {state !== "loading" && (
          <>
            <div className="text-7xl mb-2">
              {state === "ready" ? student?.avatar ?? "🌟" : "🌟"}
            </div>

            <div>
              {state === "guest" && (
                <>
                  <h1 className="text-4xl font-black leading-tight mb-3" style={{ color: "var(--text-main)" }}>
                    عالمك التعليمي<br />
                    <span style={{ color: "var(--primary)" }}>ينتظرك</span>
                  </h1>
                  <p className="text-lg max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
                    معلّم ذكي يعرفك، يشخّص نقاط ضعفك، ويبني معك خطة للتميّز
                  </p>
                </>
              )}

              {state === "needs-assessment" && (
                <>
                  <h1 className="text-3xl font-black leading-tight mb-3" style={{ color: "var(--text-main)" }}>
                    أهلاً، {student?.name}!
                  </h1>
                  <p className="text-lg max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
                    خطوة واحدة تفصلك عن عالمك التعليمي
                  </p>
                </>
              )}

              {state === "ready" && (
                <>
                  <h1 className="text-3xl font-black leading-tight mb-3" style={{ color: "var(--text-main)" }}>
                    مرحباً بعودتك،<br />
                    <span style={{ color: "var(--primary)" }}>{student?.name}!</span>
                  </h1>
                  <p className="text-lg max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
                    عالمك التعليمي جاهز — واصل رحلتك
                  </p>
                </>
              )}
            </div>

            {/* Feature cards — show only for guests */}
            {state === "guest" && (
              <div className="grid grid-cols-3 gap-4 w-full max-w-sm my-2">
                {[
                  { icon: "🧠", label: "تشخيص ذكي" },
                  { icon: "🗺️", label: "خطة شخصية" },
                  { icon: "🏆", label: "إنجازات ممتعة" },
                ].map(f => (
                  <div key={f.label} className="rounded-2xl p-3 text-center" style={{ background: "var(--cream-md)" }}>
                    <div className="text-2xl mb-1">{f.icon}</div>
                    <div className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>{f.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Assessment warning banner */}
            {state === "needs-assessment" && (
              <div
                className="w-full max-w-sm rounded-2xl px-4 py-3 flex items-center gap-3 text-right"
                style={{ background: "#FFF0D4", border: "1.5px solid #FFD89E" }}
              >
                <span className="text-2xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-sm font-black" style={{ color: "#C04010" }}>الاختبار التشخيصي غير مكتمل</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    أكمل الاختبار حتى يتعرف مدار على مستواك
                  </p>
                </div>
              </div>
            )}

            {/* Primary CTA */}
            {state === "guest" && (
              <button
                onClick={() => router.push("/register")}
                className="w-full max-w-sm py-4 rounded-2xl text-lg font-black text-white shadow-lg transition-transform active:scale-95"
                style={{ background: "var(--primary)" }}
              >
                ابدأ رحلتك 🚀
              </button>
            )}

            {state === "needs-assessment" && (
              <button
                onClick={() => router.push("/assessment")}
                className="w-full max-w-sm py-4 rounded-2xl text-lg font-black text-white shadow-lg transition-transform active:scale-95"
                style={{ background: "var(--primary)" }}
              >
                أكمل التشخيص 🎯
              </button>
            )}

            {state === "ready" && (
              <button
                onClick={() => router.push("/world")}
                className="w-full max-w-sm py-4 rounded-2xl text-lg font-black text-white shadow-lg transition-transform active:scale-95"
                style={{ background: "var(--primary)" }}
              >
                ادخل إلى عالم مدار 🌟
              </button>
            )}

            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              مناهج المرحلة الابتدائية السعودية · ذكاء اصطناعي
            </p>
          </>
        )}
      </main>
    </div>
  );
}
