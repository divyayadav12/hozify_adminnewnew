import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

export default function RegisterPartner() {
  const { navigate } = useApp();
  const [step, setStep] = useState(1);

  // Step 1 Form States
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [password, setPassword] = useState('password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');

  // Step 2 Form States
  const [businessType, setBusinessType] = useState('');
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [cin, setCin] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(ROUTES.partners);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      navigate(ROUTES.onboardingAddress);
    }
  };

  const handleSaveDraft = () => {
    navigate(ROUTES.partners);
  };

  return (
    <AdminShell activeTab="Partners" searchPlaceholder={step === 1 ? 'Search partners or transactions...' : 'Search partners, transactions...'}>
      {/* Breadcrumb Navigation */}
      <div className="registration-breadcrumb">
        <button className="breadcrumb-link" onClick={() => navigate(ROUTES.partners)} type="button">
          Partners
        </button>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">Add New Partner</span>
      </div>

      {/* Page Heading */}
      <div className="registration-heading">
        <h1>{step === 1 ? 'Register New Partner' : 'Partner Registration'}</h1>
        <p>
          {step === 1
            ? 'Step 1: Provide basic contact and authentication details for the partner account.'
            : 'Complete the business verification steps to onboard a new partner into the ecosystem.'}
        </p>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="registration-stepper-container">
        {step === 1 ? (
          // 5-step stepper for Step 1
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
        ) : (
          // 4-step stepper for Step 2
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
        )}
      </div>

      {/* Registration Form Card */}
      <form className="panel registration-form-card" onSubmit={handleFormSubmit}>
        {step === 1 ? (
          /* STEP 1: Basic Form */
          <div className="form-grid-columns">
            {/* Left Column */}
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

            {/* Right Column */}
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
        ) : (
          /* STEP 2: Business Verification Details */
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
        )}

        <div className="form-divider-horizontal" />

        <div className="form-buttons-row">
          <button className="btn-back-link" type="button" onClick={handleBack}>
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

      {step === 1 ? (
        /* Info Cards Grid for Step 1 */
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
      ) : (
        /* Help footer note for Step 2 */
        <div className="registration-step2-help-note">
          <span>Need help? Contact partner-onboarding@hozify.com or call +1-800-HOZIFY</span>
        </div>
      )}
    </AdminShell>
  );
}
