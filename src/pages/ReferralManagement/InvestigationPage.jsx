import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  Users,
  Network,
  XCircle,
  Ban,
  CheckCircle2,
  Mail
} from "lucide-react";

export default function InvestigationPage() {
  const { addToast } = useToast();

  const [caseStatus, setCaseStatus] = useState("Critical Alert"); 
  const [infoRequested, setInfoRequested] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [graphExpanded, setGraphExpanded] = useState(false);

  const relatedAccounts = [
    { initials: "MK", bg: "bg-purple-200", name: "Marcus Krauss", email: "mkrauss@mail.com", date: "Oct 20, 2023", count: 42, status: "Flagged", identity: "Failed" },
    { initials: "JL", bg: "bg-blue-200", name: "Janice Liao", email: "liao@mail.com", date: "Oct 22, 2023", count: 1, status: "Pending", identity: "In Progress" },
    { initials: "DR", bg: "bg-green-200", name: "David Rossi", email: "rossi@mail.com", date: "Oct 23, 2023", count: 28, status: "Flagged", identity: "Failed" },
  ];

  const handleRequestInfo = () => {
    if (infoRequested) return;
    setInfoRequested(true);
    addToast("Information request sent to user for CASE-88219-F", "success");
  };

  const handleSuspend = () => {
    if (caseStatus === "Suspended") return;
    setCaseStatus("Suspended");
    addToast("CASE-88219-F: Associated nodes suspended successfully", "success");
  };

  const handleClear = () => {
    if (caseStatus === "Cleared") return;
    setCaseStatus("Cleared");
    addToast("CASE-88219-F: Flagged pattern cleared and whitelisted", "success");
  };

  return (
    <AdminShell activeTab="Referrals">
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

        {/* Breadcrumb */}
        <div className="text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-wider">
          FRAUD &gt; INVESTIGATIONS &gt; CASE-88219-F
        </div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Incident: High-Frequency Referral Pattern
            </h1>

            {caseStatus === "Critical Alert" && (
              <span className="inline-flex mt-2 text-[10px] font-extrabold bg-red-50 border border-red-100 text-red-650 px-2 py-0.5 rounded shadow-sm">
                Critical Alert
              </span>
            )}
            {caseStatus === "Suspended" && (
              <span className="inline-flex mt-2 text-[10px] font-extrabold bg-orange-50 border border-orange-200 text-orange-600 px-2 py-0.5 rounded shadow-sm">
                <Ban size={10} className="inline mr-1" /> Suspended
              </span>
            )}
            {caseStatus === "Cleared" && (
              <span className="inline-flex mt-2 text-[10px] font-extrabold bg-green-50 border border-green-200 text-green-600 px-2 py-0.5 rounded shadow-sm">
                <CheckCircle2 size={10} className="inline mr-1" /> Cleared (Safe)
              </span>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={handleRequestInfo}
              disabled={infoRequested}
              className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-all shadow-sm flex items-center gap-1 ${infoRequested ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default' : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer'}`}
            >
              {infoRequested ? (
                <>
                  <CheckCircle2 size={13} />
                  <span>Info Requested</span>
                </>
              ) : (
                <>
                  <Mail size={13} />
                  <span>Request Info</span>
                </>
              )}
            </button>
            <button 
              onClick={handleSuspend}
              disabled={caseStatus === "Suspended"}
              className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-all shadow-sm flex items-center gap-1 ${caseStatus === "Suspended" ? 'bg-red-50 border-red-100 text-red-400 cursor-default' : 'border-red-200 text-red-600 bg-white hover:bg-red-50 cursor-pointer'}`}
            >
              <Ban size={13} />
              <span>Suspend</span>
            </button>
            <button 
              onClick={handleClear}
              disabled={caseStatus === "Cleared"}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1 ${caseStatus === "Cleared" ? 'bg-indigo-300 text-white cursor-default' : 'bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer'}`}
            >
              <CheckCircle2 size={13} />
              <span>Clear Case</span>
            </button>
          </div>
        </div>

        {/* INCIDENT + AUDIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <AlertTriangle size={15} className="text-red-550" /> 
                <span>Incident Details</span>
              </h2>
              <span className="text-[10px] text-gray-400 font-bold">
                Detected: Oct 24, 2023 - 14:22 GMT
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Risk Score</div>
                <div className="text-3xl font-black text-red-600 mt-0.5 leading-tight">
                  {caseStatus === "Cleared" ? "12" : "94"}<span className="text-gray-400 text-sm font-normal">/100</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="h-1.5 bg-gray-150 rounded-full overflow-hidden transition-all duration-500">
                  <div className={`h-full rounded-full transition-all duration-500 ${caseStatus === "Cleared" ? "bg-green-500 w-[12%]" : "bg-red-600 w-[94%]"}`} />
                </div>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">
                  {caseStatus === "Cleared" ? "Manual override: marked as safe" : "High confidence automated detection"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-bold text-sm text-slate-800 mb-4">Audit Trail</h2>

            <div className="space-y-4 text-xs font-semibold text-slate-650">
              <div className="flex gap-2">
                <CheckCircle className="text-green-500 mt-0.5" size={14} />
                <div>
                  <p className="font-bold">Auto-Flagged</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">14:22</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Clock className="text-blue-500 mt-0.5" size={14} />
                <div>
                  <p className="font-bold">Case Assigned</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">14:35</p>
                </div>
              </div>
              
              {infoRequested && (
                <div className="flex gap-2">
                  <Mail className="text-slate-500 mt-0.5" size={14} />
                  <div>
                    <p className="font-bold">Information Requested</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Just now</p>
                  </div>
                </div>
              )}
              
              {caseStatus === "Suspended" && (
                <div className="flex gap-2">
                  <Ban className="text-orange-500 mt-0.5" size={14} />
                  <div>
                    <p className="font-bold">Accounts Suspended</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Just now</p>
                  </div>
                </div>
              )}
              
              {caseStatus === "Cleared" && (
                <div className="flex gap-2">
                  <CheckCircle2 className="text-indigo-500 mt-0.5" size={14} />
                  <div>
                    <p className="font-bold">Case Cleared</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Just now</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RELATED ACCOUNTS ================= */}
        <div className="bg-white border border-slate-200 rounded-xl mt-6 p-5 shadow-sm">
          {/* HEADER MATCHED */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Users size={15} /> 
              <span>Related Accounts (Associated Clusters)</span>
            </h2>

            <div className="flex gap-2">
              <span className="text-[10px] bg-slate-100 font-bold px-3 py-0.5 rounded-full text-slate-600">
                12 Nodes Detected
              </span>
              <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-3 py-0.5 rounded-full">
                Common IP Block
              </span>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px] border-collapse">
              <thead className="text-slate-500 border-b border-slate-100 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2">User Account</th>
                  <th>Join Date</th>
                  <th>Referral Count</th>
                  <th>Status</th>
                  <th>Identity Verification</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {relatedAccounts.map((user, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                    <td className="py-3 flex items-center gap-3">
                      <div className={`w-7 h-7 ${user.bg} rounded-full flex items-center justify-center font-bold text-xs`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-[10px] text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="font-semibold">{user.date}</td>
                    <td className="font-bold">{user.count}</td>
                    <td>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${user.status === 'Flagged' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-yellow-50 border-yellow-100 text-yellow-600'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${user.identity === 'Failed' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                        {user.identity}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="text-indigo-700 font-bold hover:text-indigo-900 cursor-pointer text-xs transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= NETWORK TOPOLOGY ================= */}
        <div className="bg-white border border-slate-200 rounded-xl mt-6 p-5 shadow-sm">
          <h2 className="font-bold flex items-center gap-2 mb-2 text-sm text-slate-800">
            <Network size={15} /> 
            <span>Network Topology Visualization</span>
          </h2>
          <p className="text-xs text-gray-550 mb-4 font-semibold">
            Mapping connections between suspicious nodes and referral hubs.
          </p>

          {/* Graph Area */}
          <div 
            onClick={() => setGraphExpanded(!graphExpanded)}
            className={`rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center relative cursor-pointer hover:bg-slate-100/80 transition-all ${graphExpanded ? 'h-80' : 'h-48'}`}
          >
            <div className="absolute w-20 h-20 bg-red-200 rounded-full opacity-60 animate-pulse" />
            <div className={`absolute w-8 h-8 bg-indigo-200 rounded-full transition-all duration-500 ${graphExpanded ? 'top-16 left-32' : 'top-8 left-20'}`} />
            <div className={`absolute w-8 h-8 bg-green-200 rounded-full transition-all duration-500 ${graphExpanded ? 'bottom-16 right-32' : 'bottom-8 right-20'}`} />
            
            {graphExpanded && (
              <>
                <div className="absolute w-6 h-6 bg-yellow-200 rounded-full top-20 right-40" />
                <div className="absolute w-6 h-6 bg-pink-200 rounded-full bottom-20 left-40" />
                <div className="absolute w-4 h-4 bg-purple-200 rounded-full top-10 left-1/2" />
              </>
            )}

            <div className="text-xs text-slate-700 font-bold bg-white border border-slate-250 px-4 py-2 rounded-full shadow-sm z-10">
              {graphExpanded ? "Expanded View: 12 Nodes Visible" : "3 High-Confidence Clusters Detected"}
            </div>
            
            <p className="text-[10px] text-slate-400 font-semibold absolute bottom-4">Click to {graphExpanded ? "collapse" : "expand"} topology graph</p>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-indigo-955 text-lg">Workforce Profile</h2>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-6 text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center font-bold text-2xl shadow-sm border-4 border-slate-50 ${selectedUser.bg}`}>
                {selectedUser.initials}
              </div>
              
              <h3 className="text-xl font-black text-slate-900">{selectedUser.name}</h3>
              <p className="text-xs font-bold text-slate-500 mt-1">
                {selectedUser.email}
              </p>
              
              <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Referrals</p>
                  <p className="text-xl font-black text-indigo-900 mt-1">{selectedUser.count}</p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Status</p>
                  <p className={`text-sm font-black mt-2 ${selectedUser.status === 'Flagged' ? 'text-red-600' : 'text-yellow-600'}`}>{selectedUser.status}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setSelectedUser(null)}
                className="bg-indigo-900 hover:bg-indigo-850 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}