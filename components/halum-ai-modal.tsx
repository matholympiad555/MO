"use client";

import { useState } from "react";
import { X, PaperPlaneTilt, Sparkle, ArrowClockwise } from "@phosphor-icons/react";

interface HalumAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: "user" | "halum";
  text: string;
}

export function HalumAIModal({ isOpen, onClose }: HalumAIModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "halum",
      text: "হালুউউম! 🐯 আমি রয়েল বেঙ্গল টাইগার হালুম — তোমার অলিম্পিয়াড গণিত কোচ! গণিতের যে কোনো বাঘের মতো কঠিন অঙ্ক নিয়ে এসো, একসাথে গর্জন দিয়ে সমাধান করে ফেলব! কী জানতে চাও বলো?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "সংখ্যাতত্ত্বের বিভাজ্যতার ট্রিকস বলো",
    "পায়রার খোপ নীতি (PHP) বুঝিয়ে দাও",
    "Ptolemy উপপাদ্য কী এবং কোথায় লাগে?",
    "কীভাবে ১০০০ পয়েন্ট করে ১০০৳ বিকাশ পাব?",
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || loading) return;

    const userMsg: Message = { sender: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/halum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      const botReply =
        data.reply ||
        "হালুম! বাঘ কখনো পিছু হটে না। তোমার প্রশ্নটি চমৎকার! আরেকটু স্পষ্ট করে বলো তো, আমি আরও সুন্দর করে ব্যাখ্যা দিচ্ছি!";
      setMessages((prev) => [...prev, { sender: "halum", text: botReply }]);
    } catch {
      // Fallback response with Halum's persona
      setTimeout(() => {
        let reply =
          "হালুম! 🐯 এই প্রশ্নের সুন্দর সমাধান হলো: অলিম্পিয়াডে সমস্যাকে ছোট ছোট অংশে ভাগ করো। সূত্র মুখস্থ করার চেয়ে কেন সূত্রটি কাজ করে তা বোঝার চেষ্টা করো। চলো বাঘের মতো গর্জন দিয়ে পরবর্তী অঙ্ক সমাধান করি!";
        if (q.includes("পয়েন্ট") || q.includes("বিকাশ")) {
          reply =
            "হালুম! 🐯 প্রতিটা সঠিক প্রশ্নের সমাধানে তুমি পাবে +১০ পয়েন্ট! মোট ১০০০ পয়েন্ট জমলেই সোজা ১০০ টাকা bKash ক্যাশআউট করে তোমার নম্বরে পাঠিয়ে দেওয়া হবে। বেশি বেশি প্র্যাকটিস করো আর পয়েন্ট জমাও!";
        } else if (q.includes("পায়রা") || q.includes("PHP")) {
          reply =
            "হালুম! 🐯 পায়রার খোপ নীতি (Pigeonhole Principle): ধরো তোমার কাছে ৫টি পায়রা আর ৪টি খোপ আছে। পায়রাগুলোকে খোদে রাখতে গেলে অন্তত একটি খোপে ২ বা ততোধিক পায়রা থাকবেই! এটা অলিম্পিয়াডের জাদুকরী অস্ত্র!";
        }
        setMessages((prev) => [...prev, { sender: "halum", text: reply }]);
        setLoading(false);
      }, 500);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-2xl flex items-center justify-center shadow-inner">
              🐯
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-base leading-tight">
                <span>হালুম AI — Tiger of Math</span>
                <span className="text-[10px] bg-amber-400 text-slate-900 font-black px-1.5 py-0.2 rounded-full">
                  Gemini
                </span>
              </div>
              <div className="text-xs text-purple-200 font-medium">
                অলিম্পিয়াড স্পেশালিস্ট এআই টিউটর
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-purple-50/70 border-b border-purple-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="shrink-0 font-bold text-purple-900">হালুমকে বলো:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="shrink-0 bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "halum" && (
                <div className="w-8 h-8 rounded-full bg-amber-400 text-lg flex items-center justify-center shrink-0 shadow-xs">
                  🐯
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-purple-600 text-white rounded-tr-xs"
                    : "bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs font-sans whitespace-pre-wrap"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5 items-center text-slate-500 text-xs italic">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-sm flex items-center justify-center animate-bounce">
                🐯
              </div>
              <span>হালুম চিন্তা করছে আর গর্জন তুলছে...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="অঙ্ক বা প্রশ্ন লিখো... (যেমন: ৩ দিয়ে বিভাজ্যতার নিয়ম কী?)"
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white transition-all cursor-pointer shadow-xs"
          >
            <PaperPlaneTilt size={18} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}