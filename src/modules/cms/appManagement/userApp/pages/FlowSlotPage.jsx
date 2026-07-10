import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockSlots, mockPackages } from '../data/mockData';
import { useApp } from '../../../../../hooks/useApp';
import { ChevronLeft, Calendar } from 'lucide-react';

export default function FlowSlotPage() {
  const { navigate } = useApp();
  const [selectedDate, setSelectedDate] = useState('10');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const cartItem = mockPackages['s1'][0];

  const days = [
    { day: 'Fri', date: '10' },
    { day: 'Sat', date: '11' },
    { day: 'Sun', date: '12' },
    { day: 'Mon', date: '13' }
  ];

  const times = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM'
  ];

  return (
    <AdminShell>
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }} onClick={() => navigate('/cms/app-management/user-app/flow/address')}>Address</span>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          <span style={{ color: '#0f172a', fontWeight: '500' }}>Slot</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 32px 0', color: '#0f172a' }}>Select Date & Time</h1>
        
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Date and Time Selection */}
          <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Instant Block */}
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f8fafc', padding: '4px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px' }}>⚡</span> Instant
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a', marginBottom: '4px' }}>In 30 mins</div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>Unavailable at the moment</div>
              </div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #e2e8f0' }} />
            </div>

            {/* Schedule for Later Block */}
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>Schedule for later</h3>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Select your preferred day & time</div>
                </div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '6px solid #4f46e5', background: '#fff' }} />
              </div>

              {/* Days Scroll */}
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '32px', borderBottom: '1px dashed #e2e8f0', marginBottom: '32px' }}>
                {days.map(d => (
                  <div 
                    key={d.date} 
                    onClick={() => setSelectedDate(d.date)}
                    style={{ 
                      minWidth: '70px', padding: '16px 8px', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                      border: selectedDate === d.date ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: selectedDate === d.date ? '#f8fafc' : '#fff'
                    }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: selectedDate === d.date ? '#4f46e5' : '#0f172a', marginBottom: '8px' }}>{d.day}</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: selectedDate === d.date ? '#4f46e5' : '#0f172a' }}>{d.date}</div>
                  </div>
                ))}
              </div>

              {/* Time Slots Grid */}
              <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>Select start time of service</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {times.map(time => (
                  <div 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{ 
                      padding: '16px 0', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s',
                      border: selectedTime === time ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: selectedTime === time ? '#f5f7ff' : '#fff',
                      color: selectedTime === time ? '#4f46e5' : '#64748b'
                    }}>
                    {time}
                  </div>
                ))}
              </div>

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
                onClick={() => navigate('/cms/app-management/user-app/flow/checkout')} 
                disabled={!selectedTime}
                style={{ width: '100%', background: selectedTime ? '#4f46e5' : '#cbd5e1', color: '#fff', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: selectedTime ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}