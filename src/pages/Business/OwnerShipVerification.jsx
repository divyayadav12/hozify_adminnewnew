import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  ShieldCheck,
  TriangleAlert,
  CheckCircle2,
  Lock,
  ChevronDown,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";

const RECORDS = [
  {
    id: "VER-99201-GLS",
    company: "Global Logistics Solutions Ltd",
    stakeholders: [
      {
        name: "Marcus Vane",
        ownership: "45%",
        status: "verified",
        docNumber: "E8921004X",
        dob: "11 Mar 1979",
        expiry: "12 Nov 2027",
        expiryColor: "#16a34a",
        ocrScore: "98.4%",
        livenessCheck: "Verified",
        screenStatus: "PASSED",
        screenColor: "#16a34a",
        screenBg: "#F0FDF4",
        screenBorder: "#D8F3DC",
      },
      {
        name: "Elena Rodriguez",
        ownership: "40%",
        status: "alert",
        docNumber: "B7411239M",
        dob: "24 Jan 1982",
        expiry: "15 Nov 2023",
        expiryColor: "#DC2626",
        ocrScore: "91.2%",
        livenessCheck: "Inconclusive",
        screenStatus: "ATTENTION REQUIRED",
        screenColor: "#EA580C",
        screenBg: "#FFF7ED",
        screenBorder: "#FED7AA",
      },
    ],
    minorStakeholders: "15%",
  },
  {
    id: "VER-44122-ARP",
    company: "Apex Retail Partners Inc.",
    stakeholders: [
      {
        name: "Sarah Jenkins",
        ownership: "60%",
        status: "verified",
        docNumber: "A1234567B",
        dob: "08 Jul 1975",
        expiry: "30 Jun 2028",
        expiryColor: "#16a34a",
        ocrScore: "99.1%",
        livenessCheck: "Verified",
        screenStatus: "PASSED",
        screenColor: "#16a34a",
        screenBg: "#F0FDF4",
        screenBorder: "#D8F3DC",
      },
      {
        name: "Michael Rodriguez",
        ownership: "40%",
        status: "verified",
        docNumber: "C9876543D",
        dob: "17 Feb 1980",
        expiry: "25 Aug 2026",
        expiryColor: "#16a34a",
        ocrScore: "97.8%",
        livenessCheck: "Verified",
        screenStatus: "PASSED",
        screenColor: "#16a34a",
        screenBg: "#F0FDF4",
        screenBorder: "#D8F3DC",
      },
    ],
    minorStakeholders: "0%",
  },
];

const STAKEHOLDER_BORDER = { verified: "#D9E7FF", alert: "#FFD5D5" };
const STAKEHOLDER_ICON = {
  verified: <ShieldCheck size={18} className="text-[#94A3B8]" />,
  alert: <TriangleAlert size={18} className="text-[#DC2626]" />,
};

export default function OwnershipVerification() {
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(RECORDS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePersonIdx, setActivePersonIdx] = useState(0);
  const [overallStatus, setOverallStatus] = useState("pending");
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [docScale, setDocScale] = useState(1);
  const [docRotation, setDocRotation] = useState(0);
  const [timeline, setTimeline] = useState([
    { label: "Identity Documents Reviewed", time: "Today • 09:42 AM", done: true },
    { label: "Shareholding Structure Confirmed", time: "Oct 14, 2023", done: true },
    { label: "Initial Ownership Filing", time: "Oct 12, 2023", done: false },
  ]);

  const activePerson = selectedRecord.stakeholders[activePersonIdx];

  const switchRecord = (rec) => {
    setSelectedRecord(rec);
    setActivePersonIdx(0);
    setOverallStatus("pending");
    setDocScale(1);
    setDocRotation(0);
    setDropdownOpen(false);
    addToast(`Switched audit to: ${rec.id}`, "info");
  };

  const handleApprove = () => {
    if (overallStatus === "approved") return;
    setOverallStatus("approved");
    setTimeline((prev) => [{ label: "Identity Set Approved", time: "Just now", done: true }, ...prev]);
    addToast(`Identity set for ${selectedRecord.company} approved!`, "success");
  };

  const handleFlagSubmit = () => {
    if (!flagReason.trim()) { addToast("Please enter a revision reason.", "error"); return; }
    setOverallStatus("flagged");
    setFlagModalOpen(false);
    setTimeline((prev) => [{ label: `Flagged for revision: "${flagReason}"`, time: "Just now", done: false }, ...prev]);
    addToast(`${selectedRecord.id} flagged for revision.`, "info");
    setFlagReason("");
  };

  return (
    <AdminShell>
      {/* Revision Modal */}
      {flagModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "28px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Flag for Revision</h2>
              <button onClick={() => setFlagModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "12px" }}>
              Describe the discrepancy found for <strong>{selectedRecord.id}</strong> — {selectedRecord.company}.
            </p>
            <textarea
              style={{ width: "100%", height: "100px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px", fontSize: "13px", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              placeholder="e.g. Elena Rodriguez's passport has expired. Require updated identity documents..."
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "flex-end" }}>
              <button onClick={() => setFlagModalOpen(false)} style={{ padding: "8px 16px", border: "1px solid #D1D5DB", borderRadius: "6px", background: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleFlagSubmit} style={{ padding: "8px 20px", border: "none", borderRadius: "6px", background: "#2417B8", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Submit Flag</button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#F5F6F8] p-8">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[14px] text-[#70707A]">
          <span>Partners</span><span>/</span>
          <span>{selectedRecord.company}</span><span>/</span>
          <span className="font-semibold text-[#111827]">Ownership Verification</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h1 className="text-[37px] font-bold leading-none text-[#111827]">Ultimate Beneficial Owner (UBO) Audit</h1>
              {overallStatus !== "pending" && (
                <span style={{
                  fontSize: "12px", fontWeight: "800", padding: "4px 12px", borderRadius: "6px",
                  background: overallStatus === "approved" ? "#d1fae5" : "#fef3c7",
                  color: overallStatus === "approved" ? "#065f46" : "#b45309"
                }}>
                  {overallStatus === "approved" ? "✓ APPROVED" : "⚑ FLAGGED FOR REVISION"}
                </span>
              )}
            </div>
            <p className="mt-4 text-[18px] text-[#5E6470]">
              ID: {selectedRecord.id} • Reviewing significant control and shareholding structures.
            </p>
          </div>

          <div className="flex gap-4">
            {/* Record Switcher */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ height: "54px", display: "flex", alignItems: "center", gap: "8px", padding: "0 16px", border: "1px solid #CFCFD4", background: "#fff", borderRadius: "6px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
                type="button"
              >
                Switch Record <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div style={{ position: "absolute", top: "58px", right: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, minWidth: "280px" }}>
                  {RECORDS.map((rec) => (
                    <button key={rec.id} onClick={() => switchRecord(rec)} type="button"
                      style={{ width: "100%", textAlign: "left", padding: "12px 16px", border: "none", background: rec.id === selectedRecord.id ? "#f1f5f9" : "#fff", cursor: "pointer", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}
                    >
                      <strong style={{ display: "block", fontSize: "12px" }}>{rec.id}</strong>
                      <span style={{ color: "#6B7280", fontSize: "11px" }}>{rec.company}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setFlagModalOpen(true)}
              className="h-[54px] rounded-md border border-[#CFCFD4] bg-white px-10 text-[18px] font-medium text-[#333]"
              type="button"
            >
              Flag for Revision
            </button>
            <button
              onClick={handleApprove}
              className="h-[54px] rounded-md bg-[#2417B8] px-10 text-[18px] font-medium text-white"
              style={{ opacity: overallStatus === "approved" ? 0.6 : 1 }}
              type="button"
            >
              {overallStatus === "approved" ? "Approved ✓" : "Approve Identity Set"}
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-7">

          {/* LEFT COLUMN */}
          <div className="col-span-12 xl:col-span-7 space-y-7">

            {/* Shareholding Hierarchy */}
            <div className="rounded-xl border border-[#D7D9E0] bg-white p-7 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-[#111827]">Shareholding Hierarchy</h2>
                <div className="flex gap-3">
                  <div className="rounded bg-[#EEF2FF] px-4 py-2 text-[14px] font-semibold text-[#64748B]">
                    Total Stakes: {selectedRecord.stakeholders.reduce((acc, s) => acc + parseInt(s.ownership), 0) + parseInt(selectedRecord.minorStakeholders)}%
                  </div>
                  <div className="rounded bg-[#FFF1F1] px-4 py-2 text-[14px] font-semibold text-[#DC2626]">
                    Unverified: {selectedRecord.minorStakeholders}
                  </div>
                </div>
              </div>

              <div className="relative h-[620px] rounded-xl border border-dashed border-[#D7D9E0] bg-[#FAFAFB] p-8">
                {/* Parent Company */}
                <div className="flex justify-center">
                  <div className="w-[380px] rounded-md bg-[#2417B8] py-6 text-center shadow-lg">
                    <h3 className="text-[18px] font-bold text-white">{selectedRecord.company}</h3>
                    <p className="text-[15px] text-[#D7D5FF]">Holding Entity</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center">
                  <div className="mt-6 h-[80px] w-[4px] bg-[#D9D9DF]" />
                </div>

                {/* Split Line */}
                <div className="relative mx-auto -mt-2 h-[4px] w-[420px] bg-[#D9D9DF]">
                  <div className="absolute left-0 top-0 h-[80px] w-[4px] bg-[#D9D9DF]" />
                  {selectedRecord.stakeholders.length > 1 && (
                    <div className="absolute left-1/2 top-0 h-[80px] w-[4px] -translate-x-1/2 bg-[#D9D9DF]" />
                  )}
                  <div className="absolute right-0 top-0 h-[80px] w-[4px] bg-[#D9D9DF]" />
                </div>

                {/* Stakeholders */}
                <div className={`mt-[80px] grid gap-8`} style={{ gridTemplateColumns: `repeat(${Math.min(selectedRecord.stakeholders.length + 1, 3)}, 1fr)` }}>
                  {selectedRecord.stakeholders.map((s, i) => (
                    <div key={i}
                      onClick={() => setActivePersonIdx(i)}
                      style={{ borderColor: STAKEHOLDER_BORDER[s.status], cursor: "pointer", transform: activePersonIdx === i ? "scale(1.04)" : "scale(1)", transition: "transform 0.2s ease", boxShadow: activePersonIdx === i ? "0 4px 20px rgba(0,0,0,0.12)" : "none" }}
                      className="rounded-lg border-2 bg-white p-6 text-center shadow-sm"
                    >
                      <h3 className="text-[18px] font-bold text-[#111827]">{s.name}</h3>
                      <p className="mt-2 text-[16px] text-[#6B7280]">{s.ownership} Ownership</p>
                      <div className="mt-4 flex justify-center">{STAKEHOLDER_ICON[s.status]}</div>
                    </div>
                  ))}

                  {/* Minor Stakeholders */}
                  <div className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-6 text-center">
                    <h3 className="text-[18px] font-bold text-[#666]">Minor Stakeholders</h3>
                    <p className="mt-2 text-[16px] text-[#9CA3AF]">{selectedRecord.minorStakeholders} Aggregate</p>
                    <div className="mt-4 flex justify-center"><Lock size={18} className="text-[#9CA3AF]" /></div>
                  </div>
                </div>

                <p className="mt-8 italic text-[14px] text-[#6B7280] text-center">
                  Visualization based on company registry filing date: Oct 12, 2023.
                </p>
              </div>
            </div>

            {/* Screening & Sanctions */}
            <div className="rounded-xl border border-[#D7D9E0] bg-white p-7 shadow-sm">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-[#111827]">Screening & Sanctions</h2>
                <div className="rounded bg-[#EEF2FF] px-4 py-2 text-sm font-semibold text-[#64748B]">
                  {selectedRecord.stakeholders.length} Records
                </div>
              </div>

              {selectedRecord.stakeholders.map((s, i) => (
                <div
                  key={i}
                  className="mb-4 rounded-lg border p-5"
                  style={{ background: s.screenBg, borderColor: s.screenBorder }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#111827]">{s.name}</h3>
                      <p className="mt-1 text-[#6B7280]">Global Watchlist Screening</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.status === "verified"
                        ? <CheckCircle2 size={20} style={{ color: s.screenColor }} />
                        : <TriangleAlert size={20} style={{ color: s.screenColor }} />
                      }
                      <span className="font-bold" style={{ color: s.screenColor }}>{s.screenStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 xl:col-span-5 space-y-7">

            {/* Identity Documents */}
            <div className="rounded-xl border border-[#D7D9E0] bg-white shadow-sm">
              <div className="p-7">
                <h2 className="mb-8 text-[24px] font-bold text-[#111827]">Identity Documents</h2>

                {/* Person Tabs */}
                <div className="mb-8 flex gap-6 border-b border-[#D7D9E0]">
                  {selectedRecord.stakeholders.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActivePersonIdx(i);
                        setDocScale(1);
                        setDocRotation(0);
                        addToast(`Viewing documents for ${s.name}`, "info");
                      }}
                      type="button"
                      style={{
                        paddingBottom: "16px",
                        fontSize: "18px",
                        fontWeight: activePersonIdx === i ? "600" : "500",
                        color: activePersonIdx === i ? "#111827" : "#8B8B95",
                        borderBottom: activePersonIdx === i ? "4px solid #111827" : "4px solid transparent",
                        background: "none",
                        border: "none",
                        borderBottom: activePersonIdx === i ? "4px solid #111827" : "4px solid transparent",
                        cursor: "pointer",
                        paddingBottom: "16px",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                {/* Document Viewer Controls */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
                  <button onClick={() => setDocScale(s => Math.min(s + 0.15, 2))} type="button" style={{ background: "#f1f5f9", border: "none", borderRadius: "4px", padding: "6px 8px", cursor: "pointer" }} title="Zoom In"><ZoomIn size={16} /></button>
                  <button onClick={() => setDocScale(s => Math.max(s - 0.15, 0.5))} type="button" style={{ background: "#f1f5f9", border: "none", borderRadius: "4px", padding: "6px 8px", cursor: "pointer" }} title="Zoom Out"><ZoomOut size={16} /></button>
                  <button onClick={() => setDocRotation(r => r + 90)} type="button" style={{ background: "#f1f5f9", border: "none", borderRadius: "4px", padding: "6px 8px", cursor: "pointer" }} title="Rotate"><RotateCw size={16} /></button>
                  <button onClick={() => addToast(`Downloading ${activePerson.name} passport...`, "success")} type="button" style={{ background: "#f1f5f9", border: "none", borderRadius: "4px", padding: "6px 8px", cursor: "pointer" }} title="Download"><Download size={16} /></button>
                  <span style={{ fontSize: "11px", color: "var(--muted)", marginLeft: "auto" }}>{Math.round(docScale * 100)}%</span>
                </div>

                {/* Passport Preview */}
                <div
                  className="relative mb-5 overflow-hidden rounded-xl border border-[#D7D9E0] bg-[#F9F4EC]"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {activePerson.expiry < "2024-01-01" && (
                    <div className="absolute right-5 top-5 rounded bg-[#D7191C] px-4 py-2 text-sm font-bold text-white">
                      EXPIRING SOON
                    </div>
                  )}
                  <div
                    style={{
                      height: "270px",
                      transform: `scale(${docScale}) rotate(${docRotation}deg)`,
                      transition: "transform 0.3s ease",
                      transformOrigin: "center center"
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #F6D7B8, #F8F1E7, #D9F0E2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <div style={{ textAlign: "center", opacity: 0.7 }}>
                        <div style={{ fontSize: "48px", marginBottom: "8px" }}>🪪</div>
                        <p style={{ fontSize: "16px", fontWeight: "800", color: "#1F2937" }}>{activePerson.name}</p>
                        <p style={{ fontSize: "13px", color: "#6B7280" }}>PASSPORT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OCR Status Cards */}
                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="rounded-md border border-[#D7D9E0] bg-[#F8F8F9] p-5">
                    <p className="mb-3 text-xs font-bold uppercase text-[#6B7280]">OCR Status</p>
                    <p className="text-[18px] font-semibold text-[#16A34A]">⊙ {activePerson.ocrScore} Match</p>
                  </div>
                  <div className="rounded-md border border-[#D7D9E0] bg-[#F8F8F9] p-5">
                    <p className="mb-3 text-xs font-bold uppercase text-[#6B7280]">Liveness Check</p>
                    <p className={`text-[18px] font-semibold ${activePerson.livenessCheck === "Verified" ? "text-[#16A34A]" : "text-[#f59e0b]"}`}>
                      ⊙ {activePerson.livenessCheck}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span className="text-[16px] text-[#6B7280]">Document Number</span>
                    <span className="text-[18px] font-bold text-[#111827]">{activePerson.docNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[16px] text-[#6B7280]">Date of Birth</span>
                    <span className="text-[18px] font-bold text-[#111827]">{activePerson.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[16px] text-[#6B7280]">Expiry Date</span>
                    <span className="text-[18px] font-bold" style={{ color: activePerson.expiryColor }}>{activePerson.expiry}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Audit Timeline */}
            <div className="rounded-xl border border-[#D7D9E0] bg-white p-7 shadow-sm">
              <h2 className="mb-8 text-[24px] font-bold text-[#111827]">Verification Audit</h2>
              <div className="relative">
                <div className="absolute left-[10px] top-2 h-full w-[2px] bg-[#E5E7EB]" />
                {timeline.map((item, i) => (
                  <div key={i} className="relative mb-8 flex gap-5">
                    <div style={{ zIndex: 10, height: "20px", width: "20px", borderRadius: "50%", background: item.done ? "#111827" : "#D1D5DB", flexShrink: 0 }} />
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#111827]">{item.label}</h3>
                      <p className="text-[#6B7280]">{item.time}</p>
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