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
import { FloatingAIButton } from "@/components/floating-ai-button";
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
      <FloatingAIButton onClick={() => setIsHalumOpen(true)} />

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