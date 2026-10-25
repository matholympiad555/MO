"use client";

import { useState } from "react";
import { CaretDown, ChatCircleDots } from "@phosphor-icons/react";
import { faqFallback, site } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-t border-slate-200/80">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ChatCircleDots size={15} weight="bold" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
            সাধারণ জিজ্ঞাসাসমূহ
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            কোর্স, পেমেন্ট বা ক্লাস সংক্রান্ত সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবে। আরও জানার থাকলে আমাদের সরাসরি ইনবক্স করতে পারো।
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-all shadow-xs"
          >
            <span>💬 হোয়াটসঅ্যাপে ইনবক্স করুন</span>
          </a>
        </div>
        
        <div className="lg:col-span-8 space-y-3">
          {faqFallback.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/50 overflow-hidden transition-all"
            >
              <button 
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="w-full flex justify-between items-center p-5 text-left text-slate-900 font-display font-bold text-base sm:text-lg hover:text-blue-700 transition-colors"
                aria-expanded={open === idx}
              >
                <span>{item.question}</span>
                <CaretDown
                  size={18}
                  weight="bold"
                  className={`text-slate-400 transition-transform duration-200 ${
                    open === idx ? "rotate-180 text-blue-700" : ""
                  }`}
                />
              </button>
              {open === idx && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
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
