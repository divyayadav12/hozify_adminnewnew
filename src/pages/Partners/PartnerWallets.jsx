import toast from 'react-hot-toast';
import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  Search,
  Filter,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  ChevronDown,
  Upload,
  Download,
  X,
  CheckCircle,
  Building2,
  Loader2
} from "lucide-react";
import PartnerExportModal from "../../components/ui/PartnerExportModal";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";

// Initial Mock Data
const initialWalletPartners = [
  {
    name: "SkyNet Logistics",
    id: "ID-94821",
    type: "ISP",
    balance: 42500.00,
    threshold: 10000.00,
    status: "On Track",
    velocity: [40, 60, 45, 75, 50, 90, 65],
  },
  {
    name: "BlueWave Systems",
    id: "ID-44210",
    type: "BSP",
    balance: 128400.12,
    threshold: 50000.00,
    status: "Overdue",
    velocity: [80, 50, 95, 40, 70, 85, 100],
  },
  {
    name: "Apex Pro Logistics",
    id: "ID-33109",
    type: "ISP",
    balance: 5120.00,
    threshold: 10000.00,
    status: "Awaiting",
    velocity: [20, 30, 25, 35, 15, 40, 30],
  },
  {
    name: "Vertex Transit",
    id: "ID-22874",
    type: "ISP",
    balance: 89230.50,
    threshold: 25000.00,
    status: "Processing",
    velocity: [60, 70, 80, 65, 90, 75, 85],
  },
];

export default function PartnerWallets() {
  const [walletPartners, setWalletPartners] = useState(initialWalletPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All"); 
  const [timeframe, setTimeframe] = useState("Monthly");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Modal & Progress States
  const [activeModalData, setActiveModalData] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'export-progress'
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Dynamic Filtering
  const filteredSearchPartners = useMemo(() => {
    return walletPartners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [walletPartners, searchQuery]);

  const filteredPartners = useMemo(() => {
    return filteredSearchPartners.filter((partner) => {
      return selectedType === "All" || partner.type === selectedType;
    });
  }, [filteredSearchPartners, selectedType]);

  const typeCounts = useMemo(() => {
    return {
      all: filteredSearchPartners.length,
      ISP: filteredSearchPartners.filter((partner) => partner.type === "ISP").length,
      BSP: filteredSearchPartners.filter((partner) => partner.type === "BSP").length,
    };
  }, [filteredSearchPartners]);

  // Dynamic Metrics
  const metrics = useMemo(() => {
    let total = 0;
    let ispTotal = 0;
    let bspTotal = 0;
    let overdueCount = 0;

    filteredPartners.forEach((p) => {
      total += p.balance;
      if (p.type === "ISP") ispTotal += p.balance;
      if (p.type === "BSP") bspTotal += p.balance;
      if (p.status === "Overdue") overdueCount++;
    });

    return { total, ispTotal, bspTotal, overdueCount };
  }, [filteredPartners]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  const handleReviewPayouts = (e) => {
    e.stopPropagation();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success("Success: All dispatch settlement thresholds checked and verified!");
    }, 1200);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success(`Parsing "${e.target.files[0].name}"... Wallet registry successfully synced.`);
    }
  };

  const handleExport = (format) => {
    setIsExportOpen(false);
    setIsExporting(true);
    setExportProgress(0);
    setActiveModal("export-progress");

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const csvContent = generateCSV(["ID", "Name", "Type", "Balance", "Threshold", "Status"], filteredPartners);
            triggerDownload(csvContent, `partner_wallets_ledger.${format.toLowerCase()}`, format === "CSV" ? "text/csv" : "application/json");
            toast.success(`Ledger database exported in ${format} format!`);
            setIsExporting(false);
            setActiveModal(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleSettleNode = (partnerId, partnerName) => {
    setWalletPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return { ...p, status: "On Track" };
      }
      return p;
    }));
    toast.success(`Direct node settlement successful for ${partnerName}!`);
    setActiveModalData(null);
  };

  // Unified mini graph calculation based on active selections
  const combinedGraphBars = useMemo(() => {
    if (filteredPartners.length === 0) return Array(7).fill(10);
    const result = Array(7).fill(0);
    filteredPartners.forEach(p => {
      p.velocity.forEach((v, idx) => { result[idx] += v; });
    });
    const maxVal = Math.max(...result);
    return result.map(v => (v / maxVal) * 100);
  }, [filteredPartners]);

  return (
    <AdminShell activeTab="Partner Wallets" searchPlaceholder="Search wallets...">
      <div className="space-y-5 max-w-[1400px] mx-auto p-4 text-slate-800 antialiased selection:bg-indigo-100" style={{ paddingBottom: "40px" }}>
        
        {/* TOP COMPACT CONTROLS & CALENDAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-slate-400" />
            <h1 className="text-base font-bold tracking-tight text-slate-800">Partner Intelligence Hub</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* File Actions */}
            <label className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer transition">
              <Upload size={14} />
              <span>Upload</span>
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
            <button 
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-950 transition cursor-pointer border-none"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
            <PartnerExportModal
              open={isExportOpen}
              onClose={() => setIsExportOpen(false)}
              title="Export Wallet Data"
              description="Choose the file format for exporting wallet balances and settlement summaries."
              helper="Your export will include partner balances, thresholds, and activity indicators."
              onExport={handleExport}
              confirmLabel="Generate Export"
            />

            {/* Timeframe Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50/50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition cursor-pointer"
              >
                <Calendar size={14} />
                <span>{timeframe} Window</span>
                <ChevronDown size={12} />
              </button>
              {isCalendarOpen && (
                <div className="absolute right-0 mt-1.5 z-40 w-36 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                  {["Weekly", "Monthly", "Yearly"].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTimeframe(t); setIsCalendarOpen(false); toast.success(`View scope adjusted to ${t} data interval.`); }}
                      className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition cursor-pointer border-none bg-transparent ${timeframe === t ? 'bg-indigo-650 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {t} Analytics
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LIGHT MATTE METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* LIABILITIES CARD */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Liabilities {selectedType !== "All" && `• ${selectedType}`}
            </p>
            <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-slate-900">
              {formatCurrency(metrics.total)}
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['All', 'ISP', 'BSP'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition cursor-pointer border-none ${selectedType === type ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {type}: {type === 'All' ? formatCurrency(metrics.total) : formatCurrency(type === 'ISP' ? metrics.ispTotal : metrics.bspTotal)}
                </button>
              ))}
            </div>
          </div>

          {/* LIGHT UPCOMING PAYOUTS */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-slate-50 to-indigo-50/50 p-5 shadow-sm flex flex-col justify-between" style={{ minHeight: "135px" }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500/90">Upcoming Batch Settlements</p>
              <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">$240,150</h3>
              <p className="mt-1 text-slate-500 text-[11px]">Next execution cycle: Thursday, 14:00 GMT</p>
            </div>
            <button 
              onClick={handleReviewPayouts}
              disabled={isVerifying}
              className="mt-3 w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 active:scale-[0.98] transition shadow-sm hover:shadow cursor-pointer border-none flex items-center justify-center gap-1.5"
            >
              {isVerifying && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isVerifying ? "Verifying..." : "Dispatch Queue Verification"}</span>
            </button>
          </div>

          {/* PROFESSIONAL MINI BAR CHART INTEGRATION */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Settlement Velocity Graph</p>
            <div className="mt-3 flex items-end justify-between h-14 gap-1.5 px-1">
              {combinedGraphBars.map((val, i) => (
                <div key={i} className="flex-1 bg-slate-100 h-full rounded-t-sm relative group cursor-pointer">
                  <div 
                    style={{ height: `${val}%` }} 
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 group-hover:bg-indigo-600 transition-all rounded-t-sm"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap z-10 shadow-md">
                    Day {i+1}: {Math.round(val)}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-1">
              <span>Mon</span>
              <span>Sun</span>
            </div>
          </div>

        </div>

        {/* CONTROLS AREA */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-md">
              <Search size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter secure registry by partner name or ID..."
                className="w-full rounded-xl border border-slate-200/80 py-2.5 pl-9 pr-4 outline-none focus:border-indigo-500 transition text-xs font-medium bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["All", "ISP", "BSP"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer border-none ${selectedType === t ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                >
                  {t} ({t === "All" ? typeCounts.all : typeCounts[t]})
                </button>
              ))}
              <button 
                onClick={() => { setSelectedType("All"); setSearchQuery(""); toast.success("Filters reset to default."); }}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 transition cursor-pointer"
              >
                <Filter size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* REGISTRY TABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 bg-slate-50/40">
            <h3 className="text-sm font-bold text-slate-900">Partner Ledger Matrix</h3>
            <p className="text-[11px] text-slate-500">Interactive rows. Click any node profile to launch structural popups.</p>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                  <th className="px-5 py-3">Partner Identity</th>
                  <th className="px-5 py-3">Classification</th>
                  <th className="px-5 py-3">Current Balance</th>
                  <th className="px-5 py-3">Threshold Limit</th>
                  <th className="px-5 py-3">Operational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
                {filteredPartners.length > 0 ? (
                  filteredPartners.map((partner) => (
                    <tr
                      key={partner.id}
                      onClick={() => setActiveModalData(partner)}
                      className="hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3">
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">{partner.name}</h4>
                          <p className="text-[10px] text-slate-400  mt-0.5">{partner.id}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${partner.type === "ISP" ? "bg-violet-50 text-violet-700 border border-violet-100" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                          {partner.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-bold text-slate-900">{formatCurrency(partner.balance)}</td>
                      <td className="px-5 py-3 text-slate-500 font-semibold">{formatCurrency(partner.threshold)}</td>
                      <td className="px-5 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold inline-block min-w-[85px] text-center border ${
                          partner.status === "On Track" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                          partner.status === "Overdue" ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {partner.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-400 font-semibold">
                      No matching architectural records located.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* ANALYTICS LOWER ROWS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-350 transition cursor-pointer animate-fade-in" onClick={() => toast.success("Liability velocity has increased 12.4% over previous quarter.")}>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-indigo-650" size={16} />
              <h3 className="text-xs font-bold text-slate-800">Liability Velocity</h3>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed font-semibold">Liability growth comparison metrics for selected segment.</p>
            <h4 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">+12.4%</h4>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-350 transition cursor-pointer animate-fade-in" onClick={() => toast.success("Current active wallet compliance factor: 98%.")}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" size={16} />
              <h3 className="text-xs font-bold text-slate-800">Compliance Factor</h3>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed font-semibold">Active ledger validations across all verified nodes.</p>
            <h4 className="mt-4 text-2xl font-black text-emerald-600 tracking-tight">98%</h4>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-350 transition cursor-pointer animate-fade-in" onClick={() => toast.success("Overdue settlements: 4 partners currently exceed thresholds.")}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-rose-600" size={16} />
              <h3 className="text-xs font-bold text-slate-800">Overdue Settlements</h3>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed font-semibold">Partners exceeding the threshold limit parameters.</p>
            <h4 className="mt-4 text-2xl font-black text-rose-600 tracking-tight">04</h4>
          </div>
        </div>

      </div>

      {/* ========================================================
          MODAL: PARTNER LEDGER DETAILS
          ======================================================== */}
      {activeModalData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModalData(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {activeModalData.type} Node Profile
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{activeModalData.name}</h3>
              </div>
              <button 
                onClick={() => setActiveModalData(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-650 transition cursor-pointer border-none bg-transparent"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-400 font-medium">System Registry ID:</span>
                <span className=" font-bold text-slate-700">{activeModalData.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-400 font-medium">Available Balance:</span>
                <span className="font-extrabold text-slate-900">{formatCurrency(activeModalData.balance)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span className="text-slate-400 font-medium">Allocated Threshold:</span>
                <span className="font-semibold text-slate-700">{formatCurrency(activeModalData.threshold)}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-slate-400 font-medium">Execution Status:</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                  activeModalData.status === "On Track" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                  activeModalData.status === "Overdue" ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-amber-50 text-amber-700 border-amber-100"
                }`}>{activeModalData.status}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button 
                onClick={() => { toast.success(`Balance audit logs pulled for ${activeModalData.name}`); setActiveModalData(null); }}
                className="rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer border-none"
              >
                Audit Stream
              </button>
              <button 
                onClick={() => handleSettleNode(activeModalData.id, activeModalData.name)}
                className="rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer border-none"
              >
                Settle Node
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EXPORT COMPILING SPINNER
          ======================================================== */}
      {activeModal === "export-progress" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden text-center animate-in zoom-in-95 duration-200">
            <Loader2 className="h-8 w-8 text-[#25108f] animate-spin mx-auto mb-4" />
            <h3 className="text-base font-black text-slate-900">Compiling Ledger Database...</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Exporting active partner wallets registry</p>
            
            <div className="mt-5 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#25108f] transition-all duration-200 rounded-full"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-[#25108f] font-black tracking-widest uppercase mt-2">{exportProgress}% Completed</p>
          </div>
        </div>
      )}

    </AdminShell>
  );
}