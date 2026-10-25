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
} from "@phosphor-icons/react";

export default function AdminDashboardPage() {
  const [authPin, setAuthPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"bookings" | "stats">("bookings");

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
      setAuthError("ভুল পাসকোড! সঠিক পাসকোড লিখুন (ডিফল্ট: bmo2026admin)");
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
      const enteredNote = prompt("বাতিল করার কারণ লিখুন (শিক্ষার্থী দেখতে পাবে):");
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="card-shell max-w-md w-full p-8 text-center space-y-6 bg-white border border-slate-200/90 rounded-3xl shadow-xl">
          <div className="size-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
            <LockKey size={32} weight="fill" />
          </div>

          <div>
            <h1 className="text-2xl font-bold font-display text-slate-900">
              অ্যাডমিন পোর্টাল লগইন
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Banglar Math Olympiad ম্যানেজমেন্ট ড্যাশবোর্ড
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={authPin}
              onChange={(e) => setAuthPin(e.target.value)}
              placeholder="পাসকোড দিন (ডিফল্ট: bmo2026admin)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center text-slate-900 font-mono text-sm focus:bg-white focus:border-blue-600 outline-none"
            />

            {authError && <p className="text-xs text-rose-600 font-medium">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-700/20 active:scale-95 transition-all"
            >
              প্রবেশ করুন
            </button>
          </form>

          <Link href="/" className="inline-block text-xs font-semibold text-slate-500 hover:text-blue-700">
            ← মূল ওয়েবসাইটে ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch =
      !search ||
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.transaction_id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-blue-700 text-white font-bold font-display flex items-center justify-center text-sm shadow-sm">
            B
          </span>
          <div>
            <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">অ্যাডমিন ড্যাশবোর্ড</h2>
            <p className="text-sm font-bold text-slate-900">Banglar Math Olympiad 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700"
          >
            <span>ওয়েবসাইট দেখুন</span>
            <ArrowSquareOut size={14} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 font-semibold transition-all"
          >
            <SignOut size={14} />
            <span>লগআউট</span>
          </button>
        </div>
      </header>

      <main className="container-x max-w-7xl py-10 space-y-10">
        {/* KPI Summary Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="card-shell p-5 space-y-2 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>মোট প্রি-বুকিং</span>
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                {stats.totalBookings}
              </div>
              <div className="text-[11px] text-amber-700 font-bold">
                {stats.pendingCount}টি পেন্ডিং ভেরিফিকেশন
              </div>
            </div>

            <div className="card-shell p-5 space-y-2 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>ভেরিফাইড সিট</span>
                <ShieldCheck size={20} className="text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
                {stats.verifiedCount}
              </div>
              <div className="text-[11px] text-slate-500">কনফার্মড শিক্ষার্থী</div>
            </div>

            <div className="card-shell p-5 space-y-2 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>মোট সংগৃহীত ফি</span>
                <CurrencyDollar size={20} className="text-blue-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-blue-700">
                ৳{stats.totalRevenue.toLocaleString("bn-BD")}
              </div>
              <div className="text-[11px] text-slate-500">১৯৯৳ জনপ্রতি রেট</div>
            </div>

            <div className="card-shell p-5 space-y-2 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>মক টেস্ট অংশগ্রহণ</span>
                <Exam size={20} className="text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                {stats.totalTestAttempts}
              </div>
              <div className="text-[11px] text-slate-500">
                {stats.totalQaQuestions}টি Q&A প্রশ্ন
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "bookings"
                  ? "bg-blue-700 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              বুকিং তালিকা ({bookings.length})
            </button>
          </div>

          <button
            onClick={loadAdminData}
            className="text-xs px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold shadow-xs"
          >
            {loading ? "রিফ্রেশ হচ্ছে..." : "রিলোড 🔄"}
          </button>
        </div>

        {/* Bookings Management */}
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { label: "সকল", value: "all" },
                { label: "পেন্ডিং", value: "pending" },
                { label: "ভেরিফাইড", value: "verified" },
                { label: "বাতিল", value: "rejected" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    filter === f.value
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[280px]">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="নাম, ফোন বা TrxID দিয়ে খুঁজুন..."
                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-600 outline-none shadow-xs"
              />
            </div>
          </div>

          {/* Table */}
          <div className="card-shell overflow-x-auto bg-white border border-slate-200/90 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono">
                <tr>
                  <th className="p-4">তারিখ</th>
                  <th className="p-4">শিক্ষার্থীর নাম</th>
                  <th className="p-4">মোবাইল</th>
                  <th className="p-4">শ্রেণি ও প্রতিষ্ঠান</th>
                  <th className="p-4">bKash নম্বর</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      কোনো বুকিং রেকর্ড পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 text-slate-500 whitespace-nowrap font-mono">
                        {new Date(b.created_at).toLocaleDateString("bn-BD")}
                      </td>
                      <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                        {b.full_name}
                      </td>
                      <td className="p-4 font-mono text-slate-600 whitespace-nowrap">
                        {b.phone}
                      </td>
                      <td className="p-4 text-slate-600">
                        <div>{b.student_class || "-"}</div>
                        <div className="text-[10px] text-slate-400">{b.institution || ""}</div>
                      </td>
                      <td className="p-4 font-mono text-slate-600 whitespace-nowrap">
                        {b.bkash_number}
                      </td>
                      <td className="p-4 font-mono font-bold text-blue-700 uppercase whitespace-nowrap">
                        {b.transaction_id}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {b.status === "verified" && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1 w-fit">
                            <CheckCircle size={12} weight="fill" /> ভেরিফাইড
                          </span>
                        )}
                        {b.status === "pending" && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold flex items-center gap-1 w-fit">
                            <Clock size={12} weight="fill" /> পেন্ডিং
                          </span>
                        )}
                        {b.status === "rejected" && (
                          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold flex items-center gap-1 w-fit">
                            <XCircle size={12} weight="fill" /> বাতিল
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {b.status !== "verified" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleUpdateStatus(b.id, "verified")}
                              className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 font-bold transition-all disabled:opacity-50"
                            >
                              Verify ✓
                            </button>
                          )}
                          {b.status !== "rejected" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleUpdateStatus(b.id, "rejected")}
                              className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 font-semibold transition-all disabled:opacity-50"
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
