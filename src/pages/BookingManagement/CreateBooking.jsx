import React, { useState } from 'react';
import { useToast } from '../../components/common/ToastNotification';
import { useApp } from '../../hooks/useApp';
import AdminShell from '../../components/layouts/AdminShell';
import { ArrowLeft, User, MapPin, Calendar, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import './CreateBooking.css';

import Select from "../../components/ui/Select";

export default function CreateBooking() {
  const { addToast } = useToast();
  const { navigate } = useApp();
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    serviceCategory: '',
    serviceType: '',
    branch: '',
    address: '',
    date: '',
    timeSlot: ''
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Booking created successfully!', 'success');
    navigate('/bookings');
  };

  return (
    <AdminShell
      activeTab="Bookings"
      headerTitle="Create New Booking"
      searchPlaceholder="Search..."
    >
      <div className="create-booking-wrapper">
        <div className="cb-header">
          <button className="cb-back-btn" onClick={() => navigate('/branches/bookings')}>
            <ArrowLeft size={16} /> Back to Branch Bookings
          </button>
          <div className="cb-steps">
            <div className={`cb-step ${step >= 1 ? 'active' : ''}`}>
              <div className="cb-step-icon"><User size={14} /></div>
              <span>Customer</span>
            </div>
            <div className={`cb-step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`cb-step ${step >= 2 ? 'active' : ''}`}>
              <div className="cb-step-icon"><Briefcase size={14} /></div>
              <span>Service</span>
            </div>
            <div className={`cb-step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`cb-step ${step >= 3 ? 'active' : ''}`}>
              <div className="cb-step-icon"><Calendar size={14} /></div>
              <span>Schedule</span>
            </div>
          </div>
        </div>

        <div className="cb-form-container">
          <form onSubmit={handleSubmit} className="cb-form">
            {step === 1 && (
              <div className="cb-step-content fade-in">
                <h2 className="cb-section-title">Customer Details</h2>
                <p className="cb-section-subtitle">Enter the primary contact information for this booking.</p>
                
                <div className="cb-input-group">
                  <label>Full Name</label>
                  <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="e.g. John Doe" required />
                </div>
                
                <div className="cb-row">
                  <div className="cb-input-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required />
                  </div>
                  <div className="cb-input-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="cb-input-group">
                  <label>Service Address</label>
                  <div className="cb-input-with-icon">
                    <MapPin size={16} className="cb-input-icon" />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Full street address" required />
                  </div>
                </div>

                <div className="cb-form-actions">
                  <button type="button" className="cb-btn-secondary" onClick={() => navigate('/branches/bookings')}>Cancel</button>
                  <button type="button" className="cb-btn-primary" onClick={handleNext}>
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="cb-step-content fade-in">
                <h2 className="cb-section-title">Service Requirements</h2>
                <p className="cb-section-subtitle">Select the services needed and assigned branch.</p>
                
                <div className="cb-row">
                  <div className="cb-input-group">
                    <label>Service Category</label>
                    <Select
                      name="serviceCategory"
                      value={formData.serviceCategory}
                      onChange={handleChange}
                      required
                      options={[{
                        label: "Select Category",
                        value: ""
                      }, {
                        label: "Premium Cleaning",
                        value: "cleaning"
                      }, {
                        label: "Maintenance & Repair",
                        value: "maintenance"
                      }, {
                        label: "Security Services",
                        value: "security"
                      }, {
                        label: "Logistics & Delivery",
                        value: "logistics"
                      }]} />
                  </div>
                  <div className="cb-input-group">
                    <label>Specific Service</label>
                    <Select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      options={[{
                        label: "Select Service",
                        value: ""
                      }, {
                        label: "Deep Residential Clean",
                        value: "deep-clean"
                      }, {
                        label: "HVAC Maintenance",
                        value: "hvac"
                      }, {
                        label: "Security Audit",
                        value: "audit"
                      }, {
                        label: "Express Delivery",
                        value: "express"
                      }]} />
                  </div>
                </div>

                <div className="cb-input-group">
                  <label>Assign to Branch</label>
                  <Select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    options={[{
                      label: "Select Branch",
                      value: ""
                    }, {
                      label: "Downtown Hub (Central)",
                      value: "downtown"
                    }, {
                      label: "Riverview North",
                      value: "north"
                    }, {
                      label: "Liberty Peak",
                      value: "west"
                    }]} />
                </div>

                <div className="cb-form-actions">
                  <button type="button" className="cb-btn-secondary" onClick={handlePrev}>Back</button>
                  <button type="button" className="cb-btn-primary" onClick={handleNext}>
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="cb-step-content fade-in">
                <h2 className="cb-section-title">Schedule & Confirm</h2>
                <p className="cb-section-subtitle">Choose the date and time for the service.</p>
                
                <div className="cb-row">
                  <div className="cb-input-group">
                    <label>Preferred Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div className="cb-input-group">
                    <label>Time Slot</label>
                    <Select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      required
                      options={[{
                        label: "Select Time",
                        value: ""
                      }, {
                        label: "09:00 AM - 11:00 AM",
                        value: "09:00"
                      }, {
                        label: "11:00 AM - 01:00 PM",
                        value: "11:00"
                      }, {
                        label: "02:00 PM - 04:00 PM",
                        value: "14:00"
                      }, {
                        label: "04:00 PM - 06:00 PM",
                        value: "16:00"
                      }]} />
                  </div>
                </div>

                <div className="cb-summary-box">
                  <h3>Booking Summary</h3>
                  <div className="cb-summary-item">
                    <span>Customer:</span>
                    <strong>{formData.customerName || 'Not provided'}</strong>
                  </div>
                  <div className="cb-summary-item">
                    <span>Service:</span>
                    <strong>{formData.serviceType ? formData.serviceType.replace('-', ' ').toUpperCase() : 'Not selected'}</strong>
                  </div>
                  <div className="cb-summary-item">
                    <span>Branch:</span>
                    <strong>{formData.branch ? formData.branch.toUpperCase() : 'Not assigned'}</strong>
                  </div>
                </div>

                <div className="cb-form-actions">
                  <button type="button" className="cb-btn-secondary" onClick={handlePrev}>Back</button>
                  <button type="submit" className="cb-btn-success">
                    <CheckCircle2 size={16} style={{ marginRight: '6px' }} /> Confirm & Create
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
