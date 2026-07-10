import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockAddresses, mockPackages } from '../data/mockData';
import { useApp } from '../../../../../hooks/useApp';
import { MapPin, Plus, Edit, Trash2, ChevronLeft, ShieldCheck } from 'lucide-react';

export default function FlowAddressPage() {
  const { navigate } = useApp();
  const [selected, setSelected] = useState(mockAddresses[0]?.id);
  const cartItem = mockPackages['s1'][0];

  return (
    <AdminShell>
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }} onClick={() => navigate('/cms/app-management/user-app/flow/cart')}>Cart</span>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          <span style={{ color: '#0f172a', fontWeight: '500' }}>Address</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 32px 0', color: '#0f172a' }}>Select Address</h1>
        
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Address Selection */}
          <div style={{ flex: '2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Saved Addresses</h2>
              <button onClick={() => navigate('/cms/app-management/user-app/flow/address/add')} style={{ background: '#e0e7ff', color: '#4f46e5', border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                <Plus size={18} /> Add New Address
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {mockAddresses.map(addr => (
                <div key={addr.id} onClick={() => setSelected(addr.id)} style={{ padding: '24px', borderRadius: '16px', border: selected === addr.id ? '2px solid #4f46e5' : '1px solid #e2e8f0', background: selected === addr.id ? '#f5f7ff' : '#fff', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: selected === addr.id ? '7px solid #4f46e5' : '2px solid #cbd5e1', background: '#fff', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0f172a' }}>{addr.type}</span>
                          <span style={{ fontSize: '12px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px' }}>{addr.name}</span>
                        </div>
                      </div>
                      <p style={{ margin: '0 0 8px 0', color: '#475569', lineHeight: '1.5', fontSize: '15px' }}>{addr.addressLine1}, {addr.addressLine2}</p>
                      <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '15px' }}>{addr.city}, {addr.pincode}</p>
                      <p style={{ margin: '0', color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Mobile: <span style={{ color: '#0f172a', fontWeight: '500' }}>{addr.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{ flex: '1', position: 'sticky', top: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={cartItem.image} alt={cartItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{cartItem.name}</div>
                  <div style={{ color: '#64748b', fontSize: '14px' }}>Qty: 1</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', color: '#475569', fontSize: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Item Total</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹{cartItem.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes & Fee</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹324</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginBottom: '32px', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                <span>Total Amount</span>
                <span>₹{cartItem.price + 324}</span>
              </div>

              <button 
                onClick={() => navigate('/cms/app-management/user-app/flow/slot')} 
                disabled={!selected}
                style={{ width: '100%', background: selected ? '#4f46e5' : '#cbd5e1', color: '#fff', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: selected ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
              >
                Continue to Slots
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}