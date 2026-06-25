import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Briefcase,
  Bell,
  HelpCircle,
  ChevronRight,
  MessageSquare,
  Globe2,
  Moon,
  Maximize,
  Menu
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { sidebarNavigation } from '../../config/sidebarNavigation';
import { useShell } from './ShellContext';
import GlobalSearch from '../common/GlobalSearch';

export default function GlobalAdminShell({ children }) {
  const { shellProps } = useShell();
  const { session, logout, navigate, route } = useApp();

  // Extract props from Context (set by the page proxies)
  const {
    activeTab = 'Dashboard',
    brandText = 'HOZIFY',
    brandSubText = 'Enterprise Admin',
    headerTitle = '',
    customProfileName = '',
    customProfileRole = '',
    customProfileAvatar = '',
    headerTabs = null,
    sidebarButton = null
  } = shellProps;

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    // Close sidebar on mobile when navigating
    setSidebarOpen(false);
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
    <div className={depth === 1 ? 'sidebar-subnav' : 'sidebar-nested-subnav'} style={{
      animation: 'slideDown 0.25s ease-out',
      transformOrigin: 'top center',
      overflow: 'hidden'
    }}>
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
                  style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}
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
    <main className="dashboard global-dashboard">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 900 }}
        />
      )}

      <aside className={`sidebar global-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
                        style={{ marginLeft: 'auto', transition: 'transform 0.25s' }}
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

        <div className="sidebar-profile">
          <img 
            src={customProfileAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"} 
            alt={userName} 
          />
          <div className="sidebar-profile-info">
            <strong>{userName}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dash-header global-header">
          <div className="header-left-combo" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '20px' }}>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setSidebarOpen(true)}
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}
            >
              <Menu size={24} />
            </button>
            <div style={{ width: '350px', flexShrink: 0 }}>
              <GlobalSearch />
            </div>
            {headerTitle && <span className="header-title-override-label" style={{ fontWeight: '700', fontSize: '16px' }}>{headerTitle}</span>}
            {headerTabs && <div className="header-custom-tabs" style={{ display: 'flex', gap: '20px', alignSelf: 'stretch', alignItems: 'center' }}>{headerTabs}</div>}
          </div>
          <div className="dash-actions">
            
            <button className="header-icon-btn" type="button" title="Language">
              <Globe2 size={20} />
            </button>
            <button className="header-icon-btn" type="button" title="Theme">
              <Moon size={20} />
            </button>
            <button className="header-icon-btn" type="button" title="Fullscreen">
              <Maximize size={20} />
            </button>
            <button className="header-icon-btn" type="button" title="Messages">
              <MessageSquare size={20} />
            </button>
            <button className="header-icon-btn" type="button" title="Notifications">
              <Bell size={20} />
              <span className="badge" />
            </button>

            {(isSuperAdmin || hasCustomAvatar) && (
              <div
                className="header-avatar-wrap"
                onClick={logout}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', marginLeft: '8px' }}
                title="Logout"
              >
                <img
                  className="header-avatar"
                  src={customProfileAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"}
                  alt={userName}
                  style={{ display: 'block', borderRadius: '50%', cursor: 'pointer', width: '38px', height: '38px' }}
                />
              </div>
            )}
          </div>
        </header>
        <div className="dash-content global-content">
          {children}
        </div>
      </section>
    </main>
  );
}
