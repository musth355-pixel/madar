export const ARABIC_G2_LESSONS: Record<string, {
  title: string; subject: string; subjectColor: string; icon: string; xp: number;
  steps: { type: "intro"|"explain"|"example"|"practice"|"done"; title?: string; body?: string; visual?: React.ReactNode; question?: string; options?: string[]; correct?: number; hint?: string; }[];
}> = {
  "u1-l1": {
    title: "نص: بيتنا الجميل",
    subject: "لغتي العربية", subjectColor: "#E5602A", icon: "📖", xp: 20,
    steps: [
      { type: "intro", body: "سنقرأ اليوم نصاً جميلاً عن البيت ونتعلم مفردات جديدة!" },
      {
        type: "explain", title: "نص: بيتنا الجميل",
        body: "بيتُنا كبيرٌ وجميلٌ.\nفيه غرفةٌ للجلوسِ وغرفٌ للنومِ.\nوفيه مطبخٌ تطبخُ فيه أمّي طعاماً لذيذاً.\nنحبُّ بيتَنا كثيراً.",
        visual: (
          <div className="flex flex-wrap gap-2 justify-center">
            {["🏠 البيت","🛋️ غرفة الجلوس","🛏️ غرفة النوم","🍳 المطبخ","👨‍👩‍👧 الأسرة"].map(w=>(
              <span key={w} className="px-3 py-1.5 rounded-full font-bold text-sm text-white" style={{background:"#E5602A"}}>{w}</span>
            ))}
          </div>
        ),
      },
      { type: "example", title: "المفردات الجديدة", body: "• بيتٌ — المكان الذي تسكن فيه الأسرة\n• غرفةٌ — جزء من البيت له باب\n• مطبخٌ — المكان الذي يُعدّ فيه الطعام\n• لذيذٌ — طيب المذاق ويُشتهى" },
      { type: "practice", question: "أين تطبخ الأم في النص؟", options: ["في المطبخ", "في غرفة النوم", "في الحديقة", "في الشارع"], correct: 0, hint: "المطبخ هو مكان الطبخ" },
      { type: "practice", question: "ما مضاد كلمة (كبير)؟", options: ["صغير", "جميل", "قديم", "بعيد"], correct: 0, hint: "المضاد هو العكس" },
      { type: "practice", question: "ما جمع كلمة (غرفة)؟", options: ["غرف", "غرفات", "أغرفة", "غروف"], correct: 0, hint: "جمع غرفة هو غرف" },
      { type: "done" },
    ],
  },
  "u1-l4": {
    title: "قواعد: الجملة الاسمية",
    subject: "لغتي العربية", subjectColor: "#E5602A", icon: "📝", xp: 25,
    steps: [
      { type: "intro", body: "سنتعلم اليوم الجملة الاسمية — وهي جملة تبدأ باسم!" },
      { type: "explain", title: "ما هي الجملة الاسمية؟", body: "الجملة الاسمية جملة تبدأ بـ اسم وتتكون من:\n📌 المبتدأ: الاسم في أول الجملة\n📌 الخبر: ما قيل عن المبتدأ\n\nمثال:\n• البيتُ (مبتدأ) + كبيرٌ (خبر)\n• الطالبُ (مبتدأ) + مجتهدٌ (خبر)" },
      { type: "practice", question: "ما المبتدأ في الجملة: (القمرُ مضيءٌ)؟", options: ["القمرُ", "مضيءٌ", "القمرُ مضيءٌ", "لا يوجد"], correct: 0, hint: "المبتدأ هو الاسم في أول الجملة" },
      { type: "practice", question: "ما الخبر في الجملة: (الوردةُ جميلةٌ)؟", options: ["جميلةٌ", "الوردةُ", "الوردة جميلة", "لا يوجد"], correct: 0, hint: "الخبر هو ما قيل عن المبتدأ" },
      { type: "practice", question: "أيٌّ من التالي جملة اسمية؟", options: ["السماءُ صافيةٌ", "يلعب أحمد", "ذهب علي", "جاء المعلم"], correct: 0, hint: "الجملة الاسمية تبدأ باسم" },
      { type: "done" },
    ],
  },
  "u2-l9": {
    title: "قواعد: المبتدأ والخبر",
    subject: "لغتي العربية", subjectColor: "#E5602A", icon: "📝", xp: 25,
    steps: [
      { type: "intro", body: "سنتعمق أكثر في المبتدأ والخبر. هيا نتعلم!" },
      { type: "explain", title: "المبتدأ والخبر", body: "• المبتدأ: اسم مرفوع في أول الجملة\n• الخبر: اسم مرفوع يُكمل المعنى\n\nأمثلة:\n✅ الكتابُ مفيدٌ\n✅ المعلمةُ متفانيةٌ\n✅ الماءُ باردٌ\n✅ العلمُ نورٌ" },
      { type: "practice", question: "أكمل الجملة: (الشمسُ ___)", options: ["مشرقةٌ", "يشرق", "أشرق", "شروق"], correct: 0, hint: "الخبر اسم يصف المبتدأ" },
      { type: "practice", question: "حدّد المبتدأ: (النجمُ لامعٌ)", options: ["النجمُ", "لامعٌ", "النجم لامع", "لا مبتدأ"], correct: 0, hint: "المبتدأ أول الجملة" },
      { type: "done" },
    ],
  },
  "u1-l5": {
    title: "الإملاء والكتابة",
    subject: "لغتي العربية", subjectColor: "#E5602A", icon: "✏️", xp: 25,
    steps: [
      { type: "intro", body: "سنتعلم كيف نكتب الكلمات بشكل صحيح!" },
      { type: "explain", title: "التاء المربوطة (ة) والتاء المفتوحة (ت)", body: "التاء المربوطة (ة):\n• توجد في نهاية الكلمة\n• عند الوقف تُنطق هاء\n• مثال: مدرسة، حديقة، طاولة\n\nالتاء المفتوحة (ت):\n• قد تكون في أي موضع\n• تُنطق دائماً تاء\n• مثال: بيت، قالت، كتبت" },
      { type: "practice", question: "أيٌّ من الكلمات تنتهي بتاء مربوطة؟", options: ["مدرسةٌ", "بيتٌ", "قالتْ", "كتبتُ"], correct: 0, hint: "التاء المربوطة عند الوقف تُنطق هاء: مدرسه" },
      { type: "practice", question: "أيٌّ من الكلمات تنتهي بتاء مفتوحة؟", options: ["ذهبتْ", "حديقةٌ", "مكتبةٌ", "طاولةٌ"], correct: 0, hint: "التاء المفتوحة تُنطق تاء دائماً" },
      { type: "done" },
    ],
  },
};
