import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useApp } from '../../../../../hooks/useApp';
import { CheckCircle } from 'lucide-react';

export default function FlowSuccessPage() {
  const { navigate } = useApp();

  return (
    <AdminShell>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <CheckCircle size={80} color="#10b981" />
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '24px', marginBottom: '16px' }}>Added Successfully</h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>The package has been added to your cart.</p>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => navigate('/cms/app-management/user-app/flow/services')} style={{ background: '#f1f5f9', color: '#334155', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Continue Shopping
          </button>
          <button onClick={() => navigate('/cms/app-management/user-app/flow/cart')} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Go to Cart
          </button>
        </div>
      </div>
    </AdminShell>
  );
}