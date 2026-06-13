import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Info,
  HelpCircle,
  X,
  MapPin,
  Building,
  Wrench,
  ShieldAlert,
  Truck,
  Sparkles,
  Plus,
  Search,
  Crosshair,
  Save,
  Landmark,
  Send
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

export default function AddPartnerWizard() {
  const { navigate } = useApp();
  const [wizardStep, setWizardStep] = useState(1);

  // --- Step 1 & 2 Form States (Basic & Business/Compliance) ---
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [password, setPassword] = useState('password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');
  
  const [businessType, setBusinessType] = useState('');
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [cin, setCin] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');

  // --- Step 3 Form States (Address) ---
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // --- Step 4 Form States (Services) ---
  const [selectedCategories, setSelectedCategories] = useState(['facility', 'surveillance']);
  const [subcategories, setSubcategories] = useState([
    'HVAC Maintenance',
    'Access Control Systems',
    'Perimeter Fencing',
    'Remote Monitoring'
  ]);
  const [searchVal, setSearchVal] = useState('');

  // --- Step 5 Form States (Banking) ---
  const [holderName, setHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  // --- Common Helpers ---
  const handleSaveDraft = () => {
    navigate(ROUTES.partners);
  };

  const handleClose = () => {
    navigate(ROUTES.partners);
  };

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const addSubcategory = (e) => {
    e.preventDefault();
    if (searchVal.trim() && !subcategories.includes(searchVal.trim())) {
      setSubcategories([...subcategories, searchVal.trim()]);
      setSearchVal('');
    }
  };

  const removeSubcategory = (sub) => {
    setSubcategories(subcategories.filter((s) => s !== sub));
  };

  // --- RENDER WIZARD STEPS ---

  if (wizardStep === 1) {
    // Step 1: Basic Registration Info
    return (
      <AdminShell activeTab="Partners" searchPlaceholder="Search partners or transactions...">
        <div className="registration-breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate(ROUTES.partners)} type="button">
            Partners
          </button>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Add New Partner</span>
        </div>

        <div className="registration-heading">
          <h1>Register New Partner</h1>
          <p>Step 1: Provide basic contact and authentication details for the partner account.</p>
        </div>

        <div className="registration-stepper-container">
          <div className="stepper-track-wrap">
            <div className="stepper-track-line" />
            <div className="stepper-track-line-active width-0" />
            
            <div className="stepper-step active">
              <span className="step-num">1</span>
              <span className="step-label">Basic</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">2</span>
              <span className="step-label">Business</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">3</span>
              <span className="step-label">Address</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">4</span>
              <span className="step-label">Service</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">5</span>
              <span className="step-label">Bank</span>
            </div>
          </div>
        </div>

        <form className="panel registration-form-card" onSubmit={(e) => { e.preventDefault(); setWizardStep(2); }}>
          <div className="form-grid-columns">
            <div className="form-col">
              <div className="form-field-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Acme Corp Services"
                  required
                />
              </div>
              
              <div className="form-field-group">
                <label htmlFor="ownerName">Owner Name</label>
                <input
                  id="ownerName"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Full Legal Name"
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Mobile Number</label>
                <div className="phone-input-combo">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country Code"
                  >
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                  </select>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="(555) 000-0000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-col">
              <div className="form-field-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@business.com"
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <span className="field-hint-text">
                  Min. 12 characters, 1 uppercase, 1 symbol.
                </span>
              </div>
            </div>
          </div>

          <div className="form-divider-horizontal" />

          <div className="form-buttons-row">
            <button className="btn-back-link" type="button" onClick={() => navigate(ROUTES.partners)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="form-right-actions">
              <button className="btn-draft-save" type="button" onClick={handleSaveDraft}>
                Save Draft
              </button>
              <button className="btn-form-submit" type="submit">
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </form>

        <section className="registration-info-grid">
          <div className="info-card">
            <div className="info-card-icon blue-theme">
              <Shield size={20} />
            </div>
            <h3>Identity Check</h3>
            <p>All partners undergo a 24-hour verification process after step 5.</p>
          </div>

          <div className="info-card">
            <div className="info-card-icon blue-theme">
              <Lock size={20} />
            </div>
            <h3>Secure Login</h3>
            <p>The password provided here will be the master admin account.</p>
          </div>

          <div className="info-card">
            <div className="info-card-icon blue-theme">
              <Mail size={20} />
            </div>
            <h3>Email Verification</h3>
            <p>A confirmation link will be sent to the primary email address.</p>
          </div>
        </section>
      </AdminShell>
    );
  }

  if (wizardStep === 2) {
    // Step 2: Business Verification Details
    return (
      <AdminShell activeTab="Partners" searchPlaceholder="Search partners, transactions...">
        <div className="registration-breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate(ROUTES.partners)} type="button">
            Partners
          </button>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Add New Partner</span>
        </div>

        <div className="registration-heading">
          <h1>Partner Registration</h1>
          <p>Complete the business verification steps to onboard a new partner into the ecosystem.</p>
        </div>

        <div className="registration-stepper-container">
          <div className="stepper-track-wrap stepper-4-step">
            <div className="stepper-track-line" />
            <div className="stepper-track-line-active width-33" />
            
            <div className="stepper-step checked">
              <span className="step-num">✔</span>
              <span className="step-label">Basic Information</span>
            </div>
            <div className="stepper-step active">
              <span className="step-num">2</span>
              <span className="step-label">Business Information</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">3</span>
              <span className="step-label">Banking & KYC</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">4</span>
              <span className="step-label">Review</span>
            </div>
          </div>
        </div>

        <form className="panel registration-form-card" onSubmit={(e) => { e.preventDefault(); setWizardStep(3); }}>
          <div className="form-step2-wrapper">
            <h2 className="form-section-title">Step 2: Business Verification Details</h2>
            <p className="form-section-subtitle">Please provide valid tax and registration credentials as per legal documentation.</p>
            
            <div className="form-field-group full-width-field">
              <label htmlFor="businessType">Business Type</label>
              <select
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
              >
                <option value="">Select Business Type</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Private Limited">Private Limited</option>
                <option value="LLP">Limited Liability Partnership (LLP)</option>
              </select>
            </div>

            <div className="form-grid-columns margin-top-20">
              <div className="form-col">
                <div className="form-field-group">
                  <label htmlFor="gstNumber">GST Number</label>
                  <input
                    id="gstNumber"
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="ENTER 15-DIGIT GSTIN"
                    required
                  />
                  <span className="field-hint-text">Example: 22AAAAA0000A1Z5</span>
                </div>

                <div className="form-field-group">
                  <label htmlFor="registrationNumber">Registration Number (CIN/LLPIN)</label>
                  <input
                    id="registrationNumber"
                    type="text"
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    placeholder="U00000MH0000PTC000000"
                    required
                  />
                </div>
              </div>

              <div className="form-col">
                <div className="form-field-group">
                  <label htmlFor="panNumber">PAN Number</label>
                  <input
                    id="panNumber"
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    placeholder="ENTER 10-DIGIT PAN"
                    required
                  />
                  <span className="field-hint-text">Format: ABCDE1234F</span>
                </div>

                <div className="form-field-group">
                  <label htmlFor="registrationDate">Business Registration Date</label>
                  <input
                    id="registrationDate"
                    type="text"
                    value={registrationDate}
                    onChange={(e) => setRegistrationDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-info-banner-blue">
              <Info size={20} />
              <span>
                All business information will be verified against the official government databases. Ensure the details match exactly as printed on your certificates to avoid delays in onboarding.
              </span>
            </div>
          </div>

          <div className="form-divider-horizontal" />

          <div className="form-buttons-row">
            <button className="btn-back-link" type="button" onClick={() => setWizardStep(1)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="form-right-actions">
              <button className="btn-draft-save" type="button" onClick={handleSaveDraft}>
                Save Draft
              </button>
              <button className="btn-form-submit" type="submit">
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </form>

        <div className="registration-step2-help-note">
          <span>Need help? Contact partner-onboarding@hozify.com or call +1-800-HOZIFY</span>
        </div>
      </AdminShell>
    );
  }

  if (wizardStep === 3) {
    // Step 3: Address Information (Uses standalone wizard shell layout style)
    return (
      <main className="onboarding-wizard-page">
        <header className="wizard-header">
          <div className="wizard-header-left">
            <strong className="wizard-logo">HOZIFY</strong>
            <span className="wizard-logo-divider" />
            <span className="wizard-title-context">New Partner Onboarding</span>
          </div>
          <div className="wizard-header-right">
            <button className="wizard-help-btn" type="button">
              <HelpCircle size={18} />
              <span>Get Help</span>
            </button>
            <button className="wizard-close-btn" type="button" onClick={handleClose} aria-label="Close onboarding">
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="wizard-content-container">
          <div className="wizard-stepper-container">
            <div className="stepper-track-wrap stepper-4-step">
              <div className="stepper-track-line" />
              <div className="stepper-track-line-active width-66" />
              
              <div className="stepper-step checked">
                <span className="step-num">✔</span>
                <span className="step-label">Basic Info</span>
              </div>
              <div className="stepper-step checked">
                <span className="step-num">✔</span>
                <span className="step-label">Compliance</span>
              </div>
              <div className="stepper-step active">
                <span className="step-num">3</span>
                <span className="step-label">Address</span>
              </div>
              <div className="stepper-step">
                <span className="step-num">4</span>
                <span className="step-label">Review</span>
              </div>
            </div>
          </div>

          <form className="panel onboarding-address-form-card" onSubmit={(e) => { e.preventDefault(); setWizardStep(4); }}>
            <div className="form-card-body">
              <h2>Address Information</h2>
              <p className="form-card-subtitle">Please provide the registered business address for legal and settlement purposes.</p>
              
              <div className="form-field-group">
                <label htmlFor="fullAddress">Full Address <span className="red-asterisk">*</span></label>
                <textarea
                  id="fullAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name, Building number, Landmark, etc."
                  rows={3}
                  required
                />
              </div>

              <div className="form-grid-columns margin-top-16">
                <div className="form-field-group">
                  <label htmlFor="stateSelect">State <span className="red-asterisk">*</span></label>
                  <select
                    id="stateSelect"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="IL">Illinois</option>
                    <option value="TX">Texas</option>
                    <option value="WA">Washington</option>
                    <option value="CO">Colorado</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="citySelect">City <span className="red-asterisk">*</span></label>
                  <select
                    id="citySelect"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Austin">Austin</option>
                    <option value="Seattle">Seattle</option>
                    <option value="Denver">Denver</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group margin-top-16">
                <label htmlFor="pincode">Pincode / Zip Code <span className="red-asterisk">*</span></label>
                <input
                  id="pincode"
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 94103"
                  required
                />
              </div>

              <div className="form-info-banner-blue margin-top-20">
                <Info size={20} />
                <div className="info-text-wrap">
                  <strong>Verification Note</strong>
                  <p>This address must match the one listed on your business registration documents. Our compliance team will use this for the final verification stage.</p>
                </div>
              </div>
            </div>

            <div className="form-divider-horizontal" />

            <div className="form-buttons-row">
              <button className="btn-back-outline" type="button" onClick={() => setWizardStep(2)}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="form-right-actions">
                <button className="btn-save-draft-text" type="button" onClick={handleSaveDraft}>
                  Save Draft
                </button>
                <button className="btn-form-submit-active" type="submit">
                  <span>Next Step</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>

          <section className="onboarding-bottom-banners">
            <div className="skyscrapers-info-card">
              <img
                className="skyscrapers-img"
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                alt="Skyscrapers Global Data Coverage"
              />
              <div className="skyscrapers-glass-overlay">
                <span className="overlay-tag">OPERATIONAL PRECISION</span>
                <span className="overlay-heading">Global Data Coverage</span>
              </div>
            </div>

            <div className="countries-supported-card">
              <div className="countries-pin-icon-wrap">
                <MapPin size={24} />
              </div>
              <strong>190+ Countries Supported</strong>
            </div>
          </section>
        </div>

        <footer className="wizard-bottom-footer">
          <span>© 2024 HOZIFY Enterprise. All sensitive information is encrypted according to ISO/IEC 27001 standards.</span>
        </footer>
      </main>
    );
  }

  if (wizardStep === 4) {
    // Step 4: Add Services & Coverage Mapping
    return (
      <AdminShell activeTab="Partners" searchPlaceholder="Search partners or transactions...">
        <div className="add-services-breadcrumb-row">
          <div className="registration-breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate(ROUTES.partners)} type="button">
              Partners
            </button>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Add New Partner</span>
          </div>
          
          <button className="wizard-secure-entry-btn" type="button">
            <Lock size={14} />
            <span>Secure Entry</span>
          </button>
        </div>

        <div className="registration-heading">
          <h1>Add New Partner</h1>
          <p>Configure service offerings and operational reach.</p>
        </div>

        <div className="registration-stepper-container">
          <div className="stepper-track-wrap">
            <div className="stepper-track-line" />
            <div className="stepper-track-line-active width-75" />
            
            <div className="stepper-step checked">
              <span className="step-num">✔</span>
              <span className="step-label">General</span>
            </div>
            <div className="stepper-step checked">
              <span className="step-num">✔</span>
              <span className="step-label">Compliance</span>
            </div>
            <div className="stepper-step checked">
              <span className="step-num">✔</span>
              <span className="step-label">Financials</span>
            </div>
            <div className="stepper-step active">
              <span className="step-num">4</span>
              <span className="step-label">Services</span>
            </div>
            <div className="stepper-step">
              <span className="step-num">5</span>
              <span className="step-label">Review</span>
            </div>
          </div>
        </div>

        <div className="services-page-columns">
          <div className="services-left-column">
            <div className="panel service-card-panel">
              <div className="service-card-title-wrap">
                <div className="title-icon-circle purple-bg">
                  <Building size={16} fill="none" color="#ffffff" />
                </div>
                <div>
                  <h2>Service Categories</h2>
                  <p>Select all main categories this partner provides. This dictates the workflow routing.</p>
                </div>
              </div>

              <div className="categories-grid-selection">
                <button
                  className={`category-select-box ${selectedCategories.includes('facility') ? 'active' : ''}`}
                  onClick={() => toggleCategory('facility')}
                  type="button"
                >
                  <Building size={20} />
                  <span>Facility Mgt</span>
                </button>

                <button
                  className={`category-select-box ${selectedCategories.includes('maintenance') ? 'active' : ''}`}
                  onClick={() => toggleCategory('maintenance')}
                  type="button"
                >
                  <Wrench size={20} />
                  <span>Maintenance</span>
                </button>

                <button
                  className={`category-select-box ${selectedCategories.includes('surveillance') ? 'active' : ''}`}
                  onClick={() => toggleCategory('surveillance')}
                  type="button"
                >
                  <ShieldAlert size={20} />
                  <span>Surveillance</span>
                </button>

                <button
                  className={`category-select-box ${selectedCategories.includes('logistics') ? 'active' : ''}`}
                  onClick={() => toggleCategory('logistics')}
                  type="button"
                >
                  <Truck size={20} />
                  <span>Logistics</span>
                </button>

                <button
                  className={`category-select-box ${selectedCategories.includes('sanitation') ? 'active' : ''}`}
                  onClick={() => toggleCategory('sanitation')}
                  type="button"
                >
                  <Sparkles size={20} />
                  <span>Sanitation</span>
                </button>

                <button className="category-select-box dashed-border" type="button">
                  <Plus size={20} />
                  <span>Request New</span>
                </button>
              </div>
            </div>

            <div className="panel service-card-panel">
              <div className="service-card-title-wrap header-row-justify">
                <div className="title-left-wrap">
                  <div className="title-icon-circle blue-bg">
                    <Plus size={16} color="#ffffff" />
                  </div>
                  <div>
                    <h2>Subcategories</h2>
                    <p>Quick Search Subcategories</p>
                  </div>
                </div>
                <span className="selected-count-badge">{subcategories.length} selected</span>
              </div>

              <form className="subcategory-search-form" onSubmit={addSubcategory}>
                <div className="subcat-search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="e.g. HVAC, CCTV..."
                  />
                </div>
                <button className="btn-add-subcat" type="submit">
                  Add
                </button>
              </form>

              <div className="subcategories-tags-wrap">
                {subcategories.map((sub) => (
                  <div className="subcat-tag" key={sub}>
                    <span>{sub}</span>
                    <button className="btn-remove-tag" type="button" onClick={() => removeSubcategory(sub)} aria-label={`Remove ${sub}`}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="services-right-column">
            <div className="panel service-card-panel flex-column-layout">
              <div className="service-card-title-wrap header-row-justify">
                <div className="title-left-wrap">
                  <div className="title-icon-circle orange-bg">
                    <MapPin size={16} color="#ffffff" />
                  </div>
                  <div>
                    <h2>Service Areas</h2>
                    <p>Define the operational radius for dispatch efficiency.</p>
                  </div>
                </div>
                
                <button className="btn-use-current" type="button">
                  <Crosshair size={14} />
                  <span>Use Current</span>
                </button>
              </div>

              <div className="radar-map-container">
                <svg className="radar-map-svg" viewBox="0 0 400 300" width="100%" height="220">
                  <rect width="400" height="300" fill="#040914" />
                  <circle cx="200" cy="150" r="130" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="150" r="90" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="150" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  
                  <line x1="200" y1="20" x2="200" y2="280" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="50" y1="150" x2="350" y2="150" stroke="#0f172a" strokeWidth="1.5" />

                  <path d="M40 80 Q 200 40 360 80 T 200 280 Z" fill="none" stroke="#0f172a" strokeWidth="1" />
                  <path d="M80 200 C 120 120, 280 120, 320 200" fill="none" stroke="#0f172a" strokeWidth="1" />
                  
                  <circle className="radar-pulse-wave" cx="160" cy="120" r="30" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="160" cy="120" r="3" fill="#38bdf8" />

                  <circle className="radar-pulse-wave" cx="240" cy="170" r="20" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="240" cy="170" r="3" fill="#38bdf8" />
                </svg>
                
                <div className="map-zoom-controls">
                  <button type="button">+</button>
                  <button type="button">-</button>
                </div>

                <button className="btn-redraw-boundaries" type="button">
                  <MapPin size={12} />
                  <span>Redraw Boundaries</span>
                </button>
              </div>

              <div className="active-zones-wrap">
                <h3>Active Zones</h3>
                <div className="zones-list-items">
                  <div className="zone-item">
                    <div className="zone-bullet" />
                    <span className="zone-name">Metro North - Sector A</span>
                    <span className="zone-radius">25 km radius</span>
                  </div>
                  <div className="zone-item">
                    <div className="zone-bullet" />
                    <span className="zone-name">Industrial Zone East</span>
                    <span className="zone-radius">15 km radius</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-divider-horizontal" />

        <div className="form-buttons-row">
          <button className="btn-draft-save" type="button" onClick={() => setWizardStep(3)}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="form-right-actions">
            <button className="btn-draft-save icon-right" type="button" onClick={handleSaveDraft}>
              <Save size={16} />
              <span>Save Draft</span>
            </button>
            <button className="btn-form-submit" type="button" onClick={() => setWizardStep(5)}>
              <span>Continue to Review</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </AdminShell>
    );
  }

  // Step 5: Add Banking Details (Final Submission)
  return (
    <AdminShell activeTab="Partners" searchPlaceholder="Search partners...">
      <div className="add-banking-breadcrumb">
        <button className="back-link-btn" type="button" onClick={() => setWizardStep(4)}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="registration-heading">
        <h1>Add New Enterprise Partner</h1>
      </div>

      <div className="registration-stepper-container">
        <div className="stepper-track-wrap">
          <div className="stepper-track-line" />
          <div className="stepper-track-line-active width-100" />
          
          <div className="stepper-step checked">
            <span className="step-num">✔</span>
            <span className="step-label">Basic Info</span>
          </div>
          <div className="stepper-step checked">
            <span className="step-num">✔</span>
            <span className="step-label">Contact</span>
          </div>
          <div className="stepper-step checked">
            <span className="step-num">✔</span>
            <span className="step-label">Verification</span>
          </div>
          <div className="stepper-step checked">
            <span className="step-num">✔</span>
            <span className="step-label">Contract</span>
          </div>
          <div className="stepper-step active">
            <span className="step-num">05</span>
            <span className="step-label">Banking</span>
          </div>
        </div>
      </div>

      <div className="banking-page-columns">
        <form className="panel banking-form-card" onSubmit={(e) => { e.preventDefault(); navigate(ROUTES.approvalQueue); }}>
          <div className="banking-card-title-wrap">
            <div className="title-icon-circle blue-bg">
              <Landmark size={18} fill="none" color="#ffffff" />
            </div>
            <h2>Bank Information</h2>
          </div>

          <div className="form-field-group">
            <label htmlFor="holderName">Account Holder Name</label>
            <input
              id="holderName"
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="e.g. Acme Corp Operations"
              required
            />
          </div>

          <div className="form-field-group margin-top-16">
            <label htmlFor="bankName">Bank Name</label>
            <input
              id="bankName"
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter formal bank name"
              required
            />
          </div>

          <div className="form-grid-columns margin-top-16">
            <div className="form-field-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="•••• •••• ••••"
                required
              />
            </div>
            <div className="form-field-group">
              <label htmlFor="ifscCode">IFSC Code</label>
              <input
                id="ifscCode"
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                placeholder="ABCD0123456"
                required
              />
            </div>
          </div>

          <div className="form-divider-horizontal" />

          <div className="banking-form-actions">
            <button className="primary-action-btn submit-app-btn" type="submit">
              <span>Submit Application</span>
              <Send size={14} />
            </button>
            <button className="secondary-action-btn" type="button" onClick={handleSaveDraft}>
              <span>Save for later</span>
            </button>
          </div>
        </form>

        <div className="banking-right-column">
          <div className="panel security-check-purple-panel">
            <h3>Final Security Check</h3>
            <p>Your bank details are encrypted using enterprise-grade AES-256 protocols. These details will be used for automated weekly settlements.</p>
          </div>

          <div className="panel onboarding-summary-card">
            <h3>ONBOARDING SUMMARY</h3>
            <div className="summary-list-rows">
              <div className="summary-row">
                <span className="summary-label">Entity Type</span>
                <span className="summary-value">{businessType || 'Private Limited'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Tax Residency</span>
                <span className="summary-value">United States</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Documents Verified</span>
                <span className="summary-badge-files">12 Files</span>
              </div>
            </div>

            <div className="summary-card-divider" />

            <div className="summary-agreement-banner">
              <Info size={16} />
              <span>By submitting, you agree to the HOZIFY Merchant Services Agreement.</span>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
