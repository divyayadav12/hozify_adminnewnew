import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  Users,
  TrendingUp,
  Download,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  Star,
  AlertTriangle,
  UserPlus,
  Smartphone,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Layers
} from "lucide-react";

// Initial Static Dataset
const INITIAL_SEGMENTS = [
  { id: 1, name: "Power Users", description: "Spent > $500 total", size: 42805, growth: "▲ +5.2%", growthType: "pos", activity: "2 hours ago", iconType: "star" },
  { id: 2, name: "Churn Risk", description: "No activity in 30 days", size: 15221, growth: "▼ -2.1%", growthType: "neg", activity: "14 mins ago", iconType: "alert" },
  { id: 3, name: "New Signups", description: "Joined in last 7 days", size: 8443, growth: "▲ +18.4%", growthType: "pos", activity: "Just now", iconType: "userplus" },
  { id: 4, name: "Mobile App Users", description: "Android and iOS active sessions", size: 312900, growth: "— 0.0%", growthType: "neutral", activity: "5 hours ago", iconType: "phone" }
];

export default function AudienceSegments() {
  // State Management for Dynamic Tracking
  const [segments, setSegments] = useState(INITIAL_SEGMENTS);
  const [exporting, setExporting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  // Dynamic Metrics Calculation based on current state dataset
  const dynamicTotalReach = segments.reduce((acc, curr) => acc + curr.size, 1200133);

  // Click Action: Handle Live Segment Injection
  const handleCreateSegment = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const newSegment = {
      id: randomId,
      name: `Custom Segment ${randomId}`,
      description: "Dynamically auto-generated analytical group",
      size: Math.floor(Math.random() * 25000) + 1500,
      growth: "▲ +1.5%",
      growthType: "pos",
      activity: "Just now",
      iconType: "zap"
    };
    setSegments([newSegment, ...segments]);
  };

  // Click Action: Mock Live Excel / Data Export Engine
  const handleExportData = () => {
    setExporting(true);
    console.log("Exporting current Segment Matrix Pipeline structural metadata:", segments);
    setTimeout(() => {
      setExporting(false);
      alert(`Success! Compiled Spreadsheet data for ${segments.length} target profiles.`);
    }, 900);
  };

  const handleDeleteSegment = (id) => {
    setSegments(segments.filter(item => item.id !== id));
  };

  return (
    <AdminShell activeTab="Audience" searchPlaceholder="Search audience or segments...">
      <div className="min-h-screen bg-slate-50 p-8 text-slate-800 space-y-6">
        
        {/* ================= EXACT TOP BREADCRUMB HEADING & ACTIONS ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Audience</span>
              <span className="text-[10px] font-normal text-slate-300">&gt;</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-950 mt-1 tracking-tight">
              Audience Segments
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Manage and organize your user base into targeted groups.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button 
              onClick={handleExportData}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-slate-700 border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-60"
            >
              <Download size={15} className={exporting ? "animate-bounce text-[#251fa3]" : "text-slate-500"} />
              {exporting ? "Compiling..." : "Export Segment"}
            </button>
            <button 
              onClick={handleCreateSegment}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#251fa3] text-white font-semibold text-sm hover:bg-[#1d1880] transition-all shadow-sm active:scale-95"
            >
              <Plus size={15} />
              Create Segment
            </button>
          </div>
        </div>

        {/* ================= TOP STATS & TRENDS GRID (Dark Blue Borders) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Total Reach Card */}
          <div className="bg-white rounded-xl border border-[#251fa3]/30 hover:border-[#251fa3] transition-colors p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-indigo-50 text-[#251fa3] rounded-md">
                <Users size={20} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">
                +12.4%
              </span>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                TOTAL REACH
              </p>
              <h3 className="mt-1 text-3xl font-extrabold text-slate-900 tracking-tight transition-all">
                {dynamicTotalReach.toLocaleString()}
              </h3>
              <p className="mt-2 text-xs text-slate-400 font-medium">
                Active subscribers across {segments.length} working segments
              </p>
            </div>
          </div>

          {/* Growth Trend Bar Graph Card */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#251fa3]/30 hover:border-[#251fa3] transition-colors p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-900">Growth Trend Summary</h4>
              <div className="flex bg-slate-100 p-0.5 rounded-md text-xs font-bold text-slate-500">
                <button className="px-3 py-1 rounded hover:text-slate-800">7D</button>
                <button className="px-3 py-1 rounded bg-[#0a0f29] text-white shadow-sm">30D</button>
                <button className="px-3 py-1 rounded hover:text-slate-800">12M</button>
              </div>
            </div>

            {/* Simple Replicated Bar Metrics */}
            <div className="h-24 flex items-end gap-3 pt-4">
              <div className="w-full bg-blue-100/70 h-[40%] rounded-sm" />
              <div className="w-full bg-blue-100/70 h-[65%] rounded-sm" />
              <div className="w-full bg-blue-100/70 h-[30%] rounded-sm" />
              <div className="w-full bg-blue-100/70 h-[80%] rounded-sm" />
              <div className="w-full bg-blue-100/70 h-[55%] rounded-sm" />
              <div className="w-full bg-[#251fa3] h-[95%] rounded-sm transition-all duration-500" />
            </div>
          </div>

        </div>

        {/* ================= ALL SEGMENTS LIST TABLE (Excel Format Design) ================= */}
        <div className="bg-white border-2 border-slate-300 rounded shadow-sm overflow-hidden font-mono text-xs">
          
          {/* Spreadsheet Header Controller Row */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sans">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-slate-700 tracking-tight">💾 ActiveWorkbook: segments_compiled_sheet.xlsx</h3>
            </div>
            
            <div className="relative self-end sm:self-auto">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-8 pr-10 py-1 rounded-md border border-slate-300 bg-white text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#251fa3] min-w-[140px]"
              >
                <option value="All">Status: All Rows</option>
                <option value="Large">Size &gt; 15,000</option>
              </select>
              <SlidersHorizontal className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
            </div>
          </div>

          {/* Hardcore Grid-Border Excel Layout */}
          <div className="overflow-x-auto">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-200 text-slate-600 font-bold border-b border-slate-300 text-left select-none text-[10px]">
                  <th className="border border-slate-300 bg-slate-300/70 w-9 text-center text-slate-500 font-extrabold"></th>
                  <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">A: Segment Node Block</th>
                  <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">B: Volume Size (Count)</th>
                  <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">C: Growth Velocity (30D)</th>
                  <th className="border border-slate-300 px-4 py-1.5 uppercase tracking-wide">D: Stamp Logs</th>
                  <th className="border border-slate-300 px-4 py-1.5 text-center w-24">COMMANDS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {segments
                  .filter(item => filterStatus === "All" || item.size > 15000)
                  .map((segment, index) => (
                    <tr key={segment.id} className="hover:bg-amber-50/40 transition-colors">
                      
                      {/* Excel Side Index Counter Grid Block */}
                      <td className="border border-slate-300 bg-slate-150/80 text-center font-bold text-slate-400 text-[10px] select-none bg-slate-100">
                        {index + 1}
                      </td>
                      
                      {/* Column A: Meta Title Info */}
                      <td className="border border-slate-300 px-4 py-3 font-sans">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded ${
                            segment.iconType === "star" ? "bg-indigo-50 text-[#251fa3]" :
                            segment.iconType === "alert" ? "bg-red-50 text-red-500" :
                            segment.iconType === "userplus" ? "bg-blue-50 text-blue-500" :
                            "bg-slate-100 text-slate-600"
                          }`}>
                            {segment.iconType === "star" && <Star size={14} fill="currentColor" />}
                            {segment.iconType === "alert" && <AlertTriangle size={14} />}
                            {segment.iconType === "userplus" && <UserPlus size={14} />}
                            {segment.iconType === "phone" && <Smartphone size={14} />}
                            {segment.iconType === "zap" && <Zap size={14} fill="currentColor" />}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{segment.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{segment.description}</div>
                          </div>
                        </div>
                      </td>

                      {/* Column B: Metrics Size */}
                      <td className="border border-slate-300 px-4 py-3 text-slate-800 text-xs font-bold font-mono">
                        {segment.size.toLocaleString()}
                      </td>

                      {/* Column C: Growth Delta Indicator */}
                      <td className={`border border-slate-300 px-4 py-3 text-xs font-bold font-sans ${
                        segment.growthType === "pos" ? "text-green-600" : 
                        segment.growthType === "neg" ? "text-red-500" : "text-slate-400"
                      }`}>
                        {segment.growth}
                      </td>

                      {/* Column D: Local Activity Time Log */}
                      <td className="border border-slate-300 px-4 py-3 text-slate-400 font-sans text-xs">
                        {segment.activity}
                      </td>

                      {/* Explicit Workspace Action Cells */}
                      <td className="border border-slate-300 px-4 py-3 text-center font-sans">
                        <div className="flex justify-center gap-3 text-slate-400">
                          <button 
                            onClick={() => alert(`Opening row modification pipeline for: ${segment.name}`)}
                            className="hover:text-slate-700 transition-colors"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteSegment(segment.id)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
              </tbody>
            </table></div>
          </div>

          {/* Excel Footer Index Status Meta Bar */}
          <div className="flex items-center justify-between p-3 border-t-2 border-slate-300 bg-slate-50 font-sans text-[11px] text-slate-400 font-semibold">
            <div>Spreadsheet rows active: {segments.length} target arrays parsed.</div>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-slate-300 text-slate-300 bg-white">
                <ChevronLeft size={12} />
              </button>
              <button className="h-5 w-5 rounded bg-[#0a0f29] text-white flex items-center justify-center text-[10px]">1</button>
              <button className="p-1 rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100">
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM FOOTER SECTION GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Box Left: Automate Your Audience */}
          <div className="bg-gradient-to-br from-[#0a0c27] to-[#030416] text-white rounded-xl p-6 border border-slate-800 flex flex-col justify-between relative overflow-hidden min-h-[180px]">
            <div className="space-y-2 max-w-sm z-10">
              <h3 className="text-base font-bold tracking-tight">Automate Your Audience</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Connect your CRM to automatically sync segments in real-time and trigger automated workflows based on user behavior changes.
              </p>
            </div>
            <button className="mt-4 self-start px-4 py-2 border border-slate-700 bg-transparent text-xs font-semibold rounded hover:bg-white/5 transition-colors z-10">
              Configure Integration
            </button>
            <Layers className="absolute right-4 bottom-4 text-slate-800/40 h-28 w-28 pointer-events-none" />
          </div>

          {/* Box Right: Segment Recommendations (Dark Blue Border Link Layout) */}
          <div className="bg-white rounded-xl border border-[#251fa3]/30 hover:border-[#251fa3] transition-colors p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Segment Recommendations</h3>
            
            <div className="space-y-3.5">
              {/* Item 1 */}
              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-700 rounded">
                    <Zap size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">At-Risk High LTV</div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">Users with &gt;$1k spent who haven't visited in 14 days.</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const recSegment = { id: Date.now(), name: "At-Risk High LTV", description: "Users with >$1k spent", size: 1205, growth: "▲ +0.9%", growthType: "pos", activity: "Just now", iconType: "zap" };
                    setSegments([recSegment, ...segments]);
                  }}
                  className="text-xs font-bold text-[#251fa3] hover:underline px-2"
                >
                  Create
                </button>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-700 rounded">
                    <Users size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Brand Advocates</div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">Users who shared campaign links &gt; 3 times.</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const advocateSegment = { id: Date.now(), name: "Brand Advocates", description: "Shared campaign links > 3 times", size: 4890, growth: "▲ +4.2%", growthType: "pos", activity: "Just now", iconType: "star" };
                    setSegments([advocateSegment, ...segments]);
                  }}
                  className="text-xs font-bold text-[#251fa3] hover:underline px-2"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}