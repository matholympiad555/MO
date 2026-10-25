"use client";

interface FloatingAIButtonProps {
  onClick: () => void;
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        aria-label="Open Tiger AI Tutor"
      >
        <span className="text-lg">🐯</span>
        <span>Tiger AI Tutor</span>
        <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
      </button>
    </div>
  );
}
