"use client";

import { Reveal } from "@/components/reveal";

export function Teacher() {
  return (
    <section id="teacher" className="py-24 md:py-32 container-x text-paper">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-display font-medium">আমাদের শিক্ষক</h2>
            <div className="text-muted space-y-4">
              <p>শিক্ষার্থীদের গাণিতিক চিন্তাধারা বিকাশে দীর্ঘদিনের অভিজ্ঞতা সম্পন্ন মেন্টরগণ এই কোর্সে পাঠদান করবেন।</p>
              <p>গণিত অলিম্পিয়াডের জটিল সমস্যাগুলো সহজে সমাধানের কৌশলে আমরা গুরুত্ব দিয়ে থাকি।</p>
            </div>
          </Reveal>
          
          <div className="space-y-4 pt-8">
            {["গণিত অলিম্পিয়াড কোচ", "১০+ বছরের শিক্ষকতা অভিজ্ঞতা", "জাতীয় পুরস্কারপ্রাপ্ত"].map((q, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-ink-3">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="font-body text-paper">{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-shell p-1">
          <div className="card-core aspect-square flex items-center justify-center relative">
            <span className="text-8xl text-ink-3 font-num">?</span>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-ink-2/50 backdrop-blur border border-white/5 rounded-xl">
              <div className="flex justify-between text-sm uppercase tracking-widest text-muted">
                <span>প্রশিক্ষক প্রোফাইল</span>
                <span className="text-hot">শীঘ্রই আসছে</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
