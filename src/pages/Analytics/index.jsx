import React, { useState } from 'react';
import {
  TrendingUp,
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
  Activity
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

const partnerMetrics = [
  {
    name: 'Nexis Logistics',
    category: 'Logistics',
    orders: '1,420',
    revenue: '$82,450.00',
    rating: '4.8',
    sla: '99.1%'
  },
  {
    name: 'CloudFleet Tech',
    category: 'Cloud / SaaS',
    orders: '820',
    revenue: '$45,800.00',
    rating: '4.6',
    sla: '97.4%'
  },
  {
    name: 'Swift Express',
    category: 'IT Support',
    orders: '510',
    revenue: '$24,100.00',
    rating: '4.9',
    sla: '99.8%'
  },
  {
    name: 'Apex Sanitation',
    category: 'Facility Sanitation',
    orders: '320',
    revenue: '$12,900.00',
    rating: '4.2',
    sla: '92.5%'
  }
];

export default function Analytics() {
  const { navigate } = useApp();
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <AdminShell
      activeTab="Analytics"
      searchPlaceholder="Search performance metrics, partners..."
      headerTitle="Enterprise Growth Analytics"
    >
      {/* Page Header */}
      <div className="partners-page-header">
        <div>
          <span className="queue-verification-control-tag font-bold blue-text bg-blue-soft" style={{ padding: '4px 8px', borderRadius: '4px', color: '#1d4ed8', background: '#dbeafe' }}>
            PERFORMANCE METRICS
          </span>
          <h1 className="page-title margin-top-4">Partner Performance Analytics</h1>
          <p className="page-subtitle">Track operational revenue growth, dispatch SLA ratings, and aggregate Net Promoter metrics.</p>
        </div>
        
        <div className="partners-header-buttons">
          <div className="date-select-picker-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>
            <Calendar size={16} />
            <select
              style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              aria-label="Analytics time range selection"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <button className="primary-action-btn font-bold" type="button">
            <Download size={16} />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* Top Layout Grid: Column Chart + NPM Circle Gauge */}
      <div className="fraud-top-grid" style={{ marginBottom: '24px' }}>
        
        {/* Total Partner Revenue Column Chart */}
        <div className="panel fraud-alerts-breakdown-card" style={{ flex: 1.5 }}>
          <div className="service-card-title-wrap header-row-justify" style={{ marginBottom: '20px' }}>
            <div className="title-left-wrap">
              <div className="title-icon-circle purple-bg">
                <BarChart3 size={16} />
              </div>
              <div>
                <h2>Total Partner Revenue Contribution</h2>
                <p>Monthly gross billing across combined partner services.</p>
              </div>
            </div>
            
            <div className="chart-legend-row" style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '2px' }} />
                <span>Gross Billing</span>
              </span>
            </div>
          </div>

          {/* SVG Column Chart */}
          <div className="analytics-chart-viewport" style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 20px 0', borderBottom: '1px solid #f1ecf7', position: 'relative' }}>
            {/* Horizontal Grid Lines */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', height: '1px', background: '#f8f6fb' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: '#f8f6fb' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', height: '1px', background: '#f8f6fb' }} />
            
            {/* Columns */}
            <div className="chart-column-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div className="chart-bar" style={{ height: '80px', width: '28px', background: 'var(--primary-3)', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2 }}>
                <span className="bar-tooltip">$42K</span>
              </div>
              <span className="bar-label" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>May</span>
            </div>

            <div className="chart-column-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div className="chart-bar" style={{ height: '110px', width: '28px', background: 'var(--primary-3)', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2 }}>
                <span className="bar-tooltip">$55K</span>
              </div>
              <span className="bar-label" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>Jun</span>
            </div>

            <div className="chart-column-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div className="chart-bar" style={{ height: '95px', width: '28px', background: 'var(--primary-3)', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2 }}>
                <span className="bar-tooltip">$48K</span>
              </div>
              <span className="bar-label" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>Jul</span>
            </div>

            <div className="chart-column-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div className="chart-bar" style={{ height: '130px', width: '28px', background: 'var(--primary-3)', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2 }}>
                <span className="bar-tooltip">$65K</span>
              </div>
              <span className="bar-label" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>Aug</span>
            </div>

            <div className="chart-column-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div className="chart-bar" style={{ height: '150px', width: '28px', background: 'var(--primary-3)', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2 }}>
                <span className="bar-tooltip">$78K</span>
              </div>
              <span className="bar-label" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>Sep</span>
            </div>

            <div className="chart-column-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div className="chart-bar" style={{ height: '170px', width: '28px', background: 'var(--primary)', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2 }}>
                <span className="bar-tooltip">$89K</span>
              </div>
              <span className="bar-label" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontWeight: '700' }}>Oct</span>
            </div>
          </div>
        </div>

        {/* NPM Circle Gauge Card */}
        <div className="panel fraud-kpi-card flex-center-dir" style={{ flex: 1 }}>
          <div className="fraud-card-header-simple">
            <h3>NET PROMOTER METRICS (NPM)</h3>
          </div>
          
          <div className="risk-gauge-container">
            <svg className="risk-gauge-svg" viewBox="0 0 120 120" width="120" height="120">
              <circle className="gauge-bg" cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                className="gauge-progress blue-stroke"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset="56.52" // 82% coverage
                strokeLinecap="round"
              />
            </svg>
            <div className="risk-gauge-text-overlay">
              <span className="risk-val">82</span>
              <span className="risk-label">Excellent NPS</span>
            </div>
          </div>
          
          <p className="risk-warning-explanation">
            Average customer satisfaction score across 92 validated fleet service routes.
          </p>
        </div>

      </div>

      {/* Detailed Partner performance tables */}
      <section className="panel approval-queue-directory-panel">
        <div className="directory-panel-header">
          <h2>Partner Growth & SLA Leaderboard</h2>
          <button className="secondary-action-btn" style={{ height: '32px', padding: '0 12px' }}>
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
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
                <tr key={idx} className="partner-row-clickable" onClick={() => navigate(ROUTES.partnerDetails)}>
                  <td>
                    <div className="partner-name-meta">
                      <strong className="partner-name-txt">{p.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="partner-type-badge client" style={{ background: '#f5f3ff', color: 'var(--primary-3)' }}>
                      {p.category}
                    </span>
                  </td>
                  <td>
                    <strong>{p.orders}</strong>
                  </td>
                  <td>
                    <strong className="settlement-amount-lbl">{p.revenue}</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' }}>
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span>{p.rating}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                      <span className="priority-bullet-dot" style={{ background: '#10b981' }} />
                      <span>{p.sla}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="directory-table-footer">
          <div className="rows-per-page-combo">
            <span>Rows per page:</span>
            <select aria-label="Rows per page select">
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>

          <div className="pagination-wrap">
            <button className="pag-nav-btn" type="button" disabled>
              <ChevronDown size={16} style={{ transform: 'rotate(90deg)' }} />
            </button>
            <button className="pag-num-btn active" type="button">1</button>
            <button className="pag-nav-btn" type="button" disabled>
              <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </section>

    </AdminShell>
  );
}
