import React, { useState, useRef, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Download,
  Search,
  Filter,
  MoreVertical,
  Share2,
  MousePointerClick,
  BadgeCheck,
  Wallet,
} from "lucide-react";

const allTrafficSources = [
  { source: "Monthly Newsletter", category: "EMAIL", referrals: "2,419", rate: "14.2%", trend: "📈" },
  { source: "Instagram Stories", category: "SOCIAL", referrals: "1,852", rate: "9.8%", trend: "📈" },
  { source: "In-Store Display", category: "QR CODE", referrals: "1,105", rate: "18.5%", trend: "📉" },
  { source: "Main Landing Page", category: "DIRECT", referrals: "984", rate: "11.1%", trend: "📈" },
  { source: "YouTube Sponsorship", category: "SOCIAL", referrals: "842", rate: "7.4%", trend: "➖" },
  { source: "Welcome Email Flow", category: "EMAIL", referrals: "750", rate: "12.0%", trend: "📈" },
  { source: "Twitter Promo", category: "SOCIAL", referrals: "620", rate: "6.5%", trend: "📉" },
  { source: "Checkout Page Link", category: "DIRECT", referrals: "450", rate: "15.3%", trend: "📈" },
];

function StatCard({
  icon: Icon,
  title,
  value,
  change,
  color = "text-emerald-500",
  onClick,
}) {
  return (
    <div 
      onClick={onClick}
      className="p-3 min-h-[80px] bg-white border border-slate-300 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start w-full">
        <div>
          <p className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500">
            {title}
          </p>
          <h3 className="text-lg font-black text-slate-900 mt-1 leading-tight">
            {value}
          </h3>
        </div>
        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 mt-0.5">
          <Icon size={14} />
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 w-full">
        <span className={`text-[9px] font-semibold ${color}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function ReferralSourcesPage() {
  const { addToast } = useToast();
  const [activeRange, setActiveRange] = useState("Last 30 Days");
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [showAllSources, setShowAllSources] = useState(false);
  const filterRef = useRef(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportPDF = () => {
    addToast("Generating detailed traffic sources matrix PDF...", "success");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  let displayedSources = [...allTrafficSources];
  
  if (activeRange === "Quarterly") {
      displayedSources = displayedSources.map(s => ({ ...s, referrals: (parseInt(s.referrals.replace(',','')) * 3).toLocaleString() }));
  } else if (activeRange === "Yearly") {
      displayedSources = displayedSources.map(s => ({ ...s, referrals: (parseInt(s.referrals.replace(',','')) * 12).toLocaleString() }));
  }

  if (activeFilter !== "All") {
      displayedSources = displayedSources.filter(s => s.category === activeFilter);
  }

  if (searchQuery) {
      displayedSources = displayedSources.filter(s => s.source.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const visibleSources = showAllSources ? displayedSources : displayedSources.slice(0, 5);

  const getKPIStats = () => {
    if (activeRange === "Quarterly") {
      return { total: "42,876", ctr: "26.1%", conv: "13.5%", payout: "$72.1k" };
    }
    if (activeRange === "Yearly") {
      return { total: "171,504", ctr: "25.8%", conv: "14.2%", payout: "$295.4k" };
    }
    return { total: "14,292", ctr: "24.8%", conv: "12.1%", payout: "$24.5k" };
  };

  const kpi = getKPIStats();

  return (
    <AdminShell
      activeTab="Referrals"
      searchPlaceholder="Search campaigns or users..."
    >
      <div className="bg-slate-100 min-h-screen p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900">
              Referral Sources
            </h1>
            <p className="text-slate-600 mt-1 text-sm">
              Visualize and track where your user acquisition efforts are most successful.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-sm">
              <button 
                onClick={() => { setActiveRange("Last 30 Days"); addToast("Filtered timeline: Last 30 Days", "success"); }}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border-r border-slate-200 ${activeRange === "Last 30 Days" ? "bg-indigo-900 text-white" : "hover:bg-slate-50 text-slate-700"}`}
              >
                Last 30 Days
              </button>
              <button 
                onClick={() => { setActiveRange("Quarterly"); addToast("Filtered timeline: Quarterly", "success"); }}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border-r border-slate-200 ${activeRange === "Quarterly" ? "bg-indigo-900 text-white" : "hover:bg-slate-50 text-slate-700"}`}
              >
                Quarterly
              </button>
              <button 
                onClick={() => { setActiveRange("Yearly"); addToast("Filtered timeline: Yearly", "success"); }}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${activeRange === "Yearly" ? "bg-indigo-900 text-white" : "hover:bg-slate-50 text-slate-700"}`}
              >
                Yearly
              </button>
            </div>

            <button 
              onClick={handleExportPDF}
              className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-900 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Download size={13} />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Share2}
            title="Total Referrals"
            value={kpi.total}
            change="+12.5%"
            onClick={() => addToast("Card clicked: Total Referrals conversion split", "success")}
          />

          <StatCard
            icon={MousePointerClick}
            title="Click Through Rate"
            value={kpi.ctr}
            change="+8.2%"
            onClick={() => addToast("Card clicked: Click Through Rate details", "success")}
          />

          <StatCard
            icon={BadgeCheck}
            title="Conversion Rate"
            value={kpi.conv}
            change="-1.4%"
            color="text-red-500"
            onClick={() => addToast("Card clicked: Source Conversion Rate details", "success")}
          />

          <StatCard
            icon={Wallet}
            title="Total Payouts"
            value={kpi.payout}
            change="+22%"
            onClick={() => addToast("Card clicked: Traffic Source Payouts ledger", "success")}
          />
        </div>

        {/* Distribution & Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-lg text-slate-900">
                Source Distribution
              </h2>
              <button 
                onClick={() => addToast("Opening source distribution configuration...", "success")}
                className="hover:text-indigo-800 transition-all cursor-pointer"
              >
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="flex justify-center py-6">
              <div 
                onClick={() => addToast("Source distribution segment focused", "success")}
                className="relative w-60 h-60 cursor-pointer hover:opacity-95 transition-all"
              >
                {/* Donut Ring */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "conic-gradient(#1e1b7a 0deg 162deg, #4338ca 162deg 252deg, #6366f1 252deg 324deg, #a5b4fc 324deg 360deg)"
                  }}
                />
                {/* Inner Circle */}
                <div className="absolute inset-[24px] bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <h2 className="text-3xl font-black text-slate-900">Global</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Traffic Sources</p>
                  <span className="mt-2.5 px-3 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[9px] font-extrabold border border-indigo-100">
                    {kpi.total} Referrals
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6 text-xs font-semibold text-slate-650">
              <div onClick={() => { setActiveFilter('SOCIAL'); setShowAllSources(true); addToast("Filtered table by Social", "success"); }} className="cursor-pointer hover:text-indigo-900 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-indigo-900 rounded-full" />
                  <span>Social</span>
                </div>
                <p className="mt-1 text-slate-500 pl-4.5 font-bold">45%</p>
              </div>

              <div onClick={() => { setActiveFilter('EMAIL'); setShowAllSources(true); addToast("Filtered table by Email", "success"); }} className="cursor-pointer hover:text-indigo-900 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-indigo-700 rounded-full" />
                  <span>Email</span>
                </div>
                <p className="mt-1 text-slate-500 pl-4.5 font-bold">25%</p>
              </div>

              <div onClick={() => { setActiveFilter('DIRECT'); setShowAllSources(true); addToast("Filtered table by Direct", "success"); }} className="cursor-pointer hover:text-indigo-900 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#6366f1] rounded-full" />
                  <span>Direct</span>
                </div>
                <p className="mt-1 text-slate-500 pl-4.5 font-bold">20%</p>
              </div>

              <div onClick={() => { setActiveFilter('QR CODE'); setShowAllSources(true); addToast("Filtered table by QR Codes", "success"); }} className="cursor-pointer hover:text-indigo-900 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#a5b4fc] rounded-full" />
                  <span>QR Codes</span>
                </div>
                <p className="mt-1 text-slate-500 pl-4.5 font-bold">10%</p>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-5 flex justify-between items-center border-b border-slate-200 relative">
              <h2 className="font-bold text-lg text-slate-900">
                Top Traffic Sources
              </h2>
              <div className="flex gap-3 items-center">
                {isSearchOpen && (
                  <input
                    type="text"
                    placeholder="Search sources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-1 text-xs w-40 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                )}
                
                <div ref={filterRef} className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`hover:text-indigo-850 cursor-pointer ${activeFilter !== 'All' ? 'text-indigo-700 font-bold' : ''}`}
                    aria-label="Filter traffic sources"
                  >
                    <Filter size={15} />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10">
                      <div className="p-2">
                        {['All', 'EMAIL', 'SOCIAL', 'DIRECT', 'QR CODE'].map(cat => (
                          <button 
                            key={cat}
                            onClick={() => { setActiveFilter(cat); setIsFilterOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${activeFilter === cat ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (isSearchOpen) setSearchQuery(""); 
                  }}
                  className={`hover:text-indigo-850 cursor-pointer ${isSearchOpen ? 'text-indigo-700 font-bold' : ''}`}
                  aria-label="Search traffic sources"
                >
                  <Search size={15} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <div className="table-responsive-wrapper">
<table className="w-full min-w-[500px] border-collapse">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                    <th className="p-4">Source Detail</th>
                    <th>Category</th>
                    <th>Referrals</th>
                    <th>Conv. Rate</th>
                    <th>Trend</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleSources.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500 font-semibold text-xs">
                        No traffic sources found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    visibleSources.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => addToast(`Opening detailed analytics review for ${item.source}`, "success")}
                        className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-all font-semibold text-xs"
                      >
                        <td className="p-4 font-bold text-slate-905">{item.source}</td>
                        <td>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase border ${
                            item.category === 'EMAIL' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            item.category === 'SOCIAL' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            item.category === 'DIRECT' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            'bg-orange-50 text-orange-700 border-orange-100'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="font-bold text-slate-900">{item.referrals}</td>
                        <td className="text-slate-650">{item.rate}</td>
                        <td className="text-base">{item.trend}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
</div>
            </div>

            <div className="text-center p-5 border-t border-slate-200">
              <button 
                onClick={() => {
                  setShowAllSources(!showAllSources);
                  if (!showAllSources) addToast("Expanded to show all traffic sources", "success");
                }}
                className="text-indigo-700 hover:text-indigo-900 font-bold text-xs cursor-pointer transition-all"
              >
                {showAllSources ? "View Less" : "View All Traffic Sources"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}