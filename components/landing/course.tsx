"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  VideoCamera,
  PlayCircle,
  FileText,
  ChatsCircle,
  Calculator,
  Compass,
  ChartLineUp,
  PuzzlePiece,
  CheckCircle,
  Sparkle,
  ArrowRight,
  BookOpen,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

export function Course() {
  const { t, language } = useLanguage();

  // Live class & core delivery highlights (Requirement 3)
  const deliveryFeatures = [
    {
      title: t.includeLive,
      description:
        language === "bn"
          ? "মেন্টরের সাথে সরাসরি ইন্টারঅ্যাকশন, কনসেপ্ট ক্লিয়ারিং ও লাইভ প্রবলেম সলভিং।"
          : "Direct interactive mentor sessions, concept clarity, and live problem solving.",
      badge: language === "bn" ? "ইন্টারঅ্যাক্টিভ" : "Interactive",
      icon: VideoCamera,
    },
    {
      title: t.includeRecorded,
      description:
        language === "bn"
          ? "প্রতিটি ক্লাসের ফুল এইচডি রেকর্ডিং, সুবিধাজনক সময়ে বারবার দেখার সুযোগ।"
          : "Full HD recordings of every class with lifetime access to rewatch anytime.",
      badge: language === "bn" ? "লাইফটাইম অ্যাক্সেস" : "Lifetime Access",
      icon: PlayCircle,
    },
    {
      title: t.includePractice,
      description:
        language === "bn"
          ? "প্রতিটি বিষয়ের ওপর কিউরেটেড অলিম্পিয়াড স্ট্যান্ডার্ড প্রশ্ন সংকলন ও হ্যান্ডআউট।"
          : "Curated Olympiad-standard problem sets and practice handouts for each topic.",
      badge: language === "bn" ? "এক্সক্লুসিভ ম্যাটেরিয়াল" : "Exclusive Material",
      icon: FileText,
    },
    {
      title: t.includeDoubt,
      description:
        language === "bn"
          ? "হোমওয়ার্ক, কুইজ ও জটিল সমস্যার পুঙ্খানুপুঙ্খ সমাধান এবং অলিম্পিয়াড ট্রিকস।"
          : "Comprehensive doubt resolution for homework, quizzes, and tricky Olympiad puzzles.",
      badge: language === "bn" ? "ডাউট সলভিং" : "Doubt Solving",
      icon: ChatsCircle,
    },
  ];

  // 4 Olympiad Pillars & Modules from poster (Requirement 2)
  const pillars = [
    {
      id: "pillar-nt",
      pillarNo: language === "bn" ? "স্তম্ভ ০১" : "Pillar 01",
      pillarTag: "NUMBER THEORY",
      title: t.mod1Title,
      subtitle: language === "bn" ? "মৌলিক সংখ্যা, ভাজক ও বিভাজ্যতা" : "Primes, Divisors & Divisibility",
      intro: t.mod1Desc,
      icon: Calculator,
      topics: [
        {
          name: language === "bn" ? "মৌলিক সংখ্যা ও উৎপাদক বিশ্লেষণ" : "Prime Numbers & Factors",
          en: "Prime Numbers & Factors",
        },
        {
          name: language === "bn" ? "ভাজক সংখ্যা ও বিভাজ্যতার নিয়ম" : "Divisors & Divisibility Rules",
          en: "Divisors & Divisibility Rules",
        },
        {
          name: language === "bn" ? "লসাগু ও গসাগু এর ব্যবহারিক প্রয়োগ" : "LCM & GCD Applications",
          en: "LCM & GCD Applications",
        },
        {
          name: language === "bn" ? "মডুলার অ্যারিথমেটিক ও ভাগশেষ নীতি" : "Modular Arithmetic & Remainders",
          en: "Modular Arithmetic & Remainders",
        },
      ],
      tagline:
        language === "bn"
          ? "অলিম্পিয়াড স্পেশাল: ভাগশেষ ও প্যাটার্ন বিশ্লেষণ"
          : "Olympiad Special: Remainder & Pattern Analysis",
    },
    {
      id: "pillar-geo",
      pillarNo: language === "bn" ? "স্তম্ভ ০২" : "Pillar 02",
      pillarTag: "GEOMETRY",
      title: t.mod2Title,
      subtitle: language === "bn" ? "ত্রিভুজ, বৃত্ত, কোণ ও উপপাদ্য" : "Triangles, Circles, Angles & Theorems",
      intro: t.mod2Desc,
      icon: Compass,
      topics: [
        {
          name: language === "bn" ? "ত্রিভুজ ও চতুর্ভুজের বৈশিষ্ট্য" : "Triangles & Polygons",
          en: "Triangles & Polygons",
        },
        {
          name: language === "bn" ? "বৃত্ত ও স্পর্শক সংক্রান্ত প্রাথমিক ধারণা" : "Circles & Tangents",
          en: "Circles & Tangents",
        },
        {
          name: language === "bn" ? "ক্ষেত্রফল ও কোণ গণনা পদ্ধতি" : "Area & Angle Calculations",
          en: "Area & Angle Calculations",
        },
        {
          name: language === "bn" ? "পিথাগোরাস উপপাদ্য ও এর বাস্তব প্রয়োগ" : "Pythagorean Theorem & Proofs",
          en: "Pythagorean Theorem & Proofs",
        },
      ],
      tagline:
        language === "bn"
          ? "অলিম্পিয়াড স্পেশাল: চিত্রভিত্তিক যৌক্তিক প্রমাণ"
          : "Olympiad Special: Visual & Deductive Proofs",
    },
    {
      id: "pillar-alg",
      pillarNo: language === "bn" ? "স্তম্ভ ০৩" : "Pillar 03",
      pillarTag: "ALGEBRA & SEQUENCES",
      title: t.mod3Title,
      subtitle: language === "bn" ? "ধারা, ক্রমান্বয় ও গাণিতিক আরোহ" : "Sequences, Series & Induction",
      intro: t.mod3Desc,
      icon: ChartLineUp,
      topics: [
        {
          name: language === "bn" ? "ধারা ও সংখ্যা প্যাটার্ন বিশ্লেষণ" : "Arithmetic & Geometric Sequences",
          en: "Arithmetic & Geometric Sequences",
        },
        {
          name: language === "bn" ? "ক্রমান্বয় ও যুক্তিভিত্তিক সম্পর্ক" : "Logical Ordering & Series",
          en: "Logical Ordering & Series",
        },
        {
          name: language === "bn" ? "সমীকরণ গঠন ও অজানা রাশির মান" : "Equations & Variables",
          en: "Equations & Variables",
        },
        {
          name: language === "bn" ? "গাণিতিক আরোহ ও যুক্তিধারা" : "Mathematical Induction Basics",
          en: "Mathematical Induction Basics",
        },
      ],
      tagline:
        language === "bn"
          ? "অলিম্পিয়াড স্পেশাল: প্যাটার্ন দেখে সাধারণ সূত্র নির্ণয়"
          : "Olympiad Special: Discovering Patterns & General Formulas",
    },
    {
      id: "pillar-comb",
      pillarNo: language === "bn" ? "স্তম্ভ ০৪" : "Pillar 04",
      pillarTag: "COMBINATORICS & LOGIC",
      title: t.mod4Title,
      subtitle: language === "bn" ? "বিন্যাস, পায়রার খোপ নীতি ও পাজল" : "Permutations, PHP & Puzzles",
      intro: t.mod4Desc,
      icon: PuzzlePiece,
      topics: [
        {
          name: language === "bn" ? "বিন্যাস ও সমাবেশ—সুশৃঙ্খল গণনা" : "Permutations, Combinations & Counting",
          en: "Permutations, Combinations & Counting",
        },
        {
          name: language === "bn" ? "পায়রার খোপ নীতি (Pigeonhole Principle)" : "PHP & Advanced Counting",
          en: "PHP & Advanced Counting",
        },
        {
          name: language === "bn" ? "গ্রিড ও পথ গণনার আধুনিক নিয়ম" : "Grid Paths & Logical Reasoning",
          en: "Grid Paths & Logical Reasoning",
        },
        {
          name: language === "bn" ? "অলিম্পিয়াড পাজল ও বিশ্লেষণধর্মী ধাঁধা" : "Olympiad Brain Teasers",
          en: "Olympiad Brain Teasers",
        },
      ],
      tagline:
        language === "bn"
          ? "অলিম্পিয়াড স্পেশাল: পায়রার খোপ নীতি ও লজিক পাজল"
          : "Olympiad Special: Pigeonhole Principle & Logic Puzzles",
    },
  ];

  return (
    <section id="course" className="py-16 md:py-24 container-x">
      {/* Section Header */}
      <Reveal>
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-[#0072c6] text-xs font-bold tracking-wide uppercase">
            <Sparkle size={14} weight="fill" className="text-[#0072c6]" />
            <span className="font-shadhinata">{t.courseTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-shadhinata font-bold text-slate-900 leading-tight">
            {t.courseTitle}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.courseSubtitle}
          </p>
        </div>
      </Reveal>

      {/* Feature Delivery Highlights (Live Class, Recorded Lectures, Practice Sheets, Solution Classes) */}
      <Reveal delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {deliveryFeatures.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0072c6] group-hover:bg-[#0072c6] group-hover:text-white transition-all shadow-xs">
                      <Icon size={24} weight="bold" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-shadhinata">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-shadhinata font-bold text-lg text-slate-900 mb-1.5 group-hover:text-[#0072c6] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#0072c6] font-semibold">
                  <CheckCircle size={14} weight="fill" className="text-[#0072c6]" />
                  <span>{language === "bn" ? "কোর্সের অন্তর্ভুক্ত" : "Included in Course"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Section Divider & Subheading */}
      <Reveal delay={150}>
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-[#0072c6] uppercase tracking-wider block font-num">
              SYLLABUS & MODULES
            </span>
            <h3 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900">
              {language === "bn" ? "পোস্টার কারিকুলাম: ৪টি অলিম্পিয়াড পিলার" : "Curriculum: 4 Olympiad Pillars"}
            </h3>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded border border-slate-200">
            <BookOpen size={14} weight="bold" className="text-[#0072c6]" />
            <span>{language === "bn" ? "প্রাইমারি ও জুনিয়র অলিম্পিয়াড স্ট্যান্ডার্ড" : "Primary & Junior Olympiad Standard"}</span>
          </span>
        </div>
      </Reveal>

      {/* The 4 Olympiad Pillars Grid (GonitZoggo Clean Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {pillars.map((pillar, idx) => {
          const PillarIcon = pillar.icon;
          return (
            <Reveal key={pillar.id} delay={150 + idx * 50}>
              <div className="bg-white border border-slate-200 rounded-lg shadow-xs hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-blue-300">
                <div>
                  {/* Top Header of Pillar Card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0072c6] group-hover:scale-105 group-hover:bg-[#0072c6] group-hover:text-white transition-all shadow-xs shrink-0">
                        <PillarIcon size={26} weight="bold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 border border-blue-200 text-[#0072c6] font-shadhinata">
                            {pillar.pillarNo}
                          </span>
                          <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
                            {pillar.pillarTag}
                          </span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900 mt-1 group-hover:text-[#0072c6] transition-colors">
                          {pillar.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Intro description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {pillar.intro}
                  </p>

                  {/* Topics List with Clean GonitZoggo Badges */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {language === "bn" ? "সিলেবাস ও মূল টপিকসমূহ:" : "Syllabus & Core Topics:"}
                    </div>
                    {pillar.topics.map((topic, tidx) => (
                      <div
                        key={tidx}
                        className="p-2.5 rounded-md bg-[#F6F6F4] border border-slate-200/80 flex items-center justify-between gap-2 text-sm text-slate-800 hover:bg-blue-50/50 hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle
                            size={16}
                            weight="fill"
                            className="text-[#0072c6] shrink-0"
                          />
                          <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                            {topic.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block">
                          {topic.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 font-shadhinata">
                    {pillar.tagline}
                  </span>
                  <span className="text-xs font-bold text-[#0072c6] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>{language === "bn" ? "মডিউল বিস্তারিত" : "Module Details"}</span>
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* GonitZoggo Style Bottom Callout Card */}
      <Reveal delay={350}>
        <div className="mt-12 bg-white border border-slate-200 rounded-lg shadow-xs hover:shadow-md transition-all p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#0072c6] text-xs font-bold font-shadhinata">
              <span>{language === "bn" ? "প্রি-বুকিং অফার — সীমিত সিট" : "Pre-Booking Offer — Limited Seats"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-shadhinata font-bold text-slate-900">
              {language === "bn"
                ? "প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতিতে এখনই শুরু করো"
                : "Start Your Primary Math Olympiad Prep Today"}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              {language === "bn"
                ? "৭+ ঘণ্টা লাইভ ক্লাস, রেকর্ডেড লেকচার, ২০+ পূর্ণাঙ্গ মক টেস্ট, প্র্যাকটিস শিট ও সমাধান ক্লাস—সবকিছু পাচ্ছো মাত্র ১৯৯ টাকায়।"
                : "7+ hours live classes, recorded lectures, 20+ full mock tests, practice sheets, and solution sessions—all for only 199 BDT."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="#prebook"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#0072c6] hover:bg-[#005a9e] active:bg-[#004e8a] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span className="font-shadhinata text-base">
                {language === "bn" ? "এখনই প্রি-বুক করো (১৯৯৳)" : "Pre-Book Now (199 BDT)"}
              </span>
              <ArrowRight size={16} weight="bold" />
            </a>
            <Link
              href="/mock-tests"
              className="w-full sm:w-auto px-5 py-3 rounded-md bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <span className="font-shadhinata text-base">
                {language === "bn" ? "ফ্রি মক টেস্ট দিন" : "Take Free Mock Test"}
              </span>
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Subtle Marquee Strip */}
      <div className="mt-14 overflow-hidden border-y border-slate-200 py-4 bg-white rounded-lg shadow-2xs">
        <div className="flex animate-marquee whitespace-nowrap text-[#0072c6] text-xs sm:text-sm font-bold uppercase tracking-wider gap-10 opacity-90">
          {(language === "bn"
            ? [
                "সংখ্যাতত্ত্ব (Number Theory)",
                "জ্যামিতি (Geometry)",
                "বীজগণিত ও প্যাটার্ন (Algebra & Sequences)",
                "কম্বিনেটোরিক্স ও লজিক (Combinatorics & Logic)",
                "৭+ ঘণ্টা লাইভ ক্লাস",
                "রেকর্ডেড লেকচার",
                "প্র্যাকটিস শিট",
                "সমাধান ক্লাস",
                "Math Olympiad 2026",
              ]
            : [
                "Number Theory",
                "Geometry",
                "Algebra & Sequences",
                "Combinatorics & Logic",
                "7+ Hours Live Classes",
                "Recorded Lectures",
                "Practice Sheets",
                "Solution Sessions",
                "Math Olympiad 2026",
              ]
          ).map((tag, i) => (
            <span key={i} className="flex items-center gap-6">
              <span className="font-shadhinata">{tag}</span>
              <span className="text-amber-500 font-black">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
