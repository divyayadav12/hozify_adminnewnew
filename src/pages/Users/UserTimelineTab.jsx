import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useApp } from "../../hooks/useApp";
import { ROUTES } from "../../config/routes";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  LogIn,
  Calendar,
  Wallet,
  FileText,
  UserPlus,
  X,
  Loader2,
  Check,
  ShieldCheck,
  Smartphone,
  Laptop
} from "lucide-react";
import UserSubTabs from "../../components/users/UserSubTabs";

const activities = [
  {
    title: "Successful Login",
    time: "2h ago • 192.168.1.45",
    description:
      "Authenticated via Chrome 118 on MacOS. Session started from Mumbai, IN.",
    color: "bg-slate-100",
    icon: LogIn,
  },
  {
    title: "Booking Created #BK-88201",
    time: "Yesterday, 4:15 PM",
    description:
      "New booking initiated for Deep Home Cleaning service.",
    color: "bg-indigo-100",
    icon: Calendar,
  },
  {
    title: "Wallet Credit +₹500",
    time: "Jan 14, 2024",
    description: "Payment successful via HDFC Credit Card.",
    color: "bg-orange-100",
    icon: Wallet,
  },
  {
    title: "Document Uploaded",
    time: "Jan 12, 2024",
    description: "Identity verification document uploaded.",
    color: "bg-slate-100",
    icon: FileText,
  },
  {
    title: "Account Registration",
    time: "Jan 12, 2024",
    description: "User registered successfully via mobile app.",
    color: "bg-indigo-100",
    icon: UserPlus,
  },
];

const complianceLogs = [
  { time: "2026-06-28 14:22:11", action: "Session Key Authorized", details: "Chrome or MacOS on 192.168.1.45" },
  { time: "2026-06-27 16:15:30", action: "Booking Settlement Sent", details: "Booking #BK-88201 - Total ₹500" },
  { time: "2026-06-27 16:10:02", action: "Wallet Ledger Top-up", details: "Card authorization HDFC successful" },
  { time: "2026-06-26 11:42:55", action: "ID Verification File OCR Checked", details: "Aadhaar Card uploaded" },
  { time: "2026-06-26 11:40:12", action: "User Account Registered", details: "Device ID: SM-G998B (Android)" }
];

export default function UserTimelineTab() {
  const { navigate } = useApp();
  const { addToast } = useToast();

  const [activeModal, setActiveModal] = useState(null); // 'note' | 'logs' | 'export'
  const [noteText, setNoteText] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [isRequestingLogs, setIsRequestingLogs] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportLog = () => {
    setIsExporting(true);
    setExportProgress(0);
    setActiveModal("export");

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const csvData = activities.map((a) => ({
              Title: a.title,
              Time: a.time,
              Description: a.description,
            }));
            const csvContent = generateCSV(["Title", "Time", "Description"], csvData);
            triggerDownload(csvContent, "user_activity_timeline.csv", "text/csv");
            addToast("Activity timeline logs exported successfully!", "success");
            setIsExporting(false);
            setActiveModal(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleQuickNote = () => {
    setActiveModal("note");
  };

  const submitNote = () => {
    if (!noteText.trim()) {
      addToast("Please enter a note to save.", "error");
      return;
    }
    setSavedNote(noteText);
    addToast(`Quick Note saved for Rahul Sharma: "${noteText.substring(0, 30)}..."`, "success");
    setActiveModal(null);
  };

  const handleRequestFullLogs = () => {
    setIsRequestingLogs(true);
    setTimeout(() => {
      setIsRequestingLogs(false);
      setActiveModal("logs");
      addToast("Full compliance audit logs fetched from secure ledger.", "success");
    }, 1200);
  };

  return (
    <AdminShell activeTab="User Management" searchPlaceholder="Search users...">
      <div className="space-y-6" style={{ paddingBottom: "40px" }}>
        
        {/* BREADCRUMB */}
        <div>
          <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "8px" }}>
            User & Partner Admin / User Profile / <span style={{ color: "#696CFF" }}>Timeline</span>
          </div>

          <div className="flex justify-between items-start mt-2">
            <div>
              <h1 className="page-title">
                Activity Timeline
              </h1>
              <p className="page-subtitle">
                Detailed historical log for Rahul Sharma
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={handleExportLog} className="secondary-action-btn cursor-pointer">
                Export Log
              </button>
              <button onClick={handleQuickNote} className="primary-action-btn cursor-pointer">
                Quick Note
              </button>
            </div>
          </div>
        </div>

        {/* SUB-TABS ROUTING */}
        <UserSubTabs />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-9 space-y-6">
            
            {/* Quick Note Alert Banner */}
            {savedNote && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex justify-between items-center">
                <div>
                  <span className="font-black uppercase tracking-wider text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded mr-2">Admin Note</span>
                  <span className="font-bold italic">"{savedNote}"</span>
                </div>
                <button onClick={() => setSavedNote("")} className="text-amber-500 hover:text-amber-800 cursor-pointer" style={{ background: "none", border: "none" }}>
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="bg-white border rounded-xl p-6">
              <div className="flex justify-between mb-8">
                <h3 className="text-2xl font-semibold">
                  Chronological Activity
                </h3>
                <span className="text-sm text-slate-500">
                  All Activities
                </span>
              </div>

              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-slate-200"></div>

                {activities.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index} className="relative flex gap-5 pb-10">
                      <div className={`w-10 h-10 rounded-lg ${item.color} z-10 flex items-center justify-center`}>
                        {Icon && <Icon size={18} />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-lg">
                            {item.title}
                          </h4>
                          <span className="text-sm text-slate-400">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-slate-500 mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-span-3 space-y-4">
            <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Login Count: 124, Success Rate: 98%", "success")}>
              <h3 className="font-semibold text-lg">User Stats</h3>
              <div className="mt-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Login Count</span>
                  <span className="font-bold text-indigo-700">124</span>
                </div>
                <div className="flex justify-between mt-4 text-xs">
                  <span className="text-slate-500">Success Rate</span>
                  <span className="font-bold text-orange-600">98%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Devices checked: MacBook Pro 14, iPhone 15 Pro", "success")}>
              <h3 className="font-semibold text-lg">Known Devices</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Laptop className="h-8 w-8 text-[#2a2454] bg-slate-50 p-1.5 rounded-lg border border-slate-100" />
                  <div>
                    <p className="font-medium text-xs">MacBook Pro 14"</p>
                    <p className="text-[10px] text-slate-500">
                      Last active 2h ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-[#2a2454] bg-slate-50 p-1.5 rounded-lg border border-slate-100" />
                  <div>
                    <p className="font-medium text-xs">iPhone 15 Pro</p>
                    <p className="text-[10px] text-slate-500">
                      Last active 1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2454] text-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg">
                Need deep audit?
              </h3>
              <p className="mt-3 text-xs opacity-90 leading-relaxed">
                Generate a full compliance report.
              </p>
              <button 
                onClick={handleRequestFullLogs} 
                disabled={isRequestingLogs}
                className="w-full mt-5 bg-white text-[#2A2454] py-2.5 rounded-lg font-bold text-xs cursor-pointer border-none flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                {isRequestingLogs && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>{isRequestingLogs ? "Requesting..." : "Request Full Logs"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL: ADD QUICK NOTE
          ======================================================== */}
      {activeModal === "note" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Add Quick Note</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Attach a short administrative note to Rahul Sharma's timeline.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Note Content</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Verified manual ID matches photo. VIP status flagged."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 focus:outline-none focus:border-[#25108f] resize-none font-semibold text-slate-700"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitNote}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: FULL COMPLIANCE AUDIT LOGS
          ======================================================== */}
      {activeModal === "logs" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Full Compliance Audit Ledger</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Secure server authorization logs for Rahul Sharma</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {complianceLogs.map((log, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{log.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{log.details}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full font-bold">
                <ShieldCheck size={14} />
                <span>Crypto Ledger Verified</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md"
              >
                Close Logs
              </button>
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
            <h3 className="text-base font-black text-slate-900">Compiling Timeline Container...</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Packaging activity details for Rahul Sharma</p>
            
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