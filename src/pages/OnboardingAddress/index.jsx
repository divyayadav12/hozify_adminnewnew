import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  ArrowLeft,
  ArrowRight,
  Info,
  MapPin
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function OnboardingAddress() {
  const { navigate } = useApp();
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const handleBack = () => {
    // Navigate back to the Registration page (which will open step 2)
    navigate(ROUTES.addPartner);
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate(ROUTES.addServices);
  };

  const handleClose = () => {
    navigate(ROUTES.partners);
  };

  const handleSaveDraft = () => {
    navigate(ROUTES.partners);
  };

  return (
    <main className="onboarding-wizard-page">
      {/* Wizard Top Header */}
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

      {/* Main Container */}
      <div className="wizard-content-container">
        
        {/* Stepper Progress */}
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

        {/* Address Form Card */}
        <form className="panel onboarding-address-form-card" onSubmit={handleNext}>
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
            <button className="btn-back-outline" type="button" onClick={handleBack}>
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

        {/* Bottom Banner Rows */}
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

      {/* Security Footer */}
      <footer className="wizard-bottom-footer">
        <span>© 2024 HOZIFY Enterprise. All sensitive information is encrypted according to ISO/IEC 27001 standards.</span>
      </footer>
    </main>
  );
}
