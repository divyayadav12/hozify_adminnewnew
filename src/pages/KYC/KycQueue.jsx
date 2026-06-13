import React, { useState } from 'react';
import { FileText, ShieldCheck, AlertCircle, Clock, SlidersHorizontal, Download, Check, X, RotateCcw, MoreVertical, Search } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

const initialKycList = [
  { name: 'Marcus Holloway', id: 'EMP-00421', branch: 'New York HQ', docName: 'Passport_Scan.pdf', date: 'Oct 24, 2023', status: 'PENDING', initials: 'MH', bg: '#ecfdf5', color: '#059669' },
  { name: 'Sarah Jenkins', id: 'EMP-00388', branch: 'London Branch', docName: 'Driving_License.jpg', date: 'Oct 23, 2023', status: 'VERIFIED', initials: 'SJ', bg: '#f1ebf8', color: 'var(--primary)' },
  { name: 'Rahul Mehta', id: 'EMP-00512', branch: 'Mumbai Hub', docName: 'National_ID_Front.png', date: 'Oct 23, 2023', status: 'REJECTED', initials: 'RM', bg: '#fee2e2', color: '#ef4444' },
  { name: 'Arthur P. Shelby', id: 'EMP-00405', branch: 'Chicago Office', docName: 'Utility_Bill_Proof.pdf', date: 'Oct 22, 2023', status: 'PENDING', initials: 'AS', bg: '#e0f2fe', color: '#0284c7' }
];

export default function KycQueue() {
  const [kycData, setKycData] = useState(initialKycList);
  const [filter, setFilter] = useState('All'); // All, Pending, Escalated
  const [search, setSearch] = useState('');

  const handleAction = (id, nextStatus) => {
    setKycData(kycData.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const filteredData = kycData.filter(item => {
    const matchesFilter = filter === 'All' || 
      (filter === 'Pending' && item.status === 'PENDING') || 
      (filter === 'Escalated' && item.status === 'REJECTED'); // map escalated to rejected mock
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <AdminShell
      activeTab="KYC"
      headerTitle="KYC Approval Queue"
      searchPlaceholder="Search KYC applications..."
    >
      <div className="kyc-approval-flow">
        {/* Title Header */}
        <div className="partners-page-header">
          <div>
            <h1 className="page-title">KYC Approval Queue</h1>
            <p className="page-subtitle">Review and verify employee identity documents.</p>
          </div>
          <div className="partners-header-buttons">
            <button className="secondary-action-btn font-bold" type="button" style={{ height: '36px' }}>
              <SlidersHorizontal size={14} style={{ marginRight: '4px' }} />
              <span>Filter</span>
            </button>
            <button className="primary-action-btn font-bold" type="button" style={{ height: '36px' }}>
              <Download size={14} style={{ marginRight: '4px' }} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <section className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', marginBottom: '24px', gap: '20px' }}>
          {/* Pending Review */}
          <div className="kpi-card" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', minHeight: '110px', background: '#fff', border: '1px solid var(--line)' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Review</span>
              <strong style={{ display: 'block', fontSize: '26px', margin: '4px 0 2px', color: 'var(--text)' }}>124</strong>
              <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700' }}>+12% from last week</span>
            </div>
            <span style={{ color: '#6366f1', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={18} /></span>
          </div>

          {/* Verified Today */}
          <div className="kpi-card" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', minHeight: '110px', background: '#fff', border: '1px solid var(--line)' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Today</span>
              <strong style={{ display: 'block', fontSize: '26px', margin: '4px 0 2px', color: 'var(--text)' }}>48</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+5% target achieved</span>
            </div>
            <span style={{ color: '#10b981', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={18} /></span>
          </div>

          {/* Rejected */}
          <div className="kpi-card" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', minHeight: '110px', background: '#fff', border: '1px solid var(--line)' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rejected</span>
              <strong style={{ display: 'block', fontSize: '26px', margin: '4px 0 2px', color: 'var(--text)' }}>09</strong>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>2.4% rejection rate</span>
            </div>
            <span style={{ color: '#ef4444', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertCircle size={18} /></span>
          </div>

          {/* Average TAT */}
          <div className="kpi-card" style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', minHeight: '110px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Average TAT</span>
            <strong style={{ display: 'block', fontSize: '28px', margin: '4px 0 2px' }}>4.2h</strong>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)' }}>-1.2h vs last month</span>
          </div>
        </section>

        {/* Directory Table Panel */}
        <section className="panel partner-directory-panel" style={{ padding: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <button
                onClick={() => setFilter('All')}
                type="button"
                style={{ background: 'transparent', border: 'none', borderBottom: filter === 'All' ? '2px solid #4f46e5' : '2px solid transparent', color: filter === 'All' ? '#4f46e5' : 'var(--muted)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', paddingBottom: '14px' }}
              >
                All Records
              </button>
              <button
                onClick={() => setFilter('Pending')}
                type="button"
                style={{ background: 'transparent', border: 'none', borderBottom: filter === 'Pending' ? '2px solid #4f46e5' : '2px solid transparent', color: filter === 'Pending' ? '#4f46e5' : 'var(--muted)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', paddingBottom: '14px' }}
              >
                Pending (124)
              </button>
              <button
                onClick={() => setFilter('Escalated')}
                type="button"
                style={{ background: 'transparent', border: 'none', borderBottom: filter === 'Escalated' ? '2px solid #4f46e5' : '2px solid transparent', color: filter === 'Escalated' ? '#4f46e5' : 'var(--muted)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', paddingBottom: '14px' }}
              >
                Escalated (3)
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="dash-search" style={{ width: '200px', height: '32px', margin: 0 }}>
                <Search size={14} />
                <input
                  placeholder="Search applications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ fontSize: '12px' }}
                  aria-label="Search KYC data by name or ID"
                />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Showing 1-10 of 124</span>
            </div>
          </div>

          <div className="table-wrap">
            <table className="partner-table">
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>BRANCH</th>
                  <th>DOCUMENT TYPE</th>
                  <th>SUBMISSION DATE</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right', paddingRight: '20px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: row.bg, color: row.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                          {row.initials}
                        </span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px' }}>{row.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: {row.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text)', fontSize: '13px' }}>{row.branch}</td>
                    <td style={{ fontSize: '13px' }}>
                      <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={14} />
                        {row.docName}
                      </a>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{row.date}</td>
                    <td>
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          color: row.status === 'VERIFIED' ? '#059669' : row.status === 'PENDING' ? '#d97706' : '#ef4444',
                          background: row.status === 'VERIFIED' ? '#ecfdf5' : row.status === 'PENDING' ? '#fef3c7' : '#fee2e2'
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '20px' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        {row.status === 'PENDING' ? (
                          <>
                            <button
                              onClick={() => handleAction(row.id, 'VERIFIED')}
                              style={{ width: '28px', height: '28px', border: '1px solid #dcf3ec', background: '#dcf3ec', color: '#088261', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              title="Approve"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleAction(row.id, 'REJECTED')}
                              style={{ width: '28px', height: '28px', border: '1px solid #fee2e2', background: '#fee2e2', color: '#ef4444', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              title="Reject"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : row.status === 'REJECTED' ? (
                          <button
                            onClick={() => handleAction(row.id, 'PENDING')}
                            style={{ width: '28px', height: '28px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--muted)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            title="Re-evaluate"
                          >
                            <RotateCcw size={14} />
                          </button>
                        ) : (
                          <>
                            <button disabled style={{ width: '28px', height: '28px', border: '1px solid #f1f5f9', background: '#f8fafc', color: '#cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} /></button>
                            <button disabled style={{ width: '28px', height: '28px', border: '1px solid #f1f5f9', background: '#f8fafc', color: '#cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} /></button>
                          </>
                        )}
                        <button className="table-row-action-btn" type="button" aria-label="Review detailed profile">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px' }}>
            <span style={{ color: 'var(--muted)' }}>Rows per page: 10</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: '700' }}>
              <button disabled style={{ border: 'none', background: 'transparent', color: '#cbd5e1', cursor: 'not-allowed' }}>&lt;</button>
              <span>1 of 13</span>
              <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}>&gt;</button>
            </div>
          </div>

        </section>
      </div>
    </AdminShell>
  );
}
