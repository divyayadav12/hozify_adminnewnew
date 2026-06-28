import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Eye,
  ZoomIn,
  RotateCw,
  Download,
  Pencil,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const MOCK_PAN_RECORDS = [
  {
    id: "1",
    panNumber: "ABCDE1234F",
    holderName: "HOZIFY ENTERPRISES PRIVATE LIMITED",
    issueDate: "12/05/2021",
    category: "Company (C)",
    fileName: "pan_card_biz_7782.jpg",
    fileSize: "1.2 MB",
    scanAccuracy: "98%",
    partnerName: "Hozify Global Pvt Ltd",
    partnerId: "#HZ-99812-B",
    submittedBy: "Rahul Sharma",
    submissionDate: "Oct 24, 2023 | 14:32",
    accountTier: "Premium Merchant",
    checks: {
      format: "PASSED",
      nsdl: "PASSED",
      tamper: "WARN: SLIGHT BLUR"
    },
    timeline: [
      { id: 't1', title: 'OCR Process Completed', desc: '2 minutes ago', active: true },
      { id: 't2', title: 'Document Uploaded', desc: '5 minutes ago', active: false }
    ]
  },
  {
    id: "2",
    panNumber: "XYZPD9876C",
    holderName: "LUMINA TECH SOLUTIONS PVT LTD",
    issueDate: "18/09/2022",
    category: "Company (C)",
    fileName: "pan_lumina_9921.png",
    fileSize: "850 KB",
    scanAccuracy: "95%",
    partnerName: "Lumina Tech Solutions",
    partnerId: "#HZ-10877-D",
    submittedBy: "Alok Gupta",
    submissionDate: "Jan 12, 2024 | 09:15",
    accountTier: "Enterprise Tier",
    checks: {
      format: "PASSED",
      nsdl: "PASSED",
      tamper: "PASSED"
    },
    timeline: [
      { id: 't1', title: 'OCR Process Completed', desc: '3 minutes ago', active: true },
      { id: 't2', title: 'Document Uploaded', desc: '10 minutes ago', active: false }
    ]
  },
  {
    id: "3",
    panNumber: "MNOPS4321A",
    holderName: "AMIT KUMAR SINGH",
    issueDate: "05/11/2019",
    category: "Individual (P)",
    fileName: "pan_amit_v2.jpg",
    fileSize: "1.7 MB",
    scanAccuracy: "88%",
    partnerName: "Amit Service Provider",
    partnerId: "#HZ-22904-A",
    submittedBy: "Amit Kumar Singh",
    submissionDate: "Mar 05, 2024 | 18:45",
    accountTier: "Standard Merchant",
    checks: {
      format: "PASSED",
      nsdl: "WARN: INACTIVE PAN",
      tamper: "WARN: REFLECTION"
    },
    timeline: [
      { id: 't1', title: 'NSDL Match Warning Raised', desc: '1 minute ago', active: true },
      { id: 't2', title: 'OCR Process Completed', desc: '4 minutes ago', active: false },
      { id: 't3', title: 'Document Uploaded', desc: '12 minutes ago', active: false }
    ]
  }
];

export default function KycVerificationPage() {
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(MOCK_PAN_RECORDS[0]);
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(-10); // initial angle is -10deg

  const [notesState, setNotesState] = useState({});
  const [statuses, setStatuses] = useState({}); // { id: 'pending' | 'approved' | 'rejected' }
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");

  const [customTimelines, setCustomTimelines] = useState({});
  const [customMetadata, setCustomMetadata] = useState({}); // allows editing fields via Pencil icon!

  const activePan = customMetadata[selectedRecord.id]?.panNumber || selectedRecord.panNumber;
  const activeHolder = customMetadata[selectedRecord.id]?.holderName || selectedRecord.holderName;
  const activeNotes = notesState[selectedRecord.id] || "";
  const activeStatus = statuses[selectedRecord.id] || "pending";
  
  const currentTimeline = useMemo(() => {
    return customTimelines[selectedRecord.id] || selectedRecord.timeline;
  }, [customTimelines, selectedRecord]);

  const handleSaveDraft = () => {
    addToast("PAN verification draft saved!", "success");
  };

  const handleSubmitReview = () => {
    addToast("PAN Card review submitted for validation!", "success");
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
    addToast("Zoomed in", "success");
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.7));
    addToast("Zoomed out", "success");
  };

  const handleRotate = () => {
    setRotation(prev => prev + 90);
    addToast("Rotated document clockwise", "success");
  };

  const handleDownload = () => {
    addToast(`Downloading file ${selectedRecord.fileName}...`, "success");
  };

  const handleEditField = (field, label) => {
    const currentValue = customMetadata[selectedRecord.id]?.[field] || selectedRecord[field];
    const newValue = prompt(`Edit ${label}:`, currentValue);
    if (newValue !== null && newValue.trim() !== "") {
      setCustomMetadata(prev => ({
        ...prev,
        [selectedRecord.id]: {
          ...prev[selectedRecord.id],
          [field]: newValue.trim()
        }
      }));
      addToast(`${label} updated!`, 'success');
    }
  };

  const handleApproveCard = () => {
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "approved" }));
    setCustomTimelines(prev => {
      const base = customTimelines[selectedRecord.id] || selectedRecord.timeline;
      if (base.some(t => t.title === 'PAN Approved')) return prev;
      return {
        ...prev,
        [selectedRecord.id]: [
          { id: 'app_' + Date.now(), title: 'PAN Approved', desc: 'Approved by Auditor AU.', active: true },
          ...base.map(t => ({ ...t, active: false }))
        ]
      };
    });
    addToast("PAN Card approved successfully!", "success");
  };

  const handleRejectCard = () => {
    setRejectionModalOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReasonInput.trim()) {
      addToast("Please enter a rejection reason.", "error");
      return;
    }
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "rejected" }));
    setRejectionReasons(prev => ({ ...prev, [selectedRecord.id]: rejectionReasonInput }));
    setCustomTimelines(prev => {
      const base = customTimelines[selectedRecord.id] || selectedRecord.timeline;
      return {
        ...prev,
        [selectedRecord.id]: [
          { id: 'rej_' + Date.now(), title: 'PAN Rejected', desc: `Reason: ${rejectionReasonInput}`, active: true },
          ...base.map(t => ({ ...t, active: false }))
        ]
      };
    });
    addToast(`PAN Card rejected: ${rejectionReasonInput}`, "error");
    setRejectionModalOpen(false);
    setRejectionReasonInput("");
  };

  const handleResetDecision = () => {
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "pending" }));
    setCustomTimelines(prev => {
      const base = customTimelines[selectedRecord.id] || selectedRecord.timeline;
      return {
        ...prev,
        [selectedRecord.id]: base.filter(t => !t.id.startsWith('app_') && !t.id.startsWith('rej_')).map((t, idx) => ({ ...t, active: idx === 0 }))
      };
    });
    addToast("Verification status reset to pending.", "success");
  };

  return (
    <AdminShell>

      <div className="min-h-screen px-6 py-8 relative">

        {/* Breadcrumb */}

        <div className="mb-10 flex items-center justify-between gap-2 text-sm font-medium text-[#5E6172]">
          <div className="flex items-center gap-2">
            <span>Dashboard</span>
            <span>›</span>
            <span>KYC Verification</span>
            <span>›</span>
          </div>

          {/* Record Selector */}
          <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Select Business:</span>
            <select
              value={selectedRecord.id}
              onChange={(e) => {
                const rec = MOCK_PAN_RECORDS.find(r => r.id === e.target.value);
                setSelectedRecord(rec);
              }}
              className="px-3 py-1.5 border border-[#D7D7D7] rounded bg-white text-xs font-semibold text-slate-700 outline-none focus:border-[#2614B8]"
            >
              {MOCK_PAN_RECORDS.map(r => (
                <option key={r.id} value={r.id}>{r.holderName.length > 30 ? r.holderName.slice(0, 30) + '...' : r.holderName} ({r.panNumber})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="xl:col-span-7 space-y-6">

          {/* Heading */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Document Verification
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              PAN Card Verification
            </h2>
          </div>

        </div> 

        {/* Top Action Buttons */}

        <div className="mb-10 flex justify-end gap-3">

          <button
            onClick={handleSaveDraft}
            className="
              h-14
              px-8
              rounded
              bg-white
              text-[#1A1A1A]
              text-lg
              font-medium
              border
              border-[#D7D7D7]
              hover:bg-slate-50
              transition
            "
          >
            Save Draft
          </button>

          <button
            onClick={handleSubmitReview}
            className="
              h-14
              px-8
              rounded
              bg-[#2614B8]
              hover:bg-[#1F119B]
              text-white
              text-lg
              font-medium
              transition
            "
          >
            Submit Review
          </button>

        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-12 gap-6">

          {/* LEFT SIDE */}

          <div className="col-span-12 xl:col-span-7 space-y-6">

            <div className="overflow-hidden rounded-md border border-[#D8D8D8] bg-white">

              {/* Header */}

              <div className="flex h-[78px] items-center justify-between border-b border-[#D8D8D8] px-6">

                <div className="flex items-center gap-4">

                  <Eye
                    size={28}
                    className="text-[#1B1B1B]"
                  />

                  <h2 className="text-[20px] font-semibold text-[#1B1B1B]">
                    PAN Document Preview
                  </h2>

                </div>

                <div className="flex items-center gap-5">

                  <button onClick={handleZoomIn} title="Zoom In">
                    <ZoomIn
                      size={23}
                      className="text-[#1B1B1B] hover:text-[#2614B8] transition"
                    />
                  </button>

                  <button onClick={handleRotate} title="Rotate Clockwise">
                    <RotateCw
                      size={23}
                      className="text-[#1B1B1B] hover:text-[#2614B8] transition"
                    />
                  </button>

                  <button onClick={handleDownload} title="Download File">
                    <Download
                      size={23}
                      className="text-[#1B1B1B] hover:text-[#2614B8] transition"
                    />
                  </button>

                </div>

              </div>

              {/* Preview Area */}

              <div className="bg-[#F3F3F3] p-6">

                <div className="relative flex h-[500px] items-center justify-center overflow-hidden bg-[#ECECEC]">

                  {/* Side shadows */}

                  <div className="absolute left-8 top-8 h-[420px] w-[90px] bg-zinc-300 blur-xl opacity-60" />

                  <div className="absolute right-8 top-8 h-[420px] w-[90px] bg-zinc-300 blur-xl opacity-60" />

                  {/* Center Paper */}

                  <div className="relative flex h-[420px] w-[360px] items-center justify-center bg-[#F8F8F8] shadow-lg">

                    {/* PAN CARD */}

                    <div
                      className="
                        relative
                        h-[135px]
                        w-[245px]
                        rounded-md
                        border
                        border-[#BFBFBF]
                        bg-gradient-to-r
                        from-[#F2D7BE]
                        via-[#E9E4D6]
                        to-[#CFE5D8]
                        shadow-2xl
                        transition-transform
                        duration-200
                        select-none
                      "
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      }}
                    >

                      <div className="p-3">

                        <div className="mb-2 text-[7px] font-bold text-[#555] tracking-wide">
                          INCOME TAX DEPARTMENT, GOVT. OF INDIA
                        </div>

                        <div className="flex gap-3">

                          {/* Avatar/Photo */}
                          <div className="h-14 w-11 rounded bg-zinc-400/80 flex items-center justify-center text-[8px] text-zinc-700 font-bold border border-zinc-500">
                            PHOTO
                          </div>

                          <div className="flex-1 text-[7px] leading-tight space-y-1">
                            <div>
                              <span className="text-[5px] text-slate-500 uppercase block">Permanent Account Number</span>
                              <span className="font-mono font-bold text-slate-900 text-[10px]">{activePan}</span>
                            </div>
                            <div>
                              <span className="text-[5px] text-slate-500 uppercase block">Name</span>
                              <span className="font-semibold text-slate-800 uppercase text-[7px] leading-none block mt-0.5">{activeHolder}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 mt-1">
                              <div>
                                <span className="text-[4px] text-slate-500 uppercase block">Date of Issue</span>
                                <span className="font-semibold text-slate-800 text-[6px]">{selectedRecord.issueDate}</span>
                              </div>
                              <div>
                                <span className="text-[4px] text-slate-500 uppercase block">Category</span>
                                <span className="font-semibold text-slate-800 text-[6px]">{selectedRecord.category}</span>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="flex h-[64px] items-center justify-between border-t border-[#D8D8D8] px-5">

                <div className="flex items-center gap-8">

                  <span className="text-[15px] text-[#444]">
                    File Name: {selectedRecord.fileName}
                  </span>

                  <span className="text-[15px] text-[#444]">
                    Size: {selectedRecord.fileSize}
                  </span>

                </div>

                <div
                  className="
                    rounded
                    bg-[#DCE7FA]
                    px-4
                    py-2
                    text-[14px]
                    font-medium
                    text-[#64748B]
                  "
                >
                  ⚙ OCR Verified
                </div>

              </div>

            </div>

            {/* ================= VERIFICATION CONTROLS ================= */}

            <div className="rounded-md border border-[#D8D8D8] bg-white p-7">

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-[#111111]">
                  Verification Controls
                </h2>
                {activeStatus !== "pending" && (
                  <button 
                    onClick={handleResetDecision}
                    className="text-sm font-semibold text-[#2614B8] hover:underline"
                  >
                    Reset Decision
                  </button>
                )}
              </div>

              {/* Action Cards */}

              <div className="mb-6 grid grid-cols-2 gap-5">

                {/* Reject */}

                <button
                  onClick={handleRejectCard}
                  className={`
                    flex
                    h-[140px]
                    flex-col
                    items-center
                    justify-center
                    rounded-md
                    border-2
                    border-dashed
                    transition
                    ${activeStatus === 'rejected' 
                      ? 'border-red-600 bg-red-100 text-red-800 shadow-inner' 
                      : 'border-[#F1B7B7] bg-[#FFF8F8] hover:bg-[#FFF2F2]'
                    }
                  `}
                >

                  <XCircle
                    size={42}
                    className={`mb-3 ${activeStatus === 'rejected' ? 'text-red-700' : 'text-[#C62828]'}`}
                  />

                  <span className={`text-[18px] font-bold tracking-wide ${activeStatus === 'rejected' ? 'text-red-700' : 'text-[#C62828]'}`}>
                    {activeStatus === 'rejected' ? 'REJECTED' : 'REJECT CARD'}
                  </span>

                </button>

                {/* Approve */}

                <button
                  onClick={handleApproveCard}
                  className={`
                    flex
                    h-[140px]
                    flex-col
                    items-center
                    justify-center
                    rounded-md
                    border-2
                    border-dashed
                    transition
                    ${activeStatus === 'approved' 
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-800 shadow-inner' 
                      : 'border-[#BFC4CC] bg-[#F5F7FA] hover:bg-[#EEF2F7]'
                    }
                  `}
                >

                  <CheckCircle2
                    size={42}
                    className={`mb-3 ${activeStatus === 'approved' ? 'text-emerald-700' : 'text-[#5E6C84]'}`}
                  />

                  <span className={`text-[18px] font-bold tracking-wide ${activeStatus === 'approved' ? 'text-emerald-700' : 'text-[#5E6C84]'}`}>
                    {activeStatus === 'approved' ? 'APPROVED' : 'APPROVE CARD'}
                  </span>

                </button>

              </div>

              {/* Notes */}

              <div>

                <label className="mb-3 block text-[16px] font-medium text-[#555]">
                  Internal Verification Notes
                </label>

                <textarea
                  rows={5}
                  value={activeNotes}
                  onChange={(e) => {
                    const txt = e.target.value;
                    setNotesState(prev => ({ ...prev, [selectedRecord.id]: txt }));
                  }}
                  placeholder="Add details about the verification status or reason for rejection..."
                  className="
                    w-full
                    resize-none
                    rounded-md
                    border
                    border-[#D8D8D8]
                    bg-[#F8F9FB]
                    px-4
                    py-4
                    text-[#444]
                    outline-none
                    placeholder:text-[#9AA0A6]
                    focus:border-[#2614B8]
                  "
                />

              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}

          <div className="col-span-12 xl:col-span-5 space-y-6">

            {/* Metadata Extraction */}

            <div className="rounded-md border border-[#D8D8D8] bg-white p-7">

              <div className="mb-8 flex items-center justify-between">

                <h2 className="text-[24px] font-bold text-[#111111]">
                  Metadata Extraction
                </h2>

                <div className="rounded-full bg-[#EEEEF1] px-4 py-1 text-[14px] font-medium text-[#666]">
                  Scan Accuracy: {selectedRecord.scanAccuracy}
                </div>

              </div>

              {/* PAN NUMBER */}

              <div className="mb-5">

                <label className="mb-2 block text-[14px] font-medium uppercase tracking-wide text-[#666]">
                  PAN Number
                </label>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex-1
                      rounded
                      border
                      border-[#D4D6DA]
                      bg-[#F7F7F8]
                      px-4
                      py-3
                      text-[18px]
                      font-semibold
                      text-[#222]
                    "
                  >
                    {activePan}
                  </div>

                  <button onClick={() => handleEditField('panNumber', 'PAN Number')} title="Edit PAN Number">
                    <Pencil
                      size={22}
                      className="text-[#111] hover:text-[#2614B8] transition"
                    />
                  </button>

                </div>

              </div>

              {/* HOLDER NAME */}

              <div className="mb-5">

                <label className="mb-2 block text-[14px] font-medium uppercase tracking-wide text-[#666]">
                  Business Name / Holder Name
                </label>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex-1
                      rounded
                      border
                      border-[#D4D6DA]
                      bg-[#F7F7F8]
                      px-4
                      py-3
                      text-[18px]
                      font-semibold
                      text-[#222]
                    "
                  >
                    {activeHolder}
                  </div>

                  <button onClick={() => handleEditField('holderName', 'Holder Name')} title="Edit Holder Name">
                    <Pencil
                      size={22}
                      className="text-[#111] hover:text-[#2614B8] transition"
                    />
                  </button>

                </div>

              </div>

              {/* DATE + CATEGORY */}

              <div className="mb-8 grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-2 block text-[14px] font-medium uppercase tracking-wide text-[#666]">
                    Date Of Issue
                  </label>

                  <div
                    className="
                      rounded
                      border
                      border-[#D4D6DA]
                      bg-[#F7F7F8]
                      px-4
                      py-3
                      text-[18px]
                      font-semibold
                      text-[#222]
                    "
                  >
                    {selectedRecord.issueDate}
                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-[14px] font-medium uppercase tracking-wide text-[#666]">
                    Category
                  </label>

                  <div
                    className="
                      rounded
                      border
                      border-[#D4D6DA]
                      bg-[#F7F7F8]
                      px-4
                      py-3
                      text-[18px]
                      font-semibold
                      text-[#222]
                    "
                  >
                    {selectedRecord.category}
                  </div>

                </div>

              </div>

              {/* Divider */}

              <div className="mb-6 border-t border-[#E2E2E2]" />

              <h3 className="mb-4 text-[18px] font-bold text-[#555]">
                VERIFICATION CHECKS
              </h3>

              {/* ================= VERIFICATION CHECKS ================= */}

              <div className="space-y-3">

                {/* Format Validation */}

                <div className="flex items-center justify-between rounded bg-[#F3F4F6] px-4 py-3">

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={20}
                      className="fill-black text-black"
                    />

                    <span className="text-[16px] text-[#333]">
                      Format Validation
                    </span>

                  </div>

                  <span className="font-bold text-[#444]">
                    {selectedRecord.checks.format}
                  </span>

                </div>

                {/* NSDL API Database Match */}

                <div className={`flex items-center justify-between rounded px-4 py-3 ${selectedRecord.checks.nsdl.startsWith('WARN') ? 'bg-[#FFF4F4]' : 'bg-[#F3F4F6]'}`}>

                  <div className="flex items-center gap-3">

                    {selectedRecord.checks.nsdl.startsWith('WARN') ? (
                      <AlertTriangle
                        size={22}
                        className="text-[#D93025]"
                      />
                    ) : (
                      <CheckCircle2
                        size={20}
                        className="fill-black text-black"
                      />
                    )}

                    <span className="text-[16px] text-[#333]">
                      NSDL API Database Match
                    </span>

                  </div>

                  <span className={`font-bold ${selectedRecord.checks.nsdl.startsWith('WARN') ? 'text-[#D93025]' : 'text-[#444]'}`}>
                    {selectedRecord.checks.nsdl}
                  </span>

                </div>

                {/* Tamper Detection */}

                <div className={`flex items-center justify-between rounded px-4 py-3 ${selectedRecord.checks.tamper.startsWith('WARN') ? 'bg-[#FFF4F4]' : 'bg-[#F3F4F6]'}`}>

                  <div className="flex items-center gap-3">

                    {selectedRecord.checks.tamper.startsWith('WARN') ? (
                      <AlertTriangle
                        size={22}
                        className="text-[#D93025]"
                      />
                    ) : (
                      <CheckCircle2
                        size={20}
                        className="fill-black text-black"
                      />
                    )}

                    <span className="text-[16px] text-[#333]">
                      Tamper Detection
                    </span>

                  </div>

                  <span className={`font-bold ${selectedRecord.checks.tamper.startsWith('WARN') ? 'text-[#D93025]' : 'text-[#444]'}`}>
                    {selectedRecord.checks.tamper}
                  </span>

                </div>

              </div>

            </div>

            {/* ================= REQUESTER BUSINESS DETAILS ================= */}

            <div className="relative overflow-hidden rounded-md bg-[#2413A7] p-7">

              {/* Decorative Pattern */}

              <div className="absolute right-5 top-4 opacity-20">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 bg-white"
                    />
                  ))}
                </div>
              </div>

              <h3 className="mb-6 text-[18px] font-bold uppercase text-[#BEB7FF]">
                REQUESTER BUSINESS DETAILS
              </h3>

              <div className="mb-7 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center bg-[#4B39C7]">
                  <Building2
                    size={28}
                    className="text-white"
                  />
                </div>

                <div>

                  <h4 className="text-[20px] font-bold text-white">
                    {selectedRecord.partnerName}
                  </h4>

                  <p className="text-[#BEB7FF]">
                    Partner ID: {selectedRecord.partnerId}
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-[#D2CCFF]">
                    Submitted By:
                  </span>

                  <span className="text-white">
                    {selectedRecord.submittedBy}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#D2CCFF]">
                    Submission Date:
                  </span>

                  <span className="text-white">
                    {selectedRecord.submissionDate}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#D2CCFF]">
                    Account Tier:
                  </span>

                  <span className="text-white">
                    {selectedRecord.accountTier}
                  </span>

                </div>

              </div>

            </div>

            {/* ================= TIMELINE ================= */}

            <div className="rounded-md border border-[#D8D8D8] bg-white p-7">

              <h3 className="mb-8 text-[18px] font-bold text-[#333]">
                TIMELINE
              </h3>

              <div className="relative">

                <div className="absolute left-[5px] top-2 h-full w-[2px] bg-[#E5E7EB]" />

                {currentTimeline.map((item, index) => (
                  <div key={item.id} className="relative mb-8 flex gap-5 last:mb-0">

                    <div className={`z-10 h-[10px] w-[10px] rounded-full ${item.active ? 'bg-black' : 'bg-[#CFCFD6]'}`} />

                    <div>

                      <h4 className={`text-[18px] ${item.active ? 'font-semibold text-[#222]' : 'text-[#555]'}`}>
                        {item.title}
                      </h4>

                      <p className="text-[#666]">
                        {item.desc}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ================= REJECTION MODAL ================= */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[400px] border border-[#D8D8D8] shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#111111] mb-4">Reject PAN Card Document</h3>
            <textarea
              className="w-full h-24 p-3 border border-[#D8D8D8] rounded-md bg-[#F8F9FB] outline-none focus:border-[#2614B8] text-[15px] resize-none"
              placeholder="Enter rejection reason..."
              value={rejectionReasonInput}
              onChange={(e) => setRejectionReasonInput(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => { setRejectionModalOpen(false); setRejectionReasonInput(''); }}
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