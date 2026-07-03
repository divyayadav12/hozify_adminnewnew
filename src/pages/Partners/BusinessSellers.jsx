import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";

import {
  Store,
  Users,
  Building2,
  Wallet,
  BadgeCheck,
  Clock3,
  Download,
  X,
} from "lucide-react";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";
import StatCard from "../../components/ui/StatCard";

const stats = [
  { title: "Business Sellers", value: "2,846", icon: Store, trend: 14, color: "#059669", bgColor: "#ecfdf5" },
  { title: "Verified Sellers", value: "2,512", icon: BadgeCheck, trend: 88, color: "#2563eb", bgColor: "#eff6ff" },
  { title: "Pending Personal KYC", value: "84", icon: Clock3, trendLabel: "Review", color: "#f97316", bgColor: "#fff7ed" },
  { title: "Active Branches", value: "864", icon: Building2, trendLabel: "Live", color: "#4f46e5", bgColor: "#eef2ff" },
  { title: "Employees", value: "5,428", icon: Users, trend: 9, color: "#7c3aed", bgColor: "#f5f3ff" },
  { title: "Wallet Balance", value: "₹11.82Cr", icon: Wallet, trendLabel: "Secure", color: "#16a34a", bgColor: "#f0fdf4" },
];

const initialSellers = [
  { id: "BS-1001", business: "Apex Industrial Solutions", owner: "Rahul Sharma", personalKyc: "Verified", businessKyc: "Verified", branches: 12, employees: 84, status: "Active" },
  { id: "BS-1002", business: "Urban Build Supplies", owner: "Amit Verma", personalKyc: "Pending", businessKyc: "Verified", branches: 8, employees: 52, status: "Pending" },
  { id: "BS-1003", business: "Prime Home Essentials", owner: "Rakesh Singh", personalKyc: "Verified", businessKyc: "Pending", branches: 5, employees: 31, status: "Review" },
];

export default function BusinessSellers() {
  const [filter, setFilter] = useState("All");
  const [activeModal, setActiveModal] = useState(null); // Pop-up handling state
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleExport = (format) => {
    setIsExportOpen(false);
    alert(`${format} export for business sellers is starting...`);
  };

  // Dynamic Filtering for Table
  const filteredSellers = initialSellers.filter((seller) => {
    if (filter === "All") return true;
    return seller.status === filter || seller.personalKyc === filter || seller.businessKyc === filter;
  });

  return (
    <AdminShell activeTab="Partners" searchPlaceholder="Search business sellers...">
      <div className="space-y-6 max-w-[1600px] mx-auto p-4">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold tracking-wider text-indigo-700">
                BUSINESS SELLER
              </span>
              <h1 className="mt-3 text-2xl font-bold text-slate-900">Business Seller Operations</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Manage business sellers, KYC verification, branches, and wallet monitoring from a centralized platform.
              </p>
            </div>
            
            <div className="flex gap-3 self-end md:self-center">
              <PartnerExportButton onClick={() => setIsExportOpen(true)} label="Export Report" />
            </div>
          </div>
        </div>

        <PartnerExportModal
          open={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          title="Export Business Seller Report"
          description="Choose the file format to download the current business seller directory and status data."
          helper="Includes KYC status, branch counts, employee numbers, and wallet summaries."
          onExport={handleExport}
          confirmLabel="Generate Export"
        />

        {/* KPI Cards - Auto fit content */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              trend={item.trend}
              trendLabel={item.trendLabel}
              color={item.color}
              bgColor={item.bgColor}
              iconColor={item.color}
            />
          ))}
        </div>

        {/* Directory Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm h-fit">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 p-5 gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Business Seller Directory</h2>
              <p className="text-xs text-slate-500">Manage records and live status updates.</p>
            </div>
            <div className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
              Total: {filteredSellers.length} Sellers Shown
            </div>
          </div>

          {/* Real-time Filter Buttons */}
          <div className="flex items-center border-b border-slate-100 px-5 py-3 bg-slate-50/50">
            <div className="flex gap-1.5 rounded-xl bg-slate-200/60 p-1 text-xs font-medium">
              {["All", "Active", "Pending", "Review"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-4 py-1.5 transition ${
                    filter === tab ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Table */}
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">BUSINESS</th>
                  <th className="px-4 py-3">OWNER</th>
                  <th className="px-4 py-3">PERSONAL KYC</th>
                  <th className="px-4 py-3">BUSINESS KYC</th>
                  <th className="px-4 py-3 text-center">BRANCHES</th>
                  <th className="px-4 py-3 text-center">EMPLOYEES</th>
                  <th className="px-5 py-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                          {seller.business.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 line-clamp-1">{seller.business}</h4>
                          <p className="text-xs text-slate-400">{seller.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{seller.owner}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        seller.personalKyc === "Verified" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                      }`}>{seller.personalKyc}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        seller.businessKyc === "Verified" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
                      }`}>{seller.businessKyc}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-slate-700">{seller.branches}</td>
                    <td className="px-4 py-3 text-center font-medium text-slate-700">{seller.employees}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        seller.status === "Active" ? "bg-emerald-100 text-emerald-800" :
                        seller.status === "Pending" ? "bg-orange-100 text-orange-800" : "bg-violet-100 text-violet-800"
                      }`}>{seller.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout for operations - Highly Compacted */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Service & Verification Cards Combined info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 h-fit">
            <h3 className="text-base font-bold text-slate-900">Verification Checklists</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                <p className="font-semibold text-slate-500 mb-1">PERSONAL KYC</p>
                <div className="flex justify-between"><span>Identity Document</span><span className="text-emerald-600 font-medium">Verified</span></div>
                <div className="flex justify-between"><span>PAN Card</span><span className="text-emerald-600 font-medium">Verified</span></div>
                <div className="flex justify-between"><span>Address Details</span><span className="text-orange-600 font-medium">Pending</span></div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                <p className="font-semibold text-slate-500 mb-1">BUSINESS REGISTRY</p>
                <div className="flex justify-between"><span>GST Filing</span><span className="text-blue-600 font-medium">Approved</span></div>
                <div className="flex justify-between"><span>Business PAN</span><span className="text-blue-600 font-medium">Approved</span></div>
                <div className="flex justify-between"><span>Trade License</span><span className="text-orange-600 font-medium">Pending</span></div>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 h-fit">
            <h3 className="text-base font-bold text-slate-900">Quick Operations</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {[
                "Add Business Seller",
                "Approve Pending KYC",
                "Manage Branches",
                "Wallet Audit Logs"
              ].map((action) => (
                <button
                  key={action}
                  onClick={() => setActiveModal(action)}
                  className="p-3 text-left rounded-xl border border-slate-100 bg-slate-50 font-semibold text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/50 transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Pop-up Modal Wrapper */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100 mx-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">{activeModal}</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="mt-4 text-sm text-slate-600">
              <p>Are you sure you want to trigger the action for <strong>{activeModal}</strong>?</p>
              <div className="mt-3 bg-indigo-50 p-3 rounded-xl text-xs text-indigo-700 font-medium">
                ⚡ Fetching real-time system queues... Ready to process request.
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 text-sm font-medium">
              <button 
                onClick={() => setActiveModal(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`${activeModal} Successful!`);
                  setActiveModal(null);
                }}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}