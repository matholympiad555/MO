"use client";

import { Reveal } from "@/components/reveal";
import {
  Trophy,
  GraduationCap,
  CheckCircle,
  Users,
  ShieldCheck,
  ChatsCircle,
  User,
  ArrowRight,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

export function Teacher() {
  const { t, language } = useLanguage();

  const credentials = [
    {
      icon: <Trophy size={22} weight="fill" className="text-amber-500" />,
      title: t.cred1Title,
      description: t.cred1Desc,
      highlight: language === "bn" ? "BdMO মেডেলিস্ট ও ক্যাম্পার" : "BdMO Medalists & Campers",
    },
    {
      icon: <GraduationCap size={22} weight="fill" className="text-[#0072c6]" />,
      title: t.cred2Title,
      description: t.cred2Desc,
      highlight: language === "bn" ? "APMO ও IMO স্ট্যান্ডার্ড" : "APMO & IMO Standards",
    },
    {
      icon: <Users size={22} weight="fill" className="text-[#28a745]" />,
      title: t.cred3Title,
      description: t.cred3Desc,
      highlight: language === "bn" ? "৫০০+ মেন্টর্ড শিক্ষার্থী" : "500+ Mentored Students",
    },
    {
      icon: <ChatsCircle size={22} weight="fill" className="text-purple-600" />,
      title: t.cred4Title,
      description: t.cred4Desc,
      highlight: language === "bn" ? "সার্বক্ষণিক মেন্টর গাইড" : "Dedicated Mentor Support",
    },
  ];

  return (
    <section id="teacher" className="py-20 md:py-28 bg-[#F6F6F4] border-t border-slate-200/80">
      <div className="container-x">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0072c6]" />
              <span>{t.teacherTag}</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-shadhinata font-bold text-slate-900 tracking-tight leading-tight">
              {t.teacherTitle}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {t.teacherSubtitle}
            </p>
          </Reveal>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Lead Mentor Bio Card */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal className="h-full">
              <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
                {/* Background decorative math accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/60 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Avatar / Profile Frame */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-5">
                      <div className="size-32 sm:size-36 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 border-4 border-white shadow-md flex items-center justify-center text-[#0072c6] relative overflow-hidden">
                        <User size={80} weight="fill" className="text-[#0072c6]/30 translate-y-3" />
                        <div className="absolute inset-0 flex items-center justify-center font-shadhinata text-4xl font-bold text-[#0072c6]">
                          ∑
                        </div>
                      </div>
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0072c6] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm border border-white">
                        {language === "bn" ? "প্রধান ইন্সট্রাক্টর টিম" : "Lead Instructor Team"}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900">
                      {t.teacherLeadTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      {language === "bn" ? "বাংলাদেশ গণিত অলিম্পিয়াড (BdMO) পরিবার" : "Bangladesh Math Olympiad (BdMO) Network"}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
                      {t.teacherLeadBio}
                    </p>
                  </div>

                  {/* Highlights Pill List */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle size={18} weight="fill" className="text-[#28a745] shrink-0" />
                      <span>
                        {language === "bn" ? (
                          <><strong>জাতীয় ক্যাম্পার:</strong> বিডিএমও জাতীয় ক্যাম্প ও সিলেকশন অভিজ্ঞতা</>
                        ) : (
                          <><strong>National Campers:</strong> BdMO National Camp & Selection Pedigree</>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle size={18} weight="fill" className="text-[#0072c6] shrink-0" />
                      <span>
                        {language === "bn" ? (
                          <><strong>প্রাইমারি স্পেশালিস্ট:</strong> শিশুদের জন্য সহজবোধ্য গাণিতিক মেথড</>
                        ) : (
                          <><strong>Primary Specialists:</strong> Intuitive mathematical methods for young learners</>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle size={18} weight="fill" className="text-amber-500 shrink-0" />
                      <span>
                        {language === "bn" ? (
                          <><strong>সমস্যা সমাধান:</strong> সংখ্যাতত্ত্ব, জ্যামিতি ও কম্বিনেটরিক্স বিশেষজ্ঞ</>
                        ) : (
                          <><strong>Problem Solving:</strong> Masters in Number Theory, Geometry & Combinatorics</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={16} weight="fill" className="text-[#28a745]" />
                    <span className="font-semibold text-slate-700">
                      {language === "bn" ? "ভেরিফাইড মেন্টরশিপ" : "Verified Mentorship"}
                    </span>
                  </div>
                  <span className="text-[11px] bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md font-bold border border-amber-200">
                    {language === "bn" ? "ব্যাচ ২০২৬" : "Batch 2026"}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Credentials & Achievements Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {credentials.map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#0072c6]/40 hover:shadow-sm transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="size-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base sm:text-lg font-shadhinata font-bold text-slate-900 group-hover:text-[#0072c6] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                          {item.highlight}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Bottom Callout Banner */}
            <Reveal delay={450}>
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#005a9e] to-[#0072c6] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="font-shadhinata text-base font-bold text-white">
                    {language === "bn" ? "সরাসরি মেন্টরদের সাথে সংযুক্ত হতে প্রস্তুত?" : "Ready to connect directly with mentors?"}
                  </div>
                  <div className="text-xs text-blue-100">
                    {language === "bn"
                      ? "সীমিত সিটে প্রি-বুক করে তোমার লাইভ ক্লাসের প্রবেশাধিকার নিশ্চিত করো।"
                      : "Pre-book with limited seats to secure your access to live classes."}
                  </div>
                </div>
                <a
                  href="#prebook"
                  className="px-5 py-2.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white font-bold text-xs whitespace-nowrap shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === "bn" ? "প্রি-বুক করো" : "Pre-Book Now"}</span>
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
