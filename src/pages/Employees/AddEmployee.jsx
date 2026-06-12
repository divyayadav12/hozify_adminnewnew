import React, { useState } from 'react';
import { HelpCircle, ChevronRight, User, Briefcase, MapPin, FileText, CheckSquare, Award } from 'lucide-react';

export default function AddEmployee({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      if (onComplete) {
        onComplete({
          name: fullName,
          email,
          phone: `${phonePrefix} ${phoneNumber}`,
          role: 'Field Tech',
          status: 'Pending'
        });
      }
    }
  };

  const stepsList = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'Professional', icon: Briefcase },
    { num: 3, label: 'Branch', icon: MapPin },
    { num: 4, label: 'Documents', icon: FileText },
    { num: 5, label: 'Review', icon: CheckSquare }
  ];

  return (
    <div className="add-employee-flow">
      {/* Back button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: 0 }}
        >
          &larr; Back
        </button>
      </div>

      {/* Page Header */}
      <div className="partners-page-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Add New Employee</h1>
          <p className="page-subtitle">Create a new organizational record by completing the employee onboarding wizard.</p>
        </div>
      </div>

      {/* Progress Path Indicator */}
      <div className="panel" style={{ padding: '24px', background: '#fff', borderRadius: '8px', border: '1px solid var(--line)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          
          {/* Horizontal progress background line */}
          <div style={{ position: 'absolute', top: '20px', left: '40px', right: '40px', height: '2px', background: '#e2e8f0', zIndex: 1 }} />
          
          {/* Active progress indicator line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '40px',
              width: `${((step - 1) / 4) * 100}%`,
              maxWidth: 'calc(100% - 80px)',
              height: '2px',
              background: '#4f46e5',
              transition: 'width 0.3s ease',
              zIndex: 2
            }}
          />

          {stepsList.map((s) => {
            const isCompleted = s.num < step;
            const isActive = s.num === step;
            return (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3, position: 'relative' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#4f46e5' : isCompleted ? '#4f46e5' : '#fff',
                    color: isActive || isCompleted ? '#fff' : 'var(--muted)',
                    border: isActive || isCompleted ? '2px solid #4f46e5' : '2px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {s.num}
                </div>
                <span style={{ fontSize: '12px', fontWeight: isActive || isCompleted ? '700' : '500', color: isActive || isCompleted ? '#4f46e5' : 'var(--muted)', marginTop: '8px' }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main wizard layout: Form on left, guidelines on right */}
      <div className="fraud-top-grid" style={{ gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Left Form Block */}
        <div style={{ flex: 1.8 }}>
          <form onSubmit={handleContinue} className="panel" style={{ padding: '28px', background: '#fff', borderRadius: '8px', border: '1px solid var(--line)' }}>
            
            {step === 1 ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1ecf7' }}>
                  <User size={18} color="#4f46e5" />
                  <h2 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Personal Details</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Johnathan Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{ width: '100%', height: '44px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 14px', outline: 'none', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Country</label>
                      <select
                        style={{ width: '100%', height: '44px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 10px', fontSize: '14px', background: '#fff', fontWeight: '700' }}
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        aria-label="Phone number country code prefix selection"
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (DE)</option>
                        <option value="+91">+91 (IN)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="000-000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        style={{ width: '100%', height: '44px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 14px', outline: 'none', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="john.smith@hozify.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ width: '100%', height: '44px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 14px', outline: 'none', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Date of Birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        style={{ width: '100%', height: '44px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 14px', outline: 'none', fontSize: '14px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>Gender</label>
                      <select
                        style={{ width: '100%', height: '44px', border: '1px solid var(--line)', borderRadius: '6px', padding: '0 10px', fontSize: '14px', background: '#fff', fontWeight: '700' }}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        aria-label="Select Gender"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Award size={48} color="#4f46e5" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px' }}>Step {step}: {stepsList[step-1].label} Details</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', maxWidth: '360px', margin: 0 }}>
                  This step parameters are auto-generated based on standard employee template parameters.
                </p>
              </div>
            )}

            {/* Bottom Form Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f1ecf7' }}>
              <button
                type="button"
                onClick={() => step > 1 ? setStep(step - 1) : onBack()}
                style={{ height: '40px', border: '1px solid var(--line)', background: '#fff', borderRadius: '5px', padding: '0 18px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
              >
                Back
              </button>
              
              <button
                type="submit"
                className="primary-action-btn font-bold"
                style={{ height: '40px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </form>
        </div>

        {/* Right Guidelines Block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Onboarding Guidance info panel */}
          <div className="panel" style={{ padding: '24px', backgroundColor: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#4f46e5' }}>
              <HelpCircle size={18} />
              <h3 style={{ fontSize: '14px', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Onboarding Guidance</h3>
            </div>

            <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '12px', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: '1.4' }}>
              <li>Ensure the email address is unique to the organization to prevent duplicate records.</li>
              <li>Age must be above 18 years as per regional labor compliance laws.</li>
              <li>Double check mobile numbers for SMS authentication during onboarding.</li>
            </ul>
          </div>

          {/* Banner Card */}
          <div className="panel" style={{ overflow: 'hidden', border: '1px solid var(--line)', position: 'relative', minHeight: '200px' }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
              alt="Workspace Excellence background"
              style={{ width: '100%', height: '220px', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', color: '#fff' }}>
              <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Workspace Excellence</strong>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
                Supporting over 5,000+ employees across 20 global branches.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
