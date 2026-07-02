import toast from 'react-hot-toast';
import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  Shield,
  AlertTriangle,
  Users,
  CheckCircle,
  X,
  Loader2,
  Calendar,
  AlertCircle,
  TrendingUp,
  Search,
  Check,
  Ban
} from "lucide-react";

const initialAtRiskPartners = [
  {
    id: "#1001",
    name: "Urban Connect",
    risk: "High",
    score: 82,
    alert: "10 min ago",
    status: "Under Review",
    reason: "SLA manipulation and GPS spoofing detected.",
    alertsCount: 14,
    officer: "Agent Carter"
  },
  {
    id: "#1002",
    name: "Apex Digital",
    risk: "High",
    score: 74,
    alert: "25 min ago",
    status: "Under Review",
    reason: "Escrow withdrawal trigger limit exceeded.",
    alertsCount: 8,
    officer: "Agent Carter"
  },
  {
    id: "#1003",
    name: "Prime Hub",
    risk: "Medium",
    score: 48,
    alert: "1 hr ago",
    status: "Monitoring",
    reason: "Anomalous multi-account logins from same subnet.",
    alertsCount: 3,
    officer: "System Automated"
  },
  {
    id: "#1004",
    name: "Elite Group",
    risk: "Medium",
    score: 42,
    alert: "2 hrs ago",
    status: "Monitoring",
    reason: "Inconsistent delivery route velocity parameters.",
    alertsCount: 2,
    officer: "System Automated"
  },
];

export default function PartnerFraudMonitoring() {
  const [partners, setPartners] = useState(initialAtRiskPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'view-all' | 'review'
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewActionType, setReviewActionType] = useState("Resolve");
  const [chartRange, setChartRange] = useState("7 Days");
  const [isChartDropdownOpen, setIsChartDropdownOpen] = useState(false);

  // Dynamic Chart Graph Heights based on selected range
  const chartBars = useMemo(() => {
    if (chartRange === "7 Days") return [20, 35, 45, 70, 80, 55, 68];
    if (chartRange === "30 Days") return [65, 80, 40, 95, 75, 85, 90];
    return [40, 50, 60, 45, 85, 70, 75];
  }, [chartRange]);

  const stats = [
    {
      title: "Total Alerts",
      value: "128",
      growth: "+18%",
      icon: Shield,
    },
    {
      title: "High Risk Alerts",
      value: "32",
      growth: "+12%",
      icon: AlertTriangle,
    },
    {
      title: "Partners Monitored",
      value: "1,284",
      growth: "0%",
      icon: Users,
    },
    {
      title: "Resolved Alerts",
      value: "96",
      growth: "+22%",
      icon: CheckCircle,
    },
  ];

  const handleReviewClick = (partner) => {
    setSelectedPartner(partner);
    setReviewActionType("Resolve");
    setActiveModal("review");
  };

  const handleApplyReview = () => {
    setIsSubmittingReview(true);
    setTimeout(() => {
      setPartners(prev => prev.map(p => {
        if (p.id === selectedPartner.id) {
          if (reviewActionType === "Resolve") {
            toast.success(`Fraud alert for ${p.name} has been resolved!`);
            return null; // will be filtered
          } else if (reviewActionType === "Escalate") {
            toast.success(`Alert escalated to security team for deep analysis.`);
            return { ...p, status: "Escalated" };
          } else {
            toast.error(`Partner ${p.name} account deactivated due to high compliance risk.`);
            return { ...p, status: "Deactivated" };
          }
        }
        return p;
      }).filter(Boolean));
      setIsSubmittingReview(false);
      setActiveModal(null);
    }, 1200);
  };

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search fraud alerts..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-6 font-sans text-slate-700 p-4" style={{ paddingBottom: "40px" }}>

        {/* Hero */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-slate-900 shadow-sm">
          <h1 className="text-4xl font-normal text-slate-900">
            Partner Fraud Monitoring
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Monitor suspicious partner activity, fraud alerts and risk scores in real time.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => toast.success(`Statistic "${item.title}" active telemetry: ${item.value}`)}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm cursor-pointer hover:border-slate-350 transition-colors"
              >
                <div className="flex justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Icon size={24} className="text-slate-700" />
                  </div>
                  <span className="text-green-600 font-medium">
                    {item.growth}
                  </span>
                </div>
                <p className="mt-5 text-slate-500 text-sm font-medium">
                  {item.title}
                </p>
                <h2 className="mt-2 text-4xl font-semibold text-slate-900">
                  {item.value}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Fraud Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Alerts Chart */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Fraud Alerts Over Time
                </h2>
                <p className="mt-2 text-slate-500">
                  Last monitoring activity over {chartRange}
                </p>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsChartDropdownOpen(!isChartDropdownOpen)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  <span>Last {chartRange}</span>
                  <Calendar size={14} className="text-slate-400" />
                </button>
                {isChartDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 z-40 w-36 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                    {["7 Days", "30 Days", "90 Days"].map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setChartRange(range);
                          setIsChartDropdownOpen(false);
                          toast.success(`Chart scope switched to last ${range}.`);
                        }}
                        className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold cursor-pointer border-none bg-transparent ${chartRange === range ? 'bg-indigo-650 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        Last {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-end gap-4 h-64">
                {chartBars.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-2xl bg-gradient-to-t from-blue-600 to-cyan-400 relative group cursor-pointer"
                    style={{ height: `${height * 2.5}px` }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-10">
                      Alerts: {height}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between text-sm text-slate-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Risk Summary */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Risk Level Summary
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="relative h-44 w-44 rounded-full bg-gradient-to-r from-blue-500 via-orange-400 to-red-500 p-4">
                <div className="h-full w-full rounded-full bg-white flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-bold text-slate-900">128</h3>
                  <p className="text-slate-500">Total Alerts</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm font-semibold">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-red-500 font-medium">High Risk</span>
                <span className="font-semibold text-slate-900">32</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-orange-500 font-medium">Medium Risk</span>
                <span className="font-semibold text-slate-900">51</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-blue-500 font-medium">Low Risk</span>
                <span className="font-semibold text-slate-900">38</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-500 font-medium">Safe</span>
                <span className="font-semibold text-slate-900">7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partners At Risk */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-blue-100">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Partners At Risk
              </h2>
              <p className="text-slate-500 mt-1">
                Partners requiring investigation
              </p>
            </div>

            <button 
              onClick={() => setActiveModal("view-all")}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition cursor-pointer border-none"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full">
                <thead className="bg-[#111166]">
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-white">
                    <th className="px-6 py-4">Partner</th>
                    <th>Risk Level</th>
                    <th>Risk Score</th>
                    <th>Last Alert</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.map((partner) => (
                    <tr
                      key={partner.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {partner.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {partner.name}
                            </h4>
                            <p className="text-sm text-slate-500">
                              ID {partner.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            partner.risk === "High"
                              ? "bg-red-105 text-red-650"
                              : "bg-orange-105 text-orange-650"
                          }`}
                        >
                          {partner.risk}
                        </span>
                      </td>
                      <td className="font-semibold text-slate-900">
                        {partner.score}%
                      </td>
                      <td>{partner.alert}</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 font-bold">
                          {partner.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleReviewClick(partner)}
                          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition cursor-pointer border-none"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPartners.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">
                        No partners matching criteria are currently flagged.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Risk Distribution + Fraud Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Risk Distribution */}
          <div className="bg-white rounded-3xl border border-blue-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Risk Distribution
            </h2>
            <div className="mt-8 space-y-6">
              {[
                ["High Risk", "18%"],
                ["Medium Risk", "32%"],
                ["Low Risk", "50%"],
              ].map(([title, value]) => (
                <div key={title}>
                  <div className="flex justify-between mb-2 text-xs font-semibold">
                    <span className="font-medium text-slate-700">{title}</span>
                    <span className="font-semibold text-blue-650">{value}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Summary */}
          <div className="bg-white rounded-3xl border border-blue-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Fraud Summary
            </h2>
            <div className="grid grid-cols-2 gap-5 mt-8 text-xs font-semibold">
              <div className="bg-blue-50 rounded-2xl p-5 cursor-pointer hover:bg-blue-100/50 transition-colors" onClick={() => toast.success("Total system fraud alerts logged: 186")}>
                <h4 className="text-slate-500 text-sm">Total Alerts</h4>
                <p className="text-3xl font-bold text-blue-600 mt-2">186</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 cursor-pointer hover:bg-green-100/50 transition-colors" onClick={() => toast.success("Total resolved alerts: 142")}>
                <h4 className="text-slate-500 text-sm">Resolved</h4>
                <p className="text-3xl font-bold text-green-600 mt-2">142</p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-5 cursor-pointer hover:bg-orange-100/50 transition-colors" onClick={() => toast.success("Total pending investigation alerts: 44")}>
                <h4 className="text-slate-500 text-sm">Pending</h4>
                <p className="text-3xl font-bold text-orange-600 mt-2">44</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 cursor-pointer hover:bg-purple-100/50 transition-colors" onClick={() => toast.success("False positive rate: 18 alerts verified safe.")}>
                <h4 className="text-slate-500 text-sm">False Positive</h4>
                <p className="text-3xl font-bold text-purple-600 mt-2">18</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          MODAL: VIEW ALL PARTNERS AT RISK
          ======================================================== */}
      {activeModal === "view-all" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">At-Risk Registry Directory</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Showing all registered partners flagged in audit compliance systems</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1 text-xs">
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{partner.name} <span className="font-mono text-slate-400 text-[10px] ml-1">{partner.id}</span></p>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Risk Score: {partner.score}% • Last Alert: {partner.alert}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${partner.risk === "High" ? "bg-red-50 text-red-650" : "bg-orange-50 text-orange-650"}`}>{partner.risk}</span>
                    <button
                      onClick={() => handleReviewClick(partner)}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold cursor-pointer border-none"
                    >
                      Audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: MANUAL FRAUD AUDIT REVIEW
          ======================================================== */}
      {activeModal === "review" && selectedPartner && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(activeModal === "review" && partners.includes(selectedPartner) ? "view-all" : null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  Compliance Risk Audit
                </span>
                <h3 className="text-base font-black text-slate-900 tracking-tight mt-1">Manual Review: {selectedPartner.name}</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Partner ID: {selectedPartner.id} • Risk Score: {selectedPartner.score}%</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100/50 flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Reason Flagged</p>
                  <p className="text-slate-500 font-semibold mt-0.5 leading-relaxed">{selectedPartner.reason}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-semibold text-slate-700">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Incidents Alert</p>
                  <p className="text-base font-black text-slate-900 mt-1">{selectedPartner.alertsCount} Cases</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Auditor</p>
                  <p className="text-base font-black text-slate-900 mt-1">{selectedPartner.officer}</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Administrative Action</label>
                <select
                  value={reviewActionType}
                  onChange={(e) => setReviewActionType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                >
                  <option value="Resolve">Approve & Resolve Active Alert</option>
                  <option value="Escalate">Escalate to Specialized Security Team</option>
                  <option value="Deactivate">Deactivate & Suspend Account Operations</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 text-center border border-slate-200 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyReview}
                  disabled={isSubmittingReview}
                  className="flex-1 py-2.5 text-center bg-[#0b1329] text-white rounded-xl font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform flex items-center justify-center gap-1.5"
                >
                  {isSubmittingReview && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{isSubmittingReview ? "Applying..." : "Apply Action"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </AdminShell>
  );
}