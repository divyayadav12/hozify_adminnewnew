import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockOrders } from '../data/mockData';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function AdminBookingsPage() {
  return (
    <AdminShell headerTitle="Bookings Ledger" activeTab="Bookings Ledger">
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Bookings Ledger</h1>
        
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>ORDER ID</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>CUSTOMER</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>SERVICE</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>DATE & TIME</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>STATUS</th>
                <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 'bold', color: '#4f46e5' }}>{order.id}</td>
                  <td style={{ padding: '16px', fontWeight: 'bold' }}>{order.customerName}</td>
                  <td style={{ padding: '16px' }}>{order.serviceName}<br/><span style={{ fontSize: '12px', color: '#64748b' }}>{order.packageName}</span></td>
                  <td style={{ padding: '16px' }}>{order.date}, {order.timeSlot}</td>
                  <td style={{ padding: '16px' }}><span style={{ padding: '4px 8px', background: '#d1fae5', color: '#065f46', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{order.status}</span></td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}><Eye size={18} /></button>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}><Edit size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>
      </div>
    </AdminShell>
  );
}