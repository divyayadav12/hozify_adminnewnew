import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  Expand,
  CheckCircle2,
  AlertCircle,
  Circle,
  PlusCircle,
  Pencil,
  ChevronDown,
  X,
  Clock
} from "lucide-react";

const RECORDS = [
  {
    id: "REG-2024-8842",
    name: "Vanguard Logistics Solutions Ltd.",
    licenseNo: "TL-9920-X1",
    establishDate: "14 May 2018",
    address: "Unit 402, Enterprise Heights, Financial District, South Sector, Metro City, 441022",
    legalStatus: "Limited Liability Company",
    issueDate: "01 Jan 2024",
    expiryDate: "31 Dec 2024",
    expiryColor: "#D7191C",
    progress: 65,
    verified: 11,
    total: 17,
    queueTime: "4h 12m",
    activities: [
      "International Freight Forwarding & Logistics",
      "Warehousing and Inventory Management",
      "Customs Brokerage Services",
    ],
    checklistStatus: {
      entityName: "verified",
      licenseValidity: "urgent",
      addressAudit: "pending",
      uboReview: "verified",
    },
  },
  {
    id: "REG-2024-9013",
    name: "Apex Retail Partners Inc.",
    licenseNo: "TL-5521-B2",
    establishDate: "03 Mar 2020",
    address: "Block C, Regal Trade Tower, Business Hub, East Sector, Commerce City, 110011",
    legalStatus: "Private Limited Corporation",
    issueDate: "15 Mar 2024",
    expiryDate: "15 Mar 2027",
    expiryColor: "#16a34a",
    progress: 90,
    verified: 15,
    total: 17,
    queueTime: "1h 45m",
    activities: [
      "Wholesale Trade & Distribution",
      "Retail Chain Management",
      "Import/Export Consultancy",
    ],
    checklistStatus: {
      entityName: "verified",
      licenseValidity: "verified",
      addressAudit: "pending",
      uboReview: "verified",
    },
  },
  {
    id: "REG-2024-7701",
    name: "BioStream Labs Pvt. Ltd.",
    licenseNo: "TL-3310-C5",
    establishDate: "20 Jul 2016",
    address: "Lab Complex 7A, Pharma Zone, North Science Park, Research City, 560001",
    legalStatus: "Private Limited Company",
    issueDate: "01 Jan 2024",
    expiryDate: "31 Oct 2024",
    expiryColor: "#f59e0b",
    progress: 42,
    verified: 7,
    total: 17,
    queueTime: "7h 30m",
    activities: [
      "Pharmaceutical Research & Development",
      "Clinical Trial Management",
      "Biotech Supply Chain",
    ],
    checklistStatus: {
      entityName: "verified",
      licenseValidity: "urgent",
      addressAudit: "pending",
      uboReview: "urgent",
    },
  },
];

const STATUS_ICONS = {
  verified: <CheckCircle2 size={28} className="mt-1 text-[#10B981]" />,
  urgent: <AlertCircle size={28} className="mt-1 text-[#DC2626]" />,
  pending: <Circle size={24} className="mt-1 fill-[#111827] text-[#111827]" />,
};

export default function RegistrationVerification() {
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(RECORDS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [checklistStatus, setChecklistStatus] = useState(selectedRecord.checklistStatus);
  const [progress, setProgress] = useState(selectedRecord.progress);
  const [verifiedCount, setVerifiedCount] = useState(selectedRecord.verified);
  const [overallStatus, setOverallStatus] = useState("pending"); // pending / approved / rejected
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [timeline, setTimeline] = useState([
    { label: "Queue Assignment", time: "Today • 09:10 AM", done: true },
    { label: "Entity Name Check", time: "Today • 09:30 AM", done: true },
  ]);

  const switchRecord = (rec) => {
    setSelectedRecord(rec);
    setChecklistStatus(rec.checklistStatus);
    setProgress(rec.progress);
    setVerifiedCount(rec.verified);
    setScale(1);
    setRotation(0);
    setOverallStatus("pending");
    setDropdownOpen(false);
    addToast(`Switched to record: ${rec.id}`, "info");
  };

  const handleChecklistAction = (key, action) => {
    const newStatus = { ...checklistStatus, [key]: action };
    setChecklistStatus(newStatus);

    const verifiedItems = Object.values(newStatus).filter((s) => s === "verified").length;
    const total = selectedRecord.total;
    const base = total - 4;
    const newVerified = base + verifiedItems;
    setVerifiedCount(newVerified);
    setProgress(Math.round((newVerified / total) * 100));

    const msg = action === "verified" ? "✓ Item marked as Verified!" : action === "urgent" ? "⚠ Item flagged as Invalid." : "Item marked for review.";
    addToast(msg, action === "verified" ? "success" : "error");

    setTimeline((prev) => [
      { label: `${key.replace(/([A-Z])/g, " $1")} → ${action}`, time: "Just now", done: action === "verified" },
      ...prev,
    ]);
  };

  const handleApprove = () => {
    if (overallStatus === "approved") return;
    setOverallStatus("approved");
    setProgress(100);
    setVerifiedCount(selectedRecord.total);
    setChecklistStatus({ entityName: "verified", licenseValidity: "verified", addressAudit: "verified", uboReview: "verified" });
    setTimeline((prev) => [{ label: "Registration Approved", time: "Just now", done: true }, ...prev]);
    addToast(`Registration ${selectedRecord.id} approved successfully!`, "success");
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) { addToast("Please enter a rejection reason.", "error"); return; }
    setOverallStatus("rejected");
    setRejectModalOpen(false);
    setTimeline((prev) => [{ label: `Rejected: "${rejectReason}"`, time: "Just now", done: false }, ...prev]);
    addToast(`Registration ${selectedRecord.id} rejected.`, "error");
    setRejectReason("");
  };

  const handleFlag = () => {
    setTimeline((prev) => [{ label: `Flagged for senior review`, time: "Just now", done: false }, ...prev]);
    addToast(`${selectedRecord.id} flagged for senior reviewer.`, "info");
  };

  const handleAddCustomItem = () => {
    const label = prompt("Enter checklist item name:");
    if (label && label.trim()) {
      setCustomItems((prev) => [...prev, { label: label.trim(), status: "pending" }]);
      addToast("Custom checklist item added.", "success");
    }
  };

  return (
    <AdminShell activeTab="Registration Verification">
      {rejectModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "28px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Reject Registration</h2>
              <button onClick={() => setRejectModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "12px" }}>Provide the reason for rejecting registration <strong>{selectedRecord.id}</strong>.</p>
            <textarea
              style={{ width: "100%", height: "100px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px", fontSize: "13px", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              placeholder="e.g. Trade license is expired and renewal application not submitted..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
              <button onClick={() => setRejectModalOpen(false)} style={{ padding: "8px 16px", border: "1px solid #D1D5DB", borderRadius: "6px", background: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleRejectSubmit} style={{ padding: "8px 20px", border: "none", borderRadius: "6px", background: "#D7191C", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#F3F4F6] p-8">

        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-2 text-sm text-[#6B7280]">
          <span>KYC</span><span>›</span><span>Verification Queue</span><span>›</span>
          <span className="font-semibold text-[#111827]">{selectedRecord.id}</span>
        </div>

        {/* Header + record switcher */}
        <div className="mb-7 flex justify-end gap-4">
          <div className="heading mr-auto">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h1 className="mb-0.5 text-[22px] font-bold text-[#1F2937]">{selectedRecord.name}</h1>
              {overallStatus !== "pending" && (
                <span style={{
                  fontSize: "11px", fontWeight: "800", padding: "3px 10px", borderRadius: "4px",
                  background: overallStatus === "approved" ? "#d1fae5" : "#fee2e2",
                  color: overallStatus === "approved" ? "#065f46" : "#991b1b"
                }}>
                  {overallStatus === "approved" ? "✓ APPROVED" : "✗ REJECTED"}
                </span>
              )}
            </div>
          </div>

          {/* Record selector dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ height: "48px", display: "flex", alignItems: "center", gap: "8px", padding: "0 16px", border: "1px solid #CFCFCF", background: "#fff", borderRadius: "6px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
              type="button"
            >
              Switch Record <ChevronDown size={14} />
            </button>
            {dropdownOpen && (
              <div style={{ position: "absolute", top: "52px", right: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, minWidth: "280px" }}>
                {RECORDS.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => switchRecord(rec)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      border: "none",
                      background: rec.id === selectedRecord.id ? "#f1f5f9" : "#fff",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f5f9",
                      fontSize: "13px"
                    }}
                    type="button"
                  >
                    <strong style={{ display: "block", fontSize: "12px" }}>{rec.id}</strong>
                    <span style={{ color: "#6B7280", fontSize: "11px" }}>{rec.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="h-12 rounded-md border border-[#CFCFCF] bg-white px-8 text-[16px] font-medium" onClick={handleFlag} type="button">Flag for Review</button>
          <button className="h-12 rounded-md bg-[#D7191C] px-8 text-white text-[16px] font-medium" onClick={() => setRejectModalOpen(true)} type="button">Reject Application</button>
          <button
            className="h-12 rounded-md bg-[#2517B8] px-8 text-white text-[16px] font-medium"
            onClick={handleApprove}
            style={{ opacity: overallStatus === "approved" ? 0.6 : 1 }}
            type="button"
          >
            {overallStatus === "approved" ? "Approved ✓" : "Approve Registration"}
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-7">

          {/* LEFT COLUMN */}
          <div className="col-span-12 xl:col-span-7">
            <div className="overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-sm">

              {/* Toolbar */}
              <div className="flex h-[88px] items-center justify-between border-b border-[#D1D5DB] px-7">
                <div className="flex items-center">
                  <div className="flex h-[52px] items-center rounded-md border border-[#C9CED6] px-3 gap-3">
                    <button onClick={() => setScale(s => Math.min(s + 0.2, 2))} title="Zoom In" type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <ZoomIn size={20} className="text-[#111827]" />
                    </button>
                    <button onClick={() => setScale(s => Math.max(s - 0.2, 0.5))} title="Zoom Out" type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <ZoomOut size={20} className="text-[#111827]" />
                    </button>
                    <div className="mx-1 h-6 w-px bg-[#D1D5DB]" />
                    <button onClick={() => setRotation(r => r + 90)} title="Rotate" type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <RotateCw size={20} className="text-[#111827]" />
                    </button>
                  </div>
                  <span className="ml-6 text-[16px] font-medium text-[#4B5563]">
                    Trade_License_2024_{selectedRecord.name.split(" ")[0]}.pdf
                  </span>
                  <span className="ml-4 text-[12px] text-[#9CA3AF]">{Math.round(scale * 100)}%</span>
                </div>
                <div className="flex items-center gap-6">
                  <button onClick={() => addToast("Document downloaded!", "success")} title="Download" type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Download size={26} className="cursor-pointer text-[#111827]" />
                  </button>
                  <button onClick={() => addToast("Sending to printer...", "info")} title="Print" type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Printer size={26} className="cursor-pointer text-[#111827]" />
                  </button>
                  <button onClick={() => addToast("Full-screen view opened.", "info")} title="Expand" type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Expand size={26} className="cursor-pointer text-[#111827]" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="bg-[#F5F5F5] p-10">
                <div className="flex min-h-[900px] justify-center">
                  <div
                    style={{ transform: `scale(${scale}) rotate(${rotation}deg)`, transformOrigin: "top center", transition: "transform 0.3s ease" }}
                    className="w-[560px] bg-white border border-[#D1D5DB] shadow-lg px-14 py-14"
                  >
                    <div className="mb-14 flex justify-between">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EEF2F7]">
                        <div className="text-2xl text-[#94A3B8]">🏢</div>
                      </div>
                      <div className="text-right">
                        <h2 className="text-[22px] font-bold text-[#111827]">TRADE LICENSE</h2>
                        <p className="text-[15px] text-[#6B7280]">License No: {selectedRecord.licenseNo}</p>
                      </div>
                    </div>

                    <div className="mb-12 grid grid-cols-2 gap-10">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-[#6B7280]">Commercial Name</p>
                        <p className="text-[18px] font-semibold text-[#111827]">{selectedRecord.name}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-[#6B7280]">Establishment Date</p>
                        <p className="text-[18px] font-semibold text-[#111827]">{selectedRecord.establishDate}</p>
                      </div>
                    </div>

                    <div className="mb-10">
                      <p className="mb-3 text-xs font-bold uppercase text-[#6B7280]">Registered Address</p>
                      <p className="text-[16px] leading-9 text-[#1F2937]">{selectedRecord.address}</p>
                    </div>

                    <div className="my-10 border-t border-[#D1D5DB]" />

                    <div className="grid grid-cols-3 gap-8">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-[#6B7280]">Legal Status</p>
                        <p className="text-[16px] text-[#111827]">{selectedRecord.legalStatus}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-[#6B7280]">Issue Date</p>
                        <p className="text-[16px] text-[#111827]">{selectedRecord.issueDate}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase text-[#6B7280]">Expiry Date</p>
                        <p className="text-[18px] font-bold" style={{ color: selectedRecord.expiryColor }}>{selectedRecord.expiryDate}</p>
                      </div>
                    </div>

                    <div className="my-10 border-t border-[#D1D5DB]" />
                    <div>
                      <p className="mb-5 text-xs font-bold uppercase text-[#6B7280]">Licensed Activities</p>
                      <ul className="space-y-4 text-[16px] text-[#111827]">
                        {selectedRecord.activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 xl:col-span-5 space-y-6">

            {/* Application Progress */}
            <div className="rounded-xl border border-[#D1D5DB] bg-white p-7 shadow-sm">
              <h2 className="mb-8 text-[18px] font-medium uppercase tracking-wider text-[#6B7280]">Application Progress</h2>
              <div className="mb-8 flex items-center gap-5">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-[18px] font-bold text-[#111827]">{progress}% Complete</span>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-md bg-[#F3F4F6] p-5">
                  <p className="mb-3 text-xs font-bold uppercase text-[#6B7280]">Items Verified</p>
                  <h3 className="text-[20px] font-bold text-[#111827]">{verifiedCount}/{selectedRecord.total}</h3>
                </div>
                <div className="rounded-md bg-[#F3F4F6] p-5">
                  <p className="mb-3 text-xs font-bold uppercase text-[#6B7280]">Time In Queue</p>
                  <h3 className="text-[20px] font-bold text-[#111827]">{selectedRecord.queueTime}</h3>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#D1D5DB] px-7 py-5">
                <h2 className="text-[18px] font-bold text-[#111827]">Verification Checklist</h2>
                <div className="rounded bg-[#DCE7F8] px-3 py-2 text-xs font-bold uppercase text-[#51637D]">Action Required</div>
              </div>

              <div className="p-7">
                {/* Entity Name */}
                <div className="mb-8">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {STATUS_ICONS[checklistStatus.entityName]}
                      <div>
                        <h3 className="text-[18px] font-bold text-[#111827]">Entity Name Verification</h3>
                      </div>
                    </div>
                    <button onClick={() => handleChecklistAction("entityName", checklistStatus.entityName === "verified" ? "pending" : "verified")} type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <Pencil size={20} className="text-[#6B7280]" />
                    </button>
                  </div>
                  <div className={`mt-4 ml-11 rounded-md border p-5 ${checklistStatus.entityName === "verified" ? "border-[#B7E4C7] bg-[#EAF8EF]" : "border-[#E5E7EB] bg-[#F9FAFB]"}`}>
                    <p className={`text-[16px] leading-7 ${checklistStatus.entityName === "verified" ? "text-[#166534]" : "text-[#6B7280]"}`}>
                      {checklistStatus.entityName === "verified" ? "Match found in National Registry. No discrepancies detected." : "Pending national registry cross-check."}
                    </p>
                  </div>
                </div>

                {/* License Validity */}
                <div className="mb-8">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {STATUS_ICONS[checklistStatus.licenseValidity]}
                      <h3 className="text-[18px] font-bold text-[#111827]">License Validity Period</h3>
                    </div>
                    {checklistStatus.licenseValidity === "urgent" && (
                      <span className="rounded bg-[#FDE2E2] px-3 py-1 text-xs font-bold uppercase text-[#DC2626]">URGENT</span>
                    )}
                  </div>

                  <div className="ml-11 mt-4">
                    <p className="mb-6 text-[16px] leading-8 text-[#4B5563]">
                      {checklistStatus.licenseValidity === "urgent"
                        ? "Document expiry date is within 90 days. Check for renewal application or flag for review."
                        : "License validity period confirmed and within acceptable range."}
                    </p>
                    <div className="flex gap-3">
                      <button onClick={() => handleChecklistAction("licenseValidity", "urgent")} type="button" className="h-9 min-w-[130px] rounded bg-[#D7191C] px-6 text-[16px] font-semibold text-white">Invalid</button>
                      <button onClick={() => handleChecklistAction("licenseValidity", "pending")} type="button" className="h-9 min-w-[130px] rounded bg-[#D1D5DB] px-6 text-[16px] font-semibold text-[#1F2937]">Flag</button>
                      <button onClick={() => handleChecklistAction("licenseValidity", "verified")} type="button" className="h-9 min-w-[130px] rounded border border-[#D1D5DB] bg-white px-6 text-[16px] font-semibold text-[#1F2937]">Verified</button>
                    </div>
                  </div>
                </div>

                {/* Registered Address Audit */}
                <div className="mb-8 border-t border-[#E5E7EB] pt-8">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {STATUS_ICONS[checklistStatus.addressAudit]}
                      <div>
                        <h3 className="text-[18px] font-bold text-[#111827]">Registered Address Audit</h3>
                        <p className="mt-2 text-[15px] text-[#6B7280]">Verify address against utility bill and government registry records.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChecklistAction("addressAudit", checklistStatus.addressAudit === "verified" ? "pending" : "verified")}
                      type="button"
                      className="rounded-md border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151]"
                    >
                      {checklistStatus.addressAudit === "verified" ? "Revert" : "Compare"}
                    </button>
                  </div>
                </div>

                {/* UBO Review */}
                <div className="mb-8 border-t border-[#E5E7EB] pt-8">
                  <div className="flex items-start gap-4">
                    {STATUS_ICONS[checklistStatus.uboReview]}
                    <div className="flex-1">
                      <h3 className="text-[18px] font-bold text-[#111827]">UBO & Shareholders Review</h3>
                      <div className="mt-5 rounded-md bg-[#F9FAFB] p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[17px] font-semibold text-[#111827]">Marcus J. Thorne</p>
                            <p className="mt-1 text-[#6B7280]">Beneficial Ownership: 45%</p>
                          </div>
                          <button
                            onClick={() => handleChecklistAction("uboReview", checklistStatus.uboReview === "verified" ? "urgent" : "verified")}
                            type="button"
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                          >
                            {STATUS_ICONS[checklistStatus.uboReview]}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Items */}
                {customItems.map((item, idx) => (
                  <div key={idx} className="mb-4 border-t border-[#E5E7EB] pt-6 flex items-center gap-4">
                    <Circle size={20} className="fill-[#6B7280] text-[#6B7280]" />
                    <p className="text-[16px] font-semibold text-[#111827]">{item.label}</p>
                  </div>
                ))}

                {/* Add Custom Item */}
                <div className="border-t border-[#E5E7EB] pt-8">
                  <button
                    onClick={handleAddCustomItem}
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#D1D5DB] bg-[#FAFAFA] py-5 text-[16px] font-medium text-[#4B5563]"
                  >
                    <PlusCircle size={20} />
                    Add Custom Checklist Item
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="rounded-xl border border-[#D1D5DB] bg-white p-7 shadow-sm">
              <h2 className="mb-6 text-[18px] font-bold text-[#111827]">Activity Log</h2>
              <div className="relative">
                <div className="absolute left-[9px] top-2 h-full w-[2px] bg-[#E5E7EB]" />
                {timeline.map((item, i) => (
                  <div key={i} className="relative mb-6 flex gap-5">
                    <div style={{ zIndex: 10, width: "20px", height: "20px", borderRadius: "50%", background: item.done ? "#111827" : "#9CA3AF", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <h3 className="text-[16px] font-semibold text-[#111827]">{item.label}</h3>
                      <p className="text-[#6B7280] text-sm">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
