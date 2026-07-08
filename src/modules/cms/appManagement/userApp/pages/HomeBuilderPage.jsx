import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  GripVertical, Image as ImageIcon, Plus, Layout, Layers, Edit, Trash2, Smartphone, Save, Eye
} from 'lucide-react';

const INITIAL_SECTIONS = [
  { id: '1', type: 'Banner Carousel', title: 'Top Promotions', active: true },
  { id: '2', type: 'Category Grid', title: 'Main Services', active: true },
  { id: '3', type: 'Horizontal List', title: 'Featured Pros', active: true },
  { id: '4', type: 'Promo Banner', title: 'Summer Offer', active: false },
  { id: '5', type: 'Horizontal List', title: 'Recent Bookings', active: true }
];

export default function HomeBuilderPage() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);

  return (
    <AdminShell activeTab="CMS" headerTitle="User App Home Layout Builder">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Home Screen Builder</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Home Screen Builder</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Drag and drop sections to construct the user app's home screen layout dynamically.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50">
              <Eye size={16} /> Preview App
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
              <Save size={16} /> Publish Changes
            </button>
          </div>
        </div>

        {/* Builder Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          
          {/* Main Layout Area */}
          <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '24px', minHeight: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Active Sections</h3>
              <button className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">
                <Plus size={14} /> Add Section
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sections.map((sec, idx) => (
                <div key={sec.id} style={{ 
                  display: 'flex', alignItems: 'center', padding: '16px', 
                  border: '1px solid #e2e8f0', borderRadius: '8px', 
                  background: sec.active ? '#f8fafc' : '#f1f5f9',
                  opacity: sec.active ? 1 : 0.6,
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ cursor: 'grab', marginRight: '16px', color: '#94a3b8' }}>
                    <GripVertical size={20} />
                  </div>
                  
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    {sec.type.includes('Banner') ? <ImageIcon size={20} /> : sec.type.includes('Grid') ? <Layout size={20} /> : <Layers size={20} />}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{sec.title}</h4>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Type: {sec.type}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px', border: 'none', background: '#e2e8f0', borderRadius: '6px', color: '#475569', cursor: 'pointer' }} title="Edit Config">
                      <Edit size={16} />
                    </button>
                    <button style={{ padding: '6px', border: 'none', background: '#fee2e2', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }} title="Remove">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Preview/Settings */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', position: 'sticky', top: '100px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
               <Smartphone size={20} color="#4f46e5" />
               <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Device Preview</h3>
             </div>
             
             {/* Mock Phone Frame */}
             <div style={{ width: '100%', height: '450px', border: '4px solid #1e293b', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#f8fafc' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '16px', background: '#1e293b', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }} />
                
                {/* Mock Content */}
                <div style={{ padding: '24px 16px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ height: '40px', background: '#e2e8f0', borderRadius: '8px', marginTop: '10px' }} />
                  {sections.filter(s => s.active).map(sec => (
                    <div key={'prev'+sec.id} style={{ 
                      height: sec.type.includes('Banner') ? '100px' : '80px', 
                      background: sec.type.includes('Banner') ? '#dbeafe' : '#f1f5f9', 
                      borderRadius: '8px',
                      border: '1px dashed #cbd5e1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{sec.title}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
