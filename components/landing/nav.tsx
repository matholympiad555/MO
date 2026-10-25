"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { List, X, Shield } from "@phosphor-icons/react";
import { navLinks } from "@/lib/content";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-6 left-0 right-0 z-40 px-4 container-x">
      <div className="flex items-center justify-between px-6 py-3 mx-auto bg-ink/90 backdrop-blur-md border border-white/10 rounded-full max-w-7xl shadow-2xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand text-ink font-display font-black flex items-center justify-center rounded-xl text-xl shadow-[0_0_20px_rgba(255,210,63,0.3)] group-hover:scale-105 transition-transform">
            B
          </div>
          <div className="hidden sm:block font-display text-paper leading-tight">
            <div className="text-[10px] tracking-wider text-muted">BANGLAR</div>
            <div className="text-sm font-bold tracking-tight">MATH OLYMPIAD</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-paper/85 hover:text-brand font-body text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#prebook"
            className="px-5 py-2 bg-brand text-ink rounded-full font-body font-bold text-sm hover:bg-brand-deep transition-transform active:scale-[0.98] shadow-md shadow-brand/20"
          >
            প্রি-বুক করো (১৯৯৳)
          </Link>
          <Link
            href="/admin"
            title="Admin Portal"
            className="p-2 text-paper/40 hover:text-brand transition-colors rounded-full hover:bg-white/5"
          >
            <Shield size={18} />
          </Link>
        </div>

        <button
          className="md:hidden text-paper p-1 rounded-lg hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <List size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-ink/98 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-6 md:hidden px-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-paper p-2 rounded-full bg-white/10"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
          <div className="w-12 h-12 bg-brand text-ink font-display font-black flex items-center justify-center rounded-2xl text-2xl mb-4">
            B
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl text-paper font-display hover:text-brand py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#prebook"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 bg-brand text-ink rounded-full font-display font-bold text-lg"
          >
            প্রি-বুক করো (১৯৯৳)
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="text-xs text-muted/60 mt-4 flex items-center gap-1.5"
          >
            <Shield size={14} /> অ্যাডমিন ড্যাশবোর্ড
          </Link>
        </div>
      )}
    </nav>
  );
}
