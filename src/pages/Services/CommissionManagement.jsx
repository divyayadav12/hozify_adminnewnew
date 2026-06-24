import React, { useState } from 'react';
import {
  Download, Plus, Settings, Search, ListFilter,
  DollarSign, Percent, BarChart3, Clock,
  CheckCircle2, AlertCircle, Edit, Trash2,
  TrendingUp, FileSpreadsheet, X, AlertTriangle, Activity
} from 'lucide-react';

const MOCK_COMMISSION_RULES = [
  { id: 'CR-001', serviceName: 'Deep Home Cleaning', category: 'Home Cleaning', providerCommission: '85%', platformCommission: '15%', type: 'Percentage', effectiveDate: 'Oct 01, 2023', status: 'ACTIVE' },
  { id: 'CR-002', serviceName: 'AC Maintenance (Premium)', category: 'AC Service', providerCommission: '80%', platformCommission: '20%', type: 'Percentage', effectiveDate: 'Sep 15, 2023', status: 'ACTIVE' },
  { id: 'CR-003', serviceName: 'Express Electrical Repair', category: 'Electrical', providerCommission: '$40', platformCommission: '$10', type: 'Fixed Amount', effectiveDate: 'Nov 01, 2023', status: 'PENDING' },
  { id: 'CR-004', serviceName: 'Plumbing Deep Inspection', category: 'Plumbing', providerCommission: '90%', platformCommission: '10%', type: 'Percentage', effectiveDate: 'Aug 20, 2023', status: 'INACTIVE' },
  { id: 'CR-005', serviceName: 'Termite Control Pro', category: 'Pest Control', providerCommission: '75%', platformCommission: '25%', type: 'Percentage', effectiveDate: 'Oct 10, 2023', status: 'ACTIVE' }
];

const MOCK_CATEGORIES = ['All Categories', 'Home Cleaning', 'Plumbing', 'Electrical', 'Appliance Repair', 'Painting', 'Pest Control', 'AC Service'];
const MOCK_STATUSES = ['All Statuses', 'ACTIVE', 'PENDING', 'INACTIVE'];

const MOCK_RECENT_CHANGES = [
  { id: 1, user: 'Alex Rivera', change: 'Updated AC Service platform commission to 20%', date: 'Oct 24, 2023 14:30' },
  { id: 2, user: 'Sarah Jenkins', change: 'Added new fixed rule for Express Electrical', date: 'Oct 23, 2023 09:15' },
  { id: 3, user: 'System Auto', change: 'Deactivated expired Plumbing promo rule', date: 'Oct 22, 2023 00:00' },
];

const MOCK_TOP_CATEGORIES = [
  { id: 1, name: 'Home Cleaning', earned: '$42,500', growth: '+12.5%' },
  { id: 2, name: 'AC Service', earned: '$38,200', growth: '+8.4%' },
  { id: 3, name: 'Plumbing', earned: '$24,100', growth: '+5.2%' },
];

export default function CommissionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ruleForm, setRuleForm] = useState({
    serviceCategory: 'Home Cleaning',
    service: '',
    commissionType: 'Percentage',
    providerShare: '',
    platformShare: '',
    effectiveFrom: '',
    expiryDate: '',
    status: 'ACTIVE'
  });
  const [formError, setFormError] = useState('');

  const handleSaveRule = () => {
    if (ruleForm.commissionType === 'Percentage') {
      const pShare = parseFloat(ruleForm.providerShare) || 0;
      const pltShare = parseFloat(ruleForm.platformShare) || 0;
      if (pShare + pltShare !== 100) {
        setFormError('Provider and Platform shares must equal 100% when using Percentage mode.');
        return;
      }
    }
    setFormError('');
    setIsDrawerOpen(false);
    // In a real app, save data here
  };

  const filteredRules = MOCK_COMMISSION_RULES.filter(rule => {
    const matchSearch = rule.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'All Categories' || rule.category === categoryFilter;
    const matchStatus = statusFilter === 'All Statuses' || rule.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Commission Management</h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Configure and manage provider, platform, and category-wise commission rules.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="secondary-action-btn font-bold" type="button" style={{ height: '36px' }}>
            <FileSpreadsheet size={14} style={{ marginRight: '6px' }} /> Export Commissions
          </button>
          <button className="secondary-action-btn font-bold" type="button" style={{ height: '36px' }}>
            <Settings size={14} style={{ marginRight: '6px' }} /> Bulk Update
          </button>
          <button 
            className="primary-action-btn font-bold" 
            type="button" 
            style={{ height: '36px', background: '#25108f', borderColor: '#25108f' }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Plus size={14} style={{ marginRight: '6px' }} /> Add Commission Rule
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="kpi-card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--line)', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Active Commission Rules</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '8px' }}>142</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', marginTop: '4px', display: 'block' }}>+12 this month</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={18} />
            </div>
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--line)', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Average Commission Rate</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '8px' }}>16.4%</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', marginTop: '4px', display: 'block' }}>Platform Share Avg</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Percent size={18} />
            </div>
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--line)', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Commission Revenue</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '8px' }}>$84.2K</strong>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', marginTop: '4px', display: 'block' }}>+8.5% vs last month</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} />
            </div>
          </div>
        </div>

        <div className="kpi-card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--line)', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Commission Changes</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '8px' }}>24</strong>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', marginTop: '4px', display: 'block' }}>This Month</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: '1.5' }}>
          
          {/* Commission Rules Table */}
          <div className="panel" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Commission Rules Table</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="dash-search" style={{ margin: 0, height: '34px', border: '1px solid var(--line)', borderRadius: '6px', width: '220px', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ marginLeft: '12px', color: 'var(--muted)' }} />
                  <input
                    placeholder="Search rules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', flex: 1 }}
                  />
                </div>
                <select 
                  className="dash-select" 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ height: '34px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '12px', color: 'var(--text)', background: '#fff' }}
                >
                  {MOCK_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select 
                  className="dash-select" 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ height: '34px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '12px', color: 'var(--text)', background: '#fff' }}
                >
                  {MOCK_STATUSES.map(stat => <option key={stat} value={stat}>{stat}</option>)}
                </select>
              </div>
            </div>

            <div className="table-wrap" style={{ overflowX: 'auto' }}>
              <table className="partner-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line)' }}>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service Name</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Provider Comm.</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Platform Comm.</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Type</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Effective Date</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRules.map((row, idx) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.serviceName}</strong>
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.category}</td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#059669', fontWeight: '700' }}>{row.providerCommission}</td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#25108f', fontWeight: '700' }}>{row.platformCommission}</td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '12px', background: row.type === 'Percentage' ? '#eff6ff' : '#f5f3ff', color: row.type === 'Percentage' ? '#3b82f6' : '#8b5cf6', fontSize: '10px', fontWeight: '700' }}>
                            {row.type}
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.effectiveDate}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: row.status === 'ACTIVE' ? '#d1fae5' : row.status === 'PENDING' ? '#fef3c7' : '#fee2e2', color: row.status === 'ACTIVE' ? '#059669' : row.status === 'PENDING' ? '#d97706' : '#dc2626' }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><Edit size={14} /></button>
                            <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRules.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                          No commission rules found.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: '1' }}>
          
          {/* Category-wise Commission Distribution */}
          <div className="panel" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart3 size={18} style={{ color: '#25108f' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Category Commission Distribution</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Home Cleaning', val: 85, color: '#3b82f6' },
                { label: 'AC Service', val: 70, color: '#10b981' },
                { label: 'Plumbing', val: 60, color: '#f59e0b' },
                { label: 'Electrical', val: 55, color: '#8b5cf6' },
                { label: 'Pest Control', val: 40, color: '#ec4899' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text)' }}>{item.label}</span>
                    <span style={{ color: 'var(--muted)' }}>{item.val}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Revenue Generating Categories */}
          <div className="panel" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <TrendingUp size={18} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Top Revenue Categories</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_TOP_CATEGORIES.map((cat, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '12px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'var(--muted)' }}>
                      #{cat.id}
                    </span>
                    <strong style={{ fontSize: '13px', color: 'var(--text)' }}>{cat.name}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#059669' }}>{cat.earned}</strong>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>{cat.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Commission Changes */}
          <div className="panel" style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Clock size={18} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Changes</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: '11px', top: '12px', bottom: '12px', width: '2px', background: 'var(--line)', zIndex: 0 }} />
              
              {MOCK_RECENT_CHANGES.map((change, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '12px', background: '#fff', border: '2px solid #25108f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#25108f' }} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '13px', color: 'var(--text)', lineHeight: '1.4' }}>
                      <strong style={{ fontWeight: '700' }}>{change.user}</strong> {change.change.charAt(0).toLowerCase() + change.change.slice(1)}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>{change.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', background: '#fff', height: '100%', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Add Commission Rule</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {formError && (
                <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Service Category</label>
                <select 
                  style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px' }}
                  value={ruleForm.serviceCategory}
                  onChange={(e) => setRuleForm({...ruleForm, serviceCategory: e.target.value})}
                >
                  {MOCK_CATEGORIES.filter(c => c !== 'All Categories').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Service / Subcategory</label>
                <input 
                  type="text" 
                  placeholder="e.g. Deep Home Sanitization"
                  style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', boxSizing: 'border-box' }}
                  value={ruleForm.service}
                  onChange={(e) => setRuleForm({...ruleForm, service: e.target.value})}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Commission Type</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="commType" 
                      checked={ruleForm.commissionType === 'Percentage'} 
                      onChange={() => setRuleForm({...ruleForm, commissionType: 'Percentage'})} 
                    />
                    Percentage (%)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="commType" 
                      checked={ruleForm.commissionType === 'Fixed Amount'} 
                      onChange={() => setRuleForm({...ruleForm, commissionType: 'Fixed Amount'})} 
                    />
                    Fixed Amount ($)
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Provider Share</label>
                  <input 
                    type="number" 
                    placeholder={ruleForm.commissionType === 'Percentage' ? 'e.g. 80' : 'e.g. 50'}
                    style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', boxSizing: 'border-box' }}
                    value={ruleForm.providerShare}
                    onChange={(e) => setRuleForm({...ruleForm, providerShare: e.target.value})}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Platform Share</label>
                  <input 
                    type="number" 
                    placeholder={ruleForm.commissionType === 'Percentage' ? 'e.g. 20' : 'e.g. 10'}
                    style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', boxSizing: 'border-box' }}
                    value={ruleForm.platformShare}
                    onChange={(e) => setRuleForm({...ruleForm, platformShare: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Effective From</label>
                  <input 
                    type="date" 
                    style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', boxSizing: 'border-box' }}
                    value={ruleForm.effectiveFrom}
                    onChange={(e) => setRuleForm({...ruleForm, effectiveFrom: e.target.value})}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Expiry Date <span style={{ color: 'var(--muted)', fontWeight: '400' }}>(Optional)</span></label>
                  <input 
                    type="date" 
                    style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', boxSizing: 'border-box' }}
                    value={ruleForm.expiryDate}
                    onChange={(e) => setRuleForm({...ruleForm, expiryDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Status</label>
                <select 
                  style={{ width: '100%', height: '40px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 12px', fontSize: '13px' }}
                  value={ruleForm.status}
                  onChange={(e) => setRuleForm({...ruleForm, status: e.target.value})}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

            </div>
            
            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ height: '36px', padding: '0 16px', borderRadius: '6px', border: '1px solid var(--line)', background: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRule}
                style={{ height: '36px', padding: '0 16px', borderRadius: '6px', border: 'none', background: '#25108f', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Save Rule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
