import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import BusinessHeaderTabs from './BusinessHeaderTabs';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  ShieldAlert,
  Check,
  AlertCircle,
  FileCheck,
  Flag,
  UserCheck
} from 'lucide-react';

export default function BusinessReview() {
  const { navigate } = useApp();
  const [activeDocTab, setActiveDocTab] = useState('Certificate');
  const [approvalNotes, setApprovalNotes] = useState('');
  
  // Checklist states
  const [checklist, setChecklist] = useState({
    panMatch: true,
    addressMatch: true,
    officerMatch: false,
    sanctionsClearance: false
  });

  const entityName = 'Quantum Dynamics LLC';
  const entityId = 'REG-8829-XQ';

  const toggleChecklist = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApprove = () => {
    alert('Business Approved Successfully!');
    navigate(ROUTES.businessApproval);
  };

  const handleReject = () => {
    alert('Business Registration Rejected.');
    navigate(ROUTES.businessApproval);
  };

  const handleRequestDocs = () => {
    alert('Document request sent to applicant.');
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Compliance" />}
      searchPlaceholder="Search entity ID..."
    >
      <div className="business-review-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Header toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate(ROUTES.businessApproval)}
              style={{ height: '36px', width: '36px', borderRadius: '50%', background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              title="Go Back"
              type="button"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="page-title" style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>Review: {entityName}</h1>
              <p className="page-subtitle" style={{ margin: '2px 0 0', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>
                Entity ID: {entityId} | Submitted 2 hours ago
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: '#eff6ff', color: '#1d4ed8', fontSize: '12px', fontWeight: '700', height: '34px', padding: '0 14px', borderRadius: '6px' }}
              onClick={() => alert('Requesting Info...')}
              type="button"
            >
              Request Info
            </button>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #fee2e2', background: '#fff', color: '#ef4444', fontSize: '12px', fontWeight: '700', height: '34px', padding: '0 14px', borderRadius: '6px' }}
              onClick={() => alert('Flagged for Audit.')}
              type="button"
            >
              <Flag size={12} /> Flag for Audit
            </button>
          </div>
        </div>

        {/* 3-Column main Layout grid */}
        <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
          
          {/* Column 1: Business Summary & Contact Info (Left) */}
          <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="panel" style={{ padding: '16px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px' }}>Business Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', fontWeight: '700' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '600' }}>Official Name</span>
                  <span style={{ display: 'block', color: 'var(--text)', marginTop: '2px' }}>{entityName}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '600' }}>Registration Number</span>
                  <span style={{ display: 'inline-block', color: '#1e40af', background: '#dbeafe', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', marginTop: '4px' }}>
                    US-DEL-99201-B
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '600' }}>Owner / Representative</span>
                  {/* Link navigating to verify user profile (Screen 2) */}
                  <span
                    onClick={() => navigate(ROUTES.businessVerify)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#4f46e5', textDecoration: 'underline', marginTop: '2px', cursor: 'pointer' }}
                  >
                    Sarah J. Montgomery <UserCheck size={12} />
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '600' }}>Industry Type</span>
                  <span style={{ display: 'block', color: 'var(--text)', marginTop: '2px' }}>Renewable Energy Systems</span>
                </div>
              </div>
            </div>

            <div className="panel" style={{ padding: '16px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px' }}>Contact Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', fontWeight: '700' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Mail size={13} style={{ color: 'var(--muted)' }} />
                  <span>admin@quantumdyn.energy</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Phone size={13} style={{ color: 'var(--muted)' }} />
                  <span>+1 (555) 012-4492</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <MapPin size={13} style={{ color: 'var(--muted)', marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.4' }}>1200 Market St,<br />Wilmington, DE</span>
                </div>
              </div>
            </div>

            <div className="panel" style={{ padding: '16px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>Operational Status</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)' }}>Platform Activity</span>
                  <span style={{ fontSize: '9px', fontWeight: '800', color: '#1d4ed8', background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>NEW ENTITY</span>
                </div>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '20%', height: '100%', background: '#1d4ed8' }} />
                </div>
                <p style={{ fontSize: '10px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: '1.4' }}>
                  No prior history found in the Global Registry for this Tax Identification Number.
                </p>
              </div>
            </div>

          </div>

          {/* Column 2: Wide Document Viewer (Center) */}
          <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
              
              {/* Document Outline Preview */}
              <div style={{ flex: 1, border: '1px solid var(--line)', background: '#f8fafc', borderRadius: '6px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                
                {activeDocTab === 'Certificate' && (
                  <>
                    {/* Certificate Watermark Logo */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #334155', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#0f172a', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '4px 6px', borderRadius: '4px' }}>REG</span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '12px', color: '#0f172a', letterSpacing: '0.5px' }}>CERTIFICATE OF INCORPORATION</strong>
                          <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)' }}>Department of Revenue & State Affairs</span>
                        </div>
                      </div>
                      <FileCheck size={32} style={{ color: '#94a3b8' }} />
                    </div>

                    {/* Simulated Document content lines */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                      <div style={{ height: '12px', background: '#cbd5e1', borderRadius: '2px', width: '40%' }} />
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '2px', width: '90%' }} />
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '2px', width: '95%' }} />
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '2px', width: '85%' }} />
                      <div style={{ height: '12px', background: '#cbd5e1', borderRadius: '2px', width: '30%', marginTop: '8px' }} />
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '2px', width: '95%' }} />
                    </div>
                  </>
                )}

                {activeDocTab === 'GST Identification' && (
                  <>
                    {/* GST Document Scan Preview */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #047857', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#10b981', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '4px 6px', borderRadius: '4px' }}>GSTIN</span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '12px', color: '#0f172a', letterSpacing: '0.5px' }}>FORM GST REG-06</strong>
                          <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)' }}>Government of India - Registration Certificate</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '900', color: '#047857', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>AI SCAN PENDING</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)', marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Legal Name:</span>
                        <strong style={{ color: 'var(--text)' }}>Lumina Tech Solutions PVT LTD</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>GSTIN Reference:</span>
                        <strong style={{ color: 'var(--text)' }}>27AAAAA0000A1Z5</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>OCR Confidence Rate:</span>
                        <strong style={{ color: '#10b981' }}>98%</strong>
                      </div>
                    </div>

                    <div style={{ border: '1px dashed #10b981', background: '#f0fdf4', padding: '12px', borderRadius: '6px', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#047857', fontWeight: '700' }}>AI Verification detects matching legal details in central registry database.</span>
                      <button
                        onClick={() => navigate(ROUTES.businessDocReview)}
                        style={{ border: 'none', background: '#10b981', color: '#fff', fontSize: '11px', fontWeight: '800', height: '28px', padding: '0 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        type="button"
                      >
                        Launch OCR Bounding View & Approve
                      </button>
                    </div>
                  </>
                )}

                {activeDocTab === 'PAN Card' && (
                  <>
                    {/* PAN Card Scan Preview */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2563eb', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '4px 6px', borderRadius: '4px' }}>PAN</span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '12px', color: '#0f172a', letterSpacing: '0.5px' }}>PERMANENT ACCOUNT NUMBER CARD</strong>
                          <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)' }}>Income Tax Department, Govt of India</span>
                        </div>
                      </div>
                      <FileCheck size={28} style={{ color: '#94a3b8' }} />
                    </div>

                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '14px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>PAN ID:</span>
                        <strong style={{ color: 'var(--text)' }}>ALUPM0029X</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Holder Name:</span>
                        <strong style={{ color: 'var(--text)' }}>LUMINA TECH SOLUTIONS</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Status:</span>
                        <strong style={{ color: '#10b981' }}>VALIDATED</strong>
                      </div>
                    </div>
                  </>
                )}

                {/* Document footer signature */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: 'var(--muted)', fontWeight: '700' }}>
                  <span>Document ID: 009281-QCX-11</span>
                  <span>Signature Electronically Verified</span>
                </div>

              </div>

              {/* Document Tabs */}
              <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '6px', marginTop: '16px', alignSelf: 'center' }}>
                {['Certificate', 'GST Identification', 'PAN Card'].map((tab) => {
                  const isActive = activeDocTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveDocTab(tab)}
                      style={{
                        border: 'none',
                        padding: '6px 12px',
                        background: isActive ? '#fff' : 'transparent',
                        color: isActive ? '#0f172a' : 'var(--muted)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '700',
                        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                        cursor: 'pointer'
                      }}
                      type="button"
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Column 3: Verification & Checklist (Right) */}
          <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Risk Score */}
            <div className="panel" style={{ padding: '20px', background: '#0f172a', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.6)' }}>Risk Score</span>
                <ShieldAlert size={16} style={{ color: '#ef4444' }} />
              </div>
              
              <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <svg width="80" height="80" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="85 100" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute' }}>
                  <strong style={{ fontSize: '20px', display: 'block' }}>85</strong>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>/100</span>
                </div>
              </div>

              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: '1.4' }}>
                Moderate priority review required. High funding-to-asset ratio detected.
              </p>
            </div>

            {/* Checklist */}
            <div className="panel" style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 16px' }}>Verification Checklist</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* PAN Match */}
                <div
                  onClick={() => toggleChecklist('panMatch')}
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ height: '18px', width: '18px', borderRadius: '4px', border: '1px solid var(--line)', background: checklist.panMatch ? '#4f46e5' : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {checklist.panMatch && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>PAN Identification Match</span>
                </div>

                {/* Address Match */}
                <div
                  onClick={() => toggleChecklist('addressMatch')}
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ height: '18px', width: '18px', borderRadius: '4px', border: '1px solid var(--line)', background: checklist.addressMatch ? '#4f46e5' : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {checklist.addressMatch && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>Address Verification (Geo)</span>
                </div>

                {/* Officer Match */}
                <div
                  onClick={() => toggleChecklist('officerMatch')}
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ height: '18px', width: '18px', borderRadius: '4px', border: '1px solid var(--line)', background: checklist.officerMatch ? '#4f46e5' : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {checklist.officerMatch && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>Officer Name Match</span>
                </div>

                {/* Sanctions Clearance */}
                <div
                  onClick={() => toggleChecklist('sanctionsClearance')}
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ height: '18px', width: '18px', borderRadius: '4px', border: '1px solid var(--line)', background: checklist.sanctionsClearance ? '#4f46e5' : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {checklist.sanctionsClearance && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>Sanctions List Clearance</span>
                </div>

              </div>
            </div>

            {/* Approval Notes */}
            <div className="panel" style={{ padding: '16px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px' }}>Approval Notes</h2>
              <textarea
                style={{ width: '100%', height: '80px', border: '1px solid var(--line)', borderRadius: '6px', background: '#f8fafc', padding: '10px', fontSize: '12px', outline: 'none', resize: 'none' }}
                placeholder="Add internal justification or observation..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                aria-label="Approval notes text field"
              />
            </div>

          </div>

        </div>

        {/* Bottom review audit toolbar */}
        <div className="panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>
            <AlertCircle size={14} />
            <span>Last active review: Agent-39 (15 mins ago)</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: '#eff6ff', color: '#1d4ed8', fontSize: '12px', fontWeight: '700', height: '38px', padding: '0 16px', borderRadius: '6px' }}
              onClick={handleRequestDocs}
              type="button"
            >
              Request Documents
            </button>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: '#991b1b', color: '#fff', fontSize: '12px', fontWeight: '700', height: '38px', padding: '0 16px', borderRadius: '6px' }}
              onClick={handleReject}
              type="button"
            >
              Reject Entity
            </button>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: '700', height: '38px', padding: '0 16px', borderRadius: '6px' }}
              onClick={handleApprove}
              type="button"
            >
              Approve Business
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
