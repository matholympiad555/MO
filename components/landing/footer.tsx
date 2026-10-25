"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/content";
import {
  PhoneCall,
  WhatsappLogo,
  ShieldCheck,
  ArrowRight,
  LockKey,
  X,
  FileText,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t, language } = useLanguage();
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "refund" | null>(null);

  const collaborators = [
    { name: "Notre Dame Math Club", code: "NDMC", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/ndmc.png" },
    { name: "BD Olympiad on Astronomy", code: "BDOAA", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/bdoaa.png" },
    { name: "Gonit Gonona Porishod", code: "GGP", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/ggp.png" },
    { name: "Viqarunnisa Math Club", code: "VNMC", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/vnmc.png" },
    { name: "Bangladesh Bio Olympiad", code: "BBS", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/bbs.png" },
    { name: "Mastermind Science Club", code: "MSCSC", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/mscsc.png" },
    { name: "St. Joseph Math Club", code: "SMC", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/smc.png" },
    { name: "Chattogram Math Club", code: "CMC", img: "https://gzcdn.sgp1.cdn.digitaloceanspaces.com/assets/v4.14.0/images/clubs/cmc.png" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container-x">
        {/* Pre-book CTA Banner in GonitZoggo Signature Style */}
        <section
          id="prebook-cta"
          className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#005a9e] via-[#0072c6] to-[#0284c7] text-white shadow-xl relative overflow-hidden"
        >
          {/* Subtle math grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{language === "bn" ? "প্রি-বুকিং অফার চলছে" : "Pre-Booking Offer Active"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-shadhinata font-bold text-white tracking-tight leading-snug">
              {language === "bn"
                ? "আজই তোমার অলিম্পিয়াড সিট নিশ্চিত করো!"
                : "Secure Your Olympiad Seat Today!"}
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              {language === "bn"
                ? "কোর্স ফি মাত্র ১৯৯ টাকা! লাইভ ক্লাস, রেকর্ডিং, ২০+ মক টেস্ট ও সার্বক্ষণিক মেন্টরশিপের সুযোগ গ্রহণ করো।"
                : "Course fee only 199 BDT! Get live interactive classes, full recordings, 20+ mock tests, and 24/7 dedicated mentorship."}
            </p>
          </div>

          <a
            href="#prebook"
            className="px-7 py-3.5 bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white rounded-xl font-shadhinata font-bold text-base shadow-lg transition-transform active:scale-95 shrink-0 relative z-10 flex items-center gap-2 border border-emerald-400/40"
          >
            <span>{language === "bn" ? "প্রি-বুক করো" : "Pre-Book Now"}</span>
            <span className="bg-white/25 px-2 py-0.5 rounded text-xs font-mono font-bold">
              {language === "bn" ? "১৯৯৳" : "199 BDT"}
            </span>
            <ArrowRight size={16} weight="bold" />
          </a>
        </section>

        {/* STEM Organization Collaborators Section */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              STEM & Olympiad Collaborators
            </span>
            <h3 className="text-lg sm:text-xl font-shadhinata font-bold text-white">
              {language === "bn"
                ? "শীর্ষ অলিম্পিয়াড ও বিজ্ঞান ক্লাবের যৌথ সহযোগিতা"
                : "Joint Collaboration with Top Olympiad & Science Clubs"}
            </h3>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              {language === "bn"
                ? "বাংলাদেশের স্কুল-কলেজের শীর্ষ গণিত ও বিজ্ঞান ক্লাবের পারস্পরিক নেটওয়ার্কিং ও সহযাত্রী হিসেবে পরিচালিত"
                : "Operated in collaboration with leading school and college math & science club networks in Bangladesh"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 pt-2">
            {collaborators.map((club, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 transition-colors group"
                title={club.name}
              >
                <div className="h-10 w-full flex items-center justify-center mb-1.5 overflow-hidden">
                  <img
                    src={club.img}
                    alt={club.code}
                    className="max-h-8 max-w-[80%] object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-300 font-mono tracking-wider">
                  {club.code}
                </span>
                <span className="text-[9px] text-slate-400 line-clamp-1 text-center font-normal">
                  {club.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0072c6] text-white font-shadhinata font-bold flex items-center justify-center rounded-xl text-xl shadow-md border border-blue-400/30">
                ∑
              </div>
              <div>
                <span className="font-shadhinata font-bold text-lg text-white block">
                  {language === "bn" ? site.nameBn : "Tiger Math Bangladesh"}
                </span>
                <span className="text-[11px] text-slate-400">The Playground for Problem Solvers</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-body">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck size={18} weight="fill" />
              <span>
                {language === "bn"
                  ? "১০০% নিরাপদ ও স্বচ্ছ ভেরিফিকেশন ব্যবস্থা"
                  : "100% Secure & Transparent Verification"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-shadhinata font-bold text-sm tracking-wide">
              {t.footerQuickLinks}
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-400">
              <Link href="/mock-tests" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{language === "bn" ? "• অনলাইন মক টেস্ট পোর্টাল" : "• Online Mock Test Portal"}</span>
              </Link>
              <Link href="/qa" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{language === "bn" ? "• প্রশ্নোত্তর ফোরাম (Q&A)" : "• Q&A Discussion Forum"}</span>
              </Link>
              <Link href="/status" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{language === "bn" ? "• বুকিং ভেরিফিকেশন স্ট্যাটাস" : "• Booking Verification Status"}</span>
              </Link>
              <a href="#course" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{language === "bn" ? "• কোর্স কারিকুলাম ও সিলেবাস" : "• Course Curriculum & Syllabus"}</span>
              </a>
              <a href="#teacher" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>{language === "bn" ? "• মেন্টর প্যানেল ও প্রশিক্ষক" : "• Instructors & Mentors Panel"}</span>
              </a>
            </div>
          </div>

          {/* Helpline & Payment */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-shadhinata font-bold text-sm tracking-wide">
              {t.footerHelpline}
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">bKash Personal:</div>
                <div className="text-sm font-bold text-amber-300 font-mono tracking-wider">
                  +8801331366865
                </div>
                <div className="text-[10px] text-slate-400">
                  {language === "bn" ? "রেফারেন্স: " : "Reference: "}
                  <span className="text-white font-bold font-mono">PRE_BOOK</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <a
                  href="https://wa.me/8801331366865"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>WhatsApp: +8801331366865</span>
                </a>
                <a
                  href="tel:+8801331366865"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <PhoneCall size={16} weight="fill" />
                  <span>
                    {language === "bn" ? "হেল্পলাইন: ০১৩৩১-৩৬৬৮৬৫" : "Helpline: +8801331366865"}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Legal & Admin */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-shadhinata font-bold text-sm tracking-wide">
              {language === "bn" ? "পলিসি ও অ্যাডমিন" : "Policies & Admin"}
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-400">
              <button
                onClick={() => setActiveModal("privacy")}
                className="text-left hover:text-amber-400 transition-colors cursor-pointer"
              >
                {language === "bn" ? "গোপনীয়তা নীতি (Privacy)" : "Privacy Policy"}
              </button>
              <button
                onClick={() => setActiveModal("terms")}
                className="text-left hover:text-amber-400 transition-colors cursor-pointer"
              >
                {language === "bn" ? "ব্যবহারের নিয়মাবলি (Terms)" : "Terms of Service"}
              </button>
              <button
                onClick={() => setActiveModal("refund")}
                className="text-left hover:text-amber-400 transition-colors cursor-pointer"
              >
                {language === "bn" ? "রিফান্ড ও পেমেন্ট পলিসি" : "Refund & Payment Policy"}
              </button>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
                >
                  <LockKey size={13} weight="bold" />
                  <span>{t.adminPortal}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            {t.footerCopyright}
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by GonitZoggo Portal Engine</span>
            <span>•</span>
            <span>Made with ❤️ for Bangladeshi Students</span>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-50 text-[#0072c6] flex items-center justify-center">
                <FileText size={22} weight="bold" />
              </div>
              <h3 className="text-xl font-shadhinata font-bold text-slate-900">
                {activeModal === "privacy" &&
                  (language === "bn" ? "গোপনীয়তা নীতি (Privacy Policy)" : "Privacy Policy")}
                {activeModal === "terms" &&
                  (language === "bn" ? "ব্যবহারের শর্তাবলি (Terms of Service)" : "Terms of Service")}
                {activeModal === "refund" &&
                  (language === "bn" ? "রিফান্ড ও পেমেন্ট নীতিমালা" : "Refund & Payment Policy")}
              </h3>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-1">
              {activeModal === "privacy" && (
                <>
                  <p>
                    {language === "bn"
                      ? "আমরা শিক্ষার্থীদের তথ্যের সর্বোচ্চ সুরক্ষা ও গোপনীয়তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ।"
                      : "We are committed to maintaining the highest security and privacy for students' personal information."}
                  </p>
                  <p>
                    <strong>{language === "bn" ? "তথ্য সংগ্রহ: " : "Data Collection: "}</strong>
                    {language === "bn"
                      ? "রেজিস্ট্রেশন ও পেমেন্ট ভেরিফিকেশনের জন্য শিক্ষার্থীর নাম, শ্রেণি, স্কুল এবং বিকাশ ট্রানজেকশন আইডি সংগ্রহ করা হয়।"
                      : "We collect student name, grade, school, and bKash transaction ID exclusively for registration and verification."}
                  </p>
                  <p>
                    <strong>{language === "bn" ? "তথ্যের ব্যবহার: " : "Data Usage: "}</strong>
                    {language === "bn"
                      ? "সংগৃহীত কোনো তথ্য কোনো তৃতীয় পক্ষের কাছে হস্তান্তর বা বিক্রি করা হয় না। শুধুমাত্র ক্লাস লিংক ও নোটিফিকেশনের প্রয়োজনে ব্যবহার করা হয়।"
                      : "No collected data is shared with or sold to third parties. Information is used solely for class access and notifications."}
                  </p>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p>
                    {language === "bn"
                      ? "১. প্রি-বুকিং সম্পূর্ণ করার পর শিক্ষার্থীকে নির্ধারিত ব্যাচে অন্তর্ভুক্ত করা হবে।"
                      : "1. Upon pre-booking submission, students will be assigned to their designated batch."}
                  </p>
                  <p>
                    {language === "bn"
                      ? "২. ক্লাসের রেকর্ডিং ও স্টাডি মেটেরিয়াল ব্যক্তিগত অনুশীলনের জন্য সংরক্ষিত। এটি বাণিজ্যিকভাবে বিতরণ বা পুনরায় প্রকাশ নিষিদ্ধ।"
                      : "2. Class recordings and study materials are for personal student study only. Commercial distribution is strictly prohibited."}
                  </p>
                  <p>
                    {language === "bn"
                      ? "৩. ক্লাসে সৌহার্দ্যপূর্ণ আচরণ ও শিক্ষণবান্ধব পরিবেশ বজায় রাখা সকল শিক্ষার্থীর দায়িত্ব।"
                      : "3. Students are expected to maintain respect and a positive learning environment during all interactive live sessions."}
                  </p>
                </>
              )}

              {activeModal === "refund" && (
                <>
                  <p>
                    {language === "bn"
                      ? "১. সঠিক TrxID দিয়ে সাবমিট করার পর দ্রুততম সময়ে আপনার পেমেন্ট ভেরিফাই করা হবে।"
                      : "1. Payments are verified promptly upon submitting a valid bKash TrxID."}
                  </p>
                  <p>
                    {language === "bn"
                      ? "২. যদি কোনো শিক্ষার্থী ভুলবশত অতিরিক্ত টাকা প্রদান করে, তবে আমাদের হেল্পলাইনে (+8801331366865) প্রমাণসহ জানালে ২৪ ঘণ্টার মধ্যে অতিরিক্ত অর্থ ফেরত দেওয়া হবে।"
                      : "2. In case of duplicate or excess payment, contact our helpline (+8801331366865) with proof for a full excess refund within 24 hours."}
                  </p>
                  <p>
                    {language === "bn"
                      ? "৩. ক্লাস শুরুর পূর্বে কোনো শিক্ষার্থী যৌক্তিক কারণে কোর্স ত্যাগ করতে চাইলে হেল্পলাইনে যোগাযোগ করতে পারে।"
                      : "3. If a student needs to withdraw prior to the start of classes due to valid reasons, please reach out to our helpline."}
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {language === "bn" ? "বন্ধ করুন" : "Close"}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
