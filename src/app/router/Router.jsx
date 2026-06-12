import React from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import RoleSelection from '../../pages/RoleSelection';
import Login from '../../pages/Login';
import ForgotPassword from '../../pages/ForgotPassword';
import OtpVerification from '../../pages/OtpVerification';
import ResetPassword from '../../pages/ResetPassword';
import PasswordResetSuccess from '../../pages/PasswordResetSuccess';
import Dashboard from '../../pages/Dashboard';
import Partners from '../../pages/Partners';
import PartnerDetails from '../../pages/PartnerDetails';
import RegisterPartner from '../../pages/RegisterPartner';
import OnboardingAddress from '../../pages/OnboardingAddress';
import AddServices from '../../pages/AddServices';
import AddBanking from '../../pages/AddBanking';
import ApprovalQueue from '../../pages/ApprovalQueue';
import FraudCenter from '../../pages/FraudCenter';
import CommunicationsCenter from '../../pages/CommunicationsCenter';
import Settlements from '../../pages/Settlements';
import Analytics from '../../pages/Analytics';
import Users from '../../pages/Users';
import Placeholder from '../../pages/Placeholder';

export function Router() {
  const { route } = useApp();
  switch (route) {
    case ROUTES.roles:
      return <RoleSelection />;
    case ROUTES.login:
      return <Login />;
    case ROUTES.forgotPassword:
      return <ForgotPassword />;
    case ROUTES.otpVerification:
      return <OtpVerification />;
    case ROUTES.resetPassword:
      return <ResetPassword />;
    case ROUTES.passwordResetSuccess:
      return <PasswordResetSuccess />;
    case ROUTES.dashboard:
      return <Dashboard />;
    case ROUTES.partners:
      return <Partners />;
    case ROUTES.partnerDetails:
      return <PartnerDetails />;
    case ROUTES.addPartner:
      return <RegisterPartner />;
    case ROUTES.onboardingAddress:
      return <OnboardingAddress />;
    case ROUTES.addServices:
      return <AddServices />;
    case ROUTES.addBanking:
      return <AddBanking />;
    case ROUTES.approvalQueue:
      return <ApprovalQueue />;
    case ROUTES.fraudCenter:
      return <FraudCenter />;
    case ROUTES.communications:
      return <CommunicationsCenter />;
    case ROUTES.settlements:
      return <Settlements />;
    case ROUTES.analytics:
      return <Analytics />;
    case ROUTES.users:
      return <Users />;
    case ROUTES.kyc:
      return <Placeholder title="KYC" activeTab="KYC" />;
    case ROUTES.business:
      return <Placeholder title="Business" activeTab="Business" />;
    case ROUTES.branches:
      return <Placeholder title="Branches" activeTab="Branches" />;
    case ROUTES.services:
      return <Placeholder title="Services" activeTab="Services" />;
    case ROUTES.employees:
      return <Placeholder title="Employees" activeTab="Employees" />;
    case ROUTES.bookings:
      return <Placeholder title="Bookings" activeTab="Bookings" />;
    case ROUTES.liveTracking:
      return <Placeholder title="Live Tracking" activeTab="Live Tracking" />;
    case ROUTES.materials:
      return <Placeholder title="Materials" activeTab="Materials" />;
    case ROUTES.quotations:
      return <Placeholder title="Quotations" activeTab="Quotations" />;
    case ROUTES.wallet:
      return <Placeholder title="Wallet" activeTab="Wallet" />;
    case ROUTES.banking:
      return <Placeholder title="Banking" activeTab="Banking" />;
    case ROUTES.revenue:
      return <Placeholder title="Revenue" activeTab="Revenue" />;
    case ROUTES.referrals:
      return <Placeholder title="Referrals" activeTab="Referrals" />;
    case ROUTES.notifications:
      return <Placeholder title="Notifications" activeTab="Notifications" />;
    case ROUTES.banners:
      return <Placeholder title="Banners" activeTab="Banners" />;
    case ROUTES.cms:
      return <Placeholder title="CMS" activeTab="CMS" />;
    case ROUTES.reviews:
      return <Placeholder title="Reviews" activeTab="Reviews" />;
    case ROUTES.sos:
      return <Placeholder title="SOS" activeTab="SOS" />;
    case ROUTES.support:
      return <Placeholder title="Support" activeTab="Support" />;
    case ROUTES.settings:
      return <Placeholder title="Settings" activeTab="Settings" />;
    default:
      return <RoleSelection />;
  }
}


