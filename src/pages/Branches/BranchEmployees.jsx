import React, { useState } from 'react';
import { Download, SlidersHorizontal, MoreVertical, ChevronLeft, ChevronRight, UserCircle, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import AdminShell from '../../components/layouts/AdminShell';

const mockEmployees = [
  { id: 'EMP-1021', name: 'Sarah Jenkins', role: 'Branch Manager', department: 'Management', branch: 'Downtown Hub', status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669', joinDate: '2022-03-15' },
  { id: 'EMP-1045', name: 'Michael Chen', role: 'Field Technician', department: 'Operations', branch: 'Riverview North', status: 'ON LEAVE', statusBg: '#fef3c7', statusColor: '#d97706', joinDate: '2023-01-10' },
  { id: 'EMP-1088', name: 'Amanda Torres', role: 'Support Specialist', department: 'Customer Service', branch: 'Liberty Peak', status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669', joinDate: '2023-06-22' },
  { id: 'EMP-1102', name: 'David Smith', role: 'Security Officer', department: 'Security', branch: 'East Side Depot', status: 'INACTIVE', statusBg: '#fee2e2', statusColor: '#ef4444', joinDate: '2021-11-05' },
  { id: 'EMP-1150', name: 'Jessica Wong', role: 'Logistics Coordinator', department: 'Logistics', branch: 'Pacific Shore Line', status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669', joinDate: '2023-09-01' },
];

export default function BranchEmployees() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [showExportModal, setShowExportModal] = useState(false); // Modal display state

  const filteredEmployees = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  // Function to handle dynamic file download action
  const triggerDownload = (format) => {
    alert(`Preparing your employee data download...\nYour data is being exported as an ${format} document.`);
    setShowExportModal(false);
  };

  return (
    <AdminShell
      activeTab="Branch Management"
      headerTitle="Branch Employees"
      searchPlaceholder="Search employees..."
    >
      <div className="branch-inventory-container" style={{ position: 'relative' }}>
        {/* Page Header */}
        <div className="partners-page-header">
          <div>
            <h1 className="page-title">Branch Employees</h1>
            <p className="page-subtitle">Track workforce distribution, roles, and status across all branches.</p>
          </div>
          <div className="partners-header-buttons" style={{ position: 'relative' }}>
            <button 
              className="secondary-action-btn font-bold" 
              type="button" 
              style={{ height: '36px', cursor: 'pointer' }}
              onClick={() => setShowExportModal(!showExportModal)}
            >
              <Download size={14} style={{ marginRight: '4px' }} />
              <span>Export</span>
            </button>

            {/* Custom Dynamic Modal Pop-up for Exporting Document Formats */}
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

        {/* Dynamic Styling Overrides */}
        <style>{`
          .branch-kpi-grid {
            display: grid;
            gap: 16px;
            margin-bottom: 24px;
          }
          @media (min-width: 1024px) { .branch-kpi-grid { grid-template-columns: repeat(6, 1fr); } }
          @media (min-width: 768px) and (max-width: 1023px) { .branch-kpi-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 767px) { .branch-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
          
          /* Dark Blue Outline Border Design */
          .branch-kpi-card {
            padding: 16px;
            background: #fff;
            border: 1.5px solid #1e3a8a; 
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

          /* Excel spreadsheet layout architecture */
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
            border: 1px solid #d1d5db; /* Clean grey grid border lines */
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          .excel-style-table td {
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            color: #1f2937;
            vertical-align: middle;
          }
          .excel-style-table tbody tr:nth-child(even) {
            background-color: #f9fafb; /* Zebra Striping Row */
          }
          .excel-style-table tbody tr:hover {
            background-color: #e0f2fe; /* Spreadsheet cell row illumination */
          }
          .excel-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 2px; /* Flat modern grid box shapes */
            border: 1px solid currentColor;
            display: inline-block;
          }
        `}</style>

        {/* Top Section KPIs Row */}
        <section className="branch-kpi-grid">
          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Employees</span>
              <span>👥</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>2,450</strong>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+8% this year</span>
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Active</span>
              <span>🟢</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>2,280</strong>
            <div style={{ height: '4px', background: '#10b981', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>On Leave</span>
              <span>🌴</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>124</strong>
            <div style={{ height: '4px', background: '#f59e0b', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>New Joiners</span>
              <span>👋</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>46</strong>
            <div style={{ height: '4px', background: '#3b82f6', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Top Dept</span>
              <span>🏢</span>
            </span>
            <strong className="truncate-text" style={{ fontSize: '15px', color: '#4f46e5', margin: '6px 0', fontWeight: '800' }}>Operations</strong>
            <span className="truncate-text" style={{ fontSize: '11px', color: 'var(--muted)' }}>1,120 Employees</span>
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Turnover Rate</span>
              <span>🔄</span>
            </span>
            <strong className="truncate-text" style={{ fontSize: '15px', color: '#ef4444', margin: '6px 0', fontWeight: '800' }}>3.2%</strong>
            <span className="truncate-text" style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>-0.5% vs last year</span>
          </div>
        </section>

        {/* Main Table Panel */}
        <section className="panel partner-directory-panel" style={{ padding: '24px', marginBottom: '24px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0' }}>
              Employee Directory Spreadsheet View
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="dash-search" style={{ width: '220px', margin: 0, height: '32px' }}>
                <input
                  placeholder="Search name, role, dept..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ fontSize: '12px', paddingLeft: '8px', border: '1px solid #d1d5db', height: '100%', borderRadius: '4px' }}
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
          <div className="table-wrap" style={{ overflowX: 'auto' }}>
            <table className="excel-style-table">
>>>>>>> 94fd7cb (Updated partner modules and export components)
              <thead>
                <tr>
                  <th>EMPLOYEE ID</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>DEPARTMENT</th>
                  <th>PRIMARY BRANCH</th>
                  <th>JOIN DATE</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: '500', color: '#6b7280' }}>{row.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>
                          {row.name.charAt(0)}
                        </div>
                        <strong style={{ color: '#111827' }}>{row.name}</strong>
                      </div>
                    </td>
                    <td style={{ fontWeight: '500', color: 'var(--text)' }}>{row.role}</td>
                    <td>{row.department}</td>
                    <td>{row.branch}</td>
                    <td style={{ color: '#4b5563' }}>{row.joinDate}</td>
                    <td>
                      <span
                        className="excel-badge"
                        style={{
                          color: row.statusColor,
                          background: row.statusBg
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#9ca3af' }}>
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>

            {filteredEmployees.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', fontSize: '13px', border: '1px solid #e5e7eb', borderTop: 'none' }}>
                No employees found matching your criteria.
              </div>
            )}
          </div>

          <div className="directory-table-footer" style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="footer-results-text" style={{ fontSize: '12px', color: '#4b5563' }}>Showing {filteredEmployees.length} of 2,450 employees</span>
            <div className="pagination-wrap" style={{ display: 'flex', gap: '4px' }}>
              <button className="pag-nav-btn" type="button" disabled style={{ padding: '4px 8px', border: '1px solid #d1d5db', background: '#f3f4f6' }}>
                <ChevronLeft size={14} />
              </button>
              <button className="pag-num-btn active" type="button" style={{ padding: '4px 10px', border: '1px solid #1e3a8a', background: '#1e3a8a', color: '#fff', fontWeight: '600' }}>1</button>
              <button className="pag-num-btn" type="button" style={{ padding: '4px 10px', border: '1px solid #d1d5db', background: '#fff' }}>2</button>
              <button className="pag-num-btn" type="button" style={{ padding: '4px 10px', border: '1px solid #d1d5db', background: '#fff' }}>3</button>
              <span style={{ margin: '0 4px', color: '#9ca3af' }}>...</span>
              <button className="pag-num-btn" type="button" style={{ padding: '4px 10px', border: '1px solid #d1d5db', background: '#fff' }}>49</button>
              <button className="pag-nav-btn" type="button" style={{ padding: '4px 8px', border: '1px solid #d1d5db', background: '#fff' }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}