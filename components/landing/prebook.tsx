"use client";

import { BookingForm } from "./booking-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";
import { DeviceMobile, ShieldCheck } from "@phosphor-icons/react";

export function Prebook() {
  const paymentSteps = [
    {
      num: "১",
      title: "Send Money করুন",
      desc: "তোমার bKash অ্যাপ অথবা *247# ডায়াল করে 'Send Money' অপশনে যান।",
    },
    {
      num: "২",
      title: "নম্বর লিখুন",
      desc: "পার্সোনাল bKash নম্বর +8801331366865 লিখুন।",
    },
    {
      num: "৩",
      title: "১৯৯ টাকা ও Reference",
      desc: "টাকার পরিমাণ ১৯৯ লিখুন এবং Reference ঘরে লিখুন PRE_BOOK।",
    },
    {
      num: "৪",
      title: "TrxID সংগ্রহ ও ফর্ম পূরণ",
      desc: "পেমেন্ট সফল হলে আসা Transaction ID কপি করে ডানপাশের ফর্মে দিয়ে সাবমিট করুন।",
    },
  ];

  return (
    <section id="prebook" className="py-24 bg-ink relative">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-8">
          <Reveal>
            <div className="space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-hot/15 text-hot border border-hot/30 text-xs font-bold inline-block">
                ⚡ প্রি-বুকিং চলছে!
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-paper leading-tight">
                নিজের আসন নিশ্চিত করতে এখনই প্রি-বুকিং করো!
              </h2>
              <p className="text-muted text-base leading-relaxed">
                ভবিষ্যৎ গণিতবিদদের জন্য বিশেষায়িত অনলাইন কোর্স। মাত্র ১৯৯ টাকায় প্রি-বুক করে তোমার অলিম্পিয়াড যাত্রা শুরু করো।
              </p>
            </div>
          </Reveal>

          {/* Pricing Highlight */}
          <div className="bg-ink-2 p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block">কোর্স ফি মাত্র</span>
                <span className="text-brand font-num font-black text-4xl">১৯৯৳</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted block">Reference Code</span>
                <span className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-lg text-brand font-mono font-bold text-xs uppercase tracking-wider inline-block">
                  {site.reference}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs text-muted">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>বিকাশ Personal নম্বর: <strong className="text-paper font-mono">{site.bkashDisplay}</strong></span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="text-paper font-display font-bold text-base flex items-center gap-2">
              <DeviceMobile size={18} className="text-brand" />
              <span>সহজ ৪ ধাপে bKash পেমেন্ট করুন</span>
            </h4>
            <div className="space-y-3">
              {paymentSteps.map((step) => (
                <div key={step.num} className="flex gap-3.5 items-start bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <div className="size-7 rounded-full bg-brand text-ink font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="text-paper font-bold">{step.title}</p>
                    <p className="text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
