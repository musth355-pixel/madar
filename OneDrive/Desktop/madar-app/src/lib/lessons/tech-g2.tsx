export const TECH_G2_LESSONS: Record<string, {
  title: string; subject: string; subjectColor: string; icon: string; xp: number;
  steps: { type: "intro"|"explain"|"example"|"practice"|"done"; title?: string; body?: string; visual?: React.ReactNode; question?: string; options?: string[]; correct?: number; hint?: string; }[];
}> = {
  "u1-l1": {
    title: "أجزاء الحاسب الآلي",
    subject: "الحاسب والتقنية", subjectColor: "#7AC4D9", icon: "💻", xp: 20,
    steps: [
      { type: "intro", body: "سنتعرف اليوم على أجزاء الحاسب الآلي ووظيفة كل جزء!" },
      {
        type: "explain", title: "أجزاء الحاسب الآلي",
        body: "الحاسب يتكون من أجزاء رئيسية:\n\n🖥️ الشاشة (Monitor) — تعرض المعلومات\n⌨️ لوحة المفاتيح (Keyboard) — ندخل النصوص\n🖱️ الماوس (Mouse) — نتحكم في الحاسب\n🖨️ الطابعة (Printer) — تطبع الوثائق\n💾 وحدة المعالجة — دماغ الحاسب",
        visual: (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[["🖥️","الشاشة"],["⌨️","لوحة المفاتيح"],["🖱️","الماوس"],["🖨️","الطابعة"]].map(([icon,label])=>(
              <div key={label} className="rounded-xl p-3 text-center font-bold" style={{background:"#D6EFF5"}}>
                <div className="text-3xl mb-1">{icon}</div>
                <div>{label}</div>
              </div>
            ))}
          </div>
        ),
      },
      { type: "practice", question: "ما وظيفة الشاشة في الحاسب؟", options: ["عرض المعلومات والصور", "إدخال النصوص", "طباعة الوثائق", "تشغيل الحاسب"], correct: 0, hint: "الشاشة تعرض ما يحدث في الحاسب" },
      { type: "practice", question: "ما الجهاز الذي نستخدمه لإدخال النصوص؟", options: ["لوحة المفاتيح", "الماوس", "الشاشة", "الطابعة"], correct: 0, hint: "نكتب الحروف والأرقام بلوحة المفاتيح" },
      { type: "practice", question: "ما وظيفة الطابعة؟", options: ["طباعة الوثائق والصور ورقياً", "عرض الصور على الشاشة", "التحكم في الحاسب", "حفظ البيانات"], correct: 0, hint: "الطابعة تطبع على الورق" },
      { type: "done" },
    ],
  },
  "u2-l5": {
    title: "سطح المكتب والنوافذ",
    subject: "الحاسب والتقنية", subjectColor: "#7AC4D9", icon: "🖥️", xp: 20,
    steps: [
      { type: "intro", body: "سنتعلم كيف نستخدم سطح المكتب والنوافذ في الحاسب!" },
      { type: "explain", title: "سطح المكتب", body: "سطح المكتب (Desktop) هو الشاشة الرئيسية عند تشغيل الحاسب.\n\nيحتوي على:\n🗂️ الأيقونات — رموز تمثل البرامج والملفات\n📁 سلة المحذوفات — تحفظ الملفات المحذوفة\n📊 شريط المهام — يعرض البرامج المفتوحة\n🔲 النوافذ — تفتح عند تشغيل برنامج\n\nيمكنك:\n• فتح برنامج بالنقر المزدوج\n• تصغير النافذة أو تكبيرها\n• إغلاق النافذة بزر X" },
      { type: "practice", question: "ما اسم الشاشة الرئيسية عند تشغيل الحاسب؟", options: ["سطح المكتب", "النافذة", "المتصفح", "البرنامج"], correct: 0, hint: "Desktop = سطح المكتب" },
      { type: "practice", question: "كيف تفتح برنامجاً على سطح المكتب؟", options: ["النقر المزدوج على أيقونته", "النقر مرة واحدة", "كتابة اسمه", "لا يمكن ذلك"], correct: 0, hint: "انقر مرتين سريعتين على الأيقونة" },
      { type: "done" },
    ],
  },
  "u3-l9": {
    title: "ما هو الإنترنت؟",
    subject: "الحاسب والتقنية", subjectColor: "#7AC4D9", icon: "🌐", xp: 20,
    steps: [
      { type: "intro", body: "الإنترنت عالم واسع مليء بالمعلومات! هيا نتعرف عليه." },
      { type: "explain", title: "الإنترنت", body: "الإنترنت شبكة ضخمة تربط ملايين الحواسيب حول العالم.\n\nنستخدمه لـ:\n📚 البحث عن المعلومات\n🎬 مشاهدة الفيديوهات التعليمية\n📧 إرسال الرسائل\n🎮 الألعاب التعليمية\n📱 التواصل مع العائلة\n\n⚠️ يجب استخدامه بحكمة وتحت إشراف الوالدين!" },
      { type: "practice", question: "ما هو الإنترنت؟", options: ["شبكة تربط حواسيب حول العالم", "برنامج للرسم", "نوع من الحواسيب", "جهاز طباعة"], correct: 0, hint: "الإنترنت شبكة عالمية ضخمة" },
      { type: "practice", question: "من يجب أن يشرف على استخدامك للإنترنت؟", options: ["الوالدان والمعلمون", "أصدقاؤك فقط", "لا أحد", "أنت وحدك"], correct: 0, hint: "الإنترنت يحتاج إشرافاً من الكبار لحماية الأطفال" },
      { type: "done" },
    ],
  },
};
