"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { HalumAIModal } from "@/components/halum-ai-modal";
import { CashoutModal } from "@/components/cashout-modal";
import { FloatingAIButton } from "@/components/floating-ai-button";
import { BookOpen, DownloadSimple, ArrowSquareOut, FilePdf } from "@phosphor-icons/react";

interface ResourceItem {
  year: string;
  category: string;
  title: string;
  description: string;
  pdfUrl: string;
}

const BDMO_RESOURCES: ResourceItem[] = [
  {
    year: "২০২৫",
    category: "প্রাইমারি ক্যাটাগরি (৩য়-৫ম)",
    title: "বাংলাদেশ গণিত অলিম্পিয়াড রিজিওনাল প্রশ্নপত্র",
    description: "বিগত বছরের প্রাথমিক অলিম্পিয়াডের ১০টি বাস্তব সমস্যা ও সম্পূর্ণ বাংলা সমাধান।",
    pdfUrl: "https://matholympiad.org.bd/",
  },
  {
    year: "২০২৫",
    category: "জুনিয়র ক্যাটাগরি (৬ষ্ঠ-৮ম)",
    title: "জাতীয় গণিত অলিম্পিয়াড ফাইনাল প্রশ্নব্যাংক",
    description: "সংখ্যাতত্ত্ব ও জ্যামিতির বাছাইকৃত কঠিন সমস্যা ও জাতীয় ক্যাম্পারদের সমাধান ট্রিকস।",
    pdfUrl: "https://matholympiad.org.bd/",
  },
  {
    year: "২০২৪",
    category: "প্রাইমারি ও জুনিয়র",
    title: "অলিম্পিয়াড প্রস্তুতির সিলেবাস ও টপিক গাইডলাইন",
    description: "প্রাথমিক ও জুনিয়র অলিম্পিয়াডে ভালো করার পূর্ণাঙ্গ রূপরেখা ও অধ্যায়ভিত্তিক টিপস।",
    pdfUrl: "https://matholympiad.org.bd/",
  },
  {
    year: "বই সংকলন",
    category: "রেফারেন্স বই",
    title: "চমক হাসান ও জাফর ইকবালের অলিম্পিয়াড বই তালিকা",
    description: "'নিঝুম রাতের গণিত', 'গণিতের মজা', এবং 'অঙ্ক ভাইয়ার গল্প' বইয়ের পড়ার ক্রম।",
    pdfUrl: "https://matholympiad.org.bd/",
  },
];

export default function ResourcesPage() {
  const [points] = useState(120);
  const [streak] = useState(4);
  const [isHalumOpen, setIsHalumOpen] = useState(false);
  const [isCashoutOpen, setIsCashoutOpen] = useState(false);

  return (
    <>
      <Nav
        points={points}
        streak={streak}
        onOpenHalumAI={() => setIsHalumOpen(true)}
        onOpenCashout={() => setIsCashoutOpen(true)}
      />

      <main className="min-h-screen bg-[#FAF9F6] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <BookOpen size={16} weight="fill" />
              <span>matholympiad.org.bd অনুপ্রাণিত রিসোর্স হাব</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              BDMO অফিসিয়াল অলিম্পিয়াড রিসোর্স ও প্রশ্নব্যাংক
            </h1>
            <p className="text-purple-100 text-sm sm:text-base max-w-2xl">
              বিগত বছরের আঞ্চলিক ও জাতীয় গণিত অলিম্পিয়াডের প্রশ্নপত্র, সিলেবাস গাইড ও বইয়ের তালিকা বিনামূল্যে সংগ্রহ করো।
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BDMO_RESOURCES.map((res, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      {res.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">{res.year}</span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 leading-snug">{res.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{res.description}</p>
                </div>

                <a
                  href={res.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FilePdf size={16} weight="fill" />
                  <span>প্রশ্নপত্র ও রিসোর্স সংগ্রহ করো ↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingAIButton onClick={() => setIsHalumOpen(true)} />
      <HalumAIModal isOpen={isHalumOpen} onClose={() => setIsHalumOpen(false)} />
      <CashoutModal isOpen={isCashoutOpen} onClose={() => setIsCashoutOpen(false)} points={points} />
    </>
  );
}