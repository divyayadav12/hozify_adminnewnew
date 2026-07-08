import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  Crown, CheckCircle2, Zap, Users, Shield, Plus, Edit, Trash2, ArrowUpRight
} from 'lucide-react';
import Toggle from '../../../../../components/common/Toggle';

const INITIAL_PLANS = [
  { id: '1', name: 'Powerpass Silver', price: '₹499', validity: '3 Months', active: true, benefits: ['Free Delivery', 'Standard Support', '5% Discount'] },
  { id: '2', name: 'Powerpass Gold', price: '₹899', validity: '6 Months', active: true, benefits: ['Free Delivery', 'Priority Support', '10% Discount', 'No Surge Pricing'] },
  { id: '3', name: 'Powerpass Platinum', price: '₹1499', validity: '12 Months', active: true, benefits: ['Free Delivery', '24/7 VIP Support', '15% Discount', 'No Surge Pricing', 'Exclusive Perks'] },
];

export default function PowerpassManagerPage() {
  const [plans, setPlans] = useState(INITIAL_PLANS);

  return (
    <AdminShell activeTab="CMS" headerTitle="Powerpass Subscription Manager">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Powerpass Subscriptions</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Powerpass Subscriptions</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Configure and manage the premium membership plans available to users on the app.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
            <Plus size={16} strokeWidth={2.5} /> Create Plan
          </button>
        </div>

        {/* Plan Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {plans.map((plan, index) => (
            <div key={plan.id} style={{ 
              background: '#fff', 
              border: index === 2 ? '2px solid #4f46e5' : '1px solid #e2e8f0', 
              borderRadius: '16px', 
              padding: '24px', 
              display: 'flex', flexDirection: 'column', gap: '16px',
              position: 'relative',
              boxShadow: index === 2 ? '0 10px 25px -5px rgba(79, 70, 229, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              {index === 2 && (
                <div style={{ position: 'absolute', top: '-12px', right: '24px', background: '#4f46e5', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>
                  MOST POPULAR
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Crown size={20} color={index === 0 ? '#94a3b8' : index === 1 ? '#fbbf24' : '#4f46e5'} />
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>{plan.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{plan.price}</span>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>/ {plan.validity}</span>
                  </div>
                </div>
                <Toggle checked={plan.active} onChange={() => {}} />
              </div>
              
              <div style={{ height: '1px', background: '#e2e8f0', margin: '8px 0' }} />
              
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>{benefit}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                 <button style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '8px', color: '#475569', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                   <Edit size={14} /> Edit Plan
                 </button>
                 <button style={{ padding: '10px', border: 'none', background: '#fef2f2', borderRadius: '8px', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
