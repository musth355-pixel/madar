import { MATH_G2_LESSONS } from "./math-g2";
import { SCIENCE_G2_LESSONS } from "./science-g2";
import { ARABIC_G2_LESSONS } from "./arabic-g2";
import { ISLAMIC_G2_LESSONS } from "./islamic-g2";
import { ENGLISH_G2_LESSONS } from "./english-g2";
import { SOCIAL_G2_LESSONS } from "./social-g2";
import { QURAN_G2_LESSONS } from "./quran-g2";
import { TECH_G2_LESSONS } from "./tech-g2";

const ALL_LESSONS: Record<string, Record<string, unknown>> = {
  math: MATH_G2_LESSONS,
  science: SCIENCE_G2_LESSONS,
  arabic: ARABIC_G2_LESSONS,
  islamic: ISLAMIC_G2_LESSONS,
  english: ENGLISH_G2_LESSONS,
  social: SOCIAL_G2_LESSONS,
  quran: QURAN_G2_LESSONS,
  tech: TECH_G2_LESSONS,
};

export function getLesson(subjectId: string, unitId: string, lessonId: string) {
  const subjectLessons = ALL_LESSONS[subjectId];
  if (!subjectLessons) return null;
  const key = `${unitId}-${lessonId}`;
  return (subjectLessons[key] as unknown) ?? null;
}
