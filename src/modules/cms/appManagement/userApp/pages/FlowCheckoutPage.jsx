import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useApp } from '../../../../../hooks/useApp';
import { ChevronLeft, CheckCircle, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';

export default function FlowCheckoutPage() {
  const { navigate } = useApp();

  return (
    <AdminShell>
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }} onClick={() => navigate('/cms/app-management/user-app/flow/slot')}>Slot</span>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          <span style={{ color: '#0f172a', fontWeight: '500' }}>Checkout</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 32px 0', color: '#0f172a' }}>Review your booking</h1>
        
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Summary */}
          <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>Booking Details</h2>
                <button onClick={() => navigate('/cms/app-management/user-app/flow/cart')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc', flexShrink: 0 }}>
                  <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=150&q=80" alt="Luxe Salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>Luxe Salon Package</h3>
                  <div style={{ display: 'flex', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} color="#10b981" /> 2 hrs 30 mins</span>
                    <span>Qty: 1</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Location</h4>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <MapPin size={20} color="#4f46e5" style={{ marginTop: '2px' }} />
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#0f172a' }}>Home</p>
                      <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>A-123, Sunrise Apartments,<br/>MG Road, Koramangala,<br/>Bengaluru, 560034</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Time</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Calendar size={20} color="#4f46e5" />
                      <span style={{ fontWeight: '500', color: '#0f172a' }}>Today, 10 Jul</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={20} color="#4f46e5" />
                      <span style={{ fontWeight: '500', color: '#0f172a' }}>10:00 AM - 10:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column: Order Summary */}
          <div style={{ flex: '1', position: 'sticky', top: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>Payment Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', color: '#475569', fontSize: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Item Total</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹1999</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes & Fee</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹324</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Convenience Fee</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹49</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginBottom: '32px', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                <span>Grand Total</span>
                <span>₹2372</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ecfdf5', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #a7f3d0' }}>
                <ShieldCheck size={24} color="#10b981" />
                <span style={{ fontSize: '13px', color: '#065f46', fontWeight: '500' }}>Hozify Guarantee applied. 100% money back if not satisfied.</span>
              </div>

              <button 
                onClick={() => navigate('/cms/app-management/user-app/flow/payment')} 
                style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4338ca'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#4f46e5'}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}