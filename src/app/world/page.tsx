"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GRADE2_CURRICULUM } from "@/lib/curriculum/grade2";
import { ACHIEVEMENTS } from "@/lib/data";
import LessonScreen from "@/components/LessonScreen";
import { getLesson } from "@/lib/lessons/index";
import { getStudent, updateStudent } from "@/lib/storage";
import type { StudentDNA } from "@/lib/types";

// ── Constants ─────────────────────────────────────────────────────────────────

type Tab = "home" | "journey" | "awards" | "profile";

const ZONES = [
  {
    subjectId: "math", name: "محطة الرياضيات", icon: "🔢",
    bg: "#FFF1EB", border: "#FFD4BA", color: "#FF8A3D",
    skills: ["math.addition", "math.subtraction", "math.geometry", "math.numbers"],
    open: true,
  },
  {
    subjectId: "arabic", name: "واحة لغتي", icon: "📚",
    bg: "#FFF8EC", border: "#FFE5B0", color: "#E5902A",
    skills: ["arabic.phonics", "arabic.grammar", "arabic.vocabulary"],
    open: true,
  },
  {
    subjectId: "science", name: "مختبر العلوم", icon: "🔬",
    bg: "#EDFAF3", border: "#B5E8CB", color: "#3DB07A",
    skills: ["science.animals", "science.plants"],
    open: true,
  },
  {
    subjectId: "english", name: "جزيرة الإنجليزية", icon: "🌍",
    bg: "#EEF6FD", border: "#BDD9F2", color: "#5BA3D9",
    skills: [],
    open: false,
  },
];

const SKILL_LABELS: Record<string, string> = {
  "math.addition":     "الجمع",
  "math.subtraction":  "الطرح",
  "math.geometry":     "الأشكال الهندسية",
  "math.numbers":      "الأرقام والتسلسل",
  "arabic.phonics":    "الحروف والأصوات",
  "arabic.grammar":    "القواعد والصرف",
  "arabic.vocabulary": "المفردات والمعاني",
  "science.animals":   "عالم الحيوان",
  "science.plants":    "عالم النبات",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getMadarMessage(student: StudentDNA): string {
  const name = student.name;
  const weakSkill = student.diagnostic?.weakSkills?.[0];
  const zone = ZONES.find(z => z.skills.includes(weakSkill ?? ""));
  if (zone) return `جاهز يا ${name}؟ اليوم عندنا مهمة قصيرة في ${zone.name} ⚡`;
  return `أهلاً ${name}! عالمك التعليمي ينتظرك اليوم 🌟`;
}

function getNextSkill(subjectId: string, weakSkills: string[]): string {
  const match = weakSkills.find(s => s.startsWith(subjectId + "."));
  if (match) return SKILL_LABELS[match] ?? match;
  const zone = ZONES.find(z => z.subjectId === subjectId);
  return zone?.skills[0] ? (SKILL_LABELS[zone.skills[0]] ?? "") : "";
}

function getImprovementStat(student: StudentDNA): string {
  const scores = Object.values(student.diagnostic?.scores ?? {});
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  if (avg >= 80) return `+${5 + student.streak}% في دقة الإجابات`;
  if (avg >= 60) return `+${3 + student.streak}% في الفهم والاستيعاب`;
  return `+${2 + student.streak}% في سرعة الحل`;
}

// ── NeedsDiagnostic ───────────────────────────────────────────────────────────

function NeedsDiagnostic({ student, onGo }: { student: StudentDNA; onGo: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5">
      <div className="text-6xl">{student.avatar}</div>
      <div>
        <h2 className="text-2xl font-black">أهلاً، {student.name}!</h2>
        <p className="text-base mt-1" style={{ color: "var(--text-muted)" }}>خطوة واحدة تفصلك عن عالمك</p>
      </div>
      <div
        className="w-full max-w-sm rounded-2xl px-4 py-3 flex items-start gap-3 text-right"
        style={{ background: "#FFF0D4", border: "1.5px solid #FFD89E" }}
      >
        <span className="text-xl">⚠️</span>
        <p className="text-sm" style={{ color: "#C04010" }}>
          أكمل اكتشاف قدراتك حتى ينطلق مدار في رحلتك!
        </p>
      </div>
      <button
        onClick={onGo}
        className="w-full max-w-sm py-4 rounded-2xl font-black text-lg text-white active:scale-95 transition-transform"
        style={{ background: "var(--primary)" }}
      >
        أكمل اكتشاف قدراتك 🎯
      </button>
    </div>
  );
}

// ── Zone Card ─────────────────────────────────────────────────────────────────

function ZoneCard({
  zone, score, nextSkill, onClick,
}: {
  zone: typeof ZONES[0];
  score?: number;
  nextSkill: string;
  onClick: () => void;
}) {
  const progress = score ?? 0;
  const progressColor = progress >= 70 ? "#3DB07A" : progress >= 50 ? "#F5A623" : zone.color;

  return (
    <button
      onClick={zone.open ? onClick : undefined}
      className="rounded-3xl p-4 text-right flex flex-col gap-2.5 transition-transform active:scale-95"
      style={{
        background: zone.bg,
        border: `2px solid ${zone.border}`,
        cursor: zone.open ? "pointer" : "default",
        opacity: zone.open ? 1 : 0.7,
      }}
    >
      {/* Icon + status */}
      <div className="flex items-start justify-between">
        <span
          className="text-xs font-black px-2 py-0.5 rounded-full"
          style={{
            background: zone.open ? zone.color + "22" : "#E0E0E0",
            color: zone.open ? zone.color : "#999",
          }}
        >
          {zone.open ? "مفتوح ✓" : "قريباً"}
        </span>
        <span style={{ fontSize: 36 }}>{zone.icon}</span>
      </div>

      {/* Name */}
      <p className="font-black text-sm leading-tight" style={{ color: "var(--text-main)" }}>
        {zone.name}
      </p>

      {/* Progress */}
      {zone.open && (
        <>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1" style={{ color: "var(--text-muted)" }}>
              <span>{progress}%</span>
              <span>التقدم</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: zone.border }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: progressColor }}
              />
            </div>
          </div>

          {/* Next skill */}
          {nextSkill && (
            <div className="text-right">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>المهارة التالية</p>
              <p className="text-xs font-black" style={{ color: zone.color }}>{nextSkill}</p>
            </div>
          )}
        </>
      )}

      {!zone.open && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>سيُفتح قريباً</p>
      )}
    </button>
  );
}

// ── World Home Screen ─────────────────────────────────────────────────────────

function WorldHome({
  student,
  onGoJourney,
  onStartMission,
}: {
  student: StudentDNA;
  onGoJourney: (subjectId: string) => void;
  onStartMission: () => void;
}) {
  const xpMax = student.level * 200;
  const xpPercent = Math.min(Math.round((student.xp / xpMax) * 100), 100);
  const scores = student.diagnostic?.scores ?? {};
  const weakSkills = student.diagnostic?.weakSkills ?? [];
  const missionZone = ZONES.find(z => z.skills.includes(weakSkills[0] ?? "")) ?? ZONES[0];
  const missionSkill = SKILL_LABELS[weakSkills[0] ?? ""] ?? "المهارة الأساسية";
  const improvement = getImprovementStat(student);

  return (
    <div className="max-w-lg mx-auto space-y-4 pb-10">

      {/* ── Header ── */}
      <div
        className="sticky top-0 z-10 -mx-4 px-4 pt-4 pb-3"
        style={{ background: "var(--cream)" }}
      >
        <div className="flex items-center justify-between">
          {/* Logo + name */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black text-white flex-shrink-0"
              style={{ background: "var(--primary)" }}
            >
              م
            </div>
            <div>
              <p className="font-black text-sm leading-tight">{student.name} {student.avatar}</p>
              <p className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
                المستوى {student.level}
              </p>
            </div>
          </div>

          {/* Stats chips */}
          <div className="flex items-center gap-1.5">
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black"
              style={{ background: "#FFF1EB", color: "var(--primary)" }}
            >
              ⭐ {student.xp} XP
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black"
              style={{ background: "#FFF1EB", color: "#C04010" }}
            >
              🔥 {student.streak}
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-2.5 h-2 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${xpPercent}%`, background: "var(--primary)", transition: "width 0.6s ease" }}
          />
        </div>
      </div>

      {/* ── Madar message ── */}
      <div
        className="rounded-3xl p-4 flex items-start gap-3"
        style={{ background: "linear-gradient(135deg, #FF8A3D 0%, #FFB347 100%)" }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.25)" }}
        >
          🤖
        </div>
        <div>
          <p className="text-xs font-bold text-white opacity-80 mb-0.5">مدار يقول</p>
          <p className="text-sm font-black text-white leading-relaxed">
            {getMadarMessage(student)}
          </p>
        </div>
      </div>

      {/* ── Daily mission card ── */}
      <div className="rounded-3xl p-5" style={{ background: "white", border: "2px solid var(--cream-dk)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-base">🎯 مهمة اليوم</span>
          <span
            className="text-xs font-black px-2.5 py-1 rounded-full"
            style={{ background: "#FFF1EB", color: "var(--primary)" }}
          >
            جديدة
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl p-3 mb-4" style={{ background: "var(--cream-md)" }}>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: missionZone.bg, border: `2px solid ${missionZone.border}` }}
          >
            {missionZone.icon}
          </div>
          <div className="text-right flex-1">
            <p className="font-black text-sm">{missionZone.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              المهارة: {missionSkill}
            </p>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="font-black text-sm" style={{ color: missionZone.color }}>5</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>دقائق</p>
          </div>
        </div>

        <button
          onClick={onStartMission}
          className="w-full py-3.5 rounded-2xl font-black text-white text-base active:scale-95 transition-transform"
          style={{ background: missionZone.color }}
        >
          ابدأ المهمة ✨
        </button>
      </div>

      {/* ── World map ── */}
      <div>
        <p className="font-black text-base mb-3">🗺️ خريطة عالم مدار</p>
        <div className="grid grid-cols-2 gap-3">
          {ZONES.map(zone => (
            <ZoneCard
              key={zone.subjectId}
              zone={zone}
              score={scores[zone.subjectId]}
              nextSkill={getNextSkill(zone.subjectId, weakSkills)}
              onClick={() => onGoJourney(zone.subjectId)}
            />
          ))}
        </div>
      </div>

      {/* ── Better than yesterday ── */}
      <div
        className="rounded-3xl p-4 flex items-center gap-4"
        style={{ background: "white", border: "2px solid var(--cream-dk)" }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "#EDFAF3" }}
        >
          📈
        </div>
        <div className="flex-1 text-right">
          <p className="font-black text-sm">أنت أفضل من أمس!</p>
          <p className="text-xs mt-0.5 font-bold" style={{ color: "#3DB07A" }}>
            {improvement}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {student.completedLessons.length > 0
              ? `أكملت ${student.completedLessons.length} درس — استمر!`
              : "ابدأ مهمتك اليوم وسجّل تقدمك 🚀"}
          </p>
        </div>
      </div>

    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function WorldPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDNA | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedSubject, setSelectedSubject] = useState(GRADE2_CURRICULUM.subjects[0]);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<ReturnType<typeof getLesson>>(null);

  useEffect(() => {
    const s = getStudent();
    if (!s) { router.replace("/"); return; }
    setStudent(s);
    setLoaded(true);
  }, [router]);

  if (!loaded || !student) return null;

  const hasDiagnostic = !!student.diagnostic;
  const subjects = GRADE2_CURRICULUM.subjects;

  function goJourney(subjectId: string) {
    const subj = subjects.find(s => s.id === subjectId) ?? subjects[0];
    setSelectedSubject(subj);
    setSelectedUnit(null);
    setActiveTab("journey");
  }

  function handleStartLesson(unitId: string, lessonId: string) {
    const data = getLesson(selectedSubject.id, unitId, lessonId);
    if (data) {
      setActiveLesson(data);
    } else {
      const unit = selectedSubject.units.find(u => u.id === unitId);
      const lesson = unit?.lessons.find(l => l.id === lessonId);
      setActiveLesson({
        title: lesson?.title ?? "درس",
        subject: selectedSubject.ar,
        subjectColor: selectedSubject.color,
        icon: selectedSubject.icon,
        xp: lesson?.xp ?? 20,
        steps: [
          { type: "intro", body: `سنتعلم اليوم: ${lesson?.title}` },
          { type: "explain", title: lesson?.title, body: "سيتم إضافة محتوى هذا الدرس قريباً 🚀" },
          { type: "done" },
        ],
      });
    }
  }

  if (activeLesson) {
    return (
      <LessonScreen
        lesson={activeLesson as Parameters<typeof LessonScreen>[0]["lesson"]}
        onClose={() => setActiveLesson(null)}
        onComplete={xp => {
          const updated = updateStudent({ xp: student.xp + xp });
          if (updated) setStudent(updated);
          setActiveLesson(null);
        }}
      />
    );
  }

  // Bottom navigation items
  const NAV = [
    { id: "home",    icon: "🏠", label: "عالمي"  },
    { id: "journey", icon: "🗺️",  label: "رحلتي"  },
    { id: "awards",  icon: "🏆", label: "جوائزي" },
    { id: "profile", icon: "👤", label: "ملفي"   },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "var(--cream)" }}>

      {/* Scrollable main */}
      <main className="flex-1 overflow-y-auto px-4">
        {!hasDiagnostic && (
          <NeedsDiagnostic student={student} onGo={() => router.push("/assessment")} />
        )}

        {hasDiagnostic && activeTab === "home" && (
          <WorldHome
            student={student}
            onGoJourney={goJourney}
            onStartMission={() => router.push("/lesson")}
          />
        )}

        {/* ── Journey ── */}
        {hasDiagnostic && activeTab === "journey" && (
          <div className="max-w-2xl mx-auto space-y-4 pt-4 pb-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveTab("home")} className="text-2xl" style={{ color: "var(--text-muted)" }}>←</button>
              <span className="text-3xl">{selectedSubject.icon}</span>
              <div>
                <h2 className="text-xl font-black">{selectedSubject.ar}</h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {selectedSubject.units.length} وحدات — {selectedSubject.units.reduce((a, u) => a + u.lessons.length, 0)} درس
                </p>
              </div>
            </div>

            {/* Subject tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {subjects.map(s => (
                <button key={s.id}
                  onClick={() => { setSelectedSubject(s); setSelectedUnit(null); }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{
                    background: selectedSubject.id === s.id ? s.color : "var(--cream-md)",
                    color: selectedSubject.id === s.id ? "white" : "var(--text-muted)",
                  }}>
                  {s.icon} {s.ar}
                </button>
              ))}
            </div>

            {/* Units */}
            <div className="space-y-3">
              {selectedSubject.units.map((unit, ui) => (
                <div key={unit.id} className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "var(--cream-dk)" }}>
                  <button
                    onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
                    className="w-full flex items-center gap-3 p-4 text-right"
                    style={{ background: "var(--cream-md)" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white flex-shrink-0"
                      style={{ background: selectedSubject.color }}>
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
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                              style={{ background: isQuiz ? selectedSubject.color : "var(--cream-md)", color: isQuiz ? "white" : "var(--text-muted)" }}>
                              {isQuiz ? "🏆" : li + 1}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold">{lesson.title}</div>
                              <div className="text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                                +{lesson.xp} XP
                                {hasContent && <span style={{ color: "#3DB07A" }} className="font-bold">● متاح</span>}
                              </div>
                            </div>
                            <button onClick={() => handleStartLesson(unit.id, lesson.id)}
                              className="px-3 py-1 rounded-full text-xs font-black text-white"
                              style={{ background: selectedSubject.color }}>
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

        {/* ── Awards ── */}
        {hasDiagnostic && activeTab === "awards" && (
          <div className="max-w-2xl mx-auto space-y-4 pt-4 pb-10">
            <h2 className="text-2xl font-black">جوائزي 🏆</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACHIEVEMENTS.map(a => (
                <div key={a.id} className="rounded-2xl p-4 text-center"
                  style={{ background: "white", opacity: a.unlocked ? 1 : 0.4, border: "2px solid var(--cream-dk)" }}>
                  <div className="text-4xl mb-2">{a.icon}</div>
                  <div className="font-black text-sm mb-1">{a.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{a.sub}</div>
                  {a.unlocked && <div className="mt-2 text-xs font-bold" style={{ color: "var(--primary)" }}>مفتوح ✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Profile ── */}
        {hasDiagnostic && activeTab === "profile" && (
          <div className="max-w-md mx-auto space-y-4 pt-4 pb-10">
            <div className="rounded-3xl p-6 text-center" style={{ background: "white", border: "2px solid var(--cream-dk)" }}>
              <div className="text-6xl mb-3">{student.avatar}</div>
              <h2 className="text-2xl font-black">{student.name}</h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{GRADE2_CURRICULUM.label}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "المستوى", value: student.level,  icon: "⭐" },
                { label: "النقاط",  value: student.xp,     icon: "🔥" },
                { label: "الأيام",  value: student.streak,  icon: "📅" },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl p-4 text-center" style={{ background: "white", border: "2px solid var(--cream-dk)" }}>
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="font-black text-xl">{stat.value}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => { localStorage.clear(); router.push("/"); }}
              className="w-full py-3 rounded-2xl text-sm font-bold"
              style={{ background: "var(--cream-md)", color: "var(--text-muted)" }}>
              تسجيل خروج / حساب جديد
            </button>
          </div>
        )}
      </main>

      {/* ── Bottom navigation ── */}
      {hasDiagnostic && (
        <nav
          className="flex-shrink-0 flex items-center justify-around px-4 py-2 border-t"
          style={{ background: "white", borderColor: "var(--cream-dk)" }}
        >
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all"
              style={{
                color: activeTab === item.id ? "var(--primary)" : "var(--text-muted)",
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
