import React, { useState, useEffect } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import BranchPerformance from './BranchPerformance';
import BranchApproval from './BranchApproval';
import BranchAnalytics from './BranchAnalytics';
import BranchCompliance from './BranchCompliance';
import BranchInventory from './BranchInventory';

export default function Branches({ defaultTab }) {
  const { route, navigate } = useApp();

  const getTabFromRouteOrProp = () => {
    if (defaultTab) return defaultTab;
    if (route === ROUTES.branchPerformance) return 'Performance';
    if (route === ROUTES.branchApproval) return 'ApprovalQueue';
    if (route === ROUTES.branchAnalytics) return 'Analytics';
    if (route === ROUTES.branchCompliance) return 'Compliance';
    return 'Directory'; // Default tab
  };

  const [activeTab, setActiveTab] = useState(getTabFromRouteOrProp);

  // Sync tab state when route or prop updates
  useEffect(() => {
    setActiveTab(getTabFromRouteOrProp());
  }, [route, defaultTab]);

  const handleTabClick = (e, tabId) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents layout hierarchy locks
    setActiveTab(tabId);
    
    if (tabId === 'Directory') {
      navigate(ROUTES.branches);
    } else if (tabId === 'Performance') {
      navigate(ROUTES.branchPerformance);
    } else if (tabId === 'ApprovalQueue') {
      navigate(ROUTES.branchApproval);
    } else if (tabId === 'Analytics') {
      navigate(ROUTES.branchAnalytics);
    } else if (tabId === 'Compliance') {
      navigate(ROUTES.branchCompliance);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Directory':
        return <BranchInventory />;
      case 'Performance':
        return <BranchPerformance />;
      case 'ApprovalQueue':
        return <BranchApproval />;
      case 'Analytics':
        return <BranchAnalytics />;
      case 'Compliance':
        return <BranchCompliance />;
      default:
        return <BranchInventory />;
    }
  };

  return (
    <AdminShell
      activeTab="Branches"
      headerTitle="Branch Manager"
      searchPlaceholder="Search in branch suite..."
    >
      {/* Global CSS Overrides to fix pointer events and layout blocking */}
      <style>{`
        /* 1. Force Enable Click Action Pointers on all buttons and layout interactive tags */
        .primary-action-btn, 
        .secondary-action-btn, 
        .partners-header-buttons button,
        .excel-style-table button,
        .partner-table button,
        table button,
        .pagination-wrap button,
        .directory-table-footer button {
          cursor: pointer !important;
          pointer-events: auto !important; /* Forces layout to receive clicks */
          position: relative;
          z-index: 10 !important; /* Keeps buttons above grid layout backgrounds */
        }

        /* 2. Dark Blue Outline for Cards */
        .kpi-card, .branch-kpi-card, .card {
          border: 1.5px solid #1e3a8a !important; 
          box-shadow: 0 1px 3px rgba(30, 58, 138, 0.1) !important;
          border-radius: 6px !important;
        }

        /* 3. Excel Spreadsheet View Formatting rules for nested tables */
        .partner-table, .excel-style-table, table {
          width: 100% !important;
          border-collapse: collapse !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: 13px !important;
        }
        
        .partner-table th, .excel-style-table th, table th {
          background-color: #f3f4f6 !important;
          color: #374151 !important;
          font-weight: 600 !important;
          text-align: left !important;
          padding: 10px 12px !important;
          border: 1px solid #d1d5db !important;
          text-transform: uppercase !important;
          font-size: 11px !important;
        }

        .partner-table td, .excel-style-table td, table td {
          padding: 10px 12px !important;
          border: 1px solid #e5e7eb !important;
          color: #4b5563 !important;
          vertical-align: middle !important;
        }

        .partner-table tbody tr:nth-child(even), table tbody tr:nth-child(even) {
          background-color: #f9fafb !important;
        }

        .partner-table tbody tr:hover, table tbody tr:hover {
          background-color: #f0fdf4 !important; 
        }

        .table-wrap {
          border: 1px solid #d1d5db !important;
          border-radius: 4px !important;
          overflow: hidden !important;
        }
      `}</style>

      {/* Sub-tab selection bar */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--line)', marginBottom: '24px', overflowX: 'auto', whiteSpace: 'nowrap', position: 'relative', zIndex: 20 }}>
        {[
          { id: 'Directory', label: 'Directory' },
          { id: 'Performance', label: 'Performance Overview' },
          { id: 'ApprovalQueue', label: 'Approval Queue' },
          { id: 'Analytics', label: 'Revenue Analytics' },
          { id: 'Compliance', label: 'Compliance Center' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={(e) => handleTabClick(e, tab.id)}
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === tab.id ? '#4f46e5' : 'var(--muted)',
              fontWeight: '700',
              fontSize: '13px',
              padding: '10px 4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginRight: '8px',
              pointerEvents: 'auto'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render sub-view component */}
      <div className="sub-view-wrapper" style={{ position: 'relative', zIndex: 5 }}>
        {renderContent()}
      </div>
    </AdminShell>
  );
}