import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
  Search,
  Calendar,
  ChevronDown,
  Filter,
  Shield,
  Lock,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

interface Appointment {
  id: number;
  name: string;
  phone: string;
  date: string;
  time_slot: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
}

interface Stats {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  completed: { label: "Completed", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle2 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

const AUTH_KEY = "omclinic_admin_auth";
const AUTH_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours

function getStoredAuth(): string | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const { password, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > AUTH_EXPIRY_MS) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return password;
  } catch {
    return null;
  }
}

function storeAuth(password: string) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ password, timestamp: Date.now() }));
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export default function Admin() {
  const [authPassword, setAuthPassword] = useState<string | null>(getStoredAuth());
  const [loginPw, setLoginPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const headers = () => ({ "X-Admin-Password": authPassword || "" });

  const fetchData = useCallback(async () => {
    if (!authPassword) return;
    setLoading(true);
    setUnauthorized(false);
    try {
      const params = new URLSearchParams();
      if (filterDate) params.append("date", filterDate);
      if (filterStatus) params.append("status", filterStatus);
      if (search.trim()) params.append("search", search.trim());

      const [apptRes, statsRes] = await Promise.all([
        fetch(`/api/appointments?${params.toString()}`, { headers: headers() }),
        fetch("/api/appointments/stats", { headers: headers() }),
      ]);

      if (apptRes.status === 401 || statsRes.status === 401) {
        setUnauthorized(true);
        clearAuth();
        setAuthPassword(null);
        return;
      }

      if (apptRes.ok) {
        setAppointments(await apptRes.json());
      }
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authPassword, filterDate, filterStatus, search]);

  useEffect(() => {
    document.title = authPassword ? "Admin Dashboard | Om Clinic Rajkot" : "Admin Login | Om Clinic Rajkot";
  }, [authPassword]);

  useEffect(() => {
    if (authPassword) {
      fetchData();
    }
  }, [authPassword, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPw.trim()) return;
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/appointments/stats", {
        headers: { "X-Admin-Password": loginPw.trim() },
      });
      if (res.status === 401) {
        setLoginError("Incorrect password. Please try again.");
      } else if (res.ok) {
        storeAuth(loginPw.trim());
        setAuthPassword(loginPw.trim());
        setLoginPw("");
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    setAuthPassword(null);
    setAppointments([]);
    setStats(null);
    setLoginPw("");
    setLoginError("");
    setUnauthorized(false);
  };

  const updateStatus = async (id: number, status: Appointment["status"]) => {
    if (!authPassword) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-Admin-Password": authPassword },
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) {
        setUnauthorized(true);
        clearAuth();
        setAuthPassword(null);
        return;
      }
      if (res.ok) {
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
        fetchData();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!authPassword) return;
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Password": authPassword },
      });
      if (res.status === 401) {
        setUnauthorized(true);
        clearAuth();
        setAuthPassword(null);
        return;
      }
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        setDeleteId(null);
        fetchData();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const statCards = stats
    ? [
        { label: "Total Bookings", value: stats.total, icon: Users, color: "text-blue-600 bg-blue-50" },
        { label: "Today's Bookings", value: stats.today, icon: CalendarCheck, color: "text-indigo-600 bg-indigo-50" },
        { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-600 bg-amber-50" },
        { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
        { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-red-600 bg-red-50" },
      ]
    : [];

  // Login screen
  if (!authPassword) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="text-primary" size={28} />
              </div>
              <h1 className="font-serif font-bold text-xl text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-400 mt-1">Om Clinic · Dr. Chirag Santoki</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={loginPw}
                    onChange={(e) => setLoginPw(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-9 pr-10 h-11 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    autoFocus
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2"
                  >
                    {loginError}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loginLoading || !loginPw.trim()}
                className="w-full h-11 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Lock size={14} />
                )}
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">
            Protected area. Unauthorized access is prohibited.
          </p>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm font-serif">ॐ</span>
            </div>
            <div>
              <p className="font-serif font-bold text-slate-900 text-sm leading-none">Om Clinic</p>
              <p className="text-[10px] text-slate-400">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
            </span>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary font-medium px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
              title="Refresh data"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
              title="Sign out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {unauthorized && (
        <div className="container mx-auto px-4 md:px-6 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2">
            <AlertCircle size={16} />
            Your session has expired. Please sign in again.
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                  <s.icon size={16} />
                </div>
                <p className="text-2xl font-serif font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                <Search size={10} className="inline mr-1 -mt-0.5" /> Search
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or reason..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 h-10 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="w-full md:w-44">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                <Calendar size={10} className="inline mr-1 -mt-0.5" /> Date
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 h-10 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div className="w-full md:w-40">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                <Filter size={10} className="inline mr-1 -mt-0.5" /> Status
              </label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-3 pr-8 h-10 rounded-lg border border-slate-200 text-sm appearance-none bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={() => { setFilterDate(""); setFilterStatus(""); setSearch(""); }}
              className="h-10 px-4 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </motion.div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 text-sm">Appointments</h2>
            <span className="text-xs text-slate-400">{appointments.length} results</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-400">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
              Loading appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500 font-medium">No appointments found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">ID</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Patient</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Date &amp; Time</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Reason</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => {
                    const config = statusConfig[a.status];
                    const StatusIcon = config.icon;
                    return (
                      <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 py-3.5 text-slate-500 font-mono text-xs">#{a.id}</td>
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-slate-800">{a.name}</p>
                          <a href={`tel:${a.phone}`} className="text-xs text-slate-500 hover:text-primary font-medium">
                            {a.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-slate-700 font-medium">{new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Clock size={10} /> {a.time_slot}
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-slate-700 text-xs max-w-[200px] truncate" title={a.reason}>{a.reason}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.color}`}>
                            <StatusIcon size={12} />
                            {config.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            {a.status !== "confirmed" && (
                              <button
                                onClick={() => updateStatus(a.id, "confirmed")}
                                title="Confirm"
                                className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                              >
                                <CheckCircle2 size={14} />
                              </button>
                            )}
                            {a.status !== "cancelled" && (
                              <button
                                onClick={() => updateStatus(a.id, "cancelled")}
                                title="Cancel"
                                className="w-7 h-7 rounded-md bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                              >
                                <XCircle size={14} />
                              </button>
                            )}
                            {a.status !== "completed" && (
                              <button
                                onClick={() => updateStatus(a.id, "completed")}
                                title="Mark Completed"
                                className="w-7 h-7 rounded-md bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors"
                              >
                                <CheckCircle2 size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteId(deleteId === a.id ? null : a.id)}
                              title="Delete"
                              className="w-7 h-7 rounded-md bg-slate-50 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                            {deleteId === a.id && (
                              <button
                                onClick={() => handleDelete(a.id)}
                                className="text-xs text-red-600 font-medium hover:underline ml-1"
                              >
                                Delete?
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between text-xs text-slate-400">
          <p>Om Clinic Admin · Dr. Chirag Santoki</p>
          <p>+91 94269 93723 · Raiya, Rajkot 360007</p>
        </div>
      </footer>
    </div>
  );
}
