"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GRADE2_CURRICULUM } from "@/lib/curriculum/grade2";
import { ACHIEVEMENTS } from "@/lib/data";
import LessonScreen from "@/components/LessonScreen";
import { getLesson } from "@/lib/lessons/index";
import { getStudent, updateStudent } from "@/lib/storage";
import { LEARNING_STYLE_LABELS } from "@/lib/types";
import type { StudentDNA } from "@/lib/types";

type Tab = "home" | "journey" | "awards" | "profile";

const ZONES = [
  { subjectId: "math",    name: "محطة الرياضيات",  icon: "🔢", bg: "#FFE3D6", color: "#FF8A3D" },
  { subjectId: "arabic",  name: "واحة لغتي",        icon: "📖", bg: "#FFF0D4", color: "#E5602A" },
  { subjectId: "science", name: "مختبر العلوم",     icon: "🔬", bg: "#DFF3E9", color: "#4FB286" },
  { subjectId: "english", name: "جزيرة الإنجليزية", icon: "🌍", bg: "#D6EAF8", color: "#5BA3D9" },
];

const SKILL_LABELS: Record<string, string> = {
  "math.addition": "الجمع", "math.subtraction": "الطرح",
  "math.geometry": "الأشكال الهندسية", "math.numbers": "الأرقام والتسلسل",
  "arabic.phonics": "الحروف والأصوات", "arabic.grammar": "القواعد والصرف",
  "arabic.vocabulary": "المفردات والمعاني",
  "science.animals": "عالم الحيوان", "science.plants": "عالم النبات",
};

const ZONE_BY_SKILL: Record<string, string> = {
  "math.addition": "math", "math.subtraction": "math", "math.geometry": "math", "math.numbers": "math",
  "arabic.phonics": "arabic", "arabic.grammar": "arabic", "arabic.vocabulary": "arabic",
  "science.animals": "science", "science.plants": "science",
};

function getMadarMessage(student: StudentDNA): string {
  const style = student.learningStyle;
  const name = student.name;
  if (style === "visual")      return `${name}، سأريك صوراً ورسوماً تجعل كل درس ممتعاً! 🎨`;
  if (style === "auditory")    return `${name}، استمع جيداً وستتذكر كل شيء بسهولة! 🎧`;
  if (style === "kinesthetic") return `${name}، جرّب بنفسك — التجربة أفضل معلم! ✋`;
  if (style === "reading")     return `${name}، كل كلمة تقرأها تزيدك ذكاءً! 📖`;
  return `أهلاً ${name}! أنا هنا لأساعدك في كل خطوة 🌟`;
}

// ── No diagnostic screen ──────────────────────────────────────────────────────

function NeedsDiagnostic({ student, onGo }: { student: StudentDNA; onGo: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5">
      <div className="text-6xl">{student.avatar}</div>
      <div>
        <h2 className="text-2xl font-black">أهلاً، {student.name}!</h2>
        <p className="text-base mt-1" style={{ color: "var(--text-muted)" }}>
          خطوة واحدة تفصلك عن عالمك
        </p>
      </div>
      <div className="w-full max-w-sm rounded-2xl px-4 py-3 flex items-start gap-3 text-right"
        style={{ background: "#FFF0D4", border: "1.5px solid #FFD89E" }}>
        <span className="text-xl">⚠️</span>
        <p className="text-sm" style={{ color: "#C04010" }}>
          أكمل اكتشاف قدراتك حتى ينطلق مدار في رحلتك!
        </p>
      </div>
      <button onClick={onGo}
        className="w-full max-w-sm py-4 rounded-2xl font-black text-lg text-white active:scale-95 transition-transform"
        style={{ background: "var(--primary)" }}>
        أكمل اكتشاف قدراتك 🎯
      </button>
    </div>
  );
}

// ── Home tab ──────────────────────────────────────────────────────────────────

function HomeTab({ student, onGoJourney, onStartMission }: {
  student: StudentDNA;
  onGoJourney: (subjectId: string) => void;
  onStartMission: () => void;
}) {
  const xpMax = student.level * 200;
  const xpPercent = Math.min(Math.round((student.xp / xpMax) * 100), 100);
  const scores = student.diagnostic?.scores ?? {};
  const weakSkillId = student.diagnostic?.weakSkills?.[0];
  const missionSkill = weakSkillId ? SKILL_LABELS[weakSkillId] : null;
  const missionZone = weakSkillId ? ZONES.find(z => z.subjectId === ZONE_BY_SKILL[weakSkillId]) : null;

  return (
    <div className="max-w-lg mx-auto space-y-4 pb-8">

      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-black">{student.avatar} أهلاً، {student.name}!</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {GRADE2_CURRICULUM.label}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-sm"
          style={{ background: "#FFF0D4", color: "#C04010" }}>
          🔥 {student.streak}
        </div>
      </div>

      {/* XP Bar */}
      <div className="rounded-2xl p-4" style={{ background: "white" }}>
        <div className="flex justify-between text-sm font-bold mb-2">
          <span>⭐ المستوى {student.level}</span>
          <span style={{ color: "var(--text-muted)" }}>{student.xp} / {xpMax} XP</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--cream-dk)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${xpPercent}%`, background: "var(--primary)" }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
          {xpPercent}% نحو المستوى {student.level + 1}
        </p>
      </div>

      {/* Madar character */}
      <div className="rounded-3xl p-4 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #FF8A3D 0%, #FFB347 100%)" }}>
        <div className="text-5xl flex-shrink-0">🤖</div>
        <div>
          <p className="text-xs font-bold text-white opacity-75 mb-0.5">مدار يقول</p>
          <p className="text-sm font-black text-white leading-snug">{getMadarMessage(student)}</p>
          {student.learningStyle && (
            <span className="inline-block mt-1.5 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.25)", color: "white" }}>
              {LEARNING_STYLE_LABELS[student.learningStyle].icon} متعلم {LEARNING_STYLE_LABELS[student.learningStyle].label}
            </span>
          )}
        </div>
      </div>

      {/* Daily mission */}
      {missionSkill && missionZone && (
        <div className="rounded-3xl p-4" style={{ background: "white" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-black text-base">🎯 مهمة اليوم</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#FFF0D4", color: "#C04010" }}>مهم</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl p-3" style={{ background: "var(--cream-md)" }}>
            <span className="text-3xl">{missionZone.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-black">تحسين مهارة: {missionSkill}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{missionZone.name}</p>
            </div>
          </div>
          <button onClick={onStartMission}
            className="w-full mt-3 py-3 rounded-2xl font-black text-white active:scale-95 transition-transform"
            style={{ background: missionZone.color }}>
            ابدأ مهمة اليوم ✨
          </button>
        </div>
      )}

      {/* World map zones */}
      <div>
        <h2 className="font-black text-base mb-3">🗺️ خريطة عالم مدار</h2>
        <div className="grid grid-cols-2 gap-3">
          {ZONES.map(zone => {
            const score = scores[zone.subjectId];
            const hasScore = score !== undefined;
            const scoreColor = !hasScore ? "var(--text-muted)" : score >= 70 ? "#4FB286" : score >= 50 ? "#FFC93C" : "#E86A8E";
            return (
              <button key={zone.subjectId}
                onClick={() => onGoJourney(zone.subjectId)}
                className="rounded-3xl p-4 text-right transition-transform active:scale-95 hover:scale-[1.02]"
                style={{ background: zone.bg }}>
                <div className="text-4xl mb-2">{zone.icon}</div>
                <div className="font-black text-sm mb-1" style={{ color: "var(--text-main)" }}>{zone.name}</div>
                {hasScore
                  ? <div className="text-xs font-bold" style={{ color: scoreColor }}>
                      {score >= 70 ? "✅" : score >= 50 ? "⚡" : "💪"} {score}%
                    </div>
                  : <div className="text-xs" style={{ color: "var(--text-muted)" }}>استكشف</div>
                }
              </button>
            );
          })}
        </div>
      </div>

      {/* Better than yesterday */}
      <div className="rounded-3xl p-4 flex items-center gap-4"
        style={{ background: "white", border: "2px solid var(--cream-dk)" }}>
        <div className="text-4xl">📈</div>
        <div className="flex-1">
          <p className="font-black text-sm">أنت أفضل من أمس!</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {student.completedLessons.length > 0
              ? `أكملت ${student.completedLessons.length} درس حتى الآن — استمر!`
              : "ابدأ مهمتك اليوم وسجّل أول إنجازاتك 🚀"}
          </p>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="text-2xl font-black" style={{ color: "var(--primary)" }}>{student.xp}</div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>XP</div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

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

  const NAV_TABS = [
    { id: "home",    icon: "🏠", label: "عالمي" },
    { id: "journey", icon: "🗺️",  label: "رحلتي" },
    { id: "awards",  icon: "🏆", label: "جوائزي" },
    { id: "profile", icon: "👤", label: "ملفي" },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--cream)" }}>

      {/* Side rail */}
      <aside className="flex flex-col items-center gap-3 py-6 px-2 border-l flex-shrink-0"
        style={{ background: "var(--cream-md)", borderColor: "var(--cream-dk)", width: 68 }}>
        <div className="text-2xl mb-1">🌟</div>
        {(hasDiagnostic ? NAV_TABS : NAV_TABS.slice(0, 1)).map(item => (
          <button key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            title={item.label}
            className="flex flex-col items-center gap-1 rounded-2xl p-2 w-full transition-all"
            style={{
              background: activeTab === item.id ? "var(--primary)" : "transparent",
              color: activeTab === item.id ? "white" : "var(--text-muted)",
            }}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-[9px] font-bold">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-4">

        {!hasDiagnostic && (
          <NeedsDiagnostic student={student} onGo={() => router.push("/assessment")} />
        )}

        {hasDiagnostic && activeTab === "home" && (
          <HomeTab
            student={student}
            onGoJourney={goJourney}
            onStartMission={() => router.push("/lesson")}
          />
        )}

        {hasDiagnostic && activeTab === "journey" && (
          <div className="max-w-2xl mx-auto space-y-4">
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
                                {hasContent && <span style={{ color: "#4FB286" }} className="font-bold">● متاح</span>}
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

        {hasDiagnostic && activeTab === "awards" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-black">جوائزي 🏆</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACHIEVEMENTS.map(a => (
                <div key={a.id} className="rounded-2xl p-4 text-center"
                  style={{ background: "var(--cream-md)", opacity: a.unlocked ? 1 : 0.4 }}>
                  <div className="text-4xl mb-2">{a.icon}</div>
                  <div className="font-black text-sm mb-1">{a.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{a.sub}</div>
                  {a.unlocked && <div className="mt-2 text-xs font-bold" style={{ color: "var(--primary)" }}>مفتوح ✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {hasDiagnostic && activeTab === "profile" && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="rounded-3xl p-6 text-center" style={{ background: "white" }}>
              <div className="text-6xl mb-3">{student.avatar}</div>
              <h2 className="text-2xl font-black">{student.name}</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{GRADE2_CURRICULUM.label}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "المستوى", value: student.level,  icon: "⭐" },
                { label: "النقاط",  value: student.xp,     icon: "🔥" },
                { label: "الأيام",  value: student.streak,  icon: "📅" },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl p-4 text-center" style={{ background: "white" }}>
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
    </div>
  );
}
