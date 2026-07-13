import React, { useState, useRef, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  AlertTriangle,
  Ban,
  Activity,
  Shield,
  WifiOff,
  Copy,
  XCircle,
  Filter,
} from "lucide-react";

const allFlaggedRecords = [
  { id: "user_8921_beta", ip: "192.168.1.104", trigger: "Rapid Referral Spiking", risk: "CRITICAL 94", time: "2 mins ago", riskType: "CRITICAL", colorClass: "bg-red-50 text-red-600 border-red-100" },
  { id: "referral_vortex_77", ip: "email mismatch", trigger: "Duplicate Account", risk: "HIGH 72", time: "14 mins ago", riskType: "HIGH", colorClass: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { id: "shadow_walker_01", ip: "proxy detected", trigger: "VPN Usage", risk: "MEDIUM 45", time: "1 hour ago", riskType: "MEDIUM", colorClass: "bg-orange-50 text-orange-500 border-orange-100" },
  { id: "guest_9912", ip: "10.0.0.52", trigger: "Velocity Check Failed", risk: "HIGH 80", time: "2 hours ago", riskType: "HIGH", colorClass: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { id: "promo_abuser_z", ip: "multiple accounts", trigger: "Sybil Attack", risk: "CRITICAL 98", time: "3 hours ago", riskType: "CRITICAL", colorClass: "bg-red-50 text-red-600 border-red-100" },
  { id: "bot_net_33", ip: "aws datacenter", trigger: "Datacenter IP", risk: "MEDIUM 50", time: "5 hours ago", riskType: "MEDIUM", colorClass: "bg-orange-50 text-orange-500 border-orange-100" },
];

export default function FraudDetectionPage() {
  const { addToast } = useToast();
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  
  const filterRef = useRef(null);

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
    addToast("Exporting detailed fraud analysis report...", "success");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  let displayedRecords = [...allFlaggedRecords];
  if (activeFilter !== "All") {
    displayedRecords = displayedRecords.filter(r => r.riskType === activeFilter);
  }

  const visibleRecords = showAllRecords ? displayedRecords : displayedRecords.slice(0, 3);

  return (
    <AdminShell activeTab="Referrals">
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Referral Fraud Detection
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Real-time monitoring of referral integrity and system security.
            </p>
          </div>

          <div className="flex gap-2 relative">
            <div ref={filterRef} className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition-all shadow-sm h-full"
              >
                <Filter size={13} />
                <span>Filters {activeFilter !== 'All' && `(${activeFilter})`}</span>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10">
                  <div className="p-2">
                    {['All', 'CRITICAL', 'HIGH', 'MEDIUM'].map(risk => (
                      <button 
                        key={risk}
                        onClick={() => { setActiveFilter(risk); setIsFilterOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${activeFilter === risk ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={handleExportPDF}
              className="px-3 py-1.5 text-xs font-bold bg-indigo-650 hover:bg-indigo-700 text-black bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer transition-all shadow-sm border border-slate-300"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* GLOBAL SCORE */}
          <div 
            onClick={() => addToast("Card clicked: Global Fraud Score details", "success")}
            className="p-3 min-h-[80px] bg-white border border-slate-300 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start w-full">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500">GLOBAL FRAUD SCORE</p>
                <h3 className="text-lg font-black text-slate-900 mt-1 leading-tight">
                  24.8 <span className="text-[10px] font-bold text-slate-400">/ 100</span>
                </h3>
              </div>
              <span className="text-[8px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-extrabold border border-indigo-150">LIVE</span>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <span className="text-[9px] text-slate-500 font-semibold">Risk level: Low-Med</span>
              <div className="w-16 h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-700 w-1/4 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* FLAGGED */}
          <div 
            onClick={() => addToast("Card clicked: Flagged Referrals analysis", "success")}
            className="p-3 min-h-[80px] bg-white border border-slate-300 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start w-full">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500">FLAGGED REFERRALS</p>
                <h3 className="text-lg font-black text-slate-900 mt-1 leading-tight">1,284</h3>
              </div>
              <div className="text-red-500 mt-0.5">
                <AlertTriangle size={14} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <span className="text-[9px] text-red-500 font-semibold">+12% from yesterday</span>
              <div className="w-16 h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-2/3 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* BLOCKED */}
          <div 
            onClick={() => addToast("Card clicked: Blocked Accounts detailed logs", "success")}
            className="p-3 min-h-[80px] bg-white border border-slate-300 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start w-full">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500">BLOCKED ACCOUNTS</p>
                <h3 className="text-lg font-black text-slate-900 mt-1 leading-tight">492</h3>
              </div>
              <div className="text-slate-600 mt-0.5">
                <Ban size={14} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <span className="text-[9px] text-slate-500 font-semibold">Bot: 312 • Sybil: 180</span>
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* TABLE */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-sm text-slate-900">Recently Flagged Items</h2>
              <button 
                onClick={() => {
                  setShowAllRecords(!showAllRecords);
                  if (!showAllRecords) addToast("Expanded to show all full audit records...", "success");
                }}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer transition-colors"
              >
                {showAllRecords ? "View Less" : "View All Records"}
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
                <thead className="text-slate-500 border-b border-slate-100 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5">Entity</th>
                    <th>Trigger</th>
                    <th>Risk</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleRecords.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-500 font-semibold text-xs border-b border-slate-100">
                        No flagged items matching this filter.
                      </td>
                    </tr>
                  ) : (
                    visibleRecords.map((item, index) => (
                      <tr 
                        key={index}
                        onClick={() => addToast(`Opening threat review for ${item.id}`, "success")}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        <td className="py-3 font-bold text-slate-800">
                          {item.id}
                          <p className="text-[10px] text-gray-400 font-normal mt-0.5">{item.ip}</p>
                        </td>
                        <td className="font-semibold text-slate-650">{item.trigger}</td>
                        <td>
                          <span className={`${item.colorClass} px-2 py-0.5 rounded text-[9px] font-extrabold border`}>
                            {item.risk}
                          </span>
                        </td>
                        <td className="text-gray-400 font-semibold">{item.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
</div>
            </div>
            
            {showAllRecords && visibleRecords.length > 3 && (
               <div className="mt-4 flex justify-center border-t border-slate-100 pt-3">
                 <button 
                    onClick={() => setShowAllRecords(false)}
                    className="text-[10px] font-bold text-slate-500 hover:text-indigo-700 uppercase tracking-wider transition-colors"
                  >
                    Collapse Records
                  </button>
               </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-4">
            {/* THREAT DISTRIBUTION */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 mb-4">Threat Distribution</h3>

              <div className="space-y-4 text-xs font-bold text-slate-650">
                {/* BOT FARM */}
                <div onClick={() => addToast("Threat type: Bot Farm details", "success")} className="cursor-pointer group">
                  <div className="flex justify-between mb-1.5">
                    <span className="group-hover:text-indigo-900">Bot Farm Activity</span>
                    <span>42%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[42%]"></div>
                  </div>
                </div>

                {/* DUPLICATE IP */}
                <div onClick={() => addToast("Threat type: Duplicate IP details", "success")} className="cursor-pointer group">
                  <div className="flex justify-between mb-1.5">
                    <span className="group-hover:text-indigo-900">Duplicate IP Usage</span>
                    <span>28%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full w-[28%]"></div>
                  </div>
                </div>

                {/* VPN */}
                <div onClick={() => addToast("Threat type: VPN details", "success")} className="cursor-pointer group">
                  <div className="flex justify-between mb-1.5">
                    <span className="group-hover:text-indigo-900">VPN / Tunnel Bypass</span>
                    <span>15%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-50 rounded-full w-[15%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AUTOMATION */}
            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-sm flex flex-col justify-between min-h-[140px]">
              <div>
                <h3 className="font-bold text-sm">Automated Security</h3>
                <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">
                  AI is handling 82% mitigation tasks.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-3 text-green-450 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Active</span>
              </div>

              <button 
                onClick={() => setIsConfigureModalOpen(true)}
                className="mt-3 w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-2 rounded-lg text-xs transition-all cursor-pointer shadow-sm"
              >
                Configure Rules
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configure Rules Modal */}
      {isConfigureModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-indigo-955 text-lg">Configure Automated Rules</h2>
              <button onClick={() => setIsConfigureModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Auto-Ban Critical Threats</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Automatically suspend accounts with risk score &gt; 90</div>
                </div>
                <div 
                  className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner"
                  onClick={(e) => {
                    const el = e.currentTarget;
                    if(el.classList.contains('bg-indigo-600')){
                      el.classList.replace('bg-indigo-600', 'bg-slate-200');
                      el.firstChild.classList.replace('right-0.5', 'left-0.5');
                    } else {
                      el.classList.replace('bg-slate-200', 'bg-indigo-600');
                      el.firstChild.classList.replace('left-0.5', 'right-0.5');
                    }
                  }}
                >
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm transition-all duration-200 border border-slate-200"></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Strict VPN Blocking</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Flag any traffic originating from known datacenter IPs</div>
                </div>
                <div 
                  className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer shadow-inner"
                  onClick={(e) => {
                    const el = e.currentTarget;
                    if(el.classList.contains('bg-indigo-600')){
                      el.classList.replace('bg-indigo-600', 'bg-slate-200');
                      el.firstChild.classList.replace('right-0.5', 'left-0.5');
                    } else {
                      el.classList.replace('bg-slate-200', 'bg-indigo-600');
                      el.firstChild.classList.replace('left-0.5', 'right-0.5');
                    }
                  }}
                >
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-all duration-200 border border-slate-200"></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Velocity Limits</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Alert when &gt;10 referrals occur within 5 minutes</div>
                </div>
                <div 
                  className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner"
                  onClick={(e) => {
                    const el = e.currentTarget;
                    if(el.classList.contains('bg-indigo-600')){
                      el.classList.replace('bg-indigo-600', 'bg-slate-200');
                      el.firstChild.classList.replace('right-0.5', 'left-0.5');
                    } else {
                      el.classList.replace('bg-slate-200', 'bg-indigo-600');
                      el.firstChild.classList.replace('left-0.5', 'right-0.5');
                    }
                  }}
                >
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm transition-all duration-200 border border-slate-200"></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setIsConfigureModalOpen(false)}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsConfigureModalOpen(false); addToast("Rules saved successfully", "success"); }}
                className="bg-indigo-900 hover:bg-indigo-850 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}