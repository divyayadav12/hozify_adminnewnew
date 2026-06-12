import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import BusinessHeaderTabs from './BusinessHeaderTabs';
import {
  ChevronRight,
  AlertTriangle,
  FileText,
  Clock,
  History,
  Building,
  CheckCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function BusinessSuspension() {
  const { navigate } = useApp();
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState('Indefinite');
  const [violationType, setViolationType] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const entityName = 'Global Logistics Partners Inc.';
  const entityId = 'REG-8849-2210';

  const handleConfirmSuspension = () => {
    if (!reason) {
      alert('Please provide a reason for suspension.');
      return;
    }
    alert(`Status updated: Suspended. Reason: ${reason}`);
    navigate(ROUTES.business);
  };

  const handleReactivate = () => {
    alert(`Status updated: Reactivated.`);
    navigate(ROUTES.business);
  };

  // Hardcoded audit logs (Image 4)
  const auditLogs = [
    { action: 'REACTIVATED', admin: 'Sarah Jenkins', date: '2024-03-12 14:22', color: '#10b981', bg: '#ecfdf5' },
    { action: 'SUSPENDED', admin: 'System (Auto)', date: '2024-01-05 09:00', color: '#ef4444', bg: '#fee2e2' },
    { action: 'VERIFIED', admin: 'Marcus Chen', date: '2023-11-20 16:45', color: '#3b82f6', bg: '#eff6ff' },
    { action: 'CREATED', admin: 'Admin Port', date: '2021-10-14 11:12', color: '#10b981', bg: '#ecfdf5' }
  ];

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Directory" />}
      searchPlaceholder="Search entries..."
    >
      <div className="business-suspension-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Breadcrumbs (Image 4) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.business)}>Businesses</span>
            <ChevronRight size={14} />
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.business)}>Entity Management</span>
            <ChevronRight size={14} />
            <span style={{ color: '#0f172a' }}>Suspension & Reactivation</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{ border: '1px solid var(--line)', background: '#fff', color: 'var(--text)', fontSize: '11px', fontWeight: '700', height: '34px', padding: '0 12px', borderRadius: '6px' }}
              onClick={() => alert('Viewing public record...')}
              type="button"
            >
              View Public Record
            </button>
            <button
              style={{ border: '1px solid var(--line)', background: '#fff', color: 'var(--text)', fontSize: '11px', fontWeight: '700', height: '34px', padding: '0 12px', borderRadius: '6px' }}
              onClick={() => alert('Exporting case file...')}
              type="button"
            >
              Export Case File
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '22px', fontWeight: '800' }}>Compliance Management</h1>
          <p className="page-subtitle" style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>Modify operational status for global business entities.</p>
        </div>

        {/* Grid Container */}
        <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
          
          {/* Column 1: Entity Profile & Form (Left) */}
          <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Business Card Summary */}
            <div className="panel" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ height: '48px', width: '48px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', flexShrink: 0 }}>
                <Building size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '16px', color: 'var(--text)' }}>{entityName}</strong>
                  <span style={{ fontSize: '9px', fontWeight: '800', color: '#10b981', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ height: '5px', width: '5px', borderRadius: '50%', background: '#10b981' }} />
                    Active
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '6px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)' }}>
                  <span>Entity ID: <strong style={{ color: 'var(--text)' }}>{entityId}</strong></span>
                  <span>REGISTRATION DATE: <strong style={{ color: 'var(--text)' }}>Oct 14, 2021</strong></span>
                  <span>LAST AUDIT: <strong style={{ color: 'var(--text)' }}>12 Days Ago</strong></span>
                </div>
              </div>

              {/* Score visual right side */}
              <div style={{ textAlign: 'right', borderLeft: '1px solid #f1f5f9', paddingLeft: '20px' }}>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Compliance Score</span>
                <strong style={{ display: 'block', fontSize: '18px', color: '#10b981', textDecoration: 'underline', marginTop: '2px' }}>98/100</strong>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '600', marginTop: '2px' }}>Low (Tier 1)</span>
              </div>
            </div>

            {/* Request Form */}
            <div className="panel" style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: '0 0 16px' }}>Status Modification Request</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Reason for Action */}
                <div>
                  <label htmlFor="reason-textarea" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Reason for Action</label>
                  <textarea
                    id="reason-textarea"
                    style={{ width: '100%', height: '110px', border: '1px solid var(--line)', borderRadius: '6px', padding: '12px', fontSize: '13px', outline: 'none', resize: 'none', background: '#f8fafc' }}
                    placeholder="Detailed explanation for the status change..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                {/* Duration & Violation row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label htmlFor="duration-select" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Suspension Duration</label>
                    <select
                      id="duration-select"
                      style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none', background: '#fff' }}
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="Indefinite">Indefinite</option>
                      <option value="30 Days">30 Days</option>
                      <option value="90 Days">90 Days</option>
                      <option value="Temporary Review">Temporary Review</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="violation-select" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Primary Violation Type</label>
                    <select
                      id="violation-select"
                      style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none', background: '#fff' }}
                      value={violationType}
                      onChange={(e) => setViolationType(e.target.value)}
                    >
                      <option value="">Select Category...</option>
                      <option value="Regulatory Breach">Regulatory Breach</option>
                      <option value="Safety Auditing Failure">Safety Auditing Failure</option>
                      <option value="Incomplete Documentation">Incomplete Documentation</option>
                      <option value="Tax Misalignment">Tax Misalignment</option>
                    </select>
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <label htmlFor="internal-notes-input" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Internal Notes (Private)</label>
                  <input
                    id="internal-notes-input"
                    type="text"
                    style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', outline: 'none', background: '#f8fafc' }}
                    placeholder="Visible only to administrators and audit teams"
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                  />
                </div>

                {/* Yellow Action warning box (Image 4) */}
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '12px 14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <AlertTriangle size={16} style={{ color: '#d97706', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#b45309' }}>
                    Action will notify primary contacts immediately.
                  </span>
                </div>

                {/* Buttons row */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    style={{ border: 'none', background: '#991b1b', color: '#fff', fontSize: '12px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '6px', cursor: 'pointer' }}
                    onClick={handleConfirmSuspension}
                    type="button"
                  >
                    Confirm Suspension
                  </button>
                  <button
                    style={{ border: 'none', background: '#10b981', color: '#fff', fontSize: '12px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '6px', cursor: 'pointer' }}
                    onClick={handleReactivate}
                    type="button"
                  >
                    Reactivate Business
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Column 2: Lifecycle Log & Legal Assistance Card (Right) */}
          <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Audit Log timeline */}
            <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Lifecycle & Audit Log</h2>
                <a href="#log" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', fontWeight: '800', fontSize: '11px', textDecoration: 'none' }}>
                  View Full Log
                </a>
              </div>

              {/* Logs Table */}
              <div className="table-wrap">
                <table className="partner-table" style={{ border: 'none' }}>
                  <thead>
                    <tr>
                      <th style={{ fontSize: '9px', color: 'var(--muted)', background: 'transparent', padding: '8px 4px' }}>ACTION</th>
                      <th style={{ fontSize: '9px', color: 'var(--muted)', background: 'transparent', padding: '8px 4px' }}>ADMIN</th>
                      <th style={{ fontSize: '9px', color: 'var(--muted)', background: 'transparent', padding: '8px 4px', textAlign: 'right' }}>TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 4px' }}>
                          <span style={{ fontSize: '8px', fontWeight: '900', color: log.color, background: log.bg, padding: '2px 6px', borderRadius: '3px' }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: '12px 4px', fontSize: '11px', fontWeight: '700', color: 'var(--text)' }}>{log.admin}</td>
                        <td style={{ padding: '12px 4px', fontSize: '10px', color: 'var(--muted)', textAlign: 'right' }}>{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Reactivation score bar */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Average Reactivation Time</span>
                  <span style={{ color: 'var(--text)' }}>4.2 Days</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: '#4f46e5' }} />
                </div>
              </div>

            </div>

            {/* Need Legal Assistance dark card (Image 4) */}
            <div className="panel" style={{ padding: '24px', background: '#0b1329', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', overflow: 'hidden' }}>
              {/* Graphic background lines overlay */}
              <div style={{ position: 'absolute', right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <line x1="0" y1="100" x2="100" y2="0" stroke="#fff" strokeWidth="12" />
                  <line x1="20" y1="100" x2="100" y2="20" stroke="#fff" strokeWidth="12" />
                  <line x1="40" y1="100" x2="100" y2="40" stroke="#fff" strokeWidth="12" />
                </svg>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>Need Legal Assistance?</h3>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0 }}>
                A suspension requires formal legal notice documentation. Download our standard templates to ensure compliance.
              </p>
              
              <button
                style={{ alignSelf: 'flex-start', border: 'none', background: '#fff', color: '#0b1329', fontSize: '11px', fontWeight: '800', height: '34px', padding: '0 14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', zIndex: 2 }}
                onClick={() => alert('Downloading templates...')}
                type="button"
              >
                <FileText size={12} /> Template Library
              </button>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}
