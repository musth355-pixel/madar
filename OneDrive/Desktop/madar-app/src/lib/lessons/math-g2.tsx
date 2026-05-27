export const MATH_G2_LESSONS: Record<string, {
  title: string;
  subject: string;
  subjectColor: string;
  icon: string;
  xp: number;
  steps: {
    type: "intro" | "explain" | "example" | "practice" | "done";
    title?: string;
    body?: string;
    visual?: React.ReactNode;
    question?: string;
    options?: string[];
    correct?: number;
    hint?: string;
  }[];
}> = {
  "u1-l1": {
    title: "قراءة الأعداد حتى ٩٩٩",
    subject: "الرياضيات",
    subjectColor: "#FF8A3D",
    icon: "🔢",
    xp: 20,
    steps: [
      {
        type: "intro",
        body: "سنتعلم اليوم كيف نقرأ ونكتب الأعداد الكبيرة حتى ٩٩٩. هيا نبدأ!",
      },
      {
        type: "explain",
        title: "منازل الأعداد",
        body: "كل عدد له منازل:\n🟠 الآحاد: الرقم الأول من اليمين\n🔵 العشرات: الرقم الثاني من اليمين\n🟢 المئات: الرقم الثالث من اليمين",
        visual: (
          <div className="flex gap-4 text-center font-black text-2xl">
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-3xl" style={{ background: "#4FB286" }}>٣</div>
              <div className="text-xs mt-1" style={{ color: "#4FB286" }}>مئات</div>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-3xl" style={{ background: "#5BA3D9" }}>٤</div>
              <div className="text-xs mt-1" style={{ color: "#5BA3D9" }}>عشرات</div>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-3xl" style={{ background: "#FF8A3D" }}>٧</div>
              <div className="text-xs mt-1" style={{ color: "#FF8A3D" }}>آحاد</div>
            </div>
          </div>
        ),
      },
      {
        type: "example",
        title: "مثال: العدد ٣٤٧",
        body: "العدد ٣٤٧ يُقرأ: ثلاثمئة وسبعة وأربعون\n• ٣ في منزلة المئات = ٣٠٠\n• ٤ في منزلة العشرات = ٤٠\n• ٧ في منزلة الآحاد = ٧",
        visual: (
          <div className="flex gap-3 text-center">
            {[["٣٠٠","مئات","#4FB286"],["٤٠","عشرات","#5BA3D9"],["٧","آحاد","#FF8A3D"]].map(([v,l,c])=>(
              <div key={l}>
                <div className="px-4 py-3 rounded-xl font-black text-2xl text-white" style={{background:c}}>{v}</div>
                <div className="text-xs mt-1 font-bold" style={{color:c}}>{l}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        type: "practice",
        question: "كم عدد المئات في العدد ٥٦٨؟",
        options: ["٦", "٥", "٨", "٥٦"],
        correct: 1,
        hint: "المئات هي الرقم الثالث من اليمين",
      },
      {
        type: "practice",
        question: "ما قيمة الرقم ٤ في العدد ٤٢٩؟",
        options: ["٤", "٤٠", "٤٠٠", "٢٩"],
        correct: 2,
        hint: "الرقم ٤ في منزلة المئات، إذن قيمته ٤٠٠",
      },
      {
        type: "practice",
        question: "أي عدد يُقرأ: مئتان وخمسة وثلاثون؟",
        options: ["٢٣٥", "٣٢٥", "٢٥٣", "٥٢٣"],
        correct: 0,
        hint: "مئتان = ٢٠٠، وثلاثون = ٣٠، وخمسة = ٥",
      },
      {
        type: "done",
      },
    ],
  },

  "u2-l6": {
    title: "الجمع بدون حمل",
    subject: "الرياضيات",
    subjectColor: "#FF8A3D",
    icon: "➕",
    xp: 20,
    steps: [
      {
        type: "intro",
        body: "سنتعلم جمع الأعداد ذات الثلاثة أرقام بدون حمل. الأمر سهل!",
      },
      {
        type: "explain",
        title: "طريقة الجمع بالعمود",
        body: "نرتّب الأعداد في عمود:\n• الآحاد تحت الآحاد\n• العشرات تحت العشرات\n• المئات تحت المئات\n\nثم نجمع من اليمين إلى اليسار.",
        visual: (
          <div className="font-mono text-2xl font-black text-center space-y-1">
            <div className="flex justify-end gap-3 pr-4">
              <span style={{color:"#4FB286"}}>٢</span>
              <span style={{color:"#5BA3D9"}}>٣</span>
              <span style={{color:"#FF8A3D"}}>٤</span>
            </div>
            <div className="flex justify-end gap-3 pr-4">
              <span>+</span>
              <span style={{color:"#4FB286"}}>١</span>
              <span style={{color:"#5BA3D9"}}>٥</span>
              <span style={{color:"#FF8A3D"}}>٢</span>
            </div>
            <div className="border-t-2 border-gray-400 pt-1 flex justify-end gap-3 pr-4">
              <span style={{color:"#4FB286"}}>٣</span>
              <span style={{color:"#5BA3D9"}}>٨</span>
              <span style={{color:"#FF8A3D"}}>٦</span>
            </div>
          </div>
        ),
      },
      {
        type: "practice",
        question: "كم يساوي ٢٣١ + ١٥٤؟",
        visual: (
          <div className="font-mono text-2xl font-black text-center space-y-1">
            <div>٢٣١</div>
            <div>+ ١٥٤</div>
            <div className="border-t-2 border-gray-400 pt-1">؟</div>
          </div>
        ),
        options: ["٣٨٥", "٣٩٥", "٣٧٥", "٤٨٥"],
        correct: 0,
        hint: "١+٤=٥ آحاد، ٣+٥=٨ عشرات، ٢+١=٣ مئات",
      },
      {
        type: "practice",
        question: "كم يساوي ٤٢٠ + ٣٥٣؟",
        options: ["٧٦٣", "٧٧٣", "٨٦٣", "٧٥٣"],
        correct: 1,
        hint: "٠+٣=٣، ٢+٥=٧، ٤+٣=٧",
      },
      {
        type: "practice",
        question: "في المكتبة ١٢٣ كتاب للأطفال و٢٦١ كتاب للكبار. كم المجموع؟",
        options: ["٣٧٤", "٣٨٤", "٤٧٤", "٣٦٤"],
        correct: 1,
        hint: "١٢٣ + ٢٦١ = ؟",
      },
      {
        type: "done",
      },
    ],
  },

  "u3-l11": {
    title: "الطرح بدون استلاف",
    subject: "الرياضيات",
    subjectColor: "#FF8A3D",
    icon: "➖",
    xp: 20,
    steps: [
      {
        type: "intro",
        body: "سنتعلم طرح الأعداد الكبيرة خطوة بخطوة. هيا!",
      },
      {
        type: "explain",
        title: "طريقة الطرح بالعمود",
        body: "نرتّب الأعداد في عمود ثم نطرح من اليمين:\n• نطرح الآحاد أولاً\n• ثم العشرات\n• ثم المئات",
        visual: (
          <div className="font-mono text-2xl font-black text-center space-y-1">
            <div>٥٧٨</div>
            <div>- ٢٣٤</div>
            <div className="border-t-2 border-gray-400 pt-1">٣٤٤</div>
          </div>
        ),
      },
      {
        type: "practice",
        question: "كم يساوي ٦٨٧ - ٣٤٢؟",
        options: ["٣٤٥", "٣٣٥", "٣٥٥", "٤٤٥"],
        correct: 0,
        hint: "٧-٢=٥، ٨-٤=٤، ٦-٣=٣",
      },
      {
        type: "practice",
        question: "كان معي ٨٩٥ ريال وأنفقت ٢٣١ ريال. كم تبقى معي؟",
        options: ["٦٥٤", "٦٦٤", "٦٤٤", "٧٦٤"],
        correct: 1,
        hint: "٨٩٥ - ٢٣١ = ؟",
      },
      {
        type: "done",
      },
    ],
  },
};
