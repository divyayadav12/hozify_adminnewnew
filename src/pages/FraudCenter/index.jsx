import React, { useState } from 'react';
import {
  ShieldAlert,
  Download,
  RotateCcw,
  AlertOctagon,
  AlertTriangle,
  FileCheck,
  Search,
  SlidersHorizontal,
  Lock,
  Skull,
  UserX,
  Send,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

const suspiciousEvents = [
  {
    id: 'EVT-99281',
    partnerName: 'Nexis Logistics',
    partnerId: 'HOZ-NXS-102',
    event: 'Rating Manipulation Loop',
    score: 85,
    status: 'Flagged',
    timestamp: 'Today at 11:20 AM',
    severity: 'Critical',
    colorClass: 'red'
  },
  {
    id: 'EVT-99104',
    partnerName: 'Blue Freight Inc.',
    partnerId: 'HOZ-BLU-882',
    event: 'Multiple Account Association',
    score: 72,
    status: 'Flagged',
    timestamp: 'Today at 09:45 AM',
    severity: 'High',
    colorClass: 'orange'
  },
  {
    id: 'EVT-98520',
    partnerName: 'Swift Ventures',
    partnerId: 'HOZ-SWF-304',
    event: 'Blurry Document Submission',
    score: 45,
    status: 'Investigating',
    timestamp: 'Yesterday at 04:15 PM',
    severity: 'Medium',
    colorClass: 'yellow'
  },
  {
    id: 'EVT-98211',
    partnerName: 'Global Reach Co.',
    partnerId: 'HOZ-GLB-501',
    event: 'Rapid Address Location Swaps',
    score: 30,
    status: 'Resolved',
    timestamp: 'Oct 22, 2023 02:10 PM',
    severity: 'Low',
    colorClass: 'gray'
  }
];

export default function FraudCenter() {
  const { navigate } = useApp();
  const [selectedEventId, setSelectedEventId] = useState('EVT-99281');

  const selectedEvent = suspiciousEvents.find(e => e.id === selectedEventId) || suspiciousEvents[0];

  return (
    <AdminShell
      activeTab="Fraud Detection"
      searchPlaceholder="Search events, partners, or risk level..."
      headerTitle="Partner Security Compliance"
    >
      {/* Page Header */}
      <div className="partners-page-header">
        <div>
          <span className="queue-verification-control-tag font-bold red-text bg-red-soft" style={{ padding: '4px 8px', borderRadius: '4px' }}>
            CRITICAL MONITORING
          </span>
          <h1 className="page-title margin-top-4">Partner Fraud & Risk Center</h1>
          <p className="page-subtitle">Real-time risk scoring, mitigation controls, and suspicious partner behavior monitoring.</p>
        </div>
        <div className="partners-header-buttons">
          <button className="secondary-action-btn font-bold" type="button">
            <RotateCcw size={16} />
            <span>Re-calculate Risk</span>
          </button>
          <button className="primary-action-btn font-bold btn-danger-style" type="button">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Section: Risk Score Circle Gauge + Alert KPI List */}
      <div className="fraud-top-grid">
        
        {/* Risk Score Circle Gauge Card */}
        <div className="panel fraud-kpi-card flex-center-dir">
          <div className="fraud-card-header-simple">
            <h3>AGGREGATED RISK SCORE</h3>
          </div>
          
          <div className="risk-gauge-container">
            <svg className="risk-gauge-svg" viewBox="0 0 120 120" width="120" height="120">
              <circle className="gauge-bg" cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                className="gauge-progress red-stroke"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#d32929"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset="78.5" // 75% coverage
                strokeLinecap="round"
              />
            </svg>
            <div className="risk-gauge-text-overlay">
              <span className="risk-val">75</span>
              <span className="risk-label">High Risk</span>
            </div>
          </div>
          
          <p className="risk-warning-explanation">
            Partner fleet and KYC checks indicate elevated risk profile over the past 48 hours.
          </p>
        </div>

        {/* Alert Categories breakdown */}
        <div className="panel fraud-alerts-breakdown-card">
          <div className="fraud-card-header-simple">
            <h3>ACTIVE SECURITY ALERTS</h3>
          </div>
          
          <div className="alerts-breakdown-grid">
            <div className="alert-breakdown-item critical-border">
              <div className="alert-item-left">
                <AlertOctagon className="red-text" size={20} />
                <div className="alert-item-meta">
                  <strong>Multiple Accounts</strong>
                  <span>Immediate verification needed</span>
                </div>
              </div>
              <span className="alert-count-badge critical-bg">3</span>
            </div>

            <div className="alert-breakdown-item warning-border">
              <div className="alert-item-left">
                <AlertTriangle className="orange-text" size={20} />
                <div className="alert-item-meta">
                  <strong>Fake KYC Submissions</strong>
                  <span>Doc authenticity flags</span>
                </div>
              </div>
              <span className="alert-count-badge warning-bg">1</span>
            </div>

            <div className="alert-breakdown-item elevated-border">
              <div className="alert-item-left">
                <ShieldAlert className="blue-text" size={20} />
                <div className="alert-item-meta">
                  <strong>Refund Abuse Loops</strong>
                  <span>System financial anomaly</span>
                </div>
              </div>
              <span className="alert-count-badge elevated-bg">5</span>
            </div>

            <div className="alert-breakdown-item moderate-border">
              <div className="alert-item-left">
                <FileCheck className="gray-text" size={20} />
                <div className="alert-item-meta">
                  <strong>Rating Manipulation</strong>
                  <span>Suspicious review clusters</span>
                </div>
              </div>
              <span className="alert-count-badge moderate-bg">2</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: Suspicious Events Log + Mitigation Controls Panel */}
      <div className="fraud-bottom-grid">
        
        {/* Suspicious Events list */}
        <div className="panel suspicious-events-card">
          <div className="directory-panel-header">
            <h2>Suspicious Events Log</h2>
            <button className="secondary-action-btn" style={{ height: '32px', padding: '0 12px' }}>
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>

          <div className="table-wrap">
            <table className="approval-queue-table">
              <thead>
                <tr>
                  <th>PARTNER</th>
                  <th>FLAGGED BEHAVIOR</th>
                  <th>RISK</th>
                  <th>TIMESTAMP</th>
                  <th>SEVERITY</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    className={`partner-row-clickable ${selectedEventId === evt.id ? 'highlighted-row' : ''}`}
                    onClick={() => setSelectedEventId(evt.id)}
                  >
                    <td>
                      <div className="partner-name-meta">
                        <strong className="partner-name-txt">{evt.partnerName}</strong>
                        <span className="partner-est-txt">{evt.partnerId}</span>
                      </div>
                    </td>
                    <td>
                      <span className="flagged-behavior-label">{evt.event}</span>
                    </td>
                    <td>
                      <div className="score-badge-wrap">
                        <span className={`score-badge ${evt.score > 70 ? 'red-bg' : evt.score > 40 ? 'orange-bg' : 'gray-bg'}`}>
                          {evt.score}
                        </span>
                      </div>
                    </td>
                    <td className="submitted-date-cell">{evt.timestamp}</td>
                    <td>
                      <div className="severity-bar-container">
                        <span className={`severity-text-label ${evt.colorClass}-text`}>{evt.severity}</span>
                        <div className="severity-line-bar-bg">
                          <div
                            className={`severity-line-bar-fill ${evt.colorClass}-bg`}
                            style={{ width: `${evt.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Mitigation Action Panel */}
        <div className="panel mitigation-controls-card">
          <div className="fraud-card-header-simple">
            <h3>MITIGATION CONTROLS</h3>
            <span className="active-mitigation-tag">Target: {selectedEvent.partnerName}</span>
          </div>

          <p className="mitigation-description">
            Apply immediate system restrictions to block, escalate, or clear the flagged partner.
          </p>

          <div className="mitigation-actions-list">
            <button className="primary-btn btn-danger-style font-bold flex-start-btn" type="button">
              <Skull size={18} />
              <div className="btn-multiline-text">
                <strong>Freeze Partner Wallet</strong>
                <span>Holds all settlement payments instantly.</span>
              </div>
            </button>

            <button className="primary-btn btn-danger-style font-bold flex-start-btn" type="button">
              <UserX size={18} />
              <div className="btn-multiline-text">
                <strong>Suspend Partner Account</strong>
                <span>Disables platform access and order routing.</span>
              </div>
            </button>

            <button className="secondary-action-btn font-bold flex-start-btn full-width-action" type="button">
              <Send size={18} />
              <div className="btn-multiline-text text-left">
                <strong>Escalate to Compliance Team</strong>
                <span>Creates urgent manual review ticket.</span>
              </div>
            </button>

            <button className="primary-action-btn font-bold flex-start-btn full-width-action btn-green-style" type="button">
              <CheckCircle size={18} />
              <div className="btn-multiline-text text-left">
                <strong>Mark Partner as Safe</strong>
                <span>Dismisses active security flag on the log.</span>
              </div>
            </button>
          </div>

          <div className="mitigation-footer-shortcut">
            <button className="link-button" type="button" onClick={() => navigate(ROUTES.partnerDetails)}>
              <Eye size={14} />
              <span>Inspect Partner Documents (KYC)</span>
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
