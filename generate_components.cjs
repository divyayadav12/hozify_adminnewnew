const fs = require('fs');
const path = require('path');

const DIR = 'e:/Zenvora/hozify_adminnewnew/src/modules/cms/appManagement/userApp/pages';

const templates = {
  FlowServicesPage: `import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockServices } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function FlowServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState(mockServices);

  return (
    <AdminShell>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>All Services</h1>
          <button style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', gap: '8px', cursor: 'pointer' }}>
            <Plus size={18} /> Add Service
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {services.map(s => (
            <div key={s.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <img src={s.image} alt={s.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{s.name}</h3>
                <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '14px' }}>{s.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => navigate(\`/cms/app-management/user-app/flow/services/\${s.id}/packages\`)} style={{ background: '#e0e7ff', color: '#4f46e5', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>View Packages</button>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}><Edit size={16} /></button>
                    <button style={{ background: '#fef2f2', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}`,

  FlowPackagesPage: `import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockPackages, mockServices } from '../data/mockData';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, ChevronLeft, Star, Clock } from 'lucide-react';

export default function FlowPackagesPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = mockServices.find(s => s.id === serviceId);
  const [packages, setPackages] = useState(mockPackages[serviceId] || []);

  return (
    <AdminShell>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/cms/app-management/user-app/flow/services')} style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{service?.name || 'Packages'}</h1>
          <button style={{ marginLeft: 'auto', background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', gap: '8px', cursor: 'pointer' }}>
            <Plus size={18} /> Add Package
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {packages.map(pkg => (
            <div key={pkg.id} style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{pkg.name}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} color="#eab308" /> {pkg.rating} ({pkg.reviews})</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {pkg.duration}</span>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '20px', fontWeight: 'bold' }}>
                    ₹{pkg.price} <span style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>₹{pkg.originalPrice}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigate(\`/cms/app-management/user-app/flow/packages/\${pkg.id}\`)} style={{ background: '#e0e7ff', color: '#4f46e5', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Details</button>
                  <button style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}><Edit size={16} /></button>
                  <button style={{ background: '#fef2f2', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}`,

  FlowPackageDetailsPage: `import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockPackages } from '../data/mockData';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function FlowPackageDetailsPage() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  
  // Find package in mockData
  let pkg = null;
  Object.values(mockPackages).forEach(servicePackages => {
    const found = servicePackages.find(p => p.id === packageId);
    if (found) pkg = found;
  });

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => navigate(-1)} style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Package Details</h1>
        </div>
        
        {pkg && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 16px 0' }}>{pkg.name}</h2>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5', marginBottom: '24px' }}>
              ₹{pkg.price} <span style={{ fontSize: '16px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{pkg.originalPrice}</span>
            </div>
            
            <h3 style={{ fontSize: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>What's Included</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {pkg.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                  <CheckCircle2 color="#10b981" size={20} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button onClick={() => navigate('/cms/app-management/user-app/flow/success')} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}`,

  FlowSuccessPage: `import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function FlowSuccessPage() {
  const navigate = useNavigate();

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
}`,

  FlowCartPage: `import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function FlowCartPage() {
  const navigate = useNavigate();

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/cms/app-management/user-app/flow/success')} style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Your Cart</h1>
        </div>
        
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Luxe Salon Package</h3>
              <p style={{ margin: 0, color: '#64748b' }}>₹1999</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '4px 12px', borderRadius: '8px' }}>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>-</button>
              <span style={{ fontWeight: 'bold' }}>1</span>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>+</button>
            </div>
          </div>
          
          <h3 style={{ margin: '0 0 16px 0' }}>Bill Details</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '12px' }}>
            <span>Item Total</span>
            <span>₹1999</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
            <span>Taxes & Fee</span>
            <span>₹360</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
            <span>To Pay</span>
            <span>₹2359</span>
          </div>
        </div>

        <button onClick={() => navigate('/cms/app-management/user-app/flow/address')} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Proceed to Address
        </button>
      </div>
    </AdminShell>
  );
}`,

  FlowAddressPage: `import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockAddresses } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

export default function FlowAddressPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(mockAddresses[0]?.id);

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Select Address</h1>
          <button onClick={() => navigate('/cms/app-management/user-app/flow/address/add')} style={{ background: '#e0e7ff', color: '#4f46e5', border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            <Plus size={18} /> Add New
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {mockAddresses.map(addr => (
            <div key={addr.id} onClick={() => setSelected(addr.id)} style={{ padding: '20px', borderRadius: '12px', border: selected === addr.id ? '2px solid #4f46e5' : '1px solid #e2e8f0', background: selected === addr.id ? '#f5f7ff' : '#fff', cursor: 'pointer', position: 'relative' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin color={selected === addr.id ? '#4f46e5' : '#64748b'} style={{ marginTop: '4px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{addr.type}</span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>{addr.name} | {addr.phone}</span>
                  </div>
                  <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>{addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.pincode}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}><Edit size={16} /></button>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/cms/app-management/user-app/flow/slot')} disabled={!selected} style={{ width: '100%', background: selected ? '#4f46e5' : '#cbd5e1', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: selected ? 'pointer' : 'not-allowed' }}>
          Continue to Slots
        </button>
      </div>
    </AdminShell>
  );
}`,

  FlowSlotPage: `import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockSlots } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export default function FlowSlotPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(mockSlots.availableDates[0]?.date);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Select Date & Time</h1>
        
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Select Date</h3>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px' }}>
            {mockSlots.availableDates.map(date => (
              <div key={date.id} onClick={() => setSelectedDate(date.date)} style={{ padding: '16px 24px', borderRadius: '12px', border: selectedDate === date.date ? '2px solid #4f46e5' : '1px solid #e2e8f0', background: selectedDate === date.date ? '#f5f7ff' : '#fff', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: selectedDate === date.date ? '#4f46e5' : '#64748b', marginBottom: '4px' }}>{date.shortDate}</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{date.date}</div>
              </div>
            ))}
          </div>

          <h3 style={{ margin: '32px 0 16px 0' }}>Select Time Slot</h3>
          {Object.entries(mockSlots.timeSlots).map(([period, slots]) => (
            <div key={period} style={{ marginBottom: '24px' }}>
              <div style={{ textTransform: 'capitalize', color: '#64748b', marginBottom: '12px' }}>{period}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {slots.map(slot => (
                  <button key={slot.id} disabled={!slot.available} onClick={() => setSelectedTime(slot.time)} style={{ padding: '12px 24px', borderRadius: '8px', border: selectedTime === slot.time ? '2px solid #4f46e5' : '1px solid #e2e8f0', background: selectedTime === slot.time ? '#4f46e5' : slot.available ? '#fff' : '#f8fafc', color: selectedTime === slot.time ? '#fff' : slot.available ? '#1e293b' : '#94a3b8', cursor: slot.available ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/cms/app-management/user-app/flow/checkout')} disabled={!selectedTime} style={{ width: '100%', background: selectedTime ? '#4f46e5' : '#cbd5e1', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: selectedTime ? 'pointer' : 'not-allowed' }}>
          Proceed to Checkout
        </button>
      </div>
    </AdminShell>
  );
}`,

  FlowCheckoutPage: `import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useNavigate } from 'react-router-dom';

export default function FlowCheckoutPage() {
  const navigate = useNavigate();

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Checkout</h1>
        
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>Booking Summary</h3>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Luxe Salon Package</p>
          <p style={{ margin: '0 0 8px 0', color: '#64748b' }}>Date: Today, 10 Jul</p>
          <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>Time: 10:00 AM</p>
          <p style={{ margin: '0 0 8px 0', color: '#64748b' }}>Address: A-123, Sunrise Apartments, MG Road, Koramangala, Bengaluru, 560034</p>
          
          <h3 style={{ margin: '32px 0 16px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>Payment Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '12px' }}><span>Item Total</span><span>₹1999</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '12px' }}><span>Taxes</span><span>₹360</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}><span>Convenience Fee</span><span>₹49</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}><span>Grand Total</span><span>₹2408</span></div>
        </div>

        <button onClick={() => navigate('/cms/app-management/user-app/flow/payment')} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Proceed to Payment
        </button>
      </div>
    </AdminShell>
  );
}`,

  FlowPaymentPage: `import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

export default function FlowPaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('');
  const methods = ['UPI', 'Credit/Debit Card', 'Net Banking', 'Wallets', 'Cash on Service'];

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Payment Options</h1>
        
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          {methods.map(m => (
            <div key={m} onClick={() => setMethod(m)} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: method === m ? '#f5f7ff' : '#fff' }}>
              <CreditCard color={method === m ? '#4f46e5' : '#94a3b8'} />
              <span style={{ fontSize: '16px', fontWeight: method === m ? 'bold' : 'normal' }}>{m}</span>
              {method === m && <div style={{ marginLeft: 'auto', width: '12px', height: '12px', borderRadius: '50%', background: '#4f46e5' }} />}
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/cms/app-management/user-app/flow/confirmation')} disabled={!method} style={{ width: '100%', background: method ? '#4f46e5' : '#cbd5e1', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: method ? 'pointer' : 'not-allowed' }}>
          Pay ₹2408 Securely
        </button>
      </div>
    </AdminShell>
  );
}`,

  FlowConfirmationPage: `import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function FlowConfirmationPage() {
  const navigate = useNavigate();

  return (
    <AdminShell>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '48px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Booking Confirmed!</h1>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '32px' }}>Your booking ID is <span style={{ fontWeight: 'bold', color: '#1e293b' }}>ORD-8923</span></p>
          
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: '#64748b' }}>Service</span><span style={{ fontWeight: 'bold' }}>Luxe Salon Package</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: '#64748b' }}>Date & Time</span><span style={{ fontWeight: 'bold' }}>10 Jul, 10:00 AM</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: '#64748b' }}>Amount Paid</span><span style={{ fontWeight: 'bold' }}>₹2408</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Payment Method</span><span style={{ fontWeight: 'bold' }}>UPI</span></div>
          </div>

          <button onClick={() => navigate('/cms/app-management/user-app/flow/services')} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    </AdminShell>
  );
}`,

  AdminBookingsPage: `import React from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockOrders } from '../data/mockData';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function AdminBookingsPage() {
  return (
    <AdminShell>
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Bookings Ledger</h1>
        
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
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
    </AdminShell>
  );
}`,

  AdminPaymentsPage: `import React from 'react';
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
}`
};

Object.keys(templates).forEach(filename => {
  fs.writeFileSync(path.join(DIR, filename + '.jsx'), templates[filename]);
});

console.log('Successfully created all components');
