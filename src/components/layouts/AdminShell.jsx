import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

const navModules = [
  {
    label: 'Dashboard',
    icon: LayoutGrid,
    children: [
      { label: 'Overview Dashboard', route: ROUTES.dashboard },
      { label: 'Revenue Dashboard', route: ROUTES.dashboardRevenue },
      { label: 'Booking Analytics', route: ROUTES.dashboardBookings },
      { label: 'User Analytics', route: ROUTES.dashboardUsers },
      { label: 'Partner Analytics', route: ROUTES.dashboardPartners },
      { label: 'Approval Dashboard', route: ROUTES.dashboardApprovals },
      { label: 'Activity Center', route: ROUTES.dashboardActivity },
      { label: 'System Health', route: ROUTES.dashboardSystemHealth }
    ]
  },
  {
    label: 'User Management',
    icon: Users,
    children: [
      { label: 'All Users', route: ROUTES.users },
      { label: 'Add User', route: ROUTES.addUser },
      { label: 'User Approvals', route: ROUTES.userApprovals },
      { label: 'Blocked Users', route: ROUTES.blockedUsers },
      { label: 'User Wallets', route: ROUTES.userWallets },
      { label: 'User Referrals', route: ROUTES.userReferrals },
      { label: 'User Documents', route: ROUTES.userDocuments },
      { label: 'User Complaints', route: ROUTES.userComplaints },
      { label: 'User Reviews', route: ROUTES.userReviews },
      { label: 'User Timeline', route: ROUTES.userTimeline },
      { label: 'User Activity Logs', route: ROUTES.userActivityLogs },
      { label: 'User Fraud Monitoring', route: ROUTES.userFraudMonitoring },
      { label: 'User Audit Logs', route: ROUTES.userAuditLogs }
    ]
  },
  {
    label: 'Partner Management',
    icon: Handshake,
    children: [
      { label: 'All Partners', route: ROUTES.partners },
      { label: 'Add Partner', route: ROUTES.addPartner },
      { label: 'ISP Partners', route: ROUTES.ispPartners },
      { label: 'BSP Partners', route: ROUTES.bspPartners },
      { label: 'Business Sellers', route: ROUTES.businessSellers },
      { label: 'Partner Approvals', route: ROUTES.partnerApprovals },
      { label: 'KYC Approvals', route: ROUTES.kycApprovals },
      { label: 'Service Approvals', route: ROUTES.serviceApprovals },
      { label: 'Branch Approvals', route: ROUTES.branchApprovals },
      { label: 'Partner Wallets', route: ROUTES.partnerWallets },
      { label: 'Partner Banking', route: ROUTES.partnerBanking },
      { label: 'Partner Employees', route: ROUTES.partnerEmployees },
      { label: 'Partner Branches', route: ROUTES.partnerBranches },
      { label: 'Partner Services', route: ROUTES.partnerServices },
      { label: 'Partner Reviews', route: ROUTES.partnerReviews },
      { label: 'Partner Revenue', route: ROUTES.partnerRevenue },
      { label: 'Partner Fraud Monitoring', route: ROUTES.partnerFraud },
      { label: 'Partner Audit Logs', route: ROUTES.partnerAuditLogs }
    ]
  },
  {
    label: 'KYC Management',
    icon: ShieldCheck,
    route: ROUTES.kyc,
    children: [
      { label: 'Pending KYC', route: ROUTES.kycPending },
      { label: 'Approved KYC', route: ROUTES.kycApproved },
      { label: 'Rejected KYC', route: ROUTES.kycRejected },
      { label: 'Reupload Requests', route: ROUTES.kycReupload },
      { label: 'Aadhaar Verification', route: ROUTES.kycAadhaar },
      { label: 'PAN Verification', route: ROUTES.kycPan },
      { label: 'GST Verification', route: ROUTES.kycGst },
      { label: 'Driving License Verification', route: ROUTES.kycDriving },
      { label: 'Voter ID Verification', route: ROUTES.kycVoter },
      { label: 'Selfie Verification', route: ROUTES.kycSelfie },
      { label: 'Face Match Verification', route: ROUTES.kycFaceMatch },
      { label: 'Video KYC Verification', route: ROUTES.kycVideo },
      { label: 'Risk Assessment', route: ROUTES.kycRisk },
      { label: 'Manual Investigation', route: ROUTES.kycManual },
      { label: 'Reviewer Management', route: ROUTES.kycReviewers },
      { label: 'KYC Analytics', route: ROUTES.kycAnalytics },
      { label: 'Audit Logs', route: ROUTES.kycAuditLogs }
    ]
  },
  {
    label: 'Business Management',
    icon: Briefcase,
    children: [
      { label: 'All Businesses', route: ROUTES.business },
      { label: 'Add Business', route: ROUTES.addBusiness },
      { label: 'Business Approvals', route: ROUTES.businessApproval },
      { label: 'GST Verification', route: ROUTES.businessGst },
      { label: 'PAN Verification', route: ROUTES.businessPan },
      { label: 'Registration Verification', route: ROUTES.businessRegVerification },
      { label: 'Ownership Verification', route: ROUTES.businessOwnership },
      { label: 'Business Branches', route: ROUTES.businessBranches },
      { label: 'Business Services', route: ROUTES.businessServices },
      { label: 'Business Employees', route: ROUTES.businessEmployees },
      { label: 'Business Revenue', route: ROUTES.businessRevenue },
      { label: 'Business Reviews', route: ROUTES.businessReviews },
      { label: 'Compliance Center', route: ROUTES.businessCompliance },
      { label: 'Fraud Investigation', route: ROUTES.businessFraud },
      { label: 'Audit Logs', route: ROUTES.businessAuditLogs }
    ]
  },
  {
    label: 'Branch Management',
    icon: Network,
    children: [
      { label: 'All Branches', route: ROUTES.branches },
      { label: 'Add Branch', route: ROUTES.addBranch },
      { label: 'Branch Approvals', route: ROUTES.branchApproval },
      { label: 'Branch Services', route: ROUTES.branchServices },
      { label: 'Branch Employees', route: ROUTES.branchEmployees },
      { label: 'Branch Bookings', route: ROUTES.branchBookings },
      { label: 'Branch Revenue', route: ROUTES.branchAnalytics },
      { label: 'Service Areas', route: ROUTES.serviceAreas },
      { label: 'Coverage Mapping', route: ROUTES.branchPerformance },
      { label: 'Availability Calendar', route: ROUTES.branchSchedule },
      { label: 'Branch Reviews', route: ROUTES.branchReviews },
      { label: 'Branch Performance', route: ROUTES.branchPerformance },
      { label: 'Compliance Center', route: ROUTES.branchCompliance },
      { label: 'Audit Logs', route: ROUTES.branchAuditLogs }
    ]
  },
  {
    label: 'Service Management',
    icon: Shapes,
    children: [
      { label: 'Categories', route: ROUTES.serviceCategories },
      { label: 'Sub Categories', route: ROUTES.serviceSubCategories },
      { label: 'All Services', route: ROUTES.services },
      { label: 'Add Service', route: ROUTES.serviceAdd },
      { label: 'Service Approvals', route: ROUTES.serviceApprovals },
      { label: 'Pricing Management', route: ROUTES.servicePricing },
      { label: 'Commission Management', route: ROUTES.serviceCommission },
      { label: 'Service Areas', route: ROUTES.serviceAreas },
      { label: 'Coverage Mapping', route: ROUTES.serviceAreaCoverage },
      { label: 'Service Performance', route: ROUTES.servicePerformance },
      { label: 'Service Analytics', route: ROUTES.serviceAnalytics },
      { label: 'Featured Services', route: ROUTES.serviceFeatured },
      { label: 'Media Library', route: ROUTES.serviceMedia },
      { label: 'Audit Logs', route: ROUTES.serviceAuditLogs }
    ]
  },
  {
    label: 'Employee Management',
    icon: Contact,
    children: [
      { label: 'All Employees', route: ROUTES.employees },
      { label: 'Add Employee', route: ROUTES.employeeAll },
      { label: 'Branch Managers', route: ROUTES.branchManagers },
      { label: 'Assignments', route: ROUTES.employeeAssignments },
      { label: 'Availability Board', route: ROUTES.employees },
      { label: 'Attendance', route: ROUTES.attendance },
      { label: 'Leave Management', route: ROUTES.leaveManagement },
      { label: 'Employee Documents', route: ROUTES.employeeDocuments },
      { label: 'Employee KYC', route: ROUTES.employeeKyc },
      { label: 'Performance Dashboard', route: ROUTES.performance },
      { label: 'Ratings & Reviews', route: ROUTES.employeeRatings },
      { label: 'Earnings', route: ROUTES.employeeEarnings },
      { label: 'Employee Analytics', route: ROUTES.employeeAnalytics },
      { label: 'Audit Logs', route: ROUTES.employeeAuditLogs }
    ]
  },
  {
    label: 'Booking Management',
    icon: CalendarCheck,
    children: [
      { label: 'All Bookings', route: ROUTES.bookings },
      { label: 'Create Booking', route: ROUTES.bookingCreate },
      { label: 'Pending Bookings', route: ROUTES.bookingPending },
      { label: 'Assigned Bookings', route: ROUTES.bookingAssigned },
      { label: 'Accepted Bookings', route: ROUTES.bookingAccepted },
      { label: 'In Progress Bookings', route: ROUTES.bookingInProgress },
      { label: 'Material Pending Bookings', route: ROUTES.bookingMaterialPending },
      { label: 'Quotation Pending Bookings', route: ROUTES.bookingQuotationPending },
      { label: 'OTP Pending Bookings', route: ROUTES.bookingOtpPending },
      { label: 'Completed Bookings', route: ROUTES.bookingCompleted },
      { label: 'Cancelled Bookings', route: ROUTES.bookingCancelled },
      { label: 'Refunded Bookings', route: ROUTES.bookingRefunded },
      { label: 'Escalated Bookings', route: ROUTES.bookingEscalated },
      { label: 'Disputed Bookings', route: ROUTES.bookingDisputed },
      { label: 'Assignment Center', route: ROUTES.bookingAssignmentCenter },
      { label: 'OTP Verification', route: ROUTES.bookingOtpVerification },
      { label: 'Booking Calendar', route: ROUTES.bookingCalendar },
      { label: 'Booking Map View', route: ROUTES.bookingMap },
      { label: 'Payments', route: ROUTES.bookingPayments },
      { label: 'Invoices', route: ROUTES.bookingInvoices },
      { label: 'Refunds', route: ROUTES.bookingRefunds },
      { label: 'SLA Monitoring', route: ROUTES.bookingSla },
      { label: 'Booking Analytics', route: ROUTES.bookingAnalytics },
      { label: 'Fraud Detection', route: ROUTES.bookingFraud },
      { label: 'Booking Archive', route: ROUTES.bookingArchive }
    ]
  },
  {
    label: 'Live Tracking',
    icon: Compass,
    children: [
      { label: 'Live Dashboard', route: ROUTES.liveDashboard },
      { label: 'Operations Map', route: ROUTES.liveOpsMap },
      { label: 'Active Jobs', route: ROUTES.liveActiveJobs },
      { label: 'Employee Tracking', route: ROUTES.liveEmployeeTracking },
      { label: 'Route Tracking', route: ROUTES.liveRouteTracking },
      { label: 'ETA Monitoring', route: ROUTES.liveEta },
      { label: 'Delay Monitoring', route: ROUTES.liveDelay },
      { label: 'Geofence Management', route: ROUTES.liveGeofence },
      { label: 'Geofence Logs', route: ROUTES.liveGeofenceLogs },
      { label: 'Movement History', route: ROUTES.liveHistory },
      { label: 'Heatmaps', route: ROUTES.liveHeatmaps },
      { label: 'SOS Tracking', route: ROUTES.liveSos },
      { label: 'Tracking Analytics', route: ROUTES.liveAnalytics }
    ]
  },
  {
    label: 'Material Management',
    icon: Inbox,
    children: [
      { label: 'Material Requests', route: ROUTES.materialRequests },
      { label: 'Create Request', route: ROUTES.materialCreate },
      { label: 'Approval Queue', route: ROUTES.materialApprovals },
      { label: 'Inventory Dashboard', route: ROUTES.materialInventory },
      { label: 'Inventory Listing', route: ROUTES.materialListing },
      { label: 'Material Categories', route: ROUTES.materialCategories },
      { label: 'Restocking', route: ROUTES.materialRestocking },
      { label: 'Vendor Recommendations', route: ROUTES.materialVendors },
      { label: 'Supplier Comparison', route: ROUTES.materialSupplierComparison },
      { label: 'Purchase Orders', route: ROUTES.materialPurchaseOrders },
      { label: 'Delivery Tracking', route: ROUTES.materialDelivery },
      { label: 'Material Consumption', route: ROUTES.materialConsumption },
      { label: 'Material Returns', route: ROUTES.materialReturns },
      { label: 'Supplier Performance', route: ROUTES.materialSupplierPerformance },
      { label: 'Material Analytics', route: ROUTES.materialAnalytics }
    ]
  },
  {
    label: 'Quotation Management',
    icon: FileText,
    children: [
      { label: 'Seller Quotations', route: ROUTES.quotationSeller },
      { label: 'Customer Quotations', route: ROUTES.quotationCustomer },
      { label: 'RFQ Listing', route: ROUTES.quotationRfq },
      { label: 'Create RFQ', route: ROUTES.quotationCreateRfq },
      { label: 'Approval Queue', route: ROUTES.quotationApprovals },
      { label: 'Winner Selection', route: ROUTES.quotationWinner },
      { label: 'Negotiation Center', route: ROUTES.quotationNegotiation },
      { label: 'Purchase Orders', route: ROUTES.quotationOrders },
      { label: 'Cost Optimization', route: ROUTES.quotationCostOptimization },
      { label: 'Seller Performance', route: ROUTES.quotationSellerPerformance },
      { label: 'Pricing Analytics', route: ROUTES.quotationAnalytics },
      { label: 'Disputes', route: ROUTES.quotationDisputes },
      { label: 'Reports', route: ROUTES.quotationReports }
    ]
  },
  {
    label: 'Wallet Management',
    icon: Wallet,
    children: [
      { label: 'All Wallets', route: ROUTES.walletAll },
      { label: 'User Wallets', route: ROUTES.walletUser },
      { label: 'Partner Wallets', route: ROUTES.walletPartner },
      { label: 'Seller Wallets', route: ROUTES.walletSeller },
      { label: 'Employee Wallets', route: ROUTES.walletEmployee },
      { label: 'Transactions', route: ROUTES.walletTransactions },
      { label: 'Refunds', route: ROUTES.walletRefunds },
      { label: 'Penalties', route: ROUTES.walletPenalties },
      { label: 'Settlements', route: ROUTES.settlements },
      { label: 'Freeze Wallets', route: ROUTES.walletFreeze },
      { label: 'Fraud Monitoring', route: ROUTES.walletFraud },
      { label: 'Wallet Analytics', route: ROUTES.walletAnalytics },
      { label: 'Earnings Dashboard', route: ROUTES.walletEarnings },
      { label: 'Reconciliation', route: ROUTES.walletReconciliation }
    ]
  },
  {
    label: 'Banking & Settlements',
    icon: Landmark,
    children: [
      { label: 'Bank Accounts', route: ROUTES.bankAccounts },
      { label: 'Beneficiaries', route: ROUTES.bankBeneficiaries },
      { label: 'UPI Verification', route: ROUTES.bankUpi },
      { label: 'Withdrawal Requests', route: ROUTES.withdrawalRequests },
      { label: 'Withdrawal Approvals', route: ROUTES.withdrawalApprovals },
      { label: 'Settlement Queue', route: ROUTES.settlementQueue },
      { label: 'Bulk Settlements', route: ROUTES.bulkSettlements },
      { label: 'Failed Settlements', route: ROUTES.failedSettlements },
      { label: 'Payout Processing', route: ROUTES.payoutProcessing },
      { label: 'Finance Approvals', route: ROUTES.financeApprovals },
      { label: 'Banking Analytics', route: ROUTES.bankingAnalytics },
      { label: 'Bank Performance', route: ROUTES.bankPerformance }
    ]
  },
  {
    label: 'Revenue Management',
    icon: Banknote,
    children: [
      { label: 'Revenue Dashboard', route: ROUTES.revenueDashboard },
      { label: 'Revenue Overview', route: ROUTES.revenueOverview },
      { label: 'Daily/Weekly/Monthly Revenue', route: ROUTES.revenueDaily },
      { label: 'Partner Revenue', route: ROUTES.revenuePartner },
      { label: 'Seller Revenue', route: ROUTES.revenueSeller },
      { label: 'Branch Revenue', route: ROUTES.revenueBranch },
      { label: 'Employee Revenue', route: ROUTES.revenueEmployee },
      { label: 'Service Revenue', route: ROUTES.revenueService },
      { label: 'Profit & Loss', route: ROUTES.revenueProfitLoss },
      { label: 'Expenses', route: ROUTES.revenueExpenses },
      { label: 'Revenue Forecasting', route: ROUTES.revenueForecasting },
      { label: 'Targets', route: ROUTES.revenueTargets },
      { label: 'Executive Dashboard', route: ROUTES.revenueExecutive },
      { label: 'BI Center', route: ROUTES.revenueBI },
      { label: 'Financial Health', route: ROUTES.revenueHealth }
    ]
  },
  {
    label: 'Referral Management',
    icon: Network,
    children: [
      { label: 'Referral Dashboard', route: ROUTES.referralDashboard },
      { label: 'Referral Listing', route: ROUTES.referralListing },
      { label: 'Campaign Dashboard', route: ROUTES.referralCampaignDashboard },
      { label: 'Campaign Listing', route: ROUTES.referralCampaignListing },
      { label: 'Create Campaign', route: ROUTES.referralCreateCampaign },
      { label: 'Reward Approval Queue', route: ROUTES.referralRewardApprovals },
      { label: 'Reward Settlements', route: ROUTES.referralRewardSettlements },
      { label: 'Conversion Analytics', route: ROUTES.referralConversionAnalytics },
      { label: 'Referral Sources', route: ROUTES.referralSources },
      { label: 'Leaderboard', route: ROUTES.referralLeaderboard },
      { label: 'Referral Fraud Detection', route: ROUTES.referralFraud },
      { label: 'Investigations', route: ROUTES.referralInvestigations },
      { label: 'Coupon Management', route: ROUTES.referralCoupons },
      { label: 'QR Management', route: ROUTES.referralQr }
    ]
  },
  {
    label: 'Notification Center',
    icon: MessageSquare,
    children: [
      { label: 'Push Notifications', route: ROUTES.notificationsPush },
      { label: 'SMS Campaigns', route: ROUTES.notificationsSms },
      { label: 'WhatsApp Campaigns', route: ROUTES.notificationsWhatsapp },
      { label: 'Email Campaigns', route: ROUTES.notificationsEmail },
      { label: 'Notification Templates', route: ROUTES.notificationsTemplates },
      { label: 'Audience Segments', route: ROUTES.notificationsAudience },
      { label: 'Scheduled Campaigns', route: ROUTES.notificationsScheduled },
      { label: 'Automation Rules', route: ROUTES.notificationsAutomation },
      { label: 'Delivery Reports', route: ROUTES.notificationsDelivery }
    ]
  },
  {
    label: 'Banner Management',
    icon: MousePointerClick,
    children: [
      { label: 'Homepage Banners', route: ROUTES.bannersHomepage },
      { label: 'Offer Banners', route: ROUTES.bannersOffer },
      { label: 'Category Banners', route: ROUTES.bannersCategory },
      { label: 'Popup Banners', route: ROUTES.bannersPopup },
      { label: 'Banner Scheduling', route: ROUTES.bannersScheduling },
      { label: 'Banner Analytics', route: ROUTES.bannersAnalytics }
    ]
  },
  {
    label: 'CMS Management',
    icon: ClipboardList,
    children: [
      { label: 'About Us', route: ROUTES.cmsAboutUs },
      { label: 'Terms & Conditions', route: ROUTES.cmsTerms },
      { label: 'Privacy Policy', route: ROUTES.cmsPrivacy },
      { label: 'Refund Policy', route: ROUTES.cmsRefund },
      { label: 'Contact Us', route: ROUTES.cmsContactUs },
      { label: 'FAQs', route: ROUTES.cmsFaqs },
      { label: 'Blogs', route: ROUTES.cmsBlogs },
      { label: 'SEO Settings', route: ROUTES.cmsSeo }
    ]
  },
  {
    label: 'Reviews & Ratings',
    icon: Star,
    children: [
      { label: 'User Reviews', route: ROUTES.reviewsUser },
      { label: 'Partner Reviews', route: ROUTES.reviewsPartner },
      { label: 'Employee Reviews', route: ROUTES.reviewsEmployee },
      { label: 'Review Moderation', route: ROUTES.reviewsModeration },
      { label: 'Rating Analytics', route: ROUTES.reviewsAnalytics }
    ]
  },
  {
    label: 'SOS Management',
    icon: Activity,
    children: [
      { label: 'Active SOS', route: ROUTES.sosActive },
      { label: 'Resolved SOS', route: ROUTES.sosResolved },
      { label: 'Escalated SOS', route: ROUTES.sosEscalated },
      { label: 'Emergency Tracking', route: ROUTES.sosTracking },
      { label: 'Incident Reports', route: ROUTES.sosIncidentReports }
    ]
  },
  {
    label: 'Support Center',
    icon: HelpCircle,
    children: [
      { label: 'All Tickets', route: ROUTES.supportAll },
      { label: 'Open Tickets', route: ROUTES.supportOpen },
      { label: 'In Progress Tickets', route: ROUTES.supportInProgress },
      { label: 'Escalated Tickets', route: ROUTES.supportEscalated },
      { label: 'Closed Tickets', route: ROUTES.supportClosed },
      { label: 'Booking Issues', route: ROUTES.supportBookingIssues },
      { label: 'Payment Issues', route: ROUTES.supportPaymentIssues },
      { label: 'Wallet Issues', route: ROUTES.supportWalletIssues },
      { label: 'Technical Issues', route: ROUTES.supportTechnicalIssues },
      { label: 'KYC Issues', route: ROUTES.supportKycIssues },
      { label: 'SLA Monitoring', route: ROUTES.supportSla },
      { label: 'Support Analytics', route: ROUTES.supportAnalytics }
    ]
  },
  {
    label: 'Fraud Management',
    icon: ShieldAlert,
    children: [
      { label: 'Fraud Dashboard', route: ROUTES.fraudDashboard },
      { label: 'User Fraud', route: ROUTES.fraudUser },
      { label: 'Partner Fraud', route: ROUTES.fraudPartner },
      { label: 'Wallet Fraud', route: ROUTES.fraudWallet },
      { label: 'Booking Fraud', route: ROUTES.fraudBooking },
      { label: 'Investigations', route: ROUTES.fraudInvestigations },
      { label: 'Risk Scoring', route: ROUTES.fraudRisk },
      { label: 'Blacklist Management', route: ROUTES.blacklistManagement }
    ]
  },
  {
    label: 'Reports & Analytics',
    icon: BarChart3,
    children: [
      { label: 'Operational Reports', route: ROUTES.reportsOperational },
      { label: 'Booking Reports', route: ROUTES.reportsBooking },
      { label: 'User Reports', route: ROUTES.reportsUser },
      { label: 'Partner Reports', route: ROUTES.reportsPartner },
      { label: 'Employee Reports', route: ROUTES.reportsEmployee },
      { label: 'Financial Reports', route: ROUTES.reportsFinancial },
      { label: 'Revenue Reports', route: ROUTES.reportsRevenue },
      { label: 'Wallet Reports', route: ROUTES.reportsWallet },
      { label: 'Settlement Reports', route: ROUTES.reportsSettlement },
      { label: 'Marketing Reports', route: ROUTES.reportsMarketing },
      { label: 'Referral Reports', route: ROUTES.reportsReferral },
      { label: 'Campaign Reports', route: ROUTES.reportsCampaign },
      { label: 'Export Center', route: ROUTES.exportCenter }
    ]
  },
  {
    label: 'Role & Permission',
    icon: UserCheck,
    children: [
      { label: 'All Roles', route: ROUTES.rolePermissions },
      { label: 'Create Role', route: ROUTES.createRole },
      { label: 'Permission Matrix', route: ROUTES.permissionMatrix },
      { label: 'Module Access', route: ROUTES.moduleAccess },
      { label: 'Action Permissions', route: ROUTES.actionPermissions },
      { label: 'User Access Logs', route: ROUTES.userAccessLogs },
      { label: 'Role Audit Logs', route: ROUTES.roleAuditLogs }
    ]
  },
  {
    label: 'Settings',
    icon: Settings,
    children: [
      { label: 'General Settings', route: ROUTES.settingsPlatformGeneral },
      { label: 'Platform Configuration', route: ROUTES.settingsPlatformConfig },
      { label: 'Commission Settings', route: ROUTES.settingsFinancialCommission },
      { label: 'Tax Settings', route: ROUTES.settingsFinancialTax },
      { label: 'Wallet Settings', route: ROUTES.settingsFinancialWallet },
      { label: 'Settlement Settings', route: ROUTES.settingsFinancialSettlement },
      { label: 'Payment Gateway', route: ROUTES.settingsIntegrationPayment },
      { label: 'SMS Gateway', route: ROUTES.settingsIntegrationSms },
      { label: 'WhatsApp API', route: ROUTES.settingsIntegrationWhatsapp },
      { label: 'Email SMTP', route: ROUTES.settingsIntegrationEmail },
      { label: 'Google Maps API', route: ROUTES.settingsIntegrationGoogleMaps },
      { label: 'Security Settings', route: ROUTES.settingsSecurityGeneral },
      { label: 'Password Policies', route: ROUTES.settingsSecurityPassword },
      { label: 'Session Management', route: ROUTES.settingsSecuritySession },
      { label: 'Audit Logs', route: ROUTES.settingsSecurityAudit },
      { label: 'Backup Management', route: ROUTES.settingsSystemBackup },
      { label: 'Maintenance Mode', route: ROUTES.settingsSystemMaintenance },
      { label: 'System Logs', route: ROUTES.settingsSystemLogs }
    ]
  }
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
  const { session, logout, navigate, route } = useApp();
  
  const userName = customProfileName || session?.user?.name || 'Alex Sterling';
  const roleLabel = customProfileRole || session?.user?.roleLabel || 'System Administrator';
  const role = session?.role || 'super-admin';

  const isSuperAdmin = role === 'super-admin';
  const hasCustomAvatar = !!customProfileAvatar;

  // Sync expanded module on load or when route changes
  const [openModule, setOpenModule] = useState(() => {
    const activeModule = navModules.find(m => 
      m.route === route ||
      m.label === activeTab || 
      m.children?.some(c => c.route === route)
    );
    return activeModule ? activeModule.label : null;
  });

  useEffect(() => {
    const activeModule = navModules.find(m => 
      m.route === route ||
      m.children?.some(c => c.route === route)
    );
    if (activeModule) {
      setOpenModule(activeModule.label);
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
    return module.children?.some(c => c.route === route || c.label === activeTab);
  };

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
          {navItemsOverride ? (
            // Render overridden nav flat (for pages like ApprovalQueue that override nav list)
            navItemsOverride.map((item) => {
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
            })
          ) : (
            // Render hierarchical 26-module accordion structure
            navModules.map((item) => {
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
                  {isExpanded && item.children && (
                    <div className="sidebar-subnav">
                      {item.children.map((child) => {
                        const isChildActive = route === child.route;
                        return (
                          <button
                            key={child.label}
                            type="button"
                            className={`sidebar-subnav-btn ${isChildActive ? 'active-sub' : ''}`}
                            onClick={() => handleNavClick(child.route)}
                          >
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
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
