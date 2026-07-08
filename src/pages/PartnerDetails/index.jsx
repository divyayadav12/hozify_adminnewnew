import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Edit2,
  CheckCircle,
  FileText,
  AlertTriangle,
  Clock,
  Eye,
  Download,
  RotateCcw,
  Upload,
  ExternalLink,
  ShieldAlert,
  User,
  ShieldCheck,
  MapPin,
  Building,
  Phone,
  Activity,
  Globe,
  Star,
  X,
  Loader2
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

export default function PartnerDetails() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  // Modals and dynamic details state
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'edit'
  const [partnerName, setPartnerName] = useState("Global Logistics Solutions Ltd.");
  const [partnerEmail, setPartnerEmail] = useState("sarah.jenkins@globallogistics.com");
  const [partnerPhone, setPartnerPhone] = useState("+1 (555) 019-2834");
  const [partnerRadius, setPartnerRadius] = useState("75");
  
  const [messageText, setMessageText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleBack = () => {
    navigate(ROUTES.partners);
  };

  const handleContactPartner = () => {
    setActiveModal("contact");
  };

  const handleEditProfile = () => {
    setActiveModal("edit");
  };

  const submitContactMessage = () => {
    if (!messageText.trim()) {
      addToast("Please enter a message to send.", "error");
      return;
    }
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      addToast(`Direct dispatch alert message sent to Sarah Jenkins!`, "success");
      setMessageText("");
      setActiveModal(null);
    }, 1000);
  };

  const saveProfileChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast(`Partner profile details successfully updated!`, "success");
      setActiveModal(null);
    }, 1000);
  };

  const tabs = [
    'Overview',
    'KYC',
    'Services',
    'Branches',
    'Employees',
    'Wallet',
    'Banking',
    'Revenue',
    'Reviews'
  ];

  return (
    <AdminShell activeTab="Partners" searchPlaceholder="Search partner documents, GSTIN, or ID...">
      {/* Breadcrumb / Back button row */}
      <div className="partner-details-nav">
        <button className="back-arrow-btn cursor-pointer" type="button" onClick={handleBack} aria-label="Go back to partners">
          <ArrowLeft size={20} />
        </button>
        <div className="partner-details-header-meta">
          <div className="header-meta-top">
            <svg className="detail-partner-logo-svg" width="40" height="40" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="6" fill="#0d1b15" />
              <circle cx="16" cy="16" r="8" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M10 13 A 6 6 0 0 0 22 13" fill="none" stroke="#10b981" strokeWidth="1.5" />
              <path d="M10 19 A 6 6 0 0 1 22 19" fill="none" stroke="#10b981" strokeWidth="1.5" />
            </svg>
            <div className="detail-title-block">
              <div className="detail-title-row">
                <h1>{partnerName}</h1>
                <span className="enterprise-partner-badge">Enterprise Partner</span>
              </div>
              <div className="detail-id-row">
                <span className="check-bullet">✔</span>
                <span>Partner ID: HOZ-GLS-8829</span>
                <span className="dot-sep">•</span>
                <span>Joined Oct 2023</span>
              </div>
            </div>
            
            <div className="detail-compliance-score-wrap">
              <div className="score-label">OVERALL COMPLIANCE</div>
              <div className="score-value">80% Verified</div>
            </div>
          </div>

          <div className="header-meta-actions">
            <button onClick={handleContactPartner} className="secondary-action-btn font-bold cursor-pointer" type="button">
              <Mail size={16} />
              <span>Contact Partner</span>
            </button>
            <button onClick={handleEditProfile} className="primary-action-btn font-bold cursor-pointer" type="button">
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="details-subtabs-wrap">
        <nav className="details-subnav">
          {tabs.map((tab) => (
            <button
              className={activeSubTab === tab ? 'active' : ''}
              onClick={() => setActiveSubTab(tab)}
              type="button"
              key={tab}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeSubTab === 'Overview' ? (
        <div className="overview-tab-content">
          <div className="overview-columns">
            {/* Left Column: Business & Liaison Information */}
            <div className="overview-left-col">
              <div className="panel overview-card">
                <div className="service-card-title-wrap">
                  <div className="title-icon-circle purple-bg">
                    <Building size={16} />
                  </div>
                  <div>
                    <h2>Business Information</h2>
                    <p>Core tax documentation and corporate headquarters details.</p>
                  </div>
                </div>

                <div className="overview-info-list">
                  <div className="info-item-row">
                    <span className="info-label">Headquarters</span>
                    <strong className="info-val">Suite 400, 100 Corporate Parkway, New York, NY 10001</strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Tax ID (GSTIN/EIN)</span>
                    <strong className="info-val">27AAAAA0000A1Z5</strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Incorporation Number (CIN)</span>
                    <strong className="info-val">L74999MH2021PLC353982</strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Foundation Date</span>
                    <strong className="info-val">12 January 2021</strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Entity Status</span>
                    <span className="status-badge-active-green">Active Operations</span>
                  </div>
                </div>
              </div>

              <div className="panel overview-card">
                <div className="service-card-title-wrap">
                  <div className="title-icon-circle blue-bg">
                    <User size={16} />
                  </div>
                  <div>
                    <h2>Contact & Liaison Details</h2>
                    <p>Primary communications coordinator assigned to this account.</p>
                  </div>
                </div>

                <div className="liaison-profile-section">
                  <img
                    className="liaison-avatar"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Sarah Jenkins Avatar"
                  />
                  <div className="liaison-meta-text">
                    <div className="liaison-name-status">
                      <strong>Sarah Jenkins</strong>
                      <span className="active-dot-indicator" title="Online" />
                    </div>
                    <span>Account Liaison Manager</span>
                  </div>
                </div>

                <div className="overview-info-list border-top-lavender">
                  <div className="info-item-row">
                    <span className="info-label">Direct Email</span>
                    <strong className="info-val">
                      <Mail size={12} className="inline-icon" /> {partnerEmail}
                    </strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Direct Phone</span>
                    <strong className="info-val">
                      <Phone size={12} className="inline-icon" /> {partnerPhone}
                    </strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Response SLA</span>
                    <strong className="info-val">&lt; 30 Minutes</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dispatch Coverage & Activity Timeline */}
            <div className="overview-right-col">
              <div className="panel overview-card">
                <div className="service-card-title-wrap">
                  <div className="title-icon-circle orange-bg">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h2>Operational Dispatch Coverage</h2>
                    <p>Live active dispatch radar mapping zones.</p>
                  </div>
                </div>

                <div className="radar-map-container mini-map-margin">
                  <svg className="radar-map-svg" viewBox="0 0 400 200" width="100%" height="150">
                    <rect width="400" height="200" fill="#040914" />
                    <circle cx="200" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="200" cy="100" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="200" cy="100" r="20" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    
                    <line x1="200" y1="10" x2="200" y2="190" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="50" y1="100" x2="350" y2="100" stroke="#0f172a" strokeWidth="1.5" />
                    
                    <circle className="radar-pulse-wave" cx="180" cy="80" r="25" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="180" cy="80" r="4" fill="#10b981" />
                    
                    <circle className="radar-pulse-wave" cx="230" cy="120" r="15" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="230" cy="120" r="4" fill="#10b981" />
                  </svg>
                </div>

                <div className="overview-info-list">
                  <div className="info-item-row">
                    <span className="info-label">Active dispatch hubs</span>
                    <strong className="info-val">2 (Jersey City Central, East Boston)</strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Operational Radius</span>
                    <strong className="info-val">{partnerRadius} km combined coverage</strong>
                  </div>
                  <div className="info-item-row">
                    <span className="info-label">Live SLA Adherence</span>
                    <strong className="info-val green-text">99.8% Uptime</strong>
                  </div>
                </div>
              </div>

              <div className="panel overview-card">
                <div className="service-card-title-wrap">
                  <div className="title-icon-circle blue-bg">
                    <Activity size={16} />
                  </div>
                  <div>
                    <h2>Recent Dispatch & Admin Events</h2>
                    <p>Timeline of the most recent activity log metrics.</p>
                  </div>
                </div>

                <div className="timeline-mini-list">
                  <div className="timeline-mini-item">
                    <div className="timeline-mini-icon check-green">✔</div>
                    <div className="timeline-mini-content">
                      <strong>SLA Threshold Met for Jersey Central</strong>
                      <span>All 42 dispatch routes successfully completed within SLA bounds.</span>
                      <small>2 Hours Ago</small>
                    </div>
                  </div>
                  <div className="timeline-mini-item">
                    <div className="timeline-mini-icon upload-blue">↑</div>
                    <div className="timeline-mini-content">
                      <strong>New Vehicle License Uploaded</strong>
                      <span>Added 5 new active delivery vans to the Boston dispatch segment list.</span>
                      <small>1 Day Ago</small>
                    </div>
                  </div>
                  <div className="timeline-mini-item">
                    <div className="timeline-mini-icon alert-orange">!</div>
                    <div className="timeline-mini-content">
                      <strong>Pending Audit Request</strong>
                      <span>A periodic random check requested on physical vehicle verification reports.</span>
                      <small>3 Days Ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'KYC' ? (
        <div className="kyc-tab-content">
          {/* KYC Documents Verification Grid */}
          <div className="kyc-documents-grid">
            
            {/* 1. GST Registration */}
            <div className="kyc-card">
              <div className="kyc-card-header">
                <h3>GST Registration</h3>
                <span className="kyc-status-badge verified">
                  <span className="check-icon">✔</span> Verified
                </span>
              </div>
              <div className="kyc-card-meta">
                <span className="meta-label">GSTIN: 27AAAAA0000A1Z5</span>
                <div className="meta-dates">
                  <div>
                    <span>Issued Date</span>
                    <strong>12 Jan 2021</strong>
                  </div>
                  <div>
                    <span>Verification Date</span>
                    <strong>15 Oct 2023</strong>
                  </div>
                </div>
              </div>
              <div className="kyc-card-preview-area">
                <img
                  className="kyc-preview-img"
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"
                  alt="GST Document"
                />
                <div className="kyc-preview-overlay">
                  <button className="overlay-action-btn" type="button" onClick={() => addToast("Viewing verified GST certificate...", "success")}>
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button className="overlay-action-btn" type="button" onClick={() => addToast("Downloading certified GST doc...", "success")}>
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Company PAN */}
            <div className="kyc-card">
              <div className="kyc-card-header">
                <h3>Company PAN</h3>
                <span className="kyc-status-badge approved">Approved</span>
              </div>
              <div className="kyc-card-meta">
                <span className="meta-label">Permanent Account Number: ABXXXXXXXX12</span>
              </div>
              <div className="kyc-card-preview-area">
                <img
                  className="kyc-preview-img"
                  src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=600&q=80"
                  alt="PAN Card"
                />
              </div>
              <div className="kyc-card-actions">
                <button className="kyc-btn-secondary cursor-pointer" type="button" onClick={() => addToast("Company PAN card queued for manual credential audit check.", "success")}>
                  Re-verify Details
                </button>
              </div>
            </div>

            {/* 3. COI */}
            <div className="kyc-card">
              <div className="kyc-card-header">
                <h3>COI</h3>
                <span className="kyc-status-badge pending">Pending Review</span>
              </div>
              <div className="kyc-card-meta">
                <span className="meta-label">Certificate of Incorporation</span>
              </div>
              <div className="kyc-card-preview-area placeholder-bg">
                <div className="under-verification-placeholder">
                  <Clock size={40} className="hourglass-animate" />
                  <span>Under Verification</span>
                </div>
              </div>
              <div className="kyc-card-actions two-buttons">
                <button className="kyc-btn-secondary cursor-pointer" type="button" onClick={() => addToast("Viewing uploaded COI document...", "success")}>View</button>
                <button className="kyc-btn-secondary cursor-pointer" type="button" onClick={() => addToast("COI replacement upload request sent to partner.", "success")}>Replace</button>
              </div>
            </div>

            {/* 4. Bank Proof */}
            <div className="kyc-card">
              <div className="kyc-card-header">
                <h3>Bank Proof</h3>
                <span className="kyc-status-badge approved">Approved</span>
              </div>
              <div className="kyc-card-meta">
                <span className="meta-label">Cancelled Cheque or Bank Statement</span>
              </div>
              <div className="kyc-card-preview-area">
                <img
                  className="kyc-preview-img"
                  src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80"
                  alt="Bank Proof Cheque"
                />
              </div>
              <div className="kyc-card-actions">
                <button className="kyc-btn-secondary icon-right cursor-pointer" type="button" onClick={() => addToast("Viewing HDFC cancelled cheque details...", "success")}>
                  <ExternalLink size={14} />
                  <span>View Document</span>
                </button>
              </div>
            </div>

            {/* 5. Owner ID Proof */}
            <div className="kyc-card">
              <div className="kyc-card-header">
                <h3>Owner ID Proof</h3>
                <span className="kyc-status-badge reupload">Re-upload Needed</span>
              </div>
              <div className="kyc-card-meta">
                <span className="meta-label">Aadhaar/Passport of Principal Officer</span>
              </div>
              <div className="kyc-card-preview-area placeholder-bg warning-border">
                <div className="blurry-warning-placeholder">
                  <AlertTriangle size={32} className="warning-icon-red" />
                  <strong>Blurry Image</strong>
                  <span>Please ensure all edges are visible.</span>
                </div>
              </div>
              <div className="kyc-card-actions">
                <button className="kyc-btn-danger icon-right cursor-pointer" type="button" onClick={() => addToast("Redirecting to file uploader to submit new Owner ID...", "success")}>
                  <Upload size={14} />
                  <span>Upload New ID</span>
                </button>
              </div>
            </div>

          </div>

          {/* Compliance Activity Feed Timeline */}
          <div className="compliance-feed-section">
            <h2>Compliance Activity Feed</h2>
            <div className="feed-timeline">
              
              <div className="feed-item">
                <div className="feed-icon-circle success-bg">
                  <ShieldCheck size={18} />
                </div>
                <div className="feed-content-wrap">
                  <div className="feed-text-row">
                    <strong>System automatically verified GSTIN status with official portal.</strong>
                  </div>
                  <span className="feed-time">Today at 10:45 AM</span>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-icon-circle user-bg">
                  <User size={18} />
                </div>
                <div className="feed-content-wrap">
                  <div className="feed-text-row">
                    <strong>Ananya R. (Compliance Officer) flagged Owner ID for re-upload.</strong>
                    <p className="feed-quote">
                      "The submitted Aadhaar copy is blurry and the last four digits are not legible."
                    </p>
                  </div>
                  <span className="feed-time">Yesterday at 4:12 PM</span>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-icon-circle upload-bg">
                  <Upload size={18} />
                </div>
                <div className="feed-content-wrap">
                  <div className="feed-text-row">
                    <strong>Partner uploaded Certificate of Incorporation.</strong>
                  </div>
                  <span className="feed-time">Oct 14, 2023 at 2:30 PM</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : activeSubTab === 'Services' ? (
        <div className="overview-tab-content">
          <div className="panel overview-card">
            <div className="flex justify-between items-center mb-6">
              <div className="service-card-title-wrap">
                <div className="title-icon-circle purple-bg">
                  <Activity size={16} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Active Operational Services</h2>
                  <p>Primary freight, parcel delivery, and cold chain services active on Hozify.</p>
                </div>
              </div>
              <button 
                onClick={() => addToast("Route addition panel initialized.", "success")}
                className="primary-action-btn font-bold cursor-pointer"
                style={{ height: "36px", padding: "0 16px", fontSize: "12px" }}
              >
                + Add Service Route
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Enterprise Freight & Bulk Logistics", sla: "99.8%", status: "ACTIVE", type: "Heavy Cargo" },
                { title: "Last-Mile Distribution & Routing", sla: "99.5%", status: "ACTIVE", type: "Parcels / Packets" },
                { title: "Cold Chain Logistics (Refrigerated)", sla: "100%", status: "PENDING AUDIT", type: "Perishables" }
              ].map((service, idx) => (
                <div key={idx} className="border rounded-xl p-4 bg-slate-50 border-slate-100 flex flex-col justify-between" style={{ minHeight: "150px" }}>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{service.type}</span>
                    <h3 className="font-bold text-slate-800 mt-1 text-sm">{service.title}</h3>
                    <div className="flex justify-between mt-3 text-xs">
                      <span className="text-slate-500">SLA Guarantee:</span>
                      <strong className="text-slate-800">{service.sla}</strong>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-200">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                      service.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>{service.status}</span>
                    <button 
                      onClick={() => addToast(`Managing route parameters for: ${service.title}`, "success")}
                      className="text-[#2a2454] text-xs font-black hover:underline cursor-pointer bg-none border-none"
                    >
                      Manage Route
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Branches' ? (
        <div className="overview-tab-content">
          <div className="panel overview-card">
            <div className="flex justify-between items-center mb-6">
              <div className="service-card-title-wrap">
                <div className="title-icon-circle blue-bg">
                  <Building size={16} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Regional Dispatch Hubs</h2>
                  <p>Active warehousing, logistics centers, and freight depots.</p>
                </div>
              </div>
              <button 
                onClick={() => addToast("Regional hub creation modal initialized.", "success")}
                className="primary-action-btn font-bold cursor-pointer"
                style={{ height: "36px", padding: "0 16px", fontSize: "12px" }}
              >
                + Add Hub
              </button>
            </div>

            <div className="space-y-4">
              {[
                { name: "Jersey City Central Hub", address: "100 Industrial Pkwy, Jersey City, NJ 07302", fleet: "45 Active Vans", manager: "Liam Chen", status: "ACTIVE" },
                { name: "East Boston Depot", address: "450 Logistics Ave, East Boston, MA 02128", fleet: "25 Delivery Trucks", manager: "Sofia Rodriguez", status: "ACTIVE" },
                { name: "Queens Next-Gen Terminal", address: "12-40 Distribution Blvd, Queens, NY 11101", fleet: "15 Fleet Units", manager: "Marcus Wu", status: "PENDING SETUP" }
              ].map((hub, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{hub.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{hub.address}</p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span>Fleet: <strong className="text-slate-700">{hub.fleet}</strong></span>
                      <span>Liaison: <strong className="text-slate-700">{hub.manager}</strong></span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                      hub.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>{hub.status}</span>
                    <button 
                      onClick={() => addToast(`Auditing branch inventory for ${hub.name}...`, "success")}
                      className="text-xs font-bold border border-slate-350 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      Audit Hub
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Employees' ? (
        <div className="overview-tab-content">
          <div className="panel overview-card">
            <div className="flex justify-between items-center mb-6">
              <div className="service-card-title-wrap">
                <div className="title-icon-circle orange-bg">
                  <User size={16} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Registered Staff & Commercial Fleet Drivers</h2>
                  <p>Active driver profiles, dispatch operators, and administrators roster.</p>
                </div>
              </div>
              <button 
                onClick={() => addToast("Driver registration board initialized.", "success")}
                className="primary-action-btn font-bold cursor-pointer"
                style={{ height: "36px", padding: "0 16px", fontSize: "12px" }}
              >
                + Register Driver
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: "13px" }}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                    <th className="p-4 font-bold">Employee ID</th>
                    <th className="font-bold">Staff Name</th>
                    <th className="font-bold">Operational Role</th>
                    <th className="font-bold">License Class</th>
                    <th className="font-bold">Verification Status</th>
                    <th className="font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "GLS-E481", name: "Daniel Kowalski", role: "Delivery Lead Driver", license: "Class A Commercial", status: "VERIFIED" },
                    { id: "GLS-E902", name: "Jessica Miller", role: "Dispatch Controller", license: "N/A (HQ Liaison)", status: "VERIFIED" },
                    { id: "GLS-E114", name: "David Lin", role: "Freight Transit Driver", license: "Class B Commercial", status: "VERIFIED" }
                  ].map((emp, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#2a2454]">{emp.id}</td>
                      <td className="font-semibold text-slate-800">{emp.name}</td>
                      <td className="text-slate-500">{emp.role}</td>
                      <td className=" text-xs text-slate-600">{emp.license}</td>
                      <td>
                        <span className="text-[9px] font-black bg-green-150 text-green-700 px-2 py-0.5 rounded">
                          {emp.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          onClick={() => addToast(`Opening credential portfolio for ${emp.name}`, "success")}
                          className="text-indigo-600 hover:underline font-bold cursor-pointer bg-none border-none text-xs"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Wallet' ? (
        <div className="overview-tab-content space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
              <p className="text-xs text-slate-400 font-bold uppercase">Escrow Wallet Balance</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">₹4,89,102.50</h3>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => addToast("Withdrawal escrow payout initiated.", "success")}
                  className="flex-1 py-1.5 text-center text-xs font-bold bg-[#0b1329] text-white rounded-lg cursor-pointer"
                >
                  Request Payout
                </button>
                <button 
                  onClick={() => addToast("Escrow deposit panel initialized.", "success")}
                  className="flex-1 py-1.5 text-center text-xs font-bold border border-slate-300 rounded-lg cursor-pointer bg-white"
                >
                  Deposit Funds
                </button>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
              <p className="text-xs text-slate-400 font-bold uppercase">Security Reserve Held</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">₹1,50,000.00</h3>
              <p className="text-xs text-slate-500 mt-4 font-semibold">Mandatory security bond ledger status: <span className="text-green-600 font-bold">LOCKED & VERIFIED</span></p>
            </div>
            <div className="bg-white border rounded-xl p-5 hover:shadow-md transition">
              <p className="text-xs text-slate-400 font-bold uppercase">Next Settlement Date</p>
              <h3 className="text-3xl font-black text-[#2a2454] mt-2">05 July 2026</h3>
              <p className="text-xs text-slate-500 mt-4 font-semibold">Automatic direct deposit cycle: <span className="font-bold">Weekly Friday</span></p>
            </div>
          </div>

          <div className="panel overview-card">
            <h3 className="font-bold text-lg mb-4">Escrow Settlements Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: "13px" }}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                    <th className="p-4 font-bold">Transaction Reference</th>
                    <th className="font-bold">Settlement Amount</th>
                    <th className="font-bold">Settled Date</th>
                    <th className="font-bold">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ref: "GLS-W1922871", amount: "₹1,24,900.00", date: "25 Jun 2026", status: "Successful" },
                    { ref: "GLS-W1921102", amount: "₹98,400.00", date: "18 Jun 2026", status: "Successful" }
                  ].map((tx, idx) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="p-4  font-bold text-[#2a2454]">{tx.ref}</td>
                      <td className="font-bold text-slate-800">{tx.amount}</td>
                      <td className="text-slate-500">{tx.date}</td>
                      <td>
                        <span className="text-[9px] font-black bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-150">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Banking' ? (
        <div className="overview-tab-content">
          <div className="panel overview-card">
            <div className="service-card-title-wrap mb-6">
              <div className="title-icon-circle purple-bg">
                <Building size={16} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Verified Corporate Settlement Bank</h2>
                <p>Direct deposit configuration for dispatch payout settlements.</p>
              </div>
            </div>

            <div className="border border-indigo-100 bg-indigo-50/20 rounded-2xl p-6 max-w-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black bg-indigo-150 text-indigo-750 px-2.5 py-1 rounded-full uppercase tracking-wider">Disbursement Account</span>
                  <h3 className="text-lg font-black text-slate-800 mt-3">HDFC Enterprise Bank</h3>
                  <p className="text-xs text-slate-500 mt-1">Current Corporate Clearing Account</p>
                </div>
                <span className="text-[10px] font-black bg-green-105 text-green-700 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-green-200">
                  <CheckCircle size={12} />
                  <span>Verified Node</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6 text-xs border-t border-slate-200 pt-4">
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Account Beneficiary:</span>
                  <span className="font-black text-slate-700">Global Logistics Solutions Ltd.</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Account Number:</span>
                  <span className=" font-bold text-slate-700">50200088921102 (Masked)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">IFSC / Routing Code:</span>
                  <span className=" font-bold text-slate-700">HDFC0000104</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Clearing Branch:</span>
                  <span className="font-bold text-slate-700">Fort Branch, Mumbai, MH</span>
                </div>
              </div>

              <div className="flex gap-2 mt-8 pt-4 border-t border-slate-200">
                <button 
                  onClick={() => addToast("Disbursement routing alteration panel requested.", "success")}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Change Routing
                </button>
                <button 
                  onClick={() => addToast("Downloading current cancelled cheque upload...", "success")}
                  className="px-4 py-2 bg-[#0b1329] text-white rounded-lg text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-sm"
                >
                  Download Cancelled Cheque
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Revenue' ? (
        <div className="overview-tab-content space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Lifetime Billings", value: "₹45,82,900.00", color: "text-slate-800" },
              { label: "Commission Deducted", value: "₹6,87,435.00", color: "text-slate-500" },
              { label: "Net Earnings Disbursed", value: "₹38,95,465.00", color: "text-indigo-750" },
              { label: "Quarter Growth Rate", value: "+14.2% YoY", color: "text-green-600" }
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white border rounded-xl p-5 hover:shadow-md transition">
                <p className="text-xs text-slate-400 font-bold uppercase">{kpi.label}</p>
                <h3 className={`text-2xl font-black mt-2 ${kpi.color}`}>{kpi.value}</h3>
              </div>
            ))}
          </div>

          <div className="panel overview-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Operational Dispatch Earnings Split</h3>
              <button 
                onClick={() => addToast("GST financial statement downloaded successfully.", "success")}
                className="secondary-action-btn font-bold cursor-pointer"
              >
                <Download size={14} /> Export Statements
              </button>
            </div>

            <div className="space-y-4">
              {[
                { area: "Heavy Route Distribution (NY-NJ Bulk)", gross: "₹28,40,000.00", net: "₹24,14,000.00", comm: "15%" },
                { area: "Last-Mile Delivery Roster (MA Parcels)", gross: "₹12,42,900.00", net: "₹10,56,465.00", comm: "15%" },
                { area: "Cold Chain Refrigerated Delivery (NY Perishables)", gross: "₹5,00,000.00", net: "₹4,25,000.00", comm: "15%" }
              ].map((split, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <div className="flex justify-between items-center font-bold text-slate-800">
                    <span className="text-sm font-black">{split.area}</span>
                    <span className="text-[#2a2454] text-sm">{split.net} (Net)</span>
                  </div>
                  <div className="flex gap-6 mt-3 text-slate-500 font-semibold">
                    <span>Gross: <strong className="text-slate-700">{split.gross}</strong></span>
                    <span>Hozify Fee: <strong className="text-slate-700">{split.comm}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeSubTab === 'Reviews' ? (
        <div className="overview-tab-content space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border rounded-xl p-5 text-center">
              <p className="text-xs text-slate-400 font-bold uppercase">Average Rating</p>
              <h3 className="text-4xl font-black text-slate-900 mt-2">4.9 / 5.0</h3>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-yellow-500 border-none" />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 font-semibold">Calculated from 240 verified shipments</p>
            </div>
            <div className="bg-white border rounded-xl p-5 text-center">
              <p className="text-xs text-slate-400 font-bold uppercase">SLA Fulfillment Index</p>
              <h3 className="text-4xl font-black text-green-600 mt-2">99.8%</h3>
              <p className="text-xs text-slate-400 mt-5 font-semibold">Guaranteed response SLA delivery uptime</p>
            </div>
            <div className="bg-white border rounded-xl p-5 text-center">
              <p className="text-xs text-slate-400 font-bold uppercase">Cargo Safety Index</p>
              <h3 className="text-4xl font-black text-[#2a2454] mt-2">100%</h3>
              <p className="text-xs text-slate-400 mt-5 font-semibold">Zero reported transit damages this quarter</p>
            </div>
          </div>

          <div className="panel overview-card">
            <h3 className="font-bold text-lg mb-4">Recent Client Performance Reviews</h3>
            <div className="space-y-4">
              {[
                { author: "Admin John D. (Operations Lead)", stars: 5, date: "2 days ago", comment: "Very professional delivery team. Handled bulk cargo safely and updated shipment status in real time." },
                { author: "Sofia Rodriguez (Mass Depot Specialist)", stars: 5, date: "1 week ago", comment: "SLA was met perfectly for our Massachusetts logistics route. Driver was courteous and verified manifest." }
              ].map((rev, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <div className="flex justify-between items-center font-bold text-slate-800">
                    <span className="font-black text-slate-700">{rev.author}</span>
                    <span className="text-slate-400 font-semibold">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" className="text-yellow-500 border-none" />
                    ))}
                  </div>
                  <p className="text-slate-600 mt-2 italic font-semibold leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="tab-placeholder-content">
          <h2>{activeSubTab} Content</h2>
          <p>This tab's configuration is currently under review or awaiting partner integration.</p>
        </div>
      )}

      {/* ========================================================
          MODAL: CONTACT PARTNER
          ======================================================== */}
      {activeModal === "contact" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Contact {partnerName}</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Send a message to Sarah Jenkins (Account Liaison).</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Direct Message</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Hi Sarah, please update the blurry Aadhaar ID document as soon as possible to finish registration."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 focus:outline-none focus:border-[#25108f] resize-none font-semibold text-slate-700"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitContactMessage}
                  disabled={isSendingMessage}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform flex items-center justify-center gap-1.5"
                >
                  {isSendingMessage && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{isSendingMessage ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT PARTNER PROFILE
          ======================================================== */}
      {activeModal === "edit" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Edit Partner Profile</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Modify profile meta information details.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Business / Entity Name</label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold text-slate-750"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Liaison Direct Email</label>
                  <input
                    type="email"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold text-slate-750"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Liaison Direct Phone</label>
                  <input
                    type="text"
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold text-slate-750"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Operational Radius (KM)</label>
                <input
                  type="number"
                  value={partnerRadius}
                  onChange={(e) => setPartnerRadius(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold text-slate-750"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2 text-center border border-slate-200 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveProfileChanges}
                  disabled={isSaving}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform flex items-center justify-center gap-1.5"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </AdminShell>
  );
}
