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
  "u1-l4": {
    title: "Phonics: Short Vowels", subject: "English", subjectColor: "#5BA3D9", icon: "🔤", xp: 25,
    steps: [
      { type: "intro", body: "Let's learn the short vowel sounds in English! 🎵" },
      { type: "explain", title: "Short Vowel Sounds", body: "The 5 short vowels:\n\n🅐 a — as in: cat, hat, map\n🅔 e — as in: bed, red, ten\n🅘 i — as in: big, hit, sit\n🅞 o — as in: dog, hot, top\n🅤 u — as in: cup, bug, run\n\n💡 Short vowels are short sounds in the middle of words!" },
      { type: "practice", question: "What is the short vowel in 'cat'?", options: ["a","e","i","o"], correct: 0, hint: "c-A-t — the vowel in the middle is 'a'" },
      { type: "practice", question: "Which word has a short 'i' sound?", options: ["big","cake","bean","boat"], correct: 0, hint: "b-I-g — the 'i' in big is short" },
      { type: "practice", question: "What is the short vowel in 'cup'?", options: ["u","a","e","o"], correct: 0, hint: "c-U-p — the vowel is 'u'" },
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
  "u1-l3": {
    title: "Colors and Shapes", subject: "English", subjectColor: "#5BA3D9", icon: "🎨", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn colors and shapes in English! 🌈" },
      { type: "explain", title: "Colors & Shapes", body: "Colors:\n🔴 red — أحمر\n🔵 blue — أزرق\n🟢 green — أخضر\n🟡 yellow — أصفر\n🟠 orange — برتقالي\n⚪ white — أبيض\n⚫ black — أسود\n\nShapes:\n⬛ square — مربع\n🔵 circle — دائرة\n🔺 triangle — مثلث\n🟩 rectangle — مستطيل" },
      { type: "practice", question: "What color is the sky?", options: ["blue","red","green","yellow"], correct: 0, hint: "السماء زرقاء = blue" },
      { type: "practice", question: "What is 'مثلث' in English?", options: ["triangle","circle","square","rectangle"], correct: 0, hint: "مثلث = triangle 🔺" },
      { type: "done" },
    ],
  },
  "u2-l7": {
    title: "This is / These are", subject: "English", subjectColor: "#5BA3D9", icon: "👆", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn how to point to things and people in English!" },
      { type: "explain", title: "This is / These are", body: "'This is' — نستخدمها للإشارة لشيء واحد قريب:\n• This is my book. هذا كتابي.\n• This is my father. هذا أبي.\n\n'These are' — نستخدمها للإشارة لأشياء متعددة:\n• These are my books. هذه كتبي.\n• These are my friends. هؤلاء أصدقائي.\n\n💡 This = هذا/هذه (مفرد)\n    These = هؤلاء/هذه (جمع)" },
      { type: "practice", question: "Complete: ___ is my pencil. (pointing to one pencil)", options: ["This","These","That","Those"], correct: 0, hint: "'This' is used for one nearby thing" },
      { type: "practice", question: "Complete: ___ are my books. (pointing to many books)", options: ["These","This","That","It"], correct: 0, hint: "'These' is used for many nearby things" },
      { type: "done" },
    ],
  },
  "u2-l9": {
    title: "Phonics: Long Vowels", subject: "English", subjectColor: "#5BA3D9", icon: "🔤", xp: 25,
    steps: [
      { type: "intro", body: "Now let's learn long vowel sounds — they say their own name! 📢" },
      { type: "explain", title: "Long Vowel Sounds", body: "Long vowels say their own letter name:\n\n🅐 a — as in: cake, name, lake\n🅔 e — as in: tree, feet, sea\n🅘 i — as in: bike, kite, time\n🅞 o — as in: bone, home, rope\n🅤 u — as in: cube, cute, tune\n\n💡 Long vowels sound longer than short vowels!\nShort: cat  vs  Long: cake" },
      { type: "practice", question: "Which word has a long 'a' sound?", options: ["cake","cat","bat","hat"], correct: 0, hint: "c-AKE — the 'a' says its name: 'ay'" },
      { type: "practice", question: "Which word has a long 'i' sound?", options: ["kite","sit","bit","hit"], correct: 0, hint: "k-ITE — the 'i' says its name: 'eye'" },
      { type: "done" },
    ],
  },
  "u2-l8": {
    title: "Possessive Pronouns", subject: "English", subjectColor: "#5BA3D9", icon: "📝", xp: 25,
    steps: [
      { type: "intro", body: "Let's learn how to say 'my, your, his, her' in English!" },
      { type: "explain", title: "Possessive Pronouns", body: "my = ملكي (مذكر ومؤنث)\nyour = ملكك/ملكك\nhis = ملكه (مذكر)\nher = ملكها (مؤنث)\nour = ملكنا\ntheir = ملكهم\n\nExamples:\n• This is my book. هذا كتابي\n• His name is Ali. اسمه علي\n• Her mother is kind. أمها طيبة" },
      { type: "practice", question: "Complete: ___ name is Sara. (talking about a girl)", options: ["Her","His","My","Their"], correct: 0, hint: "Sara is a girl, so use 'her'" },
      { type: "practice", question: "What is 'ملكي' in English?", options: ["my","your","his","her"], correct: 0, hint: "my = ملكي" },
      { type: "done" },
    ],
  },
  "u3-l11": {
    title: "School Supplies Vocabulary", subject: "English", subjectColor: "#5BA3D9", icon: "🎒", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn the names of school supplies in English! 📚" },
      { type: "explain", title: "School Supplies", body: "📚 book — كتاب\n✏️ pencil — قلم رصاص\n🖊️ pen — قلم\n📏 ruler — مسطرة\n🎒 bag — حقيبة\n✂️ scissors — مقص\n📐 eraser — ممحاة\n🖍️ crayons — أقلام ألوان",
        visual: (<div className="grid grid-cols-4 gap-2 text-center text-xs">{[["📚","book"],["✏️","pencil"],["📏","ruler"],["🎒","bag"]].map(([icon,word])=>(<div key={word} className="rounded-xl p-2" style={{background:"#D6EAF8"}}><div className="text-2xl">{icon}</div><div className="font-bold">{word}</div></div>))}</div>),
      },
      { type: "practice", question: "What is 'مسطرة' in English?", options: ["ruler","pen","book","bag"], correct: 0, hint: "مسطرة = ruler 📏" },
      { type: "practice", question: "What do you write with?", options: ["pencil or pen","ruler","bag","scissors"], correct: 0, hint: "We write with a pencil or pen" },
      { type: "done" },
    ],
  },
  "u3-l12": {
    title: "There is / There are", subject: "English", subjectColor: "#5BA3D9", icon: "📍", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn how to describe what's in a place!" },
      { type: "explain", title: "There is / There are", body: "'There is' — يوجد (مفرد):\n• There is a book on the table. يوجد كتاب على الطاولة.\n• There is a cat in the room. يوجد قطة في الغرفة.\n\n'There are' — يوجد (جمع):\n• There are 3 books on the table. يوجد ٣ كتب على الطاولة.\n• There are students in class. يوجد طلاب في الفصل.\n\n💡 There is + one thing (مفرد)\n    There are + many things (جمع)" },
      { type: "practice", question: "Complete: ___ a pen in my bag. (قلم واحد)", options: ["There is","There are","This is","These are"], correct: 0, hint: "'There is' = يوجد — for one thing (مفرد)" },
      { type: "practice", question: "Complete: ___ five students in the library.", options: ["There are","There is","This is","It is"], correct: 0, hint: "Five students = many → 'There are'" },
      { type: "done" },
    ],
  },
  "u3-l13": {
    title: "Prepositions of Place", subject: "English", subjectColor: "#5BA3D9", icon: "📍", xp: 25,
    steps: [
      { type: "intro", body: "Let's learn where things are using prepositions!" },
      { type: "explain", title: "Prepositions of Place", body: "in = داخل (in the box)\non = على (on the table)\nunder = تحت (under the chair)\nnext to = بجانب (next to the door)\nbehind = خلف (behind the tree)\nin front of = أمام (in front of the school)\n\nExamples:\n• The book is on the table.\n• The cat is under the chair.\n• The bag is next to the desk." },
      { type: "practice", question: "The book is ___ the table. (على الطاولة)", options: ["on","in","under","behind"], correct: 0, hint: "on = على السطح" },
      { type: "practice", question: "The cat is ___ the chair. (تحت الكرسي)", options: ["under","on","in","next to"], correct: 0, hint: "under = تحت" },
      { type: "done" },
    ],
  },
  "u4-l16": {
    title: "Can / Can't (abilities)", subject: "English", subjectColor: "#5BA3D9", icon: "💪", xp: 25,
    steps: [
      { type: "intro", body: "Let's learn how to talk about what animals and people can do!" },
      { type: "explain", title: "Can and Can't", body: "Can = يستطيع (قدرة)\nCan't = لا يستطيع (عدم قدرة)\n\nExamples:\n🐦 Birds can fly. الطيور تستطيع الطيران.\n🐟 Fish can swim. الأسماك تستطيع السباحة.\n🐧 Penguins can't fly! البطاريق لا تستطيع الطيران.\n\nQuestions:\n❓ Can birds fly? → Yes, they can.\n❓ Can fish walk? → No, they can't.\n\n💡 I can = أستطيع\n    I can't = لا أستطيع" },
      { type: "practice", question: "Can fish swim?", options: ["Yes, they can.","No, they can't.","Yes, it can.","No, I can't."], correct: 0, hint: "Fish are excellent swimmers!" },
      { type: "practice", question: "Complete: Birds ___ fly.", options: ["can","can't","is","are"], correct: 0, hint: "Birds have wings — they can fly!" },
      { type: "practice", question: "Complete: Fish ___ walk on land.", options: ["can't","can","is","are"], correct: 0, hint: "Fish live in water — they cannot walk on land." },
      { type: "done" },
    ],
  },
  "u4-l17": {
    title: "Simple Sentences", subject: "English", subjectColor: "#5BA3D9", icon: "✏️", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn how to write simple sentences in English! ✍️" },
      { type: "explain", title: "Simple Sentences", body: "A simple sentence has:\n📌 Subject (الفاعل) — who or what\n📌 Verb (الفعل) — what they do\n📌 Object (المفعول به) — what they do it to\n\nExamples:\nThe dog (subject) runs (verb).\nAli (subject) eats (verb) an apple (object).\nThe cat (subject) drinks (verb) milk (object).\n\n💡 Always start with a capital letter!\n💡 Always end with a period (.)" },
      { type: "practice", question: "Which is a complete simple sentence?", options: ["The bird sings.","bird sings","The bird","sings loud"], correct: 0, hint: "A sentence needs a subject and a verb — 'The bird sings' has both!" },
      { type: "practice", question: "What comes at the END of a sentence?", options: ["A period (.)","A capital letter","A question mark always","Nothing"], correct: 0, hint: "Sentences end with a period, question mark, or exclamation mark" },
      { type: "done" },
    ],
  },
  "u5-l19": {
    title: "Food Vocabulary", subject: "English", subjectColor: "#5BA3D9", icon: "🍎", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn food words in English! 🍕🍎" },
      { type: "explain", title: "Food & Drinks", body: "🍎 apple — تفاحة\n🍌 banana — موزة\n🍊 orange — برتقالة\n🥛 milk — حليب\n🍞 bread — خبز\n🍚 rice — أرز\n💧 water — ماء\n🧃 juice — عصير",
        visual: (<div className="grid grid-cols-4 gap-2 text-center text-xs">{[["🍎","apple"],["🍌","banana"],["🥛","milk"],["🍞","bread"]].map(([icon,word])=>(<div key={word} className="rounded-xl p-2" style={{background:"#FFF0D4"}}><div className="text-2xl">{icon}</div><div className="font-bold">{word}</div></div>))}</div>),
      },
      { type: "practice", question: "What is 'تفاحة' in English?", options: ["apple","banana","orange","grape"], correct: 0, hint: "تفاحة = apple 🍎" },
      { type: "practice", question: "What do we drink? (ماء)", options: ["water","bread","rice","apple"], correct: 0, hint: "ماء = water 💧" },
      { type: "done" },
    ],
  },
  "u5-l20": {
    title: "I like / I don't like", subject: "English", subjectColor: "#5BA3D9", icon: "👍", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn how to express what we like and don't like!" },
      { type: "explain", title: "Likes and Dislikes", body: "I like = أحب\nI don't like = لا أحب\nDo you like...? = هل تحب...؟\nYes, I do. = نعم، أحب.\nNo, I don't. = لا، لا أحب.\n\nExamples:\n• I like apples. أحب التفاح.\n• I don't like vegetables. لا أحب الخضروات.\n• Do you like milk? هل تحب الحليب?" },
      { type: "practice", question: "How do you say 'أحب البيتزا' in English?", options: ["I like pizza.","I don't like pizza.","Do you like pizza?","She likes pizza."], correct: 0, hint: "أحب = I like" },
      { type: "practice", question: "How do you say 'لا أحب الخضروات'?", options: ["I don't like vegetables.","I like vegetables.","She doesn't like vegetables.","Do you like vegetables?"], correct: 0, hint: "لا أحب = I don't like" },
      { type: "done" },
    ],
  },
  "u5-l21": {
    title: "Healthy vs Unhealthy Food", subject: "English", subjectColor: "#5BA3D9", icon: "🥗", xp: 20,
    steps: [
      { type: "intro", body: "Let's learn which foods are healthy and which are not! 🥦🍕" },
      {
        type: "explain", title: "Healthy vs Unhealthy Food",
        body: "Healthy food (طعام صحي) 💚:\n🥦 vegetables — خضروات\n🍎 fruits — فاكهة\n🥛 milk — حليب\n🥚 eggs — بيض\n🐟 fish — سمك\n\nUnhealthy food (طعام غير صحي) ❌:\n🍭 candy — حلوى\n🍟 chips — رقائق البطاطا\n🥤 soda — مشروبات غازية\n🍔 fast food — وجبات سريعة\n\n💡 Eat more healthy food to stay strong and fit!",
        visual: (<div className="grid grid-cols-2 gap-2 text-center text-sm">{[["💚 Healthy","🍎🥦🥛🥚","أكل صحي"],["❌ Unhealthy","🍭🍟🥤🍔","أكل غير صحي"]].map(([label,icons,ar])=>(<div key={String(label)} className="rounded-xl p-2" style={{background:"#D6EAF8"}}><div className="font-black">{label}</div><div className="text-xl">{icons}</div><div className="text-xs">{ar}</div></div>))}</div>),
      },
      { type: "practice", question: "Which is a healthy food?", options: ["apple 🍎","candy 🍭","chips 🍟","soda 🥤"], correct: 0, hint: "Fruits are healthy foods!" },
      { type: "practice", question: "Which food should you eat LESS of?", options: ["fast food 🍔","vegetables 🥦","fruits 🍎","milk 🥛"], correct: 0, hint: "Fast food is unhealthy and should be eaten rarely" },
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
