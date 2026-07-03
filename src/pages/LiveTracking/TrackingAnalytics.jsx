import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell"; // आपका ग्लोबल लेआउट रैपर
import {
  Calendar,
  Download,
  TrendingUp,
  Clock,
  Truck,
  Users,
  Plus,
  Minus,
  Layers,
  ChevronRight,
  AlertTriangle,
  Search,
  X,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

// Helper for downloading generated files
const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function TrackingAnalytics() {
  // ==========================================
  // INTERACTIVE STATES
  // ==========================================
  const [timeRange, setTimeRange] = useState("Last 7 Days"); // Default to match screenshot
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  const [heatmapDensity, setHeatmapDensity] = useState("All"); // All, High, Med, Low
  const [activeMetricCard, setActiveMetricCard] = useState("efficiency");
  const [peakTimeFilter, setPeakTimeFilter] = useState("Workdays");
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showOptimizationAlert, setShowOptimizationAlert] = useState(true);

  // Modals state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("CSV");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState("");

  const [showPartnersModal, setShowPartnersModal] = useState(false);
  const [partnerSearchQuery, setPartnerSearchQuery] = useState("");
  const [partnerSortKey, setPartnerSortKey] = useState("fulfillment"); // rank, fulfillment, utilization

  // ==========================================
  // MOCK DATA BY TIME RANGE
  // ==========================================
  const mockDataByTimeRange = {
    "Today": {
      efficiency: { val: "95.8%", change: "+2.4%", pct: 95.8, isPositive: true },
      delay: { val: "11.2 min", change: "-1.5m", pct: 35, isPositive: true },
      deliveries: { val: "142", change: "Active", pct: 60, status: "Active" },
      utilization: { val: "91.2%", change: "+1.2%", pct: 91.2, isPositive: true },
      partners: [
        { rank: 1, name: "Logistics Prime X", fulfillment: "99.1%", status: "top" },
        { rank: 2, name: "Global Transit Corp", fulfillment: "96.8%", status: "normal" },
        { rank: 3, name: "SwiftPath Delivery", fulfillment: "94.5%", status: "normal" },
        { rank: 4, name: "Urban Flow Partners", fulfillment: "91.2%", status: "normal" },
        { rank: 5, name: "Atlas Supply Chain", fulfillment: "88.9%", status: "normal" }
      ],
      peakHours: [
        { hour: "00h", value: 10 },
        { hour: "03h", value: 5 },
        { hour: "06h", value: 25 },
        { hour: "09h", value: 85 },
        { hour: "12h", value: 70 },
        { hour: "15h", value: 55 },
        { hour: "18h", value: 95 },
        { hour: "21h", value: 40 }
      ]
    },
    "Yesterday": {
      efficiency: { val: "93.1%", change: "-0.8%", pct: 93.1, isPositive: false },
      delay: { val: "15.4 min", change: "+1.1m", pct: 48, isPositive: false },
      deliveries: { val: "1,104", change: "Completed", pct: 70, status: "Completed" },
      utilization: { val: "87.0%", change: "-1.5%", pct: 87.0, isPositive: false },
      partners: [
        { rank: 1, name: "Global Transit Corp", fulfillment: "97.5%", status: "top" },
        { rank: 2, name: "Logistics Prime X", fulfillment: "96.2%", status: "normal" },
        { rank: 3, name: "SwiftPath Delivery", fulfillment: "93.0%", status: "normal" },
        { rank: 4, name: "Atlas Supply Chain", fulfillment: "90.1%", status: "normal" },
        { rank: 5, name: "Urban Flow Partners", fulfillment: "85.4%", status: "normal" }
      ],
      peakHours: [
        { hour: "00h", value: 15 },
        { hour: "03h", value: 10 },
        { hour: "06h", value: 35 },
        { hour: "09h", value: 78 },
        { hour: "12h", value: 60 },
        { hour: "15h", value: 50 },
        { hour: "18h", value: 82 },
        { hour: "21h", value: 30 }
      ]
    },
    "Last 7 Days": {
      efficiency: { val: "94.2%", change: "+12.4%", pct: 94.2, isPositive: true },
      delay: { val: "14.3 min", change: "+2.1m", pct: 45, isPositive: false },
      deliveries: { val: "1,284", change: "Stable", pct: 75, status: "Stable" },
      utilization: { val: "88.5%", change: "+8%", pct: 88.5, isPositive: true },
      partners: [
        { rank: 1, name: "Logistics Prime X", fulfillment: "98.2%", status: "top" },
        { rank: 2, name: "Global Transit Corp", fulfillment: "95.5%", status: "normal" },
        { rank: 3, name: "SwiftPath Delivery", fulfillment: "92.1%", status: "normal" },
        { rank: 4, name: "Atlas Supply Chain", fulfillment: "89.4%", status: "normal" },
        { rank: 5, name: "Urban Flow Partners", fulfillment: "87.2%", status: "normal" }
      ],
      peakHours: [
        { hour: "00h", value: 20 },
        { hour: "03h", value: 15 },
        { hour: "06h", value: 45 },
        { hour: "09h", value: 90 },
        { hour: "12h", value: 75 },
        { hour: "15h", value: 60 },
        { hour: "18h", value: 85 },
        { hour: "21h", value: 35 }
      ]
    },
    "Last 30 Days": {
      efficiency: { val: "93.5%", change: "+10.2%", pct: 93.5, isPositive: true },
      delay: { val: "14.9 min", change: "+1.8m", pct: 47, isPositive: false },
      deliveries: { val: "5,842", change: "Active", pct: 80, status: "Stable" },
      utilization: { val: "87.8%", change: "+6.5%", pct: 87.8, isPositive: true },
      partners: [
        { rank: 1, name: "Logistics Prime X", fulfillment: "97.8%", status: "top" },
        { rank: 2, name: "Global Transit Corp", fulfillment: "94.9%", status: "normal" },
        { rank: 3, name: "SwiftPath Delivery", fulfillment: "92.5%", status: "normal" },
        { rank: 4, name: "Urban Flow Partners", fulfillment: "88.1%", status: "normal" },
        { rank: 5, name: "Atlas Supply Chain", fulfillment: "87.6%", status: "normal" }
      ],
      peakHours: [
        { hour: "00h", value: 22 },
        { hour: "03h", value: 18 },
        { hour: "06h", value: 40 },
        { hour: "09h", value: 92 },
        { hour: "12h", value: 80 },
        { hour: "15h", value: 65 },
        { hour: "18h", value: 88 },
        { hour: "21h", value: 42 }
      ]
    },
    "Last 90 Days": {
      efficiency: { val: "92.1%", change: "+5.7%", pct: 92.1, isPositive: true },
      delay: { val: "15.8 min", change: "+0.9m", pct: 50, isPositive: false },
      deliveries: { val: "18,940", change: "High Volume", pct: 85, status: "High Volume" },
      utilization: { val: "86.3%", change: "+4.2%", pct: 86.3, isPositive: true },
      partners: [
        { rank: 1, name: "Logistics Prime X", fulfillment: "97.1%", status: "top" },
        { rank: 2, name: "Global Transit Corp", fulfillment: "94.2%", status: "normal" },
        { rank: 3, name: "SwiftPath Delivery", fulfillment: "92.0%", status: "normal" },
        { rank: 4, name: "Atlas Supply Chain", fulfillment: "89.0%", status: "normal" },
        { rank: 5, name: "Urban Flow Partners", fulfillment: "86.5%", status: "normal" }
      ],
      peakHours: [
        { hour: "00h", value: 25 },
        { hour: "03h", value: 20 },
        { hour: "06h", value: 42 },
        { hour: "09h", value: 95 },
        { hour: "12h", value: 85 },
        { hour: "15h", value: 70 },
        { hour: "18h", value: 90 },
        { hour: "21h", value: 45 }
      ]
    }
  };

  const currentData = mockDataByTimeRange[timeRange] || mockDataByTimeRange["Last 7 Days"];

  // ==========================================
  // VIEW ALL PARTNERS LEDGER DATA
  // ==========================================
  const allPartnersList = [
    { rank: 1, name: "Logistics Prime X", fulfillment: "98.2%", utilization: "92.5%", orders: 412, status: "top" },
    { rank: 2, name: "Global Transit Corp", fulfillment: "95.5%", utilization: "88.0%", orders: 389, status: "normal" },
    { rank: 3, name: "SwiftPath Delivery", fulfillment: "92.1%", utilization: "85.2%", orders: 310, status: "normal" },
    { rank: 4, name: "Atlas Supply Chain", fulfillment: "89.4%", utilization: "81.0%", orders: 245, status: "normal" },
    { rank: 5, name: "Urban Flow Partners", fulfillment: "87.2%", utilization: "79.5%", orders: 198, status: "normal" },
    { rank: 6, name: "Apex Dispatchers", fulfillment: "86.0%", utilization: "77.1%", orders: 154, status: "normal" },
    { rank: 7, name: "Falcon Express", fulfillment: "85.1%", utilization: "76.4%", orders: 132, status: "normal" },
    { rank: 8, name: "Beacon Carrier Services", fulfillment: "84.2%", utilization: "74.0%", orders: 110, status: "normal" },
    { rank: 9, name: "Pinnacle Logistics", fulfillment: "82.5%", utilization: "71.8%", orders: 95, status: "normal" },
    { rank: 10, name: "Metro Cargo Group", fulfillment: "80.9%", utilization: "68.5%", orders: 84, status: "normal" }
  ];

  // Dynamically scale/adjust the view all partners values based on the currently selected efficiency/utilization to make it super realistic
  const scalingFactor = parseFloat(currentData.efficiency.val) / 94.2;
  const scaledAllPartnersList = allPartnersList.map(p => {
    const origFul = parseFloat(p.fulfillment);
    const origUtl = parseFloat(p.utilization);
    const scaledFul = Math.min(100, Math.max(70, origFul * scalingFactor)).toFixed(1) + "%";
    const scaledUtl = Math.min(100, Math.max(60, origUtl * (parseFloat(currentData.utilization.val) / 88.5))).toFixed(1) + "%";
    return { ...p, fulfillment: scaledFul, utilization: scaledUtl };
  });

  const filteredPartners = scaledAllPartnersList
    .filter(p => p.name.toLowerCase().includes(partnerSearchQuery.toLowerCase()))
    .sort((a, b) => {
      if (partnerSortKey === "fulfillment") {
        return parseFloat(b.fulfillment) - parseFloat(a.fulfillment);
      } else if (partnerSortKey === "utilization") {
        return parseFloat(b.utilization) - parseFloat(a.utilization);
      } else {
        return a.rank - b.rank;
      }
    });

  // ==========================================
  // EXPORT REPORT FUNCTION
  // ==========================================
  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStatusText("Initializing ledger compiling...");
    
    const steps = [
      { progress: 25, text: "Connecting to Hozify operational metrics database..." },
      { progress: 50, text: "Compiling density logs and partner ledger..." },
      { progress: 75, text: "Generating visualization structures..." },
      { progress: 100, text: "Packaging download container..." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setExportProgress(steps[currentStep].progress);
        setExportStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        
        let fileContent = "";
        let filename = "";
        
        if (exportFormat === "CSV") {
          fileContent = "Metric,Value,Trend\n" +
            `Operational Efficiency,${currentData.efficiency.val},${currentData.efficiency.change}\n` +
            `Avg. Delivery Delay,${currentData.delay.val},${currentData.delay.change}\n` +
            `Active Deliveries,${currentData.deliveries.val},${currentData.deliveries.change}\n` +
            `Partner Utilization,${currentData.utilization.val},${currentData.utilization.change}\n`;
          filename = `Hozify_Tracking_Analytics_${timeRange.replace(/\s+/g, "_")}.csv`;
          downloadFile(fileContent, filename, "text/csv;charset=utf-8;");
        } else if (exportFormat === "JSON") {
          fileContent = JSON.stringify({
            reportType: "Tracking Analytics",
            generatedAt: new Date().toISOString(),
            timeRange,
            metrics: {
              efficiency: currentData.efficiency,
              delay: currentData.delay,
              deliveries: currentData.deliveries,
              utilization: currentData.utilization
            },
            partners: currentData.partners
          }, null, 2);
          filename = `Hozify_Tracking_Analytics_${timeRange.replace(/\s+/g, "_")}.json`;
          downloadFile(fileContent, filename, "application/json;charset=utf-8;");
        } else {
          // PDF Report Sim
          fileContent = "==================================================\n" +
            "            HOZIFY ENTERPRISE SYSTEM REPORT\n" +
            "==================================================\n" +
            `Report: Tracking Analytics Ledger\n` +
            `Generated: ${new Date().toLocaleString()}\n` +
            `Operational Timeframe: ${timeRange}\n` +
            "--------------------------------------------------\n\n" +
            `1. KEY PERFORMANCE INDICATORS\n` +
            ` - Operational Efficiency: ${currentData.efficiency.val} (${currentData.efficiency.change})\n` +
            ` - Avg. Delivery Delay: ${currentData.delay.val} (${currentData.delay.change})\n` +
            ` - Active Deliveries: ${currentData.deliveries.val} (${currentData.deliveries.change})\n` +
            ` - Partner Utilization: ${currentData.utilization.val} (${currentData.utilization.change})\n\n` +
            `2. TOP PERFORMING PARTNERS\n` +
            currentData.partners.map(p => ` - Rank ${p.rank}: ${p.name} (${p.fulfillment} fulfillment)`).join("\n") + "\n\n" +
            "==================================================\n";
          filename = `Hozify_Tracking_Analytics_${timeRange.replace(/\s+/g, "_")}_Full.txt`;
          downloadFile(fileContent, filename, "text/plain;charset=utf-8;");
        }
        
        toast.success(`Report downloaded successfully in ${exportFormat} format!`);
        setIsExporting(false);
        setShowExportModal(false);
      }
    }, 500);
  };

  return (
    <AdminShell activeTab="Analytics Feed">
      <div className="bg-[#ffffff] text-slate-900  p-6 space-y-6 max-w-[1600px] mx-auto relative">

        {/* ==========================================
            1. HEADER SECTION (MAIN HEADING + ACTIONS)
           ========================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-0.5">
              Tracking Analytics
            </h1>
            <h2 className="text-xs font-medium text-slate-500">
              Enterprise-wide operational density and delivery efficiency metrics.
            </h2>
          </div>
          
          <div className="flex items-center gap-2 sm:self-end">
            {/* Calendar Picker Filter dropdown wrapper */}
            <div className="relative">
              <button 
                onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>{timeRange}</span>
              </button>

              {showTimeRangeDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowTimeRangeDropdown(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 animate-in fade-in duration-100">
                    {Object.keys(mockDataByTimeRange).map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setShowTimeRangeDropdown(false);
                          toast.success(`Range updated to ${range}`);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors ${
                          timeRange === range 
                            ? "bg-[#0c0563] text-white" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Export Report Action button */}
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export Report</span>
            </button>

          </div>
        </div>

        {/* ==========================================
            2. METRICS TILES ROW GRID (4 CARDS)
           ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Operational Efficiency Card */}
          <div 
            onClick={() => setActiveMetricCard("efficiency")}
            className={`bg-white p-4 rounded-xl border transition-all cursor-pointer select-none ${
              activeMetricCard === "efficiency" ? "border-blue-600 shadow-sm ring-1 ring-blue-600/20" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="h-4 w-4" /></div>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                currentData.efficiency.isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              }`}>{currentData.efficiency.change}</span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Operational Efficiency</span>
              <span className="text-2xl font-black text-slate-900 block">{currentData.efficiency.val}</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-600 h-1 rounded-full transition-all duration-500" style={{ width: `${currentData.efficiency.pct}%` }}></div>
            </div>
          </div>

          {/* Avg Delivery Delay Card */}
          <div 
            onClick={() => setActiveMetricCard("delay")}
            className={`bg-white p-4 rounded-xl border transition-all cursor-pointer select-none ${
              activeMetricCard === "delay" ? "border-rose-600 shadow-sm ring-1 ring-rose-600/20" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Clock className="h-4 w-4" /></div>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                currentData.delay.isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              }`}>{currentData.delay.change}</span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Avg. Delivery Delay</span>
              <span className="text-2xl font-black text-slate-900 block">{currentData.delay.val}</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-rose-500 h-1 rounded-full transition-all duration-500" style={{ width: `${currentData.delay.pct}%` }}></div>
            </div>
          </div>

          {/* Active Deliveries Card */}
          <div 
            onClick={() => setActiveMetricCard("deliveries")}
            className={`bg-white p-4 rounded-xl border transition-all cursor-pointer select-none ${
              activeMetricCard === "deliveries" ? "border-purple-600 shadow-sm ring-1 ring-purple-600/20" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Truck className="h-4 w-4" /></div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">{currentData.deliveries.change}</span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Active Deliveries</span>
              <span className="text-2xl font-black text-slate-900 block">{currentData.deliveries.val}</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-purple-900 h-1 rounded-full transition-all duration-500" style={{ width: `${currentData.deliveries.pct}%` }}></div>
            </div>
          </div>

          {/* Partner Utilization Card */}
          <div 
            onClick={() => setActiveMetricCard("utilization")}
            className={`bg-white p-4 rounded-xl border transition-all cursor-pointer select-none ${
              activeMetricCard === "utilization" ? "border-indigo-600 shadow-sm ring-1 ring-indigo-600/20" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="h-4 w-4" /></div>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                currentData.utilization.isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              }`}>{currentData.utilization.change}</span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Partner Utilization</span>
              <span className="text-2xl font-black text-slate-900 block">{currentData.utilization.val}</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-indigo-400 h-1 rounded-full transition-all duration-500" style={{ width: `${currentData.utilization.pct}%` }}></div>
            </div>
          </div>

        </div>

        {/* ==========================================
            3. CORE WORKSPACE: HEATMAP + PARTNERS RANK
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* MAP CANVAS PANEL */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Operational Density Heatmap</h3>
              
              {/* Density Map Legends */}
              <div className="flex items-center gap-3 text-xs font-bold">
                {["Low", "Med", "High", "All"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setHeatmapDensity(type)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      heatmapDensity === type ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {type !== "All" && (
                      <span className={`w-2 h-2 rounded-full ${
                        type === "Low" ? "bg-slate-300" : type === "Med" ? "bg-blue-400" : "bg-indigo-950"
                      }`} />
                    )}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* GEOGRAPHICAL NEW YORK HUD MAP VIEWPORT */}
            <div className="w-full h-[380px] bg-[#dbe8f4] border border-slate-100 rounded-xl mt-4 relative overflow-hidden shadow-inner select-none">
              
              {/* Zoomable Map Layer Container */}
              <div 
                className="absolute inset-0 transition-all duration-300 ease-out" 
                style={{ 
                  transform: `scale(${zoomLevel / 12})`, 
                  transformOrigin: 'center' 
                }}
              >
                {/* City Geography & Water Grids */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(#c5d8e9 1px, transparent 1px), linear-gradient(90deg, #c5d8e9 1px, transparent 1px)', backgroundSize: '18px 18px' }}></div>
                  
                  {/* Manhattan Landmass */}
                  <div className="absolute top-0 left-[35%] w-[25%] h-[82%] bg-[#f7f5f0] border-x border-slate-300 transform rotate-12 shadow-sm flex flex-col justify-between p-4">
                    <span className="text-[9px] font-black tracking-widest text-slate-300 uppercase transform rotate-12 block">MANHATTAN</span>
                    <span className="text-[8px] font-bold text-blue-500/80 tracking-tight block text-center">Times Square</span>
                  </div>

                  {/* Brooklyn / Queens Landmass */}
                  <div className="absolute bottom-0 right-0 w-[42%] h-[88%] bg-[#f4f2ed] border-l border-t border-slate-300 rounded-tl-[80px] p-6 shadow-xs">
                    <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase block">BROOKLYN</span>
                    <span className="text-[8px] font-semibold text-slate-400 block mt-12 text-center">Brooklyn Botanical Garden</span>
                  </div>

                  {/* Jersey City Left Landmass */}
                  <div className="absolute top-0 left-0 w-[26%] h-full bg-[#f4f2ed] border-r border-slate-300 p-4">
                    <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase block">JERSEY CITY</span>
                    <span className="text-[8px] font-semibold text-slate-400 block mt-16">Hoboken</span>
                  </div>
                </div>

                {/* HEATMAP REPLAY LAYERS */}
                {(heatmapDensity === "All" || heatmapDensity === "High") && (
                  <>
                    <div className="absolute top-[32%] left-[42%] w-24 h-24 bg-indigo-950/20 rounded-full filter blur-xl animate-pulse"></div>
                    <div className="absolute top-[38%] left-[45%] w-12 h-12 bg-indigo-950/40 rounded-full filter blur-lg"></div>
                    <div className="absolute bottom-[28%] right-[24%] w-20 h-20 bg-indigo-950/25 rounded-full filter blur-xl"></div>
                  </>
                )}

                {/* NEW YORK LANDMARKS REGISTRY */}
                <div className="absolute top-[18%] left-[46%] text-[8px] font-bold text-slate-500 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 shadow-3xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>Washington Square Park</span>
                </div>
                
                <div className="absolute top-[40%] left-[32%] z-20 text-[13px] font-black text-slate-800 tracking-tight bg-white/30 backdrop-blur-3xs px-2 py-0.5 rounded-md">
                  Jersey City
                </div>
                
                <div className="absolute top-[42%] left-[52%] z-20 text-lg font-black text-slate-900 tracking-tight">
                  New York
                </div>

                <div className="absolute bottom-[35%] left-[28%] text-[8px] font-medium text-slate-500 bg-white/90 px-1 py-0.5 rounded border border-slate-200">Statue of Liberty</div>
              </div>

              {/* FLOATING ZOOM CONTROLS (kept outside of scale layer) */}
              <div className="absolute top-4 right-4 z-30 flex flex-col gap-1 items-end">
                <div className="bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200 text-[10px] font-black text-slate-800 shadow-xs mb-1 select-none">
                  {Math.round((zoomLevel / 12) * 100)}%
                </div>
                <div className="flex flex-col gap-0 shadow-xs rounded-lg overflow-hidden border border-slate-200">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
                    className="w-8 h-8 bg-white text-slate-800 font-bold flex items-center justify-center hover:bg-slate-50 cursor-pointer active:scale-95 border-b border-slate-100"
                    title="Zoom In"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(prev - 1, 8))}
                    className="w-8 h-8 bg-white text-slate-800 font-bold flex items-center justify-center hover:bg-slate-50 cursor-pointer active:scale-95"
                    title="Zoom Out"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setZoomLevel(12);
                    toast.success("Zoom level reset to default (100%)");
                  }}
                  className="w-8 h-8 bg-white border border-slate-200 text-slate-800 rounded-md mt-2 flex items-center justify-center hover:bg-slate-50 shadow-xs cursor-pointer transition-colors"
                  title="Reset Map Layer"
                >
                  <Layers className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT AREA: PARTNER PERFORMANCE RANKING */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-2xs">
            <div className="pb-3 border-b border-slate-50">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Partner Performance</h3>
            </div>

            <div className="mt-4 flex-1 space-y-2">
              {currentData.partners.map((partner) => (
                <div 
                  key={partner.rank}
                  onClick={() => alert(`Showing details for: ${partner.name}`)}
                  className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-black flex items-center justify-center shadow-3xs">
                      {partner.rank}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{partner.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{partner.fulfillment} Fulfillment</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {partner.status === "top" && (
                      <span className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[9px] font-black">★</span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowPartnersModal(true)}
              className="w-full text-center py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 bg-white mt-4 transition-colors shadow-3xs cursor-pointer active:scale-95"
            >
              View All Partners
            </button>
          </div>

        </div>

        {/* ==========================================
            4. PEAK USAGE TIMES HISTOGRAM GRAPH
           ========================================== */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Peak Usage Times</h3>
              <p className="text-[11px] text-slate-400 font-medium">Volume distribution across a 24-hour operational cycle.</p>
            </div>
            
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {["Workdays", "Weekends"].map((type) => (
                <button
                  key={type}
                  onClick={() => setPeakTimeFilter(type)}
                  className={`text-xs font-bold px-3 py-1 rounded-md transition-all cursor-pointer ${
                    peakTimeFilter === type ? "bg-white text-slate-900 shadow-3xs" : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 pb-2 px-2">
            <div className="h-28 w-full flex items-end gap-3 sm:gap-6 md:gap-10 border-b border-slate-100 relative">
              <div className="absolute left-0 right-0 bottom-1/2 border-t border-dashed border-slate-100 pointer-events-none"></div>

              {currentData.peakHours.map((bar, i) => {
                // Adjust weekends density slightly differently for variation
                const val = peakTimeFilter === "Weekends" ? Math.max(10, Math.round(bar.value * 0.7)) : bar.value;
                return (
                  <div 
                    key={i} 
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                    onClick={() => alert(`Timestamp Bucket: ${bar.hour} (${val}% density)`)}
                  >
                    <span className="text-[9px]  font-black text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 px-1 rounded -mb-1">
                      {val}%
                    </span>
                    
                    <div 
                      style={{ height: `${val}px` }}
                      className={`w-full max-w-[24px] rounded-t-xs transition-all duration-300 ${
                        val > 80 ? "bg-slate-900 group-hover:bg-[#0c0563]" : "bg-slate-200 group-hover:bg-slate-400"
                      }`}
                    ></div>
                    
                    <span className="text-[10px]  font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {bar.hour}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==========================================
            5. REAL-TIME EFFICIENCY ALERT BANNER
           ========================================== */}
        {showOptimizationAlert && (
          <div className="bg-[#0c0563] text-white p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden shadow-md">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
              <AlertTriangle className="h-40 w-40 transform translate-x-10 translate-y-6" />
            </div>

            <div className="space-y-1 relative z-10 max-w-3xl">
              <h4 className="text-xs font-black tracking-wider uppercase text-cyan-400">Real-time Efficiency Alert</h4>
              <p className="text-xs font-bold leading-relaxed text-slate-100">
                Congestion detected in the Northeast corridor (Zone B4). Routing algorithms recommend redistributing 15% of active jobs to Partner SwiftPath to maintain sub-15min delivery metrics.
              </p>
            </div>

            <div className="flex items-center gap-2 relative z-10 shrink-0 w-full md:w-auto">
              <button 
                onClick={() => {
                  alert("Executing dynamic cluster rerouting pipeline protocols...");
                  setShowOptimizationAlert(false);
                }}
                className="bg-white hover:bg-slate-50 text-[#0c0563] font-black text-xs px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95 w-full md:w-auto text-center"
              >
                Optimize Now
              </button>
              <button 
                onClick={() => alert("Opening full incident log...")}
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer w-full md:w-auto text-center"
              >
                View Incident
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ==========================================
          DYNAMIC EXPORT MODAL LAYER
         ========================================== */}
      {showExportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => !isExporting && setShowExportModal(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Export Tracking Metrics</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Compile and download operational intelligence logs.</p>
              </div>
              {!isExporting && (
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            {!isExporting ? (
              <div className="space-y-4">
                {/* Format selection */}
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">Export Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "CSV", title: "Spreadsheet", label: "CSV" },
                      { id: "PDF", title: "Summary Doc", label: "PDF" },
                      { id: "JSON", title: "Raw Data", label: "JSON" }
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setExportFormat(fmt.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          exportFormat === fmt.id 
                            ? "bg-[#0c0563]/5 border-[#0c0563] ring-1 ring-[#0c0563]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`text-xs font-black ${exportFormat === fmt.id ? "text-[#0c0563]" : "text-slate-800"}`}>{fmt.label}</span>
                        <span className="text-[9px] font-bold text-slate-400 mt-0.5">{fmt.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope parameters */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">Selected Timeframe:</span>
                    <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-3xs">{timeRange}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">Source Database:</span>
                    <span className="font-black text-slate-900">Hozify Production Live</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStartExport}
                    className="flex-1 py-2 text-center bg-[#0c0563] text-white rounded-xl text-xs font-bold hover:bg-[#0c0563]/90 cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/10 active:scale-98 transition-transform"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Export Processing View */
              <div className="py-8 space-y-6 flex flex-col items-center text-center">
                <Loader2 className="h-8 w-8 text-[#0c0563] animate-spin" />
                
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold px-1">
                    <span className="text-slate-500">Compiling Report...</span>
                    <span className="text-[#0c0563]">{exportProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0c0563] transition-all duration-300 rounded-full"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 animate-pulse">{exportStatusText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          DYNAMIC VIEW ALL PARTNERS MODAL
         ========================================== */}
      {showPartnersModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => setShowPartnersModal(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Partner Registry Performance</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Enterprise registry showing active logistics providers.</p>
              </div>
              <button 
                onClick={() => setShowPartnersModal(false)}
                className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search partners by name..."
                  value={partnerSearchQuery}
                  onChange={(e) => setPartnerSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0c0563] focus:ring-1 focus:ring-[#0c0563]/10"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 shrink-0">Sort By:</span>
                <select
                  value={partnerSortKey}
                  onChange={(e) => setPartnerSortKey(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-bold focus:outline-none focus:border-[#0c0563]"
                >
                  <option value="rank">Rank / Performance</option>
                  <option value="fulfillment">Fulfillment Rate</option>
                  <option value="utilization">Utilization Rate</option>
                </select>
              </div>
            </div>

            {/* Registry Table */}
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-2xs">
              <div className="max-h-[350px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/75 sticky top-0 backdrop-blur-xs text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3 pl-4 text-center">Rank</th>
                      <th className="p-3">Partner Name</th>
                      <th className="p-3 text-right">Fulfillment</th>
                      <th className="p-3 text-right">Utilization</th>
                      <th className="p-3 text-right pr-4">Active Orders</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-slate-100">
                    {filteredPartners.length > 0 ? (
                      filteredPartners.map((partner) => (
                        <tr 
                          key={partner.rank}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-3 pl-4 text-center">
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black ${
                              partner.rank === 1 
                                ? "bg-amber-100 text-amber-800" 
                                : partner.rank === 2 
                                  ? "bg-slate-200 text-slate-800" 
                                  : "bg-slate-100 text-slate-600"
                            }`}>
                              {partner.rank}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-800">{partner.name}</td>
                          <td className="p-3 text-right font-black text-emerald-600">{partner.fulfillment}</td>
                          <td className="p-3 text-right font-bold text-slate-700">{partner.utilization}</td>
                          <td className="p-3 text-right font-semibold text-slate-500 pr-4">{partner.orders}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400 font-semibold">
                          No partners found matching "{partnerSearchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPartnersModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer shadow-3xs"
              >
                Close Registry
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}