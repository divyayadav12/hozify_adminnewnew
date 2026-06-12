import React, { useState } from 'react';
import {
  Lock,
  Building,
  Wrench,
  ShieldAlert,
  Truck,
  Sparkles,
  Plus,
  Search,
  Crosshair,
  ArrowLeft,
  ArrowRight,
  Save,
  X,
  MapPin
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

export default function AddServices() {
  const { navigate } = useApp();
  const [selectedCategories, setSelectedCategories] = useState(['facility', 'surveillance']);
  const [subcategories, setSubcategories] = useState([
    'HVAC Maintenance',
    'Access Control Systems',
    'Perimeter Fencing',
    'Remote Monitoring'
  ]);
  const [searchVal, setSearchVal] = useState('');

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

  const handleBack = () => {
    navigate(ROUTES.onboardingAddress);
  };

  const handleNext = () => {
    navigate(ROUTES.addBanking);
  };

  const handleSaveDraft = () => {
    navigate(ROUTES.partners);
  };

  return (
    <AdminShell activeTab="Partners" searchPlaceholder="Search partners or transactions...">
      {/* Breadcrumb Row with Secure Entry Button */}
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

      {/* Page Heading */}
      <div className="registration-heading">
        <h1>Add New Partner</h1>
        <p>Configure service offerings and operational reach.</p>
      </div>

      {/* Stepper Progress Indicator (5-step, step 4 active) */}
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

      {/* Form Columns */}
      <div className="services-page-columns">
        
        {/* Left Column - Service Types & Subcategories */}
        <div className="services-left-column">
          
          {/* Card 1: Service Categories */}
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

          {/* Card 2: Subcategories */}
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

        {/* Right Column - Service Areas Radar Map */}
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

            {/* Radar map SVG visualization area */}
            <div className="radar-map-container">
              <svg className="radar-map-svg" viewBox="0 0 400 300" width="100%" height="220">
                {/* Background Grid Map Network */}
                <rect width="400" height="300" fill="#040914" />
                <circle cx="200" cy="150" r="130" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="150" r="90" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="150" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                
                <line x1="200" y1="20" x2="200" y2="280" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="50" y1="150" x2="350" y2="150" stroke="#0f172a" strokeWidth="1.5" />

                {/* Cyberpunk Map Roads/Paths */}
                <path d="M40 80 Q 200 40 360 80 T 200 280 Z" fill="none" stroke="#0f172a" strokeWidth="1" />
                <path d="M80 200 C 120 120, 280 120, 320 200" fill="none" stroke="#0f172a" strokeWidth="1" />
                
                {/* Sector A Blue Pulse Area */}
                <circle className="radar-pulse-wave" cx="160" cy="120" r="30" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="160" cy="120" r="3" fill="#38bdf8" />

                {/* Sector B Blue Pulse Area */}
                <circle className="radar-pulse-wave" cx="240" cy="170" r="20" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="240" cy="170" r="3" fill="#38bdf8" />
              </svg>
              
              {/* Zoom Buttons Controls */}
              <div className="map-zoom-controls">
                <button type="button">+</button>
                <button type="button">-</button>
              </div>

              {/* Redraw boundaries button */}
              <button className="btn-redraw-boundaries" type="button">
                <MapPin size={12} />
                <span>Redraw Boundaries</span>
              </button>
            </div>

            {/* Active Zones List */}
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

      {/* Footer Nav Controls */}
      <div className="form-divider-horizontal" />

      <div className="form-buttons-row">
        <button className="btn-draft-save" type="button" onClick={handleBack}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <div className="form-right-actions">
          <button className="btn-draft-save icon-right" type="button" onClick={handleSaveDraft}>
            <Save size={16} />
            <span>Save Draft</span>
          </button>
          <button className="btn-form-submit" type="button" onClick={handleNext}>
            <span>Continue to Review</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
