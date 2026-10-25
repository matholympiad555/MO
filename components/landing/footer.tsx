import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/5 py-16">
      <div className="container-x">
        <section id="prebook-cta" className="mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 rounded-[2rem] p-8 md:p-12 bg-ink-2 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-paper">আজই তোমার সিট কনফার্ম করো</h2>
            <p className="text-muted text-sm md:text-base">কোর্স ফি মাত্র ১৯৯ টাকা! সীমিত সংখ্যক আসনের জন্য প্রি-বুকিং চলছে।</p>
          </div>
          <a href="#prebook" className="px-10 py-4 bg-brand text-ink rounded-full font-display font-bold text-lg hover:bg-brand-deep transition-transform active:scale-[0.98] shrink-0 shadow-xl shadow-brand/20">
            প্রি-বুক করো (১৯৯৳)
          </a>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1 space-y-3">
            <div className="w-12 h-12 bg-brand text-ink font-display font-black flex items-center justify-center rounded-xl text-2xl shadow-lg shadow-brand/20">
              B
            </div>
            <div className="text-paper font-display font-bold">{site.nameBn}</div>
            <p className="text-muted font-body text-xs leading-relaxed">
              {site.tagline}। গণিতকে ভয় নয়, যুক্তি দিয়ে গণিতকে জয় করো!
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-paper font-display font-bold text-sm">গুরুত্বপূর্ণ লিংক</h4>
            <div className="flex flex-col space-y-2 text-xs text-muted">
              <Link href="/mock-tests" className="hover:text-brand transition-colors">অনলাইন মক টেস্ট</Link>
              <Link href="/qa" className="hover:text-brand transition-colors">প্রশ্নোত্তর ফোরাম (Q&A)</Link>
              <Link href="/status" className="hover:text-brand transition-colors">বুকিং স্ট্যাটাস চেক</Link>
              <a href="#course" className="hover:text-brand transition-colors">কোর্স মডিউল ও বিষয়বস্তু</a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-paper font-display font-bold text-sm">পেমেন্ট ও যোগাযোগ</h4>
            <div className="text-xs text-muted space-y-1.5 font-mono">
              <p>bKash: <span className="text-paper font-bold">{site.bkashDisplay}</span></p>
              <p>Reference: <span className="text-brand font-bold">{site.reference}</span></p>
              <p>WhatsApp: <a href={site.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">মেসেজ দিন</a></p>
            </div>
          </div>

          <div className="space-y-3 md:text-right">
            <h4 className="text-paper font-display font-bold text-sm">অ্যাডমিন</h4>
            <p className="text-xs text-muted">
              পেমেন্ট ভেরিফিকেশন ও ম্যানেজমেন্টের জন্য
            </p>
            <Link
              href="/admin"
              className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted hover:text-brand hover:border-brand/40 transition-colors"
            >
              🛡️ অ্যাডমিন পোর্টাল
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <div>© ২০২৬ {site.nameBn}। সর্বস্বত্ব সংরক্ষিত।</div>
          <div className="text-muted/60">Math Olympiad Bangladesh — যুক্তির শক্তিতে এগিয়ে চলো</div>
        </div>
      </div>
    </footer>
  );
}
