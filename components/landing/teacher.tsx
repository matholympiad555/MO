"use client";

import { Reveal } from "@/components/reveal";
import { User, GraduationCap, Trophy, CheckCircle } from "@phosphor-icons/react";

export function Teacher() {
  const teacherPoints = [
    { label: "শিক্ষকের নাম", value: "শীঘ্রই উন্মোচন করা হবে" },
    { label: "পরিচিতি ও অভিজ্ঞতা", value: "অভিজ্ঞ গণিত অলিম্পিয়াড প্রশিক্ষক ও মেন্টর" },
    { label: "অর্জন ও যোগ্যতা", value: "জাতীয় গণিত অলিম্পিয়াড প্রশিক্ষণ অভিজ্ঞতা" },
  ];

  return (
    <section id="teacher" className="py-20 md:py-28 container-x">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <Reveal>
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold inline-block">
                প্রশিক্ষক পরিচিতি
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
                আমাদের শিক্ষক
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                একজন অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকের কাছ থেকে শেখার সুযোগ! মুখস্থ নয়—চিন্তা করো, যুক্তি খোঁজো, সমাধান করো।
              </p>
            </div>
          </Reveal>
          
          <div className="space-y-4 pt-2">
            {teacherPoints.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="size-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <CheckCircle size={20} weight="fill" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Silhouette Card */}
        <div className="md:col-span-5">
          <div className="card-shell p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
            <div className="size-40 rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center text-blue-300 relative shadow-inner">
              <User size={84} weight="fill" className="text-blue-200" />
              <div className="absolute inset-0 flex items-center justify-center font-display font-black text-6xl text-blue-600">
                ?
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold font-display text-slate-900">
                শীর্ষস্থানীয় অলিম্পিয়াড মেন্টর
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                শিক্ষার্থীদের গাণিতিক ভিত্তি মজবুত করতে স্পেশাল ক্লাসে সরাসরি যুক্ত থাকবেন।
              </p>
            </div>

            <div className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              📢 প্রথম ক্লাসেই সম্পূর্ণ পরিচিতি উন্মোচন!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
