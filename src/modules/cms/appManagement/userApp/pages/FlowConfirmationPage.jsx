import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useApp } from '../../../../../hooks/useApp';
import { CheckCircle, Calendar, MapPin, Clock, Smartphone, Download, Share2 } from 'lucide-react';

export default function FlowConfirmationPage() {
  const { navigate } = useApp();

  const handleDownloadInvoice = () => {
    const invoiceContent = `
=================================
          INVOICE
=================================
Order ID: #ORD-8923
Date: Today, 10 Jul
Time: 10:00 AM - 10:30 AM
Service: Luxe Salon Package
Location: A-123, Sunrise Apartments, MG Road, Koramangala
---------------------------------
Total Amount: ₹2372 (Paid via UPI)
=================================
Thank you for your booking!
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Invoice_ORD-8923.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminShell>
      <div style={{ padding: '48px 32px', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
        
        <div style={{ background: '#fff', borderRadius: '24px', padding: '48px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <CheckCircle size={48} color="#10b981" />
          </div>
          
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 16px 0', textAlign: 'center' }}>Booking Confirmed!</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0 0 48px 0', textAlign: 'center' }}>
            Thank you for your booking. Your order ID is <span style={{ fontWeight: 'bold', color: '#0f172a' }}>#ORD-8923</span>
          </p>
          
          <div style={{ width: '100%', background: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>Booking Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Service</p>
                <p style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: '600' }}>Luxe Salon Package</p>
              </div>
              
              <div>
                <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Total Amount</p>
                <p style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: '600' }}>₹2372 (Paid via UPI)</p>
              </div>

              <div>
                <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Schedule</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                    <Calendar size={18} color="#4f46e5" />
                    <span style={{ fontWeight: '500' }}>Today, 10 Jul</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                    <Clock size={18} color="#4f46e5" />
                    <span style={{ fontWeight: '500' }}>10:00 AM - 10:30 AM</span>
                  </div>
                </div>
              </div>

              <div>
                <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Location</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#0f172a' }}>
                  <MapPin size={18} color="#4f46e5" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontWeight: '500', lineHeight: '1.5' }}>A-123, Sunrise Apartments, MG Road, Koramangala</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '500px' }}>
            <button onClick={handleDownloadInvoice} style={{ flex: 1, background: '#fff', color: '#475569', border: '1px solid #cbd5e1', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Download size={20} /> Invoice
            </button>
            <button onClick={() => navigate('/cms/app-management/user-app/flow/services')} style={{ flex: 2, background: '#4f46e5', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
              Book Another Service
            </button>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}