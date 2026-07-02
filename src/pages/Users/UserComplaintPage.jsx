import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useApp } from "../../hooks/useApp";
import { ROUTES } from "../../config/routes";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  X,
  Loader2,
  Check,
  AlertCircle,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight,
  UserCheck
} from "lucide-react";

export default function UserComplaintsPage() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  const [filterStatus, setFilterStatus] = useState("All");

  const initialComplaints = [
    { ticketId: "#TK-88210", issueType: "Service Delay", priority: "High", status: "OPEN", assignedAgent: "Alex Rivera", description: "Deep cleaning provider arrived 45 minutes late without prior notification.", date: "2026-06-28", category: "Operations" },
    { ticketId: "#TK-88156", issueType: "Payment Failed", priority: "Med", status: "RESOLVED", assignedAgent: "System (Auto)", description: "Credit card charged twice during booking invoice settlement.", date: "2026-06-25", category: "Billing" }
  ];

  const [ticketsList, setTicketsList] = useState(initialComplaints);

  // Modal Control States
  const [activeModal, setActiveModal] = useState(null); // 'actions' | 'ticket' | 'export'
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const filteredComplaints = ticketsList.filter(
    (item) => filterStatus === "All" || item.status === filterStatus
  );

  const handleEditProfile = () => {
    navigate(ROUTES.users);
    addToast("Redirected to All Users directory to edit profile.", "success");
  };

  const handleActions = () => {
    setActiveModal("actions");
  };

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setActiveModal("export");
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const csvContent = generateCSV(["TicketID", "IssueType", "Priority", "Status", "AssignedAgent"], filteredComplaints);
            triggerDownload(csvContent, "user_complaints_report.csv", "text/csv");
            addToast("Complaints report exported successfully!", "success");
            setIsExporting(false);
            setActiveModal(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setActiveModal("ticket");
  };

  const handleResolveTicket = (ticketId) => {
    setTicketsList(prev => prev.map(t => {
      if (t.ticketId === ticketId) {
        return { ...t, status: "RESOLVED", assignedAgent: "System (Override)" };
      }
      return t;
    }));
    addToast(`Ticket ${ticketId} resolved successfully.`, "success");
    setActiveModal(null);
  };

  return (
    <AdminShell
      activeTab="User Management"
      searchPlaceholder="Search users, tickets or complaints..."
    >
      <div className="space-y-6" style={{ paddingBottom: "40px" }}>

        {/* Header */}
        <div>
          <h1 className="page-title">
            User Complaints
          </h1>
          <p className="page-subtitle">
            Track and manage user complaints
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt=""
                className="w-20 h-20 rounded-xl"
              />
              <div>
                <h2 className="text-3xl font-bold">
                  Sarah Jenkins
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                    PREMIUM MEMBER
                  </span>
                  <span className="text-slate-500 font-semibold">
                    ID: #HZ-44921
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleEditProfile} className="secondary-action-btn font-bold cursor-pointer">
                Edit Profile
              </button>
              <button onClick={handleActions} className="primary-action-btn font-bold cursor-pointer">
                Actions
              </button>
            </div>
          </div>

          {/* Sub-tabs Routing */}
          <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--materio-border)", paddingBottom: "12px", marginTop: "24px" }}>
            <button onClick={() => { navigate(ROUTES.users); addToast("Navigating to Overview", "success"); }} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#fff", color: "#64748b", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Overview
            </button>
            <button onClick={() => { navigate(ROUTES.userActivityLogs); addToast("Navigating to Activity Logs", "success"); }} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#fff", color: "#64748b", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Activity Logs
            </button>
            <button onClick={() => { navigate(ROUTES.userComplaints); addToast("Reloaded Complaints", "success"); }} style={{ padding: "8px 16px", border: "1.5px solid #2A2454", borderRadius: "8px", background: "#e0e7ff", color: "#2A2454", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Complaints
            </button>
            <button onClick={() => { navigate(ROUTES.userWallets); addToast("Navigating to Financials", "success"); }} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#fff", color: "#64748b", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Financials
            </button>
            <button onClick={() => addToast("Sarah Jenkins platform parameters dashboard loaded.", "success")} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#fff", color: "#64748b", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Settings
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Currently 1 ticket requires resolution.", "success")}>
            <p className="text-sm text-slate-500">Open Complaints</p>
            <h3 className="text-4xl font-bold mt-2">
              {ticketsList.filter(t => t.status === "OPEN").length}
            </h3>
          </div>

          <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Historically resolved tickets.", "success")}>
            <p className="text-sm text-slate-500">Resolved</p>
            <h3 className="text-4xl font-bold text-green-600 mt-2">
              {ticketsList.filter(t => t.status === "RESOLVED").length}
            </h3>
          </div>

          <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer" onClick={() => addToast("No complaints currently escalated.", "success")}>
            <p className="text-sm text-slate-500">Escalated</p>
            <h3 className="text-4xl font-bold text-orange-500 mt-2">0</h3>
          </div>
        </div>

        {/* Complaint Table */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-lg">
              Complaint Tickets
            </h3>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--materio-border)",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                  background: "var(--materio-surface)",
                }}
              >
                <option value="All">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="RESOLVED">Resolved</option>
              </select>
              <button onClick={handleExport} className="secondary-action-btn cursor-pointer">
                Export
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="p-4">Ticket ID</th>
                <th>Issue Type</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Agent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((item) => (
                <tr key={item.ticketId} className="border-t hover:bg-slate-50">
                  <td className="p-4 text-indigo-600 font-medium">
                    {item.ticketId}
                  </td>
                  <td>{item.issueType}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.priority === "High" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "OPEN" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.assignedAgent}</td>
                  <td>
                    <button onClick={() => handleViewTicket(item)} className="text-indigo-600 hover:underline font-bold cursor-pointer" style={{ border: "none", background: "none" }}>
                      View Ticket
                    </button>
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-400">
                    No tickets found matching the selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Support Note */}
        <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Audited: Customer frequently files ticket regarding delays.", "success")}>
          <h3 className="font-semibold text-indigo-600">
            Support Intelligence Note
          </h3>
          <p className="text-slate-600 mt-3">
            Sarah Jenkins has a high resolution rate but frequently reports service delay issues. Recommended to review booking assignments and partner performance history.
          </p>
        </div>

      </div>

      {/* ========================================================
          MODAL: PROFILE EXECUTIVE ACTIONS
          ======================================================== */}
      {activeModal === "actions" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Sarah Jenkins Actions</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Administrative account controls</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveModal(null);
                  addToast("Sarah Jenkins account flagged for priority audit.", "success");
                }}
                className="w-full text-left flex items-center gap-3 p-3 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all text-xs font-bold text-slate-700"
              >
                <ShieldAlert className="h-4 w-4 text-rose-500" />
                <span>Flag Account (Suspicious Activity)</span>
              </button>

              <button
                onClick={() => {
                  setActiveModal(null);
                  addToast("Promo bonus credit applied successfully.", "success");
                }}
                className="w-full text-left flex items-center gap-3 p-3 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all text-xs font-bold text-slate-700"
              >
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span>Apply Credit Boost (Promo Bonus)</span>
              </button>

              <button
                onClick={() => {
                  setActiveModal(null);
                  addToast("Customer support override settings synchronized.", "success");
                }}
                className="w-full text-left flex items-center gap-3 p-3 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all text-xs font-bold text-slate-700"
              >
                <UserCheck className="h-4 w-4 text-indigo-600" />
                <span>Set VIP Support Status</span>
              </button>
            </div>

            <div className="flex gap-2 justify-end pt-5 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: TICKET DETAILS
          ======================================================== */}
      {activeModal === "ticket" && selectedTicket && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Ticket Summary: {selectedTicket.ticketId}</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Assigned Agent: {selectedTicket.assignedAgent}</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="font-bold text-slate-400">Issue Category:</span>
                <span className="font-black text-slate-800">{selectedTicket.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="font-bold text-slate-400">Filing Date:</span>
                <span className="font-black text-slate-800">{selectedTicket.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="font-bold text-slate-400">Priority Level:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  selectedTicket.priority === "High" ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"
                }`}>{selectedTicket.priority}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="font-bold text-slate-400">Current Status:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  selectedTicket.status === "OPEN" ? "bg-yellow-50 text-yellow-800" : "bg-green-50 text-green-800"
                }`}>{selectedTicket.status}</span>
              </div>
              
              <div className="py-2.5">
                <label className="font-bold text-slate-400 block mb-1">Issue Description:</label>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-semibold leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100">
                {selectedTicket.status === "OPEN" && (
                  <button
                    type="button"
                    onClick={() => handleResolveTicket(selectedTicket.ticketId)}
                    className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md"
                  >
                    Mark as Resolved
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EXPORT COMPILING SPINNER
          ======================================================== */}
      {activeModal === "export" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden text-center animate-in zoom-in-95 duration-200">
            <Loader2 className="h-8 w-8 text-[#25108f] animate-spin mx-auto mb-4" />
            <h3 className="text-base font-black text-slate-900">Compiling Report Container...</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Exporting Sarah Jenkins' complaints history</p>
            
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