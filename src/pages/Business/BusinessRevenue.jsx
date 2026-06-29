import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Calendar,
  Download,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

// ─── DATA SETS PER PERIOD ────────────────────────────────────────────────────
const PERIODS = ["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"];

const PERIOD_DATA = {
  "Last 7 Days": {
    subtitle: "Financial performance across all business units — last 7 days.",
    totalEarnings: "$98,420.10",
    earningsGrowth: "+5.2%",
    pendingSettlements: "$8,340.00",
    payoutDays: "2 business days",
    availablePayout: "$4,200.00",
    bars: [28, 42, 35, 50, 38, 62, 45],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    services: [
      { label: "Facility Management", pct: 38, color: "bg-black" },
      { label: "Security Personnel",  pct: 30, color: "bg-gray-700" },
      { label: "Technical Support",   pct: 20, color: "bg-gray-500" },
      { label: "Consultation",        pct: 12, color: "bg-gray-400" },
    ],
    regions: [
      { name: "North America", color: "bg-black",   amount: "$48.2k" },
      { name: "Europe",        color: "bg-gray-500", amount: "$32.1k" },
      { name: "Asia Pacific",  color: "bg-gray-300", amount: "$18.1k" },
    ],
    payouts: [
      { id: "#TRX-9491", recipient: "Express Logistics",     date: "Oct 28, 2023", amount: "$6,200.00",  status: "COMPLETED" },
      { id: "#TRX-9490", recipient: "Tech Services Corp",    date: "Oct 27, 2023", amount: "$2,100.50",  status: "PROCESSING" },
      { id: "#TRX-9489", recipient: "Security Partners",     date: "Oct 26, 2023", amount: "$3,400.00",  status: "COMPLETED" },
      { id: "#TRX-9488", recipient: "Consultation Fee",      date: "Oct 25, 2023", amount: "$900.00",    status: "COMPLETED" },
    ],
  },
  "Last 30 Days": {
    subtitle: "Financial performance across all business units for Q4 2023.",
    totalEarnings: "$482,910.42",
    earningsGrowth: "+12.5%",
    pendingSettlements: "$24,103.00",
    payoutDays: "3 business days",
    availablePayout: "$12,050.00",
    bars: [40, 45, 50, 40, 58, 90, 39, 33],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    services: [
      { label: "Facility Management", pct: 42, color: "bg-black" },
      { label: "Security Personnel",  pct: 28, color: "bg-gray-700" },
      { label: "Technical Support",   pct: 18, color: "bg-gray-500" },
      { label: "Consultation",        pct: 12, color: "bg-gray-400" },
    ],
    regions: [
      { name: "North America", color: "bg-black",   amount: "$210.4k" },
      { name: "Europe",        color: "bg-gray-500", amount: "$154.2k" },
      { name: "Asia Pacific",  color: "bg-gray-300", amount: "$98.3k" },
    ],
    payouts: [
      { id: "#TRX-9481", recipient: "Main Branch Fleet",      date: "Oct 24, 2023", amount: "$14,200.00", status: "COMPLETED" },
      { id: "#TRX-9480", recipient: "Logistics Partner Ltd",  date: "Oct 23, 2023", amount: "$3,450.00",  status: "PROCESSING" },
      { id: "#TRX-9479", recipient: "Service Subscriptions",  date: "Oct 22, 2023", amount: "$840.50",    status: "COMPLETED" },
      { id: "#TRX-9478", recipient: "Maintenance Fees",       date: "Oct 21, 2023", amount: "$1,100.00",  status: "COMPLETED" },
    ],
  },
  "Last 90 Days": {
    subtitle: "Quarterly financial overview — Q3 + Q4 2023 combined.",
    totalEarnings: "$1,241,388.00",
    earningsGrowth: "+18.3%",
    pendingSettlements: "$56,800.00",
    payoutDays: "5 business days",
    availablePayout: "$31,400.00",
    bars: [55, 60, 48, 72, 65, 80, 70, 90],
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    services: [
      { label: "Facility Management", pct: 45, color: "bg-black" },
      { label: "Security Personnel",  pct: 25, color: "bg-gray-700" },
      { label: "Technical Support",   pct: 20, color: "bg-gray-500" },
      { label: "Consultation",        pct: 10, color: "bg-gray-400" },
    ],
    regions: [
      { name: "North America", color: "bg-black",   amount: "$540.1k" },
      { name: "Europe",        color: "bg-gray-500", amount: "$420.8k" },
      { name: "Asia Pacific",  color: "bg-gray-300", amount: "$280.5k" },
    ],
    payouts: [
      { id: "#TRX-9460", recipient: "Fleet Management Co",   date: "Sep 30, 2023", amount: "$28,500.00", status: "COMPLETED" },
      { id: "#TRX-9455", recipient: "Regional Hub East",     date: "Sep 25, 2023", amount: "$12,200.00", status: "COMPLETED" },
      { id: "#TRX-9440", recipient: "Security Division",     date: "Sep 18, 2023", amount: "$8,750.00",  status: "PROCESSING" },
      { id: "#TRX-9430", recipient: "Consulting Services",   date: "Sep 10, 2023", amount: "$4,300.00",  status: "COMPLETED" },
    ],
  },
  "This Year": {
    subtitle: "Full year financial performance summary — FY 2023.",
    totalEarnings: "$5,842,104.80",
    earningsGrowth: "+24.1%",
    pendingSettlements: "$138,400.00",
    payoutDays: "7 business days",
    availablePayout: "$84,900.00",
    bars: [62, 70, 58, 85, 75, 92, 80, 95],
    labels: ["Jan", "Mar", "May", "Jul", "Aug", "Sep", "Oct", "Dec"],
    services: [
      { label: "Facility Management", pct: 48, color: "bg-black" },
      { label: "Security Personnel",  pct: 22, color: "bg-gray-700" },
      { label: "Technical Support",   pct: 18, color: "bg-gray-500" },
      { label: "Consultation",        pct: 12, color: "bg-gray-400" },
    ],
    regions: [
      { name: "North America", color: "bg-black",   amount: "$2.4M" },
      { name: "Europe",        color: "bg-gray-500", amount: "$1.9M" },
      { name: "Asia Pacific",  color: "bg-gray-300", amount: "$1.5M" },
    ],
    payouts: [
      { id: "#TRX-9001", recipient: "Annual Fleet Contract", date: "Dec 01, 2023", amount: "$84,000.00", status: "COMPLETED" },
      { id: "#TRX-8980", recipient: "YE Security Audit",     date: "Nov 28, 2023", amount: "$42,500.00", status: "PROCESSING" },
      { id: "#TRX-8950", recipient: "Tech Infrastructure",   date: "Nov 15, 2023", amount: "$29,100.00", status: "COMPLETED" },
      { id: "#TRX-8900", recipient: "Advisory Retainer",     date: "Oct 30, 2023", amount: "$18,200.00", status: "COMPLETED" },
    ],
  },
};

export default function BusinessRevenue() {
  const { addToast } = useToast();
  const [activePeriod, setActivePeriod]         = useState("Last 30 Days");
  const [periodDropdown, setPeriodDropdown]      = useState(false);
  const [selectedRow, setSelectedRow]            = useState(null);
  const [selectedService, setSelectedService]    = useState(null);
  const [selectedRegion, setSelectedRegion]      = useState(null);
  const [hoveredBar, setHoveredBar]              = useState(null);
  const [withdrawClicked, setWithdrawClicked]    = useState(false);
  const [viewAllClicked, setViewAllClicked]      = useState(false);
  const [breakdownClicked, setBreakdownClicked]  = useState(false);
  const [mapClicked, setMapClicked]              = useState(false);
  const [exportClicked, setExportClicked]        = useState(false);

  const d = PERIOD_DATA[activePeriod];
  
  const handleExport = () => {
    setExportClicked(true);
    setTimeout(() => setExportClicked(false), 300);
    addToast('Generating revenue report CSV...', 'success');
    
    if (!d || !d.payouts || d.payouts.length === 0) {
      addToast('No revenue data to export', 'error');
      return;
    }
    
    const headers = "Transaction ID,Recipient,Date,Amount,Status";
    const csvRows = d.payouts.map(payout => 
      `"${payout.id}","${payout.recipient}","${payout.date}","${payout.amount}","${payout.status}"`
    );
    
    const csvContent = [headers, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'business_revenue_report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWithdraw = () => {
    setWithdrawClicked(true);
    setTimeout(() => setWithdrawClicked(false), 300);
    
    if (d.availablePayout === "$0.00" || d.availablePayout === "$0") {
      addToast('No funds available for withdrawal.', 'error');
    } else {
      addToast(`Withdrawal of ${d.availablePayout} initiated successfully. Processing may take up to ${d.payoutDays}.`, 'success');
    }
  };

  const flashBtn = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 300);
  };

  const handlePeriodSelect = (period) => {
    setActivePeriod(period);
    setPeriodDropdown(false);
    setSelectedRow(null);
    setSelectedService(null);
    setSelectedRegion(null);
    setHoveredBar(null);
  };

  const maxBar = Math.max(...d.bars);

  return (
    <AdminShell
      activeTab="Revenue Dashboard"
      searchPlaceholder="Search revenue data..."
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Revenue Dashboard</h1>
            <p className="text-gray-500 mt-2 transition-all duration-300">{d.subtitle}</p>
          </div>

          <div className="flex gap-3 relative">

            {/* Period Selector */}
            <div className="relative">
              <button
                className="h-12 px-5 border rounded-lg flex items-center gap-2 transition-all duration-150 hover:bg-gray-50 active:scale-95"
                onClick={() => setPeriodDropdown((v) => !v)}
                type="button"
              >
                <Calendar size={18} />
                {activePeriod}
              </button>
              {periodDropdown && (
                <div className="absolute right-0 top-14 w-44 bg-white border rounded-xl shadow-xl z-30 overflow-hidden">
                  {PERIODS.map((p) => (
                    <button
                      key={p}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 active:bg-gray-100 ${activePeriod === p ? "font-bold text-indigo-700 bg-indigo-50" : ""}`}
                      onClick={() => handlePeriodSelect(p)}
                      type="button"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`h-12 px-5 bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all duration-150 active:scale-95 hover:bg-indigo-800 ${exportClicked ? "scale-95 bg-indigo-900" : ""}`}
              onClick={handleExport}
              type="button"
            >
              <Download size={18} />
              Export Report
            </button>

          </div>
        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-12 gap-6">

          {/* BAR CHART */}
          <div className="col-span-8 bg-white border rounded-xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-semibold">Earnings Overview</h2>
                <p className="text-gray-500">Net revenue vs Operating costs — {activePeriod}</p>
              </div>
              <div className="flex gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-700" />Revenue
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-200" />Costs
                </div>
              </div>
            </div>

            {/* BARS */}
            <div className="h-[300px] flex items-end justify-between px-6 gap-2">
              {d.bars.map((bar, index) => {
                const isHovered = hoveredBar === index;
                const heightPct = (bar / maxBar) * 100;
                const costPct   = ((bar * 0.6) / maxBar) * 100;
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-end items-center gap-0 flex-1 cursor-pointer group"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => setHoveredBar(isHovered ? null : index)}
                  >
                    {isHovered && (
                      <div className="mb-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        ${(bar * 4.8).toFixed(1)}k
                      </div>
                    )}
                    {/* Cost bar */}
                    <div
                      className="w-full bg-blue-200 rounded-t transition-all duration-500"
                      style={{ height: `${costPct * 2.5}px` }}
                    />
                    {/* Revenue bar */}
                    <div
                      className={`w-full rounded-t transition-all duration-500 ${isHovered ? "bg-indigo-500" : "bg-indigo-700"}`}
                      style={{ height: `${heightPct * 1.5}px`, marginTop: "-12px" }}
                    />
                    <span className="text-xs text-gray-400 mt-2">{d.labels[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="col-span-4 space-y-4">

            {/* Total Earnings */}
            <div className="bg-white border rounded-xl p-6">
              <h4 className="text-gray-500 text-xl">Total Earnings</h4>
              <div className="text-2xl font-bold mt-3 transition-all duration-500">{d.totalEarnings}</div>
              <p className="text-green-600 mt-5 flex items-center gap-1">
                <ArrowUpRight size={16} />
                {d.earningsGrowth} from last period
              </p>
            </div>

            {/* Pending Settlements */}
            <div className="bg-white border rounded-xl p-6">
              <h4 className="text-gray-500 text-xl">Pending Settlements</h4>
              <div className="text-2xl font-bold mt-3 transition-all duration-500">{d.pendingSettlements}</div>
              <p className="text-gray-500 mt-5 flex items-center gap-2">
                <Clock3 size={15} />
                Est. payout in {d.payoutDays}
              </p>
            </div>

            {/* Available for Payout */}
            <div className="bg-indigo-800 text-white rounded-xl p-6">
              <h4 className="text-indigo-200 text-xl">Available for Payout</h4>
              <div className="text-2xl font-bold mt-3 transition-all duration-500">{d.availablePayout}</div>
              <button
                className={`bg-white text-black px-5 h-12 rounded-lg mt-6 font-semibold transition-all duration-150 active:scale-95 hover:bg-gray-100 ${withdrawClicked ? "scale-95 bg-gray-200" : ""}`}
                onClick={handleWithdraw}
                type="button"
              >
                Withdraw Funds
              </button>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-12 gap-6">

          {/* RECENT PAYOUTS */}
          <div className="col-span-8 bg-white border rounded-xl overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-3xl font-semibold">Recent Payouts</h2>
              <button
                className={`font-semibold transition-all duration-150 hover:text-indigo-700 active:scale-95 ${viewAllClicked ? "text-indigo-700 scale-95" : ""}`}
                onClick={() => flashBtn(setViewAllClicked)}
                type="button"
              >
                View All
              </button>
            </div>

            {/* TABLE HEAD */}
            <div className="grid grid-cols-5 px-6 py-4 bg-gray-50 border-b text-gray-500 text-sm font-semibold uppercase">
              <div>Transaction ID</div>
              <div>Recipient</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>

            {/* TABLE ROWS */}
            {d.payouts.map((item, index) => {
              const isSelected = selectedRow === index;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-5 px-6 py-6 border-b last:border-b-0 items-center cursor-pointer transition-all duration-150 select-none active:scale-[0.998] ${
                    isSelected ? "bg-indigo-50 border-l-4 border-l-indigo-600" : "hover:bg-gray-50 border-l-4 border-l-transparent"
                  }`}
                  onClick={() => setSelectedRow(isSelected ? null : index)}
                >
                  <div className={`font-semibold transition-colors ${isSelected ? "text-indigo-700" : ""}`}>{item.id}</div>
                  <div>{item.recipient}</div>
                  <div>{item.date}</div>
                  <div className={`font-semibold transition-colors ${isSelected ? "text-indigo-700" : ""}`}>{item.amount}</div>
                  <div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      item.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* REVENUE BY SERVICE */}
          <div className="col-span-4 bg-white border rounded-xl p-6">
            <h2 className="text-3xl font-semibold mb-8">Revenue by Service</h2>

            {d.services.map((svc, i) => {
              const isSelected = selectedService === i;
              return (
                <div
                  key={svc.label}
                  className={`mb-6 cursor-pointer rounded-lg p-2 transition-all duration-150 active:scale-[0.98] ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                  onClick={() => setSelectedService(isSelected ? null : i)}
                >
                  <div className="flex justify-between mb-3">
                    <span className={`text-xl transition-colors ${isSelected ? "text-indigo-700 font-semibold" : ""}`}>{svc.label}</span>
                    <span className={`font-bold text-xl transition-colors ${isSelected ? "text-indigo-700" : ""}`}>{svc.pct}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${isSelected ? "bg-indigo-600" : svc.color}`}
                      style={{ width: `${svc.pct}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="border-t pt-6 mt-4">
              <button
                className={`font-semibold text-xl transition-all duration-150 hover:text-indigo-700 active:scale-95 ${breakdownClicked ? "text-indigo-700 scale-95" : ""}`}
                onClick={() => flashBtn(setBreakdownClicked)}
                type="button"
              >
                View Detailed Breakdown
              </button>
            </div>
          </div>

        </div>

        {/* GLOBAL REVENUE SECTION */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="grid grid-cols-12">

            {/* LEFT INFO */}
            <div className="col-span-4 p-8 border-r">
              <h2 className="text-2xl font-semibold mb-4">Global Revenue</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Regional distribution of earnings and contract density across primary hubs.
              </p>

              <div className="space-y-6">
                {d.regions.map((region, i) => {
                  const isSelected = selectedRegion === i;
                  return (
                    <div
                      key={region.name}
                      className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 transition-all duration-150 active:scale-[0.98] ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                      onClick={() => setSelectedRegion(isSelected ? null : i)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${isSelected ? "bg-indigo-600" : region.color}`} />
                        <span className={`text-2xl transition-colors ${isSelected ? "text-indigo-700 font-semibold" : ""}`}>
                          {region.name}
                        </span>
                      </div>
                      <span className={`font-bold text-2xl transition-all duration-300 ${isSelected ? "text-indigo-700" : ""}`}>
                        {region.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MAP AREA */}
            <div className="col-span-8 relative bg-gray-200 min-h-[380px] flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                alt="World Map"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <button
                className={`relative z-10 bg-white px-8 py-3 rounded-md shadow font-medium transition-all duration-150 hover:bg-gray-50 active:scale-95 active:shadow-inner ${mapClicked ? "bg-indigo-700 text-white scale-95" : ""}`}
                onClick={() => flashBtn(setMapClicked)}
                type="button"
              >
                Interactive Map View
              </button>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t pt-6 mt-10">
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <p>© 2023 Hozify Enterprise. Financial data is updated every 15 minutes.</p>
            <div className="flex gap-8">
              <span>System Status: Operational</span>
              <span className="cursor-pointer hover:text-indigo-700 transition-colors active:scale-95">Privacy Policy</span>
              <span className="cursor-pointer hover:text-indigo-700 transition-colors active:scale-95">Support</span>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}