import toast from 'react-hot-toast';
import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";

import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ThumbsUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  X,
  Loader2,
  Search,
  Check
} from "lucide-react";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";

const MOCK_INCIDENTS_HISTORY = [
  { id: "#INC-4492", category: "Late Delivery (Zone B)", resolution: "Resolved within 4h", date: "Oct 24, 2023", status: "Resolved" },
  { id: "#INC-5021", category: "Damaged Goods Claim", resolution: "Full refund issued", date: "Oct 24, 2023", status: "Resolved" },
  { id: "#INC-5288", category: "System Integration Fault", resolution: "Pending API Patch", date: "Oct 23, 2023", status: "In Progress" },
  { id: "#INC-3982", category: "Route Delay (Heavy Snow)", resolution: "Rerouted shipment", date: "Oct 18, 2023", status: "Resolved" },
  { id: "#INC-3112", category: "Warehouse Mismatch", resolution: "Inventory audit complete", date: "Oct 12, 2023", status: "Resolved" },
  { id: "#INC-2980", category: "Missed SLA Penalty", resolution: "Credits applied to wallet", date: "Oct 05, 2023", status: "Resolved" }
];

export default function PartnersReviews() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [determination, setDetermination] = useState("approve");
  const [comment, setComment] = useState("");

  // Modal Control States
  const [activeModal, setActiveModal] = useState(null); // 'history' | 'export-progress' | 'incident-detail'
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // History search state
  const [historySearch, setHistorySearch] = useState("");

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
            const csvContent = generateCSV(["ID", "Category", "Resolution", "Date", "Status"], MOCK_INCIDENTS_HISTORY);
            triggerDownload(csvContent, `partner_review_incidents.${format.toLowerCase()}`, format === "CSV" ? "text/csv" : "application/json");
            toast.success(`Review report exported in ${format} format!`);
            setIsExporting(false);
            setActiveModal(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    setTimeout(() => {
      setIsSavingDraft(false);
      toast.success(`Draft saved successfully! Determination set to "${determination.toUpperCase()}".`);
    }, 1200);
  };

  const handleRowClick = (incident) => {
    setSelectedIncident(incident);
    setActiveModal("incident-detail");
  };

  const filteredHistory = MOCK_INCIDENTS_HISTORY.filter(inc => 
    inc.id.toLowerCase().includes(historySearch.toLowerCase()) ||
    inc.category.toLowerCase().includes(historySearch.toLowerCase()) ||
    inc.resolution.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search bookings, users, or partners..."
    >
      <div className="min-h-screen bg-slate-50  text-slate-700 p-6 space-y-6" style={{ paddingBottom: "40px" }}>
        
        {/* ================= BREADCRUMB & SUBTITLE ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="hover:underline cursor-pointer">Partners</span>
              <span>&gt;</span>
              <span className="text-slate-600">Partner Review</span>
            </nav>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Reviewing performance metrics and service compliance for Q3 2023.
            </p>
          </div>
          
          <button 
            onClick={() => setIsExportOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-955 transition shadow-sm border-none cursor-pointer"
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
        <PartnerExportModal
          open={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          title="Export Partner Review Report"
          description="Choose the file format for exporting partner review analytics and performance summaries."
          helper="Your export will include partner ratings, incident trends, and compliance insights."
          onExport={handleExport}
          confirmLabel="Generate Export"
        />

        {/* ================= ARCHITECTURE GRID ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* LEFT & CENTER PANELS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Performance Metrics Card */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <FileText size={18} className="text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">Performance Metrics</h2>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Uptime Metric */}
                <div 
                  onClick={() => toast.success("Uptime metrics derived from network latency monitoring agents.")}
                  className="rounded-xl bg-slate-50 p-4 border border-slate-100/70 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                      <Clock size={16} />
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-emerald-600 gap-0.5">
                      +0.4% <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <p className="mt-4 text-[11px] font-bold text-slate-400 tracking-wide uppercase">Uptime</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 tracking-tight">99.98%</p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "99.98%" }}></div>
                  </div>
                </div>

                {/* SLA Compliance Metric */}
                <div 
                  onClick={() => toast.success("SLA compliance target verified against delivery transit windows.")}
                  className="rounded-xl bg-slate-50 p-4 border border-slate-100/70 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded">
                      On Target
                    </span>
                  </div>
                  <p className="mt-4 text-[11px] font-bold text-slate-400 tracking-wide uppercase">SLA Compliance</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 tracking-tight">98.5%</p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "98.5%" }}></div>
                  </div>
                </div>

                {/* User Rating Metric */}
                <div 
                  onClick={() => toast.success("User rating compiled from post-fulfillment customer surveys.")}
                  className="rounded-xl bg-slate-50 p-4 border border-slate-100/70 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-rose-50 p-2 text-rose-600">
                      <ThumbsUp size={16} />
                    </div>
                    <span className="inline-flex items-center text-xs font-bold text-rose-600 gap-0.5">
                      -0.2 <ArrowDownRight size={12} />
                    </span>
                  </div>
                  <p className="mt-4 text-[11px] font-bold text-slate-400 tracking-wide uppercase">User Rating</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 tracking-tight">4.6/5</p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Recent Incidents Table Card */}
            <div className="rounded-xl bg-white overflow-hidden shadow-sm border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-500" />
                  <h2 className="text-base font-bold text-slate-900">Recent Incidents</h2>
                </div>
                <button 
                  className="text-xs font-bold text-blue-600 hover:underline transition border-none bg-transparent cursor-pointer" 
                  onClick={() => setActiveModal("history")}
                >
                  View All History
                </button>
              </div>

              <div className="overflow-x-auto">
                <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold tracking-wider text-slate-400 uppercase">
                        <th className="px-6 py-3.5">Incident ID</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Resolution</th>
                        <th className="px-6 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                      {MOCK_INCIDENTS_HISTORY.slice(0, 3).map((incident) => (
                        <tr 
                          key={incident.id} 
                          className="hover:bg-slate-50/40 transition cursor-pointer"
                          onClick={() => handleRowClick(incident)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap  font-semibold text-blue-600">{incident.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{incident.category}</td>
                          <td className="px-6 py-4 text-slate-500">{incident.resolution}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset ${
                              incident.status === 'Resolved' 
                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' 
                                : 'bg-blue-50 text-blue-700 ring-blue-600/10'
                            }`}>
                              {incident.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 3. Partner Narrative Section */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Partner Narrative</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Nexus Logistics has maintained high operational efficiency across coastal regions,
                though recent expansion into Denver has seen a slight dip in timeliness. The user rating
                remains above the enterprise threshold of 4.5, but a trend in damaged small-parcels
                needs addressed before contract renewal.
              </p>
              
              <div className="mt-5 rounded-lg border-l-4 border-blue-600 bg-slate-50 p-4">
                <p className="text-sm italic text-slate-700 leading-relaxed">
                  "The integration with our new ERP system was smooth, but their driver app reported
                  significant lag during peak hours."
                </p>
                <p className="mt-2 text-xs font-bold text-slate-400">— Regional Operations Head</p>
              </div>
            </div>

          </div>

          {/* ================= RIGHT ACTION SIDE PANEL ================= */}
          <div className="space-y-6">
            
            {/* Action 1: Review Actions Form */}
            <div className="rounded-xl bg-[#141644] p-6 shadow-md border border-indigo-950/40">
              <div className="flex items-center gap-2 border-b border-indigo-900/40 pb-4">
                <AlertCircle size={18} className="text-indigo-300" />
                <h2 className="text-base font-bold text-white">Review Actions</h2>
              </div>
              
              <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-indigo-300/50">
                Final Determination
              </p>

              <div className="mt-3 space-y-3">
                {/* Approve Card */}
                <label 
                  onClick={() => setDetermination("approve")}
                  className={`relative flex cursor-pointer items-start rounded-xl p-4 transition shadow-sm ${determination === "approve" ? "bg-white text-slate-900" : "bg-indigo-950/30 border border-indigo-900/40 hover:bg-indigo-900/20 text-indigo-200"}`}
                >
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-bold">Approve Renewal</span>
                    <span className={`mt-0.5 text-xs ${determination === "approve" ? "text-slate-500" : "text-indigo-400/60"}`}>Extend contract for 12 months</span>
                  </div>
                  <input type="radio" name="determination" checked={determination === "approve"} readOnly className="sr-only" />
                  {determination === "approve" && (
                    <span className="ml-3 text-emerald-500">
                      <CheckCircle2 size={18} />
                    </span>
                  )}
                </label>

                {/* Request Improvements Card */}
                <label 
                  onClick={() => setDetermination("improve")}
                  className={`relative flex cursor-pointer items-start rounded-xl p-4 transition shadow-sm ${determination === "improve" ? "bg-white text-slate-900" : "bg-indigo-950/30 border border-indigo-900/40 hover:bg-indigo-900/20 text-indigo-200"}`}
                >
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-bold">Request Improvements</span>
                    <span className={`mt-0.5 text-xs ${determination === "improve" ? "text-slate-500" : "text-indigo-400/60"}`}>Issue 30-day correction notice</span>
                  </div>
                  <input type="radio" name="determination" checked={determination === "improve"} readOnly className="sr-only" />
                  {determination === "improve" && (
                    <span className="ml-3 text-emerald-500">
                      <CheckCircle2 size={18} />
                    </span>
                  )}
                </label>

                {/* Terminate Partnership Card */}
                <label 
                  onClick={() => setDetermination("terminate")}
                  className={`relative flex cursor-pointer items-start rounded-xl p-4 transition shadow-sm ${determination === "terminate" ? "bg-rose-600 text-white" : "bg-indigo-950/30 border border-indigo-900/40 hover:bg-rose-900/20 text-rose-450"}`}
                >
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-bold">Terminate Partnership</span>
                    <span className={`mt-0.5 text-xs ${determination === "terminate" ? "text-rose-100/80" : "text-rose-400/60"}`}>Initiate standard 60-day offboarding</span>
                  </div>
                  <input type="radio" name="determination" checked={determination === "terminate"} readOnly className="sr-only" />
                  {determination === "terminate" && (
                    <span className="ml-3 text-white">
                      <CheckCircle2 size={18} />
                    </span>
                  )}
                </label>
              </div>

              <div className="mt-5">
                <label className="text-xs font-bold text-indigo-200/70">Internal Review Comments</label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a note for the auditing team..."
                  className="mt-1.5 w-full rounded-xl bg-[#0d0e30] p-3 text-sm text-slate-200 placeholder-indigo-900/50 border border-indigo-950/60 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button 
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="mt-4 w-full rounded-xl bg-transparent py-2.5 text-xs font-bold text-white hover:bg-indigo-900 transition shadow-sm border border-indigo-500 cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isSavingDraft && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Save Draft Comment</span>
              </button>
            </div>

            {/* Action 2: Company Summary Profile Meta */}
            <div className="rounded-xl bg-white overflow-hidden p-5 space-y-4 shadow-sm border border-slate-100">
              <div className="relative h-32 w-full rounded-lg bg-slate-50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
                  alt="Nexus Logistics hub"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Nexus Logistics</h3>
                <p className="mt-0.5 text-xs font-medium text-slate-400">Partner since Oct 2018 • Premium Tier</p>
              </div>

              <div className="space-y-2.5 border-t border-slate-50 pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Primary Hub:</span>
                  <span className="font-extrabold text-slate-900">Chicago, IL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Wallet Balance:</span>
                  <span className="font-black text-emerald-600">$12,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Compliance Officer:</span>
                  <span className="font-extrabold text-slate-900">Marcus Thorne</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          MODAL: VIEW ALL INCIDENTS HISTORY
          ======================================================== */}
      {activeModal === "history" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Incident Investigation History</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Showing all historical compliance incident records</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search filter inside modal */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search history by category, incident code..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:bg-white font-medium"
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1">
              {filteredHistory.map((inc) => (
                <div 
                  key={inc.id} 
                  onClick={() => handleRowClick(inc)}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className=" text-xs font-bold text-blue-600">{inc.id}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{inc.date}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1">{inc.category}</p>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{inc.resolution}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset ${
                    inc.status === 'Resolved' 
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' 
                      : 'bg-blue-50 text-blue-700 ring-blue-600/10'
                  }`}>
                    {inc.status}
                  </span>
                </div>
              ))}
              {filteredHistory.length === 0 && (
                <p className="text-center py-6 text-slate-400 text-xs font-semibold">No incident history matches search criteria.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: INCIDENT DETAIL MODAL
          ======================================================== */}
      {activeModal === "incident-detail" && selectedIncident && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(activeModal === "incident-detail" ? "history" : null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Incident Report File
                </span>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-1">{selectedIncident.id}</h3>
              </div>
              <button 
                onClick={() => setActiveModal(activeModal === "incident-detail" ? "history" : null)} 
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3.5 text-xs text-slate-700 font-semibold">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Incident Category:</span>
                <span className="text-slate-900 font-bold">{selectedIncident.category}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Incident Date:</span>
                <span className="text-slate-900 font-bold">{selectedIncident.date}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Resolution Applied:</span>
                <span className="text-slate-900 font-bold">{selectedIncident.resolution}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Current Status:</span>
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset ${
                  selectedIncident.status === 'Resolved' 
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' 
                    : 'bg-blue-50 text-blue-700 ring-blue-600/10'
                }`}>
                  {selectedIncident.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.success(`Incident audit ticket requested for ${selectedIncident.id}`);
                  setActiveModal(null);
                }}
                className="w-full py-2.5 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md"
              >
                Request Full Incident Log
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
            <h3 className="text-base font-black text-slate-900">Compiling Investigation Database...</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Exporting active partner review metrics</p>
            
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