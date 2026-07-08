import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  HeartHandshake, PhoneCall, ShieldAlert, MessageCircle, Save, Settings
} from 'lucide-react';
import Toggle from '../../../../../components/common/Toggle';

export default function InstahelpConfigPage() {
  return (
    <AdminShell activeTab="CMS" headerTitle="Instahelp & Support Configuration">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Instahelp & Support</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Instahelp Center Config</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Configure the emergency numbers and support options presented in the user app.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
            <Save size={16} strokeWidth={2.5} /> Save Settings
          </button>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Emergency Contacts */}
          <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#fee2e2', color: '#ef4444', padding: '8px', borderRadius: '8px' }}>
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>Emergency SOS Contacts</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Configure the SOS button shortcuts</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Police Department (Direct Dial)</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <PhoneCall size={16} color="#94a3b8" />
                  <input type="text" defaultValue="100" style={{ flexGrow: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }} />
                </div>
              </div>
              
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Ambulance (Direct Dial)</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <PhoneCall size={16} color="#94a3b8" />
                  <input type="text" defaultValue="108" style={{ flexGrow: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Hozify Central Trust & Safety</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <PhoneCall size={16} color="#94a3b8" />
                  <input type="text" defaultValue="1800-889-9999" style={{ flexGrow: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Instahelp Settings */}
          <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#e0e7ff', color: '#4f46e5', padding: '8px', borderRadius: '8px' }}>
                <HeartHandshake size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>Support Channel Settings</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Configure communication channels available to users.</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageCircle size={20} color="#4f46e5" />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Live In-App Chat</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Enable users to chat with support agents within the app.</p>
                  </div>
                </div>
                <Toggle checked={true} onChange={() => {}} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PhoneCall size={20} color="#4f46e5" />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Callback Request</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Allow users to request a callback from the support team.</p>
                  </div>
                </div>
                <Toggle checked={true} onChange={() => {}} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Settings size={20} color="#4f46e5" />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>AI Support Bot (Level 1)</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Use AI to answer common queries before routing to human agents.</p>
                  </div>
                </div>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
