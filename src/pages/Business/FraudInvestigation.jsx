import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Building2,
  Network,
  Filter,
  Download,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  ShieldOff,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

// ─── EVIDENCE LOGS ─────────────────────────────────────────────────────────────
const INITIAL_EVIDENCE = [
  {
    id: 1,
    title: "Withdrawal Attempt",
    sub: "IBAN ending in ...X902 • USD 12,500.00",
    time: "14:22:09",
    severity: "HIGH",
    reviewed: false,
  },
  {
    id: 2,
    title: "MFA Failure",
    sub: "3 unsuccessful attempts from IP 45.12.90.1",
    time: "14:18:44",
    severity: "MEDIUM",
    reviewed: false,
  },
  {
    id: 3,
    title: "New Device Detected",
    sub: "Android 11 • Unrecognized User Agent",
    time: "14:15:30",
    severity: "LOW",
    reviewed: false,
  },
];

// ─── TIMELINE STEPS ────────────────────────────────────────────────────────────
const INITIAL_TIMELINE = [
  { id: 1, label: "Case Created",              time: "Oct 24, 14:22", done: true  },
  { id: 2, label: "Initial Review Started",    time: "Oct 24, 14:45", done: true  },
  { id: 3, label: "Deep Entity Check Pending", time: "In Progress",   done: false },
];

export default function FraudInvestigation() {
  const { addToast } = useToast();

  // ── core state ────────────────────────────────────────────────────────────
  const [caseStatus, setCaseStatus]         = useState("ACTION REQUIRED"); // ACTION REQUIRED | ESCALATED | FALSE POSITIVE | CLOSED
  const [riskScore, setRiskScore]           = useState(82);
  const [velocityScore, setVelocityScore]   = useState(91);
  const [ipReputation, setIpReputation]     = useState(88);

  const [evidence, setEvidence]             = useState(INITIAL_EVIDENCE);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [timeline, setTimeline]             = useState(INITIAL_TIMELINE);

  const [analystNote, setAnalystNote]       = useState("");
  const [noteSaved, setNoteSaved]           = useState(false);

  const [filterActive, setFilterActive]     = useState(false);
  const [downloading, setDownloading]       = useState(false);
  const [downloadDone, setDownloadDone]     = useState(false);

  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [analysisDone, setAnalysisDone]     = useState(false);

  const [escalating, setEscalating]         = useState(false);
  const [flagging, setFlagging]             = useState(false);

  const [networkExpanded, setNetworkExpanded] = useState(false);

  // ── derived ───────────────────────────────────────────────────────────────
  const reviewedCount = evidence.filter((e) => e.reviewed).length;
  const statusColorMap = {
    "ACTION REQUIRED": "bg-red-100 text-red-700",
    "ESCALATED":       "bg-orange-100 text-orange-700",
    "FALSE POSITIVE":  "bg-gray-100 text-gray-600",
    "CLOSED":          "bg-green-100 text-green-700",
  };
  const riskLevel =
    riskScore >= 80 ? "CRITICAL" : riskScore >= 60 ? "HIGH" : riskScore >= 40 ? "MEDIUM" : "LOW";
  const riskColor =
    riskScore >= 80 ? "border-red-600 text-red-600" : riskScore >= 60 ? "border-orange-500 text-orange-500" : "border-yellow-400 text-yellow-500";

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleEscalate = () => {
    if (caseStatus === "ESCALATED" || escalating) return;
    setEscalating(true);
    addToast("Escalating case to Senior Admin…", "info");
    setTimeout(() => {
      setEscalating(false);
      setCaseStatus("ESCALATED");
      setTimeline((prev) => [
        ...prev.map((t) => (t.id === 3 ? { ...t, done: true, time: "Oct 24, 15:10" } : t)),
        { id: 4, label: "Escalated to Senior Admin", time: "Oct 24, 15:12", done: true },
      ]);
      addToast("Case escalated successfully!", "success");
    }, 1800);
  };

  const handleFlagFalsePositive = () => {
    if (caseStatus === "FALSE POSITIVE" || flagging) return;
    setFlagging(true);
    addToast("Flagging case as False Positive…", "info");
    setTimeout(() => {
      setFlagging(false);
      setCaseStatus("FALSE POSITIVE");
      setRiskScore(18);
      setVelocityScore(22);
      setIpReputation(31);
      addToast("Case marked as False Positive. Risk scores recalculated.", "success");
    }, 1500);
  };

  const handleReviewEvidence = (id) => {
    setEvidence((prev) =>
      prev.map((e) => (e.id === id ? { ...e, reviewed: !e.reviewed } : e))
    );
    setSelectedEvidence((prev) => (prev === id ? null : id));
    const item = evidence.find((e) => e.id === id);
    if (!item.reviewed) {
      addToast(`Evidence "${item.title}" marked as reviewed.`, "info");
      // lower risk score slightly per review
      setRiskScore((s) => Math.max(s - 4, 10));
    }
  };

  const handleRunAnalysis = () => {
    if (runningAnalysis || analysisDone) return;
    setRunningAnalysis(true);
    addToast("Running full network analysis…", "info");
    setTimeout(() => {
      setRunningAnalysis(false);
      setAnalysisDone(true);
      setNetworkExpanded(true);
      setTimeline((prev) =>
        prev.map((t) => (t.id === 3 ? { ...t, done: true, time: "Oct 24, 15:05", label: "Deep Entity Check Complete" } : t))
      );
      addToast("Full network analysis complete. 3 new connections found.", "success");
    }, 2200);
  };

  const handleSaveNote = () => {
    if (!analystNote.trim()) {
      addToast("Please enter a note before saving.", "info");
      return;
    }
    setNoteSaved(true);
    addToast("Internal note saved successfully.", "success");
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleDownloadLogs = () => {
    if (downloading || downloadDone) return;
    setDownloading(true);
    addToast("Preparing evidence logs for download…", "info");
    setTimeout(() => {
      setDownloading(false);
      setDownloadDone(true);
      addToast("Evidence logs downloaded successfully!", "success");
      
      const headers = "Evidence ID,Title,Details,Time,Severity,Reviewed";
      const csvRows = evidence.map(e => 
        `"${e.id}","${e.title}","${e.sub}","${e.time}","${e.severity}","${e.reviewed}"`
      );
      const csvContent = [headers, ...csvRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'fraud_evidence_logs.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDownloadDone(false), 3000);
    }, 1500);
  };

  const severityColor = {
    HIGH:   "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW:    "bg-gray-100 text-gray-500",
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <AdminShell
      activeTab="Fraud Investigation"
      searchPlaceholder="Search investigations..."
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-gray-500 text-base font-medium mb-3">
              Risk Center › Fraud Investigations ›
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Fraud Investigation Case</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Review evidence, analyze entity relationships, and manage escalation workflows.
            </p>
          </div>

          <div className="flex gap-3">
            {/* Flag as False Positive */}
            <button
              className={`h-12 px-6 border rounded-lg font-medium transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                caseStatus === "FALSE POSITIVE"
                  ? "border-gray-400 text-gray-400 bg-gray-50 cursor-default"
                  : flagging
                  ? "bg-gray-100 text-gray-400 cursor-wait"
                  : "hover:bg-gray-50"
              }`}
              onClick={handleFlagFalsePositive}
              disabled={flagging || caseStatus === "FALSE POSITIVE"}
              type="button"
            >
              {flagging ? (
                <><RefreshCw size={15} className="animate-spin" /> Flagging…</>
              ) : caseStatus === "FALSE POSITIVE" ? (
                <><CheckCircle2 size={15} /> Flagged</>
              ) : (
                <><ShieldOff size={15} /> Flag as False Positive</>
              )}
            </button>

            {/* Escalate */}
            <button
              className={`h-12 px-6 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                caseStatus === "ESCALATED"
                  ? "bg-orange-600 text-white cursor-default"
                  : escalating
                  ? "bg-indigo-400 text-white cursor-wait"
                  : "bg-indigo-700 text-white hover:bg-indigo-800"
              }`}
              onClick={handleEscalate}
              disabled={escalating || caseStatus === "ESCALATED" || caseStatus === "FALSE POSITIVE"}
              type="button"
            >
              {escalating ? (
                <><RefreshCw size={15} className="animate-spin" /> Escalating…</>
              ) : caseStatus === "ESCALATED" ? (
                <><CheckCircle2 size={15} /> Escalated</>
              ) : (
                <><AlertTriangle size={15} /> Escalate to Senior Admin</>
              )}
            </button>
          </div>
        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-12 gap-6">

          {/* RISK SCORE */}
          <div className="col-span-3 bg-white border rounded-xl p-6">
            <h3 className="text-center text-gray-500 uppercase tracking-[3px] text-xl leading-tight">
              COMPOSITE RISK<br />SCORE
            </h3>

            <div className="flex justify-center mt-8">
              <div className={`w-44 h-44 rounded-full border-[12px] flex items-center justify-center transition-all duration-700 ${riskColor}`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold transition-all duration-700 ${riskColor.split(" ")[1]}`}>
                    {riskScore}
                  </div>
                  <div className="text-gray-500 mt-2">{riskLevel}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Identity Match</span>
                <span className="font-semibold">24%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Velocity Score</span>
                <span className={`font-semibold transition-colors duration-500 ${velocityScore > 60 ? "text-red-600" : "text-green-600"}`}>
                  {velocityScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>IP Reputation</span>
                <span className={`font-semibold transition-colors duration-500 ${ipReputation > 60 ? "text-red-600" : "text-green-600"}`}>
                  {ipReputation}%
                </span>
              </div>
            </div>
          </div>

          {/* CASE INTELLIGENCE */}
          <div className="col-span-6 bg-white border rounded-xl p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[38px] font-bold text-gray-900">Case Intelligence</h2>
              <span className={`px-4 py-2 rounded font-semibold transition-all duration-500 ${statusColorMap[caseStatus]}`}>
                {caseStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-8">
              <div>
                <p className="uppercase tracking-wider text-gray-500 text-sm font-medium">Subject Entity</p>
                <div className="flex gap-4 mt-4">
                  <Building2 size={34} />
                  <div>
                    <h3 className="text-3xl">Quantum Dynamics LLC</h3>
                    <p className="text-gray-500 mt-2">Partner ID: PRT-8820</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="uppercase tracking-wider text-gray-500 text-sm font-medium">Detection Timestamp</p>
                <h3 className="text-3xl mt-4">Oct 24, 2023 • 14:22:09 UTC</h3>
                <p className="text-gray-500 mt-2">Automated Rule: VEL_092_BURST</p>
              </div>
            </div>

            <div className={`mt-8 p-5 border-l-4 transition-colors duration-500 ${
              caseStatus === "FALSE POSITIVE" ? "bg-gray-50 border-gray-400" : "bg-gray-100 border-red-600"
            }`}>
              <h4 className="font-semibold text-2xl mb-3">Trigger Summary</h4>
              <p className="text-gray-700 leading-relaxed">
                {caseStatus === "FALSE POSITIVE"
                  ? "After review, this case has been determined to be a false positive. The payout pattern was attributed to a legitimate batch settlement process. No further action required."
                  : "Unusually high frequency of payout requests (14 within 60 seconds) to 3 distinct IBANs located in offshore jurisdictions previously flagged for low KYC compliance."}
              </p>
            </div>
          </div>

          {/* NETWORK GRAPH */}
          <div className="col-span-3 bg-white border rounded-xl p-6">
            <div
              className={`rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${networkExpanded ? "h-32 bg-indigo-50" : "h-56 bg-gray-50 hover:bg-gray-100"}`}
              onClick={() => setNetworkExpanded((v) => !v)}
            >
              <div className="text-center">
                <Network
                  size={networkExpanded ? 48 : 100}
                  className={`transition-all duration-500 ${networkExpanded ? "text-indigo-500" : "text-blue-200"}`}
                />
                {networkExpanded && (
                  <p className="text-sm text-indigo-600 font-medium mt-2">
                    3 new connections found
                  </p>
                )}
              </div>
            </div>

            <h3 className="text-[28px] font-medium mt-6">Network Graph</h3>
            <p className="text-gray-500 text-lg mt-3">
              {analysisDone
                ? "Analysis complete. 3 new bad-actor links identified."
                : "Showing 2nd-degree connections to known bad actors."}
            </p>

            <button
              className={`mt-8 w-full h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                analysisDone
                  ? "bg-green-600 text-white"
                  : runningAnalysis
                  ? "bg-indigo-400 text-white cursor-wait"
                  : "bg-indigo-700 text-white hover:bg-indigo-800"
              }`}
              onClick={handleRunAnalysis}
              disabled={runningAnalysis}
              type="button"
            >
              {runningAnalysis ? (
                <><RefreshCw size={16} className="animate-spin" /> Analyzing…</>
              ) : analysisDone ? (
                <><CheckCircle2 size={16} /> Analysis Done</>
              ) : (
                "Full Analysis"
              )}
            </button>
          </div>

        </div>

        {/* EVIDENCE LOGS + TIMELINE */}
        <div className="grid grid-cols-12 gap-6">

          {/* EVIDENCE LOGS */}
          <div className="col-span-8 bg-white border rounded-xl overflow-hidden">

            <div className="flex items-center justify-between px-7 py-6 border-b">
              <div className="flex items-center gap-3">
                <h2 className="text-[32px] font-bold text-gray-900">Evidence Logs</h2>
                {reviewedCount > 0 && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {reviewedCount}/{evidence.length} reviewed
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  className={`p-2 rounded-lg transition-all duration-150 active:scale-90 hover:bg-gray-100 ${filterActive ? "bg-black text-white" : ""}`}
                  onClick={() => { setFilterActive((v) => !v); addToast(filterActive ? "Filter cleared." : "Filter applied: HIGH severity.", "info"); }}
                  type="button"
                  title="Filter"
                >
                  <Filter size={20} />
                </button>

                <button
                  className={`p-2 rounded-lg transition-all duration-200 active:scale-90 ${
                    downloadDone ? "text-green-600" : downloading ? "text-gray-400 cursor-wait" : "hover:bg-gray-100"
                  }`}
                  onClick={handleDownloadLogs}
                  disabled={downloading}
                  type="button"
                  title="Download Logs"
                >
                  {downloading ? (
                    <RefreshCw size={20} className="animate-spin" />
                  ) : downloadDone ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Download size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {evidence
                .filter((e) => !filterActive || e.severity === "HIGH")
                .map((item) => {
                  const isSelected = selectedEvidence === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 select-none active:scale-[0.99] ${
                        item.reviewed
                          ? "bg-green-50 border-green-200 opacity-80"
                          : isSelected
                          ? "bg-indigo-50 border-indigo-300"
                          : "hover:bg-gray-50 hover:border-gray-300"
                      }`}
                      onClick={() => handleReviewEvidence(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.reviewed ? (
                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full shrink-0 border-2 ${isSelected ? "border-indigo-500 bg-indigo-100" : "border-gray-300"}`} />
                          )}
                          <div>
                            <div className={`font-semibold transition-colors ${item.reviewed ? "line-through text-gray-400" : isSelected ? "text-indigo-700" : ""}`}>
                              {item.title}
                            </div>
                            <div className="text-gray-500 text-sm mt-0.5">{item.sub}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{item.time}</span>
                          <span className={`px-2 py-0.5 text-xs rounded font-semibold ${severityColor[item.severity]}`}>
                            {item.severity}
                          </span>
                          {isSelected && !item.reviewed ? (
                            <ChevronUp size={16} className="text-indigo-500" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-400" />
                          )}
                        </div>
                      </div>

                      {isSelected && !item.reviewed && (
                        <div className="mt-3 pt-3 border-t border-indigo-100 text-sm text-indigo-700 font-medium">
                          Click again to mark as reviewed ✓
                        </div>
                      )}
                    </div>
                  );
                })}

              {filterActive && evidence.filter((e) => e.severity === "HIGH").length === 0 && (
                <p className="text-center text-gray-400 py-4">No HIGH severity items.</p>
              )}
            </div>
          </div>

          {/* TIMELINE + NOTES */}
          <div className="col-span-4 bg-white border rounded-xl p-7">
            <h2 className="text-[32px] font-bold text-gray-900 mb-8">Investigation Timeline</h2>

            <div className="space-y-5">
              {timeline.map((step, idx) => (
                <div key={step.id} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${step.done ? "bg-black" : "border-2 border-gray-300"}`}>
                      {step.done && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 transition-colors duration-500 ${step.done ? "bg-black" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="-mt-0.5">
                    <h4 className={`font-semibold transition-colors ${step.done ? "" : "text-gray-400"}`}>{step.label}</h4>
                    <p className="text-gray-500 text-sm">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ANALYST NOTES */}
            <div className="mt-8">
              <h3 className="uppercase tracking-[3px] text-gray-500 text-sm font-semibold mb-4">
                Analyst Notes
              </h3>
              <textarea
                rows={4}
                className={`w-full border rounded-lg p-4 text-sm transition-all duration-200 outline-none resize-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 ${noteSaved ? "border-green-400 bg-green-50" : ""}`}
                placeholder="Add a note…"
                value={analystNote}
                onChange={(e) => { setAnalystNote(e.target.value); setNoteSaved(false); }}
              />
              <button
                className={`w-full mt-4 h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                  noteSaved
                    ? "bg-green-600 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-800"
                }`}
                onClick={handleSaveNote}
                type="button"
              >
                {noteSaved ? (
                  <><CheckCircle2 size={16} /> Note Saved!</>
                ) : (
                  <><Send size={15} /> Save Internal Note</>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}