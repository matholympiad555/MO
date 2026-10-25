"use client";

import { Reveal } from "@/components/reveal";
import { courseFeatures } from "@/lib/content";
import { Clock, PlayCircle, Exam, ChatsCircle, Brain, Lightbulb } from "@phosphor-icons/react";

export function Course() {
  const icons = [Clock, PlayCircle, Exam, ChatsCircle, Brain, Lightbulb];
  
  return (
    <section id="course" className="py-24 md:py-32 container-x text-paper">
      <Reveal>
        <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight mb-6">কোর্সে যা যা থাকছে</h2>
        <p className="text-muted text-lg max-w-2xl mb-16">প্রাথমিক গণিত অলিম্পিয়াড প্রস্তুতির জন্য সাজানো এই কোর্সের প্রতিটি মডিউল শিক্ষার্থীদের গাণিতিক দক্ষতা বৃদ্ধির লক্ষ্য নিয়ে তৈরি।</p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)] grid-flow-dense">
        {courseFeatures.map((feature, i) => {
          const Icon = icons[i % icons.length];
          const isWide = i === 0 || i === 5;
          return (
            <div key={i} className={`card-shell ${isWide ? 'md:col-span-7' : 'md:col-span-5'}`}>
              <div className="card-core p-8 flex flex-col h-full justify-between">
                <Icon size={32} weight="light" className="text-brand" />
                <div>
                  <h3 className="text-2xl font-display mb-3">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">{feature.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 overflow-hidden border-y border-ink-3 py-6">
        <div className="flex animate-marquee whitespace-nowrap text-brand-deep font-num text-xl uppercase tracking-widest gap-12">
          {["Geometry", "Combinatorics", "Number Theory", "Algebra", "Logic", "Math Olympiad"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
