import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Search,
  Bell,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Download,
  Building2,
  ShieldCheck,
} from "lucide-react";

const MOCK_BUSINESSES = [
  {
    id: "1",
    legalName: "Lumina Tech Solutions PVT LTD",
    gstin: "27AAAAA0000A1Z5",
    regDate: "Oct 14, 2021",
    taxpayerType: "Regular",
    constitution: "Private Limited Company",
    aiScore: 98,
    checks: {
      gstinMatch: true,
      logoIntegrity: true,
      dateAlignment: true,
    },
    aiDescription: "System has successfully cross-referenced the GSTIN with the central government portal. Signature and Seal are consistent with regional norms.",
    activityFeed: [
      { id: 'act1', title: 'GSTIN Validation Successful', desc: 'Government database matched successfully.', status: 'success' },
      { id: 'act2', title: 'AI Analysis Completed', desc: 'Document authenticity score generated.', status: 'info' },
      { id: 'act3', title: 'Awaiting Compliance Approval', desc: 'Manual review required before approval.', status: 'warning' }
    ]
  },
  {
    id: "2",
    legalName: "Apex Retailers & Distributors",
    gstin: "27APEXD0987K2Z8",
    regDate: "Jan 08, 2023",
    taxpayerType: "Regular",
    constitution: "Partnership Firm",
    aiScore: 92,
    checks: {
      gstinMatch: true,
      logoIntegrity: false,
      dateAlignment: true,
    },
    aiDescription: "GSTIN is active in government portal, but firm logo mismatch detected on the invoice header. Recommended manual review.",
    activityFeed: [
      { id: 'act1', title: 'GSTIN Found in Registry', desc: 'GSTIN is active and valid.', status: 'success' },
      { id: 'act2', title: 'Logo Mismatch Flagged', desc: 'Invoice logo differs from registered trade name.', status: 'error' },
      { id: 'act3', title: 'Awaiting Compliance Approval', desc: 'Review requested due to warning flags.', status: 'warning' }
    ]
  },
  {
    id: "3",
    legalName: "Vortex Digital Agency",
    gstin: "27VRTXD1234F1Z0",
    regDate: "Mar 19, 2024",
    taxpayerType: "Composition",
    constitution: "Proprietorship",
    aiScore: 45,
    checks: {
      gstinMatch: false,
      logoIntegrity: false,
      dateAlignment: false,
    },
    aiDescription: "GSTIN registration has been suspended or is inactive. Address on the certificate does not match the input registry address.",
    activityFeed: [
      { id: 'act1', title: 'GSTIN Suspended/Inactive', desc: 'Government registry returned inactive status.', status: 'error' },
      { id: 'act2', title: 'Address Mismatch', desc: 'Address verification failed.', status: 'error' },
      { id: 'act3', title: 'Auto-Flagged for Rejection', desc: 'High risk parameters detected.', status: 'error' }
    ]
  }
];

export default function GSTVerification() {
  const { addToast } = useToast();

  const [selectedBusiness, setSelectedBusiness] = useState(MOCK_BUSINESSES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const [statuses, setStatuses] = useState({});
  const [feeds, setFeeds] = useState({});

  const currentStatus = statuses[selectedBusiness.id] || { state: 'pending', reason: '' };
  const currentFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;

  const filteredBusinesses = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_BUSINESSES;
    const query = searchQuery.toLowerCase();
    return MOCK_BUSINESSES.filter(b => 
      b.legalName.toLowerCase().includes(query) ||
      b.gstin.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
    addToast("Zoomed in", "success");
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.7));
    addToast("Zoomed out", "success");
  };

  const handleDownload = () => {
    addToast(`Downloading document for ${selectedBusiness.legalName}...`, "success");
  };

  const handleCopyGSTIN = () => {
    navigator.clipboard.writeText(selectedBusiness.gstin);
    addToast("GSTIN copied to clipboard!", "success");
  };

  const handleApprove = () => {
    setStatuses(prev => ({
      ...prev,
      [selectedBusiness.id]: { state: 'approved', reason: '' }
    }));
    setFeeds(prev => {
      const originalFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;
      if (originalFeed.some(f => f.title === 'GSTIN Validation Approved')) return prev;
      return {
        ...prev,
        [selectedBusiness.id]: [
          { id: 'approved_' + Date.now(), title: 'GSTIN Validation Approved', desc: 'Approved by Compliance Auditor.', status: 'success' },
          ...originalFeed
        ]
      };
    });
    addToast(`Approved GST for ${selectedBusiness.legalName}!`, 'success');
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      addToast('Please enter a rejection reason.', 'error');
      return;
    }
    setStatuses(prev => ({
      ...prev,
      [selectedBusiness.id]: { state: 'rejected', reason: rejectionReason }
    }));
    setFeeds(prev => {
      const originalFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;
      return {
        ...prev,
        [selectedBusiness.id]: [
          { id: 'rejected_' + Date.now(), title: 'GSTIN Validation Rejected', desc: `Reason: ${rejectionReason}`, status: 'error' },
          ...originalFeed
        ]
      };
    });
    addToast(`Rejected GST for ${selectedBusiness.legalName}.`, 'error');
    setRejectionModalOpen(false);
    setRejectionReason('');
  };

  const handleReset = () => {
    setStatuses(prev => ({
      ...prev,
      [selectedBusiness.id]: { state: 'pending', reason: '' }
    }));
    setFeeds(prev => {
      const originalFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;
      return {
        ...prev,
        [selectedBusiness.id]: originalFeed.filter(f => !f.id.startsWith('approved_') && !f.id.startsWith('rejected_'))
      };
    });
    addToast('Status reset to pending.', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-rose-500';
      case 'warning': return 'bg-amber-500';
      case 'info':
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <AdminShell
      activeTab="Compliance"
      searchPlaceholder="Search entity, GSTN, or owner..."
    >
      <div className="min-h-screen bg-[#F5F6FB] flex flex-col relative">

        {/* ================= TOP HEADER ================= */}

        <div className="h-[78px] bg-[#F5F6FB] border-b border-[#D9DCE8] flex items-center justify-between px-8">

          {/* Left Logo */}

          <div className="flex items-center">
            <h1 className="text-[20px] leading-7 font-black text-[#0F172A]">
              Business
              <br />
              Registry
            </h1>
          </div>

          {/* Center Navigation */}

          <div className="flex items-center gap-10">

            {/* Search */}

            <div className="relative">
              <div className="w-[390px] h-[44px] bg-[#EEF1F9] rounded-2xl flex items-center px-4 gap-3">
                <Search size={18} className="text-slate-500" />

                <input
                  type="text"
                  placeholder="Search entity, GSTN, or owner..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="bg-transparent outline-none w-full text-[15px] text-slate-700 placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); setShowDropdown(false); }} 
                    className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                  >
                    ×
                  </button>
                )}
              </div>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  <div className="absolute top-[50px] left-0 w-full bg-white border border-[#D9DCE8] rounded-xl shadow-xl z-20 py-2">
                    {filteredBusinesses.length > 0 ? (
                      filteredBusinesses.map(b => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBusiness(b);
                            setSearchQuery('');
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-[#EEF1F9] transition flex flex-col"
                        >
                          <span className="font-bold text-[#0F172A] text-sm">{b.legalName}</span>
                          <span className="text-xs text-slate-500 tracking-wider mt-0.5">{b.gstin}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-500 italic">No business found</div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Menu */}

            <div className="flex items-center gap-8 text-[16px] font-medium">

              <button className="text-slate-700 hover:text-[#4F46E5]" onClick={() => addToast('Navigating to Directory...', 'info')}>
                Directory
              </button>

              <button className="text-[#312E81] border-b-[3px] border-[#312E81] pb-[14px] font-semibold">
                Compliance
              </button>

              <button className="text-slate-700 hover:text-[#4F46E5]" onClick={() => addToast('Navigating to Risk Management...', 'info')}>
                Risk Management
              </button>

            </div>
          </div>

          {/* Right Actions */}

          <div className="flex items-center gap-6">

            <button onClick={() => addToast('No new notifications.', 'info')}>
              <Bell
                size={22}
                className="text-slate-700"
              />
            </button>

            <button onClick={() => addToast('Opening Workspace grid...', 'info')}>
              <Grid3X3
                size={22}
                className="text-slate-700"
              />
            </button>

            <div 
              onClick={() => addToast('Auditor Profile options.', 'info')}
              className="w-9 h-9 rounded-full bg-[#E4E1FF] flex items-center justify-center text-[#312E81] font-bold cursor-pointer hover:opacity-95"
            >
              AU
            </div>

          </div>

        </div>

        {/* ================= PAGE BODY START ================= */}

        <div className="flex flex-1">
          {/* ================= LEFT PANEL ================= */}

          <div className="flex-1 border-r border-[#D9DCE8] p-10">

            {/* Task Label */}

            <div className="flex items-center gap-3 mb-4">

              <ShieldCheck
                size={20}
                className="text-[#4F46E5]"
              />

              <span className="text-[14px] tracking-[3px] font-bold text-[#312E81] uppercase">
                Task: GST Validation
              </span>

            </div>

            {/* Title + Actions */}

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-[37px] leading-[60px] font-bold text-[#0F172A]">
                Review Document:
                <br />
                Form GST REG-06
              </h2>

              <div className="flex items-center gap-6">

                <button onClick={handleZoomIn} className="hover:text-[#4F46E5] transition-colors">
                  <ZoomIn size={26} />
                </button>

                <button onClick={handleZoomOut} className="hover:text-[#4F46E5] transition-colors">
                  <ZoomOut size={26} />
                </button>

                <button onClick={handleDownload} className="hover:text-[#4F46E5] transition-colors">
                  <Download size={24} />
                </button>

              </div>

            </div>

            {/* Document Preview */}

            <div className="bg-[#0D1525] rounded-2xl overflow-hidden border border-[#1E293B] shadow-xl">

              <div className="relative h-[760px] w-full">

                {/* Background Glow */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#243B55,transparent_70%)] opacity-90" />

                {/* Laptop Mockup */}

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-[88%]">

                    {/* Screen */}

                    <div className="relative bg-black rounded-[28px] p-5 shadow-2xl border-[3px] border-[#0F172A] overflow-hidden">

                      {/* Detection Box Top */}

                      <div className="absolute top-8 left-1/2 -translate-x-1/2 border-4 border-[#6366F1] w-[360px] h-[70px] flex items-center justify-center z-10">

                        <span className="bg-white px-3 py-1 text-[#6366F1] font-bold text-sm tracking-wider">
                          GSTIN DETECTED
                        </span>

                      </div>

                      {/* Fake Document */}

                      <div 
                        className="bg-[#E8EEF8] h-[520px] rounded-lg mt-10 overflow-hidden select-none"
                        style={{
                          transform: `scale(${zoom})`,
                          transformOrigin: 'center center',
                          transition: 'transform 0.15s ease-out'
                        }}
                      >

                        <div className="h-16 bg-[#4A667D] flex items-center justify-center text-white font-bold text-sm tracking-wide">
                          FORM GST REG-06
                        </div>

                        <div className="p-8 space-y-4">

                          <div className="text-center font-bold text-[#1E293B] text-[16px] mb-4">
                            GOVERNMENT OF INDIA
                            <br />
                            <span className="text-[12px] font-normal text-slate-500">Registration Certificate</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-[12px] text-slate-700 bg-white/60 p-4 rounded-xl border border-slate-200">
                            <div>
                              <span className="font-bold block text-slate-500 text-[10px] tracking-wider uppercase">Registration Number</span>
                              <span className="font-mono font-semibold text-slate-800">{selectedBusiness.gstin}</span>
                            </div>
                            <div>
                              <span className="font-bold block text-slate-500 text-[10px] tracking-wider uppercase">Legal Name</span>
                              <span className="font-semibold text-slate-800">{selectedBusiness.legalName}</span>
                            </div>
                            <div>
                              <span className="font-bold block text-slate-500 text-[10px] tracking-wider uppercase">Taxpayer Type</span>
                              <span className="font-semibold text-slate-800">{selectedBusiness.taxpayerType}</span>
                            </div>
                            <div>
                              <span className="font-bold block text-slate-500 text-[10px] tracking-wider uppercase">Constitution</span>
                              <span className="font-semibold text-slate-800">{selectedBusiness.constitution}</span>
                            </div>
                          </div>

                          {/* Legal Name Match */}

                          <div className="mt-8 border-4 border-[#6366F1] h-[70px] flex items-center justify-center bg-white/40">

                            <span className="bg-white px-4 py-1 text-[#6366F1] font-bold tracking-wider">
                              LEGAL NAME MATCH
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* Laptop Base */}

                    <div className="h-6 bg-gradient-to-b from-slate-200 to-slate-500 rounded-b-full shadow-lg" />

                  </div>

                </div>

              </div>

            </div>

          </div>
          {/* ================= RIGHT SIDEBAR ================= */}

          <div className="w-[430px] bg-[#F5F6FB] p-7 space-y-7">

            {/* Business Details Card */}

            <div className="bg-white border border-[#D7DCEA] rounded-2xl p-6">

              <div className="flex gap-5">

                <div className="w-16 h-16 rounded-lg bg-[#07132B] flex items-center justify-center">
                  <Building2
                    size={30}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-[13px] font-bold tracking-[2px] uppercase text-slate-500">
                    Business Legal Name
                  </p>

                  <h3 className="text-[20px] font-bold text-[#0F172A] mt-1 leading-snug">
                    {selectedBusiness.legalName}
                  </h3>
                </div>

              </div>

              {/* GST Number */}

              <div className="mt-8">

                <p className="text-[13px] font-bold tracking-[2px] uppercase text-slate-500 mb-2">
                  GST Number
                </p>

                <div 
                  onClick={handleCopyGSTIN}
                  className="h-[52px] bg-[#EEF1F8] border border-[#DCE1EC] rounded flex items-center justify-between px-4 cursor-pointer hover:bg-[#E2E8F0] transition"
                  title="Click to copy GSTIN"
                >

                  <span className="font-medium tracking-wide text-[#334155]">
                    {selectedBusiness.gstin}
                  </span>

                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>

                </div>

              </div>

              {/* Details Grid */}

              <div className="grid grid-cols-2 gap-y-8 gap-x-6 mt-8">

                <div>
                  <p className="text-[13px] font-bold tracking-[2px] uppercase text-slate-500">
                    Reg. Date
                  </p>

                  <p className="mt-2 text-[18px] font-medium text-[#0F172A]">
                    {selectedBusiness.regDate}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-bold tracking-[2px] uppercase text-slate-500">
                    Taxpayer Type
                  </p>

                  <p className="mt-2 text-[18px] font-medium text-[#0F172A]">
                    {selectedBusiness.taxpayerType}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-[13px] font-bold tracking-[2px] uppercase text-slate-500">
                    Constitution
                  </p>

                  <p className="mt-2 text-[18px] font-medium text-[#0F172A]">
                    {selectedBusiness.constitution}
                  </p>
                </div>

              </div>

            </div>
            {/* ================= AI VERIFICATION CARD ================= */}

            <div className="bg-[#F4F2FF] border border-[#CFCBFF] rounded-2xl p-6 relative overflow-hidden">

              {/* Bot Icon */}

              <div className="absolute top-5 right-5 opacity-20">

                <svg
                  className="w-16 h-16 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 3h6m-3 0v3m-7 4h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2zm3 4h.01M16 16h.01"
                  />
                </svg>

              </div>

              {/* Heading */}

              <div className="flex items-center gap-2 mb-5">

                <span className="text-[#6366F1] text-xl">✦</span>

                <h4 className="text-[14px] font-bold tracking-[2px] uppercase text-[#6366F1]">
                  AI Verification Result
                </h4>

              </div>

              {/* Score */}

              <div className="flex items-end gap-3 mb-6">

                <span className="text-[58px] leading-none font-black text-[#5B5CEB]">
                  {selectedBusiness.aiScore}%
                </span>

                <span className="text-[18px] text-slate-600 mb-2">
                  Confidence
                </span>

              </div>

              {/* Checks */}

              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-[18px] text-slate-700">
                    GSTIN Match
                  </span>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedBusiness.checks.gstinMatch ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                    <span className="text-sm font-bold">
                      {selectedBusiness.checks.gstinMatch ? '✓' : '✗'}
                    </span>
                  </div>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[18px] text-slate-700">
                    Logo Integrity
                  </span>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedBusiness.checks.logoIntegrity ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                    <span className="text-sm font-bold">
                      {selectedBusiness.checks.logoIntegrity ? '✓' : '✗'}
                    </span>
                  </div>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[18px] text-slate-700">
                    Date Alignment
                  </span>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedBusiness.checks.dateAlignment ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                    <span className="text-sm font-bold">
                      {selectedBusiness.checks.dateAlignment ? '✓' : '✗'}
                    </span>
                  </div>

                </div>

              </div>

              {/* Description */}

              <p className="mt-6 text-[15px] italic leading-7 text-slate-600">
                "{selectedBusiness.aiDescription}"
              </p>

            </div>
            {/* ================= ACTIVITY FEED ================= */}

            <div className="bg-white border border-[#D7DCEA] rounded-2xl p-6">

              <h4 className="text-[14px] font-bold tracking-[2px] uppercase text-slate-500 mb-6">
                Activity Feed
              </h4>

              <div className="space-y-6">
                {currentFeed.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${getStatusColor(item.status)}`} />
                    <div>
                      <p className="font-semibold text-slate-800 leading-none">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* ================= BOTTOM ACTION BAR ================= */}

        {currentStatus.state === 'approved' ? (
          <div className="sticky bottom-0 bg-emerald-50 border-t border-emerald-200 px-8 py-5 flex items-center justify-between z-30">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <span className="text-xl">✓</span> GST Verification Approved
            </div>
            <button 
              onClick={handleReset} 
              className="h-12 px-6 rounded-xl border border-emerald-300 text-emerald-700 hover:bg-emerald-100/50 font-semibold transition"
            >
              Reset Decision
            </button>
          </div>
        ) : currentStatus.state === 'rejected' ? (
          <div className="sticky bottom-0 bg-rose-50 border-t border-rose-200 px-8 py-5 flex items-center justify-between z-30">
            <div className="flex items-center gap-2 text-rose-800 font-bold">
              <span className="text-xl">✗</span> Rejected: {currentStatus.reason}
            </div>
            <button 
              onClick={handleReset} 
              className="h-12 px-6 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100/50 font-semibold transition"
            >
              Reset Decision
            </button>
          </div>
        ) : (
          <div className="sticky bottom-0 bg-white border-t border-[#D7DCEA] px-8 py-5 flex items-center justify-end gap-4 z-30">
            <button 
              onClick={() => setRejectionModalOpen(true)}
              className="h-12 px-8 rounded-xl border border-red-300 text-red-600 font-semibold hover:bg-red-50 transition"
            >
              Reject With Reason
            </button>

            <button 
              onClick={handleApprove}
              className="h-12 px-10 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold shadow-lg transition"
            >
              Verify & Approve
            </button>
          </div>
        )}

      </div>

      {/* ================= REJECTION MODAL ================= */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[400px] border border-[#D7DCEA] shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Reject GST Document</h3>
            <textarea
              className="w-full h-24 p-3 border border-[#DCE1EC] rounded-xl outline-none focus:border-[#4F46E5] text-[15px] resize-none"
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => { setRejectionModalOpen(false); setRejectionReason(''); }}
                className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
