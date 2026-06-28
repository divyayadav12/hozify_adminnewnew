import React, { useMemo, useState } from "react";
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

  const activeCard = bankingStats[activeCardIndex];

  const handleReviewPayoutQueue = () => {
    setTopCardMode("queue");
    setActiveCardIndex(1);
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
            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Mode Summary</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activeCard.color} bg-white/90`}>{topCardMode.toUpperCase()}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{activeCard.title}</h2>
              <p className="mt-2 text-4xl font-bold text-slate-900">{activeCard.value}</p>
              <div className="mt-4 rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Snapshot details</p>
                <p className="mt-2 leading-6">{currentTopMode.helper}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-white px-3 py-1">Updated just now</span>
                <span className="rounded-full bg-white px-3 py-1">Mode: {currentTopMode.title}</span>
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <p className="mt-6 text-slate-500 text-sm">
          {item.title}
        </p>

        <h3 className="mt-2 text-4xl font-bold text-slate-900">
          {item.value}
        </h3>

      </div>

    );

  })}

</div>
{/* ================= LIABILITY ================= */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  <div className="xl:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8">

    <p className="text-xs font-bold tracking-[0.25em] text-indigo-600 uppercase">
      Total Partner Liabilities
    </p>

    <h2 className="mt-3 text-5xl font-bold">
      ₹14.82 Cr
    </h2>

    <div className="mt-5 flex gap-4">

      <span className="rounded-full bg-violet-100 px-4 py-2 text-violet-700 font-medium">
        ISP : ₹8.42 Cr
      </span>

      <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-medium">
        BSP : ₹6.40 Cr
      </span>

    </div>

    <div className="mt-10 flex justify-between text-sm text-slate-500">

      <span>Last Updated : 5 mins ago</span>

      <span className="font-semibold">
        Target Efficiency : 92%
      </span>

    </div>

    <div className="mt-6 h-3 rounded-full bg-slate-100 overflow-hidden">

      <div className="h-full w-[92%] bg-gradient-to-r from-violet-500 to-indigo-700 rounded-full"></div>

    </div>

  </div>

  <div className="rounded-[32px] bg-indigo-800 text-white p-8">

    <p className="text-sm uppercase tracking-wider">
      Upcoming Payouts
    </p>

    <h2 className="mt-4 text-5xl font-bold">
      ₹2.40 Cr
    </h2>

    <p className="mt-3 text-indigo-200">
      Next batch scheduled for Thursday 14:00 GMT
    </p>

    <button className="mt-8 w-full rounded-2xl bg-white py-4 font-semibold text-indigo-700">
      Review Payout Queue
    </button>

  </div>

</div>
{/* ================= TABLE ================= */}

<div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">

  <div className="flex items-center justify-between border-b border-slate-200 p-6">

    <input
      placeholder="Search partner name or ID..."
      className="w-[400px] rounded-2xl border border-slate-200 px-5 py-3 outline-none"
    />

    <div className="flex gap-3">

      <button className="rounded-xl bg-indigo-600 text-white px-5 py-2">
        All
      </button>

      <button className="rounded-xl border px-5 py-2">
        ISP
      </button>

      <button className="rounded-xl border px-5 py-2">
        BSP
      </button>

    </div>

  </div>

  <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full">

    <thead className="bg-slate-50">

      <tr className="text-left text-sm text-slate-500">

        <th className="px-6 py-5">PARTNER</th>
        <th>TYPE</th>
        <th>WALLET BALANCE</th>
        <th>PAYOUT THRESHOLD</th>
        <th>SETTLEMENT STATUS</th>
        <th>ACTION</th>

      </tr>

    </thead>

    <tbody>

      {partners.map((partner) => (

        <tr
          key={partner.id}
          className="border-t border-slate-100 hover:bg-slate-50"
        >

          <td className="px-6 py-5">

            <div>

              <h4 className="font-semibold">
                {partner.name}
              </h4>

              <p className="text-sm text-slate-500">
                {partner.id}
              </p>
=======
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {bankingStats.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
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
>>>>>>> 85a8df8 (updated partner UI)

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                  Total Partner Liabilities
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">14.82 Cr</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                  ISP: 8.42 Cr
                </span>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  BSP: 6.40 Cr
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

          <div className="rounded-[28px] bg-slate-100 p-6 text-slate-900 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Upcoming Payouts</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">2.40 Cr</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{upcomingPayoutCopy}</p>
            <button
              type="button"
              onClick={handleReviewPayoutQueue}
              className="mt-6 w-full rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {upcomingPayoutButtonText}
            </button>
          </div>
        </div>

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
            </div>
          </div>

          <table className="w-full min-w-[720px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Wallet Balance</th>
                <th className="px-6 py-4">Payout Threshold</th>
                <th className="px-6 py-4">Settlement Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="border-t border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">{partner.name}</h4>
                      <p className="text-sm text-slate-500">{partner.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{partner.type}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{partner.balance}</td>
                  <td className="px-6 py-4 text-slate-700">{partner.threshold}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusColor(partner.status)}`}>
                      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-current" />
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPartners.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    No records match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <TrendingUp className="text-violet-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Liability Velocity</h3>
            <p className="mt-2 text-slate-500">Up 12.4% this quarter compared to last year.</p>
          </div>

<<<<<<< HEAD
    </tbody>

  </table></div>

</div>
{/* ================= INSIGHTS ================= */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="rounded-[28px] border border-slate-200 bg-white p-6">

    <TrendingUp className="text-violet-600" />

    <h3 className="mt-4 font-bold text-lg">
      Liability Velocity
    </h3>

    <p className="mt-2 text-slate-500">
      Up 12.4% this quarter compared to last year.
    </p>

  </div>

  <div className="rounded-[28px] border border-slate-200 bg-white p-6">

    <ShieldCheck className="text-blue-600" />

    <h3 className="mt-4 font-bold text-lg">
      Compliance Status
    </h3>

    <p className="mt-2 text-slate-500">
      98% partners have valid AML/KYC certification.
    </p>

  </div>

  <div className="rounded-[28px] border border-slate-200 bg-white p-6">

    <AlertTriangle className="text-red-600" />

    <h3 className="mt-4 font-bold text-lg">
      Overdue Settlements
    </h3>

    <p className="mt-2 text-slate-500">
      4 partners exceeded payout threshold by 30+ days.
    </p>

  </div>

</div>
=======
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <ShieldCheck className="text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Compliance Status</h3>
            <p className="mt-2 text-slate-500">98% partners have valid AML/KYC certification.</p>
          </div>
>>>>>>> 85a8df8 (updated partner UI)

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <AlertTriangle className="text-red-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Overdue Settlements</h3>
            <p className="mt-2 text-slate-500">4 partners exceeded payout threshold by 30+ days.</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
