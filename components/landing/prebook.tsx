"use client";

import { useState } from "react";
import { BookingForm } from "./booking-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";
import {
  DeviceMobile,
  ShieldCheck,
  Copy,
  Check,
  Info,
  X,
  CreditCard,
  Sparkle,
  ArrowRight,
  PhoneCall,
  Clock,
} from "@phosphor-icons/react";

export function Prebook() {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const bkashRaw = "01331366865";
  const bkashInternational = "+8801331366865";
  const refCode = "PRE_BOOK";

  const handleCopyNumber = (numToCopy: string) => {
    navigator.clipboard.writeText(numToCopy);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const paymentSteps = [
    {
      num: "১",
      title: "Send Money অপশনে যান",
      desc: "তোমার bKash অ্যাপ ওপেন করো অথবা *247# ডায়াল করে 'Send Money' (সেন্ড মানি) অপশন নির্বাচন করো।",
    },
    {
      num: "২",
      title: "পার্সোনাল নম্বর প্রবেশ করান",
      desc: (
        <span>
          প্রাপক নম্বরে <strong className="font-mono text-slate-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">01331366865</strong> লিখুন।
        </span>
      ),
    },
    {
      num: "৩",
      title: "১৯৯৳ ও Reference লিখুন",
      desc: (
        <span>
          টাকার পরিমাণ <strong className="text-emerald-700 font-bold font-mono">১৯৯</strong> লিখুন এবং Reference ঘরে লিখুন{" "}
          <strong className="font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">PRE_BOOK</strong>।
        </span>
      ),
    },
    {
      num: "৪",
      title: "TrxID সংগ্রহ করে ফর্ম পূরণ করুন",
      desc: "পেমেন্ট সফল হলে bKash কনফার্মেশন এসএমএস থেকে Transaction ID (TrxID) কপি করে পাশের ফর্মে দিয়ে প্রি-বুক সম্পন্ন করুন।",
    },
  ];

  return (
    <section id="prebook" className="py-16 md:py-24 bg-[#F6F6F4] border-y border-slate-200/90 relative">
      <div className="container-x">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkle size={14} weight="fill" className="text-emerald-600" />
              <span className="font-shadhinata font-bold">৮০% স্পেশাল ডিসকাউন্ট</span>
              <span className="text-emerald-300">•</span>
              <span>আসন সংখ্যা সীমিত</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-shadhinata font-bold text-slate-900 leading-[1.25]">
              প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              যুক্তির শক্তিতে চিন্তা করতে শেখার সেরা সুযোগ। মাত্র <span className="font-bold text-slate-900">১৯৯ টাকায়</span> প্রি-বুক করে নিশ্চিত করো তোমার সিট এবং আজই শুরু করো লাইভ মক টেস্ট প্রস্তুতি।
            </p>
          </Reveal>
        </div>

        {/* Main Grid: Left info & payment instructions + Right Booking form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Course fee breakdown & Payment guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pricing Card - GonitZoggo Signature Style */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                    কোর্স প্রি-বুকিং ফি
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-shadhinata font-black text-4xl sm:text-5xl text-[#0072c6]">
                      ১৯৯৳
                    </span>
                    <span className="text-slate-400 line-through text-base sm:text-lg font-mono">
                      ১,০০০৳
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 font-shadhinata text-xs sm:text-sm font-bold shadow-xs">
                    ৮০% ছাড়
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1 font-medium">
                    ৮০১৳ সাশ্রয়
                  </span>
                </div>
              </div>

              {/* Payment Details Box with Quick Copy */}
              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold text-slate-700">
                    <CreditCard size={16} className="text-[#0072c6]" weight="bold" />
                    bKash Send Money নম্বর:
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Personal
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-xs">
                  <div>
                    <span className="font-mono text-base sm:text-lg font-bold text-slate-900 tracking-wider block">
                      {bkashInternational}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      (অথবা: {bkashRaw})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyNumber(bkashRaw)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all bg-[#0072c6] hover:bg-[#005a9e] text-white active:scale-95 shadow-xs shrink-0"
                    title="নম্বর কপি করুন"
                  >
                    {copiedNumber ? (
                      <>
                        <Check size={14} weight="bold" className="text-white" />
                        <span>কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} weight="bold" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Reference Code Row */}
                <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 block">রেফারেন্স কোড (Reference):</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-slate-900">
                      {refCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 border border-slate-200 shrink-0"
                    title="রেফারেন্স কপি করুন"
                  >
                    {copiedRef ? (
                      <>
                        <Check size={14} weight="bold" className="text-emerald-600" />
                        <span className="text-emerald-700">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} weight="bold" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-1 flex flex-col gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#28a745] shrink-0" weight="fill" />
                  <span>নিরাপদ বিকাশ ট্রানজেকশন ভেরিফিকেশন সিস্টেম</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-[#0072c6] shrink-0" weight="fill" />
                  <span>আবেদনের পর ২-২৪ ঘণ্টার মধ্যে কনফার্মেশন ও সিট সক্রিয়</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Payment Instructions Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-shadhinata font-bold text-slate-900 text-base flex items-center gap-2">
                  <DeviceMobile size={20} className="text-[#0072c6]" weight="bold" />
                  <span>সহজ ৪ ধাপে bKash পেমেন্ট নির্দেশিকা</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-xs text-[#0072c6] hover:text-[#005a9e] font-bold flex items-center gap-1 underline underline-offset-2"
                >
                  <Info size={14} weight="bold" />
                  <span>বিস্তারিত গাইড</span>
                </button>
              </div>

              <div className="space-y-3">
                {paymentSteps.map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-3 items-start p-3 rounded-xl bg-[#F8F9FA] border border-slate-200/80 hover:border-blue-200 transition-colors"
                  >
                    <div className="size-6 rounded-full bg-[#0072c6] text-white font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-shadhinata font-bold text-slate-900 text-sm">{step.title}</p>
                      <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Detailed Payment Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0072c6] text-xs font-bold border border-blue-200">
                <CreditCard size={14} weight="bold" />
                <span>bKash পেমেন্ট নির্দেশিকা</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900">
                কীভাবে বিকাশ দিয়ে ১৯৯৳ সেন্ড মানি করবেন?
              </h3>
              <p className="text-xs text-slate-600">
                নিচের নিয়মাবলী অনুসরণ করে পেমেন্ট সম্পন্ন করুন এবং প্রাপ্ত TrxID ফর্মটিতে প্রদান করুন।
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-shadhinata text-sm">
                  ধাপ ১: বিকাশ অ্যাপ অথবা *247#
                </span>
                <p className="text-slate-600">
                  আপনার বিকাশ অ্যাপে প্রবেশ করুন অথবা ফোনের ডায়াল প্যাড থেকে *247# ডায়াল করে Send Money অপশনে যান।
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-shadhinata text-sm">
                  ধাপ ২: প্রাপক নম্বর
                </span>
                <p className="text-slate-600">
                  নম্বর হিসেবে লিখুন:{" "}
                  <strong className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                    +8801331366865
                  </strong>{" "}
                  (অথবা 01331366865)।
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-shadhinata text-sm">
                  ধাপ ৩: টাকার পরিমাণ ও রেফারেন্স
                </span>
                <p className="text-slate-600">
                  টাকার পরিমাণ লিখুন <strong className="text-emerald-700 font-bold">১৯৯</strong> এবং রেফারেন্স অপশনে লিখুন{" "}
                  <strong className="font-mono text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">PRE_BOOK</strong>।
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-shadhinata text-sm">
                  ধাপ ৪: পিন কোড ও TrxID
                </span>
                <p className="text-slate-600">
                  আপনার bKash গোপন পিন দিয়ে ট্যাপ করে ধরে রাখুন। সফল হলে স্ক্রিন বা এসএমএস-এ ৮ বা ১০ অক্ষরের একটি TrxID (উদাঃ BK992817AX) আসবে। সেটি কপি করে ফর্মে জমা দিন।
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                যেকোনো প্রয়োজনে: +8801331366865
              </span>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-lg bg-[#0072c6] hover:bg-[#005a9e] text-white text-xs font-bold transition-all"
              >
                বুঝেছি, ফর্মে ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
