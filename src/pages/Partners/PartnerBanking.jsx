import React, { useMemo, useState, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";

import {
  Landmark,
  Wallet,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Download,
  MoreVertical,
  Eye,
  Settings,
  AlertCircle,
} from "lucide-react";

const bankingStats = [
  {
    title: "Total Settlement",
    value: "4.82 Cr",
    icon: Landmark,
    badge: "+12%",
    color: "text-emerald-600",
  },
  {
    title: "Pending Payouts",
    value: "24.5 L",
    icon: Wallet,
    badge: "128",
    color: "text-orange-500",
  },
  {
    title: "Verified Accounts",
    value: "2,512",
    icon: ShieldCheck,
    badge: "98%",
    color: "text-indigo-600",
  },
  {
    title: "Failed Transfers",
    value: "18",
    icon: AlertTriangle,
    badge: "-6%",
    color: "text-red-500",
  },
];

const partners = [
  {
    name: "SkyNet Logistics",
    id: "ID-94821",
    type: "ISP",
    balance: "42,500",
    threshold: "10,000",
    status: "On Track",
  },
  {
    name: "BlueWave Systems",
    id: "ID-44210",
    type: "BSP",
    balance: "1,28,400",
    threshold: "50,000",
    status: "Overdue",
  },
  {
    name: "Apex Pro Logistics",
    id: "ID-33109",
    type: "ISP",
    balance: "5,120",
    threshold: "10,000",
    status: "Awaiting",
  },
  {
    name: "Vertex Transit",
    id: "ID-22874",
    type: "ISP",
    balance: "89,230",
    threshold: "25,000",
    status: "Processing",
  },
];

export default function PartnerBanking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [topCardMode, setTopCardMode] = useState("overview");
  const [activeDropdownMenu, setActiveDropdownMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdownMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const activeCard = bankingStats[activeCardIndex];

  const handleReviewPayoutQueue = () => {
    if (topCardMode === "queue") {
      alert("Redirecting to the comprehensive Payout Processing Queue...");
    } else {
      setTopCardMode("queue");
      setActiveCardIndex(1);
    }
  };

  const upcomingPayoutCopy =
    topCardMode === "queue"
      ? "12 payouts are pending for review in the next settlement window."
      : "Next batch scheduled for Thursday 14:00 GMT";

  const upcomingPayoutButtonText =
    topCardMode === "queue" ? "View Payout Queue" : "Review Payout Queue";

  const topModes = {
    overview: {
      title: "Partner Banking & Settlement Control",
      subtitle: "Compact settlement controls for partner payouts, reconciliation, and financial oversight with clean interaction and real-time selection.",
      helper: "Core partner settlement summary and account consolidation.",
      primary: "Review Queue",
      secondary: "Export Report",
    },
    export: {
      title: "Export Summary Dashboard",
      subtitle: "Generate the latest export report and preview ledger reconciliation details.",
      helper: "Export metrics are ready for download with audit-safe verification.",
      primary: "Refresh Export",
      secondary: "View Queue",
    },
    queue: {
      title: "Settlement Queue Monitor",
      subtitle: "View queued payouts, pending settlement approvals, and partner readiness status.",
      helper: "Live queue insights for the next execution window.",
      primary: "Refresh Queue",
      secondary: "Export Snapshot",
    },
  };

  const currentTopMode = topModes[topCardMode];

  const filteredPartners = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return partners.filter((partner) => {
      const matchesType = selectedType === "All" || partner.type === selectedType;
      if (!query) return matchesType;
      const matchesSearch =
        partner.name.toLowerCase().includes(query) ||
        partner.id.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });
  }, [searchQuery, selectedType]);

  const typeCounts = useMemo(
    () => ({
      all: partners.length,
      ISP: partners.filter((partner) => partner.type === "ISP").length,
      BSP: partners.filter((partner) => partner.type === "BSP").length,
    }),
    []
  );

  const statusColor = (status) => {
    if (status === "On Track") return "bg-emerald-100 text-emerald-700";
    if (status === "Overdue") return "bg-rose-100 text-rose-700";
    if (status === "Processing") return "bg-sky-100 text-sky-700";
    return "bg-slate-100 text-slate-600";
  };

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search partners, settlements, payouts..."
    >
      <div className="space-y-6">
        {/* ================= TOP CARD MODES OVERVIEW ================= */}
        <div className="overflow-hidden rounded-[28px] bg-slate-50 p-6 text-slate-900 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <span className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-[11px] font-semibold tracking-[0.3em] text-slate-600">
                PARTNER BANKING
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                {currentTopMode.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {currentTopMode.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {Object.entries(topModes).map(([modeKey, mode]) => (
                  <button
                    key={modeKey}
                    type="button"
                    onClick={() => setTopCardMode(modeKey)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      topCardMode === modeKey
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'
                    }`}
                  >
                    {mode.primary}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-5 shadow-sm min-w-[280px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Mode Summary</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activeCard.color} bg-white/90`}>
                  {topCardMode.toUpperCase()}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{activeCard.title}</h2>
              <p className="mt-2 text-4xl font-bold text-slate-900">{activeCard.value}</p>
              <div className="mt-4 rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Snapshot details</p>
                <p className="mt-2 leading-6">{currentTopMode.helper}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-white px-3 py-1">Updated just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BANKING METRICS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {bankingStats.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveCardIndex(index)}
                className={`group rounded-3xl border p-4 text-left transition ${
                  activeCardIndex === index
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <span className={`font-semibold ${item.color}`}>{item.badge}</span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">{item.title}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</h3>
              </button>
            );
          })}
        </div>

        {/* ================= LIABILITIES & UPCOMING BATCHES ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                  Total Partner Liabilities
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">₹14.82 Cr</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                  ISP: ₹8.42 Cr
                </span>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  BSP: ₹6.40 Cr
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Last Updated: 5 mins ago</span>
              <span className="font-semibold">Target Efficiency: 92%</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[92%] bg-gradient-to-r from-violet-500 to-indigo-700 rounded-full" />
            </div>
          </div>

          <div className="rounded-[28px] bg-indigo-800 text-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-200">Upcoming Payouts</p>
              <h2 className="mt-4 text-3xl font-bold text-white">₹2.40 Cr</h2>
              <p className="mt-3 text-sm leading-6 text-indigo-100">{upcomingPayoutCopy}</p>
            </div>
            <button
              type="button"
              onClick={handleReviewPayoutQueue}
              className="mt-6 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-indigo-700 transition hover:bg-slate-50"
            >
              {upcomingPayoutButtonText}
            </button>
          </div>
        </div>

        {/* ================= INTERACTIVE DIRECTORY TABLE ================= */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <PartnerExportModal
            open={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            title="Export Partner Banking Data"
            description="Choose the file format to export the current settlement and wallet dataset."
            helper="Exports include partner balances, payouts, and settlement status details."
            onExport={(format) => {
              setIsExportOpen(false);
              alert(`${format} export for partner banking data is starting...`);
            }}
            confirmLabel="Generate Export"
          />
          
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partner name or ID..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 md:w-1/2"
            />
            <div className="flex flex-wrap gap-2">
              {['All', 'ISP', 'BSP'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedType === type
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {type} ({type === 'All' ? typeCounts.all : typeCounts[type]})
                </button>
              ))}
              <PartnerExportButton onClick={() => setIsExportOpen(true)} label="Export" />
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <div className="table-responsive-wrapper">
<table className="w-full min-w-[720px] text-left border-collapse">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-200">
                  <th className="px-6 py-4">Partner</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Wallet Balance</th>
                  <th className="px-6 py-4">Payout Threshold</th>
                  <th className="px-6 py-4">Settlement Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">{partner.name}</h4>
                        <p className="text-sm text-slate-500">{partner.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{partner.type}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">₹{partner.balance}</td>
                    <td className="px-6 py-4 text-slate-600">₹{partner.threshold}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColor(partner.status)}`}>
                        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-current" />
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownMenu(activeDropdownMenu === partner.id ? null : partner.id);
                          }}
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition active:scale-95 ${activeDropdownMenu === partner.id ? 'border-indigo-300 bg-slate-50 text-indigo-600' : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600'}`}
                        >
                          <MoreVertical size={16} />
                        </button>
                        
                        {activeDropdownMenu === partner.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 z-50 py-2">
                            <button
                              onClick={() => { setActiveDropdownMenu(null); alert(`Viewing financial ledger for ${partner.id}`); }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                            >
                              <Eye size={14} /> View Ledger
                            </button>
                            <button
                              onClick={() => { setActiveDropdownMenu(null); alert(`Modifying payout configuration for ${partner.id}`); }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition"
                            >
                              <Settings size={14} /> Payout Config
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button
                              onClick={() => {
                                setActiveDropdownMenu(null);
                                alert(`Flagging ${partner.id} for financial review!`);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 transition"
                            >
                              <AlertCircle size={14} /> Flag Account
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400 font-medium">
                      No records match your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* ================= COMPLIANCE & INSIGHTS FOOTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <TrendingUp className="text-violet-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Liability Velocity</h3>
            <p className="mt-2 text-sm text-slate-500">Up 12.4% this quarter compared to last year.</p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Compliance Status</h3>
            <p className="mt-2 text-sm text-slate-500">98% partners have valid AML/KYC certification.</p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <AlertTriangle className="text-red-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Overdue Settlements</h3>
            <p className="mt-2 text-sm text-slate-500">4 partners exceeded payout threshold by 30+ days.</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
