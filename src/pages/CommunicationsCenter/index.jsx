import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import {
  MessageSquare,
  Send,
  Smartphone,
  Users,
  Target,
  FileText,
  Mail,
  Globe,
  Bell,
  CheckCircle,
  X,
  FileUp,
  Sliders,
  MoreVertical,
  Calendar
} from 'lucide-react';

export default function CommunicationsCenter() {
  const { navigate } = useApp();
  const [selectedChannel, setSelectedChannel] = useState('Email');
  const [campaignName, setCampaignName] = useState('');
  const [recipients, setRecipients] = useState(['Retail Category', 'North Region']);
  const [newRecipient, setNewRecipient] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [scheduleMode, setScheduleMode] = useState('now'); // 'now' or 'schedule'
  const [scheduleTime, setScheduleTime] = useState('');

  const [isSent, setIsSent] = useState(false);

  // Recent Outreach History
  const [outreachHistory, setOutreachHistory] = useState([
    { name: 'Annual Tax Filing Reminder', channel: 'Email', status: 'SENT', statusColor: '#10b981', statusBg: '#ecfdf5', reach: '4,502', engagement: '24.5%', engRate: 24.5, engColor: '#10b981' },
    { name: 'Emergency System Maintenance', channel: 'SMS', status: 'SCHEDULED', statusColor: '#2563eb', statusBg: '#eff6ff', reach: '1,120', engagement: 'Pending delivery...', engRate: 0, engColor: '#64748b' },
    { name: 'New Feature Spotlight: Analytics V2', channel: 'WhatsApp', status: 'DRAFT', statusColor: '#64748b', statusBg: '#f1f5f9', reach: '840', engagement: '—', engRate: 0, engColor: '#64748b' },
    { name: 'Holiday Hours Collection', channel: 'Push', status: 'SENT', statusColor: '#10b981', statusBg: '#ecfdf5', reach: '12,400', engagement: '12.2%', engRate: 12.2, engColor: '#f97316' }
  ]);

  const handleAddRecipient = (e) => {
    if (e.key === 'Enter' && newRecipient.trim()) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (idx) => {
    setRecipients(recipients.filter((_, i) => i !== idx));
  };

  const handleDeploy = (e) => {
    e.preventDefault();
    if (!campaignName || !msgBody) {
      alert('Please fill out the Campaign Name and Message Body.');
      return;
    }
    
    // Add to history list
    const newCampaign = {
      name: campaignName,
      channel: selectedChannel,
      status: scheduleMode === 'now' ? 'SENT' : 'SCHEDULED',
      statusColor: scheduleMode === 'now' ? '#10b981' : '#2563eb',
      statusBg: scheduleMode === 'now' ? '#ecfdf5' : '#eff6ff',
      reach: '1,240',
      engagement: scheduleMode === 'now' ? '0.0%' : 'Pending delivery...',
      engRate: 0,
      engColor: '#64748b'
    };

    setOutreachHistory([newCampaign, ...outreachHistory]);
    setIsSent(true);
    
    // reset form
    setCampaignName('');
    setMsgBody('');

    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  return (
    <AdminShell
      activeTab="Communications"
      searchPlaceholder="Search communication history..."
      headerTitle="Partner Communications Manager"
    >
      <div className="communications-center-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Title */}
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>Communication Center</h1>
          <p className="page-subtitle" style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>Draft and deploy multi-channel campaigns to your registered entities.</p>
        </div>

        {isSent && (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '12px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700' }}>
            <CheckCircle size={18} />
            <span>Campaign deployed successfully to the delivery network!</span>
          </div>
        )}

        {/* 3-Column Composer Layout */}
        <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
          
          {/* Column 1: Channels sidebar (Left) */}
          <div className="panel" style={{ flex: 0.6, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>Channels</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'Email', label: 'Email', icon: Mail, usage: '6,540 / 10,000 messages' },
                { id: 'SMS', label: 'SMS', icon: Smartphone, usage: null },
                { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare, usage: null },
                { id: 'Push', label: 'Push Notification', icon: Bell, usage: null }
              ].map((ch) => {
                const isActive = selectedChannel === ch.id;
                const Icon = ch.icon;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px',
                      background: isActive ? '#eff6ff' : 'transparent',
                      border: isActive ? '1px solid #3b82f6' : '1px solid transparent',
                      color: isActive ? '#1e40af' : 'var(--text)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                    type="button"
                  >
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <Icon size={18} />
                      <strong style={{ fontSize: '13px' }}>{ch.label}</strong>
                    </div>
                    {ch.id === 'Email' && (
                      <div style={{ marginTop: '8px', fontSize: '9px', fontWeight: '700', color: 'var(--muted)' }}>
                        <span style={{ display: 'block', marginBottom: '4px' }}>Usage Limit</span>
                        <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: '65%', height: '100%', background: '#4f46e5' }} />
                        </div>
                        <span style={{ display: 'block', marginTop: '4px' }}>{ch.usage}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Broadcaster Composer Form (Center) */}
          <div className="panel" style={{ flex: 1.8, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <form onSubmit={handleDeploy} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              
              {/* Campaign Name */}
              <div>
                <label htmlFor="campaign-name" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Campaign Name</label>
                <input
                  id="campaign-name"
                  type="text"
                  style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', outline: 'none' }}
                  placeholder="e.g., Q4 Compliance Update"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              {/* Recipient Selection tags */}
              <div>
                <label htmlFor="recipient-input" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Recipient Selection</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', border: '1px solid var(--line)', background: '#fff', borderRadius: '6px', padding: '6px 10px', minHeight: '40px' }}>
                  {recipients.map((rec, idx) => (
                    <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                      {rec}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveRecipient(idx)} />
                    </span>
                  ))}
                  <input
                    id="recipient-input"
                    type="text"
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', flex: 1, minWidth: '160px' }}
                    placeholder="Add businesses, regions or categories..."
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    onKeyDown={handleAddRecipient}
                  />
                </div>
              </div>

              {/* Message Body composer with Rich Text tools placeholder */}
              <div>
                <label htmlFor="msg-body" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Message Body</label>
                
                <div style={{ border: '1px solid var(--line)', borderRadius: '6px', overflow: 'hidden' }}>
                  {/* WYSIWYG bar */}
                  <div style={{ display: 'flex', gap: '10px', background: '#f1f5f9', borderBottom: '1px solid var(--line)', padding: '6px 12px', fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>
                    <button type="button" style={{ border: 'none', background: 'transparent', fontWeight: '800', cursor: 'pointer' }}>B</button>
                    <button type="button" style={{ border: 'none', background: 'transparent', fontStyle: 'italic', cursor: 'pointer' }}>I</button>
                    <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🔗</button>
                    <span style={{ borderLeft: '1px solid var(--line)', height: '14px', margin: '2px 0' }} />
                    <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>☷</button>
                    <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🖼</button>
                  </div>
                  
                  <textarea
                    id="msg-body"
                    style={{ width: '100%', height: '140px', border: 'none', padding: '12px', fontSize: '13px', outline: 'none', resize: 'none' }}
                    placeholder="Type your professional message here... Use {business_name} for personalization."
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                  />
                </div>
              </div>

              {/* Attachment Drag-drop Box */}
              <div style={{ border: '2px dashed var(--line)', background: '#f8fafc', borderRadius: '6px', padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => alert('Attachments browser')}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <FileUp size={24} style={{ color: 'var(--muted)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>
                    Drag and drop attachments or <span style={{ color: '#4f46e5', textDecoration: 'underline' }}>Browse files</span>
                  </span>
                </div>
              </div>

            </form>
          </div>

          {/* Column 3: Schedulers & Action Buttons (Right) */}
          <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Campaign Scheduling Card */}
            <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Campaign Scheduling</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Send Now */}
                <label style={{ display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid #3b82f6', background: scheduleMode === 'now' ? '#eff6ff' : '#fff', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="schedule"
                    value="now"
                    checked={scheduleMode === 'now'}
                    onChange={() => setScheduleMode('now')}
                    style={{ accentColor: '#3b82f6' }}
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', color: '#1e40af' }}>Send Now</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#1d4ed8', fontWeight: '500', marginTop: '2px' }}>Immediate delivery to all channels.</span>
                  </div>
                </label>

                {/* Schedule */}
                <label style={{ display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid var(--line)', background: scheduleMode === 'schedule' ? '#eff6ff' : '#fff', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="schedule"
                    value="schedule"
                    checked={scheduleMode === 'schedule'}
                    onChange={() => setScheduleMode('schedule')}
                    style={{ accentColor: '#3b82f6' }}
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '12px' }}>Schedule</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Choose a future date and time.</span>
                  </div>
                </label>

                {/* Date input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 10px', height: '36px', background: scheduleMode === 'schedule' ? '#fff' : '#f1f5f9' }}>
                  <Calendar size={14} style={{ color: 'var(--muted)' }} />
                  <input
                    type="text"
                    disabled={scheduleMode !== 'schedule'}
                    style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '11px', outline: 'none', fontWeight: '700' }}
                    placeholder="mm/dd/yyyy, --:--"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    aria-label="Campaign schedule date time input"
                  />
                </div>
              </div>
            </div>

            {/* A/B Testing Toggle */}
            <div className="panel" style={{ padding: '16px 20px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '12px' }}>A/B Testing</strong>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Test different copy variants.</span>
              </div>
              <div style={{ width: '36px', height: '20px', background: '#cbd5e1', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                <span style={{ position: 'absolute', left: '2px', top: '2px', height: '16px', width: '16px', background: '#fff', borderRadius: '50%' }} />
              </div>
            </div>

            {/* Projected Reach Dark Card */}
            <div className="panel" style={{ padding: '20px', background: '#0b1329', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', overflow: 'hidden' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Projected Reach</span>
              <strong style={{ display: 'block', fontSize: '24px' }}>1,240 <span style={{ fontSize: '11px', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>Units</span></strong>
              <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700' }}>
                ↗ +12% vs last campaign
              </span>
            </div>

            {/* Form actions (Deploy / Save) */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{ flex: 1, border: '1px solid var(--line)', background: '#fff', color: 'var(--text)', fontSize: '12px', fontWeight: '800', height: '40px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => alert('Saved Draft.')}
                type="button"
              >
                Save as Draft
              </button>
              
              <button
                style={{ flex: 1.2, border: 'none', background: '#4f46e5', color: '#fff', fontSize: '12px', fontWeight: '800', height: '40px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={handleDeploy}
                type="button"
              >
                <Send size={12} /> Deploy Campaign
              </button>
            </div>

          </div>

        </div>

        {/* Outreach History list */}
        <section className="panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Outreach History</h2>
            <a href="#audit" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', fontWeight: '800', fontSize: '11px', textDecoration: 'none' }}>
              View Full Audit Log →
            </a>
          </div>

          <div className="table-wrap">
            <table className="approval-queue-table">
              <thead>
                <tr>
                  <th>CAMPAIGN NAME</th>
                  <th>CHANNEL</th>
                  <th>STATUS</th>
                  <th>REACH</th>
                  <th>ENGAGEMENT</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {outreachHistory.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong style={{ fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong></td>
                    <td style={{ fontSize: '12px', color: 'var(--muted)' }}>{row.channel}</td>
                    <td>
                      <span style={{ fontSize: '8px', fontWeight: '900', color: row.statusColor, background: row.statusBg, padding: '3px 8px', borderRadius: '3px' }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text)', fontWeight: '700' }}>{row.reach}</td>
                    <td>
                      {row.status === 'SENT' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '120px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', width: '32px' }}>{row.engagement}</span>
                          <div style={{ flex: 1, height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${row.engRate}%`, height: '100%', background: row.engColor }} />
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>{row.engagement}</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-action-circle" style={{ background: 'transparent', border: 'none', color: 'var(--muted)' }} type="button"><MoreVertical size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </AdminShell>
  );
}
