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
      <main className="min-h-screen pt-32 pb-24 container-x max-w-3xl">
        <div className="mb-8">
          <Link
            href="/qa"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-paper transition-colors"
          >
            <ArrowLeft size={16} /> প্রশ্নোত্তর তালিকায় ফিরুন
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-paper mt-3">
            নতুন গণিত প্রশ্ন জিজ্ঞেস করো
          </h1>
          <p className="text-muted text-sm mt-1">
            তোমার প্রশ্নটি স্পষ্ট ও সুন্দরভাবে লেখো যাতে মেন্টর ও বন্ধুরা দ্রুত সঠিক সমাধান দিতে পারে।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-shell p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-sm flex items-center gap-2">
              <WarningCircle size={20} className="text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-paper/90">
              প্রশ্নের শিরোনাম (এক লাইনে মূল সমস্যা) *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="উদাঃ ২^২০২৬ এর একক স্থানীয় অঙ্ক কীভাবে বের করব?"
              className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3.5 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-paper/90">টপিক / বিষয় *</label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-ink-2 border border-white/15 rounded-xl p-3.5 text-sm text-paper focus:border-brand outline-none"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-paper/90">শ্রেণি</label>
              <select
                value={form.author_class}
                onChange={(e) => setForm({ ...form, author_class: e.target.value })}
                className="w-full bg-ink-2 border border-white/15 rounded-xl p-3.5 text-sm text-paper focus:border-brand outline-none"
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

          <div className="space-y-2">
            <label className="text-xs font-semibold text-paper/90">
              প্রশ্নের বিস্তারিত বিবরণ (সমস্যাটি বিস্তারিত লেখো) *
            </label>
            <textarea
              required
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="এখানে তোমার সমস্যা, সংখ্যা এবং তুমি কী চেষ্টা করেছ তা বিস্তারিত লেখো..."
              className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3.5 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-paper/90">তোমার নাম *</label>
              <input
                required
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                placeholder="উদাঃ সাকিব আহমেদ"
                className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3.5 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-paper/90">মোবাইল নম্বর (ঐচ্ছিক)</label>
              <input
                value={form.author_phone}
                onChange={(e) => setForm({ ...form, author_phone: e.target.value })}
                placeholder="01XXXXXXXXX"
                className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3.5 text-sm text-paper focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-brand text-ink font-display font-bold text-base hover:bg-brand-deep active:scale-95 transition-all shadow-xl shadow-brand/10 disabled:opacity-50"
          >
            {loading ? "পোস্ট করা হচ্ছে..." : "প্রশ্ন পোস্ট করো"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
