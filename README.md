# مدار — Madaar

تطبيق تعليمي تفاعلي للأطفال (الابتدائي) — نموذج عالي الدقة لـ iPad.

![iPad Landscape](https://img.shields.io/badge/device-iPad%20landscape-FF8A3D)
![RTL](https://img.shields.io/badge/dir-RTL-4FB286)
![React](https://img.shields.io/badge/react-18.3-9B7EDE)

## التشغيل

افتح أي من الملفين في المتصفح مباشرة:

- **`Madaar.html`** — النسخة المعتمدة على الإنترنت (تحمّل React + الخطوط من CDN). أصغر حجماً وأسهل في التطوير.
- **`Madaar (standalone).html`** — ملف واحد مستقل تماماً (~2.5MB) يشتغل بدون إنترنت. كل شيء داخله: React, Babel, الخطوط, الأكواد.

## المميزات

- 🏠 **الرئيسية** — هدف يومي، شعلة الأسبوع، إحصائيات، شبكة المواد
- 🗺️ **مغامراتي** — مسار درس-بدرس على شكل Duolingo
- 📖 **الدرس التفاعلي** — شرح بصري للجمع بالعمود مع خطوات
- ⚡ **الاختبار** — اختيار من متعدد + سحب ومطابقة + بناء بالمكعبات
- 🏆 **الإنجازات** — ميداليات بمستويات ندرة
- 👤 **الملف الشخصي** — شارة المستوى + تقدم الأسبوع + التقدم في كل المواد

## التخصيصات (Tweaks)

داخل التطبيق، فعّل خيار "Tweaks" من الشريط العلوي:
- تبديل اللون الأساسي (٥ ألوان)
- ٣ عائلات خط (مرح / حديث / كلاسيكي)
- الوضع الليلي

## بنية الملفات

```
Madaar.html              ← shell + scaling إلى iPad
app.jsx                  ← الجذر، state، routing، tweaks
data.jsx                 ← المحتوى (مواد، دروس، اختبارات)
icons.jsx                ← أيقونات SVG ورسومات المواد
brand.jsx                ← اللوجو + شخصية روبو
components.jsx           ← أزرار، تقدم، confetti، toast
screens-shell.jsx        ← الشريط الجانبي + العلوي
screens-home.jsx         ← الرئيسية + المغامرة
screens-lesson.jsx       ← شاشة الدرس
screens-quiz.jsx         ← شاشة الاختبار
screens-meta.jsx         ← الإنجازات + الملف الشخصي
tweaks-panel.jsx         ← لوحة التخصيصات
```

## التقنيات

- React 18 (UMD + Babel inline JSX — لا يحتاج build step)
- خطوط: Baloo 2, Tajawal, IBM Plex Sans Arabic, Amiri, Cairo
- CSS variables للموضوع والألوان
- RTL native
