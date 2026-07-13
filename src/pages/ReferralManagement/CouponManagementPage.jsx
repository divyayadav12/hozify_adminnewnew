import React, { useState, useRef, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import { Download, Plus, Filter, Play, Check, X, ShieldAlert, Sparkles, Target, Trash2 } from "lucide-react";

import Select from "../../components/ui/Select";

export default function CouponManagementPage() {
  const { addToast } = useToast();

  // 1. Dynamic State for Coupons List
  const [coupons, setCoupons] = useState([
    { code: "SUMMER-REF-2024", status: "ACTIVE", limit: "500", expiry: "Aug 30, 2024", redeemed: 342, progress: "68%" },
    { code: "WELCOME-10-OFF", status: "ACTIVE", limit: "Unlimited", expiry: "No Expiry", redeemed: 1892, progress: null },
    { code: "FLASH-SALES-B2B", status: "EXPIRED", limit: "100", expiry: "Jul 15, 2024", redeemed: 100, progress: "100%" },
    { code: "PARTNER-PERK-A1", status: "SCHEDULED", limit: "50", expiry: "Dec 31, 2024", redeemed: 0, progress: "0%" },
    ...[...Array(12)].map((_, i) => ({
      code: `EXTRA-PROMO-${i + 1}`, status: "ACTIVE", limit: "100", expiry: "Dec 31, 2025", redeemed: 10 * i, progress: `${10 * i}%`
    }))
  ]);

  // 2. States for Modal and Form Inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newExpiry, setNewExpiry] = useState("");

  // 3. States for Bulk Generation
  const [bulkQty, setBulkQty] = useState("");
  const [bulkPrefix, setBulkPrefix] = useState("");
  const [campaignAssociation, setCampaignAssociation] = useState("Summer 2024 Launch");

  // 4. Filters and Pagination
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCoupons = coupons.filter(c => activeFilter === "All" ? true : c.status === activeFilter);
  const totalPages = Math.max(1, Math.ceil(filteredCoupons.length / itemsPerPage));
  const displayedCoupons = filteredCoupons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const headers = ['Coupon Code', 'Status', 'Usage Limit', 'Expiry Date', 'Total Redeemed'];
    const csvContent = [
      headers.join(','),
      ...filteredCoupons.map(item => 
        `"${item.code}","${item.status}","${item.limit}","${item.expiry}","${item.redeemed}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'coupon_metrics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Exported Coupon metrics successfully!", "success");
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCode) return addToast("Please enter a coupon code", "warning");

    const newCoupon = {
      code: newCode.toUpperCase(),
      status: "ACTIVE",
      limit: newLimit || "Unlimited",
      expiry: newExpiry || "No Expiry",
      redeemed: 0,
      progress: "0%"
    };

    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    addToast(`Coupon "${newCoupon.code}" created successfully!`, "success");
    
    setNewCode("");
    setNewLimit("");
    setNewExpiry("");
    setCurrentPage(1);
  };

  const handleBulkGenerate = () => {
    if (!bulkQty) {
      addToast("Please enter a quantity for bulk generation", "warning");
      return;
    }
    const prefix = bulkPrefix.toUpperCase() || "REF-";
    const qty = parseInt(bulkQty, 10);
    if (isNaN(qty) || qty <= 0) {
      addToast("Please enter a valid quantity", "warning");
      return;
    }
    if (qty > 1000) {
       addToast("Cannot generate more than 1000 coupons at once", "warning");
       return;
    }

    const newBulkCoupons = Array.from({length: qty}, () => ({
      code: `${prefix}${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: "ACTIVE",
      limit: "1",
      expiry: "No Expiry",
      redeemed: 0,
      progress: "0%"
    }));

    setCoupons([...newBulkCoupons, ...coupons]);
    addToast(`Successfully generated ${qty} coupons with prefix "${prefix}"!`, "success");
    setBulkQty("");
    setBulkPrefix("");
    setCurrentPage(1);
  };

  const handleDelete = (code) => {
    setCoupons(coupons.filter(c => c.code !== code));
    addToast(`Coupon ${code} deleted successfully.`, "success");
    
    // adjust pagination if we delete the last item on a page
    if (displayedCoupons.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  return (
    <AdminShell activeTab="Referrals">
      <div className="w-full min-h-screen bg-[#f8f9fc] p-4 md:p-6 text-slate-800 antialiased relative">
        
        {/* TOP MAIN HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1a165a]">
              Coupon Management
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Generate, track, and manage referral-linked coupons for active campaigns.
            </p>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <button 
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold bg-white border border-gray-300 rounded text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Download size={16} className="text-gray-500" />
              Export Data
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold bg-emerald-600 text-white rounded shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Add New Coupon
            </button>
          </div>
        </div>

        {/* TOP LAYOUT STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          
          {/* LEFT AREA: TOP KPI CARDS */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => { setActiveFilter("ACTIVE"); setCurrentPage(1); addToast("Filtered by Active Coupons", "success"); }}
              className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Active Coupons</p>
                <h3 className="text-2xl font-black text-[#1a165a] mt-1">{coupons.filter(c => c.status === "ACTIVE").length}</h3>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">● {coupons.filter(c => c.status === "SCHEDULED").length} Scheduled</span>
              </div>
              <div className="bg-indigo-50 p-3 rounded-full text-[#1c0094]">
                <Target size={20} />
              </div>
            </div>

            <div 
              onClick={() => addToast("Card clicked: High Risk Warning alerts log", "warning")}
              className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">High Risk Warning</p>
                <h3 className="text-2xl font-black text-red-600 mt-1">0</h3>
                <span className="text-[10px] text-gray-400 font-bold block mt-1">No anomalies detected</span>
              </div>
              <div className="bg-red-50 p-3 rounded-full text-red-500">
                <ShieldAlert size={20} />
              </div>
            </div>
          </div>

          {/* RIGHT AREA: SIDE STATS CARDS */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            <div 
              onClick={() => addToast("Card clicked: Quota distribution metrics", "success")}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Quota Distribution</p>
                <div className="text-lg font-black text-[#1a165a]">72% Utilized</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Remaining: <span className="font-bold">1,120</span></div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center border-4 border-dashed border-[#1c0094] rounded-full text-xs font-bold text-[#1a165a]">
                72%
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION - TABLE */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-bold text-sm text-gray-800">Coupons Overview</h2>
            
            <div ref={filterRef} className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-gray-500 hover:text-gray-800 cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors flex items-center gap-2 text-xs font-bold bg-gray-50 shadow-sm"
              >
                <Filter size={14} />
                <span>{activeFilter === 'All' ? 'Filter' : activeFilter}</span>
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10">
                  <div className="p-2">
                    {['All', 'ACTIVE', 'EXPIRED', 'SCHEDULED'].map(status => (
                      <button 
                        key={status}
                        onClick={() => { setActiveFilter(status); setCurrentPage(1); setIsFilterOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeFilter === status ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="overflow-x-auto min-h-[300px]">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#fcfdfe] border-b border-gray-200 text-gray-500 font-medium">
                <tr>
                  <th className="p-4">Coupon Code</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Usage Limit</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Total Redeemed</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {displayedCoupons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500 font-semibold">No coupons match your filter criteria.</td>
                  </tr>
                ) : (
                  displayedCoupons.map((row, idx) => (
                    <tr 
                      key={idx}
                      className="hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <td className="p-4 font-bold text-[#1c0094]">{row.code}</td>
                      <td className="p-4">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                          row.status === "ACTIVE" ? "bg-blue-50 text-blue-600" : row.status === "EXPIRED" ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 font-semibold">{row.limit}</td>
                      <td className={`p-4 font-semibold ${row.status === "EXPIRED" ? "text-red-500" : "text-gray-500"}`}>{row.expiry}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 w-36">
                          <span className="font-bold text-gray-800 text-xs">{row.redeemed}</span>
                          {row.progress !== null && (
                            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${row.status === "EXPIRED" ? "bg-red-500" : "bg-[#1c0094]"}`} 
                                style={{ width: row.progress }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleDelete(row.code)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded hover:bg-red-50 cursor-pointer"
                          title="Delete Coupon"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
</div>
          </div>

          {/* TABLE PAGINATION */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-100 text-xs text-gray-500 bg-white rounded-b-lg gap-4">
            <p className="font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCoupons.length)} of {filteredCoupons.length} coupons
            </p>
            <div className="flex items-center gap-1 font-semibold">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 px-2 text-gray-500 hover:bg-gray-100 rounded border border-gray-200 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹ Prev
              </button>
              
              <div className="px-3 py-1 bg-[#1c0094] text-white rounded shadow-sm">
                {currentPage}
              </div>
              <span className="px-1 text-gray-400">/ {totalPages}</span>
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 px-2 text-gray-500 hover:bg-gray-100 rounded border border-gray-200 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM AREA: INPUT GENERATOR */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-6 p-6">
          <h2 className="font-bold text-gray-800 text-sm md:text-base">
            Generate Bulk Coupons
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 mb-5">
            Rapidly create a large set of unique codes tied to specific campaign parameters. Ideal for offline marketing or partner handouts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Quantity to Generate</label>
              <input
                type="number"
                placeholder="e.g. 1000"
                value={bulkQty}
                onChange={(e) => setBulkQty(e.target.value)}
                className="border border-gray-200 rounded p-2 text-xs outline-none bg-gray-50/50 focus:border-[#1c0094]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Code Prefix</label>
              <input
                type="text"
                placeholder="e.g. FALL-"
                value={bulkPrefix}
                onChange={(e) => setBulkPrefix(e.target.value)}
                className="border border-gray-200 rounded p-2 text-xs outline-none bg-gray-50/50 focus:border-[#1c0094]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Campaign Association</label>
              <Select
                value={campaignAssociation}
                onChange={(e) => setCampaignAssociation(e.target.value)}
                className="border border-gray-200 rounded p-2 text-xs bg-white outline-none focus:border-[#1c0094] text-gray-600 font-semibold cursor-pointer"
                options={[{
                  label: "Summer 2024 Launch",
                  value: "Summer 2024 Launch"
                }, {
                  label: "Winter Campaign",
                  value: "Winter Campaign"
                }]} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-6 pt-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 font-semibold">
              <Sparkles size={12} className="inline mr-1 text-emerald-500" />
              Coupons are generated instantly and available immediately.
            </p>
            <button 
              onClick={handleBulkGenerate}
              className="bg-[#1c0094] hover:bg-[#150070] text-white px-5 py-2 rounded text-xs font-semibold transition-all shadow-sm self-end sm:self-auto cursor-pointer flex items-center gap-2"
            >
              Start Bulk Generation
            </button>
          </div>
        </div>

      </div>
      {/* DYNAMIC MODAL FOR "ADD NEW COUPON" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#1a165a]">Create New Coupon</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Coupon Code *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. FESTIVE50" 
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#1c0094]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Usage Limit (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 500 (Leave blank for unlimited)" 
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#1c0094]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Expiry Date (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dec 25, 2026" 
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  className="border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#1c0094]"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow-sm cursor-pointer"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}