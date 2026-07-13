import toast from 'react-hot-toast';
import React, { useState, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";

import {
  ShieldAlert,
  SlidersHorizontal,
  Download,
  UserCheck,
  Server,
  GitBranch,
  FileText,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
  Loader2,
  Check,
  AlertCircle
} from "lucide-react";
import PartnerExportModal from "../../components/ui/PartnerExportModal";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";

import Select from "../../components/ui/Select";

const INITIAL_TASKS = [
  {
    id: "PRT-99201",
    partnerName: "Nexis Logistics",
    initials: "NX",
    type: "ISP",
    pendingItem: "KYC Verification",
    icon: UserCheck,
    date: "Oct 24, 2023",
    time: "09:12 AM",
    priority: "High",
    priorityColor: "rose"
  },
  {
    id: "PRT-88421",
    partnerName: "Blue Freight Inc.",
    initials: "BF",
    type: "BSP",
    pendingItem: "Bank Verification",
    icon: Building2,
    date: "Oct 24, 2023",
    time: "10:45 AM",
    priority: "Medium",
    priorityColor: "amber"
  },
  {
    id: "PRT-10293",
    partnerName: "Swift Ventures",
    initials: "SV",
    type: "ISP",
    pendingItem: "Tax Documents",
    icon: FileText,
    date: "Oct 23, 2023",
    time: "04:30 PM",
    priority: "Low",
    priorityColor: "slate"
  },
  {
    id: "PRT-20938",
    partnerName: "Global Reach Co.",
    initials: "GR",
    type: "BSP",
    pendingItem: "New Branch: Singapore",
    icon: GitBranch,
    date: "Oct 23, 2023",
    time: "01:15 PM",
    priority: "Medium",
    priorityColor: "amber"
  }
];

export default function PartnerApprovals() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' या 'assigned'
  const [selectedMetric, setSelectedMetric] = useState("all"); // 'all', 'KYC', 'Service', 'Branch', 'Documents', 'Bank'
  const [searchQuery, setSearchQuery] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Stateful list and metrics
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filters Modal State
  const [activeModal, setActiveModal] = useState(null); // 'filter' | 'rule' | 'export-progress'
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Export progress
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const clickOutside = () => setActiveDropdownId(null);
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

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
            const csvContent = generateCSV(["ID", "PartnerName", "Type", "PendingItem", "Date", "Priority"], filteredTasks);
            triggerDownload(csvContent, `partner_approval_report.${format.toLowerCase()}`, format === "CSV" ? "text/csv" : "application/json");
            toast.success(`Approval queue report exported in ${format} format!`);
            setIsExporting(false);
            setActiveModal(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleApprove = (taskId, partnerName) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    toast.success(`Verification request for ${partnerName} has been approved!`);
    setActiveDropdownId(null);
  };

  const handleReject = (taskId, partnerName) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    toast.error(`Verification request for ${partnerName} has been rejected.`);
    setActiveDropdownId(null);
  };

  const handleReassign = (partnerName) => {
    toast.success(`Request for ${partnerName} reassigned to senior compliance officer.`);
    setActiveDropdownId(null);
  };

  // 1. Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "assigned" && task.id !== "PRT-99201") {
      return false;
    }

    // Metric filters
    if (selectedMetric === "KYC" && !task.pendingItem.includes("KYC")) return false;
    if (selectedMetric === "Service" && !task.pendingItem.includes("Service")) return false;
    if (selectedMetric === "Branch" && !task.pendingItem.includes("Branch")) return false;
    if (selectedMetric === "Documents" && !task.pendingItem.includes("Documents") && !task.pendingItem.includes("Tax")) return false;
    if (selectedMetric === "Bank" && !task.pendingItem.includes("Bank")) return false;

    // Advanced filters
    if (priorityFilter !== "All" && task.priority !== priorityFilter) return false;
    if (typeFilter !== "All" && task.type !== typeFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        task.partnerName.toLowerCase().includes(q) ||
        task.id.toLowerCase().includes(q) ||
        task.pendingItem.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search approvals, partners, or IDs..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <div className="min-h-screen bg-[#f8fafc]  text-slate-800 p-8 space-y-6" style={{ paddingBottom: "40px" }}>
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 tracking-wider uppercase">
              <ShieldAlert size={14} />
              Verification Control
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Partner Approval Queue</h1>
            <p className="text-sm text-slate-500 font-medium">
              Manage and verify pending administrative requests from global partners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveModal("filter")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              Filter Requests
            </button>
            <button 
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-950 transition shadow-sm cursor-pointer border-none"
            >
              <Download size={14} />
              Export Report
            </button>

            <PartnerExportModal
              open={isExportOpen}
              onClose={() => setIsExportOpen(false)}
              title="Export Approval Report"
              description="Choose the file format to export partner approval queue metrics and audit-ready summaries."
              helper="Exports include approval statuses, partner verification trends, and task-level analytics."
              onExport={handleExport}
              confirmLabel="Generate Export"
            />
          </div>
        </div>

        {/* ================= METRICS STATS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Pending KYC */}
          <div 
            onClick={() => setSelectedMetric(selectedMetric === "KYC" ? "all" : "KYC")}
            className={`rounded-xl border p-5 shadow-sm flex items-start justify-between cursor-pointer transition-all ${
              selectedMetric === "KYC" ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Pending KYC</p>
              <p className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                ! 8 Urgent
              </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-2xl font-black text-slate-900">{tasks.filter(t => t.pendingItem.includes("KYC")).length}</span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mt-2">
                <UserCheck size={16} />
              </div>
            </div>
          </div>

          {/* Pending Services */}
          <div 
            onClick={() => setSelectedMetric(selectedMetric === "Service" ? "all" : "Service")}
            className={`rounded-xl border p-5 shadow-sm flex items-start justify-between cursor-pointer transition-all ${
              selectedMetric === "Service" ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Pending Services</p>
              <p className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                4 New Today
              </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-2xl font-black text-slate-900">{tasks.filter(t => t.pendingItem.includes("Service")).length}</span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mt-2">
                <Server size={16} />
              </div>
            </div>
          </div>

          {/* Pending Branches */}
          <div 
            onClick={() => setSelectedMetric(selectedMetric === "Branch" ? "all" : "Branch")}
            className={`rounded-xl border p-5 shadow-sm flex items-start justify-between cursor-pointer transition-all ${
              selectedMetric === "Branch" ? "border-amber-500 bg-amber-50/30 ring-2 ring-amber-500/20" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Pending Branches</p>
              <p className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                Stable flow
              </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-2xl font-black text-slate-900">{tasks.filter(t => t.pendingItem.includes("Branch")).length}</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 mt-2">
                <GitBranch size={16} />
              </div>
            </div>
          </div>

          {/* Pending Documents */}
          <div 
            onClick={() => setSelectedMetric(selectedMetric === "Documents" ? "all" : "Documents")}
            className={`rounded-xl border p-5 shadow-sm flex items-start justify-between cursor-pointer transition-all ${
              selectedMetric === "Documents" ? "border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Pending Documents</p>
              <p className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                High volume
              </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-2xl font-black text-slate-900">{tasks.filter(t => t.pendingItem.includes("Documents") || t.pendingItem.includes("Tax")).length}</span>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-2">
                <FileText size={16} />
              </div>
            </div>
          </div>

          {/* Bank Verification */}
          <div 
            onClick={() => setSelectedMetric(selectedMetric === "Bank" ? "all" : "Bank")}
            className={`rounded-xl border p-5 shadow-sm flex items-start justify-between cursor-pointer transition-all ${
              selectedMetric === "Bank" ? "border-orange-500 bg-orange-50/30 ring-2 ring-orange-500/20" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Bank Verification</p>
              <p className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                ⚠️ Critical action
              </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-2xl font-black text-slate-900">{tasks.filter(t => t.pendingItem.includes("Bank")).length}</span>
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 mt-2">
                <Building2 size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= DATA TABLE CONTAINER ================= */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-base font-bold text-slate-900">Active Approval Queue</h2>
              <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-bold text-slate-600">
                <button 
                  onClick={() => setActiveTab("all")}
                  className={`rounded-md px-3 py-1 transition cursor-pointer ${activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"}`}
                >
                  All Tasks
                </button>
                <button 
                  onClick={() => setActiveTab("assigned")}
                  className={`rounded-md px-3 py-1 transition cursor-pointer ${activeTab === "assigned" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"}`}
                >
                  Assigned to Me
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {(selectedMetric !== "all" || priorityFilter !== "All" || typeFilter !== "All" || searchQuery.trim()) && (
                <button 
                  onClick={() => {
                    setSelectedMetric("all");
                    setPriorityFilter("All");
                    setTypeFilter("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold bg-indigo-50 text-indigo-650 px-2 py-1 rounded hover:bg-indigo-100 cursor-pointer border-none"
                >
                  Clear Filters ✕
                </button>
              )}
              <p className="text-xs font-bold text-slate-400">Showing {filteredTasks.length} items</p>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    <th className="px-6 py-3.5">Partner</th>
                    <th className="px-6 py-3.5">Type</th>
                    <th className="px-6 py-3.5">Pending Item</th>
                    <th className="px-6 py-3.5">Submitted Date</th>
                    <th className="px-6 py-3.5">Priority</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => {
                      const TaskIcon = task.icon;
                      return (
                        <tr key={task.id} className="hover:bg-slate-50/40 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-100 font-bold text-xs text-slate-600">
                                <span>{task.initials}</span>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{task.partnerName}</p>
                                <p className="text-[11px] text-slate-400 font-semibold ">ID: {task.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">
                              {task.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                              <TaskIcon size={14} /> {task.pendingItem}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                            <p className="font-semibold text-slate-800">{task.date}</p>
                            <p className="text-[10px]">{task.time}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold text-${task.priorityColor}-600`}>
                              <span className={`h-1.5 w-1.5 rounded-full bg-${task.priorityColor}-500`}></span> {task.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-slate-400" style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={() => setActiveDropdownId(activeDropdownId === task.id ? null : task.id)}
                              className="hover:text-slate-600 cursor-pointer"
                              style={{ background: "none", border: "none" }}
                            >
                              <MoreHorizontal size={16} />
                            </button>
                            {activeDropdownId === task.id && (
                              <div 
                                className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1 text-left" 
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button 
                                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
                                  onClick={() => handleApprove(task.id, task.partnerName)}
                                >
                                  <Check size={14} className="text-green-600" /> Approve Request
                                </button>
                                <button 
                                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
                                  onClick={() => handleReject(task.id, task.partnerName)}
                                >
                                  <X size={14} className="text-rose-600" /> Reject Request
                                </button>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button 
                                  className="w-full text-left px-4 py-2 text-sm text-indigo-650 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
                                  onClick={() => handleReassign(task.partnerName)}
                                >
                                  <SlidersHorizontal size={14} /> Escalated Check
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400 font-medium text-sm">
                        No pending requests found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
</div>
          </div>

          {/* Table Pagination Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <button className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                10 <ChevronDown size={12} />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600 cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}><ChevronLeft size={14} /></button>
              <button className="h-7 w-7 rounded bg-indigo-900 text-white flex items-center justify-center cursor-pointer border-none" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>1</button>
              <button className="h-7 w-7 rounded hover:bg-slate-100 flex items-center justify-center cursor-pointer border-none bg-transparent" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>2</button>
              <button className="h-7 w-7 rounded hover:bg-slate-100 flex items-center justify-center cursor-pointer border-none bg-transparent" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>3</button>
              <span className="px-1">...</span>
              <button className="h-7 w-7 rounded hover:bg-slate-100 flex items-center justify-center cursor-pointer border-none bg-transparent" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>10</button>
              <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-650 hover:bg-slate-50 cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ================= HERO AUTOMATION BANNER ================= */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-950 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md overflow-hidden relative">
          <div className="space-y-3 max-w-xl z-10">
            <h2 className="text-xl font-black text-white tracking-tight">Automate Your Queue</h2>
            <p className="text-sm text-indigo-200 leading-relaxed font-medium">
              Enable Smart-Approval for trusted partners to bypass standard manual review for low-risk documents and branch updates.
            </p>
            <button 
              onClick={() => setActiveModal("rule")}
              className="mt-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-indigo-900 hover:bg-slate-50 transition shadow-sm cursor-pointer border-none"
            >
              Configure Rules
            </button>
          </div>
          
          <div className="w-full md:w-56 h-36 bg-indigo-950/40 border border-indigo-800/40 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"
              alt="Automation Tech"
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
            />
          </div>
        </div>

      </div>
      {/* ========================================================
          MODAL: FILTER REQUESTS OPTIONS
          ======================================================== */}
      {activeModal === "filter" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Filter Approval Queue</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Filter queue by priority and partner classification</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Priority Level</label>
                <Select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                  options={[{
                    label: "All Priorities",
                    value: "All"
                  }, {
                    label: "High Priority",
                    value: "High"
                  }, {
                    label: "Medium Priority",
                    value: "Medium"
                  }, {
                    label: "Low Priority",
                    value: "Low"
                  }]} />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Partner Classification</label>
                <Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                  options={[{
                    label: "All Types",
                    value: "All"
                  }, {
                    label: "ISP (Integrated Services)",
                    value: "ISP"
                  }, {
                    label: "BSP (Basic Services)",
                    value: "BSP"
                  }]} />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPriorityFilter("All");
                    setTypeFilter("All");
                    setActiveModal(null);
                  }}
                  className="flex-1 py-2 text-center border border-slate-200 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================
          MODAL: CONFIGURE AUTOMATION RULES
          ======================================================== */}
      {activeModal === "rule" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Smart-Approval Configuration</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Automate low-risk documentation verification</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <AlertCircle className="h-8 w-8 text-indigo-650 flex-shrink-0" />
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Enabling these rules automatically approves documents from partners with compliance score &gt; 90% and history of zero re-uploads.
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded text-indigo-650 cursor-pointer" />
                  <span>Auto-approve GST registration certificates matching active government portal data</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded text-indigo-650 cursor-pointer" />
                  <span>Bypass manual audit for regional dispatch branch coordinates verification</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded text-indigo-650 cursor-pointer" />
                  <span>Enable auto-OCR name match for company PAN card submissions</span>
                </label>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Smart-Approval compliance rules successfully saved!");
                    setActiveModal(null);
                  }}
                  className="flex-1 py-2.5 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md"
                >
                  Save Rules
                </button>
              </div>
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
            <h3 className="text-base font-black text-slate-900">Compiling Approval Queue Report...</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Preparing verified partner audit compliance lists</p>
            
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