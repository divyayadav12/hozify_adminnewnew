import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckSquare,
  Clock,
  AlertTriangle,
  Star,
  Landmark,
  Download,
  Layers,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  X,
  Loader2
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import KpiCard from '../../features/dashboard/KpiCard';
import AdminShell from '../../components/layouts/AdminShell';
import ExportReportModal from '../../components/common/ExportReportModal';
import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';

import Select from "../../components/ui/Select";

// Render styled logos directly using inline SVGs to match the Figma mockups pixel-perfectly
function PartnerLogo({ style }) {
  if (style === 'nexus') {
    return (
      <svg className="partner-logo-svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#232526" />
        <line x1="8" y1="11" x2="24" y2="11" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="16" x2="24" y2="16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="21" x2="24" y2="21" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (style === 'swift') {
    return (
      <svg className="partner-logo-svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#0b0f19" />
        <circle cx="16" cy="16" r="6" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="16" cy="16" r="2" fill="#38bdf8" />
      </svg>
    );
  }
  if (style === 'global') {
    return (
      <svg className="partner-logo-svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#0d1b15" />
        <circle cx="16" cy="16" r="8" fill="none" stroke="#10b981" strokeWidth="2" />
        <path d="M10 13 A 6 6 0 0 0 22 13" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <path d="M10 19 A 6 6 0 0 1 22 19" fill="none" stroke="#10b981" strokeWidth="1.5" />
      </svg>
    );
  }
  if (style === 'metro') {
    return (
      <svg className="partner-logo-svg" width="32" height="32" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#111827" />
        <line x1="6" y1="26" x2="26" y2="6" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="2.5" fill="#ffffff" />
      </svg>
    );
  }
  return (
    <div className="partner-logo-placeholder">
      <span>P</span>
    </div>
  );
}

const initialPartnersList = [
  {
    id: '#PRT-9021',
    name: 'Nexus Logistics',
    established: 2018,
    owner: 'Marcus Thorne',
    logoStyle: 'nexus',
    type: 'ISP',
    city: 'Chicago, IL',
    rating: 4.9,
    wallet: '$12,450.00',
    status: 'Active'
  },
  {
    id: '#PRT-7842',
    name: 'Swift Delivery Co',
    established: 2021,
    owner: 'Elena Rodriguez',
    logoStyle: 'swift',
    type: 'BSP',
    city: 'Austin, TX',
    rating: 4.7,
    wallet: '$5,820.00',
    status: 'Pending'
  },
  {
    id: '#PRT-5510',
    name: 'Global Retail Solutions',
    established: 2015,
    owner: 'David Chen',
    logoStyle: 'global',
    type: 'Seller',
    city: 'Seattle, WA',
    rating: 4.2,
    wallet: '$22,900.00',
    status: 'Suspended'
  },
  {
    id: '#PRT-1123',
    name: 'Metro Freight Systems',
    established: 2019,
    owner: 'Sarah Jenkins',
    logoStyle: 'metro',
    type: 'ISP',
    city: 'Denver, CO',
    rating: 4.8,
    wallet: '$3,150.00',
    status: 'Active'
  }
];

export default function Partners() {
  const { navigate, setCurrentPartnerId } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeDropdownMenu, setActiveDropdownMenu] = useState(null);

  // Stateful partner data
  const [partners, setPartners] = useState(initialPartnersList);
  const [selectedPartners, setSelectedPartners] = useState([]);
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'bulk' | 'edit'
  const [bulkActionType, setBulkActionType] = useState("Activate");
  const [isApplyingBulk, setIsApplyingBulk] = useState(false);

  // Edit partner row details state
  const [editPartnerId, setEditPartnerId] = useState("");
  const [editPartnerName, setEditPartnerName] = useState("");
  const [editPartnerOwner, setEditPartnerOwner] = useState("");
  const [editPartnerCity, setEditPartnerCity] = useState("");

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdownMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePartnerClick = (partner) => {
    setCurrentPartnerId(partner.id);
    navigate(ROUTES.partnerDetails);
  };

  const togglePartnerSelection = (id) => {
    setSelectedPartners(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const toggleAllPartners = () => {
    if (selectedPartners.length === filteredPartners.length) {
      setSelectedPartners([]);
    } else {
      setSelectedPartners(filteredPartners.map(p => p.id));
    }
  };

  const handleBulkActionsClick = () => {
    if (selectedPartners.length === 0) {
      toast.error("Please select one or more partners to apply bulk action.");
      return;
    }
    setActiveModal("bulk");
  };

  const applyBulkAction = () => {
    setIsApplyingBulk(true);
    setTimeout(() => {
      setPartners(prev => prev.map(p => {
        if (selectedPartners.includes(p.id)) {
          return { ...p, status: bulkActionType === "Activate" ? "Active" : "Suspended" };
        }
        return p;
      }));
      setIsApplyingBulk(false);
      toast.success(`Bulk ${bulkActionType === "Activate" ? "activation" : "suspension"} successfully applied to ${selectedPartners.length} partners!`);
      setSelectedPartners([]);
      setActiveModal(null);
    }, 1200);
  };

  const handleEditRow = (partner) => {
    setEditPartnerId(partner.id);
    setEditPartnerName(partner.name);
    setEditPartnerOwner(partner.owner);
    setEditPartnerCity(partner.city);
    setActiveModal("edit");
  };

  const saveRowEdit = () => {
    if (!editPartnerName.trim() || !editPartnerOwner.trim() || !editPartnerCity.trim()) {
      toast.error("All details are required to update the partner profile.");
      return;
    }
    setPartners(prev => prev.map(p => {
      if (p.id === editPartnerId) {
        return { ...p, name: editPartnerName, owner: editPartnerOwner, city: editPartnerCity };
      }
      return p;
    }));
    toast.success("Partner details successfully updated!");
    setActiveModal(null);
  };

  const handleToggleStatusRow = (partner) => {
    setPartners(prev => prev.map(p => {
      if (p.id === partner.id) {
        const nextStatus = p.status === 'Suspended' ? 'Active' : 'Suspended';
        toast.success(`Partner ${p.name} status updated to ${nextStatus}.`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleDeleteRow = (partnerId) => {
    setPartners(prev => prev.filter(p => p.id !== partnerId));
    setSelectedPartners(prev => prev.filter(pId => pId !== partnerId));
    toast.success("Partner successfully removed from registry.");
  };

  const filteredPartners = partners.filter((p) => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const kpiCardsData = [
    { title: 'Total Partners', value: '1,284', topLabel: '+4%', topLabelClass: 'green-text trend-icon', icon: Users },
    { title: 'Active Partners', value: '1,102', topLabel: 'Active', topLabelClass: 'gray-badge', icon: CheckSquare },
    { title: 'Pending Approvals', value: '45', topLabel: '12 New', topLabelClass: 'orange-badge', icon: Clock },
    { title: 'Suspended', value: '28', topLabel: '-2%', topLabelClass: 'red-text trend-icon-down', icon: AlertTriangle },
    { title: 'Top Rated', value: '210', topLabel: '4.8 Avg', topLabelClass: 'yellow-badge', icon: Star },
    { title: 'Settlement Pending', value: '$42k', icon: Landmark }
  ];

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search partners, IDs, or cities..."
      searchValue={search}
      onSearchChange={setSearch}
      pageTitle="Partner Management"
      pageSubtitle="Manage and monitor service providers across the HOZIFY partner network."
    >
      <div className="partners-page-header">
        <div>
          <h1 className="page-title">Partner Management</h1>
          <p className="page-subtitle">Manage and monitor service providers across the HOZIFY network.</p>
        </div>
        <div className="partners-header-buttons">
          <button 
            className="secondary-action-btn cursor-pointer" 
            type="button"
            onClick={() => setIsExportModalOpen(true)}
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="secondary-action-btn cursor-pointer" type="button" onClick={handleBulkActionsClick}>
            <Layers size={16} />
            <span>Bulk Actions</span>
          </button>
        </div>
      </div>
      <GlobalDashboardFilters />
      <section className="kpi-grid partners-kpis">
        {kpiCardsData.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} />
        ))}
      </section>
      <section className="panel partner-directory-panel">
        <div className="directory-panel-header">
          <h2>Partner Directory</h2>
          <div className="segmented-tab-filter">
            <button
              className={filter === 'All' ? 'active' : ''}
              onClick={() => setFilter('All')}
              type="button"
            >
              All
            </button>
            <button
              className={filter === 'Active' ? 'active' : ''}
              onClick={() => setFilter('Active')}
              type="button"
            >
              Active
            </button>
            <button
              className={filter === 'Pending' ? 'active' : ''}
              onClick={() => setFilter('Pending')}
              type="button"
            >
              Pending
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-responsive-wrapper">
<table className="partner-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', paddingLeft: '16px' }}>
                    <input 
                      type="checkbox" 
                      checked={filteredPartners.length > 0 && selectedPartners.length === filteredPartners.length} 
                      onChange={toggleAllPartners}
                      className="cursor-pointer"
                    />
                  </th>
                  <th>PARTNER ID</th>
                  <th>BUSINESS NAME</th>
                  <th>OWNER</th>
                  <th>TYPE</th>
                  <th>CITY</th>
                  <th>RATING</th>
                  <th>WALLET BALANCE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="partner-row-clickable" onClick={() => handlePartnerClick(partner)}>
                    <td style={{ paddingLeft: '16px' }} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedPartners.includes(partner.id)} 
                        onChange={() => togglePartnerSelection(partner.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="partner-id-cell">
                      <strong>{partner.id}</strong>
                    </td>
                    <td className="partner-name-cell">
                      <div className="partner-info-wrap">
                        <PartnerLogo style={partner.logoStyle} />
                        <div className="partner-name-meta">
                          <span className="partner-name-txt">{partner.name}</span>
                          <span className="partner-est-txt">Established {partner.established}</span>
                        </div>
                      </div>
                    </td>
                    <td className="partner-owner-cell">{partner.owner}</td>
                    <td>
                      <span className={`partner-type-badge ${partner.type.toLowerCase()}`}>
                        {partner.type}
                      </span>
                    </td>
                    <td>{partner.city}</td>
                    <td className="partner-rating-cell">
                      <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                      <span>{partner.rating}</span>
                    </td>
                    <td className="partner-balance-cell">{partner.wallet}</td>
                    <td>
                      <span className={`status-badge ${partner.status.toLowerCase()}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="partner-actions-cell" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="table-row-action-btn cursor-pointer" 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownMenu(activeDropdownMenu === partner.id ? null : partner.id);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeDropdownMenu === partner.id && (
                        <div 
                          className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1" 
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              handlePartnerClick(partner);
                              setActiveDropdownMenu(null);
                            }}
                          >
                            <Eye size={14} /> View Details
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              handleEditRow(partner);
                              setActiveDropdownMenu(null);
                            }}
                          >
                            <Edit size={14} /> Edit Partner
                          </button>
                          <button 
                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 cursor-pointer ${partner.status === 'Suspended' ? 'text-green-650' : 'text-orange-650'}`}
                            onClick={() => {
                              handleToggleStatusRow(partner);
                              setActiveDropdownMenu(null);
                            }}
                          >
                            {partner.status === 'Suspended' ? <CheckSquare size={14} /> : <AlertTriangle size={14} />}
                            {partner.status === 'Suspended' ? 'Activate' : 'Suspend'}
                          </button>
                          <div className="h-px bg-slate-100 my-1"></div>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-650 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              handleDeleteRow(partner.id);
                              setActiveDropdownMenu(null);
                            }}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: 'var(--spacing-page)' }}>
                      No partners found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
        </div>

        <div className="directory-table-footer">
          <span className="footer-results-text">Showing 1-{filteredPartners.length} of {partners.length} results</span>
          <div className="pagination-wrap">
            <button className="pag-nav-btn" type="button" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="pag-num-btn active" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>1</button>
            <button className="pag-num-btn" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>2</button>
            <button className="pag-num-btn" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>3</button>
            <span className="pag-ellipsis">...</span>
            <button className="pag-num-btn" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>321</button>
            <button className="pag-nav-btn" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
      <footer className="partner-page-bottom-strip">
        <div className="strip-left">
          <span className="status-dot-green">●</span>
          <span>SYSTEM ONLINE</span>
          <span className="vertical-sep">|</span>
          <span>VERSION 2.4.0-ENTERPRISE</span>
        </div>
        <div className="strip-right">
          <span>LAST SYNC: 2 MINS AGO</span>
        </div>
      </footer>
      {/* ========================================================
          MODAL: BULK ACTIONS OPTIONS
          ======================================================== */}
      {activeModal === "bulk" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Bulk Partner Operations</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Applying changes to {selectedPartners.length} selected partners</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Select Action</label>
                <Select
                  value={bulkActionType}
                  onChange={(e) => setBulkActionType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                  options={[{
                    label: "Activate Account Operations",
                    value: "Activate"
                  }, {
                    label: "Suspend Account Operations",
                    value: "Suspend"
                  }]} />
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
                  onClick={applyBulkAction}
                  disabled={isApplyingBulk}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform flex items-center justify-center gap-1.5"
                >
                  {isApplyingBulk && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{isApplyingBulk ? "Applying..." : "Confirm Action"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================
          MODAL: EDIT INDIVIDUAL PARTNER
          ======================================================== */}
      {activeModal === "edit" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Edit Partner Meta</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Editing partner record: {editPartnerId}</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={editPartnerName}
                  onChange={(e) => setEditPartnerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Owner Name</label>
                <input
                  type="text"
                  value={editPartnerOwner}
                  onChange={(e) => setEditPartnerOwner(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Operating City & State</label>
                <input
                  type="text"
                  value={editPartnerCity}
                  onChange={(e) => setEditPartnerCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
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
                  onClick={saveRowEdit}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ExportReportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        entityName="Partners" 
        data={partners} 
      />
    </AdminShell>
  );
}
