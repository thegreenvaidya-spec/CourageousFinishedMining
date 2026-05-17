import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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

export default function Admin() {
  useEffect(() => {
    document.title = "Admin Dashboard | Om Clinic Rajkot";
  }, []);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterDate) params.append("date", filterDate);
      if (filterStatus) params.append("status", filterStatus);
      if (search.trim()) params.append("search", search.trim());

      const [apptRes, statsRes] = await Promise.all([
        fetch(`/api/appointments?${params.toString()}`),
        fetch("/api/appointments/stats"),
      ]);

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
  }, [filterDate, filterStatus, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateStatus = async (id: number, status: Appointment["status"]) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
        fetchData(); // refresh stats
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
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
            <span className="text-xs text-slate-400 hidden sm:inline">{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary font-medium px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
              title="Refresh data"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </header>

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
