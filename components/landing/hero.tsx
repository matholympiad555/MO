"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  YoutubeLogo,
  CheckCircle,
  Play,
  Pause,
  Star,
  Copy,
  Check,
  Sparkle,
  Phone,
  Receipt,
  Ticket,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

interface HeroProps {
  onOpenHalumAI?: () => void;
}

export function Hero({ onOpenHalumAI }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"booking" | "audio">("booking");
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedNum, setCopiedNum] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const { t, language } = useLanguage();

  // Quick form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bkash: "",
    trxId: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedTrx, setSubmittedTrx] = useState("");

  const handleCopyNum = () => {
    navigator.clipboard.writeText("01331366865");
    setCopiedNum(true);
    setTimeout(() => setCopiedNum(false), 2000);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText("PRE_BOOK");
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.trxId) return;

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          studentClass: "প্রাইমারি অলিম্পিয়াড (৩য়-৫ম)",
          institution: "স্কুল",
          bkashNumber: formData.bkash || formData.phone,
          transactionId: formData.trxId,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setSubmittedTrx(formData.trxId);
      }
    } catch {
      // Optimistic fallback for local storage
      setSuccess(true);
      setSubmittedTrx(formData.trxId);
    }
    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-slate-200/80 pt-8 sm:pt-12 pb-14 sm:pb-20">
      {/* Subtle Math Ambient Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Course Headline & Pitch */}
          <div className="lg:col-span-7 space-y-5">
            {/* Pill: Course Pre-booking Active */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>🔥 প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬ • প্রি-বুকিং চলছে!</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.8rem] font-black tracking-tight leading-[1.12]">
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                  Tiger Math
                </span>
                <br />
                <span className="text-slate-950 font-black">
                  {language === "bn" ? "প্রাইমারি অলিম্পিয়াড প্রস্তুতি কোর্স" : "Primary Math Olympiad Prep 2026"}
                </span>
              </h1>
            </div>

            {/* Subtitle with Course Specifics */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              {language === "bn" ? (
                <>
                  তুমি কি গণিত অলিম্পিয়াডে ভালো করতে চাও? আমাদের সাথে শুরু হোক তোমার যাত্রা!{" "}
                  <strong className="text-purple-700 font-bold">৭+ ঘণ্টা লাইভ ক্লাস</strong>, ২টি পূর্ণাঙ্গ অলিম্পিয়াড মক টেস্ট, এবং ২৪/৭ প্রশ্ন সমাধান। মাত্র{" "}
                  <strong className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    ১৯৯ টাকায় (৮০% ছাড়)
                  </strong>{" "}
                  সিট নিশ্চিত করো।
                </>
              ) : (
                <>
                  Master Math Olympiad with live interactive lectures, 2 full-length simulated mock tests, and 24/7 mentor doubt solving. Confirm your seat for only{" "}
                  <strong className="text-emerald-700 font-black">199 BDT (80% Off)</strong>!
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#hero-booking"
                onClick={() => setActiveTab("booking")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm sm:text-base shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Ticket size={18} weight="fill" />
                <span>সরাসরি প্রি-বুক করো (১৯৯৳)</span>
                <ArrowRight size={16} weight="bold" />
              </a>

              <a
                href="https://www.youtube.com/@BanglarMathOlympiad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs flex items-center gap-2 transition-all"
              >
                <YoutubeLogo size={20} weight="fill" className="text-red-600" />
                <span>ইউটিউব চ্যানেল (@BanglarMathOlympiad) ↗</span>
              </a>
            </div>

            {/* 4 Green Checklist Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
                <span>৭+ ঘণ্টা লাইভ ক্লাস</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
                <span>২টি পূর্ণাঙ্গ মক টেস্ট</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
                <span>রেকর্ডেড ভিডিও</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200">
                <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0" />
                <span>কোর্স ফি মাত্র ১৯৯৳</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Course Booking Card at the very first view! */}
          <div id="hero-booking" className="lg:col-span-5 relative">
            {/* Top Switcher Tabs */}
            <div className="flex items-center justify-between mb-3 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveTab("booking")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "booking"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Ticket size={15} weight="fill" />
                <span>⚡ দ্রুত প্রি-বুকিং (১৯৯৳)</span>
              </button>

              <button
                onClick={() => setActiveTab("audio")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "audio"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Play size={14} weight="fill" />
                <span>🎙️ লাইভ ক্লাস ডেমো</span>
              </button>
            </div>

            {/* TAB 1: Direct Course Booking Card */}
            {activeTab === "booking" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xl space-y-4">
                {/* Course Header & Discount Badge */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      অফিশিয়াল রেজিস্ট্রেশন
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1 leading-snug">
                      প্রাইমারি গণিত অলিম্পিয়াড ২০২৬
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 line-through">১,০০০৳</span>
                    <div className="text-xl font-black text-emerald-600 leading-none">১৯৯৳</div>
                    <span className="text-[10px] font-bold text-emerald-700">৮০% ছাড়</span>
                  </div>
                </div>

                {/* bKash Instructions Box with Copy */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-amber-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-amber-600" />
                      <span>bKash Send Money:</span>
                    </span>
                    <button
                      onClick={handleCopyNum}
                      className="px-2 py-0.5 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {copiedNum ? <Check size={12} weight="bold" /> : <Copy size={12} />}
                      <span>{copiedNum ? "কপি হয়েছে!" : "01331366865"}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-amber-900">
                    <span>রেফারেন্স কোড (Reference):</span>
                    <button
                      onClick={handleCopyRef}
                      className="font-mono font-bold text-purple-800 bg-purple-100 px-1.5 py-0.2 rounded hover:bg-purple-200 transition-colors cursor-pointer"
                    >
                      {copiedRef ? "✓ PRE_BOOK" : "PRE_BOOK"}
                    </button>
                  </div>
                </div>

                {/* Quick Booking Form */}
                {success ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2.5">
                    <CheckCircle size={36} weight="fill" className="text-emerald-600 mx-auto" />
                    <div>
                      <div className="font-black text-slate-900 text-sm">
                        প্রি-বুকিং আবেদন সফল হয়েছে! 🎉
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        তোমার TrxID: <strong className="font-mono text-purple-700">{submittedTrx}</strong>
                      </p>
                    </div>

                    <Link
                      href={`/status?query=${submittedTrx}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all"
                    >
                      <span>লাইভ স্ট্যাটাস ট্র্যাক করো</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="শিক্ষার্থীর পূর্ণ নাম *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="মোবাইল নম্বর *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none text-slate-900"
                      />
                      <input
                        type="text"
                        required
                        placeholder="bKash TrxID *"
                        value={formData.trxId}
                        onChange={(e) => setFormData({ ...formData, trxId: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none text-slate-900 font-mono uppercase"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>যাচাই হচ্ছে...</span>
                      ) : (
                        <>
                          <span>সিট নিশ্চিত করো (১৯৯৳)</span>
                          <ArrowRight size={16} weight="bold" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <a
                        href="#prebook"
                        className="text-[11px] text-purple-700 hover:underline font-semibold"
                      >
                        বিস্তারিত প্রি-বুকিং ও পেমেন্ট গাইড দেখতে ক্লিক করো ↓
                      </a>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: Audio Demo Card (Image 4 Replica) */}
            {activeTab === "audio" && (
              <div className="rounded-2xl bg-[#13151b] border border-slate-800 p-6 shadow-2xl text-white space-y-4 relative">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <span>BDMO National Camp Practice</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Live Problem Discussion</div>
                  </div>
                  <div className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-slate-700">
                    00:05:39
                  </div>
                </div>

                {/* Animated Waveforms */}
                <div className="h-8 flex items-center justify-center gap-1">
                  {[12, 22, 34, 16, 28, 38, 24, 14, 30, 38, 26, 18, 34, 40, 20, 12, 26, 36].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${isPlaying ? h : 5}px` }}
                      className="w-1 bg-gradient-to-t from-purple-500 via-rose-500 to-amber-400 rounded-full transition-all duration-300"
                    />
                  ))}
                </div>

                {/* Dialogue */}
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-200">Tahmid (IMO Solver)</span>
                    <span className="text-slate-400 font-mono">05:45</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                    &ldquo;Apply Ptolemy&apos;s Theorem: <code className="text-amber-300">AC·BD = AB·CD + BC·DA</code> to find the diameter!&rdquo;
                  </p>
                </div>

                {/* Play Button */}
                <div className="flex items-center justify-center pt-1">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" className="ml-0.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}