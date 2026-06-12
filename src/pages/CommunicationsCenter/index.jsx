import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Smartphone,
  Users,
  Target,
  FileText,
  Mail,
  Smartphone as SmsIcon,
  Globe,
  Bell,
  Sparkles,
  Info,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

export default function CommunicationsCenter() {
  const [selectedChannel, setSelectedChannel] = useState('push');
  const [targetGroup, setTargetGroup] = useState('all');
  const [msgTitle, setMsgTitle] = useState('Compliance Warning: Verification Needed');
  const [msgBody, setMsgBody] = useState('Please review and upload your missing GSTIN documents under the KYC tab to avoid temporary payout holds.');
  const [actionUrl, setActionUrl] = useState('https://admin.hozify.com/partner-details');
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  const getEstReach = () => {
    switch (targetGroup) {
      case 'all': return '142 Partners';
      case 'kyc': return '18 Partners';
      case 'high-risk': return '5 Partners';
      case 'new': return '32 Partners';
      default: return '142 Partners';
    }
  };

  return (
    <AdminShell
      activeTab="Communications"
      searchPlaceholder="Search communication history..."
      headerTitle="Partner Communications Manager"
    >
      {/* Page Header */}
      <div className="partners-page-header">
        <div>
          <span className="queue-verification-control-tag font-bold purple-text bg-purple-soft" style={{ padding: '4px 8px', borderRadius: '4px', color: '#6d28d9', background: '#f3e8ff' }}>
            BROADCAST MANAGER
          </span>
          <h1 className="page-title margin-top-4">Communication Center</h1>
          <p className="page-subtitle">Draft and dispatch system-wide notifications, SMS alerts, and announcements to partners.</p>
        </div>
      </div>

      {isSent && (
        <div className="form-error" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#047857', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} />
          <strong>Broadcast sent successfully to {getEstReach()}!</strong>
        </div>
      )}

      {/* Main Grid: Form Composer + Live Phone Preview */}
      <div className="services-page-columns">
        
        {/* Left Column: Form Composer */}
        <div className="services-left-column">
          
          {/* Card 1: Channel selection */}
          <div className="panel service-card-panel">
            <div className="service-card-title-wrap">
              <div className="title-icon-circle purple-bg">
                <MessageSquare size={16} />
              </div>
              <div>
                <h2>Select Delivery Channel</h2>
                <p>Broadcast across multiple platform touchpoints.</p>
              </div>
            </div>

            <div className="categories-grid-selection">
              <button
                className={`category-select-box ${selectedChannel === 'push' ? 'active' : ''}`}
                onClick={() => setSelectedChannel('push')}
                type="button"
              >
                <Bell size={20} />
                <strong>App Push</strong>
              </button>

              <button
                className={`category-select-box ${selectedChannel === 'sms' ? 'active' : ''}`}
                onClick={() => setSelectedChannel('sms')}
                type="button"
              >
                <Smartphone size={20} />
                <strong>SMS Alert</strong>
              </button>

              <button
                className={`category-select-box ${selectedChannel === 'whatsapp' ? 'active' : ''}`}
                onClick={() => setSelectedChannel('whatsapp')}
                type="button"
              >
                <MessageSquare size={20} />
                <strong>WhatsApp</strong>
              </button>

              <button
                className={`category-select-box ${selectedChannel === 'email' ? 'active' : ''}`}
                onClick={() => setSelectedChannel('email')}
                type="button"
              >
                <Mail size={20} />
                <strong>Email Blast</strong>
              </button>
            </div>
          </div>

          {/* Card 2: Composer details form */}
          <div className="panel service-card-panel">
            <div className="service-card-title-wrap" style={{ marginBottom: '20px' }}>
              <div className="title-icon-circle blue-bg">
                <Target size={16} />
              </div>
              <div>
                <h2>Target & Compose Notification</h2>
                <p>Define the target audience and broadcast copy.</p>
              </div>
            </div>

            <form onSubmit={handleSend} className="form-col" style={{ gap: '18px' }}>
              <div className="form-field-group">
                <label htmlFor="target-group-select">Target Audience Group</label>
                <select
                  id="target-group-select"
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                >
                  <option value="all">All Active Partners ({getEstReach()})</option>
                  <option value="kyc">KYC Verification Pending ({getEstReach()})</option>
                  <option value="high-risk">High Risk Flagged ({getEstReach()})</option>
                  <option value="new">New Partners - Last 30 Days ({getEstReach()})</option>
                </select>
              </div>

              <div className="form-field-group">
                <label htmlFor="msg-title-input">Notification Title</label>
                <input
                  id="msg-title-input"
                  type="text"
                  value={msgTitle}
                  onChange={(e) => setMsgTitle(e.target.value)}
                  placeholder="e.g. Account Alert..."
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="msg-body-input">Message Body</label>
                <textarea
                  id="msg-body-input"
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  placeholder="Draft your message content here..."
                  style={{
                    width: '100%',
                    height: '110px',
                    borderRadius: '6px',
                    border: '1px solid var(--line)',
                    padding: '12px 14px',
                    outline: 'none',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                  required
                />
                <span className="field-hint-text">Keep body copy short and concise for optimal mobile display.</span>
              </div>

              <div className="form-field-group">
                <label htmlFor="action-url-input">Deep Link URL / Call to Action</label>
                <input
                  id="action-url-input"
                  type="text"
                  value={actionUrl}
                  onChange={(e) => setActionUrl(e.target.value)}
                  placeholder="e.g. https://hozify.com/dashboard"
                />
              </div>

              <div className="form-divider-horizontal" style={{ margin: '8px 0' }} />

              <button className="btn-form-submit" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={16} />
                <span>Send Target Broadcast</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Live Mobile Notification Simulator */}
        <div className="services-right-column">
          
          <div className="panel service-card-panel flex-column-layout">
            <div className="service-card-title-wrap">
              <div className="title-icon-circle orange-bg">
                <Smartphone size={16} />
              </div>
              <div>
                <h2>Interactive Live Preview</h2>
                <p>Simulating real-time render output on a mobile device.</p>
              </div>
            </div>

            {/* Mobile phone shell graphic preview */}
            <div className="phone-preview-shell-container">
              <div className="smartphone-body-mock">
                
                {/* Speaker & camera slot */}
                <div className="smartphone-notch" />

                {/* Display area screen */}
                <div className="smartphone-screen-display">
                  <div className="phone-screen-header">
                    <span className="phone-time-display">09:41 AM</span>
                    <div className="phone-icons-status">
                      <span className="wifi-bar">📶</span>
                      <span className="battery-level">🔋</span>
                    </div>
                  </div>

                  {/* Simulator Screen Lock Wall */}
                  <div className="phone-screen-lock-layer">
                    
                    {/* Simulated Push Notification Banner */}
                    <div className="simulated-push-notification-banner">
                      <div className="push-banner-top">
                        <div className="push-brand-meta">
                          <span className="push-brand-bullet">✔</span>
                          <strong className="push-brand-label">HOZIFY CONNECT</strong>
                        </div>
                        <span className="push-time-lbl">now</span>
                      </div>
                      
                      <div className="push-banner-content">
                        <h4 className="push-title-text">{msgTitle || 'No Title'}</h4>
                        <p className="push-body-text">{msgBody || 'Type your message...'}</p>
                      </div>

                      {actionUrl && (
                        <div className="push-banner-action-indicator">
                          <span>Action URL: {actionUrl}</span>
                        </div>
                      )}
                    </div>

                    <div className="lockscreen-slide-bar">
                      <div className="slide-bullet" />
                      <span>Swipe to open</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Reach Analytics Summary box */}
            <div className="active-zones-wrap" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Info size={16} style={{ color: 'var(--primary)', marginTop: '2px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '13px' }}>Reach Performance Analytics</h3>
                  <p style={{ margin: '0', fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4' }}>
                    Active filters: <strong>{getEstReach()}</strong> match target configuration. Average network latency is ~0.4s. Delivery reports will update instantly in Audit Logs.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}
