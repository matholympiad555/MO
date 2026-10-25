"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import {
  ArrowLeft,
  WarningCircle,
  CheckCircle,
  PaperPlaneTilt,
  Sparkle,
  Lightbulb,
  CodeBlock,
  Question,
  User,
  Phone,
} from "@phosphor-icons/react";

const TOPICS = [
  "সংখ্যাতত্ত্ব",
  "জ্যামিতি",
  "বীজগণিত",
  "কম্বিনেটোরিক্স",
  "প্যাটার্ন ও যুক্তি",
  "সাধারণ",
];

const CLASSES = [
  { label: "প্রাইমারি ক্যাটাগরি (Class 3-5)", value: "Class 3-5 (Primary)" },
  { label: "জুনিয়র ক্যাটাগরি (Class 6-8)", value: "Class 6-8 (Junior)" },
  { label: "সেকেন্ডারি ক্যাটাগরি (Class 9-10)", value: "Class 9-10 (Secondary)" },
  { label: "হায়ার সেকেন্ডারি (Class 11-12)", value: "Class 11-12 (Higher Secondary)" },
  { label: "অন্যান্য / শিক্ষক / অভিভাবক", value: "Other" },
];

export default function AskQuestionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    topic: "সংখ্যাতত্ত্ব",
    body: "",
    author_name: "",
    author_class: "Class 3-5 (Primary)",
    author_phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim() || !form.author_name.trim()) {
      setError("অনুগ্রহ করে শিরোনাম, বিস্তারিত বিবরণ এবং তোমার নাম পূরণ করো।");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "প্রশ্ন পোস্ট করা যায়নি।");
        setLoading(false);
        return;
      }

      router.push(`/qa/${data.data.id}`);
    } catch {
      setError("সার্ভার ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#F8FAFC] pt-10 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/qa"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#28a745] transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>সকল আলোচনা তালিকায় ফিরুন</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#218838] text-xs font-bold">
              <Sparkle size={14} weight="fill" />
              <span>GonitZoggo Community Forum</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold font-shadhinata text-slate-900 tracking-tight">
              নতুন প্রশ্ন পোস্ট করো
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              তোমার প্রশ্নটি স্পষ্ট ও সুন্দরভাবে লেখো যাতে মেন্টর ও সহপাঠীরা দ্রুত সঠিক গাণিতিক ব্যাখ্যা সহ সমাধান দিতে পারে।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-white border border-slate-200/90 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6"
            >
              {error && (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-sm flex items-center gap-2.5 font-medium">
                  <WarningCircle size={20} className="text-rose-600 shrink-0" weight="fill" />
                  <span>{error}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>প্রশ্নের শিরোনাম (এক লাইনে মূল সমস্যা) *</span>
                  <span className="text-[11px] text-slate-400 font-normal">সংক্ষিপ্ত ও স্পষ্ট</span>
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="উদাঃ ২^২০২৬ এর একক স্থানীয় অঙ্ক কীভাবে বের করব?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] focus:ring-2 focus:ring-[#28a745]/20 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Category Selector & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">ক্যাটাগরি / বিষয় *</label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] outline-none font-medium"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">শ্রেণি / লেভেল</label>
                  <select
                    value={form.author_class}
                    onChange={(e) => setForm({ ...form, author_class: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] outline-none font-medium"
                  >
                    {CLASSES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Body */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    প্রশ্নের বিস্তারিত বিবরণ (প্রশ্ন ও তোমার চেষ্টা) *
                  </label>
                  <span className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    সমীকরণ: $x^2 + y^2 = 25$
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="এখানে তোমার সমস্যা, সংখ্যা এবং তুমি কী চেষ্টা করেছ তা বিস্তারিত লেখো...&#10;গাণিতিক সমীকরণের জন্য $...$ বা $$...$$ ব্যবহার করতে পারো।"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] focus:ring-2 focus:ring-[#28a745]/20 outline-none resize-none leading-relaxed placeholder:text-slate-400"
                />
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">তোমার নাম *</label>
                  <input
                    required
                    value={form.author_name}
                    onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    placeholder="উদাঃ সাদিক তানভীর"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">মোবাইল নম্বর (ঐচ্ছিক)</label>
                  <input
                    value={form.author_phone}
                    onChange={(e) => setForm({ ...form, author_phone: e.target.value })}
                    placeholder="01XXXXXXXXX (উত্তর এলে জানানোর জন্য)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-[#28a745] outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit Button in #28a745 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#28a745] hover:bg-[#218838] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#28a745]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <PaperPlaneTilt size={20} weight="bold" />
                <span>{loading ? "প্রশ্ন প্রকাশ করা হচ্ছে..." : "প্রশ্ন পোস্ট করো"}</span>
              </button>
            </form>

            {/* Sidebar Guidelines */}
            <aside className="space-y-5">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Lightbulb size={20} weight="fill" className="text-amber-500" />
                  <span>ভালো প্রশ্ন করার টিপস</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-3 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#28a745] font-bold">১.</span>
                    <span>প্রশ্নের মূল শর্ত এবং তথ্যগুলো কোনো অংশ বাদ না দিয়ে সম্পূর্ণ লিখুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#28a745] font-bold">২.</span>
                    <span>নিজে কোন পর্যন্ত চেষ্টা করেছেন বা কোথায় আটকে গেছেন তা উল্লেখ করুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#28a745] font-bold">৩.</span>
                    <span>{"গাণিতিক সমীকরণ সুন্দর দেখাতে $x^2$ বা $\\binom{n}{r}$ ফরম্যাট ব্যবহার করতে পারেন।"}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                  <CheckCircle size={18} weight="fill" className="text-[#28a745]" />
                  <span>মেন্টর যাচাই সুবিধা</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  প্রতিটি সঠিক সমাধান বাংলাদেশ গণিত অলিম্পিয়াডের প্রশিক্ষক ও মেন্টরদের দ্বারা যাচাই করার পর ভেরিফায়েড ব্যাজ পায়।
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
