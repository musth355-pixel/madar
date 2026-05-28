"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent } from "@/lib/storage";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const student = getStudent();
    if (student) {
      if (!student.diagnostic) {
        router.replace("/assessment");
      } else {
        router.replace("/world");
      }
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-4xl animate-bounce">🌟</div>
      </div>
    );
  }

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
        <div className="text-7xl mb-2">🌟</div>
        <div>
          <h1 className="text-4xl font-black leading-tight mb-3" style={{ color: "var(--text-main)" }}>
            عالمك التعليمي<br />
            <span style={{ color: "var(--primary)" }}>ينتظرك</span>
          </h1>
          <p className="text-lg max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
            معلّم ذكي يعرفك، يشخّص نقاط ضعفك، ويبني معك خطة للتميّز
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-sm my-2">
          {[
            { icon: "🧠", label: "تشخيص ذكي" },
            { icon: "🗺️", label: "خطة شخصية" },
            { icon: "🏆", label: "إنجازات ممتعة" },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl p-3 text-center" style={{ background: "var(--cream-md)" }}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>{f.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/register")}
          className="w-full max-w-sm py-4 rounded-2xl text-lg font-black text-white shadow-lg transition-transform active:scale-95"
          style={{ background: "var(--primary)" }}
        >
          ابدأ رحلتك 🚀
        </button>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          مناهج المرحلة الابتدائية السعودية · ذكاء اصطناعي
        </p>
      </main>
    </div>
  );
}
