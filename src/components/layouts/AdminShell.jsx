import React from 'react';
import {
  LayoutGrid,
  Users,
  Handshake,
  ShieldCheck,
  Briefcase,
  Network,
  Shapes,
  Contact,
  CalendarCheck,
  Compass,
  Inbox,
  FileText,
  Wallet,
  Landmark,
  Banknote,
  Bell,
  MousePointerClick,
  ClipboardList,
  Star,
  Activity,
  HelpCircle,
  UserCheck,
  Settings,
  Search,
  Map,
  LogOut,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

const navItems = [
  { label: 'Dashboard', route: ROUTES.dashboard, icon: LayoutGrid },
  { label: 'Users', route: ROUTES.users, icon: Users },
  { label: 'Partners', route: ROUTES.partners, icon: Handshake },
  { label: 'KYC', route: ROUTES.kyc, icon: ShieldCheck },
  { label: 'Business', route: ROUTES.business, icon: Briefcase },
  { label: 'Analytics', route: ROUTES.analytics, icon: BarChart3 },
  { label: 'Branches', route: ROUTES.branches, icon: Network },
  { label: 'Service Areas', route: ROUTES.serviceAreas, icon: Map },
  { label: 'Services', route: ROUTES.services, icon: Shapes },
  { label: 'Employees', route: ROUTES.employees, icon: Contact },
  { label: 'Bookings', route: ROUTES.bookings, icon: CalendarCheck },
  { label: 'Live Tracking', route: ROUTES.liveTracking, icon: Compass },
  { label: 'Materials', route: ROUTES.materials, icon: Inbox },
  { label: 'Quotations', route: ROUTES.quotations, icon: FileText },
  { label: 'Wallet', route: ROUTES.wallet, icon: Wallet },
  { label: 'Banking', route: ROUTES.banking, icon: Landmark },
  { label: 'Revenue', route: ROUTES.revenue, icon: Banknote },
  { label: 'Referrals', route: ROUTES.referrals, icon: Network },
  { label: 'Communications', route: ROUTES.communications, icon: MessageSquare },
  { label: 'Banners', route: ROUTES.banners, icon: MousePointerClick },
  { label: 'CMS', route: ROUTES.cms, icon: ClipboardList },
  { label: 'Reviews', route: ROUTES.reviews, icon: Star },
  { label: 'SOS', route: ROUTES.sos, icon: Activity },
  { label: 'Support', route: ROUTES.support, icon: HelpCircle }
];

const bottomNavItems = [
  { label: 'Roles', route: ROUTES.roles, icon: UserCheck },
  { label: 'Settings', route: ROUTES.settings, icon: Settings }
];

export default function AdminShell({
  children,
  activeTab = 'Dashboard',
  searchPlaceholder = 'Global search...',
  searchValue = '',
  onSearchChange = () => {},
  brandText = 'HOZIFY',
  brandSubText = 'Enterprise Admin',
  navItemsOverride = null,
  headerTitle = '',
  showGridIcon = false,
  customProfileName = '',
  customProfileRole = '',
  customProfileAvatar = '',
  headerTabs = null
}) {
  const { session, logout, navigate } = useApp();
  
  const userName = customProfileName || session?.user?.name || 'Alex Sterling';
  const roleLabel = customProfileRole || session?.user?.roleLabel || 'System Administrator';
  const role = session?.role || 'super-admin';

  const isSuperAdmin = role === 'super-admin';
  const hasCustomAvatar = !!customProfileAvatar;

  const handleNavClick = (route) => {
    if (route && route !== '#') {
      navigate(route);
    }
  };

  return (
    <main className="dashboard">
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
          {(navItemsOverride || navItems).map((item) => {
            const Icon = item.icon;
            // Highlight "Partners" if we are on any subpage under partners
            const isItemActive = 
              (item.label === 'Partners' && (
                activeTab === 'Partners' || 
                activeTab === 'PartnerDetails' || 
                activeTab === 'RegisterPartner' || 
                activeTab === 'ApprovalQueue'
              )) ||
              (item.label === 'Business' && (
                activeTab === 'Business' || 
                activeTab === 'BusinessApproval' || 
                activeTab === 'BusinessDetails' || 
                activeTab === 'BusinessReview' || 
                activeTab === 'BusinessVerify' || 
                activeTab === 'BusinessSuspension' ||
                activeTab === 'BusinessRisk' ||
                activeTab === 'AddBusiness' ||
                activeTab === 'BusinessDocReview' ||
                activeTab === 'BusinessTaxonomy'
              )) ||
              (item.label === activeTab);

            return (
              <button
                className={isItemActive ? 'active' : ''}
                type="button"
                key={item.label}
                onClick={() => handleNavClick(item.route)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = item.label === activeTab;
            return (
              <button
                className={isItemActive ? 'active' : ''}
                type="button"
                key={item.label}
                onClick={() => handleNavClick(item.route)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
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

