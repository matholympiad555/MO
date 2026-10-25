"use client";

import { Reveal } from "@/components/reveal";
import { courseFeatures } from "@/lib/content";
import { Clock, PlayCircle, Exam, ChatsCircle, Brain, Lightbulb } from "@phosphor-icons/react";

export function Course() {
  const icons = [Clock, PlayCircle, Exam, ChatsCircle, Brain, Lightbulb];
  
  return (
    <section id="course" className="py-20 md:py-28 container-x">
      <Reveal>
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span>কোর্স কারিকুলাম ও সুবিধাসমূহ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            কোর্সে যা যা থাকছে
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            প্রাথমিক গণিত অলিম্পিয়াড প্রস্তুতির জন্য সাজানো এই কোর্সের প্রতিটি মডিউল শিক্ষার্থীদের যৌক্তিক চিন্তন ও সমস্যা সমাধানের দক্ষতা বৃদ্ধির লক্ষ্য নিয়ে তৈরি।
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {courseFeatures.map((feature, i) => {
          const Icon = icons[i % icons.length];
          const isWide = i === 0 || i === 5;
          return (
            <div
              key={i}
              className={`card-shell p-7 flex flex-col justify-between border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all group ${
                isWide ? "md:col-span-7" : "md:col-span-5"
              }`}
            >
              <div className="size-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-6 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <Icon size={26} weight="bold" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 overflow-hidden border-y border-slate-200 py-5 bg-white">
        <div className="flex animate-marquee whitespace-nowrap text-blue-800 font-num text-sm sm:text-base font-bold uppercase tracking-widest gap-12 opacity-80">
          {["Geometry", "Combinatorics", "Number Theory", "Algebra", "Logic Puzzles", "Math Olympiad 2026"].map((tag) => (
            <span key={tag} className="flex items-center gap-6">
              <span>{tag}</span>
              <span className="text-amber-500 font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
