import React, { useState } from 'react';
import {
  Download,
  Zap,
  Edit2,
  FileCheck2,
  Coins,
  Receipt,
  Search,
  ListFilter,
  Calculator,
  PlusCircle
} from 'lucide-react';

const pricingCatalog = [
  {
    name: 'Deep Home Sanitization',
    category: 'Maintenance & Care',
    price: '$120.00',
    gst: '$21.60',
    fee: '$10.00',
    commission: '$15.00',
    commMeta: '12.5% fixed',
    status: 'ACTIVE'
  },
  {
    name: 'AC Maintenance (Premium)',
    category: 'Appliances',
    price: '$45.00',
    gst: '$8.10',
    fee: '$5.00',
    commission: '$6.75',
    commMeta: '15% tiered',
    status: 'ACTIVE'
  },
  {
    name: 'Express Electrical Repair',
    category: 'Urgent Services',
    price: '$200.00',
    gst: '$36.00',
    fee: '$20.00',
    commission: '$20.00',
    commMeta: '10% special',
    status: 'PENDING'
  },
  {
    name: 'Plumbing Deep Inspection',
    category: 'Maintenance & Care',
    price: '$75.00',
    gst: '$13.50',
    fee: '$7.50',
    commission: '$9.38',
    commMeta: '12.5% fixed',
    status: 'ACTIVE'
  }
];

export default function PricingStrategy() {
  const [catalog, setCatalog] = useState(pricingCatalog);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Toggles for Rule Engine
  const [rules, setRules] = useState({
    luxury: true,
    weekend: false,
    firstTime: true
  });

  const handleToggleRule = (ruleKey) => {
    setRules(prev => ({
      ...prev,
      [ruleKey]: !prev[ruleKey]
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Breadcrumb row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700' }}>
        <span>Catalog</span>
        <span>&gt;</span>
        <span style={{ color: 'var(--text)' }}>Pricing Logic</span>
      </div>

      {/* Header title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Financial Governance</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              color: 'var(--text)',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            type="button"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#25108f',
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
            <Zap size={16} fill="currentColor" />
            <span>Bulk Update</span>
          </button>
        </div>
      </div>

      {/* KPI summaries layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.5fr 1fr 1fr', gap: '20px' }}>
        
        {/* Active Strategy card */}
        <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', flexShrink: 0 }}>
            <FileCheck2 size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Strategy</span>
                <strong style={{ display: 'block', fontSize: '20px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>Global Commission 12.5%</strong>
              </div>
              <span style={{ fontSize: '9px', fontWeight: '900', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                STABLE
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', margin: 0, lineHeight: '1.4' }}>
              Unified rate applied across all standard service categories unless overridden by category rules.
            </p>
          </div>
          
          <button
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            type="button"
            title="Edit Rule"
          >
            <Edit2 size={12} />
          </button>
        </div>

        {/* Est. Monthly Revenue */}
        <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Est. Monthly Revenue</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>$248.5K</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '6px', fontWeight: '700' }}>72% of target reached</span>
          </div>
          <Coins size={36} style={{ color: '#2563eb' }} />
        </div>

        {/* Tax Liability */}
        <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tax Liability</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>$42,109</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#dc2626', marginTop: '6px', fontWeight: '800' }}>18% GST included in calculation</span>
          </div>
          <Receipt size={36} style={{ color: '#dc2626' }} />
        </div>
      </div>

      {/* Main Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'stretch' }}>
        
        {/* Pricing Catalog Table */}
        <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', flex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Pricing Catalog</h3>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="dash-search" style={{ margin: 0, height: '34px', border: '1px solid var(--line)', borderRadius: '6px', width: '200px' }}>
                <Search size={16} />
                <input
                  placeholder="Search catalog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '12px' }}
                />
              </div>
              <button
                style={{
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--line)',
                  background: '#ffffff',
                  color: 'var(--muted)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                type="button"
              >
                <ListFilter size={16} />
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <th style={{ padding: '12px 8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Base Price</th>
                  <th style={{ padding: '12px 8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>GST (18%)</th>
                  <th style={{ padding: '12px 8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Platform Fee</th>
                  <th style={{ padding: '12px 8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Commission</th>
                  <th style={{ padding: '12px 8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {catalog
                  .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {/* Name */}
                      <td style={{ padding: '14px 8px' }}>
                        <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong>
                        <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{row.category}</span>
                      </td>
                      
                      {/* Base Price */}
                      <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--text)', fontWeight: '700' }}>{row.price}</td>
                      
                      {/* GST */}
                      <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{row.gst}</td>
                      
                      {/* Platform Fee */}
                      <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{row.fee}</td>
                      
                      {/* Commission */}
                      <td style={{ padding: '14px 8px' }}>
                        <strong style={{ display: 'block', fontSize: '13px', color: '#25108f' }}>{row.commission}</strong>
                        <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)', marginTop: '2px' }}>{row.commMeta}</span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: row.status === 'ACTIVE' ? '#07956f' : '#d97706' }}>
                          ● {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rule Engine (Right) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          
          {/* Rule Engine */}
          <div className="panel" style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>RULE ENGINE</h3>
              <span style={{ fontSize: '8px', fontWeight: '900', color: '#4f46e5', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                BETA
              </span>
            </div>
            
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: '1.4' }}>
              Manage category-level logic to dynamically adjust fees based on demand or service type.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
              {/* Luxury Tiers */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Luxury Tiers</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px', maxWidth: '160px', lineHeight: '1.3' }}>
                    Services &gt; $500 apply a flat 20% commission cap.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleRule('luxury')}
                  style={{
                    width: '40px',
                    height: '22px',
                    borderRadius: '11px',
                    background: rules.luxury ? '#25108f' : '#cbd5e1',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <span style={{ position: 'absolute', top: '2px', left: rules.luxury ? '20px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: '#ffffff', transition: 'left 0.2s' }} />
                </button>
              </div>

              {/* Weekend Surge */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Weekend Surge</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px', maxWidth: '160px', lineHeight: '1.3' }}>
                    Auto-increase Platform Fee by 5% during Sat-Sun.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleRule('weekend')}
                  style={{
                    width: '40px',
                    height: '22px',
                    borderRadius: '11px',
                    background: rules.weekend ? '#25108f' : '#cbd5e1',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <span style={{ position: 'absolute', top: '2px', left: rules.weekend ? '20px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: '#ffffff', transition: 'left 0.2s' }} />
                </button>
              </div>

              {/* First-Time Provider */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>First-Time Provider</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px', maxWidth: '160px', lineHeight: '1.3' }}>
                    0% Commission on first 5 jobs for new partners.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleRule('firstTime')}
                  style={{
                    width: '40px',
                    height: '22px',
                    borderRadius: '11px',
                    background: rules.firstTime ? '#25108f' : '#cbd5e1',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <span style={{ position: 'absolute', top: '2px', left: rules.firstTime ? '20px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: '#ffffff', transition: 'left 0.2s' }} />
                </button>
              </div>
            </div>

            {/* Define category rule button block */}
            <button
              style={{
                width: '100%',
                height: '42px',
                border: '1px dashed var(--line)',
                background: 'transparent',
                borderRadius: '8px',
                color: 'var(--muted)',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px'
              }}
              type="button"
            >
              <PlusCircle size={14} />
              <span>DEFINE NEW CATEGORY RULE</span>
            </button>
          </div>

          {/* Calculator Floating button */}
          <button
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#25108f',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              alignSelf: 'flex-end',
              marginTop: '16px'
            }}
            type="button"
            title="Calculator Rules Simulator"
          >
            <Calculator size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}
