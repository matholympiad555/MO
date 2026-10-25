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
    <section id="prebook" className="py-20 md:py-28 bg-slate-100/70 border-y border-slate-200/80">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-7">
          <Reveal>
            <div className="space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold inline-block">
                ⚡ প্রি-বুকিং চলছে!
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
                নিজের আসন নিশ্চিত করতে এখনই প্রি-বুকিং করো!
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                ভবিষ্যৎ গণিতবিদদের জন্য বিশেষায়িত অনলাইন কোর্স। মাত্র ১৯৯ টাকায় প্রি-বুক করে তোমার অলিম্পিয়াড প্রস্তুতি নিশ্চিত করো।
              </p>
            </div>
          </Reveal>

          {/* Pricing Highlight Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">কোর্স ফি মাত্র</span>
                <span className="text-blue-700 font-num font-black text-4xl">১৯৯৳</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Reference Code</span>
                <span className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-mono font-bold text-xs uppercase tracking-wider inline-block">
                  {site.reference}
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" weight="fill" />
              <span>বিকাশ Personal নম্বর: <strong className="text-slate-900 font-mono">{site.bkashDisplay}</strong></span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3.5">
            <h4 className="text-slate-900 font-display font-bold text-sm sm:text-base flex items-center gap-2">
              <DeviceMobile size={18} className="text-blue-700" weight="bold" />
              <span>সহজ ৪ ধাপে bKash পেমেন্ট নির্দেশিকা</span>
            </h4>
            <div className="space-y-2.5">
              {paymentSteps.map((step) => (
                <div key={step.num} className="flex gap-3.5 items-start bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="size-7 rounded-full bg-blue-700 text-white font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="text-slate-900 font-bold">{step.title}</p>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
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
