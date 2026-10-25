"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { ArrowLeft, WarningCircle, CheckCircle } from "@phosphor-icons/react";

const TOPICS = ["সংখ্যাতত্ত্ব", "জ্যামিতি", "প্যাটার্ন ও যুক্তি", "গণনাতত্ত্ব", "সাধারণ"];

export default function AskQuestionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    topic: "সংখ্যাতত্ত্ব",
    body: "",
    author_name: "",
    author_class: "Class 5",
    author_phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <main className="min-h-screen pt-12 pb-24 container-x max-w-3xl">
        <div className="mb-8">
          <Link
            href="/qa"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={16} /> প্রশ্নোত্তর তালিকায় ফিরুন
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-900 mt-3">
            নতুন গণিত প্রশ্ন জিজ্ঞেস করো
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            তোমার প্রশ্নটি স্পষ্ট ও সুন্দরভাবে লেখো যাতে মেন্টর ও বন্ধুরা দ্রুত সঠিক সমাধান দিতে পারে।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-shell p-7 sm:p-9 space-y-6 bg-white border border-slate-200/90 shadow-xl rounded-3xl">
          {error && (
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-sm flex items-center gap-2 font-medium">
              <WarningCircle size={20} className="text-rose-600 shrink-0" weight="fill" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              প্রশ্নের শিরোনাম (এক লাইনে মূল সমস্যা) *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="উদাঃ ২^২০২৬ এর একক স্থানীয় অঙ্ক কীভাবে বের করব?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">টপিক / বিষয় *</label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">শ্রেণি</label>
              <select
                value={form.author_class}
                onChange={(e) => setForm({ ...form, author_class: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              >
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7-8">Class 7-8</option>
                <option value="Other">অন্যান্য</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              প্রশ্নের বিস্তারিত বিবরণ (সমস্যাটি বিস্তারিত লেখো) *
            </label>
            <textarea
              required
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="এখানে তোমার সমস্যা, সংখ্যা এবং তুমি কী চেষ্টা করেছ তা বিস্তারিত লেখো..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none leading-relaxed placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">তোমার নাম *</label>
              <input
                required
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                placeholder="উদাঃ সাকিব আহমেদ"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">মোবাইল নম্বর (ঐচ্ছিক)</label>
              <input
                value={form.author_phone}
                onChange={(e) => setForm({ ...form, author_phone: e.target.value })}
                placeholder="01XXXXXXXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-display font-bold text-base shadow-md shadow-blue-700/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "পোস্ট করা হচ্ছে..." : "প্রশ্ন পোস্ট করো"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
