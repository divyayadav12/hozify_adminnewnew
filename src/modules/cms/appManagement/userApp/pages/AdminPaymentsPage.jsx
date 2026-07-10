import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockPayments } from '../data/mockData';
import { Eye } from 'lucide-react';

export default function AdminPaymentsPage() {
  return (
    <AdminShell>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Payments Ledger</h1>
        
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>TXN ID</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>ORDER ID</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>AMOUNT</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>METHOD</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>DATE</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>STATUS</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map(payment => (
                <tr key={payment.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 'bold' }}>{payment.id}</td>
                  <td style={{ padding: '16px', color: '#4f46e5', fontWeight: 'bold' }}>{payment.orderId}</td>
                  <td style={{ padding: '16px', fontWeight: 'bold' }}>₹{payment.amount}</td>
                  <td style={{ padding: '16px' }}>{payment.method}</td>
                  <td style={{ padding: '16px', color: '#64748b' }}>{payment.date}</td>
                  <td style={{ padding: '16px' }}><span style={{ padding: '4px 8px', background: '#d1fae5', color: '#065f46', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{payment.status}</span></td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}