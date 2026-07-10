import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockPackages, mockServices } from '../data/mockData';
import { useApp } from '../../../../../hooks/useApp';
import { Edit, Trash2, Plus, ChevronLeft, Star, Clock, ChevronRight, Share2, X, ShieldCheck, XCircle, ChevronDown, CheckCircle, Minus, BadgeCheck } from 'lucide-react';
import { useToast } from '../../../../../components/common/ToastNotification';
export default function FlowPackagesPage() {
  const { navigate, route } = useApp();
  const segments = route.split('/');
  const id = segments[segments.length - 1] === 'packages' ? segments[segments.length - 2] : segments[segments.length - 1];
  const service = mockServices.find(s => s.id === id);
  const [packages, setPackages] = useState(mockPackages[id] || []);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedDrawerPkg, setSelectedDrawerPkg] = useState(null);
  const [qty, setQty] = useState(1);

  // Packages List View (Old view / after variant selection)
  if (selectedVariant || !service?.variants) {
    return (
      <AdminShell>
        <div style={{ background: 'linear-gradient(180deg, #93c5fd 0%, #d9f99d 100%)', minHeight: 'calc(100vh - 80px)', padding: '32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', color: '#0f172a' }}>
              <button 
                onClick={() => {
                  if (selectedVariant) setSelectedVariant(null);
                  else setSelectedSubCategory(null);
                }} 
                style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <ChevronLeft size={24} />
              </button>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                {selectedSubCategory ? selectedSubCategory.name : (selectedVariant ? `${service?.name} - ${selectedVariant.name}` : service?.name)}
              </h1>
            </div>

            <div style={{ background: '#fff', borderRadius: '32px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 24px 0' }}>
                {selectedVariant ? `${selectedVariant.name} Packages` : (selectedSubCategory ? `${selectedSubCategory.name} Packages` : 'General services')}
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {packages.map(pkg => (
                  <div key={pkg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '32px' }}>
                    
                    {/* Left Content */}
                    <div style={{ flex: 1, paddingRight: '24px' }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>{pkg.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                        <Star size={14} color="#eab308" fill="#eab308" />
                        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{pkg.rating}</span>
                        <span>({pkg.reviews} reviews)</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>Starts at ₹{pkg.price}</span>
                        {pkg.originalPrice && (
                          <span style={{ fontSize: '14px', color: '#818cf8', textDecoration: 'line-through' }}>(₹{pkg.originalPrice})</span>
                        )}
                      </div>
                      
                      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                        {pkg.features?.[0] || 'Detailed structural testing by verified professionals'}...
                      </p>
                      
                      <button 
                        onClick={() => navigate(`/cms/app-management/user-app/flow/packages/${pkg.id}`)}
                        style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 'bold', fontSize: '14px', padding: 0, cursor: 'pointer' }}
                      >
                        View details
                      </button>
                    </div>
                    
                    {/* Right Content (Image + Add Button) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
                      <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', marginBottom: '-16px' }}>
                        <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <button 
                        onClick={() => { setSelectedDrawerPkg(pkg); setQty(1); }}
                        style={{ 
                          background: '#fff', color: '#4f46e5', border: '1px solid #e2e8f0', 
                          borderRadius: '8px', padding: '8px 24px', fontWeight: 'bold', fontSize: '14px', 
                          cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', zIndex: 2
                        }}>
                        Add
                      </button>
                      <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>{pkg.duration}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Side Drawer for "Proper Desktop Admin Experience" */}
        {selectedDrawerPkg && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSelectedDrawerPkg(null)} />
            <div style={{ width: '500px', background: '#f8fafc', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out' }}>
              
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ position: 'relative', height: '260px' }}>
                  <img src={selectedDrawerPkg.image || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'} alt="Package" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => setSelectedDrawerPkg(null)} style={{ position: 'absolute', top: '24px', left: '24px', background: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><X size={20} color="#0f172a" /></button>
                  <button style={{ position: 'absolute', top: '24px', right: '24px', background: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><Share2 size={20} color="#0f172a" /></button>
                </div>
                
                <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', marginTop: '-24px', position: 'relative', padding: '32px 24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#0f172a' }}>{selectedDrawerPkg.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', fontWeight: 'bold', fontSize: '15px' }}><Star size={16} fill="#eab308" /> {selectedDrawerPkg.rating}</div>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>({selectedDrawerPkg.reviews} reviews)</span>
                  </div>

                  <div style={{ background: '#ecfdf5', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <Edit size={18} color="#10b981" />
                    <span style={{ color: '#065f46', fontWeight: 'bold', fontSize: '14px' }}>Select facial packages</span>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#e0e7ff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ShieldCheck size={20} color="#4f46e5" /></div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '15px' }}>Hozify Rates</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Standard rate card included</div>
                      </div>
                    </div>
                    <ChevronRight size={20} color="#94a3b8" />
                  </div>

                  <div style={{ border: '1px solid #4f46e5', borderRadius: '16px', padding: '24px', position: 'relative', marginBottom: '32px' }}>
                    <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Popular</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Organic Fruit Glow</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: '1.5' }}>Natural papaya and aloe juice fruit facial scrub</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>₹{selectedDrawerPkg.price}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}><span style={{ textDecoration: 'line-through' }}>₹{selectedDrawerPkg.originalPrice}</span> <span style={{ color: '#10b981', fontWeight: 'bold' }}>SAVE 50%</span></div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#1e1b4b', borderRadius: '8px', color: '#fff', overflow: 'hidden' }}>
                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', color: '#fff', padding: '8px 12px', cursor: 'pointer' }}><Minus size={16} /></button>
                        <span style={{ fontWeight: 'bold', fontSize: '15px', width: '20px', textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', color: '#fff', padding: '8px 12px', cursor: 'pointer' }}><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '32px 24px', marginTop: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>Our process</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {[
                      { num: 1, title: 'Inspection & quote', desc: 'We inspect and share a quote for approval' },
                      { num: 2, title: 'Approval or expert review', desc: 'Repair begins after your approval.' },
                      { num: 3, title: 'Repair & spare parts', desc: 'If needed, we will source spare parts.' },
                      { num: 4, title: 'Warranty activation', desc: 'Your service comes under warranty.' }
                    ].map(step => (
                      <div key={step.num} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', color: '#0f172a', flexShrink: 0 }}>{step.num}</div>
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>{step.title}</div>
                          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1e1b4b', fontSize: '16px', marginBottom: '12px' }}>Top technicians</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0f172a' }}><CheckCircle size={16} color="#4f46e5" /> Background verified</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0f172a' }}><CheckCircle size={16} color="#4f46e5" /> Trained across all brands</div>
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=100&h=120&q=80" alt="Tech" style={{ width: '80px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '32px 24px', marginTop: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>We service all brands</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {['IFB', 'SIEMENS', 'BOSCH', 'LG', 'SAMSUNG', 'Whirlpool', 'Godrej', '+more'].map(brand => (
                      <div key={brand} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 8px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: brand === '+more' ? '#64748b' : '#0f172a' }}>{brand}</div>
                    ))}
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <ShieldCheck size={24} color="#1e1b4b" />
                      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1e1b4b' }}>Hozify cover</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0f172a' }}><CheckCircle size={16} color="#4f46e5" /> Up to 180 days warranty</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0f172a' }}><CheckCircle size={16} color="#4f46e5" /> Up to ₹10,000 damage cover</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '32px 24px', marginTop: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>What is not included</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#0f172a' }}><XCircle size={18} color="#ef4444" /> Replacement or installation of taps</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#0f172a' }}><XCircle size={18} color="#ef4444" /> Repair of commercial appliances</div>
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '32px 24px', marginTop: '12px', paddingBottom: '64px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px' }}>Frequently asked questions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>Does the cost include spare parts?</span>
                      <ChevronDown size={20} color="#64748b" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>What if the same issue occurs again?</span>
                      <ChevronDown size={20} color="#64748b" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Sticky Bar */}
              <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 16px rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{qty} item{qty > 1 ? 's' : ''} selected</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>₹{selectedDrawerPkg.price * qty}</div>
                </div>
                <button onClick={() => { setSelectedDrawerPkg(null); navigate('/cms/app-management/user-app/flow/cart'); }} style={{ background: '#1e1b4b', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </AdminShell>
    );
  }

  // Variant Selection View (Image 4 Layout adapted for Desktop)
  return (
    <AdminShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#fff', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
        
        {/* Sub-Category Selection View (if no sub-category selected yet) */}
        {!selectedSubCategory ? (
          <div style={{ padding: '48px' }}>
            <button 
              onClick={() => navigate('/cms/app-management/user-app/flow/services')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '32px', fontSize: '16px', fontWeight: '600' }}
            >
              <ChevronLeft size={20} /> Back to Categories
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a', marginBottom: '48px' }}>{service?.name}</h1>
            
            {service?.subCategories && service.subCategories.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '32px' }}>
                {service.subCategories.map((sub) => (
                  <div 
                    key={sub.id} 
                    onClick={() => {
                      // Simulating selecting a sub-category and moving to variants
                      // In a real app, the variants/packages might depend on the sub-category
                      setSelectedVariant(null);
                      // Just using a local state to move to next step
                      setSelectedSubCategory(sub);
                    }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#fff' }}>
                      <img src={sub.image} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '18px', textAlign: 'center', fontWeight: '600', color: '#334155', lineHeight: '1.2' }}>{sub.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px', color: '#64748b', fontSize: '18px' }}>No services found for this category.</div>
            )}
          </div>
        ) : (
          <>
            {/* Banner Section for the selected subcategory */}
            <div style={{ display: 'flex', background: '#e8f3e8', height: '280px', position: 'relative', overflow: 'hidden' }}>
              <button 
                onClick={() => setSelectedSubCategory(null)} 
                style={{ position: 'absolute', top: '24px', left: '24px', background: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <ChevronLeft size={24} color="#0f172a" />
              </button>
              
              <div style={{ flex: 1, padding: '48px 48px 48px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ background: '#701a75', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', width: 'fit-content', marginBottom: '12px', letterSpacing: '0.5px' }}>NEW LAUNCH</div>
                <h2 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 'bold', color: '#0f172a', lineHeight: '1.2' }}>Upgrade to Luxe<br/>{selectedSubCategory.name}</h2>
                <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>Starting at ₹799 <span style={{ textDecoration: 'line-through', color: '#94a3b8', marginLeft: '4px' }}>₹999</span></p>
              </div>
              
              <div style={{ width: '40%', position: 'relative' }}>
                <img src={selectedSubCategory.image} alt={selectedSubCategory.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '32px', borderBottomLeftRadius: '32px' }} />
              </div>
            </div>

            {/* Variants List */}
            <div style={{ padding: '32px 80px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {service?.variants?.map((variant, index) => (
                  <div 
                    key={variant.id} 
                    onClick={() => setSelectedVariant(variant)}
                    style={{ 
                      display: 'flex', 
                      gap: '24px', 
                      alignItems: 'center', 
                      cursor: 'pointer', 
                      padding: '32px 0',
                      borderBottom: index < service.variants.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'opacity 0.2s' 
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                  >
                    <div style={{ width: '100px', height: '100px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={variant.image} alt={variant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>{variant.name}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        {variant.tags.map((tag, idx) => (
                          <span key={idx} style={{ background: '#f8fafc', color: '#475569', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>{variant.description}</p>
                    </div>
                    
                    <ChevronRight size={24} color="#94a3b8" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}