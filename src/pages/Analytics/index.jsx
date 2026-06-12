import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import {
  Download,
  Calendar,
  SlidersHorizontal,
  ChevronDown,
  BarChart3,
  Award,
  Users,
  Compass,
  ArrowUpRight,
  Star,
  Activity,
  FileText,
  Search,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Sliders,
  TrendingUp,
  MapPin,
  TrendingDown
} from 'lucide-react';

export default function Analytics() {
  const { navigate } = useApp();
  const [activeView, setActiveView] = useState('insights'); // 'insights' or 'reports'
  const [timeRange, setTimeRange] = useState('7 Days');

  // Business Reports Builder States
  const [activeCategory, setActiveCategory] = useState('Revenue');
  const [dateRange, setDateRange] = useState('2023-10-01 to 2023-10-31');
  const [businessTier, setBusinessTier] = useState('All Tiers');
  const [regionFilter, setRegionFilter] = useState('North America');
  const [searchTableTerm, setSearchTableTerm] = useState('');
  const [statuses, setStatuses] = useState({ active: true, pending: true, inactive: false });

  // Report Categories list (Screen 3 Left Panel)
  const reportCategories = [
    { id: 'Revenue', label: 'Revenue' },
    { id: 'Compliance', label: 'Compliance' },
    { id: 'Branch Performance', label: 'Branch Performance' },
    { id: 'Employee Activity', label: 'Employee Activity' }
  ];

  // Screen 3 Report Preview Revenue Data
  const detailedRevenueData = [
    { id: '4420-BK', name: 'Atlas Global Logistics', region: 'North America', revenue: '$1,240,500.00', growth: '+12.4%', status: 'Verified', statusColor: '#10b981', statusBg: '#ecfdf5' },
    { id: '8891-XL', name: 'Nova Retail Group', region: 'EMEA', revenue: '$892,300.50', growth: '+4.1%', status: 'Verified', statusColor: '#10b981', statusBg: '#ecfdf5' },
    { id: '1102-AQ', name: 'Horizon FinTech', region: 'APAC', revenue: '$2,410,200.00', growth: '-2.8%', status: 'Pending', statusColor: '#f59e0b', statusBg: '#fef3c7' },
    { id: '5567-TR', name: 'Quantum Dynamics', region: 'North America', revenue: '$560,900.00', growth: '+1.5%', status: 'Suspended', statusColor: '#ef4444', statusBg: '#fee2e2' }
  ];

  // Original Partner Leaderboard Data
  const partnerMetrics = [
    { name: 'Nexis Logistics', category: 'Logistics', orders: '1,420', revenue: '$82,450.00', rating: '4.8', sla: '99.1%' },
    { name: 'CloudFleet Tech', category: 'Cloud / SaaS', orders: '820', revenue: '$45,800.00', rating: '4.6', sla: '97.4%' },
    { name: 'Swift Express', category: 'IT Support', orders: '510', revenue: '$24,100.00', rating: '4.9', sla: '99.8%' },
    { name: 'Apex Sanitation', category: 'Facility Sanitation', orders: '320', revenue: '$12,900.00', rating: '4.2', sla: '92.5%' }
  ];

  // Generation action
  const handleStatusChange = (key) => {
    setStatuses(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminShell
      activeTab="Analytics"
      searchPlaceholder="Search performance analytics..."
      headerTitle="Enterprise Growth Analytics"
    >
      <div className="analytics-reports-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Toggle sub-header: Insights vs Reports */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', paddingBottom: '2px', gap: '16px' }}>
          <button
            onClick={() => setActiveView('insights')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeView === 'insights' ? '2px solid #4f46e5' : '2px solid transparent',
              padding: '6px 12px',
              color: activeView === 'insights' ? '#4f46e5' : 'var(--muted)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none'
            }}
            type="button"
          >
            Insights Dashboard
          </button>
          <button
            onClick={() => setActiveView('reports')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeView === 'reports' ? '2px solid #4f46e5' : '2px solid transparent',
              padding: '6px 12px',
              color: activeView === 'reports' ? '#4f46e5' : 'var(--muted)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none'
            }}
            type="button"
          >
            Reports Builder
          </button>
        </div>

        {activeView === 'insights' ? (
          /* ================= BUSINESS PERFORMANCE INSIGHTS VIEW (SCREEN 1) ================= */
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ANALYTICS DASHBOARD</span>
                <h1 className="page-title" style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: '800' }}>Business Performance Insights</h1>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                  {['7 Days', '30 Days', 'YTD'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeRange(t)}
                      style={{
                        border: 'none',
                        padding: '4px 10px',
                        background: timeRange === t ? '#fff' : 'transparent',
                        color: timeRange === t ? '#0f172a' : 'var(--muted)',
                        borderRadius: '4px',
                        boxShadow: timeRange === t ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '11px'
                      }}
                      type="button"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--line)', background: '#fff', color: 'var(--text)', fontSize: '12px', fontWeight: '700', height: '32px', padding: '0 12px', borderRadius: '6px' }}
                  onClick={() => alert('Exporting data...')}
                  type="button"
                >
                  Export Data
                </button>
              </div>
            </div>

            {/* 4 KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              
              {/* Total Revenue */}
              <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '130px', position: 'relative' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>$</div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#10b981' }}>↗ +12.5%</span>
                  </div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '10px', fontWeight: '700' }}>Total Revenue</span>
                  <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', marginTop: '4px' }}>$4,282,190</strong>
                </div>
                {/* Mini bar chart visually sketched at bottom */}
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px', marginTop: '10px' }}>
                  {[20, 30, 25, 45, 35, 50, 40, 55, 45, 60, 50, 70].map((h, i) => (
                    <div key={i} style={{ flex: 1, background: '#cbd5e1', height: `${h}%`, borderRadius: '1px' }} />
                  ))}
                </div>
              </div>

              {/* Avg Rating */}
              <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '130px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>★</div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#10b981' }}>↗ +0.3</span>
                  </div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '10px', fontWeight: '700' }}>Avg. Rating</span>
                  <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', marginTop: '4px' }}>4.82</strong>
                </div>
                {/* Yellow stars row */}
                <div style={{ display: 'flex', gap: '3px', color: '#f59e0b', marginTop: '8px' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />)}
                </div>
              </div>

              {/* New Signups */}
              <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '130px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#10b981' }}>↗ +22%</span>
                  </div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '10px', fontWeight: '700' }}>New Sign-ups</span>
                  <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', marginTop: '4px' }}>1,248</strong>
                </div>
                {/* Avatar icons row mockup */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                  <span style={{ height: '16px', width: '16px', borderRadius: '50%', background: '#6366f1', color: '#fff', fontSize: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>JD</span>
                  <span style={{ height: '16px', width: '16px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>MK</span>
                  <span style={{ height: '16px', width: '16px', borderRadius: '50%', background: '#ec4899', color: '#fff', fontSize: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>AS</span>
                  <span style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '700' }}>+1.2k</span>
                </div>
              </div>

              {/* Churn Rate */}
              <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '130px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✖</div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#ef4444' }}>↘ +1.4%</span>
                  </div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '10px', fontWeight: '700' }}>Churn Rate</span>
                  <strong style={{ display: 'block', fontSize: '22px', color: 'var(--text)', marginTop: '4px' }}>2.41%</strong>
                </div>
                {/* Progress bar slider */}
                <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginTop: '10px' }}>
                  <div style={{ width: '24%', height: '100%', background: '#ef4444' }} />
                </div>
              </div>

            </div>

            {/* Layout Grid columns */}
            <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
              
              {/* Left Side: Trends and Performance lists */}
              <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Revenue vs Bookings Trend Chart Card */}
                <div className="panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Revenue vs Bookings Trend</h2>
                    
                    <div style={{ display: 'flex', gap: '14px', fontSize: '11px', fontWeight: '700' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)' }}>
                        <span style={{ height: '8px', width: '8px', background: '#cbd5e1', borderRadius: '2px' }} />
                        Revenue
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                        <span style={{ height: '8px', width: '8px', background: '#0f172a', borderRadius: '50%' }} />
                        Bookings
                      </span>
                    </div>
                  </div>

                  {/* Chart Viewport: columns + curved path overlay */}
                  <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 10px 0', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '33%', height: '1px', background: '#f1f5f9' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '66%', height: '1px', background: '#f1f5f9' }} />

                    {/* Columns */}
                    {[
                      { day: 'Mon', h: 30 },
                      { day: 'Tue', h: 55 },
                      { day: 'Wed', h: 50 },
                      { day: 'Thu', h: 70 },
                      { day: 'Fri', h: 90 },
                      { day: 'Sat', h: 65 },
                      { day: 'Sun', h: 80 }
                    ].map((col, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                        <div style={{ width: '40px', height: `${col.h}%`, background: '#c7d2fe', borderRadius: '2px 2px 0 0' }} />
                        <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>{col.day}</span>
                      </div>
                    ))}

                    {/* Overlay Curved line SVG */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}>
                      <path d="M 40 120 Q 120 70, 200 100 T 360 60 T 520 110 T 600 50" fill="none" stroke="#0f172a" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Top Performing Businesses */}
                <div className="panel" style={{ padding: '20px' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: '0 0 16px' }}>Top Performing Businesses</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', fontWeight: '700' }}>
                    {[
                      { name: 'Vanguard Logistics', value: '$842k', rate: '85%' },
                      { name: 'Lumina Health', value: '$612k', rate: '65%' },
                      { name: 'Neo Bank Int.', value: '$489k', rate: '55%' },
                      { name: 'Green Wave Solar', value: '$312k', rate: '35%' }
                    ].map((row, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text)' }}>{row.name}</span>
                          <span style={{ color: 'var(--muted)' }}>{row.value}</span>
                        </div>
                        <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: row.rate, height: '100%', background: '#4f46e5' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highest Rated Businesses */}
                <div className="panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Highest Rated Businesses</h2>
                    <a href="#view-all" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', fontWeight: '800', fontSize: '11px', textDecoration: 'none' }}>
                      View All
                    </a>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Apex Tech Solutions', desc: 'Enterprise Software', score: '4.98', reviews: '2.4k' },
                      { name: 'Blue Ocean Capital', desc: 'Financial Services', score: '4.95', reviews: '1.8k' },
                      { name: 'Core Systems Ltd', desc: 'IT Consulting', score: '4.91', reviews: '940' }
                    ].map((bus, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '6px' }}>
                        <div style={{ height: '32px', width: '32px', borderRadius: '4px', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>
                          {bus.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>{bus.name}</strong>
                          <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>{bus.desc}</span>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: '700' }}>
                          <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '2px' }}>★ {bus.score}</span>
                          <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)', marginTop: '2px' }}>{bus.reviews} reviews</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side: Distribution, Heatmap and branches */}
              <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Revenue Distribution */}
                <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Revenue Distribution</h2>
                  
                  {/* Visual distribution container */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', background: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                    {/* Ring Dial */}
                    <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="100" height="100" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#4f46e5" strokeWidth="4.5" strokeDasharray="64 100" strokeDashoffset="0" strokeLinecap="round" />
                      </svg>
                      <div style={{ position: 'absolute', textAlign: 'center' }}>
                        <strong style={{ fontSize: '20px', color: 'var(--text)', display: 'block' }}>64%</strong>
                        <span style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '800' }}>Retail</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', fontSize: '11px', fontWeight: '700' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                          <span style={{ height: '8px', width: '8px', background: '#4f46e5', borderRadius: '50%' }} />
                          Retail & Goods
                        </span>
                        <span style={{ color: 'var(--text)' }}>64%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                          <span style={{ height: '8px', width: '8px', background: '#1d4ed8', borderRadius: '50%' }} />
                          Services
                        </span>
                        <span style={{ color: 'var(--text)' }}>22%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                          <span style={{ height: '8px', width: '8px', background: '#bfdbfe', borderRadius: '50%' }} />
                          Hospitality
                        </span>
                        <span style={{ color: 'var(--text)' }}>14%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Heatmap (Colored square grid) */}
                <div className="panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Growth Heatmap</h2>
                    <span style={{ fontSize: '8px', color: 'var(--muted)', fontWeight: '800', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      ■ ■ ■ ■ <span style={{ color: 'var(--text)' }}>DENSITY</span>
                    </span>
                  </div>

                  {/* 8 rows x 12 cols square grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {Array.from({ length: 8 }).map((_, rIdx) => (
                      <div key={rIdx} style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: 12 }).map((_, cIdx) => {
                          // Skew density shades
                          const opacities = [0.1, 0.2, 0.35, 0.6, 0.8, 0.9, 0.4, 0.2];
                          const op = opacities[(rIdx + cIdx) % opacities.length];
                          return (
                            <div
                              key={cIdx}
                              style={{
                                flex: 1,
                                aspectRatio: '1',
                                background: `rgba(79, 70, 229, ${op})`,
                                borderRadius: '2px'
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Week Labels bottom */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--muted)', fontWeight: '700', marginTop: '10px', padding: '0 4px' }}>
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>

                {/* Most Active Branches */}
                <div className="panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Most Active Branches</h2>
                    <button style={{ border: 'none', background: '#f1f5f9', height: '24px', width: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} type="button" aria-label="Sort branches">
                      <Sliders size={12} style={{ color: 'var(--muted)' }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'London Flagship', desc: '84 Transactions today', label: 'PEAK', color: '#10b981', bg: '#ecfdf5' },
                      { name: 'New York Hub', desc: '72 Transactions today', label: 'STABLE', color: '#b45309', bg: '#fef3c7' },
                      { name: 'Singapore East', desc: '61 Transactions today', label: 'GROWTH', color: '#059669', bg: '#ecfdf5' }
                    ].map((br, idx) => (
                      <div key={idx} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{ height: '30px', width: '30px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                            <MapPin size={14} />
                          </div>
                          <div>
                            <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>{br.name}</strong>
                            <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>{br.desc}</span>
                          </div>
                        </div>

                        <span style={{ fontSize: '8px', fontWeight: '900', color: br.color, background: br.bg, padding: '2px 6px', borderRadius: '3px' }}>
                          {br.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : (
          /* ================= REPORTS CONSOLE VIEW (SCREEN 3 TURN 2) ================= */
          <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
            
            {/* Left Category & parameters panel */}
            <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="panel" style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>Report Categories</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {reportCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 12px',
                          background: isActive ? '#eff6ff' : 'transparent',
                          border: 'none',
                          color: isActive ? '#1e40af' : 'var(--text)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          outline: 'none'
                        }}
                        type="button"
                      >
                        {cat.label}
                        {isActive && <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Parameters</h3>
                
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Date Range</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--line)', background: '#fff', borderRadius: '6px', padding: '0 10px', height: '36px' }}>
                    <Calendar size={14} style={{ color: 'var(--muted)' }} />
                    <input
                      type="text"
                      style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '11px', outline: 'none', fontWeight: '700' }}
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      aria-label="Analytics date range selection input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Business Tier</label>
                  <select
                    style={{ width: '100%', height: '36px', border: '1px solid var(--line)', background: '#fff', borderRadius: '6px', padding: '0 10px', fontSize: '11px', fontWeight: '700', outline: 'none' }}
                    value={businessTier}
                    onChange={(e) => setBusinessTier(e.target.value)}
                    aria-label="Report business tier selection dropdown"
                  >
                    <option value="All Tiers">All Tiers</option>
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Region</label>
                  <select
                    style={{ width: '100%', height: '36px', border: '1px solid var(--line)', background: '#fff', borderRadius: '6px', padding: '0 10px', fontSize: '11px', fontWeight: '700', outline: 'none' }}
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    aria-label="Report region selection dropdown"
                  >
                    <option value="North America">North America</option>
                    <option value="EMEA">EMEA</option>
                    <option value="APAC">APAC</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Status</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontWeight: '700' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={statuses.active} onChange={() => handleStatusChange('active')} style={{ accentColor: '#3b82f6' }} />
                      Active
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={statuses.pending} onChange={() => handleStatusChange('pending')} style={{ accentColor: '#3b82f6' }} />
                      Pending
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={statuses.inactive} onChange={() => handleStatusChange('inactive')} style={{ accentColor: '#3b82f6' }} />
                      Inactive
                    </label>
                  </div>
                </div>

                <button
                  style={{ width: '100%', height: '38px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: '800', borderRadius: '6px', cursor: 'pointer', marginTop: '6px' }}
                  onClick={() => alert('Generating analytics reports...')}
                  type="button"
                >
                  Generate Report
                </button>
              </div>
            </div>

            {/* Right Report detail panel */}
            <div style={{ flex: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeCategory === 'Revenue' ? (
                <>
                  <div className="panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Monthly Revenue Trend</h2>
                      <div style={{ display: 'flex', gap: '14px', fontSize: '11px', fontWeight: '700' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)' }}>
                          <span style={{ height: '8px', width: '8px', background: '#3b82f6', borderRadius: '2px' }} />
                          Current Period
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                          <span style={{ height: '8px', width: '8px', background: '#cbd5e1', borderRadius: '2px' }} />
                          Prev Period
                        </span>
                      </div>
                    </div>

                    <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 10px 0', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
                      {[
                        { m: 'Jan', val1: 40, val2: 30 },
                        { m: 'Feb', val1: 50, val2: 45 },
                        { m: 'Mar', val1: 65, val2: 50 },
                        { m: 'Apr', val1: 60, val2: 55 },
                        { m: 'May', val1: 75, val2: 60 },
                        { m: 'Jun', val1: 90, val2: 80 },
                        { m: 'Jul', val1: 85, val2: 70 },
                        { m: 'Aug', val1: 55, val2: 45 }
                      ].map((col, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '140px' }}>
                            <div style={{ width: '12px', height: `${col.val1}%`, background: '#3b82f6', borderRadius: '2px 2px 0 0' }} />
                            <div style={{ width: '12px', height: `${col.val2}%`, background: '#cbd5e1', borderRadius: '2px 2px 0 0' }} />
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>{col.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
                      <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Report Preview: Detailed Revenue Data</h2>
                      <div className="input-wrap" style={{ minHeight: '34px', padding: '0 8px', maxWidth: '240px' }}>
                        <Search size={14} />
                        <input
                          placeholder="Search rows..."
                          value={searchTableTerm}
                          onChange={(e) => setSearchTableTerm(e.target.value)}
                          style={{ fontSize: '12px' }}
                        />
                      </div>
                    </div>

                    <div className="table-wrap">
                      <table className="approval-queue-table">
                        <thead>
                          <tr>
                            <th>ENTITY NAME</th>
                            <th>REGION</th>
                            <th>REVENUE (USD)</th>
                            <th>GROWTH</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detailedRevenueData
                            .filter(b => b.name.toLowerCase().includes(searchTableTerm.toLowerCase()))
                            .map((row, idx) => (
                              <tr key={idx} className="partner-row-clickable" onClick={() => navigate(ROUTES.businessDetails)} style={{ cursor: 'pointer' }}>
                                <td>
                                  <div>
                                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong>
                                    <span style={{ fontSize: '10px', color: 'var(--muted)' }}>ID: {row.id}</span>
                                  </div>
                                </td>
                                <td style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '700' }}>{row.region}</td>
                                <td style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '800' }}>{row.revenue}</td>
                                <td style={{ fontSize: '13px', color: row.growth.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: '800' }}>{row.growth}</td>
                                <td>
                                  <span style={{ fontSize: '9px', fontWeight: '900', color: row.statusColor, background: row.statusBg, padding: '3px 8px', borderRadius: '4px' }}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                /* Leaderboard Fallback view */
                <section className="panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Partner Growth & SLA Leaderboard</h2>
                  </div>

                  <div className="table-wrap">
                    <table className="approval-queue-table">
                      <thead>
                        <tr>
                          <th>PARTNER NAME</th>
                          <th>SERVICE TYPE</th>
                          <th>TOTAL COMPLETED ORDERS</th>
                          <th>GROSS REVENUE CONTRIBUTION</th>
                          <th>AVG RATING</th>
                          <th>SLA ADHERENCE RATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partnerMetrics.map((p, idx) => (
                          <tr key={idx} className="partner-row-clickable" onClick={() => navigate(ROUTES.partnerDetails)} style={{ cursor: 'pointer' }}>
                            <td><strong style={{ color: 'var(--text)' }}>{p.name}</strong></td>
                            <td>
                              <span style={{ background: '#f5f3ff', color: 'var(--primary-3)', fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                                {p.category}
                              </span>
                            </td>
                            <td><strong>{p.orders}</strong></td>
                            <td><strong style={{ color: '#4f46e5' }}>{p.revenue}</strong></td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' }}>
                                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                <span>{p.rating}</span>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                                <span className="priority-bullet-dot" style={{ background: '#10b981' }} />
                                <span>{p.sla}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>

          </div>
        )}

      </div>
    </AdminShell>
  );
}
