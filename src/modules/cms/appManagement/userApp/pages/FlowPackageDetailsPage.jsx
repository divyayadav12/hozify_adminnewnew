import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockPackages } from '../data/mockData';
import { useApp } from '../../../../../hooks/useApp';
import { ChevronLeft, CheckCircle, Star, Clock, ShieldCheck, ThumbsUp, Share2, Leaf, Droplet, BadgeCheck } from 'lucide-react';
import { useToast } from '../../../../../components/common/ToastNotification';

export default function FlowPackageDetailsPage() {
  const { navigate, route } = useApp();
  const id = route.split('/').pop();
  const { showToast } = useToast();
    
  // Find package in mockData
  let pkg = null;
  Object.values(mockPackages).forEach(servicePackages => {
    const found = servicePackages.find(p => p.id === id);
    if (found) pkg = found;
  });

  const handleAddToCart = () => {
    navigate('/cms/app-management/user-app/flow/cart');
  };

  if (!pkg) {
    return <AdminShell><div>Package not found</div></AdminShell>;
  }

  return (
    <AdminShell>
      <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Header Hero Section */}
        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
          <img src={pkg.image || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80'} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)' }} />
          
          <div style={{ position: 'absolute', top: '32px', left: '48px', display: 'flex', gap: '16px' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <ChevronLeft size={24} color="#0f172a" />
            </button>
          </div>
          
          <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '1200px', margin: '0 auto' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#10b981', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold' }}>
                  <Star size={18} fill="#fff" /> {pkg.rating}
                </div>
                <span style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: '500' }}>({pkg.reviews} reviews) • {pkg.duration}</span>
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', margin: '0' }}>
                ✨ {pkg.name}
              </h1>
            </div>
            
            <button style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <Share2 size={20} color="#fff" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 0', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Left Column (Main Info) */}
          <div style={{ flex: 1 }}>
            
            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>About the service</h2>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
                A comprehensive service that covers every inch of your space. We use professional-grade machines and eco-certified chemicals to ensure a spotless and healthy environment. Our trained professionals have extensive experience in delivering top-tier quality, specifically tailored to your needs.
              </p>
            </div>

            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>What's included</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
                {pkg.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                      {i % 2 === 0 ? <Droplet size={28} color="#4f46e5" /> : <Leaf size={28} color="#10b981" />}
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{feat}</div>
                      <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Advanced treatment and care applied meticulously for all surfaces and types.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Past Work</h2>
                <span style={{ color: '#4f46e5', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>View Gallery</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" alt="work1" style={{ width: '100%', height: '180px', borderRadius: '16px', objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=80" alt="work2" style={{ width: '100%', height: '180px', borderRadius: '16px', objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" alt="work3" style={{ width: '100%', height: '180px', borderRadius: '16px', objectFit: 'cover' }} />
              </div>
            </div>
            
          </div>

          {/* Right Column (Sticky Booking Card) */}
          <div style={{ width: '400px', flexShrink: 0, position: 'sticky', top: '32px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '12px' }}>
                <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#0f172a', lineHeight: 1 }}>₹{pkg.price}</span>
                {pkg.originalPrice && (
                  <span style={{ fontSize: '20px', color: '#94a3b8', textDecoration: 'line-through', paddingBottom: '4px' }}>₹{pkg.originalPrice}</span>
                )}
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }}>
                  {pkg.discount || 'Save 50%'}
                </span>
              </div>
              
              <div style={{ border: '1px solid #f1f5f9', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BadgeCheck size={32} color="#4f46e5" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '18px' }}>Hozify Certified</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Professionals have 5+ exp</div>
                  </div>
                </div>
                <ShieldCheck size={28} color="#4f46e5" />
              </div>

              <button 
                onClick={handleAddToCart} 
                style={{ width: '100%', background: '#1e1b4b', color: '#fff', border: 'none', padding: '20px', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(30,27,75,0.2)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#312e81'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1e1b4b'; e.currentTarget.style.transform = 'none'; }}
              >
                Book Service Now
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '16px', color: '#64748b', fontSize: '13px' }}>
                No hidden charges. Secure checkout.
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}