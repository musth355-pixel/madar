export const ENGLISH_G2_LESSONS: Record<string, {
  title: string; subject: string; subjectColor: string; icon: string; xp: number;
  steps: { type: "intro"|"explain"|"example"|"practice"|"done"; title?: string; body?: string; visual?: React.ReactNode; question?: string; options?: string[]; correct?: number; hint?: string; }[];
}> = {
  "u1-l1": {
    title: "Greetings and Introductions",
    subject: "English", subjectColor: "#5BA3D9", icon: "🌍", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn how to greet people and introduce ourselves in English! 👋" },
      {
        type: "explain", title: "Common Greetings",
        body: "Morning: Good morning! ☀️\nAfternoon: Good afternoon! 🌤️\nEvening: Good evening! 🌙\nAnytime: Hello! / Hi!\nGoodbye: Goodbye! / Bye! 👋\n\nIntroducing yourself:\n• My name is ___.\n• I am ___ years old.\n• I am from Saudi Arabia.",
        visual: (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[["☀️","Good morning!"],["🌤️","Good afternoon!"],["🌙","Good evening!"],["👋","Goodbye!"]].map(([icon,text])=>(
              <div key={text} className="rounded-xl p-2 text-center font-bold" style={{background:"#D6EAF8"}}>
                <span>{icon} {text}</span>
              </div>
            ))}
          </div>
        ),
      },
      { type: "practice", question: "What do you say in the morning?", options: ["Good morning!", "Good night!", "Good evening!", "Goodbye!"], correct: 0, hint: "Morning comes at the start of the day ☀️" },
      { type: "practice", question: "How do you introduce yourself?", options: ["My name is Ali.", "Your name is Ali.", "His name is Ali.", "Her name is Ali."], correct: 0, hint: "Use 'My' when talking about yourself" },
      { type: "practice", question: "What does 'Goodbye' mean in Arabic?", options: ["مع السلامة", "صباح الخير", "مساء الخير", "أهلاً"], correct: 0, hint: "Goodbye is said when leaving" },
      { type: "done" },
    ],
  },
  "u1-l2": {
    title: "Numbers 1–20",
    subject: "English", subjectColor: "#5BA3D9", icon: "🔢", xp: 20,
    steps: [
      { type: "intro", body: "Let's count from 1 to 20 in English! 🎉" },
      {
        type: "explain", title: "Numbers 1–20",
        body: "1=one, 2=two, 3=three, 4=four, 5=five\n6=six, 7=seven, 8=eight, 9=nine, 10=ten\n11=eleven, 12=twelve, 13=thirteen, 14=fourteen, 15=fifteen\n16=sixteen, 17=seventeen, 18=eighteen, 19=nineteen, 20=twenty",
        visual: (
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {["one","two","three","four","five","six","seven","eight","nine","ten"].map((n,i)=>(
              <div key={n} className="rounded-lg p-1.5 text-xs font-black text-white" style={{background:"#5BA3D9"}}>
                <div>{i+1}</div>
                <div className="text-[10px]">{n}</div>
              </div>
            ))}
          </div>
        ),
      },
      { type: "practice", question: "How do you write 7 in English?", options: ["seven", "six", "eight", "five"], correct: 0, hint: "7 = seven" },
      { type: "practice", question: "What number is 'fifteen'?", options: ["15", "50", "5", "14"], correct: 0, hint: "fifteen = 15" },
      { type: "practice", question: "How do you write 20 in English?", options: ["twenty", "twelve", "two", "ten"], correct: 0, hint: "20 = twenty" },
      { type: "done" },
    ],
  },
  "u2-l6": {
    title: "Family Members",
    subject: "English", subjectColor: "#5BA3D9", icon: "👨‍👩‍👧", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn the names of family members in English! 👨‍👩‍👧‍👦" },
      {
        type: "explain", title: "My Family",
        body: "👨 father (أب)\n👩 mother (أم)\n👦 brother (أخ)\n👧 sister (أخت)\n👴 grandfather (جد)\n👵 grandmother (جدة)\n👶 baby (رضيع)",
        visual: (
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {[["👨","father"],["👩","mother"],["👦","brother"],["👧","sister"],["👴","grandfather"],["👵","grandmother"]].map(([icon,word])=>(
              <div key={word} className="rounded-xl p-2" style={{background:"#D6EAF8"}}>
                <div className="text-2xl">{icon}</div>
                <div className="font-bold">{word}</div>
              </div>
            ))}
          </div>
        ),
      },
      { type: "practice", question: "What is 'أم' in English?", options: ["mother", "father", "sister", "grandmother"], correct: 0, hint: "أم = mother" },
      { type: "practice", question: "What is 'brother' in Arabic?", options: ["أخ", "أخت", "أب", "جد"], correct: 0, hint: "brother = أخ" },
      { type: "practice", question: "Complete: This is my ___. (pointing to father)", options: ["father", "mother", "sister", "brother"], correct: 0, hint: "father = أب" },
      { type: "done" },
    ],
  },
  "u4-l15": {
    title: "Wild and Farm Animals",
    subject: "English", subjectColor: "#5BA3D9", icon: "🦁", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn about animals! 🦁🐄" },
      {
        type: "explain", title: "Animals",
        body: "Wild Animals (حيوانات برية):\n🦁 lion — أسد\n🐘 elephant — فيل\n🦒 giraffe — زرافة\n🐯 tiger — نمر\n\nFarm Animals (حيوانات مزرعة):\n🐄 cow — بقرة\n🐑 sheep — خروف\n🐔 chicken — دجاجة\n🐴 horse — حصان",
        visual: (
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[["🦁","lion"],["🐘","elephant"],["🐄","cow"],["🐑","sheep"]].map(([icon,word])=>(
              <div key={word} className="rounded-xl p-2" style={{background:"#DFF3E9"}}>
                <div className="text-2xl">{icon}</div>
                <div className="font-bold">{word}</div>
              </div>
            ))}
          </div>
        ),
      },
      { type: "practice", question: "Which is a wild animal?", options: ["🦁 lion", "🐄 cow", "🐑 sheep", "🐔 chicken"], correct: 0, hint: "Lions live in the wild, not on farms" },
      { type: "practice", question: "What is 'بقرة' in English?", options: ["cow", "sheep", "horse", "chicken"], correct: 0, hint: "بقرة = cow 🐄" },
      { type: "done" },
    ],
  },
};
