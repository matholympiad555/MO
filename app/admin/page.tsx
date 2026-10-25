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
    // Default admin passcode: bmo2026admin
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
        // Refresh stats
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
      <div className="min-h-screen bg-ink flex items-center justify-center p-4">
        <div className="card-shell max-w-md w-full p-8 text-center space-y-6">
          <div className="size-16 rounded-2xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center mx-auto">
            <LockKey size={32} weight="fill" />
          </div>

          <div>
            <h1 className="text-2xl font-bold font-display text-paper">
              অ্যাডমিন পোর্টাল লগইন
            </h1>
            <p className="text-xs text-muted mt-1.5">
              Banglar Math Olympiad ম্যানেজমেন্ট ড্যাশবোর্ড
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={authPin}
              onChange={(e) => setAuthPin(e.target.value)}
              placeholder="পাসকোড দিন (ডিফল্ট: bmo2026admin)"
              className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3.5 text-center text-paper font-mono text-sm focus:border-brand outline-none"
            />

            {authError && <p className="text-xs text-red-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-brand text-ink font-bold text-sm hover:bg-brand-deep active:scale-95 transition-all shadow-lg shadow-brand/15"
            >
              প্রবেশ করুন
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-muted hover:text-paper">
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
    <div className="min-h-screen bg-ink text-paper">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-ink-2/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-brand text-ink font-bold font-display flex items-center justify-center text-sm">
            B
          </span>
          <div>
            <h2 className="text-xs font-medium text-muted">অ্যাডমিন ড্যাশবোর্ড</h2>
            <p className="text-sm font-bold text-paper">Banglar Math Olympiad 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted hover:text-brand"
          >
            <span>ওয়েবসাইট দেখুন</span>
            <ArrowSquareOut size={14} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-paper hover:bg-white/10"
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
            <div className="card-shell p-5 space-y-2">
              <div className="flex items-center justify-between text-muted text-xs">
                <span>মোট প্রি-বুকিং</span>
                <Users size={20} className="text-sky" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-paper">
                {stats.totalBookings}
              </div>
              <div className="text-[11px] text-amber-400">
                {stats.pendingCount}টি পেন্ডিং ভেরিফিকেশন
              </div>
            </div>

            <div className="card-shell p-5 space-y-2">
              <div className="flex items-center justify-between text-muted text-xs">
                <span>ভেরিফাইড সিট</span>
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                {stats.verifiedCount}
              </div>
              <div className="text-[11px] text-muted">কনফার্মড শিক্ষার্থী</div>
            </div>

            <div className="card-shell p-5 space-y-2">
              <div className="flex items-center justify-between text-muted text-xs">
                <span>মোট সংগৃহীত ফি</span>
                <CurrencyDollar size={20} className="text-brand" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-brand">
                ৳{stats.totalRevenue.toLocaleString("bn-BD")}
              </div>
              <div className="text-[11px] text-muted">১৯৯৳ জনপ্রতি রেট</div>
            </div>

            <div className="card-shell p-5 space-y-2">
              <div className="flex items-center justify-between text-muted text-xs">
                <span>মক টেস্ট অংশগ্রহণ</span>
                <Exam size={20} className="text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-paper">
                {stats.totalTestAttempts}
              </div>
              <div className="text-[11px] text-muted">
                {stats.totalQaQuestions}টি Q&A প্রশ্ন
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "bookings"
                  ? "bg-brand text-ink"
                  : "bg-white/5 text-muted hover:text-paper"
              }`}
            >
              বুকিং তালিকা ({bookings.length})
            </button>
          </div>

          <button
            onClick={loadAdminData}
            className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted hover:text-paper"
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    filter === f.value
                      ? "bg-white/15 text-paper border-white/20"
                      : "bg-transparent text-muted border-white/5 hover:border-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[260px]">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="নাম, ফোন বা TrxID দিয়ে খুঁজুন..."
                className="w-full bg-ink-2 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-paper focus:border-brand outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="card-shell overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] border-b border-white/10 text-muted uppercase tracking-wider font-mono">
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
              <tbody className="divide-y divide-white/5">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted">
                      কোনো বুকিং রেকর্ড পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-muted whitespace-nowrap font-mono">
                        {new Date(b.created_at).toLocaleDateString("bn-BD")}
                      </td>
                      <td className="p-4 font-semibold text-paper whitespace-nowrap">
                        {b.full_name}
                      </td>
                      <td className="p-4 font-mono text-muted whitespace-nowrap">
                        {b.phone}
                      </td>
                      <td className="p-4 text-muted">
                        <div>{b.student_class || "-"}</div>
                        <div className="text-[10px] text-muted/60">{b.institution || ""}</div>
                      </td>
                      <td className="p-4 font-mono text-muted whitespace-nowrap">
                        {b.bkash_number}
                      </td>
                      <td className="p-4 font-mono font-bold text-brand uppercase whitespace-nowrap">
                        {b.transaction_id}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {b.status === "verified" && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold flex items-center gap-1 w-fit">
                            <CheckCircle size={12} weight="fill" /> ভেরিফাইড
                          </span>
                        )}
                        {b.status === "pending" && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 font-bold flex items-center gap-1 w-fit">
                            <Clock size={12} weight="fill" /> পেন্ডিং
                          </span>
                        )}
                        {b.status === "rejected" && (
                          <span className="px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 font-bold flex items-center gap-1 w-fit">
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
                              className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-ink font-bold transition-all disabled:opacity-50"
                            >
                              Verify ✓
                            </button>
                          )}
                          {b.status !== "rejected" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleUpdateStatus(b.id, "rejected")}
                              className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-ink font-semibold transition-all disabled:opacity-50"
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
