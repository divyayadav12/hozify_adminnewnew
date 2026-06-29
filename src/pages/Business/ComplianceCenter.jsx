import React, { useState } from "react";
import { useToast } from "../../components/common/ToastNotification";
import AdminShell from "../../components/layouts/AdminShell";
import {
  AlertTriangle,
  Download,
  ShieldCheck,
  Scale,
  Landmark,
  Settings,
  Info,
  X,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

// ─── RENEWAL ROWS DATA ────────────────────────────────────────────────────────
const INITIAL_RENEWALS = [
  {
    id: 1,
    month: "OCT",
    day: "28",
    title: "General Liability Insurance",
    sub: "Policy #GL-90234-X • Global Coverage",
    badge: "IN REVIEW",
    badgeColor: "bg-blue-100 text-blue-700",
    note: "Status: Document Uploaded",
    resolved: false,
  },
  {
    id: 2,
    month: "NOV",
    day: "02",
    title: "Trade License Renewal",
    sub: "Registration: REG-DOM-441 • Branch B",
    badge: "CRITICAL",
    badgeColor: "bg-red-100 text-red-700",
    note: "11 Days Left",
    resolved: false,
  },
  {
    id: 3,
    month: "NOV",
    day: "15",
    title: "Data Privacy Audit (GDPR)",
    sub: "Annual Operational Certification",
    badge: "SCHEDULED",
    badgeColor: "bg-gray-100 text-gray-700",
    note: "Partner: SecureData Inc.",
    resolved: false,
  },
];

// ─── REGIONAL DATA ────────────────────────────────────────────────────────────
const INITIAL_REGIONS = [
  { id: 1, label: "North America (12 Branches)", pct: 100, barColor: "bg-black",   textColor: "text-black" },
  { id: 2, label: "Europe (8 Branches)",          pct: 85,  barColor: "bg-black",   textColor: "text-black" },
  { id: 3, label: "Asia-Pacific (4 Branches)",    pct: 62,  barColor: "bg-red-600", textColor: "text-red-600" },
];

export default function ComplianceCenter() {
  const { addToast } = useToast();
  // ── state ──────────────────────────────────────────────────────────────────
  const [alertDismissed, setAlertDismissed]   = useState(false);
  const [alertResolved, setAlertResolved]     = useState(false);

  const [renewals, setRenewals]               = useState(INITIAL_RENEWALS);
  const [selectedRenewal, setSelectedRenewal] = useState(null);

  const [regions, setRegions]                 = useState(INITIAL_REGIONS);
  const [selectedRegion, setSelectedRegion]   = useState(null);

  const [taxResolved, setTaxResolved]         = useState(false);
  const [runningAudit, setRunningAudit]       = useState(false);
  const [auditDone, setAuditDone]             = useState(false);
  const [exporting, setExporting]             = useState(false);
  const [exportDone, setExportDone]           = useState(false);
  const [calendarClicked, setCalendarClicked] = useState(false);
  const [infoHovered, setInfoHovered]         = useState(false);

  // ── derived stats (react to resolving items) ───────────────────────────────
  const resolvedCount   = renewals.filter((r) => r.resolved).length;
  const taxPct          = taxResolved ? 100 : 78;
  const taxLabel        = taxResolved ? "All clear" : "1 Action pending";
  const overallHealth   = taxResolved ? (auditDone ? 98 : 96) : auditDone ? 95 : 92;
  const overallLabel    = overallHealth >= 96 ? "Outstanding" : overallHealth >= 93 ? "Excellent" : "Good";
  const healthGrowth    = overallHealth - 92;

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleResolveAlert = () => {
    setAlertResolved(true);
    setTaxResolved(true);
    setTimeout(() => setAlertDismissed(true), 800);
  };

  const handleResolveRenewal = (id) => {
    setRenewals((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, resolved: true, badge: "RESOLVED", badgeColor: "bg-green-100 text-green-700", note: "Completed ✓" }
          : r
      )
    );
    setSelectedRenewal(null);
  };

  const handleRunAudit = () => {
    if (runningAudit || auditDone) return;
    setRunningAudit(true);
    setTimeout(() => {
      setRunningAudit(false);
      setAuditDone(true);
      // boost Asia-Pacific after audit
      setRegions((prev) =>
        prev.map((r) => r.id === 3 ? { ...r, pct: 81, barColor: "bg-black", textColor: "text-black" } : r)
      );
    }, 2000);
  };

  const flashBtn = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 350);
  };

  const handleExport = () => {
    if (exporting || exportDone) return;
    setExporting(true);
    addToast("Preparing compliance report for download…", "info");
    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
      addToast("Compliance report exported successfully!", "success");
      
      const headers = "Renewal ID,Title,Details,Status,Note";
      const csvRows = renewals.map(r => 
        `"${r.id}","${r.title}","${r.sub}","${r.badge}","${r.note}"`
      );
      const csvContent = [headers, ...csvRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'compliance_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // reset after 3s so user can export again
      setTimeout(() => setExportDone(false), 3000);
    }, 1500);
  };

  const handleRegionClick = (id) => {
    setSelectedRegion((prev) => (prev === id ? null : id));
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <AdminShell
      activeTab="Compliance Center"
      searchPlaceholder="Search compliance records..."
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Compliance Center</h1>
            <p className="text-gray-500 mt-2 transition-all duration-300">
              Real-time oversight of your enterprise regulatory standing.
              {auditDone && (
                <span className="ml-2 text-green-600 font-medium">✓ Audit complete</span>
              )}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className={`px-5 h-12 border rounded-lg font-medium transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                exportDone
                  ? "border-green-500 text-green-700 bg-green-50"
                  : exporting
                  ? "bg-gray-100 text-gray-400 cursor-wait"
                  : "hover:bg-gray-50"
              }`}
              onClick={handleExport}
              type="button"
              disabled={exporting}
            >
              {exporting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Exporting…
                </>
              ) : exportDone ? (
                <>
                  <CheckCircle2 size={16} />
                  Exported ✓
                </>
              ) : (
                <>
                  <Download size={16} />
                  Export Report
                </>
              )}
            </button>

            <button
              className={`px-5 h-12 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                auditDone
                  ? "bg-green-600 text-white"
                  : runningAudit
                  ? "bg-indigo-400 text-white cursor-wait"
                  : "bg-indigo-700 text-white hover:bg-indigo-800"
              }`}
              onClick={handleRunAudit}
              type="button"
              disabled={runningAudit}
            >
              {runningAudit ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Running…
                </>
              ) : auditDone ? (
                <>
                  <CheckCircle2 size={16} />
                  Audit Complete
                </>
              ) : (
                "Run Audit"
              )}
            </button>
          </div>
        </div>

        {/* ALERT BANNER */}
        {!alertDismissed && (
          <div
            className={`border rounded-xl p-5 flex items-start justify-between transition-all duration-500 ${
              alertResolved
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex gap-4">
              {alertResolved ? (
                <CheckCircle2 className="text-green-600 mt-1 shrink-0" size={22} />
              ) : (
                <AlertTriangle className="text-red-600 mt-1 shrink-0" size={22} />
              )}
              <div>
                <h3 className={`font-bold text-lg transition-colors ${alertResolved ? "text-green-700" : "text-red-700"}`}>
                  {alertResolved
                    ? "Resolved: Tax Filing Submitted Successfully"
                    : "Immediate Action Required: Tax Filing Deadline"}
                </h3>
                <p className={`mt-1 transition-colors ${alertResolved ? "text-green-600" : "text-red-600"}`}>
                  {alertResolved
                    ? "VAT compliance for Branch \"Downtown-A2\" has been filed. No penalties will apply."
                    : "Your quarterly VAT compliance for Branch \"Downtown-A2\" is overdue by 3 days. Failure to file may result in operational penalties."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-4">
              {!alertResolved && (
                <button
                  className="text-red-700 font-semibold underline transition-all duration-150 active:scale-95 hover:text-red-900"
                  onClick={handleResolveAlert}
                  type="button"
                >
                  Resolve Now
                </button>
              )}
              <button
                className="text-gray-400 hover:text-gray-600 transition-all duration-150 active:scale-75 hover:rotate-90"
                onClick={() => setAlertDismissed(true)}
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* TOP CARDS */}
        <div className="grid grid-cols-12 gap-5">

          {/* OVERALL HEALTH */}
          <div className="col-span-4 bg-white border rounded-xl p-6 transition-all duration-500">
            <div className="flex justify-between items-start">
              <h4 className="uppercase tracking-widest text-gray-500">Overall Health</h4>
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setInfoHovered(true)}
                onMouseLeave={() => setInfoHovered(false)}
              >
                <Info size={18} className="text-gray-400 hover:text-indigo-600 transition-colors" />
                {infoHovered && (
                  <div className="absolute right-0 top-6 w-48 bg-black text-white text-xs rounded-lg p-3 z-20 shadow-xl">
                    Score updates based on resolved items & audit completion.
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 mt-8">
              <div
                className={`w-24 h-24 rounded-full border-[6px] flex items-center justify-center transition-all duration-700 ${
                  overallHealth >= 96 ? "border-green-500" : overallHealth >= 93 ? "border-black" : "border-gray-400"
                }`}
              >
                <span className="text-2xl font-semibold transition-all duration-500">{overallHealth}%</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold transition-all duration-300">{overallLabel}</h3>
                <p className={`transition-colors ${healthGrowth > 0 ? "text-green-600" : "text-gray-500"}`}>
                  {healthGrowth > 0 ? `+${healthGrowth}% from last month` : "+0% from last month"}
                </p>
              </div>
            </div>

            <div className="border-t mt-8 pt-5 flex justify-between text-sm">
              <span className="text-gray-500">Next Checkup</span>
              <span className="font-semibold">{auditDone ? "Nov 24, 2023" : "Oct 24, 2023"}</span>
            </div>
          </div>

          {/* LEGAL */}
          <div className="col-span-2 bg-white border rounded-xl p-5">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <Scale size={18} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-xl">Legal</h3>
            <div className="h-2 bg-gray-200 rounded-full mt-4">
              <div className="h-full w-full bg-black rounded-full transition-all duration-700" />
            </div>
            <p className="font-semibold mt-2">100%</p>
            <p className="text-gray-500 mt-4">All licenses active</p>
          </div>

          {/* TAX */}
          <div
            className={`col-span-2 border rounded-xl p-5 transition-all duration-500 cursor-pointer hover:shadow-md active:scale-[0.98] ${
              taxResolved ? "bg-green-50 border-green-200" : "bg-white"
            }`}
            onClick={() => !taxResolved && handleResolveAlert()}
            title={taxResolved ? "Tax compliant" : "Click to resolve tax issue"}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-colors ${taxResolved ? "bg-green-100" : "bg-red-50"}`}>
              <Landmark size={18} className={taxResolved ? "text-green-600" : "text-red-600"} />
            </div>
            <h3 className="font-semibold text-xl">Tax</h3>
            <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${taxResolved ? "bg-green-500" : "bg-red-600"}`}
                style={{ width: `${taxPct}%` }}
              />
            </div>
            <p className={`font-semibold mt-2 transition-colors ${taxResolved ? "text-green-700" : ""}`}>{taxPct}%</p>
            <p className={`mt-4 text-sm transition-colors ${taxResolved ? "text-green-600" : "text-gray-500"}`}>{taxLabel}</p>
          </div>

          {/* OPERATIONAL */}
          <div
            className={`col-span-4 border rounded-xl p-5 transition-all duration-500 ${
              auditDone ? "bg-purple-50 border-purple-200" : "bg-white"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-colors ${auditDone ? "bg-purple-100" : "bg-purple-50"}`}>
              <Settings size={18} className={`text-purple-600 transition-transform duration-700 ${runningAudit ? "animate-spin" : ""}`} />
            </div>
            <h3 className="font-semibold text-xl">Operational</h3>
            <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-700"
                style={{ width: `${auditDone ? 99 : 94}%` }}
              />
            </div>
            <p className="font-semibold mt-2">{auditDone ? "99%" : "94%"}</p>
            <p className="text-gray-500 mt-4">{auditDone ? "Fully compliant" : "Near complete"}</p>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-12 gap-5">

          {/* UPCOMING RENEWALS */}
          <div className="col-span-7 bg-white border rounded-xl overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-2xl font-semibold">
                Upcoming Renewals & Deadlines
                {resolvedCount > 0 && (
                  <span className="ml-3 text-sm font-normal text-green-600">
                    {resolvedCount} resolved
                  </span>
                )}
              </h2>
              <button
                className={`font-medium transition-all duration-150 hover:text-indigo-700 active:scale-95 ${calendarClicked ? "text-indigo-700 scale-95" : ""}`}
                onClick={() => flashBtn(setCalendarClicked)}
                type="button"
              >
                View Calendar
              </button>
            </div>

            {renewals.map((r, idx) => {
              const isSelected = selectedRenewal === r.id;
              const isLast = idx === renewals.length - 1;
              return (
                <div
                  key={r.id}
                  className={`transition-all duration-200 select-none cursor-pointer ${!isLast ? "border-b" : ""}`}
                  onClick={() => !r.resolved && setSelectedRenewal(isSelected ? null : r.id)}
                >
                  <div
                    className={`flex items-center justify-between px-6 py-4 transition-all duration-150 ${
                      r.resolved
                        ? "bg-green-50 opacity-70"
                        : isSelected
                        ? "bg-indigo-50"
                        : "hover:bg-gray-50 active:bg-gray-100"
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className={`w-10 h-10 border rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                          r.resolved ? "border-green-300 bg-green-50" : isSelected ? "border-indigo-400 bg-indigo-50" : ""
                        }`}
                      >
                        <span className="text-xs text-gray-500">{r.month}</span>
                        <span className="font-bold text-xl">{r.day}</span>
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg transition-colors ${r.resolved ? "line-through text-gray-400" : isSelected ? "text-indigo-700" : ""}`}>
                          {r.title}
                        </h3>
                        <p className="text-gray-500">{r.sub}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-3 py-1 text-xs rounded font-semibold ${r.badgeColor}`}>
                        {r.badge}
                      </span>
                      <p className="text-gray-500 mt-2 text-sm">{r.note}</p>
                    </div>
                  </div>

                  {/* Expanded action row */}
                  {isSelected && !r.resolved && (
                    <div className="bg-indigo-50 border-t border-indigo-100 px-6 py-3 flex justify-end gap-3">
                      <button
                        className="text-sm text-gray-500 hover:text-gray-700 transition-all active:scale-95"
                        onClick={(e) => { e.stopPropagation(); setSelectedRenewal(null); }}
                        type="button"
                      >
                        Dismiss
                      </button>
                      <button
                        className="px-4 py-1.5 bg-indigo-700 text-white text-sm rounded font-medium transition-all duration-150 active:scale-95 hover:bg-indigo-800 flex items-center gap-2"
                        onClick={(e) => { e.stopPropagation(); handleResolveRenewal(r.id); }}
                        type="button"
                      >
                        <CheckCircle2 size={14} />
                        Mark as Resolved
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* REGIONAL COMPLIANCE */}
          <div className="col-span-5 bg-white border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-8">Regional Compliance Status</h2>

            <div className="space-y-7">
              {regions.map((region) => {
                const isSelected = selectedRegion === region.id;
                return (
                  <div
                    key={region.id}
                    className={`cursor-pointer rounded-lg px-2 py-2 transition-all duration-150 active:scale-[0.98] ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                    onClick={() => handleRegionClick(region.id)}
                  >
                    <div className="flex justify-between mb-2">
                      <span className={`transition-colors ${isSelected ? "text-indigo-700 font-semibold" : ""}`}>
                        {region.label}
                      </span>
                      <span className={`font-semibold transition-colors ${isSelected ? "text-indigo-700" : region.textColor}`}>
                        {region.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${isSelected ? "bg-indigo-600" : region.barColor}`}
                        style={{ width: `${region.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* POLICY ALERT */}
              <div
                className={`border rounded-xl p-4 mt-8 transition-all duration-500 ${
                  auditDone ? "border-green-200 bg-green-50" : ""
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=100"
                    alt="policy"
                    className="w-10 h-10 rounded object-cover shrink-0"
                  />
                  <div>
                    <h4 className={`font-semibold transition-colors ${auditDone ? "text-green-700" : ""}`}>
                      {auditDone ? "Policy Updated" : "New Policy Alert"}
                    </h4>
                    <p className={`text-sm mt-1 transition-colors ${auditDone ? "text-green-600" : "text-gray-500"}`}>
                      {auditDone
                        ? "APAC digital tax registration completed. Region now 81% compliant."
                        : "APAC region requires new digital tax registration by end of month."}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}