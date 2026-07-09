import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  Grid, List, Sparkles, Scissors, Wrench, PaintBucket, Plus, Edit, Trash2, Eye, ShieldCheck, Star, X
} from 'lucide-react';
import Toggle from '../../../../../components/common/Toggle';
import { useToast } from '../../../../../components/common/ToastNotification';

const INITIAL_CATEGORIES = [
  { id: '1', parentId: null, name: 'InstaSupport', navKey: 'InstaSupport', icon: 'Icon_InstaSupport', displayOrder: 1, active: true },
  { id: '2', parentId: null, name: 'Salon & Spa', navKey: 'Salon & Spa', icon: 'Icon_Salon & Spa', displayOrder: 2, active: true },
  { id: '3', parentId: null, name: 'Cleaning', navKey: 'Cleaning', icon: 'Icon_Cleaning', displayOrder: 3, active: true },
  { id: '4', parentId: null, name: 'Pest Control', navKey: 'Pest Control', icon: 'Icon_Pest Control', displayOrder: 4, active: true },
];

export default function ServiceCategoriesUI() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    navKey: '',
    icon: '',
    displayOrder: 1,
    active: true
  });

  const getIcon = (iconName) => {
    // For now, render a generic Sparkles or Star if it contains Icon_
    if (iconName && iconName.includes('Cleaning')) return <Sparkles size={20} />;
    if (iconName && iconName.includes('Salon')) return <Scissors size={20} />;
    if (iconName && iconName.includes('Repair')) return <Wrench size={20} />;
    if (iconName && iconName.includes('Paint')) return <PaintBucket size={20} />;
    return <Star size={20} />;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      addToast('Please enter a category name.', 'error');
      return;
    }
    const newCat = {
      ...formData,
      id: Date.now().toString(),
      displayOrder: Number(formData.displayOrder) || 1,
      parentId: formData.parentId || null
    };
    setCategories([...categories, newCat]);
    addToast('Service category added successfully!', 'success');
    setIsModalOpen(false);
    setFormData({ name: '', parentId: '', navKey: '', icon: '', displayOrder: 1, active: true });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    addToast('Category removed successfully.', 'success');
  };

  const toggleActive = (id) => {
    setCategories(categories.map(c => c.id === id ? { ...c, active: !c.active } : c));
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
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
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
               <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1e1b4b', margin: 0 }}>{categories.length}</h3>
               <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Total Categories</span>
             </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ background: '#d1fae5', color: '#059669', padding: '12px', borderRadius: '10px' }}>
               <ShieldCheck size={24} />
             </div>
             <div>
               <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#059669', margin: 0 }}>{categories.filter(c => c.active).length}</h3>
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
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>NAVIGATION KEY</th>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>PARENT ID</th>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>DISPLAY ORDER</th>
                <th style={{ padding: '16px 24px', color: '#334155', fontWeight: '700' }}>APP STATUS</th>
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
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Icon: {cat.icon}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
                      {cat.navKey}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                    {cat.parentId || 'NULL'}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '13px', color: '#0f172a', fontWeight: '700' }}>
                    {cat.displayOrder}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <Toggle checked={cat.active} onChange={() => toggleActive(cat.id)} />
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button style={{ border: 'none', background: '#fef2f2', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }} onClick={() => handleDelete(cat.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No categories found. Create one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Create Service Category</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Service Category Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Pest Control"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Navigation Key</label>
                    <input 
                      type="text" 
                      name="navKey"
                      value={formData.navKey}
                      onChange={handleInputChange}
                      placeholder="e.g. Pest Control"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Parent Category ID (Optional)</label>
                    <select 
                      name="parentId"
                      value={formData.parentId}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                    >
                      <option value="">NULL (No Parent)</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Icon Name</label>
                    <input 
                      type="text" 
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      placeholder="e.g. Icon_Pest Control"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Display Order</label>
                    <input 
                      type="number" 
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleInputChange}
                      min="1"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Is Active</label>
                    <div style={{ marginTop: '8px' }}>
                      <Toggle checked={formData.active} onChange={() => setFormData({...formData, active: !formData.active})} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', marginTop: '8px', borderRadius: '0 0 12px 12px', margin: '0 -20px -20px -20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Save Category</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
