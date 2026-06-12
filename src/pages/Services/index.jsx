import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import ServicesList from './ServicesList';
import ServiceCategories from './ServiceCategories';
import ZoneAnalysis from './ZoneAnalysis';
import NewServiceWizard from './NewServiceWizard';
import ServiceProfile from './ServiceProfile';
import ApprovalsList from './ApprovalsList';
import ApprovalDetails from './ApprovalDetails';
import ServiceDashboard from './ServiceDashboard';
import PricingStrategy from './PricingStrategy';
import FeaturedManagement from './FeaturedManagement';
import ComparisonHub from './ComparisonHub';
import MediaLibrary from './MediaLibrary';

export default function Services() {
  const [activeTab, setActiveTab] = useState('services'); 
  // 'services' | 'categories' | 'zones' | 'dashboard' | 'pricing' | 'profile' | 'approvals' | 'approval-details' | 'wizard'
  
  const [wizardFromTab, setWizardFromTab] = useState('services');
  const [selectedApprovalId, setSelectedApprovalId] = useState(null);

  const openWizard = (fromTab = 'services') => {
    setWizardFromTab(fromTab);
    setActiveTab('wizard');
  };

  const closeWizard = () => {
    setActiveTab(wizardFromTab);
  };

  const showCatalog = () => {
    setActiveTab('services');
  };

  const showProfile = () => {
    setActiveTab('profile');
  };

  const showApprovalsList = () => {
    setActiveTab('approvals');
  };

  const showApprovalDetails = (id) => {
    setSelectedApprovalId(id);
    setActiveTab('approval-details');
  };

  // 1. Wizard View (renders full-screen inside AdminShell)
  if (activeTab === 'wizard') {
    return (
      <AdminShell activeTab="Services" headerTitle="Service Catalog" searchPlaceholder="Search catalog...">
        <NewServiceWizard onClose={closeWizard} />
      </AdminShell>
    );
  }

  // 2. Service Profile sub-view
  if (activeTab === 'profile') {
    return (
      <AdminShell activeTab="Services" headerTitle="Service Catalog" searchPlaceholder="Search profile details...">
        <ServiceProfile onClose={showCatalog} />
      </AdminShell>
    );
  }

  // 3. Approvals Queue sub-view
  if (activeTab === 'approvals') {
    return (
      <AdminShell activeTab="Services" headerTitle="Service Catalog" searchPlaceholder="Search approval requests...">
        <ApprovalsList onViewDetails={showApprovalDetails} onClose={showCatalog} />
      </AdminShell>
    );
  }

  // 4. Approval Details sub-view
  if (activeTab === 'approval-details') {
    return (
      <AdminShell activeTab="Services" headerTitle="Service Catalog" searchPlaceholder="Search specs, risk score...">
        <ApprovalDetails requestId={selectedApprovalId} onBack={showApprovalsList} />
      </AdminShell>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <ServicesList
            onAddService={() => openWizard('services')}
            onViewProfile={showProfile}
            onViewApprovals={showApprovalsList}
          />
        );
      case 'categories':
        return <ServiceCategories onAddCategory={() => openWizard('categories')} />;
      case 'zones':
        return <ZoneAnalysis />;
      case 'dashboard':
        return <ServiceDashboard />;
      case 'pricing':
        return <PricingStrategy />;
      case 'featured':
        return <FeaturedManagement />;
      case 'comparison':
        return <ComparisonHub />;
      case 'media':
        return <MediaLibrary />;
      default:
        return (
          <ServicesList
            onAddService={() => openWizard('services')}
            onViewProfile={showProfile}
            onViewApprovals={showApprovalsList}
          />
        );
    }
  };

  return (
    <AdminShell
      activeTab="Services"
      headerTitle="Service Catalog"
      searchPlaceholder={
        activeTab === 'categories'
          ? 'Search categories...'
          : activeTab === 'zones'
          ? 'Search service areas...'
          : activeTab === 'dashboard'
          ? 'Search performance charts...'
          : activeTab === 'pricing'
          ? 'Search pricing rules...'
          : activeTab === 'featured'
          ? 'Search service registry...'
          : activeTab === 'comparison'
          ? 'Search comparison metrics...'
          : activeTab === 'media'
          ? 'Search service assets...'
          : 'Search services...'
      }
    >
      {/* Sub-tab Selection Header */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          borderBottom: '1px solid var(--line)',
          marginBottom: '24px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {[
          { id: 'services', label: 'Services Catalog' },
          { id: 'categories', label: 'Service Categories' },
          { id: 'zones', label: 'GIS Zone Analysis' },
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'pricing', label: 'Pricing Strategy' },
          { id: 'featured', label: 'Featured Clusters' },
          { id: 'comparison', label: 'Comparison Hub' },
          { id: 'media', label: 'Media Library' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #25108f' : '2px solid transparent',
              color: activeTab === tab.id ? '#25108f' : 'var(--muted)',
              fontWeight: '700',
              fontSize: '13px',
              padding: '10px 4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginRight: '8px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Renders Selected Sub-View Component */}
      {renderContent()}
    </AdminShell>
  );
}
