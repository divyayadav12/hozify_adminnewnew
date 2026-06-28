import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";

import {
  Building2,
  ShieldCheck,
  Clock3,
  Ban,
  DollarSign,
  FileCheck,
  Download,
  Plus,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  MoreVertical,
  UserCheck,
  Briefcase,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

// ============================================================================
// 1. REUSABLE DOCUMENT DETAILS MODAL COMPONENT
// ============================================================================
function KycDetailModal({ isOpen, onClose, docData, docName, onStatusChange }) {
  if (!isOpen || !docData) return null;

  const getStatusConfig = (status) => {
    switch (status) {
      case "VERIFIED":
        return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Verified" };
      case "PENDING":
        return { bg: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending Approval" };
      case "REVIEW":
        return { bg: "bg-blue-50 text-blue-700 border-blue-200", label: "Under Review" };
      case "REJECTED":
        return { bg: "bg-rose-50 text-rose-700 border-rose-200", label: "Rejected" };
      default:
        return { bg: "bg-slate-50 text-slate-600 border-slate-200", label: status };
    }
  };

  const statusStyle = getStatusConfig(docData.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase">Verification Desk</span>
            <h3 className="text-lg font-bold text-slate-900">{docName}</h3>
          </div>
          <button 
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Info List */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Document Number</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 font-mono bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 inline-block">
                {docData.documentNumber}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verification Status</p>
              <span className={`mt-1 inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md border ${statusStyle.bg}`}>
                {statusStyle.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upload Date</p>
              <p className="mt-1 text-xs font-medium text-slate-700">{docData.uploadDate}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Uploaded By</p>
              <p className="mt-1 text-xs font-medium text-slate-700">{docData.uploadedBy}</p>
            </div>
          </div>

          <div className="border-t border-slate-50 pt-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Internal Remarks / Notes</p>
            <p className="mt-1 text-xs text-slate-600 bg-slate-50/70 rounded-xl p-3 border border-slate-100 italic">
              {docData.remarks || "No evaluation notes available for this document context."}
            </p>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="mt-6 pt-4 border-t border-slate-150 flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex gap-2">
            <a 
              href={docData.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 active:scale-95 transition"
            >
              <Eye size={14} />
              View Document
            </a>
            <a 
              href={docData.fileUrl}
              download
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl active:scale-95 transition"
            >
              <Download size={14} />
              Download
            </a>
          </div>

          <div className="flex gap-2 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
            <button 
              onClick={() => onStatusChange("VERIFIED")}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm active:scale-95 transition"
            >
              <CheckCircle size={14} />
              Approve
            </button>
            <button 
              onClick={() => onStatusChange("REJECTED")}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm active:scale-95 transition"
            >
              <XCircle size={14} />
              Reject
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// 2. REUSABLE INDIVIDUAL KYC DOCUMENT CARD ROW
// ============================================================================
function KycDocumentRow({ label, docData, onClick }) {
  const getBadgeClass = (status) => {
    const base = "text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider";
    switch (status) {
      case "VERIFIED":
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case "PENDING":
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case "REVIEW":
        return `${base} bg-blue-50 text-blue-700 border-blue-200`;
      case "REJECTED":
        return `${base} bg-rose-50 text-rose-700 border-rose-200`;
      default:
        return `${base} bg-slate-50 text-slate-600 border-slate-200`;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-indigo-50/40 hover:border-indigo-200 hover:shadow-sm cursor-pointer select-none active:scale-[0.99] transition duration-200"
    >
      <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
        {label}
      </span>
      <div className="flex items-center gap-2.5">
        <span className={getBadgeClass(docData?.status)}>
          {docData?.status || "NOT FOUND"}
        </span>
        <ChevronRight size={14} className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition" />
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT COMPONENT
// ============================================================================
export default function BSPPartners() {
  // 1. DYNAMIC DATA STATE WITH NESTED KYC INFRASTRUCTURE
  const [partners, setPartners] = useState([
    {
      name: "Aetheris Systems",
      id: "BSP-92011",
      city: "Mumbai",
      revenue: 820000,
      status: "Active",
      serviceType: "Corporate Lease",
      isTopRated: true,
      personalKyc: {
        aadhaar: { status: "VERIFIED", documentNumber: "[Aadhaar Redacted]", uploadDate: "12-Mar-2026", uploadedBy: "Rohan Sharma (Partner)", remarks: "Biometric e-Sign matches registrar parameters perfectly.", fileUrl: "#" },
        pan: { status: "VERIFIED", documentNumber: "ABCDE1234F", uploadDate: "12-Mar-2026", uploadedBy: "Rohan Sharma (Partner)", remarks: "NSDL PAN API validation returned complete registry success.", fileUrl: "#" }
      },
      businessKyc: {
        gst: { status: "VERIFIED", documentNumber: "27ABCDE1234F1Z5", uploadDate: "13-Mar-2026", uploadedBy: "System Automation", remarks: "GSTIN verified active status against GST Portal real-time log.", fileUrl: "#" },
        businessPan: { status: "VERIFIED", documentNumber: "AABCA5678G", uploadDate: "12-Mar-2026", uploadedBy: "Rohan Sharma (Partner)", remarks: "Corporate legal entity validation confirmed.", fileUrl: "#" },
        registration: { status: "VERIFIED", documentNumber: "U65999MH2022PTC123456", uploadDate: "14-Mar-2026", uploadedBy: "Legal Operations Desk", remarks: "MCA Portal filing cross-reference shows active tracking metrics.", fileUrl: "#" }
      }
    },
    {
      name: "Horizon Data",
      id: "BSP-78229",
      city: "Delhi",
      revenue: 580000,
      status: "Pending",
      serviceType: "SME Broadband",
      isTopRated: false,
      personalKyc: {
        aadhaar: { status: "VERIFIED", documentNumber: "[Aadhaar Redacted]", uploadDate: "02-May-2026", uploadedBy: "Karan Johar (Director)", remarks: "e-KYC session verification authenticated successfully.", fileUrl: "#" },
        pan: { status: "PENDING", documentNumber: "PTYUI9876Q", uploadDate: "02-May-2026", uploadedBy: "Karan Johar (Director)", remarks: "Document submission clear, waiting for manual desk approval process.", fileUrl: "#" }
      },
      businessKyc: {
        gst: { status: "VERIFIED", documentNumber: "07PTYUI9876Q1Z0", uploadDate: "03-May-2026", uploadedBy: "Karan Johar (Director)", remarks: "Active operational ledger response generated.", fileUrl: "#" },
        businessPan: { status: "VERIFIED", documentNumber: "COPKL1122D", uploadDate: "02-May-2026", uploadedBy: "System Automation", remarks: "Validated against corporate income tax index database.", fileUrl: "#" },
        registration: { status: "REVIEW", documentNumber: "U72200DL2021PTC654321", uploadDate: "04-May-2026", uploadedBy: "Compliance Operations", remarks: "Certificate attachment blurred. Escalated to administrative review query.", fileUrl: "#" }
      }
    },
    {
      name: "Vertex Solutions",
      id: "BSP-55018",
      city: "Bangalore",
      revenue: 1120000,
      status: "Active",
      serviceType: "Corporate Lease",
      isTopRated: true,
      personalKyc: {
        aadhaar: { status: "VERIFIED", documentNumber: "[Aadhaar Redacted]", uploadDate: "18-Jan-2026", uploadedBy: "Ananya Hegde (HR)", remarks: "Aadhaar vault tokenization registry complete.", fileUrl: "#" },
        pan: { status: "VERIFIED", documentNumber: "MNBVC4321X", uploadDate: "18-Jan-2026", uploadedBy: "Ananya Hegde (HR)", remarks: "Realtime identity index score matches standard constraints.", fileUrl: "#" }
      },
      businessKyc: {
        gst: { status: "VERIFIED", documentNumber: "29MNBVC4321X1Z9", uploadDate: "19-Jan-2026", uploadedBy: "System Automation", remarks: "All active branch addresses map correctly to spatial data.", fileUrl: "#" },
        businessPan: { status: "VERIFIED", documentNumber: "FORMN5544K", uploadDate: "18-Jan-2026", uploadedBy: "Ananya Hegde (HR)", remarks: "Corporate identification parameters approved.", fileUrl: "#" },
        registration: { status: "VERIFIED", documentNumber: "U85110KA2019PTC987654", uploadDate: "20-Jan-2026", uploadedBy: "Ananya Hegde (HR)", remarks: "Filing updates match recent structural audits.", fileUrl: "#" }
      }
    },
    {
      name: "Nova Logic",
      id: "BSP-11234",
      city: "Hyderabad",
      revenue: 370000,
      status: "Suspended",
      serviceType: "Managed Wi-Fi",
      isTopRated: false,
      personalKyc: {
        aadhaar: { status: "VERIFIED", documentNumber: "[Aadhaar Redacted]", uploadDate: "29-Apr-2026", uploadedBy: "Sanjay Reddy (CEO)", remarks: "Identity parameters verify securely.", fileUrl: "#" },
        pan: { status: "VERIFIED", documentNumber: "LKJHG6789P", uploadDate: "29-Apr-2026", uploadedBy: "Sanjay Reddy (CEO)", remarks: "Verification records established without warning markers.", fileUrl: "#" }
      },
      businessKyc: {
        gst: { status: "VERIFIED", documentNumber: "36LKJHG6789P1Z2", uploadDate: "30-Apr-2026", uploadedBy: "Sanjay Reddy (CEO)", remarks: "Tax mapping verified stable.", fileUrl: "#" },
        businessPan: { status: "VERIFIED", documentNumber: "CORPO9988A", uploadDate: "29-Apr-2026", uploadedBy: "System Automation", remarks: "Verified institutional tax file.", fileUrl: "#" },
        registration: { status: "REJECTED", documentNumber: "U74999TG2020PTC445566", uploadDate: "02-May-2026", uploadedBy: "Legal Operations Desk", remarks: "The active incorporation license expired under state laws without subsequent renewal proofs.", fileUrl: "#" }
      }
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  
  // UI Dropdowns & Dynamic Expanded Row State
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [expandedPartnerId, setExpandedPartnerId] = useState(null); 

  // Modal Interactive Context State
  const [modalMeta, setModalMeta] = useState({
    isOpen: false,
    partnerId: null,
    kycCategory: null, // "personalKyc" | "businessKyc"
    docKey: null,      // "aadhaar" | "pan" | "gst" ...
    docName: ""
  });

  // Dynamic lists extraction
  const availableCities = useMemo(() => ["All Cities", ...new Set(partners.map((p) => p.city))], [partners]);
  const availableServices = useMemo(() => ["All Services", ...new Set(partners.map((p) => p.serviceType || "Corporate Lease"))], [partners]);

  // 3-Way Multi-Filter Logic
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Top Rated" && partner.isTopRated) ||
        partner.status === activeTab;

      const matchesCity = selectedCity === "All Cities" || partner.city === selectedCity;
      const matchesService = selectedService === "All Services" || partner.serviceType === selectedService;

      return matchesTab && matchesCity && matchesService;
    });
  }, [partners, activeTab, selectedCity, selectedService]);

  const statsMetrics = useMemo(() => {
    const total = partners.length;
    const active = partners.filter(p => p.status === "Active").length;
    const pending = partners.filter(p => p.status === "Pending").length;
    const suspended = partners.filter(p => p.status === "Suspended").length;
    
    const totalRevenueRaw = partners.reduce((acc, curr) => acc + curr.revenue, 0);
    const revenueInCr = (totalRevenueRaw / 10000000).toFixed(2);

    return {
      total,
      active,
      pending,
      suspended,
      revenueStr: `₹${revenueInCr}Cr`,
      complianceRate: "98%"
    };
  }, [partners]);

  const formatIndianCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Export handler targeting matching criteria
  const handleDownload = (formatType) => {
    let content = "";
    let fileExtension = "";

    if (formatType === "excel") {
      const excelTemplate = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head></head>
        <body>
          <table>
            <tr style="background-color: #4f46e5; color: white; font-weight: bold;">
              <th>Name</th><th>Entity ID</th><th>City</th><th>Revenue</th><th>Service Type</th><th>Status</th>
            </tr>
            ${filteredPartners.map(p => `<tr><td>${p.name}</td><td>${p.id}</td><td>${p.city}</td><td>${p.revenue}</td><td>${p.serviceType}</td><td>${p.status}</td></tr>`).join("")}
          </table>
        </body>
        </html>`;
      content = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(excelTemplate);
      fileExtension = "xls";
    } else if (formatType === "csv") {
      const csvRows = [
        ["Name", "ID", "City", "Revenue", "Service Type", "Status"],
        ...filteredPartners.map(p => [p.name, p.id, p.city, p.revenue, p.serviceType, p.status])
      ];
      content = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
      fileExtension = "csv";
    } else {
      alert("PDF download initiated (Mock)");
      setIsExportOpen(false);
      return;
    }
    
    const link = document.createElement("a");
    link.setAttribute("href", content);
    link.setAttribute("download", `BSP_Partners_${activeTab}_${new Date().toISOString().split('T')[0]}.${fileExtension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  const togglePartnerKyc = (id) => {
    setExpandedPartnerId(expandedPartnerId === id ? null : id);
  };

  // Open structured Verification Desk modal
  const openKycModal = (partnerId, kycCategory, docKey, docName) => {
    setModalMeta({
      isOpen: true,
      partnerId,
      kycCategory,
      docKey,
      docName
    });
  };

  // Handle live status override inside React State
  const updateDocStatus = (newStatus) => {
    const { partnerId, kycCategory, docKey } = modalMeta;
    setPartners(prevPartners => 
      prevPartners.map(p => {
        if (p.id === partnerId) {
          return {
            ...p,
            [kycCategory]: {
              ...p[kycCategory],
              [docKey]: {
                ...p[kycCategory][docKey],
                status: newStatus
              }
            }
          };
        }
        return p;
      })
    );
    setModalMeta(prev => ({ ...prev, isOpen: false }));
  };

  // Extract selected document details for current active modal
  const activeModalDocData = useMemo(() => {
    if (!modalMeta.isOpen || !modalMeta.partnerId) return null;
    const targetPartner = partners.find(p => p.id === modalMeta.partnerId);
    if (!targetPartner) return null;
    return targetPartner[modalMeta.kycCategory]?.[modalMeta.docKey] || null;
  }, [modalMeta, partners]);

  return (
    <AdminShell activeTab="Partners" searchPlaceholder="Search BSPs...">
      <div className="space-y-8 p-1 relative">
        
        <PartnerExportModal
          open={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          title="Export BSP Directory"
          description="Choose your preferred file format to download BSP records matching the current filters."
          helper="Select one of the available export formats below."
          onExport={(format) => handleDownload(format.toLowerCase())}
          confirmLabel="Generate Export"
        />

        {/* Dynamic Reusable Verification Modal */}
        <KycDetailModal 
          isOpen={modalMeta.isOpen}
          onClose={() => setModalMeta(prev => ({ ...prev, isOpen: false }))}
          docName={modalMeta.docName}
          docData={activeModalDocData}
          onStatusChange={updateDocStatus}
        />

        {/* ================= HERO SECTION ================= */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 relative shadow-sm">
          <div className="absolute right-0 top-0 h-full w-[500px] opacity-20 pointer-events-none">
            <div className="absolute right-16 top-12 h-72 w-72 rounded-full border border-indigo-400"></div>
            <div className="absolute right-28 top-24 h-52 w-52 rounded-full border border-indigo-400"></div>
            <div className="absolute right-40 top-36 h-32 w-32 rounded-full border border-indigo-400"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-slate-600">
                BSP MANAGEMENT
              </span>
              <h1 className="mt-4 text-3xl font-bold text-slate-900">
                Business Service Providers
              </h1>
              <p className="mt-3 max-w-3xl text-slate-500 text-base">
                Manage onboarding, identity validation, tax infrastructure verification, settlements, and live compliance mapping across the ecosystem.
              </p>
              <div className="mt-6 flex gap-4">
                <PartnerExportButton onClick={() => setIsExportOpen(true)} label="Export Data" />
              </div>
            </div>

            <div className="hidden xl:block shrink-0">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">OVERALL COMPLIANCE</p>
                <h2 className="mt-2 text-5xl font-extrabold text-indigo-600">{statsMetrics.complianceRate}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">Global System Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { title: "Total BSPs", value: statsMetrics.total, icon: Building2, badge: "All Nodes", badgeColor: "text-slate-600 bg-slate-50", bgColor: "bg-slate-50/70", filterValue: "All" },
            { title: "Active Entities", value: statsMetrics.active, icon: ShieldCheck, badge: "Live", badgeColor: "text-green-600 bg-green-50", bgColor: "bg-emerald-50/40", filterValue: "Active" },
            { title: "Pending Approval", value: statsMetrics.pending, icon: Clock3, badge: "Review", badgeColor: "text-orange-600 bg-orange-50", bgColor: "bg-amber-50/40", filterValue: "Pending" },
            { title: "Suspended", value: statsMetrics.suspended, icon: Ban, badge: "Alert", badgeColor: "text-red-600 bg-red-50", bgColor: "bg-rose-50/40", filterValue: "Suspended" },
            { title: "Compliance Rate", value: statsMetrics.complianceRate, icon: FileCheck, badge: "Stable", badgeColor: "text-blue-600 bg-blue-50", bgColor: "bg-blue-50/40", filterValue: "All" },
            { title: "Total Volume", value: statsMetrics.revenueStr, icon: DollarSign, badge: "INR Raw", badgeColor: "text-violet-600 bg-violet-50", bgColor: "bg-violet-50/40", filterValue: "All" },
          ].map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.filterValue;

            return (
              <div
                key={index}
                onClick={() => {
                  setActiveTab(item.filterValue);
                  setSelectedCity("All Cities");
                  setSelectedService("All Services");
                  setExpandedPartnerId(null);
                }}
                className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none ${item.bgColor} ${
                  isSelected ? "ring-2 ring-indigo-500/70 border-transparent shadow" : "border-slate-200/80"
                }`}
              >
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm text-indigo-600">
                      <Icon size={18} />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border border-current/10 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-400 truncate">{item.title}</p>
                    <h3 className="mt-0.5 text-2xl font-bold text-slate-900 tracking-tight">{item.value}</h3>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100/80">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${75 + index * 3}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= DIRECTORY TABLE & FILTER HEADER ================= */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600">Provider Management</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">BSP Directory</h2>
              <p className="mt-0.5 text-sm text-slate-400">Monitor all business service providers network metrics</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition">
              <Filter size={16} />
              Advanced Filters
            </button>
          </div>

          {/* KYC Features Module */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-sm">BSP</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Business Service Provider</h3>
                  <p className="text-xs text-slate-500">Corporate & SME Dedicated Infrastructure Network Partner</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Required Verification Blueprint</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {["Aadhaar Signature", "Corporate PAN", "GSTIN Mapping", "Business Registration Certificate"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <span className="text-xs font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Filter Header (Tabs + Dropdowns) */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/30">
            <div className="flex items-center gap-4 relative">
              <div className="flex rounded-xl bg-slate-200/60 p-0.5 text-xs font-semibold">
                {["All", "Active", "Pending", "Suspended"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedCity("All Cities");
                      setSelectedService("All Services");
                      setExpandedPartnerId(null);
                    }}
                    className={`rounded-lg px-4 py-1.5 transition ${
                      activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* DYNAMIC CITIES DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => { setIsCityDropdownOpen(!isCityDropdownOpen); setIsServiceDropdownOpen(false); }}
                  className="flex items-center gap-1 text-xs text-slate-700 font-bold bg-white border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50 transition"
                >
                  {selectedCity}
                  <ChevronDown size={14} />
                </button>
                {isCityDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-44 rounded-xl border border-slate-100 bg-white shadow-lg z-30 py-1">
                    {availableCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => { setSelectedCity(city); setIsCityDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition ${selectedCity === city ? "font-bold text-indigo-600 bg-indigo-50/30" : "text-slate-600"}`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DYNAMIC SERVICE TYPE DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => { setIsServiceDropdownOpen(!isServiceDropdownOpen); setIsCityDropdownOpen(false); }}
                  className="flex items-center gap-1 text-xs text-slate-700 font-bold bg-white border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50 transition"
                >
                  {selectedService === "All Services" ? "Service Type" : selectedService}
                  <ChevronDown size={14} />
                </button>
                {isServiceDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white shadow-lg z-30 py-1">
                    {availableServices.map((service) => (
                      <button
                        key={service}
                        onClick={() => { setSelectedService(service); setIsServiceDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition ${selectedService === service ? "font-bold text-indigo-600 bg-indigo-50/30" : "text-slate-600"}`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {filteredPartners.length} Matches
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/30 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4">City</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                          {partner.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{partner.name}</p>
                          <p className="text-xs text-slate-400">{partner.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle font-medium text-slate-500">{partner.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle font-semibold text-slate-900">{partner.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        partner.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                          : partner.status === "Pending"
                          ? "bg-amber-50 text-amber-700 ring-amber-600/10"
                          : "bg-rose-50 text-rose-700 ring-rose-600/10"
                      }`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle text-right">
                      <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs text-slate-400">
            <p>Showing 1–4 of 148 BSP Partners</p>
            <div className="flex gap-1">
              <button className="h-7 w-7 rounded-md bg-indigo-600 font-semibold text-white shadow-sm">1</button>
              <button className="h-7 w-7 rounded-md border border-slate-200 bg-white font-semibold text-slate-600 hover:bg-slate-50">2</button>
              <button className="h-7 w-7 rounded-md border border-slate-200 bg-white font-semibold text-slate-600 hover:bg-slate-50">3</button>
            </div>
          </div>
        </div>

        {/* ================= STRUCTURAL KYC & COMPLIANCE CENTER ================= */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          
          {/* KYC Subsections Group */}
          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Compliance Center</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">KYC & Verification Hub</h2>
                <p className="text-xs text-slate-400 mt-0.5">Segmented verification workflow for quick audits.</p>
              </div>

              {/* Personal KYC Stack */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 text-slate-800">
                  <UserCheck size={18} className="text-indigo-500" />
                  <h3 className="font-bold text-sm tracking-wide text-slate-700 uppercase">Personal KYC</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Aadhaar Section */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 hover:border-slate-200 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">Aadhaar Card</h4>
                        <p className="mt-1 text-xs text-slate-400">Submitted identity data checklist verified.</p>
                      </div>
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                  {/* PAN Section */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 hover:border-slate-200 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">PAN Card</h4>
                        <p className="mt-1 text-xs text-slate-400">Awaiting automated compliance match score.</p>
                      </div>
                      <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 ring-1 ring-inset ring-amber-600/10">
                        PENDING
                      </span>
                    </div>
                  </div>
                </div>
              </div>

                                {/* Business KYC Card Section */}
                                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
                                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                      <Briefcase size={15} />
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Business KYC</h5>
                                      <p className="text-[10px] text-slate-400 font-medium">Commercial registry & tax authority blueprints</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <KycDocumentRow 
                                      label="GSTIN Status"
                                      docData={partner.businessKyc?.gst}
                                      onClick={() => openKycModal(partner.id, "businessKyc", "gst", "GSTIN Mapping Verification")}
                                    />
                                    <KycDocumentRow 
                                      label="Corporate / Business PAN"
                                      docData={partner.businessKyc?.businessPan}
                                      onClick={() => openKycModal(partner.id, "businessKyc", "businessPan", "Corporate / Business PAN Card")}
                                    />
                                    <KycDocumentRow 
                                      label="Registration Certificate"
                                      docData={partner.businessKyc?.registration}
                                      onClick={() => openKycModal(partner.id, "businessKyc", "registration", "Business Registration Certificate")}
                                    />
                                  </div>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-xs font-semibold text-slate-400 bg-white">
                      No business service providers match the chosen criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-xs font-medium text-slate-400 bg-white">
            <p>Showing 1–{filteredPartners.length} of {filteredPartners.length} Criteria Matches</p>
            <div className="flex gap-1.5">
              <button className="h-7 w-7 rounded-md bg-indigo-600 font-semibold text-white shadow-sm flex items-center justify-center">1</button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}