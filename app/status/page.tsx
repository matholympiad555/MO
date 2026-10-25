"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import {
  MagnifyingGlass,
  CheckCircle,
  Clock,
  XCircle,
  WarningCircle,
  ArrowRight,
  Copy,
  Check,
  Receipt,
  Phone,
  WhatsappLogo,
  ShieldCheck,
  Sparkle,
  ArrowClockwise,
  CreditCard,
  User,
  Buildings,
  GraduationCap,
} from "@phosphor-icons/react";
import { site } from "@/lib/content";

interface BookingResult {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  student_class?: string | null;
  institution?: string | null;
  bkash_number?: string | null;
  transaction_id: string;
  status: "pending" | "verified" | "rejected";
  admin_note?: string | null;
  created_at: string;
  updated_at?: string;
}

function StatusContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedTrx, setCopiedTrx] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleSearch = async (searchVal: string) => {
    const trimmed = searchVal.trim();
    if (!trimmed) {
      setError("অনুগ্রহ করে আপনার মোবাইল নম্বর অথবা বিকাশ Transaction ID লিখুন।");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/bookings/status?query=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || "কোনো প্রি-বুকিং তথ্য পাওয়া যায়নি। নম্বর বা TrxID ঠিক আছে কিনা যাচাই করুন।");
      }
    } catch {
      setError("সার্ভার সংযোগে সমস্যা হয়েছে। আপনার ইন্টারনেট চেক করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTrx(true);
    setTimeout(() => setCopiedTrx(false), 2000);
  };

  const copySummaryText = () => {
    if (!result) return;
    const statusText =
      result.status === "verified"
        ? "নিশ্চিত (Verified)"
        : result.status === "pending"
        ? "যাচাইকরণাধীন (Pending)"
        : "বাতিল (Rejected)";

    const text = `বাংলার ম্যাথ অলিম্পিয়াড ২০২৬ - বুকিং স্ট্যাটাস
শিক্ষার্থী: ${result.full_name}
মোবাইল: ${result.phone}
শ্রেণি: ${result.student_class || "৫ম শ্রেণি"}
TrxID: ${result.transaction_id}
স্ট্যাটাস: ${statusText}
কোর্স ফি: ১৯৯৳
যাচাই লিংক: https://banglarmatholympiad.org/status?query=${result.transaction_id}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6] text-xs font-bold">
          <Sparkle size={14} weight="fill" />
          <span>লাইভ ভেরিফিকেশন পোর্টাল</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-shadhinata font-bold text-slate-900 tracking-tight">
          প্রি-বুকিং <span className="text-[#0072c6]">স্ট্যাটাস যাচাই</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          তুমি যে মোবাইল নম্বর বা bKash Transaction ID (TrxID) দিয়ে প্রি-বুকিং করেছিলে, তা দিয়ে তোমার সিট নিশ্চিতকরণ ও এক্সেস স্ট্যাটাস চেক করো।
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="bg-white p-2 sm:p-2.5 flex items-center gap-2 border border-slate-200/90 shadow-md rounded-2xl"
        >
          <div className="relative flex-1">
            <MagnifyingGlass
              size={20}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="মোবাইল নম্বর (01XXXXXXXXX) অথবা TrxID লিখুন..."
              className="w-full bg-transparent pl-11 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 outline-none placeholder:text-slate-400 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#0072c6] hover:bg-[#005a9e] text-white text-xs sm:text-sm font-shadhinata font-bold active:scale-95 transition-all shrink-0 shadow-sm disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>যাচাই হচ্ছে...</span>
              </>
            ) : (
              <span>যাচাই করো</span>
            )}
          </button>
        </form>

        {/* Quick Demo Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
          <span className="font-medium">নমুনা ডাটা দেখতে ক্লিক করুন:</span>
          <button
            type="button"
            onClick={() => {
              setQuery("BK992817AX");
              handleSearch("BK992817AX");
            }}
            className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold transition-colors cursor-pointer"
          >
            BK992817AX (ভেরিফাইড)
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery("BK773410PL");
              handleSearch("BK773410PL");
            }}
            className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-mono font-bold transition-colors cursor-pointer"
          >
            BK773410PL (পেন্ডিং)
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto bg-white p-6 text-center space-y-3 border border-rose-200 rounded-2xl shadow-sm animate-in fade-in">
          <div className="size-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <WarningCircle size={30} weight="fill" />
          </div>
          <div className="space-y-1">
            <h4 className="font-shadhinata font-bold text-rose-800 text-base">
              রেকর্ড পাওয়া যায়নি
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">{error}</p>
          </div>
          <div className="text-xs text-slate-600 pt-1">
            এখনও প্রি-বুকিং সম্পন্ন না করে থাকলে{" "}
            <Link href="/#prebook" className="text-[#0072c6] font-bold hover:underline">
              এখানে প্রি-বুকিং করো (১৯৯৳) →
            </Link>
          </div>
        </div>
      )}

      {/* Result Display Card */}
      {result && (
        <div className="max-w-3xl mx-auto bg-white border border-slate-200/90 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Card Top: Student Name & Dynamic Status Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                শিক্ষার্থীর নাম
              </span>
              <h2 className="text-2xl sm:text-3xl font-shadhinata font-bold text-slate-900 mt-0.5">
                {result.full_name}
              </h2>
            </div>

            {/* Status Indicators: pending, verified, rejected */}
            <div>
              {result.status === "verified" && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs sm:text-sm shadow-xs">
                  <CheckCircle size={20} weight="fill" className="text-[#28a745]" />
                  <div className="text-left leading-tight">
                    <span className="font-shadhinata font-bold block">নিশ্চিত / এক্সেস সক্রিয়</span>
                    <span className="text-[10px] text-emerald-700 font-normal">Seat Confirmed & Verified</span>
                  </div>
                </div>
              )}

              {result.status === "pending" && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm shadow-xs">
                  <Clock size={20} weight="fill" className="text-amber-600" />
                  <div className="text-left leading-tight">
                    <span className="font-shadhinata font-bold block">যাচাইকরণাধীন (পেন্ডিং)</span>
                    <span className="text-[10px] text-amber-700 font-normal">Verification in Progress</span>
                  </div>
                </div>
              )}

              {result.status === "rejected" && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 font-bold text-xs sm:text-sm shadow-xs">
                  <XCircle size={20} weight="fill" className="text-rose-600" />
                  <div className="text-left leading-tight">
                    <span className="font-shadhinata font-bold block">ত্রুটিপূর্ণ তথ্য / বাতিল</span>
                    <span className="text-[10px] text-rose-600 font-normal">Payment Discrepancy</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
              ভেরিফিকেশন অগ্রগতি ধাপ
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {/* Step 1 */}
              <div className="space-y-1.5">
                <div className="size-6 rounded-full bg-[#28a745] text-white mx-auto flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <p className="font-shadhinata font-bold text-slate-900 text-xs">১. আবেদন জমা</p>
                <span className="text-[10px] text-emerald-700 block">সম্পন্ন</span>
              </div>

              {/* Step 2 */}
              <div className="space-y-1.5">
                <div
                  className={`size-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold ${
                    result.status === "verified"
                      ? "bg-[#28a745] text-white"
                      : result.status === "pending"
                      ? "bg-amber-500 text-white animate-pulse"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {result.status === "verified" ? "✓" : result.status === "pending" ? "২" : "✕"}
                </div>
                <p className="font-shadhinata font-bold text-slate-900 text-xs">২. bKash ভেরিফিকেশন</p>
                <span
                  className={`text-[10px] block font-medium ${
                    result.status === "verified"
                      ? "text-emerald-700"
                      : result.status === "pending"
                      ? "text-amber-700"
                      : "text-rose-700"
                  }`}
                >
                  {result.status === "verified"
                    ? "যাচাই সফল"
                    : result.status === "pending"
                    ? "যাচাই চলছে"
                    : "অমিল / ত্রুটি"}
                </span>
              </div>

              {/* Step 3 */}
              <div className="space-y-1.5">
                <div
                  className={`size-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold ${
                    result.status === "verified"
                      ? "bg-[#28a745] text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {result.status === "verified" ? "✓" : "৩"}
                </div>
                <p className="font-shadhinata font-bold text-slate-900 text-xs">৩. আসন ও এক্সেস</p>
                <span
                  className={`text-[10px] block font-medium ${
                    result.status === "verified" ? "text-emerald-700" : "text-slate-400"
                  }`}
                >
                  {result.status === "verified" ? "সক্রিয়" : "অপেক্ষমাণ"}
                </span>
              </div>
            </div>
          </div>

          {/* Status Context Banner */}
          <div
            className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
              result.status === "verified"
                ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                : result.status === "pending"
                ? "bg-amber-50/90 border-amber-300 text-amber-950"
                : "bg-rose-50/90 border-rose-300 text-rose-950"
            }`}
          >
            {result.status === "verified" && (
              <>
                <p className="font-bold text-emerald-900 text-sm sm:text-base font-shadhinata flex items-center gap-1.5">
                  <Sparkle size={18} weight="fill" className="text-[#28a745]" />
                  <span>অভিনন্দন! তোমার আসন আনুষ্ঠানিকভাবে নিশ্চিত হয়েছে।</span>
                </p>
                <p className="text-emerald-900/90">
                  তোমার বিকাশ ট্রানজেকশন সফলভাবে যাচাই হয়েছে। কোর্স শুরুর ক্লাস শিডিউল, লাইভ ক্লাসের লিঙ্ক এবং ড্যাশবোর্ড এক্সেসের যাবতীয় তথ্য তোমার প্রদত্ত মোবাইল নম্বরে এসএমএস ও হোয়াটসঅ্যাপের মাধ্যমে পাঠানো হবে। তুমি এখন থেকেই অনলাইন মক টেস্টে অংশ নিতে পারো!
                </p>
              </>
            )}

            {result.status === "pending" && (
              <>
                <p className="font-bold text-amber-900 text-sm sm:text-base font-shadhinata flex items-center gap-1.5">
                  <Clock size={18} weight="fill" className="text-amber-600" />
                  <span>তোমার আবেদন প্রক্রিয়াধীন রয়েছে (Verification Pending)</span>
                </p>
                <p className="text-amber-900/90">
                  তোমার বিকাশ পেমেন্ট তথ্য ডাটাবেজে সংরক্ষিত আছে। আমাদের অ্যাডমিন টিম ব্যাংক/বিকাশ স্টেটমেন্টের সাথে TrxID মিলিয়ে দেখছে। সাধারণত ২ থেকে সর্বোচ্চ ২৪ ঘণ্টার মধ্যে এটি নিশ্চিত করা হয়।
                </p>
              </>
            )}

            {result.status === "rejected" && (
              <>
                <p className="font-bold text-rose-900 text-sm sm:text-base font-shadhinata flex items-center gap-1.5">
                  <WarningCircle size={18} weight="fill" className="text-rose-600" />
                  <span>পেমেন্ট তথ্য যাচাইয়ে সমস্যা পাওয়া গেছে</span>
                </p>
                <p className="text-rose-900/90">
                  তোমার প্রদত্ত বিকাশ TrxID এর সাথে আমাদের বিকাশ অ্যাকাউন্টের পেমেন্ট রেকর্ডের মিল পাওয়া যায়নি।{" "}
                  {result.admin_note ? (
                    <span className="font-semibold block mt-1">অ্যাডমিন নোট: {result.admin_note}</span>
                  ) : (
                    "দয়া করে সঠিক ট্রানজেকশন আইডি দিয়ে পুনরায় চেষ্টা করুন অথবা আমাদের হেল্পলাইনে যোগাযোগ করুন।"
                  )}
                </p>
              </>
            )}
          </div>

          {/* Details Breakdown Grid */}
          <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-shadhinata font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Receipt size={16} className="text-[#0072c6]" weight="bold" />
                <span>বুকিং ও পেমেন্ট বিবরণী</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">
                ID: {result.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 block">মোবাইল নম্বর</span>
                <span className="font-mono text-slate-900 font-bold text-sm">{result.phone}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-500 block">bKash Transaction ID</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[#0072c6] font-bold text-sm bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {result.transaction_id}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.transaction_id)}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200"
                    title="TrxID কপি করুন"
                  >
                    {copiedTrx ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-500 block">শ্রেণি</span>
                <span className="text-slate-900 font-medium">{result.student_class || "৫ম শ্রেণি"}</span>
              </div>

              {result.institution && (
                <div className="space-y-0.5">
                  <span className="text-slate-500 block">শিক্ষা প্রতিষ্ঠান</span>
                  <span className="text-slate-800 font-medium">{result.institution}</span>
                </div>
              )}

              {result.email && (
                <div className="space-y-0.5">
                  <span className="text-slate-500 block">ইমেইল</span>
                  <span className="font-mono text-slate-800">{result.email}</span>
                </div>
              )}

              <div className="space-y-0.5">
                <span className="text-slate-500 block">কোর্স ফি</span>
                <span className="text-emerald-700 font-bold">১৯৯৳ (৮০% ছাড় প্রাপ্ত)</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-500 block">আবেদনের তারিখ</span>
                <span className="text-slate-800 font-mono">
                  {new Date(result.created_at).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {result.bkash_number && (
                <div className="space-y-0.5">
                  <span className="text-slate-500 block">প্রেরক বিকাশ নম্বর</span>
                  <span className="font-mono text-slate-800">{result.bkash_number}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Hub depending on status */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copySummaryText}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 transition-colors"
              >
                {copiedSummary ? (
                  <>
                    <Check size={14} className="text-emerald-600" weight="bold" />
                    <span className="text-emerald-700 font-bold">রসিদ বিবরণ কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} weight="bold" />
                    <span>রসিদ বিবরণ কপি করুন</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSearch(result.transaction_id || result.phone)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 transition-colors"
              >
                <ArrowClockwise size={14} weight="bold" />
                <span>রিফ্রেশ করুন</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {result.status === "verified" && (
                <Link
                  href="/mock-tests"
                  className="px-5 py-2.5 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white text-xs sm:text-sm font-shadhinata font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <span>অনলাইন মক টেস্ট শুরু করো</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              )}

              {result.status === "rejected" && (
                <Link
                  href="/#prebook"
                  className="px-5 py-2.5 rounded-xl bg-[#0072c6] hover:bg-[#005a9e] text-white text-xs sm:text-sm font-shadhinata font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <span>পুনরায় প্রি-বুকিং ফরম পূরণ করুন</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              )}

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 border border-emerald-300 transition-colors"
              >
                <WhatsappLogo size={16} weight="fill" className="text-emerald-600" />
                <span>হোয়াটসঅ্যাপ সাপোর্ট</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingStatusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F4]">
      <Nav />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container-x max-w-4xl">
          <Suspense
            fallback={
              <div className="text-center py-24 text-slate-500 flex flex-col items-center justify-center gap-3">
                <span className="size-8 border-3 border-[#0072c6] border-t-transparent rounded-full animate-spin" />
                <span className="font-shadhinata font-bold text-slate-700">লোড হচ্ছে...</span>
              </div>
            }
          >
            <StatusContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
