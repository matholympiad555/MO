"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  WarningCircle,
  ArrowRight,
  Copy,
  Check,
  Receipt,
  ArrowClockwise,
  CreditCard,
  User,
  Phone,
  EnvelopeSimple,
  Buildings,
  GraduationCap,
  ShieldCheck,
} from "@phosphor-icons/react";

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    email: string;
    grade: string;
    institution: string;
    bkash: string;
    transactionId: string;
    date: string;
  } | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [copiedQuickNum, setCopiedQuickNum] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    grade: "৫ম শ্রেণি (প্রাইমারি অলিম্পিয়াড)",
    institution: "",
    bkash: "",
    transactionId: "",
  });

  const handleQuickCopy = () => {
    navigator.clipboard.writeText("01331366865");
    setCopiedQuickNum(true);
    setTimeout(() => setCopiedQuickNum(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic client validation
    if (!formData.name.trim()) {
      setError("শিক্ষার্থীর পূর্ণ নাম লিখুন।");
      setLoading(false);
      return;
    }

    const cleanPhone = formData.phone.trim().replace(/[\s-+]/g, "");
    if (cleanPhone.length < 11) {
      setError("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।");
      setLoading(false);
      return;
    }

    if (!formData.bkash.trim()) {
      setError("যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন তা লিখুন।");
      setLoading(false);
      return;
    }

    if (!formData.transactionId.trim() || formData.transactionId.trim().length < 6) {
      setError("একটি সঠিক বিকাশ TrxID (যেমন: BK992817AX) লিখুন।");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          student_class: formData.grade,
          institution: formData.institution.trim() || null,
          bkash_number: formData.bkash.trim(),
          transaction_id: formData.transactionId.trim().toUpperCase(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "বুকিং জমা দেওয়া সম্ভব হয়নি। তথ্য পুনরায় যাচাই করুন।");
        setLoading(false);
        return;
      }

      setSubmittedData({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        grade: formData.grade,
        institution: formData.institution.trim(),
        bkash: formData.bkash.trim(),
        transactionId: formData.transactionId.trim().toUpperCase(),
        date: new Date().toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। আপনার ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।");
      setLoading(false);
    }
  };

  const handleCopyReceiptText = () => {
    if (!submittedData) return;
    const text = `বাংলার ম্যাথ অলিম্পিয়াড ২০২৬ - প্রি-বুকিং রসিদ
শিক্ষার্থী: ${submittedData.name}
মোবাইল: ${submittedData.phone}
শ্রেণি: ${submittedData.grade}
প্রতিষ্ঠান: ${submittedData.institution || "উল্লেখ নেই"}
পরিশোধিত ফি: ১৯৯৳ (৮০% ডিসকাউন্ট)
TrxID: ${submittedData.transactionId}
বিকাশ প্রেরক: ${submittedData.bkash}
স্ট্যাটাস: যাচাইকরণাধীন (Pending)
স্ট্যাটাস যাচাই লিংক: https://banglarmatholympiad.org/status?query=${submittedData.transactionId}`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  // SUCCESS CONFIRMATION RECEIPT STATE
  if (success && submittedData) {
    return (
      <div className="bg-white border border-slate-200/90 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Success Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-slate-100">
          <div className="size-16 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-[#28a745] shadow-xs">
            <CheckCircle size={42} weight="fill" />
          </div>
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-shadhinata">
              আবেদন সফল হয়েছে
            </span>
            <h3 className="text-2xl sm:text-3xl font-shadhinata font-bold text-slate-900">
              তোমার প্রি-বুকিং সফলভাবে জমা হয়েছে!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              ধন্যবাদ! তোমার বিকাশ পেমেন্ট তথ্য আমাদের ডাটাবেজে যুক্ত হয়েছে। অ্যাডমিন টিম দ্রুত যাচাই সম্পন্ন করে তোমার আসন নিশ্চিত করবে।
            </p>
          </div>
        </div>

        {/* Digital Confirmation Receipt Card */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
            <span className="font-shadhinata font-bold text-slate-800 flex items-center gap-1.5">
              <Receipt size={16} className="text-[#0072c6]" weight="bold" />
              <span>ডিজিটাল প্রি-বুকিং রসিদ</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-100 border border-amber-300 text-amber-800 font-bold text-[11px]">
              যাচাইকরণাধীন (Pending)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
              <p className="font-bold text-slate-900 text-sm font-shadhinata">
                {submittedData.name}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-500">যোগাযোগ নম্বর:</span>
              <p className="font-mono font-bold text-slate-900">{submittedData.phone}</p>
            </div>
            {submittedData.email && (
              <div className="space-y-0.5">
                <span className="text-slate-500">ইমেইল:</span>
                <p className="font-mono text-slate-800">{submittedData.email}</p>
              </div>
            )}
            <div className="space-y-0.5">
              <span className="text-slate-500">শ্রেণি:</span>
              <p className="font-medium text-slate-800">{submittedData.grade}</p>
            </div>
            {submittedData.institution && (
              <div className="space-y-0.5 sm:col-span-2">
                <span className="text-slate-500">শিক্ষা প্রতিষ্ঠান:</span>
                <p className="font-medium text-slate-800">{submittedData.institution}</p>
              </div>
            )}
            <div className="space-y-0.5">
              <span className="text-slate-500">bKash Transaction ID:</span>
              <p className="font-mono font-bold text-[#0072c6] text-sm bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                {submittedData.transactionId}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-500">পরিশোধিত কোর্স ফি:</span>
              <p className="font-bold text-emerald-700 text-sm">
                ১৯৯৳ <span className="text-xs text-slate-500 font-normal">(৮০% ছাড় প্রাপ্ত)</span>
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>তারিখ: {submittedData.date}</span>
            <span className="font-mono">Ref: PRE_BOOK</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/status?query=${encodeURIComponent(submittedData.transactionId)}`}
            className="flex-1 py-3 px-4 rounded-xl bg-[#0072c6] hover:bg-[#005a9e] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>লাইভ স্ট্যাটাস চেক করুন</span>
            <ArrowRight size={16} weight="bold" />
          </Link>

          <button
            type="button"
            onClick={handleCopyReceiptText}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-slate-300 transition-all shrink-0"
          >
            {copiedReceipt ? (
              <>
                <Check size={16} weight="bold" className="text-emerald-600" />
                <span className="text-emerald-700 font-bold">রসিদ কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy size={16} weight="bold" />
                <span>রসিদ কপি করো</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                grade: "৫ম শ্রেণি (প্রাইমারি অলিম্পিয়াড)",
                institution: "",
                bkash: "",
                transactionId: "",
              });
            }}
            className="text-xs text-slate-500 hover:text-[#0072c6] underline underline-offset-2 flex items-center gap-1 mx-auto"
          >
            <ArrowClockwise size={14} />
            <span>অন্য কোনো শিক্ষার্থীর জন্য আরেকটি বুকিং করুন</span>
          </button>
        </div>
      </div>
    );
  }

  // STANDARD FORM STATE
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200/90 shadow-xl rounded-2xl p-6 sm:p-8 space-y-5"
    >
      {/* Form Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900">
            প্রি-বুকিং আবেদন ফরম
          </h3>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6] text-xs font-bold font-mono">
            ১৯৯৳
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          বিকাশে ১৯৯৳ সেন্ড মানি করার পর নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন।
        </p>
      </div>

      {/* Quick Reminder Strip */}
      <div className="bg-[#F0F7FF] border border-blue-200 rounded-xl p-3 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <CreditCard size={18} className="text-[#0072c6] shrink-0" weight="bold" />
          <span>
            bKash Personal: <strong className="font-mono text-[#0072c6]">01331366865</strong> | Ref:{" "}
            <strong className="font-mono text-slate-900">PRE_BOOK</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={handleQuickCopy}
          className="text-[11px] font-bold text-[#0072c6] hover:text-[#005a9e] underline shrink-0"
        >
          {copiedQuickNum ? "কপি হয়েছে!" : "নম্বর কপি"}
        </button>
      </div>

      {/* Error Message Alert */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs sm:text-sm font-medium animate-in fade-in">
          <WarningCircle size={20} className="shrink-0 text-rose-600 mt-0.5" weight="fill" />
          <span>{error}</span>
        </div>
      )}

      {/* Inputs Section */}
      <div className="space-y-4">
        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User size={14} className="text-slate-400" weight="bold" />
              <span>শিক্ষার্থীর পূর্ণ নাম *</span>
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="উদাঃ রাফিদ হাসান"
              className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" weight="bold" />
              <span>মোবাইল নম্বর *</span>
            </label>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-mono focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Row 2: Email and Grade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <EnvelopeSimple size={14} className="text-slate-400" weight="bold" />
              <span>ইমেইল ঠিকানা (ঐচ্ছিক)</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@example.com"
              className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <GraduationCap size={14} className="text-slate-400" weight="bold" />
              <span>শ্রেণি *</span>
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all cursor-pointer"
            >
              <option value="৩য় শ্রেণি">৩য় শ্রেণি</option>
              <option value="৪র্থ শ্রেণি">৪র্থ শ্রেণি</option>
              <option value="৫ম শ্রেণি (প্রাইমারি অলিম্পিয়াড)">৫ম শ্রেণি (প্রাইমারি অলিম্পিয়াড)</option>
              <option value="৬ষ্ঠ শ্রেণি (জুনিয়র)">৬ষ্ঠ শ্রেণি (জুনিয়র)</option>
              <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
              <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
              <option value="অন্যান্য (অভিভাবক/শিক্ষক)">অন্যান্য (অভিভাবক/শিক্ষক)</option>
            </select>
          </div>
        </div>

        {/* Row 3: Institution */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Buildings size={14} className="text-slate-400" weight="bold" />
            <span>স্কুল / শিক্ষা প্রতিষ্ঠানের নাম *</span>
          </label>
          <input
            required
            type="text"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="উদাঃ আইডিয়াল স্কুল অ্যান্ড কলেজ, মতিঝিল"
            className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Row 4: bKash sender number and TrxID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন *
            </label>
            <input
              required
              type="tel"
              value={formData.bkash}
              onChange={(e) => setFormData({ ...formData, bkash: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-mono focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all placeholder:text-slate-400"
            />
            <span className="text-[10px] text-slate-500 block">
              টাকা পাঠানো বিকাশ পার্সোনাল নম্বরটি দিন
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              bKash Transaction ID (TrxID) *
            </label>
            <input
              required
              type="text"
              value={formData.transactionId}
              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value.toUpperCase() })}
              placeholder="উদাঃ BK992817AX"
              className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-mono uppercase focus:bg-white focus:border-[#0072c6] focus:ring-1 focus:ring-[#0072c6] outline-none transition-all placeholder:text-slate-400"
            />
            <span className="text-[10px] text-slate-500 block">
              বিকাশ এসএমএস-এ প্রাপ্ত ট্রানজেকশন আইডি
            </span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white font-shadhinata font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>তথ্য সংরক্ষণ ও যাচাই হচ্ছে...</span>
          </span>
        ) : (
          <>
            <span>প্রি-বুক নিশ্চিত করো (১৯৯৳)</span>
            <ArrowRight weight="bold" size={18} />
          </>
        )}
      </button>

      {/* Footer Info & Status Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-[#28a745]" weight="fill" />
          <span>১০০% সুরক্ষিত ডাটা ও পেমেন্ট ট্র্যাকিং</span>
        </span>
        <Link
          href="/status"
          className="text-[#0072c6] hover:text-[#005a9e] hover:underline font-bold"
        >
          আগের বুকিং স্ট্যাটাস চেক করুন →
        </Link>
      </div>
    </form>
  );
}
