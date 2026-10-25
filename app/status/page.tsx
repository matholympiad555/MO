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
} from "@phosphor-icons/react";

function StatusContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/bookings/status?query=${encodeURIComponent(searchVal.trim())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.error || "কোনো বুকিং রেকর্ড পাওয়া যায়নি।");
      }
    } catch {
      setError("সার্ভার সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black font-display text-paper">
          প্রি-বুকিং <span className="text-brand">স্ট্যাটাস চেক</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          তুমি যে মোবাইল নম্বর বা বিকাশ Transaction ID (TrxID) দিয়ে প্রি-বুকিং করেছিলে, তা দিয়ে লাইভ স্ট্যাটাস যাচাই করো।
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="card-shell p-2 flex items-center gap-2 border border-white/15"
      >
        <div className="relative flex-1">
          <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="01XXXXXXXXX অথবা BKXXXXXXXX"
            className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-paper outline-none placeholder:text-muted/60"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-full bg-brand text-ink text-sm font-bold hover:bg-brand-deep active:scale-95 transition-all shrink-0 disabled:opacity-50"
        >
          {loading ? "খোঁজা হচ্ছে..." : "যাচাই করো"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="card-shell p-6 text-center space-y-3 border-red-500/30 bg-red-500/5">
          <WarningCircle size={36} className="text-red-400 mx-auto" />
          <p className="text-sm text-red-200">{error}</p>
          <div className="text-xs text-muted">
            এখনও প্রি-বুকিং না করে থাকলে{" "}
            <Link href="/#prebook" className="text-brand underline">
              এখানে প্রি-বুকিং করো
            </Link>
          </div>
        </div>
      )}

      {/* Result Display Card */}
      {result && (
        <div className="card-shell p-6 sm:p-8 space-y-6 border-brand/30">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-muted">শিক্ষার্থীর নাম</span>
              <h2 className="text-xl font-bold font-display text-paper">{result.full_name}</h2>
            </div>

            {/* Status Pill */}
            {result.status === "verified" && (
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle size={16} weight="fill" /> ভেরিফাইড (নিশ্চিত)
              </span>
            )}
            {result.status === "pending" && (
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                <Clock size={16} weight="fill" /> যাচাইকরণ চলছে (পেন্ডিং)
              </span>
            )}
            {result.status === "rejected" && (
              <span className="px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold flex items-center gap-1.5">
                <XCircle size={16} weight="fill" /> বাতিল / অমিল
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-muted block text-xs">মোবাইল নম্বর</span>
              <span className="font-mono text-paper font-semibold">{result.phone}</span>
            </div>
            <div>
              <span className="text-muted block text-xs">Transaction ID</span>
              <span className="font-mono text-brand font-bold uppercase">{result.transaction_id}</span>
            </div>
            <div>
              <span className="text-muted block text-xs">শ্রেণি</span>
              <span className="text-paper">{result.student_class || "প্রাইমারি"}</span>
            </div>
            <div>
              <span className="text-muted block text-xs">আবেদনের তারিখ</span>
              <span className="text-paper">
                {new Date(result.created_at).toLocaleDateString("bn-BD")}
              </span>
            </div>
          </div>

          {/* Status Message */}
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
              result.status === "verified"
                ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-200"
                : result.status === "pending"
                ? "bg-amber-500/10 border-amber-500/25 text-amber-200"
                : "bg-red-500/10 border-red-500/25 text-red-200"
            }`}
          >
            {result.status === "verified" && (
              <div>
                🎉 <strong>অভিনন্দন!</strong> তোমার বিকাশ পেমেন্ট সফলভাবে যাচাই হয়েছে। তোমার সিট নিশ্চিত করা হয়েছে। ক্লাস শুরুর যাবতীয় লিংক ও ইনভাইটেশন তোমার দেওয়া নম্বরে মেসেজে পাঠিয়ে দেওয়া হবে।
              </div>
            )}
            {result.status === "pending" && (
              <div>
                ⏳ তোমার ট্রানজেকশন তথ্য আমরা পেয়েছি। অ্যাডমিন টিম বিকাশ স্টেটমেন্ট যাচাই করছে। সাধারণত ২-২৪ ঘণ্টার মধ্যে এটি নিশ্চিত করা হয়।
              </div>
            )}
            {result.status === "rejected" && (
              <div>
                ⚠️ দুঃখিত, তোমার প্রদত্ত বিকাশ ট্রানজেকশন নম্বরে পেমেন্ট পাওয়া যায়নি। অ্যাডমিন নোট: {result.admin_note || "দয়া করে সঠিক ট্রানজেকশন আইডি দিয়ে পুনরায় সাবমিট করুন।"}
              </div>
            )}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/mock-tests"
              className="inline-flex items-center gap-1.5 text-xs text-brand hover:underline font-semibold"
            >
              এখনই মক টেস্ট দিয়ে প্রস্তুতি শুরু করো <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingStatusPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 container-x max-w-4xl">
        <Suspense fallback={<div className="text-center py-20 text-muted">লোড হচ্ছে...</div>}>
          <StatusContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
