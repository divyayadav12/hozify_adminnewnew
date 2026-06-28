import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell"; // आपका एडमिन शेल कंपोनेंट

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
  MoreHorizontal
} from "lucide-react";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";

// स्टैटिक डेटा (Mock Data) जिसे हम फ़िल्टर करेंगे
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
  // स्टेट्स (States) मैनेजमेंट
  const [activeTab, setActiveTab] = useState("all"); // 'all' या 'assigned'
  const [selectedMetric, setSelectedMetric] = useState("all"); // 'all', 'KYC', 'Bank', 'Branch', 'Documents'
  const [searchQuery, setSearchQuery] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleExport = (format) => {
    setIsExportOpen(false);
    alert(`${format} export for approval queue has started.`);
  };

  // 1. फ़िल्टर लॉजिक (Tab और Metric के आधार पर)
  const filteredTasks = INITIAL_TASKS.filter((task) => {
    // टैब फ़िल्टर (उदाहरण के लिए ID के आधार पर 'Assigned to Me' मान लेते हैं)
    if (activeTab === "assigned" && task.id !== "PRT-99201") {
      return false;
    }

    // मेट्रिक्स कार्ड फ़िल्टर
    if (selectedMetric === "KYC" && !task.pendingItem.includes("KYC")) return false;
    if (selectedMetric === "Bank" && !task.pendingItem.includes("Bank")) return false;
    if (selectedMetric === "Branch" && !task.pendingItem.includes("Branch")) return false;
    if (selectedMetric === "Documents" && !task.pendingItem.includes("Documents") && !task.pendingItem.includes("Tax")) return false;

    return true;
  });

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search approvals, partners, or IDs..."
    >
      <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 p-8 space-y-6">
        
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
              onClick={() => alert("Opening advanced filter options...")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <SlidersHorizontal size={14} />
              Filter Requests
            </button>
            <PartnerExportButton onClick={() => setIsExportOpen(true)} label="Export Report" />
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
              <span className="text-2xl font-black text-slate-900">24</span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mt-2">
                <UserCheck size={16} />
              </div>
            </div>
          </div>

          {/* Pending Services */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-start justify-between opacity-60">
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Pending Services</p>
              <p className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md inline-block">
                4 New Today
              </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              <span className="text-2xl font-black text-slate-900">12</span>
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
              <span className="text-2xl font-black text-slate-900">08</span>
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
              <span className="text-2xl font-black text-slate-900">45</span>
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
              <span className="text-2xl font-black text-slate-900">05</span>
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
                  className={`rounded-md px-3 py-1 transition ${activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"}`}
                >
                  All Tasks
                </button>
                <button 
                  onClick={() => setActiveTab("assigned")}
                  className={`rounded-md px-3 py-1 transition ${activeTab === "assigned" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"}`}
                >
                  Assigned to Me
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedMetric !== "all" && (
                <button 
                  onClick={() => setSelectedMetric("all")}
                  className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100"
                >
                  Clear Filter ✕
                </button>
              )}
              <p className="text-xs font-bold text-slate-400">Showing {filteredTasks.length} items</p>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full text-left border-collapse">
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
                              <p className="text-[11px] text-slate-400 font-semibold font-mono">ID: {task.id}</p>
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
                        <td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
                          <button 
                            onClick={() => alert(`Opening context menu for ${task.partnerName}...`)}
                            className="hover:text-slate-600"
                          >
                            <MoreHorizontal size={16} />
                          </button>
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
            </table></div>
          </div>

          {/* Table Pagination Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <button className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1">
                10 <ChevronDown size={12} />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-600"><ChevronLeft size={14} /></button>
              <button className="h-7 w-7 rounded bg-indigo-900 text-white flex items-center justify-center">1</button>
              <button className="h-7 w-7 rounded hover:bg-slate-100 flex items-center justify-center">2</button>
              <button className="h-7 w-7 rounded hover:bg-slate-100 flex items-center justify-center">3</button>
              <span className="px-1">...</span>
              <button className="h-7 w-7 rounded hover:bg-slate-100 flex items-center justify-center">10</button>
              <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><ChevronRight size={14} /></button>
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
              onClick={() => alert("Opening automation rules configuration panel...")}
              className="mt-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-indigo-900 hover:bg-slate-50 transition shadow-sm"
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
    </AdminShell>
  );
}