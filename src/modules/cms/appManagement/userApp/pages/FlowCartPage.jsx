import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useApp } from '../../../../../hooks/useApp';
import { ChevronLeft, Trash2, Plus, Minus, Phone, ChevronRight, Check, X } from 'lucide-react';
import { mockPackages } from '../data/mockData';

export default function FlowCartPage() {
  const { navigate } = useApp();
  
  const cartItem = mockPackages['s1'][0];
  const [qty, setQty] = useState(2);
  const [tip, setTip] = useState(75);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(true);
  
  const itemTotal = cartItem.price * qty;
  const platformFee = 49;
  const taxes = 75;
  const totalAmount = itemTotal + tip + platformFee + taxes;

  return (
    <AdminShell>
      <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 80px)', padding: '40px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px' }}>
              <ChevronLeft size={24} style={{ color: '#0f172a', cursor: 'pointer' }} onClick={() => navigate(-1)} />
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Your Cart</h1>
            </div>
            <button style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Clear</button>
          </div>

          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
            
            {/* Left Column (Main Cart Details) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Item Card */}
              <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>{cartItem.name}</h3>
                    <p style={{ color: '#4f46e5', margin: 0, fontSize: '14px', fontWeight: '500' }}>{cartItem.duration} • Facials</p>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                    ₹{itemTotal}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                    Remove
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', color: '#0f172a', padding: '12px 16px', cursor: 'pointer' }}><Minus size={16} /></button>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0f172a', width: '20px', textAlign: 'center' }}>{qty}</span>
                    <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', color: '#0f172a', padding: '12px 16px', cursor: 'pointer' }}><Plus size={16} /></button>
                  </div>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                  <Plus size={20} /> Add more items
                </div>
              </div>

              {/* Contact Block */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px' }}><Phone size={20} color="#64748b" /></div>
                  <span style={{ fontSize: '16px', fontWeight: '500', color: '#0f172a' }}>Jothi, +91-9573447204</span>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>Change</button>
              </div>

              {/* People Also Take (Cross-sell) */}
              <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginTop: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>People also take</h3>
                <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px' }}>
                  
                  {/* Cross-sell Item 1 */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '16px', minWidth: '220px', display: 'flex', flexDirection: 'column' }}>
                    <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=200&h=120&q=80" alt="Hot Stone" style={{ width: '100%', height: '120px', borderRadius: '12px', objectFit: 'cover', marginBottom: '16px' }} />
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>Hot Stone Add-on</h4>
                    <p style={{ margin: '0 0 16px 0', color: '#4f46e5', fontSize: '12px', fontWeight: '500' }}>• 15 mins</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>₹200</span>
                      <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><Plus size={16} color="#64748b" /></button>
                    </div>
                  </div>

                  {/* Cross-sell Item 2 */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '16px', minWidth: '220px', display: 'flex', flexDirection: 'column' }}>
                    <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=200&h=120&q=80" alt="Eye Mask" style={{ width: '100%', height: '120px', borderRadius: '12px', objectFit: 'cover', marginBottom: '16px' }} />
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>Collagen Eye Mask</h4>
                    <p style={{ margin: '0 0 16px 0', color: '#4f46e5', fontSize: '12px', fontWeight: '500' }}>During treatment</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>₹120</span>
                      <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><Plus size={16} color="#64748b" /></button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column (Summary & Checkout) */}
            <div style={{ width: '420px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '32px' }}>
              
              {/* Payment Summary */}
              <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>Payment summary</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', color: '#64748b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Item total</span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>₹{itemTotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tip</span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>₹{tip}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Platform Fee</span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>₹{platformFee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                    <span>Taxes</span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>₹{taxes}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: '#0f172a', paddingTop: '8px' }}>
                    <span>Total amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginTop: '4px' }}>
                    <span>Amount to pay</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Add a Tip */}
              <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Add a tip to thank the Professional</h3>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  {[50, 75, 100].map(amt => (
                    <div 
                      key={amt} 
                      onClick={() => setTip(amt)}
                      style={{ 
                        flex: 1, border: tip === amt ? '2px solid #10b981' : '1px solid #e2e8f0', 
                        borderRadius: '12px', padding: '16px 0', textAlign: 'center', cursor: 'pointer',
                        background: tip === amt ? '#ecfdf5' : '#fff', position: 'relative'
                      }}>
                      {amt === 75 && (
                        <span style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Popular</span>
                      )}
                      <span style={{ fontWeight: 'bold', color: tip === amt ? '#065f46' : '#0f172a' }}>₹{amt}</span>
                    </div>
                  ))}
                  <div style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 0', textAlign: 'center', cursor: 'pointer', fontSize: '14px', color: '#64748b' }}>Custom</div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>100% of the tip goes to the professional.</p>
              </div>

              {/* Cancellation Policy */}
              <div 
                onClick={() => setIsPolicyModalOpen(true)}
                style={{ background: '#fff', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9', cursor: 'pointer' }}>
                <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a' }}>Cancellation policy</span>
                <ChevronRight size={20} color="#94a3b8" />
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/cms/app-management/user-app/flow/address')}
                style={{ width: '100%', background: '#1e1b4b', color: '#fff', border: 'none', padding: '20px', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(30,27,75,0.2)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#312e81'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1e1b4b'; e.currentTarget.style.transform = 'none'; }}
              >
                Done
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Policy Modal */}
      {isPolicyModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setIsPolicyModalOpen(false)} />
          <div style={{ width: '400px', background: '#fff', borderRadius: '24px', padding: '32px', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 24px 0' }}>Cancellation Policy</h2>
            
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                <span style={{ color: '#0f172a', fontWeight: 'bold' }}>•</span>
                Free cancellation if done up to 4 hours before the booked slot.
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                <span style={{ color: '#0f172a', fontWeight: 'bold' }}>•</span>
                Cancellation fee of ₹100 will be charged if cancelled within 4 hours of the service.
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                <span style={{ color: '#0f172a', fontWeight: 'bold' }}>•</span>
                No refund if you cancel after the professional has reached your location.
              </li>
            </ul>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px', cursor: 'pointer' }}
              onClick={() => setIsPolicyAccepted(!isPolicyAccepted)}
            >
              <div style={{ background: isPolicyAccepted ? '#1e1b4b' : '#fff', border: isPolicyAccepted ? 'none' : '2px solid #cbd5e1', width: '20px', height: '20px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isPolicyAccepted && <Check size={14} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>I accept the cancellation policy</span>
            </div>

            <button 
              onClick={() => setIsPolicyModalOpen(false)}
              style={{ width: '100%', background: '#1e1b4b', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '32px' }}
            >
              Save
            </button>
          </div>
        </div>
      )}

    </AdminShell>
  );
}