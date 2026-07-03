import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { usersMockData } from "./usersMockData";
import { useApp } from "../../hooks/useApp";
import { ROUTES } from "../../config/routes";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  Users,
  CheckCircle,
  DollarSign,
  Gift,
  Filter,
  Download,
  TrendingUp,
  X,
} from "lucide-react";
import UserSubTabs from "../../components/users/UserSubTabs";

export default function UserReferralsPage() {
  const { navigate } = useApp();
  const { addToast } = useToast();

  const user = usersMockData[0];

  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedReferredUser, setSelectedReferredUser] = useState(null);

  const allReferrals = user.referrals.referredUsers.map((name, index) => {
    const statuses = ["Successful", "Pending", "Failed"];
    return {
      name,
      email: `user${index + 1}@example.com`,
      joined: "2026-05-10",
      reward: "₹150",
      status: statuses[index % statuses.length],
    };
  });

  const filteredReferrals = allReferrals.filter(
    (item) => filterStatus === "All" || item.status === filterStatus
  );

  const handleExportReport = () => {
    const csvContent = generateCSV(['Name', 'Email', 'Joined', 'Reward', 'Status'], filteredReferrals);
    triggerDownload(csvContent, `${user.name.toLowerCase().replace(/ /g, '_')}_referrals_export.csv`, 'text/csv');
    addToast(`Referrals ledger for ${user.name} exported successfully!`, "success");
  };

  const handleViewProfile = (referredUser) => {
    setSelectedReferredUser(referredUser);
  };

  const handleActivateBonus = () => {
    addToast(`Referral bonus boost campaign successfully enabled for ${user.name}!`, "success");
  };

  return (
    <AdminShell
      activeTab="User Management"
      searchPlaceholder="Search referrals or users..."
    >
      <div style={{ paddingBottom: "40px" }} className="space-y-6">
        
        {/* Header & Breadcrumbs */}
        <div style={{ marginBottom: "24px" }}>
          <h1 className="page-title">Referral Ledger</h1>
          <div style={{ fontSize: "13px", color: "var(--muted)" }}>
            User & Partner Admin / User Management / <span style={{ color: "#696CFF" }}>Referrals</span>
          </div>
        </div>

        {/* PROFILE SUB-TABS */}
        <UserSubTabs />

        <div className="grid grid-cols-12 gap-8">
          {/* Profile Card */}
          <div className="col-span-4 bg-white border rounded-xl p-6 hover:shadow-md transition">
            <div className="flex gap-5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-slate-500 mt-1" style={{ fontSize: "13px" }}>
                  {user.membershipType} • Joined {user.registrationDate}
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                    Referral Hero
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    Top 1%
                  </span>
                </div>
                <div className="mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-span-8 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4" style={{ width: "100%" }}>
              <div className="bg-white border rounded-xl p-4 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Total users referred: 9", "success")}>
                <Users size={20} className="text-indigo-600 mb-2" />
                <p className="text-xs text-slate-500">Referrals</p>
                <h3 className="text-2xl font-bold">{user.referrals.totalReferrals}</h3>
              </div>
              <div className="bg-white border rounded-xl p-4 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Successful referrals: 9", "success")}>
                <CheckCircle size={20} className="text-green-600 mb-2" />
                <p className="text-xs text-slate-500">Successful</p>
                <h3 className="text-2xl font-bold">{user.referrals.totalReferrals}</h3>
              </div>
              <div className="bg-white border rounded-xl p-4 hover:shadow-md transition cursor-pointer" onClick={() => addToast(`Customer Referral Code: ${user.referrals.referralCode}`, "success")}>
                <Gift size={20} className="text-orange-500 mb-2" />
                <p className="text-xs text-slate-500">Code</p>
                <h3 className="text-sm font-black text-indigo-950 mt-1">{user.referrals.referralCode}</h3>
              </div>
              <div className="bg-white border rounded-xl p-4 hover:shadow-md transition cursor-pointer" onClick={() => addToast(`Total earned from referrals: ₹${user.referrals.earnedAmount}`, "success")}>
                <DollarSign size={20} className="text-purple-600 mb-2" />
                <p className="text-xs text-slate-500">Earnings</p>
                <h3 className="text-2xl font-bold">₹{user.referrals.earnedAmount}</h3>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 hover:shadow-md transition cursor-pointer" onClick={() => addToast("Referrals performance growth: 22%", "success")}>
                <TrendingUp size={20} />
                <p className="text-xs opacity-90 mt-1">Growth Rate</p>
                <h3 className="text-2xl font-bold">+22%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        {/* Referral History Table */}
        <div className="bg-white border rounded-xl overflow-hidden mt-6">
          <div className="p-5 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Referral History</h3>
              <p className="text-xs text-slate-500">Showing all users referred by {user.name}</p>
            </div>
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
                <option value="Successful">Successful</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <button onClick={handleExportReport} className="secondary-action-btn">
                <Download size={16} /> Export Report
              </button>
            </div>
          </div>

          <table className="w-full" style={{ borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr className="custom-table-header">
                <th className="p-4" style={{ color: "#fff", fontWeight: "700" }}>User</th>
                <th style={{ color: "#fff", fontWeight: "700" }}>Date Joined</th>
                <th style={{ color: "#fff", fontWeight: "700" }}>Reward</th>
                <th style={{ color: "#fff", fontWeight: "700" }}>Status</th>
                <th style={{ color: "#fff", fontWeight: "700" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.map((item, index) => (
                <tr key={index} className="border-t hover:bg-slate-50" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.email}</p>
                    </div>
                  </td>
                  <td>{item.joined}</td>
                  <td style={{ fontWeight: "700", color: "#2A2454" }}>{item.reward}</td>
                  <td>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.status === "Successful" ? "bg-green-100 text-green-700" :
                      item.status === "Pending" ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleViewProfile(item)} style={{ border: "none", background: "none", color: "#696CFF", fontWeight: "800", cursor: "pointer" }}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Boost Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border rounded-xl p-6 flex justify-between items-center mt-6">
          <div>
            <h3 className="text-lg font-bold text-amber-950">Boost {user.name}'s Referrals 🚀</h3>
            <p className="text-slate-600 text-sm mt-1">Enable a limited-time bonus campaign for this user's profile.</p>
          </div>
          <button onClick={handleActivateBonus} className="primary-action-btn" style={{ background: "#d97706", boxShadow: "none" }}>
            Activate Bonus
          </button>
        </div>

      </div>

      {/* REFERRED USER PROFILE MODAL */}
      {selectedReferredUser && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => setSelectedReferredUser(null)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 text-center overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedReferredUser(null)}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer absolute right-4 top-4"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Avatar Circle with initials */}
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xl mb-4 border border-indigo-100 shadow-sm">
              {selectedReferredUser.name.split(" ").map(n => n[0]).join("")}
            </div>

            <h3 className="text-lg font-black text-slate-900 leading-tight">{selectedReferredUser.name}</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">{selectedReferredUser.email}</p>

            <div className="mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedReferredUser.status === "Successful" ? "bg-green-50 text-green-700" :
                selectedReferredUser.status === "Pending" ? "bg-amber-50 text-amber-700" :
                "bg-rose-50 text-rose-700"
              }`}>
                {selectedReferredUser.status} Member
              </span>
            </div>

            <div className="mt-6 space-y-3.5 text-xs text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Date Joined:</span>
                <span className="font-black text-slate-800">{selectedReferredUser.joined}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Referred By:</span>
                <span className="font-black text-slate-800">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Reward Assigned:</span>
                <span className="font-black text-indigo-950 font-bold">{selectedReferredUser.reward}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Account Type:</span>
                <span className="font-black text-slate-800">Customer Referral</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex gap-2 pt-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedReferredUser(null);
                  addToast(`Account details for ${selectedReferredUser.name} verified in ledger.`, "success");
                }}
                className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform"
              >
                Verify Advocate
              </button>
              <button
                type="button"
                onClick={() => setSelectedReferredUser(null)}
                className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
