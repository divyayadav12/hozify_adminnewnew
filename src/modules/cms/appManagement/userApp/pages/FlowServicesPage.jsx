import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockServices } from '../data/mockData';
import { useApp } from '../../../../../hooks/useApp';
import { List, X } from 'lucide-react';

export default function FlowServicesPage() {
  const { navigate } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (serviceId) => {
    navigate(`/cms/app-management/user-app/flow/services/${serviceId}/packages`);
  };

  return (
    <AdminShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#eef2ff', minHeight: 'calc(100vh - 80px)', position: 'relative', overflow: 'hidden', padding: '48px' }}>
        {/* Background Gradient */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', background: 'linear-gradient(180deg, #bae6fd 0%, #eef2ff 100%)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>Services Catalog</h1>
          </div>

          {/* Offer Banners - Horizontal Scroll */}
          <div style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: '24px', 
            marginBottom: '48px', 
            paddingBottom: '16px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none'    /* Firefox */
          }}>
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            
            {/* Banner 1: Women Salon */}
            <div style={{ flex: '0 0 auto', width: '300px', background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', scrollSnapAlign: 'start' }}>
              <h2 style={{ fontSize: '24px', color: '#9a3412', margin: '0 0 12px 0', fontWeight: 'bold' }}>20% Off</h2>
              <p style={{ color: '#9a3412', margin: '0 0 8px 0', fontWeight: '600', fontSize: '16px' }}>On your first women saloon</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 24px 0' }}>up to ₹100 off</p>
              <button style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Claim now
              </button>
            </div>

            {/* Banner 2: AC Repair */}
            <div style={{ flex: '0 0 auto', width: '300px', background: 'linear-gradient(135deg, #e0e7ff 0%, #d9f99d 100%)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', scrollSnapAlign: 'start' }}>
              <h2 style={{ fontSize: '24px', color: '#312e81', margin: '0 0 12px 0', fontWeight: 'bold' }}>Free</h2>
              <p style={{ color: '#312e81', margin: '0 0 8px 0', fontWeight: '600', fontSize: '16px' }}>AC Inspection & Checkup</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 24px 0' }}>valid for this week only</p>
              <button style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Book now
              </button>
            </div>

            {/* Banner 3: Cleaning */}
            <div style={{ flex: '0 0 auto', width: '300px', background: 'linear-gradient(135deg, #ecfdf5 0%, #d9f99d 100%)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', scrollSnapAlign: 'start' }}>
              <h2 style={{ fontSize: '24px', color: '#064e3b', margin: '0 0 12px 0', fontWeight: 'bold' }}>Save 30%</h2>
              <p style={{ color: '#064e3b', margin: '0 0 8px 0', fontWeight: '600', fontSize: '16px' }}>On all cleaning services</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 24px 0' }}>Use code: CLEAN30</p>
              <button style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Copy Code
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px', marginTop: '-32px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }} />
            <div style={{ width: '16px', height: '6px', borderRadius: '4px', background: '#4f46e5' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }} />
          </div>

          {/* Services Section */}
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 32px 0', color: '#1e293b' }}>Services</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '32px' }}>
            {mockServices.map((s) => (
              <div 
                key={s.id} 
                onClick={() => handleServiceClick(s.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#fff' }}>
                  <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '16px', textAlign: 'center', fontWeight: '600', color: '#334155', lineHeight: '1.2' }}>{s.name}</span>
              </div>
            ))}
            
            {/* All Services Button */}
            <div 
              onClick={() => setIsModalOpen(true)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: '24px', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <List size={48} color="#475569" />
              </div>
              <span style={{ fontSize: '16px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>All services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for All Services */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '48px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '1000px', maxHeight: '90vh', borderRadius: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>All Services</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}>
                <X size={24} color="#64748b" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
              {mockServices.map((service) => (
                <div key={service.id} style={{ marginBottom: '48px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 24px 0' }}>{service.name}</h4>
                  
                  {service.subCategories && service.subCategories.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '24px' }}>
                      {service.subCategories.map((sub) => (
                        <div 
                          key={sub.id} 
                          onClick={() => handleServiceClick(service.id)}
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <div style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', background: '#f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <img src={sub.image} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <span style={{ fontSize: '14px', textAlign: 'center', fontWeight: '500', color: '#334155', lineHeight: '1.2' }}>{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: '#64748b', fontSize: '14px' }}>No sub-categories</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}