"use client";

import { useState } from "react";
import { X, Trophy, Sparkle, CheckCircle, Warning } from "@phosphor-icons/react";

interface CashoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  points?: number;
}

export function CashoutModal({ isOpen, onClose, points = 120 }: CashoutModalProps) {
  const [bkashNumber, setBkashNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const targetPoints = 1000;
  const rewardAmount = 100;
  const progressPercent = Math.min(100, Math.round((points / targetPoints) * 100));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bkashNumber || bkashNumber.length < 11) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/30 backdrop-blur-xs flex items-center justify-center text-xl shadow-inner">
              🏆
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-950 leading-tight">
                রিওয়ার্ড ও bKash ক্যাশআউট
              </h3>
              <p className="text-xs text-slate-900 font-semibold">
                ১০০০ পয়েন্ট = ১০০ টাকা বিকাশ পুরস্কার!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-900/70 hover:text-slate-950 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Current Points & Progress Bar */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2.5">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-amber-950">তোমার বর্তমান পয়েন্ট:</span>
              <span className="text-lg font-black text-amber-600 font-mono">
                {points} / {targetPoints} pts
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-amber-200/70 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-amber-800 font-semibold">
              <span>{progressPercent}% সম্পন্ন</span>
              <span>আর {Math.max(0, targetPoints - points)} পয়েন্ট বাকি</span>
            </div>
          </div>

          {/* Rules Explanation */}
          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkle size={14} weight="fill" className="text-amber-500" />
              <span>পয়েন্ট অর্জনের সহজ নিয়ম:</span>
            </div>
            <ul className="space-y-1 pl-4 list-disc text-slate-600">
              <li>প্রতিটি গণিত ও পদার্থ প্রশ্নের সঠিক সমাধানে: <strong>+১০ পয়েন্ট</strong></li>
              <li>প্রতিটি পূর্ণাঙ্গ মক টেস্ট সমাপ্তিতে: <strong>+৫০ পয়েন্ট</strong></li>
              <li>কমিউনিটিতে সেরা ব্যাখ্যা বা সমাধানের জন্য: <strong>+২০ পয়েন্ট</strong></li>
            </ul>
          </div>

          {/* Form / Submitted state */}
          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 text-emerald-900">
              <CheckCircle size={32} weight="fill" className="text-emerald-600 mx-auto" />
              <div className="font-bold text-sm">ক্যাশআউট রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!</div>
              <p className="text-xs text-emerald-700">
                তোমার বিকাশ নম্বর <strong>{bkashNumber}</strong>-এ ভেরিফিকেশন শেষে ১০০ টাকা ট্রান্সফার করা হবে।
              </p>
            </div>
          ) : points >= targetPoints ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  তোমার bKash ব্যক্তিগত (Personal) নম্বর:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={bkashNumber}
                  onChange={(e) => setBkashNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-900 font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
              >
                ১০০ টাকা ক্যাশআউট রিকোয়েস্ট পাঠাও
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <Warning size={16} weight="fill" className="text-amber-600 shrink-0 mt-0.5" />
                <span>
                  ক্যাশআউট রিকোয়েস্ট করতে ন্যূনতম <strong>১,০০০ পয়েন্ট</strong> প্রয়োজন। তুমি আর মাত্র{" "}
                  <strong>{targetPoints - points}</strong> পয়েন্ট অর্জন করলেই ১০০ টাকা ক্যাশআউট অপশন আনলক হবে!
                </span>
              </div>
              <a
                href="/problems"
                onClick={onClose}
                className="block w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-center text-sm shadow-xs transition-all cursor-pointer"
              >
                অঙ্ক সমাধান করে পয়েন্ট বাড়াও (+১০ pts)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}