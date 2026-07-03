import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import BusinessHeaderTabs from './BusinessHeaderTabs';
import { useToast } from '../../components/common/ToastNotification';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  Building2,
  User,
  MapPin,
  FileText,
  Eye
} from 'lucide-react';

const STEPS = [
  { num: 1, title: 'Business Info', desc: 'Core identification', icon: Building2 },
  { num: 2, title: 'Owner Info', desc: 'Contact & ownership', icon: User },
  { num: 3, title: 'Address', desc: 'Physical location', icon: MapPin },
  { num: 4, title: 'Documents', desc: 'Upload legal papers', icon: FileText },
  { num: 5, title: 'Review', desc: 'Final confirmation', icon: Eye }
];

export default function AddBusiness() {
  const { navigate } = useApp();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1 - Business Info
  const [legalName, setLegalName] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [entityType, setEntityType] = useState('LLC');
  const [taxId, setTaxId] = useState('');
  const [description, setDescription] = useState('');

  // Step 2 - Owner Info
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerStake, setOwnerStake] = useState('');

  // Step 3 - Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');

  // Step 4 - Documents
  const [uploadedDocs, setUploadedDocs] = useState({
    gst: null,
    pan: null,
    tradeLicense: null
  });

  const handleDocUpload = (docKey, fileName) => {
    setUploadedDocs(prev => ({ ...prev, [docKey]: fileName }));
    addToast(`${fileName} uploaded successfully!`, 'success');
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!legalName.trim()) { addToast('Please enter the Business Legal Name.', 'error'); return false; }
      if (!taxId.trim()) { addToast('Please enter the Registration / Tax ID.', 'error'); return false; }
      if (!primaryCategory) { addToast('Please select a primary business category.', 'error'); return false; }
    }
    if (currentStep === 2) {
      if (!ownerName.trim()) { addToast('Please enter the Owner Name.', 'error'); return false; }
      if (!ownerEmail.trim()) { addToast('Please enter the Owner Email.', 'error'); return false; }
      if (!ownerPhone.trim()) { addToast('Please enter the Owner Phone.', 'error'); return false; }
    }
    if (currentStep === 3) {
      if (!street.trim()) { addToast('Please enter the street address.', 'error'); return false; }
      if (!city.trim()) { addToast('Please enter the city.', 'error'); return false; }
      if (!pincode.trim()) { addToast('Please enter the pincode.', 'error'); return false; }
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      addToast(`Step ${currentStep} completed. Moving to step ${currentStep + 1}.`, 'success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    addToast('Registering business in the Hozify network...', 'info');
    setTimeout(() => {
      setSubmitting(false);
      addToast(`"${legalName}" successfully registered! Redirecting to dashboard...`, 'success');
      setTimeout(() => navigate(ROUTES.businessApproval), 1500);
    }, 1800);
  };

  const inputStyle = {
    width: '100%',
    height: '40px',
    border: '1px solid var(--line)',
    borderRadius: '6px',
    padding: '0 12px',
    fontSize: '13px',
    outline: 'none',
    color: 'var(--text)',
    background: '#fff',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: '800',
    color: 'var(--text)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.4px'
  };

  const renderStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Business Information</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Provide the official registration details for the new business entity.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Business Legal Name *</label>
          <input style={inputStyle} type="text" placeholder="e.g. Vanguard Logistics Solutions Ltd." value={legalName} onChange={e => setLegalName(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Registration / Tax ID *</label>
          <input style={inputStyle} type="text" placeholder="e.g. 27AABCV1234A1Z5" value={taxId} onChange={e => setTaxId(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Entity Type</label>
          <select style={inputStyle} value={entityType} onChange={e => setEntityType(e.target.value)}>
            <option value="LLC">LLC (Limited Liability Company)</option>
            <option value="Corporation">Private Limited Corporation</option>
            <option value="Partnership">Partnership Firm</option>
            <option value="Sole">Sole Proprietorship</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Primary Business Category *</label>
          <select style={inputStyle} value={primaryCategory} onChange={e => setPrimaryCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Logistics">Logistics & Supply Chain</option>
            <option value="Retail">Retail & E-Commerce</option>
            <option value="Healthcare">Healthcare & Pharma</option>
            <option value="SaaS">SaaS & Technology</option>
            <option value="Finance">Finance & FinTech</option>
            <option value="Manufacturing">Manufacturing & Industrial</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Sub-Category</label>
          <input style={inputStyle} type="text" placeholder="e.g. Freight Forwarding" value={subCategory} onChange={e => setSubCategory(e.target.value)} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Business Description</label>
          <textarea
            style={{ ...inputStyle, height: '80px', padding: '10px 12px', resize: 'vertical' }}
            placeholder="Brief description of what this business does..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Owner Information</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Enter the primary representative and beneficial ownership details.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Full Legal Name *</label>
          <input style={inputStyle} type="text" placeholder="e.g. Marcus Jonathan Thorne" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input style={inputStyle} type="email" placeholder="owner@company.com" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input style={inputStyle} type="tel" placeholder="+91 98765 43210" value={ownerPhone} onChange={e => setOwnerPhone(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Ownership Stake (%)</label>
          <input style={inputStyle} type="number" placeholder="e.g. 51" min="0" max="100" value={ownerStake} onChange={e => setOwnerStake(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Owner Role</label>
          <select style={inputStyle}>
            <option>Managing Director</option>
            <option>CEO / Founder</option>
            <option>Partner</option>
            <option>Trustee</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Registered Address</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Provide the official registered business address.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Street Address *</label>
          <input style={inputStyle} type="text" placeholder="e.g. Unit 402, Enterprise Heights, Financial District" value={street} onChange={e => setStreet(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>City *</label>
          <input style={inputStyle} type="text" placeholder="e.g. Mumbai" value={city} onChange={e => setCity(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>State / Province</label>
          <input style={inputStyle} type="text" placeholder="e.g. Maharashtra" value={state} onChange={e => setState(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Pincode / ZIP *</label>
          <input style={inputStyle} type="text" placeholder="e.g. 400001" value={pincode} onChange={e => setPincode(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <select style={inputStyle} value={country} onChange={e => setCountry(e.target.value)}>
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Netherlands</option>
            <option>Singapore</option>
            <option>UAE</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Upload Documents</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Attach all required legal documents for KYC and compliance verification.</p>
      </div>
      {[
        { key: 'gst', label: 'GST Registration Certificate', hint: 'Form GST REG-06 (PDF/JPG/PNG)', required: true },
        { key: 'pan', label: 'PAN Card Copy', hint: 'Corporate PAN issued by Income Tax Dept.', required: true },
        { key: 'tradeLicense', label: 'Trade / Establishment License', hint: 'Issued by Municipal Corporation', required: false }
      ].map(doc => (
        <div
          key={doc.key}
          style={{
            border: `2px dashed ${uploadedDocs[doc.key] ? '#10b981' : 'var(--line)'}`,
            borderRadius: '8px',
            padding: '20px',
            background: uploadedDocs[doc.key] ? '#f0fdf4' : '#fafafa',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>
                {doc.label} {doc.required && <span style={{ color: '#ef4444' }}>*</span>}
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{doc.hint}</span>
              {uploadedDocs[doc.key] && (
                <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', marginTop: '4px' }}>
                  ✓ {uploadedDocs[doc.key]}
                </p>
              )}
            </div>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                background: '#fff',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--text)',
                cursor: 'pointer'
              }}
              onClick={() => {
                const fakeNames = { gst: 'GST_Certificate_2024.pdf', pan: 'PAN_Card_Corporate.pdf', tradeLicense: 'Trade_License_2024_VLS.pdf' };
                handleDocUpload(doc.key, fakeNames[doc.key]);
              }}
            >
              <Upload size={14} />
              {uploadedDocs[doc.key] ? 'Replace' : 'Choose File'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep5 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Review & Submit</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Confirm all details before submitting this registration to the Hozify platform.</p>
      </div>

      <div style={{ background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 10px' }}>Business Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Legal Name</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{legalName || '—'}</p></div>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Tax ID</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{taxId || '—'}</p></div>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Category</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{primaryCategory || '—'}</p></div>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Entity Type</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{entityType}</p></div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 10px' }}>Owner Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Owner Name</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{ownerName || '—'}</p></div>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Email</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{ownerEmail || '—'}</p></div>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Phone</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{ownerPhone || '—'}</p></div>
            <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Stake</span><p style={{ margin: '2px 0 0', fontWeight: '700' }}>{ownerStake ? `${ownerStake}%` : '—'}</p></div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 10px' }}>Address</h3>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>
            {[street, city, state, pincode, country].filter(Boolean).join(', ') || '—'}
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 10px' }}>Uploaded Documents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { label: 'GST Certificate', key: 'gst' },
              { label: 'PAN Card', key: 'pan' },
              { label: 'Trade License', key: 'tradeLicense' }
            ].map(d => (
              <div key={d.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--muted)' }}>{d.label}</span>
                <span style={{ fontWeight: '700', color: uploadedDocs[d.key] ? '#16a34a' : '#ef4444' }}>
                  {uploadedDocs[d.key] ? `✓ ${uploadedDocs[d.key]}` : '✗ Not Uploaded'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Shield size={16} style={{ color: '#1d4ed8', flexShrink: 0, marginTop: '1px' }} />
        <p style={{ margin: 0, fontSize: '12px', color: '#1e40af', fontWeight: '600', lineHeight: '1.5' }}>
          By submitting this form, you confirm that all provided information is accurate and complete to the best of your knowledge. Any fraudulent submission may result in account suspension.
        </p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Compliance" />}
      searchPlaceholder="Search registry..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Add New Business</h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Complete all 5 steps to register a new entity in the Hozify network.</p>
        </div>

        {/* Progress bar (top) */}
        <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#4f46e5', borderRadius: '4px', transition: 'width 0.4s ease', width: `${(currentStep / 5) * 100}%` }} />
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-section)', alignItems: 'stretch', flexWrap: 'wrap' }}>

          {/* LEFT: Steps Sidebar */}
          <div className="panel" style={{ flex: '0 0 220px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '180px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Registration Progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {STEPS.map(step => {
                const isDone = currentStep > step.num;
                const isActive = currentStep === step.num;
                const Icon = step.icon;
                return (
                  <div key={step.num} style={{ display: 'flex', gap: '12px', alignItems: 'center', opacity: isDone || isActive ? 1 : 0.45 }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: isDone ? '#10b981' : isActive ? '#4f46e5' : '#e2e8f0',
                      color: isDone || isActive ? '#fff' : 'var(--muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: '800',
                      flexShrink: 0,
                      transition: 'all 0.25s ease'
                    }}>
                      {isDone ? <Check size={15} /> : <Icon size={15} />}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: isActive ? '#4f46e5' : 'var(--text)' }}>{step.title}</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Step Form */}
          <div className="panel" style={{ flex: 1, padding: 'var(--spacing-page)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', minWidth: '320px' }}>
            <form
              onSubmit={currentStep < 5 ? handleNext : (e) => e.preventDefault()}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {renderStepContent()}

              {/* Footer Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '38px',
                    padding: '0 16px',
                    border: '1px solid var(--line)',
                    background: '#fff',
                    color: currentStep === 1 ? '#cbd5e1' : 'var(--text)',
                    fontSize: '13px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    cursor: currentStep === 1 ? 'default' : 'pointer'
                  }}
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
                  Step {currentStep} of 5
                </span>

                {currentStep < 5 ? (
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      height: '38px',
                      padding: '0 20px',
                      border: 'none',
                      background: '#4f46e5',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '700',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      height: '38px',
                      padding: '0 20px',
                      border: 'none',
                      background: submitting ? '#6d7280' : '#10b981',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '700',
                      borderRadius: '6px',
                      cursor: submitting ? 'default' : 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    {submitting ? 'Submitting...' : <><Check size={14} /> Submit Registration</>}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
