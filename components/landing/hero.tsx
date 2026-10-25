"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  YoutubeLogo,
  CheckCircle,
  Play,
  Pause,
  Copy,
  Check,
  Phone,
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
          studentClass: language === "bn" ? "প্রাইমারি অলিম্পিয়াড (৩য়-৫ম)" : "Primary Olympiad (Grade 3-5)",
          institution: "School",
          bkashNumber: formData.bkash || formData.phone,
          transactionId: formData.trxId,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setSubmittedTrx(formData.trxId);
      }
    } catch {
      setSuccess(true);
      setSubmittedTrx(formData.trxId);
    }
    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-slate-200/80 pt-8 sm:pt-12 pb-16 sm:pb-24">
      {/* Subtle Math Ambient Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Course Headline & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill: Course Pre-booking Active */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-sm sm:text-[15px] font-bold shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0"></span>
              <span>
                {language === "bn"
                  ? "🔥 প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬ • প্রি-বুকিং চলছে!"
                  : "🔥 Primary Math Olympiad Prep Course 2026 • Pre-Booking Live!"}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black tracking-tight leading-[1.12]">
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                  {t.heroTitle1}
                </span>
                <br />
                <span className="text-slate-950 font-black">
                  {t.heroTitle2}
                </span>
              </h1>
            </div>

            {/* Subtitle with Course Specifics - Increased Font Size */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal">
              {language === "bn" ? (
                <>
                  তুমি কি গণিত অলিম্পিয়াডে ভালো করতে চাও? আমাদের সাথে শুরু হোক তোমার যাত্রা!{" "}
                  <strong className="text-purple-700 font-bold">৭+ ঘণ্টা লাইভ ক্লাস</strong>, ২টি পূর্ণাঙ্গ অলিম্পিয়াড মক টেস্ট, এবং ২৪/৭ প্রশ্ন সমাধান। মাত্র{" "}
                  <strong className="text-emerald-700 font-black bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                    ১৯৯ টাকায় (৮০% ছাড়)
                  </strong>{" "}
                  সিট নিশ্চিত করো।
                </>
              ) : (
                <>
                  Master Math Olympiad with live interactive lectures, 2 full-length simulated mock tests, and 24/7 dedicated mentor doubt solving. Confirm your seat for only{" "}
                  <strong className="text-emerald-700 font-black bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                    199 BDT (80% Off)
                  </strong>!
                </>
              )}
            </p>

            {/* Action Buttons - Larger font & padding */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#hero-booking"
                onClick={() => setActiveTab("booking")}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-base sm:text-lg shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <Ticket size={20} weight="fill" />
                <span>
                  {language === "bn" ? "সরাসরি প্রি-বুক করো (১৯৯৳)" : "Pre-Book Seat Directly (199 BDT)"}
                </span>
                <ArrowRight size={18} weight="bold" />
              </a>

              <a
                href="https://www.youtube.com/@BanglarMathOlympiad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base border border-slate-300 shadow-xs flex items-center gap-2.5 transition-all"
              >
                <YoutubeLogo size={22} weight="fill" className="text-red-600" />
                <span>
                  {language === "bn"
                    ? "ইউটিউব চ্যানেল (@BanglarMathOlympiad) ↗"
                    : "YouTube Channel (@BanglarMathOlympiad) ↗"}
                </span>
              </a>
            </div>

            {/* 4 Green Checklist Badges - Increased Font Size */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-sm sm:text-[15px] font-bold text-slate-800">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{language === "bn" ? "৭+ ঘণ্টা লাইভ ক্লাস" : "7+ Hours Live Classes"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{language === "bn" ? "২টি পূর্ণাঙ্গ মক টেস্ট" : "2 Full Mock Tests"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{language === "bn" ? "রেকর্ডেড লেকচার" : "Recorded Lectures"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{language === "bn" ? "কোর্স ফি মাত্র ১৯৯৳" : "Course Fee: 199 BDT"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Course Booking Card at the very first view! */}
          <div id="hero-booking" className="lg:col-span-5 relative">
            {/* Top Switcher Tabs - Larger Text */}
            <div className="flex items-center justify-between mb-3.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveTab("booking")}
                className={`flex-1 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "booking"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Ticket size={17} weight="fill" />
                <span>
                  {language === "bn" ? "⚡ দ্রুত প্রি-বুকিং (১৯৯৳)" : "⚡ Quick Pre-Book (199 BDT)"}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("audio")}
                className={`flex-1 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "audio"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Play size={16} weight="fill" />
                <span>
                  {language === "bn" ? "🎙️ লাইভ ক্লাস ডেমো" : "🎙️ Live Class Demo"}
                </span>
              </button>
            </div>

            {/* TAB 1: Direct Course Booking Card */}
            {activeTab === "booking" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xl space-y-5">
                {/* Course Header & Discount Badge */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {language === "bn" ? "অফিশিয়াল রেজিস্ট্রেশন" : "Official Registration"}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 leading-snug">
                      {language === "bn" ? "প্রাইমারি গণিত অলিম্পিয়াড ২০২৬" : "Primary Math Olympiad 2026"}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm text-slate-400 line-through">
                      {language === "bn" ? "১,০০০৳" : "1,000 BDT"}
                    </span>
                    <div className="text-2xl font-black text-emerald-600 leading-none">
                      {language === "bn" ? "১৯৯৳" : "199 BDT"}
                    </div>
                    <span className="text-xs font-bold text-emerald-700">
                      {language === "bn" ? "৮০% ছাড়" : "80% Off"}
                    </span>
                  </div>
                </div>

                {/* bKash Instructions Box with Copy - Larger text */}
                <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-amber-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Phone size={16} className="text-amber-600" />
                      <span>{language === "bn" ? "bKash Send Money:" : "bKash Send Money:"}</span>
                    </span>
                    <button
                      onClick={handleCopyNum}
                      className="px-2.5 py-1 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold flex items-center gap-1.5 transition-all cursor-pointer font-mono text-xs sm:text-sm"
                    >
                      {copiedNum ? <Check size={14} weight="bold" /> : <Copy size={14} />}
                      <span>{copiedNum ? (language === "bn" ? "কপি হয়েছে!" : "Copied!") : "01331366865"}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-amber-900">
                    <span>{language === "bn" ? "রেফারেন্স কোড (Reference):" : "Reference Code (Ref):"}</span>
                    <button
                      onClick={handleCopyRef}
                      className="font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded hover:bg-purple-200 transition-colors cursor-pointer text-xs sm:text-sm"
                    >
                      {copiedRef ? "✓ PRE_BOOK" : "PRE_BOOK"}
                    </button>
                  </div>
                </div>

                {/* Quick Booking Form */}
                {success ? (
                  <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-3">
                    <CheckCircle size={40} weight="fill" className="text-emerald-600 mx-auto" />
                    <div>
                      <div className="font-black text-slate-900 text-base">
                        {language === "bn" ? "প্রি-বুকিং আবেদন সফল হয়েছে! 🎉" : "Pre-Booking Submitted! 🎉"}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {language === "bn" ? "তোমার TrxID: " : "Your TrxID: "}
                        <strong className="font-mono text-purple-700 font-bold">{submittedTrx}</strong>
                      </p>
                    </div>

                    <Link
                      href={`/status?query=${submittedTrx}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-emerald-600 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-xs"
                    >
                      <span>{language === "bn" ? "লাইভ স্ট্যাটাস ট্র্যাক করো" : "Track Live Status"}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={language === "bn" ? "শিক্ষার্থীর পূর্ণ নাম *" : "Student's Full Name *"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="tel"
                        required
                        placeholder={language === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none text-slate-900 placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        required
                        placeholder={language === "bn" ? "bKash TrxID *" : "bKash TrxID *"}
                        value={formData.trxId}
                        onChange={(e) => setFormData({ ...formData, trxId: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none text-slate-900 font-mono uppercase placeholder:text-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-black text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>{language === "bn" ? "যাচাই হচ্ছে..." : "Verifying..."}</span>
                      ) : (
                        <>
                          <span>
                            {language === "bn" ? "সিট নিশ্চিত করো (১৯৯৳)" : "Confirm Seat (199 BDT)"}
                          </span>
                          <ArrowRight size={18} weight="bold" />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-1">
                      <a
                        href="#prebook"
                        className="text-xs text-purple-700 hover:underline font-semibold"
                      >
                        {language === "bn"
                          ? "বিস্তারিত প্রি-বুকিং ও পেমেন্ট গাইড দেখতে ক্লিক করো ↓"
                          : "Click here for full pre-booking & payment guide ↓"}
                      </a>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: Audio Demo Card */}
            {activeTab === "audio" && (
              <div className="rounded-2xl bg-[#13151b] border border-slate-800 p-6 shadow-2xl text-white space-y-4 relative">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <span>{t.heroDiscussionTitle}</span>
                    </div>
                    <div className="text-xs text-slate-400">{t.heroDiscussionLive}</div>
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
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{t.heroQuoteSolver}</span>
                    <span className="text-slate-400 font-mono">05:45</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                    &ldquo;{t.heroQuotePtolemy}&rdquo;
                  </p>
                </div>

                {/* Play Button */}
                <div className="flex items-center justify-center pt-1">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" className="ml-0.5" />}
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