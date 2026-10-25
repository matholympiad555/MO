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

export function Teacher() {
  const credentials = [
    {
      icon: <Trophy size={22} weight="fill" className="text-amber-500" />,
      title: "জাতীয় অলিম্পিয়াড অর্জন (National Olympiad Pedigree)",
      description:
        "বাংলাদেশ জাতীয় গণিত অলিম্পিয়াড (BdMO)-এর সাবেক পদকপ্রাপ্ত ও ন্যাশনাল ক্যাম্পারদের দ্বারা প্রণীত সিলেবাস ও কনসেপ্ট বিশ্লেষণ।",
      highlight: "BdMO মেডেলিস্ট ও ক্যাম্পার",
    },
    {
      icon: <GraduationCap size={22} weight="fill" className="text-[#0072c6]" />,
      title: "আন্তর্জাতিক অলিম্পিয়াড প্রশিক্ষণ ফ্রেমওয়ার্ক",
      description:
        "APMO এবং IMO স্ট্যান্ডার্ড লজিক্যাল থিংকিং ও প্রবলেম সলভিং টেকনিকের আলোকে প্রাইমারি শিক্ষার্থীদের জন্য উপযোগী করে সাজানো পাঠদান।",
      highlight: "APMO ও IMO স্ট্যান্ডার্ড",
    },
    {
      icon: <Users size={22} weight="fill" className="text-[#28a745]" />,
      title: "৪+ বছরের অলিম্পিয়াড মেন্টরশিপ অভিজ্ঞতা",
      description:
        "বিগত ৪ বছরে ৫০০+ শিক্ষার্থীকে সফলভাবে অলিম্পিয়াড ক্যাম্প ও রিজিওনাল রাউন্ডের জন্য প্রস্তুত করার পরীক্ষিত ট্র্যাক রেকর্ড।",
      highlight: "৫০০+ মেন্টর্ড শিক্ষার্থী",
    },
    {
      icon: <ChatsCircle size={22} weight="fill" className="text-purple-600" />,
      title: "২৪/৭ সরাসরি ডিসকাশন ও ডাউট সলভিং",
      description:
        "শুধু লাইভ ক্লাস নয়, ডেডিকেটেড ডিসকাশন পোর্টালে শিক্ষার্থীদের যেকোনো প্রশ্ন বা সমস্যা তাৎক্ষণিক সমাধানের জন্য সার্বক্ষণিক মেন্টর সাপোর্ট।",
      highlight: "সার্বক্ষণিক মেন্টর গাইড",
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
              <span>গাণিতিক যুক্তির পথপ্রদর্শক</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-shadhinata font-bold text-slate-900 tracking-tight leading-tight">
              ইন্সট্রাক্টর পরিচিতি ও মেন্টর প্যানেল
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              মুখস্থ নয়—চিন্তা করো, যুক্তি খোঁজো, সমাধান করো। বাংলাদেশ গণিত অলিম্পিয়াডের শীর্ষ ক্যাম্পার ও অভিজ্ঞ মেন্টরদের প্রত্যক্ষ তত্ত্বাবধানে গড়ে উঠবে তোমার সমস্যা সমাধানের দক্ষতা।
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
                        প্রধান ইন্সট্রাক্টর টিম
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900">
                      সাবেক জাতীয় ক্যাম্পার ও মেন্টরস
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      বাংলাদেশ গণিত অলিম্পিয়াড (BdMO) পরিবার
                    </p>
                  </div>

                  {/* Highlights Pill List */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle size={18} weight="fill" className="text-[#28a745] shrink-0" />
                      <span><strong>জাতীয় ক্যাম্পার:</strong> বিডিএমও জাতীয় ক্যাম্প ও সিলেকশন অভিজ্ঞতা</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle size={18} weight="fill" className="text-[#0072c6] shrink-0" />
                      <span><strong>প্রাইমারি স্পেশালিস্ট:</strong> শিশুদের জন্য সহজবোধ্য গাণিতিক মেথড</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle size={18} weight="fill" className="text-amber-500 shrink-0" />
                      <span><strong>সমস্যা সমাধান:</strong> সংখ্যাতত্ত্ব, জ্যামিতি ও কম্বিনেটরিক্স বিশেষজ্ঞ</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={16} weight="fill" className="text-[#28a745]" />
                    <span className="font-semibold text-slate-700">ভেরিফাইড মেন্টরশিপ</span>
                  </div>
                  <span className="text-[11px] bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md font-bold border border-amber-200">
                    ব্যাচ ২০২৬
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
                    সরাসরি মেন্টরদের সাথে সংযুক্ত হতে প্রস্তুত?
                  </div>
                  <div className="text-xs text-blue-100">
                    সীমিত সিটে প্রি-বুক করে তোমার লাইভ ক্লাসের প্রবেশাধিকার নিশ্চিত করো।
                  </div>
                </div>
                <a
                  href="#prebook"
                  className="px-5 py-2.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white font-bold text-xs whitespace-nowrap shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>প্রি-বুক করো</span>
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
