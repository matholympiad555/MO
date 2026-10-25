import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12">
      <div className="container-x">
        {/* Pre-book CTA Banner */}
        <section
          id="prebook-cta"
          className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl p-8 md:p-12 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h2 className="text-2xl md:text-4xl font-display font-black text-white">
              আজই তোমার অলিম্পিয়াড সিট নিশ্চিত করো!
            </h2>
            <p className="text-blue-100 text-sm md:text-base max-w-xl">
              কোর্স ফি মাত্র ১৯৯ টাকা! সীমিত সংখ্যক আসনের জন্য প্রি-বুকিং অফার চালু রয়েছে।
            </p>
          </div>
          <a
            href="#prebook"
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-display font-black text-base shadow-lg shadow-amber-400/20 transition-transform active:scale-95 shrink-0 relative z-10"
          >
            প্রি-বুক করো (১৯৯৳)
          </a>
        </section>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="space-y-3">
            <div className="w-11 h-11 bg-blue-700 text-white font-display font-black flex items-center justify-center rounded-xl text-xl shadow-md">
              <span className="text-amber-400">B</span>
            </div>
            <div className="text-white font-display font-bold text-base">{site.nameBn}</div>
            <p className="text-slate-400 font-body text-xs leading-relaxed">
              {site.tagline}। গণিতকে ভয় নয়, যুক্তি দিয়ে গণিতকে জয় করো!
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-display font-bold text-sm">গুরুত্বপূর্ণ ফিচার</h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-400">
              <Link href="/mock-tests" className="hover:text-amber-400 transition-colors">অনলাইন মক টেস্ট প্ল্যাটফর্ম</Link>
              <Link href="/qa" className="hover:text-amber-400 transition-colors">প্রশ্নোত্তর ফোরাম (Q&A)</Link>
              <Link href="/status" className="hover:text-amber-400 transition-colors">বুকিং ভেরিফিকেশন স্ট্যাটাস</Link>
              <a href="#course" className="hover:text-amber-400 transition-colors">কোর্স মডিউল ও বিষয়বস্তু</a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-white font-display font-bold text-sm">পেমেন্ট ও যোগাযোগ</h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-mono">
              <p>bKash Personal: <span className="text-white font-bold">{site.bkashDisplay}</span></p>
              <p>Payment Ref: <span className="text-amber-400 font-bold">{site.reference}</span></p>
              <p>WhatsApp: <a href={site.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">মেসেজ দিন</a></p>
            </div>
          </div>

          <div className="space-y-3 md:text-right">
            <h4 className="text-white font-display font-bold text-sm">অ্যাডমিন</h4>
            <p className="text-xs text-slate-400">
              পেমেন্ট যাচাই ও ম্যানেজমেন্টের জন্য
            </p>
            <Link
              href="/admin"
              className="inline-block px-4 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
            >
              🛡️ অ্যাডমিন পোর্টাল
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© ২০২৬ {site.nameBn}। সর্বস্বত্ব সংরক্ষিত।</div>
          <div>Math Olympiad Bangladesh — যুক্তির শক্তিতে এগিয়ে চলো</div>
        </div>
      </div>
    </footer>
  );
}
