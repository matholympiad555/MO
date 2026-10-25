"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  YoutubeLogo,
  CheckCircle,
  Play,
  Pause,
  Star,
} from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

interface HeroProps {
  onOpenHalumAI?: () => void;
}

export function Hero({ onOpenHalumAI }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-slate-200/80 pt-10 sm:pt-14 pb-16 sm:pb-24">
      {/* Subtle Math Ambient Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill: Official Hub */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs sm:text-sm font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <span>{t.heroTag}</span>
            </div>

            {/* Main Headline (Exact Image 4) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-black tracking-tight leading-[1.12]">
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                  {t.heroTitle1}
                </span>
                <br />
                <span className="text-slate-950 font-black">
                  {t.heroTitle2}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/problems"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-purple-500/25 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <span>{t.heroSolveBtn}</span>
                <ArrowRight size={18} weight="bold" />
              </Link>

              <a
                href="https://www.youtube.com/@BanglarMathOlympiad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base border border-slate-300 shadow-xs flex items-center gap-2.5 transition-all"
              >
                <YoutubeLogo size={22} weight="fill" className="text-red-600" />
                <span>{t.heroYoutubeBtn}</span>
              </a>
            </div>

            {/* 4 Green Checklist Badges (Exact Image 4) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-4 text-xs sm:text-sm font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{t.heroCheckMath}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{t.heroCheckPhysics}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span className="text-purple-700">{t.heroCheckPoints}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                <span>{t.heroCheckFree}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Media Card (Exact Image 4) */}
          <div className="lg:col-span-5 relative">
            {/* Top Rating Badge */}
            <div className="absolute -top-4 -right-2 sm:right-4 z-20 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-md flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                G
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} weight="fill" />
                <span className="text-slate-900">5.0 / 5.0</span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600 font-semibold text-[11px]">#1 Rated Olympiad Platform</span>
            </div>

            {/* Floating Avatar 1 (Rahat • Jr.) */}
            <div className="absolute -top-6 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-full py-1 px-3 shadow-md">
              <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center">
                👨‍🎓
              </div>
              <span className="text-xs font-bold text-slate-800">Rahat • Jr.</span>
            </div>

            {/* Main Dark Sleek Card */}
            <div className="rounded-2xl bg-[#13151b] border border-slate-800 p-6 sm:p-7 shadow-2xl text-white space-y-5 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span>{t.heroDiscussionTitle}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">{t.heroDiscussionLive}</div>
                </div>
                <div className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-800/80 text-amber-400 border border-slate-700">
                  00:05:39
                </div>
              </div>

              {/* Animated Audio Waveform Bars */}
              <div className="h-10 flex items-center justify-center gap-1 py-1">
                {[
                  14, 24, 38, 18, 30, 40, 26, 16, 34, 42, 28, 20, 36, 44, 22, 14, 30, 38, 26, 18, 34, 40,
                  24, 16,
                ].map((height, i) => (
                  <span
                    key={i}
                    style={{ height: `${isPlaying ? height : 6}px` }}
                    className="w-1 bg-gradient-to-t from-purple-500 via-rose-500 to-amber-400 rounded-full transition-all duration-300"
                  />
                ))}
              </div>

              {/* IMO Problem Chat Bubble (Exact Quote from Image 4) */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                      T
                    </div>
                    <span className="font-bold text-slate-200">{t.heroQuoteSolver}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">05:45</span>
                </div>

                <p className="text-slate-300 leading-relaxed font-sans">
                  &ldquo;{t.heroQuotePtolemy}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-700/60 text-[11px] text-purple-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>{t.heroQuoteSofia}</span>
                </div>
              </div>

              {/* Play Audio Button */}
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 active:scale-95 transition-all cursor-pointer"
                  aria-label={isPlaying ? "Pause discussion" : "Play discussion"}
                >
                  {isPlaying ? (
                    <Pause size={20} weight="fill" />
                  ) : (
                    <Play size={20} weight="fill" className="ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Floating Avatar 2 (Nusrat • Sec.) */}
            <div className="absolute -bottom-4 left-6 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-full py-1 px-3 shadow-md">
              <div className="w-7 h-7 rounded-full bg-rose-200 text-rose-900 font-bold text-xs flex items-center justify-center">
                👩‍🎓
              </div>
              <span className="text-xs font-bold text-slate-800">Nusrat • Sec.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}