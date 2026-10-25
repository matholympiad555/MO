"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "bn" | "en";

export interface Translations {
  // Nav
  brandSubtitle: string;
  navHome: string;
  navMath: string;
  navPhysics: string;
  navLeaderboard: string;
  navYoutube: string;
  navCourse: string;
  navResources: string;
  navMockTests: string;
  navSudoku: string;
  navQa: string;
  navPrebook: string;
  cashoutTitle: string;
  
  // Hero
  heroTag: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroSolveBtn: string;
  heroYoutubeBtn: string;
  heroCheckMath: string;
  heroCheckPhysics: string;
  heroCheckPoints: string;
  heroCheckFree: string;
  heroDiscussionTitle: string;
  heroDiscussionLive: string;
  heroQuoteSolver: string;
  heroQuotePtolemy: string;
  heroQuoteSofia: string;
  
  // Halum AI
  halumGreeting: string;
  halumPlaceholder: string;
  halumTitle: string;
  halumRole: string;
  
  // Cashout
  cashoutPointsTitle: string;
  cashoutProgress: string;
  cashoutRule: string;
  cashoutBtn: string;
}

export const translations: Record<Language, Translations> = {
  bn: {
    brandSubtitle: "বাংলার গণিত অলিম্পিয়াড",
    navHome: "হোম",
    navMath: "গণিত",
    navPhysics: "পদার্থ",
    navLeaderboard: "লিডারবোর্ড",
    navYoutube: "ইউটিউব",
    navCourse: "কোর্স ও শিক্ষক",
    navResources: "BDMO রিসোর্স",
    navMockTests: "মক টেস্ট",
    navSudoku: "সুডোকু",
    navQa: "প্রশ্নোত্তর ফোরাম",
    navPrebook: "প্রি-বুক করো",
    cashoutTitle: "১০০০ পয়েন্টে ১০০৳ bKash ক্যাশআউট",

    heroTag: "Official Hub for Banglar Math Olympiad",
    heroTitle1: "Tiger Math",
    heroTitle2: "AI Olympiad Practice & Live Tutoring",
    heroSubtitle:
      "বাংলার গণিত অলিম্পিয়াডের সম্পূর্ণ প্ল্যাটফর্ম। এক হাজারেরও বেশি ক্যাটাগরিভিত্তিক গণিত সমস্যা, ১০০টি পদার্থবিজ্ঞান প্রশ্ন, প্রতি সমাধানে +১০ পয়েন্ট, অফিসিয়াল বিডিএমও রিসোর্স, মক টেস্ট এবং জেমিনাই এআই লাইভ টিউটর।",
    heroSolveBtn: "সমস্যা সমাধান শুরু করো",
    heroYoutubeBtn: "ইউটিউব চ্যানেল (@BanglarMathOlympiad) ↗",
    heroCheckMath: "১,০০০+ গণিত প্রশ্ন",
    heroCheckPhysics: "১০০টি পদার্থবিজ্ঞান সমস্যা",
    heroCheckPoints: "প্রতি সমাধানে +১০ পয়েন্ট",
    heroCheckFree: "বিনামূল্যে সম্পূর্ণ উন্মুক্ত",
    heroDiscussionTitle: "BDMO National Camp Practice",
    heroDiscussionLive: "Live Problem Discussion",
    heroQuoteSolver: "Tahmid (IMO Solver)",
    heroQuotePtolemy:
      "The only step left is to apply Ptolemy's Theorem: AC · BD = AB · CD + BC · DA, which immediately yields the diameter!",
    heroQuoteSofia: "Sofia: Go with the circumradius formula R = (abc) / (4Δ)",

    halumGreeting:
      "হালুউউম! 🐯 আমি রয়েল বেঙ্গল টাইগার হালুম — তোমার অলিম্পিয়াড গণিত বন্ধু! গণিতের যে কোনো সমস্যা আমাকে বলো, বাঘের মতো গর্জন দিয়ে সমাধান করে ফেলব!",
    halumPlaceholder: "অঙ্ক বা প্রশ্ন লিখো... (যেমন: ৩ দিয়ে বিভাজ্যতার নিয়ম কী?)",
    halumTitle: "হালুম AI — Tiger of Math",
    halumRole: "অলিম্পিয়াড স্পেশালিস্ট এআই টিউটর",

    cashoutPointsTitle: "তোমার বর্তমান পয়েন্ট:",
    cashoutProgress: "সম্পন্ন",
    cashoutRule: "১০০০ পয়েন্ট = ১০০ টাকা বিকাশ পুরস্কার!",
    cashoutBtn: "১০০ টাকা ক্যাশআউট রিকোয়েস্ট পাঠাও",
  },
  en: {
    brandSubtitle: "Bangladesh Math Olympiad",
    navHome: "Home",
    navMath: "Math",
    navPhysics: "Physics",
    navLeaderboard: "Leaderboard",
    navYoutube: "YouTube",
    navCourse: "Course & Mentors",
    navResources: "BDMO Resources",
    navMockTests: "Mock Tests",
    navSudoku: "Sudoku",
    navQa: "Q&A Forum",
    navPrebook: "Pre-Book",
    cashoutTitle: "1000 pts = 100৳ bKash Cashout",

    heroTag: "Official Hub for Banglar Math Olympiad",
    heroTitle1: "Tiger Math",
    heroTitle2: "AI Olympiad Practice & Live Tutoring",
    heroSubtitle:
      "Bangladesh's premier Math Olympiad platform. 1,000+ categorized math problems, 100 physics challenges, +10 points per solve, official BDMO resources, mock tests, and Gemini AI live tutor.",
    heroSolveBtn: "Start Solving Problems",
    heroYoutubeBtn: "YouTube Channel (@BanglarMathOlympiad) ↗",
    heroCheckMath: "1,000+ Math Problems",
    heroCheckPhysics: "100 Physics Challenges",
    heroCheckPoints: "+10 Points Per Solve",
    heroCheckFree: "100% Free & Open Access",
    heroDiscussionTitle: "BDMO National Camp Practice",
    heroDiscussionLive: "Live Problem Discussion",
    heroQuoteSolver: "Tahmid (IMO Solver)",
    heroQuotePtolemy:
      "The only step left is to apply Ptolemy's Theorem: AC · BD = AB · CD + BC · DA, which immediately yields the diameter!",
    heroQuoteSofia: "Sofia: Go with the circumradius formula R = (abc) / (4Δ)",

    halumGreeting:
      "Roaaar! 🐯 I am Halum the Royal Bengal Tiger — your Olympiad Math Coach! Bring on any tough math problem, and let's conquer it together!",
    halumPlaceholder: "Type your math question... (e.g. Divisibility rule of 7)",
    halumTitle: "Halum AI — Tiger of Math",
    halumRole: "AI Olympiad Math & Physics Tutor",

    cashoutPointsTitle: "Your Current Balance:",
    cashoutProgress: "Completed",
    cashoutRule: "1,000 Points = 100 BDT bKash Reward!",
    cashoutBtn: "Request 100 BDT Cashout",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "bn",
  setLanguage: () => {},
  t: translations.bn,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    const saved = localStorage.getItem("tiger_math_lang") as Language;
    if (saved === "bn" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tiger_math_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}