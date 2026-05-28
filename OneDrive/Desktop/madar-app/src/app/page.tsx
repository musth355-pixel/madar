"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GRADE2_CURRICULUM } from "@/lib/curriculum/grade2";
import { USER, ACHIEVEMENTS } from "@/lib/data";
import LessonScreen from "@/components/LessonScreen";
import { getLesson } from "@/lib/lessons/index";

type Tab = "home" | "journey" | "awards" | "profile";

function QRModal({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const { protocol, hostname, port } = window.location;
    setUrl(`${protocol}//${hostname}:${port || "3001"}`);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-7 text-center space-y-4 max-w-xs w-full mx-4"
        style={{ background: "white", animation: "pop 0.3s ease" }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-black" style={{ color: "var(--text-main)" }}>افتح على الجوال 📱</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>امسح الرمز بكاميرا الجوال وتأكد أنك على نفس الواي فاي</p>
        {url && (
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl" style={{ background: "var(--cream)" }}>
              <QRCodeSVG value={url} size={180} level="H" />
            </div>
          </div>
        )}
        <p className="text-xs font-bold break-all" style={{ color: "var(--text-muted)" }}>{url}</p>
        <button
          onClick={onClose}
          className="w-full rounded-2xl py-3 font-black text-white"
          style={{ background: "var(--primary)" }}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedSubject, setSelectedSubject] = useState(GRADE2_CURRICULUM.subjects[0]);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<ReturnType<typeof getLesson>>(null);
  const [user, setUser] = useState(USER);
  const [showQR, setShowQR] = useState(false);

  const xpPercent = Math.round((user.xp / user.nextXp) * 100);
  const subjects = GRADE2_CURRICULUM.subjects;
  const totalLessons = subjects.reduce((a, s) => a + s.units.reduce((b, u) => b + u.lessons.length, 0), 0);

  const handleStartLesson = (unitId: string, lessonId: string) => {
    const data = getLesson(selectedSubject.id, unitId, lessonId);
    if (data) {
      setActiveLesson(data);
    } else {
      const unit = selectedSubject.units.find(u => u.id === unitId);
      const lesson = unit?.lessons.find(l => l.id === lessonId);
      setActiveLesson({
        title: lesson?.title || "درس",
        subject: selectedSubject.ar,
        subjectColor: selectedSubject.color,
        icon: selectedSubject.icon,
        xp: lesson?.xp || 20,
        steps: [
          { type: "intro", body: `مرحباً! سنتعلم اليوم: ${lesson?.title}` },
          { type: "explain", title: lesson?.title, body: "سيتم إضافة محتوى هذا الدرس قريباً. 🚀" },
          { type: "done" },
        ],
      });
    }
  };

  if (activeLesson) {
    return (
      <LessonScreen
        lesson={activeLesson as Parameters<typeof LessonScreen>[0]["lesson"]}
        onClose={() => setActiveLesson(null)}
        onComplete={(xp) => {
          setUser(u => ({ ...u, xp: u.xp + xp }));
          setActiveLesson(null);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--cream)" }}>
      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      {/* Side Rail */}
      <aside className="flex flex-col items-center gap-4 py-8 px-2 border-l" style={{ background: "var(--cream-md)", borderColor: "var(--cream-dk)", width: 70 }}>
        <div className="text-2xl mb-2">🌟</div>
        {([
          { id: "home",    icon: "🏠", label: "الرئيسية" },
          { id: "journey", icon: "🗺️",  label: "رحلتي" },
          { id: "awards",  icon: "🏆", label: "إنجازاتي" },
          { id: "profile", icon: "👤", label: "ملفي" },
        ] as { id: Tab; icon: string; label: string }[]).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            className="flex flex-col items-center gap-1 rounded-2xl p-2 w-full transition-all"
            style={{
              background: activeTab === item.id ? "var(--primary)" : "transparent",
              color: activeTab === item.id ? "white" : "var(--text-muted)",
            }}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[9px] font-bold">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-5">

        {/* HOME */}
        {activeTab === "home" && (
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black" style={{ color: "var(--text-main)" }}>أهلاً، {user.name}! 👋</h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{GRADE2_CURRICULUM.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full px-3 py-1 font-bold text-sm" style={{ background: "#FFF0D4", color: "#C04010" }}>🔥 {user.streak}</div>
                <button
                  onClick={() => setShowQR(true)}
                  title="افتح على الجوال"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 active:scale-95"
                  style={{ background: "var(--cream-dk)" }}
                >
                  📱
                </button>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl" style={{ background: "var(--cream-dk)" }}>{user.avatar}</div>
              </div>
            </div>

            <div className="rounded-2xl p-4" style={{ background: "var(--cream-md)" }}>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>المستوى {user.level} ⭐</span>
                <span style={{ color: "var(--text-muted)" }}>{user.xp} / {user.nextXp} XP</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--track)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${xpPercent}%`, background: "var(--primary)" }} />
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>إجمالي الدروس: {totalLessons} درس في {subjects.length} مواد</p>
            </div>

            <div>
              <h2 className="text-lg font-black mb-3">المواد الدراسية</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {subjects.map((subject) => {
                  const total = subject.units.reduce((a, u) => a + u.lessons.length, 0);
                  return (
                    <button
                      key={subject.id}
                      onClick={() => { setSelectedSubject(subject); setSelectedUnit(null); setActiveTab("journey"); }}
                      className="rounded-2xl p-4 text-right transition-transform hover:scale-105 active:scale-95"
                      style={{ background: subject.tint }}
                    >
                      <div className="text-3xl mb-2">{subject.icon}</div>
                      <div className="font-black text-sm mb-1" style={{ color: "var(--text-main)" }}>{subject.ar}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{subject.units.length} وحدات · {total} درس</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={() => setActiveTab("journey")} className="w-full rounded-2xl py-4 font-black text-lg text-white" style={{ background: "var(--primary)" }}>
              متابعة الدراسة 🚀
            </button>
          </div>
        )}

        {/* JOURNEY */}
        {activeTab === "journey" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveTab("home")} className="text-2xl" style={{ color: "var(--text-muted)" }}>←</button>
              <div className="text-3xl">{selectedSubject.icon}</div>
              <div>
                <h2 className="text-xl font-black">{selectedSubject.ar}</h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {selectedSubject.units.length} وحدات — {selectedSubject.units.reduce((a, u) => a + u.lessons.length, 0)} درس
                </p>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSubject(s); setSelectedUnit(null); }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{
                    background: selectedSubject.id === s.id ? s.color : "var(--cream-md)",
                    color: selectedSubject.id === s.id ? "white" : "var(--text-muted)",
                  }}
                >
                  {s.icon} {s.ar}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {selectedSubject.units.map((unit, ui) => (
                <div key={unit.id} className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "var(--cream-dk)" }}>
                  <button
                    onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
                    className="w-full flex items-center gap-3 p-4 text-right"
                    style={{ background: "var(--cream-md)" }}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white flex-shrink-0" style={{ background: selectedSubject.color }}>
                      {ui + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-sm">{unit.title}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{unit.lessons.length} دروس</div>
                    </div>
                    <span style={{ color: "var(--text-muted)" }}>{selectedUnit === unit.id ? "▲" : "▼"}</span>
                  </button>

                  {selectedUnit === unit.id && (
                    <div className="divide-y" style={{ borderColor: "var(--cream-dk)" }}>
                      {unit.lessons.map((lesson, li) => {
                        const isQuiz = lesson.type === "quiz";
                        const hasContent = !!getLesson(selectedSubject.id, unit.id, lesson.id);
                        return (
                          <div key={lesson.id} className="flex items-center gap-3 px-4 py-3" style={{ background: "white" }}>
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                              style={{ background: isQuiz ? selectedSubject.color : "var(--cream-md)", color: isQuiz ? "white" : "var(--text-muted)" }}
                            >
                              {isQuiz ? "🏆" : li + 1}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold">{lesson.title}</div>
                              <div className="text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                                +{lesson.xp} XP
                                {hasContent && <span className="text-green-500 font-bold">● متاح</span>}
                              </div>
                            </div>
                            <button
                              onClick={() => handleStartLesson(unit.id, lesson.id)}
                              className="px-3 py-1 rounded-full text-xs font-black text-white"
                              style={{ background: selectedSubject.color }}
                            >
                              ابدأ
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AWARDS */}
        {activeTab === "awards" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-black">إنجازاتي 🏆</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.id} className="rounded-2xl p-4 text-center" style={{ background: "var(--cream-md)", opacity: a.unlocked ? 1 : 0.45 }}>
                  <div className="text-4xl mb-2">{a.icon}</div>
                  <div className="font-black text-sm mb-1">{a.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{a.sub}</div>
                  {a.unlocked && <div className="mt-2 text-xs font-bold" style={{ color: "var(--primary)" }}>مفتوح ✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="max-w-md mx-auto space-y-5">
            <div className="rounded-3xl p-6 text-center" style={{ background: "var(--cream-md)" }}>
              <div className="text-6xl mb-3">{user.avatar}</div>
              <h2 className="text-2xl font-black">{user.name}</h2>
              <p style={{ color: "var(--text-muted)" }}>{GRADE2_CURRICULUM.label}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "المستوى", value: user.level,  icon: "⭐" },
                { label: "النقاط",  value: user.xp,     icon: "🔥" },
                { label: "الأيام",  value: user.streak, icon: "📅" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl p-4 text-center" style={{ background: "var(--cream-md)" }}>
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="font-black text-xl">{stat.value}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
