import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Briefcase,
  Bell,
  HelpCircle,
  Search,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { sidebarNavigation } from '../../config/sidebarNavigation';

export default function AdminShell({
  children,
  activeTab = 'Dashboard',
  searchPlaceholder = 'Global search...',
  searchValue = '',
  onSearchChange = () => {},
  brandText = 'HOZIFY',
  brandSubText = 'Enterprise Admin',
  headerTitle = '',
  showGridIcon = false,
  customProfileName = '',
  customProfileRole = '',
  customProfileAvatar = '',
  headerTabs = null,
  sidebarButton = null
}) {
  const { session, logout, navigate, route } = useApp();
  const activeNavModules = sidebarNavigation;
  
  const userName = customProfileName || session?.user?.name || 'Alex Sterling';
  const roleLabel = customProfileRole || session?.user?.roleLabel || 'System Administrator';
  const role = session?.role || 'super-admin';

  const isSuperAdmin = role === 'super-admin';
  const hasCustomAvatar = !!customProfileAvatar;

  // Sync expanded module on load or when route changes
  const [openModule, setOpenModule] = useState(() => {
    const activeModule = activeNavModules.find(m => 
      m.route === route ||
      m.label === activeTab || 
      hasRoute(m, route)
    );
    return activeModule ? activeModule.label : null;
  });
  const [openSubModules, setOpenSubModules] = useState({});

  useEffect(() => {
    const activeModule = activeNavModules.find(m => 
      m.route === route ||
      hasRoute(m, route)
    );
    if (activeModule) {
      setOpenModule(activeModule.label);
      setOpenSubModules((current) => ({
        ...current,
        ...getActiveGroupKeys(activeModule.children, route, activeModule.label)
      }));
    }
  }, [route]);

  const handleNavClick = (targetRoute) => {
    if (targetRoute && targetRoute !== '#') {
      navigate(targetRoute);
    }
  };

  const handleModuleClick = (module) => {
    if (module.route) {
      setOpenModule(module.label);
      navigate(module.route);
      return;
    }

    setOpenModule(prev => prev === module.label ? null : module.label);
  };

  const isParentActive = (module) => {
    if (module.label === activeTab) return true;
    if (module.route === route) return true;
    return hasRoute(module, route) || module.children?.some(c => c.label === activeTab);
  };

  function hasRoute(item, currentRoute) {
    if (!item) return false;
    if (item.route === currentRoute) return true;
    return item.children?.some((child) => hasRoute(child, currentRoute)) || false;
  }

  function getActiveGroupKeys(items = [], currentRoute, prefix) {
    return items.reduce((acc, item) => {
      const itemKey = `${prefix}::${item.label}`;
      if (item.children?.length && hasRoute(item, currentRoute)) {
        acc[itemKey] = true;
        Object.assign(acc, getActiveGroupKeys(item.children, currentRoute, itemKey));
      }
      return acc;
    }, {});
  }

  const toggleSubModule = (key) => {
    setOpenSubModules((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  const renderNavChildren = (items, parentKey, depth = 1) => (
    <div className={depth === 1 ? 'sidebar-subnav' : 'sidebar-nested-subnav'}>
      {items.map((child) => {
        const childKey = `${parentKey}::${child.label}`;
        const hasChildren = !!child.children?.length;
        const isChildActive = child.route === route || hasRoute(child, route);
        const isOpen = !!openSubModules[childKey] || isChildActive;

        if (hasChildren) {
          return (
            <div key={childKey}>
              <button
                type="button"
                className={`sidebar-subnav-btn sidebar-group-btn ${isChildActive ? 'active-sub' : ''}`}
                onClick={() => toggleSubModule(childKey)}
              >
                <span>{child.label}</span>
                <ChevronRight
                  size={13}
                  className={`sidebar-chevron ${isOpen ? 'open' : ''}`}
                  style={{ marginLeft: 'auto' }}
                />
              </button>
              {isOpen && renderNavChildren(child.children, childKey, depth + 1)}
            </div>
          );
        }

        return (
          <button
            key={childKey}
            type="button"
            className={`sidebar-subnav-btn ${isChildActive ? 'active-sub' : ''}`}
            onClick={() => handleNavClick(child.route)}
          >
            <span>{child.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <main className="dashboard">
      {/* Dynamic styles injected directly to ensure a premium look for accordion and micro-animations */}
      <style>{`
        .sidebar-chevron {
          transition: transform 0.2s ease;
          color: #7a7688;
        }
        .sidebar-chevron.open {
          transform: rotate(90deg);
          color: var(--primary);
        }
        .sidebar-subnav {
          display: flex;
          flex-direction: column;
          background: rgba(37, 16, 143, 0.015);
          border-left: 1.5px solid rgba(37, 16, 143, 0.1);
          margin-left: 28px;
          margin-right: 12px;
          margin-top: 2px;
          margin-bottom: 6px;
          padding-left: 4px;
        }
        .sidebar-subnav-btn {
          height: 34px !important;
          padding: 0 16px !important;
          font-size: 13px !important;
          color: #565365 !important;
          background: transparent !important;
          border-left: 2px solid transparent !important;
          text-align: left;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          border-radius: 0 4px 4px 0;
        }
        .sidebar-subnav-btn:hover {
          background: #e9e2f6 !important;
          color: var(--primary) !important;
        }
        .sidebar-subnav-btn.active-sub {
          background: rgba(37, 16, 143, 0.05) !important;
          color: var(--primary) !important;
          border-left-color: var(--primary) !important;
          font-weight: 700 !important;
        }
        .sidebar-nested-subnav {
          display: flex;
          flex-direction: column;
          margin-left: 12px;
          border-left: 1px solid rgba(37, 16, 143, 0.08);
        }
        .sidebar-group-btn {
          font-weight: 800 !important;
          color: #403b55 !important;
        }
        .sidebar-module-btn {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
        }
      `}</style>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Briefcase size={20} />
          </div>
          <div className="sidebar-brand-text">
            <strong>{brandText}</strong>
            <span>{brandSubText}</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {activeNavModules.map((item) => {
              const Icon = item.icon;
              const activeParent = isParentActive(item);
              const isExpanded = openModule === item.label;

              return (
                <div key={item.label}>
                  <button
                    className={`sidebar-module-btn ${activeParent ? 'active' : ''}`}
                    type="button"
                    onClick={() => handleModuleClick(item)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {item.children && (
                      <ChevronRight 
                        size={15} 
                        className={`sidebar-chevron ${isExpanded ? 'open' : ''}`}
                        style={{ marginLeft: 'auto' }}
                      />
                    )}
                  </button>
                  {isExpanded && item.children && renderNavChildren(item.children, item.label)}
                </div>
              );
            })}
        </nav>

        {sidebarButton && (
          <div style={{ padding: '0 16px 16px' }}>
            {sidebarButton}
          </div>
        )}

      </aside>

      <section className="dashboard-main">
        <header className="dash-header">
          <div className="header-left-combo">
            {headerTitle && <span className="header-title-override-label">{headerTitle}</span>}
            <div className="dash-search">
              <Search size={18} />
              <input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            {headerTabs && <div className="header-custom-tabs" style={{ display: 'flex', gap: '20px', marginLeft: '24px', alignSelf: 'stretch', alignItems: 'center' }}>{headerTabs}</div>}
          </div>
          <div className="dash-actions">
            <button className="support-header-btn" type="button">
              <HelpCircle size={18} />
              <span>Support</span>
            </button>
            
            <button className="notification-btn" type="button">
              <Bell size={20} />
              <span className="dot" />
            </button>

            {showGridIcon && (
              <button className="grid-header-btn" type="button" aria-label="Apps">
                <LayoutGrid size={18} />
              </button>
            )}

            {(isSuperAdmin || hasCustomAvatar) && (
              <div
                className="header-avatar-wrap"
                onClick={logout}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s', display: 'flex', alignItems: 'center' }}
                title="Logout"
              >
                <img
                  className="header-avatar"
                  src={customProfileAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"}
                  alt={userName}
                  style={{ display: 'block', borderRadius: '8px', cursor: 'pointer' }}
                />
              </div>
            )}
          </div>
        </header>
        <div className="dash-content">
          {children}
        </div>
      </section>
    </main>
  );
}
