export const site = {
  name: "Banglar Math Olympiad",
  nameBn: "বাংলার ম্যাথ অলিম্পিয়াড",
  tagline: "যুক্তির শক্তিতে এগিয়ে চলো",
  courseTitle: "প্রাইমারি গণিত অলিম্পিয়াড",
  courseEdition: "প্রস্তুতি কোর্স ২০২৬",
  price: 199,
  priceBn: "১৯৯",
  bkash: "01331366865",
  bkashDisplay: "01331 366865",
  reference: "PRE_BOOK",
  whatsapp: "https://wa.me/8801331366865",
  organizer: "Banglar Math Olympiad",
} as const;

export const navLinks = [
  { label: "হোম", href: "/" },
  { label: "কোর্স", href: "/#course" },
  { label: "মক টেস্ট দিন", href: "/mock-tests" },
  { label: "প্রশ্নোত্তর (Q&A)", href: "/qa" },
  { label: "স্ট্যাটাস চেক", href: "/status" },
] as const;

export const courseFeatures = [
  {
    title: "৭+ ঘণ্টার লাইভ ক্লাস",
    body: "গভীরভাবে ধারণা ও অনুমীলন, প্রতিটি ক্লাসে।",
    icon: "clock",
    tone: "brand",
  },
  {
    title: "রেকর্ডেড ক্লাস",
    body: "নিজের সুবিধামতো বারবার দেখার সুযোগ।",
    icon: "play",
    tone: "sky",
  },
  {
    title: "২০+ পূর্ণাঙ্গ মক টেস্ট",
    body: "নিজের প্রস্তুতি যাচাই করার সুযোগ।",
    icon: "exam",
    tone: "hot",
  },
  {
    title: "২৪/৭ প্রশ্ন সমাধান",
    body: "প্রশ্নে প্রশ্নে শেখা, কোনো সমস্যা নয়।",
    icon: "chat",
    tone: "mint",
  },
  {
    title: "অলিম্পিয়াডধর্মী গাণিতিক সমস্যার অনুশীলন",
    body: "সংখ্যাতত্ত্ব, জ্যামিতি, প্যাটার্ন, গণনাতত্ত্ব সহ আরও অনেক কিছু।",
    icon: "brain",
    tone: "violet",
  },
  {
    title: "যুক্তি ও বিশ্লেষণী দক্ষতা বৃদ্ধির চর্চা",
    body: "মুখস্থ নয়, চিন্তা করা আর সমাধান করা।",
    icon: "spark",
    tone: "amber",
  },
] as const;

export const faqFallback = [
  {
    question: "কোর্সটি কাদের জন্য?",
    answer:
      "যারা প্রাইমারি থেকে জুনিয়র লেভেল পর্যন্ত গণিত অলিম্পিয়াডে অংশ নিতে চায়, বা গণিতের ভিত্তি মজবুত করতে চায়, কোর্সটি তাদের জন্য।",
    category: "course" as const,
  },
  {
    question: "কোর্সে কী কী থাকছে?",
    answer:
      "৭+ ঘণ্টার লাইভ ক্লাস, রেকর্ডেড লেকচার, ২০+ পূর্ণাঙ্গ মক টেস্ট, ২৪/৭ প্রশ্ন সমাধানের গ্রুপ এবং অলিম্পিয়াডধর্মী সমস্যার নিয়মিত অনুশীলন।",
    category: "course" as const,
  },
  {
    question: "পেমেন্ট কীভাবে করব?",
    answer:
      "bKash পার্সোনাল নম্বর ০১৩৩১৩৬৬৮৬৫-এ ৯৯৯ টাকা সেন্ড মানি করো। Reference ঘরে লিখবে PRE_BOOK। টাকা পাঠানোর পর নিচের ফর্মে ট্রানজেকশন আইডি দিয়ে সাবমিট করো।",
    category: "payment" as const,
  },
  {
    question: "প্রি-বুক করলে কী সুবিধা?",
    answer:
      "প্রি-বুক করলে তুমি সিট কনফার্ম করবে এবং ক্লাস শুরুর সব আপডেট সবার আগে পাবে। সিট সীমিত।",
    category: "payment" as const,
  },
  {
    question: "মক টেস্ট কীভাবে হবে?",
    answer:
      "কোর্সের ভেতরে ২০+ পূর্ণাঙ্গ মক টেস্ট হবে। প্রতিটি টেস্টের আগে সিলেবাস ও সময়সূচি জানিয়ে দেওয়া হবে।",
    category: "mock_test" as const,
  },
  {
    question: "প্রশ্ন করলে কত দ্রুত উত্তর পাব?",
    answer:
      "আমাদের গ্রুপে মেন্টররা ২৪/৭ সক্রিয় থাকে। যেকোনো সময় প্রশ্ন করলে দ্রুত সমাধান পাবে।",
    category: "mock_test" as const,
  },
];
