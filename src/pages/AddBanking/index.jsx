import React, { useState } from 'react';
import {
  ArrowLeft,
  Landmark,
  Send,
  Info
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

export default function AddBanking() {
  const { navigate } = useApp();
  const [holderName, setHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  const handleBack = () => {
    navigate(ROUTES.partners);
  };

  const handleSaveDraft = () => {
    navigate(ROUTES.partners);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.approvalQueue);
  };

  return (
    <AdminShell activeTab="Partners" searchPlaceholder="Search partners...">
      {/* Breadcrumb back link */}
      <div className="add-banking-breadcrumb">
        <button className="back-link-btn" type="button" onClick={handleBack}>
          <ArrowLeft size={16} />
          <span>Back to Partner Management</span>
        </button>
      </div>

      {/* Page Heading */}
      <div className="registration-heading">
        <h1>Add New Enterprise Partner</h1>
      </div>

      {/* Stepper Progress Indicator (5-step, step 5 active) */}
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

      {/* Grid Columns */}
      <div className="banking-page-columns">
        
        {/* Left Card - Form details */}
        <form className="panel banking-form-card" onSubmit={handleSubmit}>
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

        {/* Right Cards - Security details and summaries */}
        <div className="banking-right-column">
          
          {/* Card 1: Final Security Check */}
          <div className="panel security-check-purple-panel">
            <h3>Final Security Check</h3>
            <p>Your bank details are encrypted using enterprise-grade AES-256 protocols. These details will be used for automated weekly settlements.</p>
          </div>

          {/* Card 2: Onboarding Summary */}
          <div className="panel onboarding-summary-card">
            <h3>ONBOARDING SUMMARY</h3>
            <div className="summary-list-rows">
              <div className="summary-row">
                <span className="summary-label">Entity Type</span>
                <span className="summary-value">Private Limited</span>
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
