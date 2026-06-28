import React, { useState } from 'react';
import { Plus, Download, SlidersHorizontal, MoreVertical, ChevronLeft, ChevronRight, Star, Settings } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import AdminShell from '../../components/layouts/AdminShell';

const mockServices = [
  { id: 'SRV-001', name: 'Premium Cleaning', category: 'Maintenance', branch: 'Downtown Hub', price: '$120', rating: 4.8, status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669' },
  { id: 'SRV-002', name: 'Express Delivery', category: 'Logistics', branch: 'Riverview North', price: '$45', rating: 4.5, status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669' },
  { id: 'SRV-003', name: 'Equipment Repair', category: 'Technical', branch: 'Liberty Peak', price: '$250', rating: 3.9, status: 'INACTIVE', statusBg: '#fef3c7', statusColor: '#d97706' },
  { id: 'SRV-004', name: 'Security Audit', category: 'Consulting', branch: 'East Side Depot', price: '$500', rating: 4.9, status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669' },
  { id: 'SRV-005', name: 'Pest Control', category: 'Maintenance', branch: 'Pacific Shore Line', price: '$85', rating: 4.2, status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669' },
];

export default function BranchServices() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [showExportModal, setShowExportModal] = useState(false); // State to handle English pop-up

  const filteredServices = mockServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  // Click handler for Add Service button
  const handleAddService = () => {
    alert('Add Service clicked! Opening service creation form...');
  };

  // Function to handle actual document generation/download
  const triggerDownload = (format) => {
    alert(`Preparing your download...\nYour data is being exported as an ${format} document.`);
    setShowExportModal(false);
  };

  return (
    <AdminShell
      activeTab="Branch Management"
      headerTitle="Branch Services"
      searchPlaceholder="Search services..."
    >
      <div className="branch-inventory-container" style={{ position: 'relative' }}>
        {/* Page Header */}
        <div className="partners-page-header">
          <div>
            <h1 className="page-title">Branch Services</h1>
            <p className="page-subtitle">Manage and monitor service offerings across all branches.</p>
          </div>
          <div className="partners-header-buttons" style={{ position: 'relative' }}>
            <button 
              className="primary-action-btn font-bold" 
              style={{ height: '36px', cursor: 'pointer' }}
              onClick={handleAddService}
            >
              <Plus size={14} style={{ marginRight: '4px' }} />
              <span>Add Service</span>
            </button>
            
            <button 
              className="secondary-action-btn font-bold" 
              type="button" 
              style={{ height: '36px', cursor: 'pointer' }}
              onClick={() => setShowExportModal(!showExportModal)}
            >
              <Download size={14} style={{ marginRight: '4px' }} />
              <span>Export Data</span>
            </button>

            {/* Custom English Pop-up / Dropdown Menu for Export Document Formats */}
            {showExportModal && (
              <div style={{
                position: 'absolute',
                top: '42px',
                right: '0',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 100,
                width: '240px',
                padding: '8px 0'
              }}>
                <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', borderBottom: '1px solid #f3f4f6' }}>
                  Select Document Format
                </div>
                <button 
                  onClick={() => triggerDownload('Excel Spreadsheet (.xlsx)')}
                  style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', padding: '10px 16px', fontSize: '13px', color: '#1f2937', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  📊 <span>Excel Spreadsheet (.xlsx)</span>
                </button>
                <button 
                  onClick={() => triggerDownload('CSV Delimited (.csv)')}
                  style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', padding: '10px 16px', fontSize: '13px', color: '#1f2937', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  📝 <span>CSV Document (.csv)</span>
                </button>
                <button 
                  onClick={() => triggerDownload('PDF Report (.pdf)')}
                  style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', padding: '10px 16px', fontSize: '13px', color: '#1f2937', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  📕 <span>PDF Print Report (.pdf)</span>
                </button>
                <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '4px', padding: '4px 8px 0 8px' }}>
                  <button 
                    onClick={() => setShowExportModal(false)}
                    style={{ width: '100%', border: 'none', background: '#f3f4f6', borderRadius: '4px', padding: '6px', fontSize: '12px', fontWeight: '600', color: '#4b5563', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Section KPIs Row */}
        <style>{`
          .branch-kpi-grid {
            display: grid;
            gap: 16px;
            margin-bottom: 24px;
          }
          @media (min-width: 1024px) { .branch-kpi-grid { grid-template-columns: repeat(6, 1fr); } }
          @media (min-width: 768px) and (max-width: 1023px) { .branch-kpi-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 767px) { .branch-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
          .branch-kpi-card {
            padding: 16px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 105px;
          }
          .branch-kpi-card .truncate-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }

          /* Excel Spreadsheet Formatting Styling */
          .excel-style-table {
            width: 100%;
            border-collapse: collapse;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 13px;
            background-color: #ffffff;
          }
          .excel-style-table th {
            background-color: #f3f4f6;
            color: #374151;
            font-weight: 600;
            text-align: left;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          .excel-style-table td {
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            color: #4b5563;
            vertical-align: middle;
          }
          .excel-style-table tbody tr:nth-child(even) {
            background-color: #f9fafb;
          }
          .excel-style-table tbody tr:hover {
            background-color: #f0fdf4; /* Light green sheet row select effect */
          }
        `}</style>
        
        <section className="branch-kpi-grid">
          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Services</span>
              <span>📦</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>458</strong>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+12 new this week</span>
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Active</span>
              <span>✅</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>412</strong>
            <div style={{ height: '4px', background: '#10b981', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Inactive</span>
              <span>⏸️</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>46</strong>
            <div style={{ height: '4px', background: '#f59e0b', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Categories</span>
              <span>📑</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>18</strong>
            <div style={{ height: '4px', background: '#3b82f6', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Top Category</span>
              <span>⭐</span>
            </span>
            <strong className="truncate-text" style={{ fontSize: '15px', color: '#4f46e5', margin: '6px 0', fontWeight: '800' }}>Maintenance</strong>
            <span className="truncate-text" style={{ fontSize: '11px', color: 'var(--muted)' }}>42% of revenue</span>
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Avg Rating</span>
              <span>🌟</span>
            </span>
            <strong className="truncate-text" style={{ fontSize: '15px', color: '#eab308', margin: '6px 0', fontWeight: '800' }}>4.6 / 5.0</strong>
            <span className="truncate-text" style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+0.2 from last month</span>
          </div>
        </section>

        {/* Main Table Panel */}
        <section className="panel partner-directory-panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0' }}>
              Service Catalog
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="dash-search" style={{ width: '220px', margin: 0, height: '32px' }}>
                <input
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ fontSize: '12px', paddingLeft: '8px' }}
                />
              </div>
              <button className="secondary-action-btn" style={{ height: '32px', width: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SlidersHorizontal size={14} />
              </button>
              <button className="secondary-action-btn" style={{ height: '32px', width: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MoreVertical size={14} />
              </button>
            </div>
          </div>

<<<<<<< HEAD
          <div className="table-wrap">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="partner-table">
=======
          <div className="table-wrap" style={{ border: '1px solid #d1d5db', borderRadius: '4px', overflow: 'hidden' }}>
            <table className="excel-style-table">
>>>>>>> 94fd7cb (Updated partner modules and export components)
              <thead>
                <tr>
                  <th>SERVICE ID</th>
                  <th>SERVICE NAME</th>
                  <th>CATEGORY</th>
                  <th>PRIMARY BRANCH</th>
                  <th>BASE PRICE</th>
                  <th>RATING</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span style={{ color: '#4f46e5', fontWeight: '700' }}>{row.id}</span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.branch}</td>
                    <td style={{ fontWeight: '700', color: '#111827' }}>{row.price}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontSize: '12px' }}>
                        <Star size={12} fill="#eab308" stroke="#eab308" />
                        {row.rating}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          color: row.statusColor,
                          background: row.statusBg
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }}>
                        <Settings size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
            
            {filteredServices.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px', borderTop: '1px solid #e5e7eb' }}>
                No services found matching your criteria.
              </div>
            )}
          </div>

          <div className="directory-table-footer" style={{ marginTop: '16px' }}>
            <span className="footer-results-text">Showing {filteredServices.length} of 458 services</span>
            <div className="pagination-wrap">
              <button className="pag-nav-btn" type="button" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="pag-num-btn active" type="button">1</button>
              <button className="pag-num-btn" type="button">2</button>
              <button className="pag-num-btn" type="button">3</button>
              <button className="pag-nav-btn" type="button">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}