"use client";

import { useState } from "react";
import { CheckCircle, ArrowUpRight, WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedTrx, setSubmittedTrx] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    grade: "ক্লাস ৪-৫ (প্রাইমারি)",
    institution: "",
    bkash: "",
    transactionId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          phone: formData.phone,
          grade: formData.grade,
          institution: formData.institution,
          bkash_number: formData.bkash || formData.phone,
          transaction_id: formData.transactionId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "বুকিং জমা দেওয়া সম্ভব হয়নি। তথ্য আবার যাচাই করুন।");
        setLoading(false);
        return;
      }

      setSubmittedTrx(formData.transactionId.toUpperCase());
      setSuccess(true);
      setLoading(false);
    } catch {
      setError("সার্ভারে সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card-shell p-8 flex flex-col items-center text-center space-y-6">
        <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle size={40} weight="fill" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-paper font-display">তোমার প্রি-বুকিং সফলভাবে জমা হয়েছে!</h3>
          <p className="text-sm text-muted max-w-md">
            ধন্যবাদ! তোমার ট্রানজেকশন আইডি <strong className="text-brand font-mono">{submittedTrx}</strong> সংরক্ষিত হয়েছে। অ্যাডমিন পেমেন্ট যাচাই করে ২৪ ঘণ্টার মধ্যে কনফার্ম করবে।
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/status?query=${submittedTrx}`}
            className="px-5 py-2.5 rounded-full bg-brand text-ink text-sm font-semibold hover:bg-brand-deep transition-all"
          >
            স্ট্যাটাস চেক করুন
          </Link>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                name: "",
                phone: "",
                grade: "ক্লাস ৪-৫ (প্রাইমারি)",
                institution: "",
                bkash: "",
                transactionId: "",
              });
            }}
            className="px-5 py-2.5 rounded-full bg-white/10 text-paper text-sm hover:bg-white/20 transition-all"
          >
            আরেকটি বুকিং করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-shell p-6 sm:p-8 space-y-5">
      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-sm">
          <WarningCircle size={20} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-paper/80">শিক্ষার্থীর নাম *</label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="উদাঃ রাফিদ হাসান"
            className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-paper/80">অভিভাবক / শিক্ষার্থীর ফোন নম্বর *</label>
          <input
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-paper/80">শ্রেণি *</label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="w-full bg-ink-2 border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand outline-none transition-all"
          >
            <option value="ক্লাস ৩">ক্লাস ৩</option>
            <option value="ক্লাস ৪-৫ (প্রাইমারি)">ক্লাস ৪-৫ (প্রাইমারি)</option>
            <option value="ক্লাস ৬-৮ (জুনিয়র)">ক্লাস ৬-৮ (জুনিয়র)</option>
            <option value="এসএসসি">এসএসসি</option>
            <option value="এইচএসসি">এইচএসসি</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-paper/80">স্কুল / শিক্ষা প্রতিষ্ঠানের নাম</label>
          <input
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="উদাঃ আইডিয়াল স্কুল"
            className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-paper/80">যে bKash নম্বর থেকে টাকা পাঠিয়েছেন *</label>
          <input
            required
            value={formData.bkash}
            onChange={(e) => setFormData({ ...formData, bkash: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-paper/80">bKash Transaction ID (TrxID) *</label>
          <input
            required
            value={formData.transactionId}
            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value.toUpperCase() })}
            placeholder="উদাঃ BK992817AX"
            className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-sm text-paper font-mono uppercase focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-full bg-brand text-ink font-semibold flex items-center justify-center gap-2 hover:bg-brand-deep hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {loading ? "সার্ভারে পাঠানো হচ্ছে..." : "প্রি-বুক নিশ্চিত করো"}
        {!loading && <ArrowUpRight weight="bold" />}
      </button>

      <div className="flex items-center justify-between text-xs text-muted pt-1">
        <span>নিরাপদ ও এনক্রিপ্টেড পেমেন্ট ভেরিফিকেশন</span>
        <Link href="/status" className="text-brand hover:underline">
          আগের বুকিং স্ট্যাটাস চেক করুন →
        </Link>
      </div>
    </form>
  );
}
