import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

export default function AddBranch() {
  const { navigate } = useApp();
  const [activeStep, setActiveStep] = useState(1);
  const [branchName, setBranchName] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [parentEntity, setParentEntity] = useState('');
  const [manager, setManager] = useState('');

  const steps = [
    { id: 1, label: 'Basic Information', desc: 'Identity, code and managerial assignment' },
    { id: 2, label: 'Location & GIS', desc: 'Physical address and geo-coordinates' },
    { id: 3, label: 'Service Portfolio', desc: 'Define operational categories' },
    { id: 4, label: 'Working Hours', desc: 'Shift timings and holiday calendar' },
    { id: 5, label: 'Document Uploads', desc: 'Legal and compliance certification' }
  ];

  const handleNextSubmit = (e) => {
    e.preventDefault();
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    } else {
      alert('Branch Operational Unit has been successfully registered!');
      navigate(ROUTES.branches);
    }
  };

  return (
    <AdminShell
      activeTab="Branches"
      headerTitle="Branch Manager"
      searchPlaceholder="Search in branch suite..."
    >
      <div className="add-branch-wrapper">
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.branches)}>Dashboard</span>
          <span>/</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.branches)}>Branches</span>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: '700' }}>New Branch</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <h1 className="page-title" style={{ margin: 0 }}>Establish New Operational Unit</h1>
          <p className="page-subtitle" style={{ marginTop: '4px' }}>Complete the 5-step registration process to activate a new branch within the system.</p>
        </div>

        {/* Wizard Layout */}
        <div className="fraud-top-grid" style={{ gap: '24px', alignItems: 'stretch' }}>
          
          {/* Left Tracker column */}
          <div className="panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((st) => (
              <div key={st.id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', opacity: activeStep === st.id ? 1 : 0.6 }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: activeStep === st.id ? '#4f46e5' : '#fff',
                    color: activeStep === st.id ? '#fff' : 'var(--muted)',
                    border: activeStep === st.id ? 'none' : '2px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '800'
                  }}
                >
                  {st.id}
                </span>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>
                    STEP 0{st.id}
                  </strong>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--text)', fontWeight: '800', marginTop: '2px' }}>
                    {st.label}
                  </span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', fontWeight: 'normal', marginTop: '1px' }}>
                    {st.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Form column */}
          <div className="panel" style={{ flex: 2, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <form onSubmit={handleNextSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {activeStep === 1 ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="branch-name-input" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Branch Name</label>
                      <input
                        type="text"
                        id="branch-name-input"
                        placeholder="e.g. Downtown Central Hub"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        style={{ height: '38px', border: '1px solid var(--line)', padding: '0 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="branch-code-input" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Unique Branch Code</label>
                      <input
                        type="text"
                        id="branch-code-input"
                        placeholder="BR-XXXX"
                        value={branchCode}
                        onChange={(e) => setBranchCode(e.target.value)}
                        style={{ height: '38px', border: '1px solid var(--line)', padding: '0 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="parent-entity-input" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Parent Business Entity</label>
                      <select
                        id="parent-entity-input"
                        value={parentEntity}
                        onChange={(e) => setParentEntity(e.target.value)}
                        style={{ height: '38px', border: '1px solid var(--line)', padding: '0 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', outline: 'none', background: '#fff' }}
                        required
                      >
                        <option value="">Select Business</option>
                        <option value="vanguard">Vanguard Logistics</option>
                        <option value="apex">Apex Distribution</option>
                        <option value="metro">Metro Real Estate</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="assigned-manager-input" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Assigned Branch Manager</label>
                      <input
                        type="text"
                        id="assigned-manager-input"
                        placeholder="Search employee..."
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                        onClick={() => navigate(ROUTES.branchManagerAssignment)}
                        style={{ height: '38px', border: '1px solid var(--line)', padding: '0 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', outline: 'none', cursor: 'pointer' }}
                        readOnly
                        required
                      />
                    </div>
                  </div>

                  {/* Tip panel */}
                  <div style={{ border: '1px solid #e0e7ff', background: '#eff6ff', padding: '12px 14px', borderRadius: '6px', display: 'flex', gap: '10px', color: '#1e40af' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>i</span>
                    <span style={{ fontSize: '11px', lineHeight: '1.4', fontWeight: '700' }}>
                      Administrative Tip: Branch codes must be unique and follow the internal naming convention [REGION]-[CITY]-[ID].
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '800' }}>Step {activeStep} Config</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Configure location geo-bounds, category mappings, work timing policies, and upload certificates.</p>
                </div>
              )}

              {/* Action row */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '20px' }}>
                {activeStep > 1 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    type="button"
                    style={{ border: 'none', background: 'transparent', color: 'var(--muted)', fontWeight: '800', fontSize: '13px', cursor: 'pointer', padding: '0 12px' }}
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="primary-action-btn font-bold"
                  style={{ height: '38px' }}
                >
                  <span>{activeStep === 5 ? 'Finish Registration' : 'Save & Continue →'}</span>
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}
