import React, { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import { Filter, Plus, Download, Trash2, X } from "lucide-react";

export default function QRManagementPage() {
  const { addToast } = useToast();

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer 2024 Campaign",
      status: "Active",
      uniqueScans: 9420,
      totalScans: 12482,
      conv: "4.2%",
      url: "https://hozify.com/referral/summer2024",
      bgColor: "bg-[#192231]",
      qrColor: "#192231",
    },
    {
      id: 2,
      name: "VIP Partner QR",
      status: "Active",
      uniqueScans: 5210,
      totalScans: 8204,
      conv: "6.8%",
      url: "https://hozify.com/referral/vippartner",
      bgColor: "bg-[#0b2434]",
      qrColor: "#0b2434",
    },
    {
      id: 3,
      name: "Holiday Blitz",
      status: "Paused",
      uniqueScans: 12400,
      totalScans: 42100,
      conv: "3.1%",
      url: "https://hozify.com/referral/holidayblitz",
      bgColor: "bg-[#062e24]",
      qrColor: "#062e24",
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignUrl, setNewCampaignUrl] = useState("");

  // Filters State
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const filteredCampaigns = campaigns.filter(c => activeFilter === "All" ? true : c.status === activeFilter);
  const activeCampaignsCount = campaigns.filter(c => c.status === "Active").length;
  
  // Handlers
  const handleGenerateQR = (e) => {
    e.preventDefault();
    if (!newCampaignName || !newCampaignUrl) {
      return addToast("Please fill all required fields", "warning");
    }

    const colors = [
      { bg: "bg-[#4f46e5]", qr: "#4f46e5" },
      { bg: "bg-[#059669]", qr: "#059669" },
      { bg: "bg-[#db2777]", qr: "#db2777" },
      { bg: "bg-[#d97706]", qr: "#d97706" },
      { bg: "bg-[#7e22ce]", qr: "#7e22ce" }
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCampaign = {
      id: Date.now(),
      name: newCampaignName,
      status: "Active",
      uniqueScans: 0,
      totalScans: 0,
      conv: "0.0%",
      url: newCampaignUrl,
      bgColor: randomColor.bg,
      qrColor: randomColor.qr,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsModalOpen(false);
    setNewCampaignName("");
    setNewCampaignUrl("");
    addToast(`QR Code for "${newCampaignName}" generated successfully!`, "success");
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    addToast("Campaign deleted successfully", "success");
  };

  const handleExportCSV = () => {
    const headers = ['Campaign Name', 'Unique Scans', 'Total Scans', 'CTR', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredCampaigns.map(item => 
        `"${item.name}","${item.uniqueScans}","${item.totalScans}","${item.conv}","${item.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'qr_campaign_metrics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Exported detailed QR codes analytics report!", "success");
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <AdminShell activeTab="Referrals">
      <div className="w-full min-h-screen bg-[#f8fafd] p-6 text-slate-800 antialiased relative">
        
        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-black text-[#1a165a]">QR Management</h1>
            <p className="text-xs text-gray-505 mt-0.5">
              Track, manage, and download campaign-specific referral QR codes.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div ref={filterRef} className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border border-gray-250 bg-white rounded text-slate-650 hover:bg-gray-50 shadow-sm transition-all cursor-pointer"
              >
                <Filter size={14} className="text-gray-400" />
                <span>{activeFilter === "All" ? "Filter" : activeFilter}</span>
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-20">
                  <div className="p-2">
                    {['All', 'Active', 'Paused'].map(status => (
                      <button 
                        key={status}
                        onClick={() => { setActiveFilter(status); setIsFilterOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeFilter === status ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold bg-[#1a0dab] hover:bg-[#130985] text-white rounded shadow-sm transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Generate New QR</span>
            </button>
          </div>
        </div>

        {/* METRICS TOP 3-CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div 
            onClick={() => { setActiveFilter("All"); addToast("Filtered to show all scans", "success"); }}
            className="p-3 min-h-[80px] bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">Total QR Scans</span>
              <h2 className="text-lg font-black text-slate-900 mt-1">{formatNumber(campaigns.reduce((sum, c) => sum + c.totalScans, 0))}</h2>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[9px] font-bold text-emerald-500">
              <span>↗ +12.4%</span>
              <span className="text-gray-400 font-semibold text-[8px] uppercase tracking-normal">from last month</span>
            </div>
          </div>

          <div 
            onClick={() => addToast("Card clicked: QR-to-Referral conversion details", "success")}
            className="p-3 min-h-[80px] bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">Avg QR-to-Referral Conversion</span>
              <h2 className="text-lg font-black text-slate-900 mt-1">4.7%</h2>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <span className="text-[9px] text-slate-400 font-semibold">CSAT Benchmark: 4%</span>
              <div className="w-12 h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-700 w-2/3 rounded-full"></div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => { setActiveFilter("Active"); addToast("Filtered to Active QR Codes", "success"); }}
            className="p-3 min-h-[80px] bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">Active QR Codes</span>
              <h2 className="text-lg font-black text-slate-900 mt-1">{activeCampaignsCount}</h2>
            </div>
            <div className="flex items-center mt-2 -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-[#1c0094] border border-white text-[8px] font-black text-white flex items-center justify-center">A</div>
              <div className="w-5 h-5 rounded-full bg-slate-800 border border-white text-[8px] font-black text-white flex items-center justify-center">W</div>
              <div className="w-5 h-5 rounded-full bg-indigo-900 border border-white text-[8px] font-black text-white flex items-center justify-center">E</div>
              <div className="w-5 h-5 rounded-full bg-gray-100 border border-white text-[8px] font-black text-gray-500 flex items-center justify-center">+{activeCampaignsCount > 3 ? activeCampaignsCount - 3 : 0}</div>
            </div>
          </div>
        </div>

        {/* ACTIVE QR CODES GALLERY */}
        <div className="mb-8 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#58647a]">{activeFilter === "All" ? "All" : activeFilter} QR Codes Gallery</h3>
            <button 
              onClick={() => { setActiveFilter("All"); addToast("Showing all QR codes", "success"); }}
              className="text-xs font-bold text-[#1a0dab] hover:text-[#130985] cursor-pointer flex items-center gap-1 transition-all"
            >
              <span>View All</span>
              <span>➔</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                onClick={() => addToast(`Opening detailed view for ${campaign.name}`, "success")}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all group"
              >
                <div className={`${campaign.bgColor} p-6 flex justify-center items-center aspect-[4/3] relative`}>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToast(`Downloading QR for ${campaign.name}...`, "success"); }}
                      className="w-7 h-7 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      title="Download QR"
                    >
                      <Download size={12} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(campaign.id); }}
                      className="w-7 h-7 bg-red-500/20 hover:bg-red-500/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      title="Delete Campaign"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  
                  <div className="bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
                    <QRCodeSVG 
                      value={campaign.url} 
                      size={64} 
                      fgColor={campaign.qrColor}
                      bgColor="#ffffff"
                      level="H"
                    />
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex justify-between items-center gap-1">
                    <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate" title={campaign.name}>{campaign.name}</h4>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                      campaign.status === "Active" ? "bg-[#ecfdf5] text-[#10b981]" : "bg-slate-100 text-slate-500"
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">
                    SCANS: {formatNumber(campaign.totalScans)} • CONV: {campaign.conv}
                  </p>
                </div>
              </div>
            ))}

            {/* Box 4: Generate New Card */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-xl flex flex-col items-center justify-center p-6 text-center bg-white/50 cursor-pointer transition-all aspect-[4/3]"
            >
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-2">
                <Plus size={16} />
              </div>
              <h4 className="text-xs font-bold text-slate-800">Generate New Code</h4>
              <p className="text-[10px] text-gray-400 mt-1 max-w-[140px] leading-snug">Create a custom tracking QR for your next campaign</p>
            </div>
          </div>
        </div>

        {/* DETAILED DATA TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Detailed QR Metrics</h3>
            <button 
              onClick={handleExportCSV}
              className="text-xs font-bold text-indigo-705 hover:text-indigo-900 flex items-center gap-1.5 cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>

          <div className="overflow-x-auto min-h-[200px]">
            <div className="table-responsive-wrapper">
<table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#f5f7fc] text-gray-400 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200">
                  <th className="p-4 pl-6">Campaign Name</th>
                  <th className="p-4">Unique Scans</th>
                  <th className="p-4">Total Scans</th>
                  <th className="p-4">CTR</th>
                  <th className="p-4 text-center pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-slate-705 font-medium">
                {filteredCampaigns.length === 0 ? (
                   <tr>
                     <td colSpan="5" className="p-8 text-center text-gray-500 font-semibold">No campaigns match your filter criteria.</td>
                   </tr>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <tr 
                      key={campaign.id}
                      onClick={() => addToast(`Opening QR scan statistics for ${campaign.name}`, "success")}
                      className="hover:bg-slate-50/50 transition-all cursor-pointer"
                    >
                      <td className="p-4 pl-6 flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-indigo-50 text-[#1a0dab] flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01" />
                          </svg>
                        </div>
                        <span className="font-bold text-slate-800">{campaign.name}</span>
                        {campaign.status === "Paused" && (
                          <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase ml-2">Paused</span>
                        )}
                      </td>
                      <td className="p-4 text-gray-500 font-semibold">{campaign.uniqueScans.toLocaleString()}</td>
                      <td className="p-4 text-gray-500 font-semibold">{campaign.totalScans.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-650 px-2 py-0.5 rounded font-bold text-[10px]">{campaign.conv}</span>
                      </td>
                      <td className="p-4 text-center pr-6 font-bold text-gray-400 hover:text-gray-650" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleDelete(campaign.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded hover:bg-red-50 cursor-pointer"
                          title="Delete Campaign"
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
        </div>

      </div>

      {/* GENERATE NEW QR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-base font-black text-[#1a165a]">Generate New QR Code</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGenerateQR} className="p-6 space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Campaign Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Winter Sale 2024" 
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  className="border border-gray-200 rounded-lg p-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Target URL *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://hozify.com/referral/..." 
                  value={newCampaignUrl}
                  onChange={(e) => setNewCampaignUrl(e.target.value)}
                  className="border border-gray-200 rounded-lg p-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <p className="text-[9px] font-bold text-gray-400">The destination URL your QR code will point to.</p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 mt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#1a0dab] text-white rounded-lg hover:bg-[#130985] shadow-sm cursor-pointer transition-colors"
                >
                  Generate QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}