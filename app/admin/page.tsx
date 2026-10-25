"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  XCircle,
  CurrencyDollar,
  Users,
  Exam,
  ChatsCircle,
  MagnifyingGlass,
  ArrowSquareOut,
  SignOut,
  LockKey,
  Copy,
  WhatsappLogo,
  ArrowClockwise,
  Check,
} from "@phosphor-icons/react";

export default function AdminDashboardPage() {
  const [authPin, setAuthPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("pending"); // Default to pending so admin sees what needs verification!
  const [search, setSearch] = useState("");
  const [copiedTrx, setCopiedTrx] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Check stored auth
  useEffect(() => {
    const isAuth = sessionStorage.getItem("bmo_admin_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPin === "bmo2026admin" || authPin === "admin123") {
      sessionStorage.setItem("bmo_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
      loadAdminData();
    } else {
      setAuthError("ভুল পাসকোড! সঠিক পাসকোড লিখুন (পাসকোড: bmo2026admin)");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bmo_admin_auth");
    setIsAuthenticated(false);
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [resStats, resBookings] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/bookings"),
      ]);

      const [dataStats, dataBookings] = await Promise.all([
        resStats.json(),
        resBookings.json(),
      ]);

      if (dataStats.success) setStats(dataStats.data);
      if (dataBookings.success) setBookings(dataBookings.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    bookingId: string,
    status: "verified" | "rejected",
  ) => {
    let note = "";
    if (status === "rejected") {
      const enteredNote = prompt("বাতিল করার কারণ লিখুন (শিক্ষার্থী স্ট্যাটাস পেজে দেখতে পাবে):");
      if (enteredNote === null) return;
      note = enteredNote;
    }

    setActionLoading(bookingId);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? data.data : b)),
        );
        const resStats = await fetch("/api/admin/stats");
        const dataStats = await resStats.json();
        if (dataStats.success) setStats(dataStats.data);
      } else {
        alert(data.error || "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।");
      }
    } catch {
      alert("সার্ভার ত্রুটি।");
    } finally {
      setActionLoading(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTrx(text);
    setTimeout(() => setCopiedTrx(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F6F4] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 text-center space-y-6 bg-white border border-slate-200 rounded-3xl shadow-xl">
          <div className="size-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#0072c6] flex items-center justify-center mx-auto shadow-inner">
            <LockKey size={32} weight="fill" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-shadhinata font-bold text-slate-900">
              অ্যাডমিন পোর্টাল ভেরিফিকেশন
            </h1>
            <p className="text-xs text-slate-500">
              Banglar Math Olympiad 2026 Management Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                সিকিউরিটি পাসকোড
              </label>
              <input
                type="password"
                value={authPin}
                onChange={(e) => setAuthPin(e.target.value)}
                placeholder="পাসকোড দিন (bmo2026admin)"
                className="w-full bg-[#F6F6F4] border border-slate-200 rounded-xl p-3.5 text-center text-slate-900 font-mono text-sm focus:bg-white focus:border-[#0072c6] outline-none transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0072c6] hover:bg-[#005a9e] text-white font-shadhinata font-bold text-base shadow-md transition-all active:scale-95"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>
          </form>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-600">
            ডিফল্ট পাসকোড: <code className="font-mono font-bold text-[#0072c6]">bmo2026admin</code>
          </div>

          <Link
            href="/"
            className="inline-block text-xs font-semibold text-slate-500 hover:text-[#0072c6] transition-colors"
          >
            ← মূল ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const pendingBookingsCount = bookings.filter((b) => b.status === "pending").length;
  const verifiedBookingsCount = bookings.filter((b) => b.status === "verified").length;
  const rejectedBookingsCount = bookings.filter((b) => b.status === "rejected").length;

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch =
      !search ||
      b.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search) ||
      b.bkash_number?.includes(search) ||
      b.transaction_id?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F6F4] text-slate-900">
      {/* Top Navbar in GonitZoggo Blue */}
      <header className="sticky top-0 z-30 bg-[#0072c6] text-white px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-white text-[#0072c6] font-bold font-shadhinata flex items-center justify-center text-lg shadow-sm">
            ∑
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-shadhinata font-bold text-white tracking-wide">
                অ্যাডমিন কন্ট্রোল পোর্টাল
              </h1>
              <span className="text-[10px] bg-emerald-500/90 text-white px-2 py-0.2 rounded-full font-bold">
                লাইভ
              </span>
            </div>
            <p className="text-[11px] text-blue-100">Banglar Math Olympiad 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 transition-all"
          >
            <span>মূল ওয়েবসাইট</span>
            <ArrowSquareOut size={14} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-700 text-white font-semibold transition-all"
          >
            <SignOut size={14} />
            <span>লগআউট</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Counter Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Bookings */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>মোট আবেদন</span>
                <div className="p-2 rounded-lg bg-blue-50 text-[#0072c6]">
                  <Users size={18} weight="bold" />
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-slate-900">
                {stats.totalBookings}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <span>মোট প্রি-বুকিং রেজিস্ট্রেশন</span>
              </div>
            </div>

            {/* Pending Verifications */}
            <div className="p-5 bg-white border-2 border-amber-300 rounded-2xl shadow-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-amber-700 text-xs font-bold uppercase tracking-wider">
                <span>পেন্ডিং ভেরিফিকেশন</span>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <Clock size={18} weight="fill" />
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-amber-700">
                {pendingBookingsCount}
              </div>
              <div className="text-[11px] text-amber-800 font-bold">
                ⚠️ অবিলম্বে যাচাই প্রয়োজন
              </div>
            </div>

            {/* Verified Seats */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>ভেরিফাইড সিট</span>
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={18} weight="fill" />
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-emerald-600">
                {verifiedBookingsCount}
              </div>
              <div className="text-[11px] text-slate-500">
                নিশ্চিত অলিম্পিয়াড শিক্ষার্থী
              </div>
            </div>

            {/* Total Revenue */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>সংগৃহীত ফি</span>
                <div className="p-2 rounded-lg bg-blue-50 text-[#0072c6]">
                  <CurrencyDollar size={18} weight="bold" />
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-[#0072c6]">
                ৳{(verifiedBookingsCount * 199).toLocaleString("bn-BD")}
              </div>
              <div className="text-[11px] text-slate-500">
                ১৯৯৳ রেট (ভেরিফাইড)
              </div>
            </div>
          </div>
        )}

        {/* Section Heading & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-shadhinata font-bold text-slate-900">
              প্রি-বুকিং আবেদন ও ট্রানজেকশন তালিকা
            </h2>
            <p className="text-xs text-slate-500">
              বিকাশ স্টেটমেন্টের সাথে TrxID মিলিয়ে শিক্ষার্থীদের সিট ভেরিফাই অথবা বাতিল করুন
            </p>
          </div>

          <button
            onClick={loadAdminData}
            disabled={loading}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-all disabled:opacity-50"
          >
            <ArrowClockwise size={14} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "রিফ্রেশ হচ্ছে..." : "রিফ্রেশ করুন"}</span>
          </button>
        </div>

        {/* Filters & Real-time Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { label: "পেন্ডিং", value: "pending", count: pendingBookingsCount, color: "text-amber-700 bg-amber-50" },
              { label: "ভেরিফাইড", value: "verified", count: verifiedBookingsCount, color: "text-emerald-700 bg-emerald-50" },
              { label: "বাতিল", value: "rejected", count: rejectedBookingsCount, color: "text-rose-700 bg-rose-50" },
              { label: "সকল আবেদন", value: "all", count: bookings.length, color: "text-slate-700 bg-slate-100" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  filter === f.value
                    ? "bg-[#0072c6] text-white border-[#0072c6] shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    filter === f.value ? "bg-white/20 text-white" : f.color
                  }`}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[280px]">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম, ফোন বা TrxID দিয়ে খুঁজুন..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 text-xs text-slate-900 focus:border-[#0072c6] outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F6F4] border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">তারিখ</th>
                  <th className="p-4">শিক্ষার্থীর নাম</th>
                  <th className="p-4">মোবাইল</th>
                  <th className="p-4">শ্রেণি ও প্রতিষ্ঠান</th>
                  <th className="p-4">বিকাশ প্রেরক নম্বর</th>
                  <th className="p-4">Transaction ID (TrxID)</th>
                  <th className="p-4 text-center">স্ট্যাটাস</th>
                  <th className="p-4 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-slate-500 space-y-2">
                      <div className="text-3xl">🔍</div>
                      <div className="font-bold text-slate-700">কোনো বুকিং রেকর্ড পাওয়া যায়নি</div>
                      <p className="text-xs text-slate-400">ফিল্টার বা সার্চ কিওয়ার্ড পরিবর্তন করে দেখতে পারেন।</p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Date */}
                      <td className="p-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        {new Date(b.created_at).toLocaleDateString("bn-BD", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Name */}
                      <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                        <div className="font-shadhinata text-sm">{b.full_name}</div>
                        {b.email && (
                          <div className="text-[10px] text-slate-400 font-mono font-normal">
                            {b.email}
                          </div>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="p-4 font-mono whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <span>{b.phone}</span>
                          <a
                            href={`https://wa.me/88${b.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50"
                            title="হোয়াটসঅ্যাপে মেসেজ দিন"
                          >
                            <WhatsappLogo size={14} weight="fill" />
                          </a>
                        </div>
                      </td>

                      {/* Class & School */}
                      <td className="p-4 text-slate-600">
                        <div className="font-semibold text-slate-800">
                          {b.student_class ? `শ্রেণি: ${b.student_class}` : "-"}
                        </div>
                        <div className="text-[11px] text-slate-400 max-w-[160px] truncate">
                          {b.institution || "প্রতিষ্ঠান উল্লেখ নেই"}
                        </div>
                      </td>

                      {/* bKash Sender */}
                      <td className="p-4 font-mono font-semibold text-slate-700 whitespace-nowrap">
                        {b.bkash_number}
                      </td>

                      {/* Transaction ID */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#0072c6] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
                            {b.transaction_id}
                          </span>
                          <button
                            onClick={() => copyToClipboard(b.transaction_id)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            title="TrxID কপি করুন"
                          >
                            {copiedTrx === b.transaction_id ? (
                              <Check size={14} className="text-emerald-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4 text-center whitespace-nowrap">
                        {b.status === "verified" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                            <CheckCircle size={13} weight="fill" /> ভেরিফাইড
                          </span>
                        )}
                        {b.status === "pending" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px]">
                            <Clock size={13} weight="fill" /> পেন্ডিং
                          </span>
                        )}
                        {b.status === "rejected" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[11px]">
                            <XCircle size={13} weight="fill" /> বাতিল
                          </span>
                        )}
                      </td>

                      {/* Quick Verify / Reject Action Buttons */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status !== "verified" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleUpdateStatus(b.id, "verified")}
                              className="px-3 py-1 rounded-lg bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50 flex items-center gap-1"
                              title="পেমেন্ট নিশ্চিত করে ভেরিফাই করুন"
                            >
                              <span>Verify</span>
                              <span>✓</span>
                            </button>
                          )}
                          {b.status !== "rejected" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleUpdateStatus(b.id, "rejected")}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 font-semibold text-xs transition-all disabled:opacity-50"
                              title="আবেদন বাতিল করুন"
                            >
                              Reject ✕
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
