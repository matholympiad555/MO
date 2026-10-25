"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";
import { ArrowRight, Exam, ChatsCircle } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="container-x min-h-[100dvh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
              <span className="text-brand text-xs sm:text-sm font-semibold tracking-wider uppercase">
                {site.tagline} • প্রি-বুকিং চলছে!
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-paper leading-[1.12] mb-6 tracking-tight">
              প্রাইমারি গণিত অলিম্পিয়াড <br />
              <span className="relative inline-block text-brand mt-1">
                প্রস্তুতি কোর্স ২০২৬
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base sm:text-xl text-paper/90 mb-4 max-w-xl font-body leading-relaxed font-semibold">
              গণিতকে ভয় নয়, যুক্তি দিয়ে গণিতকে জয় করো!
            </p>
            <p className="text-sm sm:text-base text-muted mb-8 max-w-xl font-body leading-relaxed">
              ৭+ ঘণ্টার ক্লাস, রেকর্ডেড লেকচার, পূর্ণাঙ্গ মক টেস্ট এবং ২৪/৭ প্রশ্ন সমাধান সুবিধা নিয়ে সাজানো পূর্ণাঙ্গ অলিম্পিয়াড প্রস্তুতি।
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#prebook"
                className="px-8 py-3.5 bg-brand text-ink rounded-full font-display font-bold text-base hover:bg-brand-deep transition-transform active:scale-[0.98] shadow-xl shadow-brand/20"
              >
                প্রি-বুক করো (১৯৯৳)
              </a>
              <Link
                href="/mock-tests"
                className="px-6 py-3.5 bg-white/10 text-paper rounded-full font-body font-semibold text-sm hover:bg-white/15 transition-transform active:scale-[0.98] flex items-center gap-2 border border-white/10"
              >
                <Exam size={18} className="text-brand" />
                মক টেস্ট দিন
              </Link>
              <Link
                href="/qa"
                className="px-6 py-3.5 bg-white/5 text-paper/80 rounded-full font-body font-semibold text-sm hover:bg-white/10 transition-transform active:scale-[0.98] flex items-center gap-2 border border-white/5"
              >
                <ChatsCircle size={18} className="text-sky" />
                প্রশ্নোত্তর (Q&A)
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <div className="card-shell p-1.5 relative shadow-2xl">
            <div className="card-core p-8 bg-ink-2 rounded-[calc(1.75rem-4px)] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted font-mono font-bold">কোর্স ফি মাত্র</span>
                <span className="px-3 py-1 rounded-full bg-hot/20 text-hot border border-hot/30 text-xs font-bold animate-pulse">
                  প্রি-বুক অফার!
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-num text-brand font-black tracking-tight">
                ১৯৯৳
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-muted">
                <div className="flex items-center justify-between">
                  <span>bKash Personal:</span>
                  <span className="font-mono text-paper font-bold text-sm">+880 1331 366865</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment Ref:</span>
                  <span className="font-mono text-brand font-bold bg-brand/10 px-2 py-0.5 rounded border border-brand/20">PRE_BOOK</span>
                </div>
              </div>

              <a
                href="#prebook"
                className="block text-center w-full py-3.5 rounded-full bg-brand text-ink font-display font-bold text-sm hover:bg-brand-deep transition-all shadow-lg shadow-brand/20"
              >
                এখনই আসন নিশ্চিত করো →
              </a>
            </div>

            <div className="absolute -top-3 -right-3 w-12 h-12 bg-sky rounded-2xl flex items-center justify-center text-ink font-num font-bold text-lg shadow-xl shadow-sky/30">π</div>
            <div className="absolute -bottom-3 -left-3 w-14 h-14 bg-hot rounded-2xl flex items-center justify-center text-paper font-num font-bold text-xl shadow-xl shadow-hot/30">∑</div>
          </div>
        </div>
      </div>
    </section>
  );
}
