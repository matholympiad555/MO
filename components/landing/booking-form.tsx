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
      <div className="card-shell p-8 sm:p-10 flex flex-col items-center text-center space-y-6 bg-white border border-slate-200/90 shadow-xl rounded-3xl">
        <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
          <CheckCircle size={40} weight="fill" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 font-display">
            তোমার প্রি-বুকিং সফলভাবে জমা হয়েছে!
          </h3>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            ধন্যবাদ! তোমার ট্রানজেকশন আইডি <strong className="text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{submittedTrx}</strong> সংরক্ষিত হয়েছে। অ্যাডমিন পেমেন্ট যাচাই করে ২৪ ঘণ্টার মধ্যে সিট নিশ্চিত করবে।
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/status?query=${submittedTrx}`}
            className="px-6 py-3 rounded-xl bg-blue-700 text-white text-sm font-bold hover:bg-blue-800 shadow-md shadow-blue-700/20 transition-all"
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
            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200 transition-all"
          >
            আরেকটি বুকিং করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-shell p-6 sm:p-9 space-y-5 bg-white border border-slate-200/90 shadow-xl rounded-3xl">
      <div>
        <h3 className="text-xl font-bold font-display text-slate-900">
          প্রি-বুকিং আবেদন ফরম
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          বিকাশে ১৯৯ টাকা সেন্ড মানি করে নিচের তথ্যগুলো পূরণ করুন।
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs sm:text-sm font-medium">
          <WarningCircle size={20} className="shrink-0 text-rose-600" weight="fill" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">শিক্ষার্থীর পূর্ণ নাম *</label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="উদাঃ রাফিদ হাসান"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">মোবাইল নম্বর *</label>
          <input
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">শ্রেণি *</label>
          <select
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition-all"
          >
            <option value="ক্লাস ৩">ক্লাস ৩</option>
            <option value="ক্লাস ৪-৫ (প্রাইমারি)">ক্লাস ৪-৫ (প্রাইমারি)</option>
            <option value="ক্লাস ৬-৮ (জুনিয়র)">ক্লাস ৬-৮ (জুনিয়র)</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">স্কুল / শিক্ষা প্রতিষ্ঠানের নাম</label>
          <input
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="উদাঃ আইডিয়াল স্কুল"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন *</label>
          <input
            required
            value={formData.bkash}
            onChange={(e) => setFormData({ ...formData, bkash: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">bKash Transaction ID (TrxID) *</label>
          <input
            required
            value={formData.transactionId}
            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value.toUpperCase() })}
            placeholder="উদাঃ BK992817AX"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 font-mono uppercase focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 active:scale-98 transition-all disabled:opacity-50"
      >
        {loading ? "সার্ভারে প্রক্রিয়াধীন..." : "প্রি-বুক নিশ্চিত করো (১৯৯৳)"}
        {!loading && <ArrowUpRight weight="bold" size={18} />}
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-1 gap-2">
        <span>🔒 নিরাপদ ও এনক্রিপ্টেড পেমেন্ট ভেরিফিকেশন</span>
        <Link href="/status" className="text-blue-700 hover:underline font-bold">
          আগের বুকিং স্ট্যাটাস চেক করুন →
        </Link>
      </div>
    </form>
  );
}
