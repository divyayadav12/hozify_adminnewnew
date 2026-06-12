import React, { useState, useMemo } from 'react';
import { AppContext } from '../../hooks/useApp';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../config/routes';
import {
  getStoredSession,
  getPendingRole,
  storePendingRole,
  clearPendingRole,
  storeSession,
  clearSession
} from '../../services/authStorage';

export function AppProvider({ children }) {
  const stored = getStoredSession();
  const [route, setRoute] = useState(() => {
    if (stored?.authenticated && stored?.role) return ROUTES.dashboard;
    return ROUTES.roles;
  });
  const [selectedRole, setSelectedRole] = useState(
    () => getPendingRole() || stored?.role || ''
  );
  const [session, setSession] = useState(stored || { authenticated: false, role: '', user: null });
  const [recovery, setRecovery] = useState({ identifier: '', otpSent: false, otpVerified: false, resetDone: false });
  const [theme, setTheme] = useState('light');
  const [currentPartnerId, setCurrentPartnerId] = useState(null);

  const navigate = (nextRoute) => {
    if (nextRoute === ROUTES.root) {
      setRoute(ROUTES.roles);
      return;
    }
    if (nextRoute === ROUTES.login && !selectedRole) {
      setRoute(ROUTES.roles);
      return;
    }
    if (nextRoute === ROUTES.otpVerification && !recovery.otpSent) {
      setRoute(ROUTES.forgotPassword);
      return;
    }
    if (nextRoute === ROUTES.resetPassword && !recovery.otpVerified) {
      setRoute(ROUTES.forgotPassword);
      return;
    }
    if (nextRoute === ROUTES.passwordResetSuccess && !recovery.resetDone) {
      setRoute(ROUTES.login);
      return;
    }
    if (
      (nextRoute === ROUTES.dashboard ||
       nextRoute === ROUTES.partners ||
       nextRoute === ROUTES.partnerDetails ||
       nextRoute === ROUTES.addPartner ||
       nextRoute === ROUTES.onboardingAddress ||
       nextRoute === ROUTES.addServices ||
       nextRoute === ROUTES.addBanking ||
       nextRoute === ROUTES.approvalQueue ||
       nextRoute === ROUTES.fraudCenter ||
       nextRoute === ROUTES.communications ||
       nextRoute === ROUTES.settlements ||
       nextRoute === ROUTES.analytics ||
       nextRoute === ROUTES.users ||
       nextRoute === ROUTES.kyc ||
       nextRoute === ROUTES.business ||
       nextRoute === ROUTES.branches ||
       nextRoute === ROUTES.services ||
       nextRoute === ROUTES.employees ||
       nextRoute === ROUTES.bookings ||
       nextRoute === ROUTES.liveTracking ||
       nextRoute === ROUTES.materials ||
       nextRoute === ROUTES.quotations ||
       nextRoute === ROUTES.wallet ||
       nextRoute === ROUTES.banking ||
       nextRoute === ROUTES.revenue ||
       nextRoute === ROUTES.referrals ||
       nextRoute === ROUTES.notifications ||
       nextRoute === ROUTES.banners ||
       nextRoute === ROUTES.cms ||
       nextRoute === ROUTES.reviews ||
       nextRoute === ROUTES.sos ||
       nextRoute === ROUTES.support ||
       nextRoute === ROUTES.settings) &&
      (!session.authenticated || !session.role)
    ) {
      setRoute(selectedRole ? ROUTES.login : ROUTES.roles);
      return;
    }


    setRoute(nextRoute);
  };

  const chooseRole = (roleId) => {
    storePendingRole(roleId);
    setSelectedRole(roleId);
    setRoute(ROUTES.login);
  };

  const login = ({ identifier, remember }) => {
    const role = selectedRole;
    let name = 'Admin User';
    let roleLabel = ROLES.find((item) => item.id === role)?.name || 'Admin';
    
    if (role === 'super-admin') {
      name = 'Alex Sterling';
      roleLabel = 'System Administrator';
    } else if (role === 'admin') {
      name = 'Admin Portal';
      roleLabel = 'Internal Access';
    }

    const nextSession = {
      authenticated: true,
      role,
      user: {
        name,
        roleLabel,
        identifier
      }
    };
    clearSession();
    storeSession(nextSession, remember);
    clearPendingRole();
    setSession(nextSession);
    setRoute(ROUTES.dashboard);
  };

  const logout = () => {
    clearSession();
    clearPendingRole();
    setSelectedRole('');
    setSession({ authenticated: false, role: '', user: null });
    setRecovery({ identifier: '', otpSent: false, otpVerified: false, resetDone: false });
    setCurrentPartnerId(null);
    setRoute(ROUTES.roles);
  };

  const value = useMemo(
    () => ({
      route,
      navigate,
      roles: ROLES,
      selectedRole,
      chooseRole,
      session,
      login,
      logout,
      recovery,
      setRecovery,
      theme,
      setTheme,
      currentPartnerId,
      setCurrentPartnerId
    }),
    [route, selectedRole, session, recovery, theme, currentPartnerId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

