"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  CaretDown,
  ChatCircleDots,
  Question,
  VideoCamera,
  PlayCircle,
  Clock,
  Exam,
  WhatsappLogo,
  PhoneCall,
  CheckCircle,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

interface FaqItem {
  id: string;
  category: "class" | "payment" | "mock" | "general";
  question: string;
  answer: string;
  icon: any;
}

export function Faq() {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string>("class-method");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { label: language === "bn" ? "সকল প্রশ্ন" : "All Questions", value: "all" },
    { label: language === "bn" ? "ক্লাস ও রেকর্ডিং" : "Classes & Recordings", value: "class" },
    { label: language === "bn" ? "পেমেন্ট ও ভেরিফিকেশন" : "Payment & Verification", value: "payment" },
    { label: language === "bn" ? "মক টেস্ট ও সহায়তা" : "Mock Tests & Support", value: "mock" },
  ];

  const faqList: FaqItem[] = [
    {
      id: "class-method",
      category: "class",
      icon: VideoCamera,
      question: language === "bn" ? "ক্লাস কীভাবে হবে?" : t.faqQ1,
      answer:
        language === "bn"
          ? "ক্লাসগুলো Google Meet / Zoom-এ সরাসরি লাইভ পরিচালিত হবে। প্রতিটি ক্লাসে মুখস্থের বাইরে গিয়ে সমস্যা বিশ্লেষণ, গাণিতিক যুক্তি ও কনসেপ্ট শেখানো হবে। শিক্ষার্থীরা সরাসরি মাইক ও চ্যাটে প্রশ্ন করতে পারবে। ক্লাসের জয়েনিং লিংক ও সাপ্তাহিক রুটিন ভেরিফাইড শিক্ষার্থীদের হোয়াটসঅ্যাপ গ্রুপ ও এসএমএসে জানিয়ে দেওয়া হবে।"
          : t.faqA1,
    },
    {
      id: "recording",
      category: "class",
      icon: PlayCircle,
      question: language === "bn" ? "রেকর্ডিং পাওয়া যাবে কি?" : t.faqQ2,
      answer:
        language === "bn"
          ? "হ্যাঁ, অবশ্যই! কোনো কারণে লাইভ ক্লাস মিস হলে বা পুনরায় রিভিশন দিতে চাইলে প্রতিটি ক্লাসের সম্পূর্ণ এইচডি রেকর্ডিং ও লেকচার শিট পোর্টালের আর্কাইভে আপলোড করা হবে। কোর্স চলাকালীন এবং অলিম্পিয়াড পরীক্ষা পর্যন্ত যেকোনো সময় যতবার ইচ্ছা রেকর্ডিং দেখা যাবে।"
          : t.faqA2,
    },
    {
      id: "payment-verify",
      category: "payment",
      icon: Clock,
      question: language === "bn" ? "পেমেন্ট ভেরিফাই হতে কতক্ষণ লাগে?" : t.faqQ3,
      answer:
        language === "bn"
          ? "বিকাশ করার পর ফর্ম সাবমিট করলে সাধারণত ৫ থেকে ৩০ মিনিটের মধ্যে আমাদের অ্যাডমিন প্যানেল ট্রানজেকশন আইডি (TrxID) মিলিয়ে সিট কনফার্ম করে দেয়। তুমি ওয়েবসাইটের 'স্ট্যাটাস চেক' পেজে তোমার ফোন নম্বর বা TrxID দিয়ে তাৎক্ষণিক ভেরিফিকেশন স্টেটাস ও রোল দেখতে পারবে।"
          : t.faqA3,
    },
    {
      id: "mock-test",
      category: "mock",
      icon: Exam,
      question: language === "bn" ? "মক টেস্ট কীভাবে দিব?" : t.faqQ4,
      answer:
        language === "bn"
          ? "আমাদের রয়েছে GonitZoggo স্টাইলে আধুনিক অনলাইন মক টেস্ট প্ল্যাটফর্ম। সেখানে শিক্ষার্থীরা অলিম্পিয়াড স্ট্যান্ডার্ড ২০+ পূর্ণাঙ্গ মক টেস্ট সরাসরি টাইমার সহ অনলাইনে দিতে পারবে। সাবমিট করার সাথে সাথেই তাৎক্ষণিক স্কোরকার্ড, সঠিক উত্তরের বিস্তারিত ব্যাখ্যা ও র‍্যাঙ্কিং দেখতে পাবে।"
          : t.faqA4,
    },
    {
      id: "payment-process",
      category: "payment",
      icon: CheckCircle,
      question:
        language === "bn"
          ? "কোর্স ফি কত এবং কীভাবে পেমেন্ট করব?"
          : "What is the course fee and how do I pay?",
      answer:
        language === "bn"
          ? "কোর্স ফি মাত্র ১৯৯ টাকা (এককালীন অফার ফি)। bKash Personal নম্বর ০১৩৩১৩৬৬৮৬৫-এ 'Send Money' করুন। Reference ঘরে লিখুন 'PRE_BOOK'। টাকা পাঠানোর পর প্রাপ্ত ফিরতি এসএমএস থেকে Transaction ID (TrxID) কপি করে আমাদের প্রি-বুক ফর্মে লিখে সাবমিট করুন।"
          : "The course fee is only 199 BDT (special discounted fee). Send Money to personal bKash 01331366865 with Reference 'PRE_BOOK'. After sending money, copy the Transaction ID (TrxID) from your bKash SMS and submit it in our pre-booking form.",
    },
    {
      id: "help-contact",
      category: "general",
      icon: Question,
      question:
        language === "bn"
          ? "কোনো সমস্যা বা প্রশ্ন থাকলে কীভাবে সহায়তা পাব?"
          : "How can I get help if I have any questions?",
      answer:
        language === "bn"
          ? "আমাদের ২৪/৭ স্টুডেন্ট হেল্প ডেস্ক এবং ডেডিকেটেড Q&A ডিসকাশন ফোরাম রয়েছে। এছাড়া যেকোনো সহায়তার জন্য হেল্পলাইন নম্বর +8801331366865 অথবা সরাসরি হোয়াটসঅ্যাপে মেসেজ দিলে আমাদের টিম তাৎক্ষণিক সহায়তা করবে।"
          : "We have a 24/7 student help desk and dedicated Q&A forum. For direct help, call our helpline +8801331366865 or message us on WhatsApp.",
    },
  ];

  const filteredFaqs = faqList.filter((item) =>
    activeCategory === "all"
      ? true
      : item.category === activeCategory || (activeCategory === "mock" && item.category === "general")
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F6F6F4] border-t border-slate-200/80">
      <div className="container-x">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0072c6] text-xs font-semibold">
              <ChatCircleDots size={16} weight="bold" />
              <span>{t.faqTag}</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-shadhinata font-bold text-slate-900 tracking-tight leading-tight">
              {t.faqTitle}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {t.faqSubtitle}
            </p>
          </Reveal>

          {/* Filter Chips */}
          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-[#0072c6] text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Main Grid: FAQs Accordion + Help Desk Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion List */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              const IconComponent = faq.icon;

              return (
                <Reveal key={faq.id} delay={idx * 60}>
                  <div
                    className={`rounded-2xl border transition-all duration-200 bg-white ${
                      isOpen
                        ? "border-[#0072c6] shadow-sm ring-1 ring-[#0072c6]/10"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? "" : faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? "bg-blue-50 text-[#0072c6]"
                              : "bg-slate-50 text-slate-500"
                          }`}
                        >
                          <IconComponent size={20} weight={isOpen ? "fill" : "regular"} />
                        </div>
                        <span
                          className={`font-shadhinata font-bold text-base sm:text-lg transition-colors ${
                            isOpen ? "text-[#0072c6]" : "text-slate-900"
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`size-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? "bg-blue-50 text-[#0072c6] rotate-180"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        <CaretDown size={14} weight="bold" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-body">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Help Desk Support Card */}
          <div className="lg:col-span-4">
            <Reveal delay={250}>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0072c6] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {language === "bn" ? "সরাসরি সাপোর্ট" : "Direct Support"}
                  </span>
                  <h3 className="text-xl font-shadhinata font-bold text-slate-900">
                    {language === "bn" ? "আরও কোনো প্রশ্ন আছে?" : "Have More Questions?"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === "bn"
                      ? "আমাদের সাপোর্ট টিম সকাল ৯টা থেকে রাত ১১টা পর্যন্ত সক্রিয় থাকে। নির্দ্বিধায় মেসেজ দিন।"
                      : "Our support team is available daily from 9:00 AM to 11:00 PM. Feel free to message us."}
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <a
                    href="https://wa.me/8801331366865"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors group"
                  >
                    <div className="size-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <WhatsappLogo size={20} weight="fill" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950">
                        {language === "bn" ? "হোয়াটসঅ্যাপ হেল্পলাইন" : "WhatsApp Helpline"}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-mono">+8801331366865</div>
                    </div>
                  </a>

                  <a
                    href="tel:+8801331366865"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors group"
                  >
                    <div className="size-9 rounded-lg bg-[#0072c6] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <PhoneCall size={20} weight="fill" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {language === "bn" ? "সরাসরি কল সেন্টার" : "Direct Call Center"}
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono">০১৩৩১-৩৬৬৮৬৫</div>
                    </div>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-700 text-xs space-y-1.5">
                  <div className="font-bold text-[#0072c6] flex items-center gap-1.5">
                    <CheckCircle size={15} weight="fill" />
                    <span>{language === "bn" ? "দ্রুত পেমেন্ট সহায়তা" : "Quick Payment Support"}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {language === "bn"
                      ? "bKash ট্রানজেকশনে কোনো সমস্যা হলে TrxID সহ হোয়াটসঅ্যাপে স্ক্রিনশট পাঠালে ৫ মিনিটে সমাধান করা হবে।"
                      : "If you face any issues with your bKash payment, send a screenshot with your TrxID on WhatsApp for resolution in 5 minutes."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
