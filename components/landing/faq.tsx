"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { faqFallback } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 bg-ink-3">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-3xl text-paper font-display">সাধারণ জিজ্ঞাসাসমূহ</h2>
          <p className="text-muted">আপনার কি আরও প্রশ্ন আছে? আমাদের হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।</p>
          <button className="px-6 py-3 rounded-full border border-white/20 text-paper hover:bg-white/5 transition-all">হোয়াটসঅ্যাপে মেসেজ দাও</button>
        </div>
        
        <div className="lg:col-span-8 space-y-2">
          {faqFallback.map((item, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button 
                onClick={() => setOpen(idx)}
                className="w-full flex justify-between items-center py-6 text-left text-paper font-semibold"
                aria-expanded={open === idx}
              >
                {item.question}
                <CaretDown className={`transition-transform ${open === idx ? "rotate-180" : ""}`} />
              </button>
              {open === idx && (
                <div className="pb-6 text-muted leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
