export const SCIENCE_G2_LESSONS: Record<string, {
  title: string; subject: string; subjectColor: string; icon: string; xp: number;
  steps: { type: "intro"|"explain"|"example"|"practice"|"done"; title?: string; body?: string; visual?: React.ReactNode; question?: string; options?: string[]; correct?: number; hint?: string; }[];
}> = {
  "u1-l1": {
    title: "خصائص الكائنات الحية",
    subject: "العلوم", subjectColor: "#4FB286", icon: "🔬", xp: 20,
    steps: [
      { type: "intro", body: "سنتعلم اليوم ما الذي يجعل الكائن حياً! هيا نكتشف معاً." },
      {
        type: "explain", title: "ما هي خصائص الكائنات الحية؟",
        body: "الكائنات الحية لها خصائص مشتركة:\n🌱 تنمو وتكبر\n🍎 تحتاج إلى غذاء\n💧 تحتاج إلى ماء\n💨 تتنفس\n🐣 تتكاثر (تنجب أبناء)\n🏃 تتحرك أو تستجيب",
        visual: (
          <div className="grid grid-cols-3 gap-2 text-center">
            {[["🌱","تنمو"],["🍎","تتغذى"],["💧","تشرب"],["💨","تتنفس"],["🐣","تتكاثر"],["🏃","تتحرك"]].map(([icon,label])=>(
              <div key={label} className="rounded-xl p-2" style={{background:"white"}}>
                <div className="text-2xl">{icon}</div>
                <div className="text-xs font-bold mt-1">{label}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        type: "example", title: "مثال: القطة والكرسي",
        body: "القطة 🐱 كائن حي لأنها:\n• تأكل وتشرب\n• تتنفس\n• تنجب قططاً صغيرة\n• تتحرك وتنمو\n\nالكرسي 🪑 ليس كائناً حياً لأنه:\n• لا يأكل ولا يتنفس\n• لا ينمو ولا يتكاثر",
      },
      { type: "practice", question: "أيٌّ من التالي كائن حي؟", options: ["🌳 شجرة", "🪨 حجر", "💧 ماء", "🚗 سيارة"], correct: 0, hint: "الشجرة تنمو وتتنفس وتتكاثر" },
      { type: "practice", question: "ما الذي يحتاجه الكائن الحي للبقاء؟", options: ["الغذاء والماء والهواء", "الكهرباء فقط", "الضوء فقط", "لا شيء"], correct: 0, hint: "الكائنات الحية تحتاج غذاء وماء وهواء" },
      { type: "practice", question: "الإنسان كائن حي لأنه...", options: ["يتنفس وينمو ويتكاثر", "لا يتحرك", "لا يحتاج ماءً", "لا يأكل"], correct: 0, hint: "الإنسان يملك جميع خصائص الكائنات الحية" },
      { type: "done" },
    ],
  },
  "u2-l6": {
    title: "البيئة الصحراوية",
    subject: "العلوم", subjectColor: "#4FB286", icon: "🏜️", xp: 20,
    steps: [
      { type: "intro", body: "هل تعلم أن الصحراء بيئة رائعة تعيش فيها كائنات مدهشة؟ هيا نتعرف عليها!" },
      { type: "explain", title: "البيئة الصحراوية", body: "الصحراء بيئة جافة وحارة:\n☀️ حارة جداً نهاراً وباردة ليلاً\n🌵 قليلة المطر والنباتات\n🐪 تعيش فيها حيوانات متكيفة مثل:\n• الجمل — يخزن الماء في سنامه\n• الثعبان — يختبئ تحت الرمال\n• الجربوع — ينشط ليلاً", },
      { type: "practice", question: "لماذا يستطيع الجمل العيش في الصحراء؟", options: ["يخزن الماء في سنامه", "يشرب كل دقيقة", "يعيش في الماء", "لا يحتاج غذاءً"], correct: 0, hint: "السنام يساعد الجمل على تخزين الطاقة والدهون" },
      { type: "practice", question: "ما من خصائص الصحراء؟", options: ["جافة وقليلة المطر", "باردة وكثيرة الأمطار", "مغطاة بالثلج", "مليئة بالأشجار الكثيفة"], correct: 0, hint: "الصحراء بيئة جافة وحارة" },
      { type: "done" },
    ],
  },
  "u3-l11": {
    title: "حالات المادة",
    subject: "العلوم", subjectColor: "#4FB286", icon: "⚗️", xp: 20,
    steps: [
      { type: "intro", body: "كل شيء من حولنا مادة! والمادة لها ثلاث حالات. هيا نتعرف عليها." },
      {
        type: "explain", title: "حالات المادة الثلاث",
        body: "المادة توجد في ثلاث حالات:\n🧊 الصلبة: شكلها ثابت مثل الجليد والحجر\n💧 السائلة: تأخذ شكل الإناء مثل الماء والعصير\n💨 الغازية: تملأ الفضاء مثل الهواء والبخار",
        visual: (
          <div className="grid grid-cols-3 gap-3 text-center">
            {[["🧊","صلب","#5BA3D9"],["💧","سائل","#4FB286"],["💨","غاز","#9B7EDE"]].map(([icon,label,color])=>(
              <div key={label} className="rounded-xl p-3" style={{background:color+"22",border:`2px solid ${color}`}}>
                <div className="text-3xl">{icon}</div>
                <div className="font-black text-sm mt-1" style={{color}}>{label}</div>
              </div>
            ))}
          </div>
        ),
      },
      { type: "practice", question: "الجليد في أي حالة من حالات المادة؟", options: ["صلب", "سائل", "غاز", "ليس مادة"], correct: 0, hint: "الجليد له شكل ثابت لذا هو صلب" },
      { type: "practice", question: "الهواء في أي حالة من حالات المادة؟", options: ["غاز", "سائل", "صلب", "لا شيء"], correct: 0, hint: "الهواء غاز — لا نراه لكنه موجود" },
      { type: "practice", question: "ما الذي يحدث للجليد عند تسخينه؟", options: ["يتحول إلى سائل (ماء)", "يصبح أصلب", "يختفي تماماً", "يتحول إلى حجر"], correct: 0, hint: "الحرارة تذيب الجليد فيتحول إلى ماء" },
      { type: "done" },
    ],
  },
};
