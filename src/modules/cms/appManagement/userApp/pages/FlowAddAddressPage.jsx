import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useApp } from '../../../../../hooks/useApp';
import { ChevronLeft, Home, Briefcase, MapPin } from 'lucide-react';
import { mockPackages } from '../data/mockData';

export default function FlowAddAddressPage() {
  const { navigate } = useApp();
  const [addressType, setAddressType] = useState('Home');
  const cartItem = mockPackages['s1'][0];

  return (
    <AdminShell>
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }} onClick={() => navigate('/cms/app-management/user-app/flow/cart')}>Cart</span>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }} onClick={() => navigate('/cms/app-management/user-app/flow/address')}>Address</span>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          <span style={{ color: '#0f172a', fontWeight: '500' }}>Add New</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 32px 0', color: '#0f172a' }}>Add New Address</h1>
        
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Form */}
          <div style={{ flex: '2' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 9876543210" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>House / Flat No.</label>
                  <input type="text" placeholder="e.g. 101, B Wing" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Street / Landmark</label>
                  <input type="text" placeholder="e.g. Opposite City Mall" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>City</label>
                  <input type="text" placeholder="e.g. Bengaluru" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Pincode</label>
                  <input type="text" placeholder="e.g. 560034" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Save Address As</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button onClick={() => setAddressType('Home')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', border: addressType === 'Home' ? '2px solid #4f46e5' : '1px solid #cbd5e1', background: addressType === 'Home' ? '#f5f7ff' : '#fff', color: addressType === 'Home' ? '#4f46e5' : '#475569', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <Home size={18} /> Home
                  </button>
                  <button onClick={() => setAddressType('Office')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', border: addressType === 'Office' ? '2px solid #4f46e5' : '1px solid #cbd5e1', background: addressType === 'Office' ? '#f5f7ff' : '#fff', color: addressType === 'Office' ? '#4f46e5' : '#475569', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <Briefcase size={18} /> Office
                  </button>
                  <button onClick={() => setAddressType('Other')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', border: addressType === 'Other' ? '2px solid #4f46e5' : '1px solid #cbd5e1', background: addressType === 'Other' ? '#f5f7ff' : '#fff', color: addressType === 'Other' ? '#4f46e5' : '#475569', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <MapPin size={18} /> Other
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Order Summary (for consistency) */}
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
                onClick={() => navigate('/cms/app-management/user-app/flow/address')} 
                style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4338ca'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#4f46e5'}
              >
                Save Address & Proceed
              </button>
            </div>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
