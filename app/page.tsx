"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Course } from "@/components/landing/course";
import { MockTests } from "@/components/landing/mock-tests";
import { Teacher } from "@/components/landing/teacher";
import { Prebook } from "@/components/landing/prebook";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { HalumAIModal } from "@/components/halum-ai-modal";
import { CashoutModal } from "@/components/cashout-modal";
import { Sparkle } from "@phosphor-icons/react";

export default function Home() {
  const [points, setPoints] = useState(120);
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

      <main className="flex flex-col">
        <Hero onOpenHalumAI={() => setIsHalumOpen(true)} />
        <Course />
        <MockTests />
        <Teacher />
        <Prebook />
        <Faq />
      </main>

      <Footer />

      {/* Floating Bottom-Right Tiger AI Tutor Button (Exact from Image 4) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsHalumOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <span className="text-lg">🐯</span>
          <span>Tiger AI Tutor</span>
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
        </button>
      </div>

      {/* Halum AI Modal */}
      <HalumAIModal isOpen={isHalumOpen} onClose={() => setIsHalumOpen(false)} />

      {/* 1000 pt = 100tk bKash Cashout Modal */}
      <CashoutModal
        isOpen={isCashoutOpen}
        onClose={() => setIsCashoutOpen(false)}
        points={points}
      />
    </>
  );
}