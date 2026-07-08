import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  Grid, List, Sparkles, Scissors, Wrench, PaintBucket, Plus, Edit, Trash2, Eye, ShieldCheck, Star
} from 'lucide-react';
import Toggle from '../../../../../components/common/Toggle';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Luxe Salon', layout: 'Grid', icon: 'Scissors', active: true, tag: 'Premium', services: 12 },
  { id: '2', name: 'Painting & Waterproofing', layout: 'List', icon: 'PaintBucket', active: true, tag: 'New', services: 5 },
  { id: '3', name: 'Home Repair', layout: 'Grid', icon: 'Wrench', active: true, tag: null, services: 24 },
  { id: '4', name: 'Cleaning Experts', layout: 'Grid', icon: 'Sparkles', active: false, tag: '20% OFF', services: 8 },
];

export default function ServiceCategoriesUI() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (name) => {
    switch(name) {
      case 'Scissors': return <Scissors size={20} />;
      case 'PaintBucket': return <PaintBucket size={20} />;
      case 'Wrench': return <Wrench size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      default: return <Star size={20} />;
    }
  };

  return (
    <AdminShell activeTab="CMS" headerTitle="Service Categories Manager">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Service Categories UI</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Service Categories Configurations</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Manage specialized service layouts (like Luxe Salon, Painting) displayed on the user application.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
            <Plus size={16} strokeWidth={2.5} /> Create Category
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ background: '#e0e7ff', color: '#4f46e5', padding: '12px', borderRadius: '10px' }}>
               <Grid size={24} />
             </div>
             <div>
               <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1e1b4b', margin: 0 }}>4</h3>
               <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Total Categories</span>
             </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ background: '#d1fae5', color: '#059669', padding: '12px', borderRadius: '10px' }}>
               <ShieldCheck size={24} />
             </div>
             <div>
               <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#059669', margin: 0 }}>3</h3>
               <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Active in App</span>
             </div>
          </div>
        </div>

        {/* List */}
        <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>CATEGORY NAME</th>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>LAYOUT</th>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>APP STATUS</th>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>SERVICES</th>
                <th style={{ padding: '16px 24px', textAlign: 'right', color: '#334155', fontWeight: '700' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px', color: '#475569' }}>
                        {getIcon(cat.icon)}
                      </div>
                      <div>
                        <strong style={{ fontSize: '14px', color: '#1e293b', display: 'block', fontWeight: '800' }}>{cat.name}</strong>
                        {cat.tag && <span style={{ fontSize: '10px', background: '#fee2e2', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{cat.tag}</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                      {cat.layout === 'Grid' ? <Grid size={14} /> : <List size={14} />} {cat.layout} View
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <Toggle checked={cat.active} onChange={() => {}} />
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#4f46e5' }}>
                    {cat.services} Linked
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button style={{ border: 'none', background: '#f1f5f9', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#334155' }}><Eye size={16} /></button>
                      <button style={{ border: 'none', background: '#f1f5f9', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#334155' }}><Edit size={16} /></button>
                      <button style={{ border: 'none', background: '#fef2f2', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                    </div>
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
