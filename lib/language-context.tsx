"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "bn" | "en";

export interface Translations {
  // Brand & Nav
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
  navMore: string;
  cashoutTitle: string;
  statusCheck: string;
  adminPortal: string;
  
  // Hero
  heroTag: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroSolveBtn: string;
  heroDirectBookBtn: string;
  heroYoutubeBtn: string;
  heroCheckMath: string;
  heroCheckPhysics: string;
  heroCheckPoints: string;
  heroCheckFree: string;
  heroLiveClasses: string;
  heroMockTests: string;
  heroRecorded: string;
  heroFeeNotice: string;
  heroDiscussionTitle: string;
  heroDiscussionLive: string;
  heroQuoteSolver: string;
  heroQuotePtolemy: string;
  heroQuoteSofia: string;
  tabBooking: string;
  tabAudio: string;
  quickBookingHeader: string;
  quickBookingTitle: string;
  quickBkashSendMoney: string;
  quickRefCode: string;
  quickNamePlaceholder: string;
  quickPhonePlaceholder: string;
  quickTrxPlaceholder: string;
  quickSubmitBtn: string;
  quickSuccessTitle: string;
  quickLiveTrackBtn: string;
  
  // Pillars
  pillarsTag: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  practiceTitle: string;
  practiceDesc: string;
  competeTitle: string;
  competeDesc: string;
  analyzeTitle: string;
  analyzeDesc: string;
  collaborateTitle: string;
  collaborateDesc: string;
  seeSyllabus: string;
  joinContest: string;
  viewScorecard: string;
  openForum: string;
  
  // Course
  courseTag: string;
  courseTitle: string;
  courseSubtitle: string;
  courseFeeBadge: string;
  courseDiscount: string;
  mod1Title: string;
  mod1Desc: string;
  mod2Title: string;
  mod2Desc: string;
  mod3Title: string;
  mod3Desc: string;
  mod4Title: string;
  mod4Desc: string;
  includeLive: string;
  includeRecorded: string;
  includePractice: string;
  includeDoubt: string;
  
  // Mock Tests
  mockTag: string;
  mockTitle: string;
  mockSubtitle: string;
  mockCard1Title: string;
  mockCard2Title: string;
  mockStatusLive: string;
  mockStatusUpcoming: string;
  mockDuration: string;
  mockQuestions: string;
  mockMarks: string;
  mockStartBtn: string;
  
  // Teacher
  teacherTag: string;
  teacherTitle: string;
  teacherSubtitle: string;
  teacherLeadTitle: string;
  teacherLeadBio: string;
  cred1Title: string;
  cred1Desc: string;
  cred2Title: string;
  cred2Desc: string;
  cred3Title: string;
  cred3Desc: string;
  cred4Title: string;
  cred4Desc: string;
  
  // Pre-Book & Form
  prebookTag: string;
  prebookTitle: string;
  prebookSubtitle: string;
  prebookFeeNotice: string;
  formName: string;
  formPhone: string;
  formEmail: string;
  formGrade: string;
  formInstitution: string;
  formBkashNumber: string;
  formTrxId: string;
  formSubmitBtn: string;
  formSuccessTitle: string;
  formSuccessDesc: string;
  formCopyReceipt: string;
  
  // FAQ
  faqTag: string;
  faqTitle: string;
  faqSubtitle: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  
  // Footer
  footerDesc: string;
  footerQuickLinks: string;
  footerHelpline: string;
  footerPartners: string;
  footerCopyright: string;
  
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
    // Brand & Nav
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
    navMore: "আরও",
    cashoutTitle: "১০০০ পয়েন্টে ১০০৳ bKash ক্যাশআউট",
    statusCheck: "বুকিং স্ট্যাটাস চেক",
    adminPortal: "অ্যাডমিন পোর্টাল",

    // Hero
    heroTag: "Official Hub for Banglar Math Olympiad",
    heroTitle1: "Tiger Math",
    heroTitle2: "প্রাইমারি অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬",
    heroSubtitle:
      "বাংলার গণিত অলিম্পিয়াডের সম্পূর্ণ প্ল্যাটফর্ম। এক হাজারেরও বেশি ক্যাটাগরিভিত্তিক গণিত সমস্যা, ১০০টি পদার্থবিজ্ঞান প্রশ্ন, প্রতি সমাধানে +১০ পয়েন্ট, অফিসিয়াল বিডিএমও রিসোর্স, মক টেস্ট এবং জেমিনাই এআই লাইভ টিউটর।",
    heroSolveBtn: "সমস্যা সমাধান শুরু করো",
    heroDirectBookBtn: "সরাসরি প্রি-বুক করো (১৯৯৳)",
    heroYoutubeBtn: "ইউটিউব চ্যানেল (@BanglarMathOlympiad) ↗",
    heroCheckMath: "১,০০০+ গণিত প্রশ্ন",
    heroCheckPhysics: "১০০টি পদার্থবিজ্ঞান সমস্যা",
    heroCheckPoints: "প্রতি সমাধানে +১০ পয়েন্ট",
    heroCheckFree: "বিনামূল্যে সম্পূর্ণ উন্মুক্ত",
    heroLiveClasses: "৭+ ঘণ্টা লাইভ ক্লাস",
    heroMockTests: "২টি পূর্ণাঙ্গ মক টেস্ট",
    heroRecorded: "রেকর্ডেড লেকচার",
    heroFeeNotice: "কোর্স ফি মাত্র ১৯৯৳",
    heroDiscussionTitle: "BDMO National Camp Practice",
    heroDiscussionLive: "Live Problem Discussion",
    heroQuoteSolver: "Tahmid (IMO Solver)",
    heroQuotePtolemy:
      "The only step left is to apply Ptolemy's Theorem: AC · BD = AB · CD + BC · DA, which immediately yields the diameter!",
    heroQuoteSofia: "Sofia: Go with the circumradius formula R = (abc) / (4Δ)",
    tabBooking: "⚡ দ্রুত প্রি-বুকিং (১৯৯৳)",
    tabAudio: "🎙️ লাইভ ক্লাস ডেমো",
    quickBookingHeader: "অফিশিয়াল রেজিস্ট্রেশন",
    quickBookingTitle: "প্রাইমারি গণিত অলিম্পিয়াড ২০২৬",
    quickBkashSendMoney: "bKash Send Money:",
    quickRefCode: "রেফারেন্স কোড (Reference):",
    quickNamePlaceholder: "শিক্ষার্থীর পূর্ণ নাম *",
    quickPhonePlaceholder: "মোবাইল নম্বর *",
    quickTrxPlaceholder: "bKash TrxID *",
    quickSubmitBtn: "সিট নিশ্চিত করো (১৯৯৳)",
    quickSuccessTitle: "প্রি-বুকিং আবেদন সফল হয়েছে! 🎉",
    quickLiveTrackBtn: "লাইভ স্ট্যাটাস ট্র্যাক করো",

    // Pillars
    pillarsTag: "অলিম্পিয়াড প্রস্তুতির ৪টি স্তম্ভ",
    pillarsTitle: "গণিত অলিম্পিয়াডের পূর্ণাঙ্গ ইকোসিস্টেম",
    pillarsSubtitle: "GonitZoggo মডেলের আদলে সাজানো আমাদের ইন্টারঅ্যাক্টিভ গণিত প্ল্যাটফর্ম",
    practiceTitle: "অনুশীলন (Practice)",
    practiceDesc: "সংখ্যাতত্ত্ব, জ্যামিতি, বীজগণিত ও কম্বিনেটোরিক্স — প্রতিটি টপিকের ধাপে ধাপে গভীর সমস্যা সমাধান।",
    competeTitle: "প্রতিযোগিতা (Compete)",
    competeDesc: "অলিম্পিয়াড স্ট্যান্ডার্ড টাইমারযুক্ত লাইভ মক টেস্ট দিয়ে রিয়েল পরীক্ষার সময় ও চাপের প্রস্তুতি নাও।",
    analyzeTitle: "অগ্রগতি (Analyze)",
    analyzeDesc: "তাৎক্ষণিক স্কোরকার্ড, সঠিক/ভুল উত্তর বিশ্লেষণ এবং প্রতিটি প্রশ্নের সম্পূর্ণ ব্যাখ্যা ও ট্রিকস।",
    collaborateTitle: "কমিউনিটি (Collaborate)",
    collaborateDesc: "গণিতের যে কোনো প্রশ্নে আটকে গেলে সরাসরি প্রশ্ন করো এবং অভিজ্ঞ মেন্টরদের যাচাইকৃত সমাধান পাও।",
    seeSyllabus: "সিলেবাস দেখো",
    joinContest: "মক টেস্টে অংশ নাও",
    viewScorecard: "স্কোরকার্ড দেখো",
    openForum: "প্রশ্নোত্তর ফোরামে যাও",

    // Course
    courseTag: "প্রস্তুতি কোর্স ২০২৬",
    courseTitle: "প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬",
    courseSubtitle: "যুক্তির শক্তিতে চিন্তা করতে শেখা এবং অলিম্পিয়াডের প্রস্তুতি নেওয়া শিক্ষার্থীদের একমাত্র পূর্ণাঙ্গ বাংলা প্ল্যাটফর্ম।",
    courseFeeBadge: "কোর্স ফি ১৯৯৳",
    courseDiscount: "মূল ফি ১,০০০৳ (৮০% ছাড়)",
    mod1Title: "সংখ্যাতত্ত্ব (Number Theory)",
    mod1Desc: "মৌলিক সংখ্যা ও উৎপাদক বিশ্লেষণ, ভাজক সংখ্যা ও বিভাজ্যতার নিয়ম, লসাগু ও গসাগু এর ব্যবহারিক প্রয়োগ, মডুলার অ্যারিথমেটিক ও ভাগশেষ নীতি।",
    mod2Title: "জ্যামিতি (Geometry)",
    mod2Desc: "ত্রিভুজ ও চতুর্ভুজের বৈশিষ্ট্য, বৃত্ত ও স্পর্শক সংক্রান্ত প্রাথমিক ধারণা, ক্ষেত্রফল ও কোণ গণনা পদ্ধতি, পিথাগোরাস উপপাদ্য ও এর বাস্তব প্রয়োগ।",
    mod3Title: "বীজগণিত ও প্যাটার্ন (Algebra & Sequences)",
    mod3Desc: "ধারা ও সংখ্যা প্যাটার্ন বিশ্লেষণ, ক্রমান্বয় ও যুক্তিভিত্তিক সম্পর্ক, সমীকরণ গঠন ও অজানা রাশির মান, গাণিতিক আরোহ ও যুক্তিধারা।",
    mod4Title: "কম্বিনেটোরিক্স ও লজিক (Combinatorics & Logic)",
    mod4Desc: "বিন্যাস ও সমাবেশ (সুশৃঙ্খল গণনা), পায়রার খোপ নীতি (PHP), গ্রিড ও পথ গণনার আধুনিক নিয়ম, অলিম্পিয়াড পাজল ও বিশ্লেষণধর্মী ধাঁধা।",
    includeLive: "৭+ ঘণ্টা লাইভ ক্লাস",
    includeRecorded: "এইচডি রেকর্ডেড ক্লাস লাইফটাইম",
    includePractice: "এক্সক্লুসিভ প্র্যাকটিস শিট",
    includeDoubt: "২৪/৭ সার্বক্ষণিক প্রশ্ন সমাধান",

    // Mock Tests
    mockTag: "লাইভ মক টেস্ট",
    mockTitle: "অনলাইন গণিত অলিম্পিয়াড মক টেস্ট",
    mockSubtitle: "আঞ্চলিক ও জাতীয় অলিম্পিয়াডের বাস্তব পরীক্ষার পরিবেশে অংশ নিয়ে নিজেকে প্রস্তুত করো",
    mockCard1Title: "প্রাইমারি অলিম্পিয়াড মক টেস্ট - ০১",
    mockCard2Title: "প্রাইমারি অলিম্পিয়াড মক টেস্ট - ০২ (গ্র্যান্ড টেস্ট)",
    mockStatusLive: "লাইভ চলছে",
    mockStatusUpcoming: "আসন্ন কন্টেস্ট",
    mockDuration: "৩০ মিনিট সময়",
    mockQuestions: "১০টি প্রশ্ন",
    mockMarks: "পূর্ণমান: ১০",
    mockStartBtn: "অংশগ্রহণ করো",

    // Teacher
    teacherTag: "মেন্টর প্যানেল",
    teacherTitle: "ইন্সট্রাক্টর পরিচিতি ও মেন্টর প্যানেল",
    teacherSubtitle: "বাংলাদেশ গণিত অলিম্পিয়াড মেডেলিস্ট ও অভিজ্ঞ মেন্টরদের সরাসরি দিকনির্দেশনা",
    teacherLeadTitle: "প্রধান প্রশিক্ষক ও মেন্টর দল",
    teacherLeadBio: "বিগত ৪+ বছর ধরে জাতীয় পর্যায়ের গণিত অলিম্পিয়াড শিক্ষার্থীদের প্রশিক্ষণ দিচ্ছেন। শতাধিক শিক্ষার্থী আঞ্চলিক ও জাতীয় উৎসবে বিজয়ী হয়েছে।",
    cred1Title: "জাতীয় অলিম্পিয়াড মেডেলিস্ট",
    cred1Desc: "জাতীয় গণিত অলিম্পিয়াডে মেডেল ও জাতীয় ক্যাম্পের অভিজ্ঞতা।",
    cred2Title: "আন্তর্জাতিক অলিম্পিয়াড ফ্রেমওয়ার্ক",
    cred2Desc: "APMO ও IMO স্ট্যান্ডার্ড সমস্যা সমাধান পদ্ধতি।",
    cred3Title: "৪+ বছরের মেন্টরশিপ",
    cred3Desc: "৫০০+ শিক্ষার্থীকে অলিম্পিয়াডের জন্য সফলভাবে প্রস্তুত করা হয়েছে।",
    cred4Title: "২৪/৭ ডাউট সলভিং",
    cred4Desc: "ফোরাম ও লাইভ চ্যাটে সার্বক্ষণিক সমস্যা সমাধান সুবিধা।",

    // Pre-Book & Form
    prebookTag: "সিট নিশ্চিতকরণ",
    prebookTitle: "প্রি-বুকিং ফর্ম (কোর্স ফি ১৯৯৳)",
    prebookSubtitle: "৮০% ডিসকাউন্টে মাত্র ১৯৯ টাকায় তোমার সিট নিশ্চিত করো। সীমিত সময়ের জন্য প্রযোজ্য।",
    prebookFeeNotice: "কোর্স ফি: ১৯৯৳ (bKash Send Money: 01331366865, Ref: PRE_BOOK)",
    formName: "শিক্ষার্থীর পূর্ণ নাম *",
    formPhone: "মোবাইল নম্বর (১১ ডিজিট) *",
    formEmail: "ইমেইল ঠিকানা (ঐচ্ছিক)",
    formGrade: "শ্রেণি নির্বাচন করো *",
    formInstitution: "স্কুল / শিক্ষা প্রতিষ্ঠান *",
    formBkashNumber: "যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন *",
    formTrxId: "bKash Transaction ID (TrxID) *",
    formSubmitBtn: "প্রি-বুকিং নিশ্চিত করো (১৯৯৳)",
    formSuccessTitle: "প্রি-বুকিং আবেদন সফল হয়েছে! 🎉",
    formSuccessDesc: "তোমার পেমেন্ট তথ্য সফলভাবে সংরক্ষিত হয়েছে। কিছুক্ষণের মধ্যে ভেরিফাই সম্পন্ন হবে।",
    formCopyReceipt: "রসিদ কপি করো",

    // FAQ
    faqTag: "সাহায্য ও তথ্য",
    faqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)",
    faqSubtitle: "কোর্স এবং প্ল্যাটফর্ম সম্পর্কে সব প্রশ্নের উত্তর এক নজরে",
    faqQ1: "ক্লাস কীভাবে নেওয়া হবে?",
    faqA1: "ক্লাসগুলো গুগল মিট অথবা জুম-এর মাধ্যমে সম্পূর্ণ লাইভ নেওয়া হবে। শিক্ষার্থীরা সরাসরি মাইক ও চ্যাটে প্রশ্ন করতে পারবে।",
    faqQ2: "ক্লাস মিস হলে কি রেকর্ডিং পাওয়া যাবে?",
    faqA2: "হ্যাঁ! প্রতিটি ক্লাসের ফুল এইচডি রেকর্ডিং ও লেকচার নোটস শিক্ষার্থীদের ড্যাশবোর্ডে আজীবন সংরক্ষিত থাকবে।",
    faqQ3: "পেমেন্ট ভেরিফাই হতে কতক্ষণ সময় লাগবে?",
    faqA3: "ফর্ম সাবমিট করার পর সাধারণত ৫ থেকে ৩০ মিনিটের মধ্যে অ্যাডমিন প্যানেল থেকে বিকাশ ট্রানজেকশন আইডি যাচাই করে সিট সক্রিয় করে দেওয়া হয়।",
    faqQ4: "মক টেস্ট কীভাবে দিতে পারব?",
    faqA4: "আমাদের প্ল্যাটফর্মের 'মক টেস্ট' অপশনে গিয়ে যেকোনো সময় টাইমারযুক্ত লাইভ টেস্টে অংশ নেওয়া যাবে এবং সাথে সাথে ব্যাখ্যাসহ ফলাফল পাওয়া যাবে।",

    // Footer
    footerDesc: "বাংলাদেশের প্রাথমিক ও স্কুল শিক্ষার্থীদের জন্য গণিত অলিম্পিয়াড প্রস্তুতি ও সমস্যা সমাধানের সর্ববৃহৎ উন্মুক্ত প্ল্যাটফর্ম।",
    footerQuickLinks: "প্রয়োজনীয় লিংক",
    footerHelpline: "হেল্পলাইন ও বিকাশ",
    footerPartners: "সহযোগী স্টেম সংগঠনসমূহ",
    footerCopyright: "© ২০২৬ টাইগার ম্যাথ • সর্বস্বত্ব সংরক্ষিত।",

    // Halum AI
    halumGreeting:
      "হালুউউম! 🐯 আমি রয়েল বেঙ্গল টাইগার হালুম — তোমার অলিম্পিয়াড গণিত বন্ধু! গণিতের যে কোনো সমস্যা আমাকে বলো, বাঘের মতো গর্জন দিয়ে সমাধান করে ফেলব!",
    halumPlaceholder: "অঙ্ক বা প্রশ্ন লিখো... (যেমন: ৩ দিয়ে বিভাজ্যতার নিয়ম কী?)",
    halumTitle: "হালুম AI — Tiger of Math",
    halumRole: "অলিম্পিয়াড স্পেশালিস্ট এআই টিউটর",

    // Cashout
    cashoutPointsTitle: "তোমার বর্তমান পয়েন্ট:",
    cashoutProgress: "সম্পন্ন",
    cashoutRule: "১০০০ পয়েন্ট = ১০০ টাকা বিকাশ পুরস্কার!",
    cashoutBtn: "১০০ টাকা ক্যাশআউট রিকোয়েস্ট পাঠাও",
  },

  en: {
    // Brand & Nav
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
    navMore: "More",
    cashoutTitle: "1000 pts = 100 BDT bKash Cashout",
    statusCheck: "Check Booking Status",
    adminPortal: "Admin Portal",

    // Hero
    heroTag: "Official Hub for Banglar Math Olympiad",
    heroTitle1: "Tiger Math",
    heroTitle2: "Primary Math Olympiad Prep 2026",
    heroSubtitle:
      "Bangladesh's premier Math Olympiad platform. 1,000+ categorized math problems, 100 physics challenges, +10 points per solve, official BDMO resources, mock tests, and Gemini AI live tutor.",
    heroSolveBtn: "Start Solving Problems",
    heroDirectBookBtn: "Pre-Book Seat Directly (199 BDT)",
    heroYoutubeBtn: "YouTube Channel (@BanglarMathOlympiad) ↗",
    heroCheckMath: "1,000+ Math Problems",
    heroCheckPhysics: "100 Physics Challenges",
    heroCheckPoints: "+10 Points Per Solve",
    heroCheckFree: "100% Free & Open Access",
    heroLiveClasses: "7+ Hours Live Classes",
    heroMockTests: "2 Full Mock Tests",
    heroRecorded: "Recorded Lectures",
    heroFeeNotice: "Course Fee Only 199 BDT",
    heroDiscussionTitle: "BDMO National Camp Practice",
    heroDiscussionLive: "Live Problem Discussion",
    heroQuoteSolver: "Tahmid (IMO Solver)",
    heroQuotePtolemy:
      "The only step left is to apply Ptolemy's Theorem: AC · BD = AB · CD + BC · DA, which immediately yields the diameter!",
    heroQuoteSofia: "Sofia: Go with the circumradius formula R = (abc) / (4Δ)",
    tabBooking: "⚡ Quick Pre-Book (199 BDT)",
    tabAudio: "🎙️ Live Class Demo",
    quickBookingHeader: "Official Registration",
    quickBookingTitle: "Primary Math Olympiad 2026",
    quickBkashSendMoney: "bKash Send Money:",
    quickRefCode: "Reference Code:",
    quickNamePlaceholder: "Student's Full Name *",
    quickPhonePlaceholder: "Phone Number *",
    quickTrxPlaceholder: "bKash TrxID *",
    quickSubmitBtn: "Confirm Seat (199 BDT)",
    quickSuccessTitle: "Pre-Booking Submitted! 🎉",
    quickLiveTrackBtn: "Track Live Status",

    // Pillars
    pillarsTag: "4 Pillars of Olympiad Mastery",
    pillarsTitle: "Complete Mathematical Olympiad Ecosystem",
    pillarsSubtitle: "An interactive math platform designed after the GonitZoggo model",
    practiceTitle: "Practice",
    practiceDesc: "Number Theory, Geometry, Algebra & Combinatorics — deep problem solving across every domain.",
    competeTitle: "Compete",
    competeDesc: "Simulate real Olympiad pressure with live-timed mock tests and instant automated scoring.",
    analyzeTitle: "Analyze",
    analyzeDesc: "Instant performance scorecard, detailed step-by-step solutions, and National rankings.",
    collaborateTitle: "Collaborate",
    collaborateDesc: "Ask any tough math question and get verified step-by-step solutions from Olympiad medalists.",
    seeSyllabus: "View Syllabus",
    joinContest: "Take Mock Test",
    viewScorecard: "View Scorecard",
    openForum: "Go to Q&A Forum",

    // Course
    courseTag: "Preparation Course 2026",
    courseTitle: "Primary Math Olympiad Prep Course 2026",
    courseSubtitle: "The most comprehensive platform for mastering logical thinking and Olympiad problem solving.",
    courseFeeBadge: "Course Fee 199 BDT",
    courseDiscount: "Regular Fee 1,000 BDT (80% Off)",
    mod1Title: "Number Theory",
    mod1Desc: "Prime numbers & factor analysis, divisibility rules, GCD/LCM applications, modular arithmetic & remainder theorems.",
    mod2Title: "Geometry",
    mod2Desc: "Properties of triangles & quadrilaterals, circle & tangent theorems, area & angle calculations, Pythagorean theorem applications.",
    mod3Title: "Algebra & Sequences",
    mod3Desc: "Arithmetic & geometric sequences, logic patterns, algebraic equations & unknowns, mathematical induction & proofs.",
    mod4Title: "Combinatorics & Logic",
    mod4Desc: "Permutations & combinations (systematic counting), Pigeonhole Principle (PHP), grid path counting, Olympiad logic puzzles.",
    includeLive: "7+ Hours Live Classes",
    includeRecorded: "Full HD Lifetime Recordings",
    includePractice: "Exclusive Curated Problem Sheets",
    includeDoubt: "24/7 Dedicated Mentor Solutions",

    // Mock Tests
    mockTag: "Live Contests",
    mockTitle: "Online Math Olympiad Mock Tests",
    mockSubtitle: "Test your skills under authentic Regional and National Olympiad timed conditions",
    mockCard1Title: "Primary Olympiad Mock Test - 01",
    mockCard2Title: "Primary Olympiad Mock Test - 02 (Grand Mock)",
    mockStatusLive: "Live Now",
    mockStatusUpcoming: "Upcoming Contest",
    mockDuration: "30 Mins Duration",
    mockQuestions: "10 Questions",
    mockMarks: "Total Marks: 10",
    mockStartBtn: "Participate Now",

    // Teacher
    teacherTag: "Mentor Panel",
    teacherTitle: "Instructors & Olympiad Mentors",
    teacherSubtitle: "Direct guidance and coaching from Bangladesh Math Olympiad medalists and national campers",
    teacherLeadTitle: "Lead Coach & Mentor Team",
    teacherLeadBio: "Training national-level Olympiad aspirants for over 4+ years. Dozens of students have won regional and national awards.",
    cred1Title: "National Olympiad Medalists",
    cred1Desc: "Medalists in National BdMO with National Training Camp pedigree.",
    cred2Title: "International Framework",
    cred2Desc: "Teaching methodologies aligned with APMO and IMO standards.",
    cred3Title: "4+ Years of Mentorship",
    cred3Desc: "500+ students coached successfully for mathematics competitions.",
    cred4Title: "24/7 Doubt Resolution",
    cred4Desc: "Direct round-the-clock solutions in community forum and live chats.",

    // Pre-Book & Form
    prebookTag: "Seat Confirmation",
    prebookTitle: "Pre-Booking Form (Fee 199 BDT)",
    prebookSubtitle: "Confirm your seat with 80% discount for only 199 BDT. Limited seats available.",
    prebookFeeNotice: "Course Fee: 199 BDT (bKash Send Money: 01331366865, Ref: PRE_BOOK)",
    formName: "Student's Full Name *",
    formPhone: "Mobile Phone (11 digits) *",
    formEmail: "Email Address (Optional)",
    formGrade: "Select Grade / Class *",
    formInstitution: "School / Institution *",
    formBkashNumber: "bKash Sender Number *",
    formTrxId: "bKash Transaction ID (TrxID) *",
    formSubmitBtn: "Confirm Pre-Booking (199 BDT)",
    formSuccessTitle: "Pre-Booking Submitted! 🎉",
    formSuccessDesc: "Your payment details have been recorded. Admin verification will be completed shortly.",
    formCopyReceipt: "Copy Receipt",

    // FAQ
    faqTag: "Help & Information",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSubtitle: "Answers to common questions about the course and platform",
    faqQ1: "How will the classes be conducted?",
    faqA1: "Classes are held completely live via Google Meet or Zoom. Students can directly speak and ask questions via audio or chat.",
    faqQ2: "Will class recordings be available?",
    faqA2: "Yes! Full HD recordings and lecture notes are saved permanently in student accounts with lifetime access.",
    faqQ3: "How long does payment verification take?",
    faqA3: "Verification typically takes 5 to 30 minutes. Once verified, your course access and dashboard are activated.",
    faqQ4: "How can I take the mock tests?",
    faqA4: "Simply visit the 'Mock Tests' section on our platform anytime to take timed contests with instant scores and explanations.",

    // Footer
    footerDesc: "Bangladesh's premier open platform for Math Olympiad preparation and competitive problem solving.",
    footerQuickLinks: "Quick Navigation",
    footerHelpline: "Helpline & bKash",
    footerPartners: "STEM Collaborator Organizations",
    footerCopyright: "© 2026 Tiger Math • All Rights Reserved.",

    // Halum AI
    halumGreeting:
      "Roaaar! 🐯 I am Halum the Royal Bengal Tiger — your Olympiad Math Coach! Bring on any tough math problem, and let's conquer it together!",
    halumPlaceholder: "Type your math question... (e.g. Divisibility rule of 7)",
    halumTitle: "Halum AI — Tiger of Math",
    halumRole: "AI Olympiad Math & Physics Tutor",

    // Cashout
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