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
  const [routeHistory, setRouteHistory] = useState([route]);
  
  const [selectedRole, setSelectedRole] = useState(
    () => getPendingRole() || stored?.role || ''
  );
  const [session, setSession] = useState(stored || { authenticated: false, role: '', user: null });
  const [recovery, setRecovery] = useState({ identifier: '', otpSent: false, otpVerified: false, resetDone: false });
  const [theme, setTheme] = useState('light');
  const [currentPartnerId, setCurrentPartnerId] = useState(null);
  const [currentBranchId, setCurrentBranchId] = useState('BR-90210');
  const [selectedRequestId, setSelectedRequestId] = useState('REQ-2024-0892');

  const goBack = () => {
    if (routeHistory.length > 1) {
      const newHistory = [...routeHistory];
      newHistory.pop(); // remove current route
      const prevRoute = newHistory[newHistory.length - 1];
      setRouteHistory(newHistory);
      setRoute(prevRoute);
    } else {
      setRoute(ROUTES.dashboard);
    }
  };

  const navigate = (nextRoute) => {
    let resolvedRoute = nextRoute;
    if (nextRoute === ROUTES.root) {
      resolvedRoute = ROUTES.roles;
    } else if (nextRoute === ROUTES.login && !selectedRole) {
      resolvedRoute = ROUTES.roles;
    } else if (nextRoute === ROUTES.otpVerification && !recovery.otpSent) {
      resolvedRoute = ROUTES.forgotPassword;
    } else if (nextRoute === ROUTES.resetPassword && !recovery.otpVerified) {
      resolvedRoute = ROUTES.forgotPassword;
    } else if (nextRoute === ROUTES.passwordResetSuccess && !recovery.resetDone) {
      resolvedRoute = ROUTES.login;
    } else {
      const publicRoutes = [
        ROUTES.root,
        ROUTES.roles,
        ROUTES.login,
        ROUTES.forgotPassword,
        ROUTES.otpVerification,
        ROUTES.resetPassword,
        ROUTES.passwordResetSuccess
      ];
      if (!publicRoutes.includes(nextRoute) && (!session.authenticated || !session.role)) {
        resolvedRoute = selectedRole ? ROUTES.login : ROUTES.roles;
      }
    }

    setRoute(resolvedRoute);
    setRouteHistory(prev => {
      if (prev[prev.length - 1] === resolvedRoute) return prev;
      return [...prev, resolvedRoute];
    });
  };

  const chooseRole = (roleId) => {
    storePendingRole(roleId);
    setSelectedRole(roleId);
    setRouteHistory(prev => [...prev, ROUTES.login]);
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
    setRouteHistory([ROUTES.dashboard]);
    setRoute(ROUTES.dashboard);
  };

  const logout = () => {
    clearSession();
    clearPendingRole();
    setSelectedRole('');
    setSession({ authenticated: false, role: '', user: null });
    setRecovery({ identifier: '', otpSent: false, otpVerified: false, resetDone: false });
    setCurrentPartnerId(null);
    setRouteHistory([ROUTES.roles]);
    setRoute(ROUTES.roles);
  };

  const value = useMemo(
    () => ({
      route,
      navigate,
      goBack,
      canGoBack: routeHistory.length > 1,
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
      setCurrentPartnerId,
      currentBranchId,
      setCurrentBranchId,
      selectedRequestId,
      setSelectedRequestId
    }),
    [route, routeHistory, selectedRole, session, recovery, theme, currentPartnerId, currentBranchId, selectedRequestId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

