import React, { useState } from 'react';
import { Plus, Download, SlidersHorizontal, MoreVertical, ChevronLeft, ChevronRight, Calendar, DollarSign, Activity, Star, Settings } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import AdminShell from '../../components/layouts/AdminShell';

const mockBookings = [
  { id: 'BKG-9921', customer: 'Alice Cooper', service: 'Premium Cleaning', branch: 'Downtown Hub', date: '2023-10-25 14:00', amount: '$120.00', status: 'COMPLETED', statusBg: '#ecfdf5', statusColor: '#059669' },
  { id: 'BKG-9922', customer: 'John Doe', service: 'Equipment Repair', branch: 'Riverview North', date: '2023-10-25 15:30', amount: '$250.00', status: 'IN PROGRESS', statusBg: '#eff6ff', statusColor: '#3b82f6' },
  { id: 'BKG-9923', customer: 'Emma Watson', service: 'Pest Control', branch: 'Liberty Peak', date: '2023-10-26 09:00', amount: '$85.00', status: 'PENDING', statusBg: '#fef3c7', statusColor: '#d97706' },
  { id: 'BKG-9924', customer: 'Robert Stark', service: 'Security Audit', branch: 'East Side Depot', date: '2023-10-26 11:00', amount: '$500.00', status: 'PENDING', statusBg: '#fef3c7', statusColor: '#d97706' },
  { id: 'BKG-9925', customer: 'Sarah Connor', service: 'Express Delivery', branch: 'Pacific Shore Line', date: '2023-10-24 16:45', amount: '$45.00', status: 'CANCELLED', statusBg: '#fee2e2', statusColor: '#ef4444' },
];

export default function BranchBookings() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [showExportModal, setShowExportModal] = useState(false); // Dropdown toggler state

  const filteredBookings = mockBookings.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.customer.toLowerCase().includes(search.toLowerCase()) ||
    b.service.toLowerCase().includes(search.toLowerCase())
  );

  // Dynamic actions handles
  const handleCreateBooking = () => {
    alert('Create Booking clicked! Initializing secure booking configuration wizard...');
  };

  const triggerDownload = (format) => {
    alert(`Preparing your booking records...\nYour file is being exported successfully as an ${format} document.`);
    setShowExportModal(false);
  };

  return (
    <AdminShell
      activeTab="Branch Management"
      headerTitle="Branch Bookings"
      searchPlaceholder="Search bookings..."
    >
      <div className="branch-inventory-container" style={{ position: 'relative' }}>
        {/* Page Header */}
        <div className="partners-page-header">
          <div>
            <h1 className="page-title">Branch Bookings</h1>
            <p className="page-subtitle">Track service requests, scheduling, and revenue across branches.</p>
          </div>
          <div className="partners-header-buttons" style={{ position: 'relative' }}>
            <button 
              className="primary-action-btn font-bold" 
              style={{ height: '36px', cursor: 'pointer' }}
              onClick={handleCreateBooking}
            >
              <Plus size={14} style={{ marginRight: '4px' }} />
              <span>Create Booking</span>
            </button>
            
            <button 
              className="secondary-action-btn font-bold" 
              type="button" 
              style={{ height: '36px', cursor: 'pointer' }}
              onClick={() => setShowExportModal(!showExportModal)}
            >
              <Download size={14} style={{ marginRight: '4px' }} />
              <span>Export CSV</span>
            </button>

            {/* Excel Dynamic Format Picker Dropdown */}
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

        {/* CSS Layout Injector */}
        <style>{`
          .branch-kpi-grid {
            display: grid;
            gap: 16px;
            margin-bottom: 24px;
          }
          @media (min-width: 1024px) { .branch-kpi-grid { grid-template-columns: repeat(6, 1fr); } }
          @media (min-width: 768px) and (max-width: 1023px) { .branch-kpi-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 767px) { .branch-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
          
          /* Dark Blue Outline Style Borders for Cards */
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

          /* Clean Excel Sheet Structure Layout */
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
            border: 1px solid #d1d5db; /* Standard spreadsheet full block grid lines */
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
            background-color: #f9fafb; /* Row Zebra Stripes */
          }
          .excel-style-table tbody tr:hover {
            background-color: #e0f2fe; /* Spreadsheet entry row select high-light */
          }
          .excel-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 2px;
            border: 1px solid currentColor;
            display: inline-block;
          }
        `}</style>

        {/* Top Section KPIs Row */}
        <section className="branch-kpi-grid">
          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Bookings</span>
              <span>📅</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>14,250</strong>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+15% MTD</span>
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Today's Bookings</span>
              <span>🕒</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>342</strong>
            <div style={{ height: '4px', background: '#3b82f6', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Pending</span>
              <span>⏳</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>85</strong>
            <div style={{ height: '4px', background: '#f59e0b', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Completed</span>
              <span>✅</span>
            </span>
            <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', margin: '6px 0' }}>13,823</strong>
            <div style={{ height: '4px', background: '#10b981', borderRadius: '2px', marginTop: '4px' }} />
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Revenue (MTD)</span>
              <span>💰</span>
            </span>
            <strong className="truncate-text" style={{ fontSize: '15px', color: '#059669', margin: '6px 0', fontWeight: '800' }}>$1,245,000</strong>
            <span className="truncate-text" style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+8% vs last month</span>
          </div>

          <div className="branch-kpi-card">
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Cancellation Rate</span>
              <span>❌</span>
            </span>
            <strong className="truncate-text" style={{ fontSize: '15px', color: '#ef4444', margin: '6px 0', fontWeight: '800' }}>2.4%</strong>
            <span className="truncate-text" style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>Within target limit</span>
          </div>
        </section>

        {/* Main Table Panel */}
        <section className="panel partner-directory-panel" style={{ padding: '24px', marginBottom: '24px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0' }}>
              Recent Bookings Spreadsheet View
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="dash-search" style={{ width: '220px', margin: 0, height: '32px' }}>
                <input
                  placeholder="Search ID, customer, service..."
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
                  <th>BOOKING ID</th>
                  <th>CUSTOMER</th>
                  <th>SERVICE</th>
                  <th>BRANCH</th>
                  <th>SCHEDULED DATE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}>{row.id}</span>
                    </td>
                    <td style={{ color: '#111827', fontWeight: '700' }}>{row.customer}</td>
                    <td style={{ color: '#4b5563' }}>{row.service}</td>
                    <td style={{ color: '#111827' }}>{row.branch}</td>
                    <td style={{ color: '#4b5563' }}>{row.date}</td>
                    <td style={{ color: '#111827', fontWeight: '800' }}>{row.amount}</td>
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

            {filteredBookings.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', fontSize: '13px', border: '1px solid #e5e7eb', borderTop: 'none' }}>
                No bookings found matching your criteria.
              </div>
            )}
          </div>

          <div className="directory-table-footer" style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="footer-results-text" style={{ fontSize: '12px', color: '#4b5563' }}>Showing {filteredBookings.length} of 14,250 bookings</span>
            <div className="pagination-wrap" style={{ display: 'flex', gap: '4px' }}>
              <button className="pag-nav-btn" type="button" disabled style={{ padding: '4px 8px', border: '1px solid #d1d5db', background: '#f3f4f6' }}>
                <ChevronLeft size={14} />
              </button>
              <button className="pag-num-btn active" type="button" style={{ padding: '4px 10px', border: '1px solid #1e3a8a', background: '#1e3a8a', color: '#fff', fontWeight: '600' }}>1</button>
              <button className="pag-num-btn" type="button" style={{ padding: '4px 10px', border: '1px solid #d1d5db', background: '#fff' }}>2</button>
              <button className="pag-num-btn" type="button" style={{ padding: '4px 10px', border: '1px solid #d1d5db', background: '#fff' }}>3</button>
              <span style={{ margin: '0 4px', color: '#9ca3af' }}>...</span>
              <button className="pag-num-btn" type="button" style={{ padding: '4px 10px', border: '1px solid #d1d5db', background: '#fff' }}>285</button>
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