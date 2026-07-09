import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  Crown, CheckCircle2, Zap, Users, Shield, Plus, Edit, Trash2, ArrowUpRight, X
} from 'lucide-react';
import { useToast } from '../../../../../components/common/ToastNotification';
import Toggle from '../../../../../components/common/Toggle';

const INITIAL_PLANS = [
  { id: '1', name: 'Powerpass Silver', price: '₹499', validity: '3 Months', active: true, benefits: ['Free Delivery', 'Standard Support', '5% Discount'] },
  { id: '2', name: 'Powerpass Gold', price: '₹899', validity: '6 Months', active: true, benefits: ['Free Delivery', 'Priority Support', '10% Discount', 'No Surge Pricing'] },
  { id: '3', name: 'Powerpass Platinum', price: '₹1499', validity: '12 Months', active: true, benefits: ['Free Delivery', '24/7 VIP Support', '15% Discount', 'No Surge Pricing', 'Exclusive Perks'] },
];

export default function PowerpassManagerPage() {
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    validity: '',
    active: true,
    benefits: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingPlan(null);
    setFormData({ name: '', price: '', validity: '', active: true, benefits: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan.id);
    setFormData({ 
      name: plan.name, 
      price: plan.price, 
      validity: plan.validity, 
      active: plan.active, 
      benefits: plan.benefits.join(', ') 
    });
    setIsModalOpen(true);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.validity) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const benefitsArray = formData.benefits.split(',').map(b => b.trim()).filter(b => b.length > 0);

    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan ? { ...p, ...formData, benefits: benefitsArray } : p));
      addToast('Plan updated successfully!', 'success');
    } else {
      const newPlan = {
        ...formData,
        id: Date.now().toString(),
        benefits: benefitsArray
      };
      setPlans([...plans, newPlan]);
      addToast('New Powerpass plan created!', 'success');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setPlans(plans.filter(p => p.id !== planToDelete));
    setPlanToDelete(null);
    addToast('Powerpass plan deleted.', 'success');
  };

  const handleToggleStatus = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, active: !p.active } : p));
    addToast('Plan status updated.', 'success');
  };

  return (
    <AdminShell activeTab="CMS" headerTitle="Powerpass Subscription Manager">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Powerpass Subscriptions</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Powerpass Subscriptions</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Configure and manage the premium membership plans available to users on the app.</p>
          </div>
          <button onClick={openCreateModal} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
            <Plus size={16} strokeWidth={2.5} /> Create Plan
          </button>
        </div>

        {/* Plan Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {plans.map((plan, index) => (
            <div key={plan.id} style={{ 
              background: '#fff', 
              border: index === 2 ? '2px solid #4f46e5' : '1px solid #e2e8f0', 
              borderRadius: '16px', 
              padding: '24px', 
              display: 'flex', flexDirection: 'column', gap: '16px',
              position: 'relative',
              boxShadow: index === 2 ? '0 10px 25px -5px rgba(79, 70, 229, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              {index === 2 && (
                <div style={{ position: 'absolute', top: '-12px', right: '24px', background: '#4f46e5', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>
                  MOST POPULAR
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Crown size={20} color={index === 0 ? '#94a3b8' : index === 1 ? '#fbbf24' : '#4f46e5'} />
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>{plan.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{plan.price}</span>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>/ {plan.validity}</span>
                  </div>
                </div>
                <Toggle checked={plan.active} onChange={() => handleToggleStatus(plan.id)} />
              </div>
              
              <div style={{ height: '1px', background: '#e2e8f0', margin: '8px 0' }} />
              
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>{benefit}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                 <button onClick={() => openEditModal(plan)} style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '8px', color: '#475569', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                   <Edit size={14} /> Edit Plan
                 </button>
                 <button onClick={() => setPlanToDelete(plan.id)} style={{ padding: '10px', border: 'none', background: '#fef2f2', borderRadius: '8px', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>{editingPlan ? 'Edit Powerpass Plan' : 'Create Powerpass Plan'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSavePlan} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Plan Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Powerpass Gold"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    required
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Price *</label>
                    <input 
                      type="text" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. ₹899"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Validity *</label>
                    <input 
                      type="text" 
                      name="validity"
                      value={formData.validity}
                      onChange={handleInputChange}
                      placeholder="e.g. 6 Months"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Benefits (Comma separated) *</label>
                  <textarea 
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="e.g. Free Delivery, Priority Support, 10% Discount"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
                    required
                  />
                </div>

                <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', marginTop: '8px', borderRadius: '0 0 12px 12px', margin: '0 -20px -20px -20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>{editingPlan ? 'Update Plan' : 'Create Plan'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {planToDelete && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '350px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '24px', textAlign: 'center' }}>
              <Trash2 size={40} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>Delete Plan?</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>Are you sure you want to delete this Powerpass Plan? Users will not be able to purchase it anymore.</p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setPlanToDelete(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                <button onClick={confirmDelete} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#ef4444', fontWeight: '600', color: '#fff', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
