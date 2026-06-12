import React, { useState } from 'react';
import {
  Calendar,
  Download,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Layers,
  Database,
  Shield,
  TrendingUp,
  Cloud,
  HelpCircle,
  Clock,
  ChevronDown,
  Users,
  Gift,
  Store,
  CalendarCheck
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

// Original dashboard components and data
import KpiCard from '../../features/dashboard/KpiCard';
import QuickActions from '../../features/dashboard/QuickActions';
import PendingKyc from '../../features/dashboard/PendingKyc';
import PartnerGrowth from '../../features/dashboard/PartnerGrowth';
import RecentBookings from '../../features/dashboard/RecentBookings';

const originalKpis = [
  { title: 'Total Users', value: '128,402', trend: '+8.2%', icon: Users, positive: true },
  { title: 'Total Partners', value: '4,810', trend: '+12.4%', icon: Gift, positive: true },
  { title: 'Total Sellers', value: '1,244', trend: '-2.1%', icon: Store, positive: false },
  { title: 'Total Bookings', value: '42,911', trend: '+22.5%', icon: CalendarCheck, positive: true },
  { title: 'Revenue (MTD)', value: '$2,482,100', footer: 'progress' },
  { title: 'Wallet Balance', value: '$412,055', footer: 'Ready for settlement' },
  { title: 'Pending Approvals', value: '124', footer: 'Applications', action: 'Review All →' },
  { title: 'Open Tickets', value: '18', footer: 'High Priority', negative: true }
];

const originalBookings = [
  ['#HZ-9102', 'JD', 'John Doe', 'Deep Cleaning', 'Oct 24, 10:30 AM', '$125.00', 'Completed'],
  ['#HZ-9101', 'SM', 'Sarah Miller', 'AC Maintenance', 'Oct 24, 11:15 AM', '$85.00', 'In Progress'],
  ['#HZ-9099', 'RK', 'Robert King', 'Plumbing Repair', 'Oct 24, 01:45 PM', '$210.00', 'Scheduled']
];

// Sample data for High-Priority Work Orders
const workOrders = [
  {
    id: '#HZ-940121',
    type: 'Infrastructure Deployment',
    client: 'Aether Systems Corp',
    date: 'Oct 24, 2023',
    status: 'PENDING',
    value: '$12,450'
  },
  {
    id: '#HZ-940122',
    type: 'Cloud Optimization',
    client: 'Nexus Global',
    date: 'Oct 23, 2023',
    status: 'VERIFIED',
    value: '$4,200'
  },
  {
    id: '#HZ-940125',
    type: 'Security Audit v2.0',
    client: 'OmniRetail Group',
    date: 'Oct 23, 2023',
    status: 'VERIFIED',
    value: '$8,900'
  },
  {
    id: '#HZ-940128',
    type: 'Disaster Recovery',
    client: 'Vanguard Logistics',
    date: 'Oct 22, 2023',
    status: 'SUSPENDED',
    value: '$15,000'
  }
];

// Sample data for Recently Added Services
const recentServices = [
  {
    name: 'Managed Kubernetes',
    time: '2 mins ago',
    category: 'Infrastructure',
    icon: Database,
    color: '#eff6ff',
    iconColor: '#3b82f6'
  },
  {
    name: 'Zero-Trust Network',
    time: '15 mins ago',
    category: 'Security',
    icon: Shield,
    color: '#f0fdf4',
    iconColor: '#22c55e'
  },
  {
    name: 'Edge Analytics API',
    time: '42 mins ago',
    category: 'Development',
    icon: TrendingUp,
    color: '#faf5ff',
    iconColor: '#a855f7'
  },
  {
    name: 'Cloud Vault Storage',
    time: '1 hour ago',
    category: 'Storage',
    icon: Cloud,
    color: '#f0f9ff',
    iconColor: '#0ea5e9'
  }
];

export default function Dashboard() {
  const [dashboardView, setDashboardView] = useState('global'); // 'global' | 'system'
  const [chartMode, setChartMode] = useState('Volume');

  const renderDashboardContent = () => {
    if (dashboardView === 'system') {
      return (
        <>
          <section className="kpi-grid">
            {originalKpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}
          </section>
          <section className="dash-columns">
            <div className="dash-left">
              <div className="panel trends-panel">
                <div className="panel-head">
                  <div>
                    <h2>Revenue & Booking Trends</h2>
                    <p>Last 30 days performance metrics</p>
                  </div>
                  <div className="segmented">
                    <button className="active" type="button">Monthly</button>
                    <button type="button">Weekly</button>
                  </div>
                </div>
                <div className="bar-chart">
                  {[45, 30, 54, 40, 68, 73, 49, 35, 59, 34, 64, 82].map((height, index) => (
                    <span key={index} style={{ height: `${height}%` }} className={index % 6 === 5 ? 'deep' : index % 2 ? 'mid' : 'light'} />
                  ))}
                </div>
                <div className="weeks">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>
              <RecentBookings bookings={originalBookings} />
            </div>
            <aside className="dash-right">
              <QuickActions />
              <PendingKyc />
              <PartnerGrowth />
            </aside>
          </section>
        </>
      );
    }

    // Global view
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Dashboard KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {/* KPI 1: Total Services */}
          <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--line)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb' }}>
                <Layers size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                ↑ 12.5%
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Services</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '4px', fontWeight: '800' }}>1,284</strong>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '75%', height: '100%', background: '#25108f' }} />
            </div>
          </div>

          {/* KPI 2: Active Nodes */}
          <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--line)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle2 size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                ↑ 8.2%
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Nodes</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '4px', fontWeight: '800' }}>1,142</strong>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '80%', height: '100%', background: '#22c55e' }} />
            </div>
          </div>

          {/* KPI 3: Pending Orders */}
          <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--line)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', color: '#d97706' }}>
                <Clock size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: '12px' }}>
                — Steady
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Orders</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '4px', fontWeight: '800' }}>94</strong>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '45%', height: '100%', background: '#d97706' }} />
            </div>
          </div>

          {/* KPI 4: Disabled Services */}
          <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--line)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626' }}>
                <AlertCircle size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#dc2626', background: '#fee2e2', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                ↓ 2.1%
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Disabled Services</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '4px', fontWeight: '800' }}>48</strong>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '15%', height: '100%', background: '#dc2626' }} />
            </div>
          </div>
        </div>

        {/* Dashboard Content Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column (Chart & Table) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 2 }}>
            {/* Revenue & Booking Dynamics panel */}
            <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Revenue & Booking Dynamics</h2>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', margin: 0 }}>Correlation between total fulfillment and gross revenue</p>
                </div>
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '6px' }}>
                  <button
                    onClick={() => setChartMode('Volume')}
                    style={{
                      border: 'none',
                      background: chartMode === 'Volume' ? '#ffffff' : 'transparent',
                      color: chartMode === 'Volume' ? 'var(--text)' : 'var(--muted)',
                      padding: '6px 16px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: chartMode === 'Volume' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    type="button"
                  >
                    Volume
                  </button>
                  <button
                    onClick={() => setChartMode('Monetary')}
                    style={{
                      border: 'none',
                      background: chartMode === 'Monetary' ? '#ffffff' : 'transparent',
                      color: chartMode === 'Monetary' ? 'var(--text)' : 'var(--muted)',
                      padding: '6px 16px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: chartMode === 'Monetary' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    type="button"
                  >
                    Monetary
                  </button>
                </div>
              </div>

              {/* Stacked Chart mock layout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '200px', borderBottom: '1px dashed var(--line)', paddingBottom: '8px', position: 'relative' }}>
                  {/* Grid Lines */}
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />

                  {/* Columns */}
                  {[
                    { day: 'MON', height1: 65, height2: 15 },
                    { day: 'TUE', height1: 85, height2: 30 },
                    { day: 'WED', height1: 95, height2: 45 },
                    { day: 'THU', height1: 75, height2: 25 },
                    { day: 'FRI', height1: 110, height2: 60 },
                    { day: 'SAT', height1: 90, height2: 40 },
                    { day: 'SUN', height1: 105, height2: 55 }
                  ].map((col, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12%', gap: '8px', zIndex: 1 }}>
                      <div style={{ width: '100%', height: '140px', display: 'flex', flexDirection: 'column-reverse', background: '#eff6ff', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: `${col.height1}%`, background: '#818cf8', display: 'flex', flexDirection: 'column-reverse' }}>
                          <div style={{ height: `${(col.height2 / col.height1) * 100}%`, background: '#4f46e5' }} />
                        </div>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)' }}>{col.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* High-Priority Work Orders Table */}
            <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>High-Priority Work Orders</h2>
                <button style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }} type="button">
                  View All
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>ID</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service Type</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Client Name</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Execution Date</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Value</th>
                      <th style={{ padding: '12px 8px', width: '40px' }} />
                    </tr>
                  </thead>
                  <tbody>
                    {workOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{order.id}</td>
                        <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--text)' }}>{order.type}</td>
                        <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{order.client}</td>
                        <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{order.date}</td>
                        <td style={{ padding: '14px 8px' }}>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: '800',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              background:
                                order.status === 'VERIFIED'
                                  ? '#ecfdf5'
                                  : order.status === 'PENDING'
                                  ? '#fffbeb'
                                  : '#fef2f2',
                              color:
                                order.status === 'VERIFIED'
                                  ? '#059669'
                                  : order.status === 'PENDING'
                                  ? '#d97706'
                                  : '#dc2626'
                            }}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{order.value}</td>
                        <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                          <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer' }} type="button">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar Panels) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
            
            {/* System Health */}
            <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>System Health</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px', margin: 0 }}>All systems operational across 12 regions.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Server Load</span>
                    <strong style={{ fontWeight: '700' }}>42%</strong>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '42%', height: '100%', background: '#4f46e5' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Memory Usage</span>
                    <strong style={{ fontWeight: '700' }}>68%</strong>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '68%', height: '100%', background: '#4f46e5' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Added Services */}
            <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                Recently Added Services
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                {recentServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: service.color, color: service.iconColor }}>
                        <IconComponent size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{service.name}</strong>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                          {service.time} • {service.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '16px', paddingTop: '12px', textAlign: 'center' }}>
                <a
                  href="#catalog"
                  onClick={(e) => e.preventDefault()}
                  style={{ fontSize: '12px', color: '#4f46e5', fontWeight: '800', textDecoration: 'none' }}
                >
                  Browse Entire Catalog
                </a>
              </div>
            </div>

            {/* Support/Assistance Card */}
            <div className="panel" style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '50%', background: '#dbeafe', color: '#1e40af' }}>
                <HelpCircle size={24} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#1e3a8a' }}>Need Assistance?</strong>
                <p style={{ fontSize: '11px', color: '#1e40af', marginTop: '4px', margin: 0, lineHeight: '1.4' }}>
                  Direct access to your dedicated Executive Support Manager.
                </p>
              </div>
              <button
                style={{
                  width: '100%',
                  height: '38px',
                  background: '#ffffff',
                  color: '#1e3a8a',
                  border: '1px solid #bfdbfe',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                type="button"
              >
                Contact Support
              </button>
            </div>

          </div>
        </div>

      </div>
    );
  };

  return (
    <AdminShell
      activeTab="Dashboard"
      headerTitle="Service Management"
      searchPlaceholder="Search service ID, client, or tech..."
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              {dashboardView === 'global' ? 'Global Performance' : 'System Overview'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
              {dashboardView === 'global'
                ? 'Real-time infrastructure health and fulfillment metrics.'
                : 'Core user metrics and booking statistics.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* View Toggle */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '6px', marginRight: '8px' }}>
              <button
                onClick={() => setDashboardView('global')}
                style={{
                  border: 'none',
                  background: dashboardView === 'global' ? '#ffffff' : 'transparent',
                  color: dashboardView === 'global' ? 'var(--text)' : 'var(--muted)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: dashboardView === 'global' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Global Performance
              </button>
              <button
                onClick={() => setDashboardView('system')}
                style={{
                  border: 'none',
                  background: dashboardView === 'system' ? '#ffffff' : 'transparent',
                  color: dashboardView === 'system' ? 'var(--text)' : 'var(--muted)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: dashboardView === 'system' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
                type="button"
              >
                System Overview
              </button>
            </div>

            {dashboardView === 'global' && (
              <>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#e0e7ff',
                    color: '#1e1b4b',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  <Calendar size={16} />
                  <span>Last 30 Days</span>
                  <ChevronDown size={14} />
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  <Download size={16} />
                  <span>Export Report</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        {renderDashboardContent()}

      </div>
    </AdminShell>
  );
}
