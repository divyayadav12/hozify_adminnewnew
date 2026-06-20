import React from 'react';
import { ShieldCheck, SlidersHorizontal, Search, Settings, Map, Compass, ShieldAlert, Award, AlertCircle, Edit, PlusCircle, VolumeX } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function ServiceAreas({ mode = 'areas' }) {
  const isCoverage = mode === 'coverage';

  return (
    <AdminShell
      activeTab="Service Areas"
      headerTitle="Branch Manager"
      searchPlaceholder="Search areas..."
    >
      <div className="service-areas-wrapper">
        
        {/* Page Title & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 className="page-title" style={{ margin: 0 }}>
                {isCoverage ? 'Branch Coverage Mapping' : 'Downtown Zone A'}
              </h1>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>VERIFIED</span>
            </div>
            <p className="page-subtitle" style={{ marginTop: '2px' }}>
              {isCoverage ? 'Branch service boundaries and dispatch coverage' : 'Central Metropolitan Branch'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
            <span style={{ padding: '4px 10px', color: 'var(--muted)' }}>Directory</span>
            <span style={{ padding: '4px 10px', color: 'var(--muted)' }}>Analytics</span>
            <span style={{ padding: '4px 10px', background: '#fff', color: '#0f172a', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>GIS Mapper</span>
          </div>
        </div>

        {/* Map Grid Content */}
        <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
          
          {/* Map satellite grid (Left) */}
          <div className="panel" style={{ flex: 1.8, padding: '0', position: 'relative', overflow: 'hidden', minHeight: '440px', background: '#0b1329', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Cyberpunk Map Design SVG */}
            <svg width="100%" height="100%" viewBox="0 0 500 400" style={{ position: 'absolute', top: 0, left: 0 }}>
              <defs>
                <radialGradient id="satellite-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </radialGradient>
              </defs>
              
              {/* Map grid overlay */}
              <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />

              {/* Major Roads */}
              <path d="M 0 100 Q 200 150, 500 80" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
              <path d="M 100 0 C 150 150, 80 300, 200 400" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
              <path d="M 0 280 H 500" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />

              {/* Micro Roads */}
              <line x1="50" y1="0" x2="150" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="300" y1="0" x2="250" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="200" x2="500" y2="240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Green Glow */}
              <circle cx="280" cy="180" r="120" fill="url(#satellite-glow)" />

              {/* Polygon Zone */}
              <polygon points="200,100 380,120 440,250 240,230" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
              
              {/* Plot dots */}
              <circle cx="200" cy="100" r="4" fill="#10b981" />
              <circle cx="380" cy="120" r="4" fill="#10b981" />
              <circle cx="440" cy="250" r="4" fill="#10b981" />
              <circle cx="240" cy="230" r="4" fill="#10b981" />

              {/* Active Marker Label */}
              <g transform="translate(260, 160)">
                <rect width="110" height="32" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                <text x="8" y="14" fill="#fff" fontSize="9" fontWeight="800">Downtown Zone A</text>
                <text x="8" y="24" fill="#a1a1aa" fontSize="7">12.4 km² • Active</text>
              </g>

            </svg>

            {/* Left float toolbar */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#0f172a', padding: '6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {['Pointer', 'Share', 'Target', 'Pin', 'Plus', 'Minus', 'Layers'].map((tool, i) => (
                <button
                  key={tool}
                  style={{
                    width: '24px',
                    height: '24px',
                    border: 'none',
                    background: tool === 'Share' ? '#4f46e5' : 'transparent',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  {tool === 'Pointer' ? '↗' : tool === 'Share' ? '⚙' : tool === 'Target' ? '☉' : tool === 'Pin' ? '📍' : tool === 'Plus' ? '+' : tool === 'Minus' ? '-' : '☷'}
                </button>
              ))}
            </div>

            {/* Bottom float actions */}
            <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button style={{ height: '32px', padding: '0 12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '11px', fontWeight: '800', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} type="button">
                <Edit size={12} /> Edit Area
              </button>
              <button style={{ height: '32px', padding: '0 12px', border: 'none', background: '#4f46e5', color: '#fff', fontSize: '11px', fontWeight: '800', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} type="button">
                <PlusCircle size={12} /> Add Area
              </button>
              <button style={{ height: '32px', width: '32px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} type="button">
                <VolumeX size={14} />
              </button>
            </div>

          </div>

          {/* Sidebar Area info panel (Right) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top row sizes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="panel" style={{ padding: '12px 16px' }}>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Area Size</span>
                <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', marginTop: '2px' }}>12.4 <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 'normal' }}>km²</span></strong>
              </div>
              
              <div className="panel" style={{ padding: '12px 16px' }}>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg. Density</span>
                <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', marginTop: '2px' }}>482 <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 'normal' }}>pts</span></strong>
              </div>
            </div>

            {/* Coverage Statistics */}
            <div className="panel" style={{ padding: '16px 20px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Coverage Statistics
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>Total Households</span>
                    <span>142,500</span>
                  </div>
                  <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '80%', height: '100%', background: '#4f46e5' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>Active Service Users</span>
                    <span>12,408</span>
                  </div>
                  <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '60%', height: '100%', background: '#4f46e5' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Service Coverage Panel */}
            <div className="panel" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Service Coverage
                </h2>
                <a href="#manage" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', fontWeight: '800', fontSize: '11px', textDecoration: 'none' }}>MANAGE</a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 12px', border: '1px solid #e0e7ff', background: '#f8fafc', borderRadius: '6px' }}>
                  <span style={{ color: '#4f46e5', fontSize: '16px' }}>🚚</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>Express Delivery</strong>
                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Guaranteed 24h turnout</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 12px', border: '1px solid #dcf3ec', background: '#f8fafc', borderRadius: '6px' }}>
                  <span style={{ color: '#10b981', fontSize: '16px' }}>🔧</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>Field Maintenance</strong>
                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Scheduled & Emergency</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 12px', border: '1px solid #fee2e2', background: '#f8fafc', borderRadius: '6px', opacity: 0.6 }}>
                  <span style={{ color: '#94a3b8', fontSize: '16px' }}>🔒</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>Emergency Response</strong>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>Out of scope for this area</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Growth Insight Card */}
            <div className="panel" style={{ padding: '20px', backgroundColor: '#0f172a', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px' }}>AI Growth Insight</h3>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', margin: '0 0 16px', lineHeight: '1.4' }}>This area shows a 14% month-over-month increase in demand. Recommendation: Add 2 field agents.</p>
              </div>
              <button style={{ width: '100%', height: '34px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }} type="button">
                VIEW HEATMAP
              </button>
            </div>

            {/* Bottom Metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--muted)', fontWeight: '700' }}>
              <span>LAST UPDATED: 2023-10-24 14:22 GMT</span>
              <span>REVISION ID: #GIS-8829-X</span>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}
