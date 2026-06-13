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
import AddPartnerWizard from '../../pages/Partners/AddPartnerWizard';
import ApprovalQueue from '../../pages/ApprovalQueue';
import FraudCenter from '../../pages/FraudCenter';
import CommunicationsCenter from '../../pages/CommunicationsCenter';
import Settlements from '../../pages/Settlements';
import Analytics from '../../pages/Analytics';
import Users from '../../pages/Users';
import Placeholder from '../../pages/Placeholder';
import Employees from '../../pages/Employees';
import KYCModule from '../../pages/KYC';
import Branches from '../../pages/Branches';
import BranchSchedule from '../../pages/Branches/BranchSchedule';
import BranchSuspend from '../../pages/Branches/BranchSuspend';
import AddBranch from '../../pages/Branches/AddBranch';
import BranchProfile from '../../pages/Branches/BranchProfile';
import ManagerAssignment from '../../pages/Branches/ManagerAssignment';
import ServiceAreas from '../../pages/ServiceAreas';
import ServiceAreaCoverage from '../../pages/Services/ServiceAreaCoverage';
import Services from '../../pages/Services';
import BusinessRegistry from '../../pages/Business';
import BusinessDetails from '../../pages/Business/BusinessDetails';
import BusinessReview from '../../pages/Business/BusinessReview';
import BusinessVerify from '../../pages/Business/BusinessVerify';
import BusinessSuspension from '../../pages/Business/BusinessSuspension';
import BusinessRisk from '../../pages/Business/BusinessRisk';
import AddBusiness from '../../pages/Business/AddBusiness';
import BusinessDocReview from '../../pages/Business/BusinessDocReview';
import BusinessTaxonomy from '../../pages/Business/BusinessTaxonomy';

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
    
    // Consolidated onboarding flow routes
    case ROUTES.addPartner:
    case ROUTES.onboardingAddress:
    case ROUTES.addServices:
    case ROUTES.addBanking:
      return <AddPartnerWizard />;
      
    case ROUTES.approvalQueue:
      return <ApprovalQueue />;
    case ROUTES.communications:
      return <CommunicationsCenter />;
    case ROUTES.settlements:
      return <Settlements />;
    case ROUTES.users:
      return <Users />;
      
    // KYC Management routing
    case ROUTES.kyc:
    case ROUTES.kycPending:
    case ROUTES.kycApproved:
    case ROUTES.kycRejected:
    case ROUTES.kycReupload:
    case ROUTES.kycAadhaar:
    case ROUTES.kycPan:
    case ROUTES.kycGst:
    case ROUTES.kycDriving:
    case ROUTES.kycVoter:
    case ROUTES.kycSelfie:
    case ROUTES.kycFaceMatch:
    case ROUTES.kycVideo:
    case ROUTES.kycRisk:
    case ROUTES.kycManual:
    case ROUTES.kycAnalytics:
    case ROUTES.kycAuditLogs:
    case ROUTES.kycReviewers:
      return <KYCModule />;
      
    case ROUTES.business:
    case ROUTES.businessApproval:
      return <BusinessRegistry />;
    case ROUTES.businessDetails:
      return <BusinessDetails />;
    case ROUTES.businessReview:
      return <BusinessReview />;
    case ROUTES.businessVerify:
      return <BusinessVerify />;
    case ROUTES.businessSuspension:
      return <BusinessSuspension />;
    case ROUTES.businessRisk:
      return <BusinessRisk />;
    case ROUTES.addBusiness:
      return <AddBusiness />;
    case ROUTES.businessDocReview:
      return <BusinessDocReview />;
    case ROUTES.businessTaxonomy:
      return <BusinessTaxonomy />;
    case ROUTES.branches:
      return <Branches />;
    case ROUTES.branchPerformance:
      return <Branches defaultTab="Performance" />;
    case ROUTES.branchApproval:
      return <Branches defaultTab="ApprovalQueue" />;
    case ROUTES.branchAnalytics:
      return <Branches defaultTab="Analytics" />;
    case ROUTES.branchSchedule:
      return <BranchSchedule />;
    case ROUTES.branchSuspend:
      return <BranchSuspend />;
    case ROUTES.branchCompliance:
      return <Branches defaultTab="Compliance" />;
    case ROUTES.addBranch:
      return <AddBranch />;
    case ROUTES.branchProfile:
      return <BranchProfile />;
    case ROUTES.branchManagerAssignment:
      return <ManagerAssignment />;
    case ROUTES.serviceAreas:
      return <ServiceAreas />;
      
    // Services module & service areas mapping
    case ROUTES.serviceAreaCoverage:
      return <ServiceAreaCoverage />;
    case ROUTES.services:
      return <Services />;
      
    case ROUTES.employees:
      return <Employees />;
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
    case ROUTES.performance:
      return <Employees />;
    case ROUTES.reports:
      return <Employees />;
    case ROUTES.attendance:
      return <Employees />;
    case ROUTES.leaveManagement:
      return <Employees />;

    // --- NEW MODULE SUB-ROUTES ---

    // Dashboard sub-routes
    case ROUTES.dashboardRevenue:
      return <Placeholder title="Revenue Dashboard" activeTab="Dashboard" />;
    case ROUTES.dashboardBookings:
      return <Placeholder title="Booking Analytics" activeTab="Dashboard" />;
    case ROUTES.dashboardUsers:
      return <Placeholder title="User Analytics" activeTab="Dashboard" />;
    case ROUTES.dashboardPartners:
      return <Placeholder title="Partner Analytics" activeTab="Dashboard" />;
    case ROUTES.dashboardApprovals:
      return <Placeholder title="Approval Dashboard" activeTab="Dashboard" />;
    case ROUTES.dashboardActivity:
      return <Placeholder title="Activity Center" activeTab="Dashboard" />;
    case ROUTES.dashboardSystemHealth:
      return <Placeholder title="System Health" activeTab="Dashboard" />;

    // User Management sub-routes
    case ROUTES.addUser:
      return <Placeholder title="Add User" activeTab="User Management" />;
    case ROUTES.userApprovals:
      return <Placeholder title="User Approvals" activeTab="User Management" />;
    case ROUTES.blockedUsers:
      return <Placeholder title="Blocked Users" activeTab="User Management" />;
    case ROUTES.userWallets:
      return <Placeholder title="User Wallets" activeTab="User Management" />;
    case ROUTES.userReferrals:
      return <Placeholder title="User Referrals" activeTab="User Management" />;
    case ROUTES.userDocuments:
      return <Placeholder title="User Documents" activeTab="User Management" />;
    case ROUTES.userComplaints:
      return <Placeholder title="User Complaints" activeTab="User Management" />;
    case ROUTES.userReviews:
      return <Placeholder title="User Reviews" activeTab="User Management" />;
    case ROUTES.userTimeline:
      return <Placeholder title="User Timeline" activeTab="User Management" />;
    case ROUTES.userActivityLogs:
      return <Placeholder title="User Activity Logs" activeTab="User Management" />;
    case ROUTES.userFraudMonitoring:
      return <Placeholder title="User Fraud Monitoring" activeTab="User Management" />;
    case ROUTES.userAuditLogs:
      return <Placeholder title="User Audit Logs" activeTab="User Management" />;

    // Partner Management sub-routes
    case ROUTES.ispPartners:
      return <Placeholder title="ISP Partners" activeTab="Partner Management" />;
    case ROUTES.bspPartners:
      return <Placeholder title="BSP Partners" activeTab="Partner Management" />;
    case ROUTES.businessSellers:
      return <Placeholder title="Business Sellers" activeTab="Partner Management" />;
    case ROUTES.partnerApprovals:
      return <Placeholder title="Partner Approvals" activeTab="Partner Management" />;
    case ROUTES.kycApprovals:
      return <Placeholder title="KYC Approvals" activeTab="Partner Management" />;
    case ROUTES.serviceApprovals:
      return <Placeholder title="Service Approvals" activeTab="Partner Management" />;
    case ROUTES.branchApprovals:
      return <Placeholder title="Branch Approvals" activeTab="Partner Management" />;
    case ROUTES.partnerWallets:
      return <Placeholder title="Partner Wallets" activeTab="Partner Management" />;
    case ROUTES.partnerBanking:
      return <Placeholder title="Partner Banking" activeTab="Partner Management" />;
    case ROUTES.partnerEmployees:
      return <Placeholder title="Partner Employees" activeTab="Partner Management" />;
    case ROUTES.partnerBranches:
      return <Placeholder title="Partner Branches" activeTab="Partner Management" />;
    case ROUTES.partnerServices:
      return <Placeholder title="Partner Services" activeTab="Partner Management" />;
    case ROUTES.partnerReviews:
      return <Placeholder title="Partner Reviews" activeTab="Partner Management" />;
    case ROUTES.partnerRevenue:
      return <Placeholder title="Partner Revenue" activeTab="Partner Management" />;
    case ROUTES.partnerFraud:
      return <Placeholder title="Partner Fraud" activeTab="Partner Management" />;
    case ROUTES.partnerAuditLogs:
      return <Placeholder title="Partner Audit Logs" activeTab="Partner Management" />;

    // Business Management sub-routes
    case ROUTES.businessAll:
      return <Placeholder title="All Businesses" activeTab="Business Management" />;
    case ROUTES.businessGst:
      return <Placeholder title="GST Verification" activeTab="Business Management" />;
    case ROUTES.businessPan:
      return <Placeholder title="PAN Verification" activeTab="Business Management" />;
    case ROUTES.businessRegVerification:
      return <Placeholder title="Registration Verification" activeTab="Business Management" />;
    case ROUTES.businessOwnership:
      return <Placeholder title="Ownership Verification" activeTab="Business Management" />;
    case ROUTES.businessBranches:
      return <Placeholder title="Business Branches" activeTab="Business Management" />;
    case ROUTES.businessServices:
      return <Placeholder title="Business Services" activeTab="Business Management" />;
    case ROUTES.businessEmployees:
      return <Placeholder title="Business Employees" activeTab="Business Management" />;
    case ROUTES.businessRevenue:
      return <Placeholder title="Business Revenue" activeTab="Business Management" />;
    case ROUTES.businessReviews:
      return <Placeholder title="Business Reviews" activeTab="Business Management" />;
    case ROUTES.businessCompliance:
      return <Placeholder title="Compliance Center" activeTab="Business Management" />;
    case ROUTES.businessFraud:
      return <Placeholder title="Fraud Investigation" activeTab="Business Management" />;
    case ROUTES.businessAuditLogs:
      return <Placeholder title="Audit Logs" activeTab="Business Management" />;

    // Branch Management sub-routes
    case ROUTES.branchAll:
      return <Placeholder title="All Branches" activeTab="Branch Management" />;
    case ROUTES.branchServices:
      return <Placeholder title="Branch Services" activeTab="Branch Management" />;
    case ROUTES.branchEmployees:
      return <Placeholder title="Branch Employees" activeTab="Branch Management" />;
    case ROUTES.branchBookings:
      return <Placeholder title="Branch Bookings" activeTab="Branch Management" />;
    case ROUTES.branchReviews:
      return <Placeholder title="Branch Reviews" activeTab="Branch Management" />;
    case ROUTES.branchAuditLogs:
      return <Placeholder title="Audit Logs" activeTab="Branch Management" />;

    // Service Management sub-routes
    case ROUTES.serviceCategories:
      return <Placeholder title="Categories" activeTab="Service Management" />;
    case ROUTES.serviceSubCategories:
      return <Placeholder title="Sub Categories" activeTab="Service Management" />;
    case ROUTES.serviceAll:
      return <Placeholder title="All Services" activeTab="Service Management" />;
    case ROUTES.serviceAdd:
      return <Placeholder title="Add Service" activeTab="Service Management" />;
    case ROUTES.serviceApprovals:
      return <Placeholder title="Service Approvals" activeTab="Service Management" />;
    case ROUTES.servicePricing:
      return <Placeholder title="Pricing Management" activeTab="Service Management" />;
    case ROUTES.serviceCommission:
      return <Placeholder title="Commission Management" activeTab="Service Management" />;
    case ROUTES.servicePerformance:
      return <Placeholder title="Service Performance" activeTab="Service Management" />;
    case ROUTES.serviceAnalytics:
      return <Placeholder title="Service Analytics" activeTab="Service Management" />;
    case ROUTES.serviceFeatured:
      return <Placeholder title="Featured Services" activeTab="Service Management" />;
    case ROUTES.serviceMedia:
      return <Placeholder title="Media Library" activeTab="Service Management" />;
    case ROUTES.serviceAuditLogs:
      return <Placeholder title="Audit Logs" activeTab="Service Management" />;

    // Employee Management sub-routes
    case ROUTES.employeeAll:
      return <Placeholder title="All Employees" activeTab="Employee Management" />;
    case ROUTES.branchManagers:
      return <Placeholder title="Branch Managers" activeTab="Employee Management" />;
    case ROUTES.employeeAssignments:
      return <Placeholder title="Assignments" activeTab="Employee Management" />;
    case ROUTES.employeeDocuments:
      return <Placeholder title="Employee Documents" activeTab="Employee Management" />;
    case ROUTES.employeeEarnings:
      return <Placeholder title="Earnings" activeTab="Employee Management" />;
    case ROUTES.employeeRatings:
      return <Placeholder title="Ratings & Reviews" activeTab="Employee Management" />;
    case ROUTES.employeeKyc:
      return <Placeholder title="Employee KYC" activeTab="Employee Management" />;
    case ROUTES.employeeAnalytics:
      return <Placeholder title="Employee Analytics" activeTab="Employee Management" />;
    case ROUTES.employeeAuditLogs:
      return <Placeholder title="Audit Logs" activeTab="Employee Management" />;

    // Booking Management sub-routes
    case ROUTES.bookingAll:
      return <Placeholder title="All Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingCreate:
      return <Placeholder title="Create Booking" activeTab="Booking Management" />;
    case ROUTES.bookingPending:
      return <Placeholder title="Pending Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingAssigned:
      return <Placeholder title="Assigned Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingAccepted:
      return <Placeholder title="Accepted Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingInProgress:
      return <Placeholder title="In Progress Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingMaterialPending:
      return <Placeholder title="Material Pending Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingQuotationPending:
      return <Placeholder title="Quotation Pending Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingOtpPending:
      return <Placeholder title="OTP Pending Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingCompleted:
      return <Placeholder title="Completed Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingCancelled:
      return <Placeholder title="Cancelled Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingRefunded:
      return <Placeholder title="Refunded Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingEscalated:
      return <Placeholder title="Escalated Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingDisputed:
      return <Placeholder title="Disputed Bookings" activeTab="Booking Management" />;
    case ROUTES.bookingAssignmentCenter:
      return <Placeholder title="Assignment Center" activeTab="Booking Management" />;
    case ROUTES.bookingOtpVerification:
      return <Placeholder title="OTP Verification" activeTab="Booking Management" />;
    case ROUTES.bookingCalendar:
      return <Placeholder title="Booking Calendar" activeTab="Booking Management" />;
    case ROUTES.bookingMap:
      return <Placeholder title="Booking Map View" activeTab="Booking Management" />;
    case ROUTES.bookingPayments:
      return <Placeholder title="Payments" activeTab="Booking Management" />;
    case ROUTES.bookingInvoices:
      return <Placeholder title="Invoices" activeTab="Booking Management" />;
    case ROUTES.bookingRefunds:
      return <Placeholder title="Refunds" activeTab="Booking Management" />;
    case ROUTES.bookingSla:
      return <Placeholder title="SLA Monitoring" activeTab="Booking Management" />;
    case ROUTES.bookingAnalytics:
      return <Placeholder title="Booking Analytics" activeTab="Booking Management" />;
    case ROUTES.bookingFraud:
      return <Placeholder title="Fraud Detection" activeTab="Booking Management" />;
    case ROUTES.bookingArchive:
      return <Placeholder title="Booking Archive" activeTab="Booking Management" />;

    // Live Tracking sub-routes
    case ROUTES.liveDashboard:
      return <Placeholder title="Live Dashboard" activeTab="Live Tracking" />;
    case ROUTES.liveOpsMap:
      return <Placeholder title="Operations Map" activeTab="Live Tracking" />;
    case ROUTES.liveActiveJobs:
      return <Placeholder title="Active Jobs" activeTab="Live Tracking" />;
    case ROUTES.liveEmployeeTracking:
      return <Placeholder title="Employee Tracking" activeTab="Live Tracking" />;
    case ROUTES.liveRouteTracking:
      return <Placeholder title="Route Tracking" activeTab="Live Tracking" />;
    case ROUTES.liveEta:
      return <Placeholder title="ETA Monitoring" activeTab="Live Tracking" />;
    case ROUTES.liveDelay:
      return <Placeholder title="Delay Monitoring" activeTab="Live Tracking" />;
    case ROUTES.liveGeofence:
      return <Placeholder title="Geofence Management" activeTab="Live Tracking" />;
    case ROUTES.liveGeofenceLogs:
      return <Placeholder title="Geofence Logs" activeTab="Live Tracking" />;
    case ROUTES.liveHistory:
      return <Placeholder title="Movement History" activeTab="Live Tracking" />;
    case ROUTES.liveHeatmaps:
      return <Placeholder title="Heatmaps" activeTab="Live Tracking" />;
    case ROUTES.liveSos:
      return <Placeholder title="SOS Tracking" activeTab="Live Tracking" />;
    case ROUTES.liveAnalytics:
      return <Placeholder title="Tracking Analytics" activeTab="Live Tracking" />;

    // Material Management sub-routes
    case ROUTES.materialRequests:
      return <Placeholder title="Material Requests" activeTab="Material Management" />;
    case ROUTES.materialCreate:
      return <Placeholder title="Create Request" activeTab="Material Management" />;
    case ROUTES.materialApprovals:
      return <Placeholder title="Approval Queue" activeTab="Material Management" />;
    case ROUTES.materialInventory:
      return <Placeholder title="Inventory Dashboard" activeTab="Material Management" />;
    case ROUTES.materialListing:
      return <Placeholder title="Inventory Listing" activeTab="Material Management" />;
    case ROUTES.materialCategories:
      return <Placeholder title="Material Categories" activeTab="Material Management" />;
    case ROUTES.materialRestocking:
      return <Placeholder title="Restocking" activeTab="Material Management" />;
    case ROUTES.materialVendors:
      return <Placeholder title="Vendor Recommendations" activeTab="Material Management" />;
    case ROUTES.materialSupplierComparison:
      return <Placeholder title="Supplier Comparison" activeTab="Material Management" />;
    case ROUTES.materialPurchaseOrders:
      return <Placeholder title="Purchase Orders" activeTab="Material Management" />;
    case ROUTES.materialDelivery:
      return <Placeholder title="Delivery Tracking" activeTab="Material Management" />;
    case ROUTES.materialConsumption:
      return <Placeholder title="Material Consumption" activeTab="Material Management" />;
    case ROUTES.materialReturns:
      return <Placeholder title="Material Returns" activeTab="Material Management" />;
    case ROUTES.materialSupplierPerformance:
      return <Placeholder title="Supplier Performance" activeTab="Material Management" />;
    case ROUTES.materialAnalytics:
      return <Placeholder title="Material Analytics" activeTab="Material Management" />;

    // Quotation Management sub-routes
    case ROUTES.quotationSeller:
      return <Placeholder title="Seller Quotations" activeTab="Quotation Management" />;
    case ROUTES.quotationCustomer:
      return <Placeholder title="Customer Quotations" activeTab="Quotation Management" />;
    case ROUTES.quotationRfq:
      return <Placeholder title="RFQ Listing" activeTab="Quotation Management" />;
    case ROUTES.quotationCreateRfq:
      return <Placeholder title="Create RFQ" activeTab="Quotation Management" />;
    case ROUTES.quotationApprovals:
      return <Placeholder title="Approval Queue" activeTab="Quotation Management" />;
    case ROUTES.quotationWinner:
      return <Placeholder title="Winner Selection" activeTab="Quotation Management" />;
    case ROUTES.quotationNegotiation:
      return <Placeholder title="Negotiation Center" activeTab="Quotation Management" />;
    case ROUTES.quotationOrders:
      return <Placeholder title="Purchase Orders" activeTab="Quotation Management" />;
    case ROUTES.quotationCostOptimization:
      return <Placeholder title="Cost Optimization" activeTab="Quotation Management" />;
    case ROUTES.quotationSellerPerformance:
      return <Placeholder title="Seller Performance" activeTab="Quotation Management" />;
    case ROUTES.quotationAnalytics:
      return <Placeholder title="Pricing Analytics" activeTab="Quotation Management" />;
    case ROUTES.quotationDisputes:
      return <Placeholder title="Disputes" activeTab="Quotation Management" />;
    case ROUTES.quotationReports:
      return <Placeholder title="Reports" activeTab="Quotation Management" />;

    // Wallet Management sub-routes
    case ROUTES.walletAll:
      return <Placeholder title="All Wallets" activeTab="Wallet Management" />;
    case ROUTES.walletUser:
      return <Placeholder title="User Wallets" activeTab="Wallet Management" />;
    case ROUTES.walletPartner:
      return <Placeholder title="Partner Wallets" activeTab="Wallet Management" />;
    case ROUTES.walletSeller:
      return <Placeholder title="Seller Wallets" activeTab="Wallet Management" />;
    case ROUTES.walletEmployee:
      return <Placeholder title="Employee Wallets" activeTab="Wallet Management" />;
    case ROUTES.walletTransactions:
      return <Placeholder title="Transactions" activeTab="Wallet Management" />;
    case ROUTES.walletRefunds:
      return <Placeholder title="Refunds" activeTab="Wallet Management" />;
    case ROUTES.walletPenalties:
      return <Placeholder title="Penalties" activeTab="Wallet Management" />;
    case ROUTES.walletFreeze:
      return <Placeholder title="Freeze Wallets" activeTab="Wallet Management" />;
    case ROUTES.walletFraud:
      return <Placeholder title="Fraud Monitoring" activeTab="Wallet Management" />;
    case ROUTES.walletAnalytics:
      return <Placeholder title="Wallet Analytics" activeTab="Wallet Management" />;
    case ROUTES.walletReconciliation:
      return <Placeholder title="Reconciliation" activeTab="Wallet Management" />;
    case ROUTES.walletEarnings:
      return <Placeholder title="Earnings Dashboard" activeTab="Wallet Management" />;

    // Banking & Settlements sub-routes
    case ROUTES.bankAccounts:
      return <Placeholder title="Bank Accounts" activeTab="Banking & Settlements" />;
    case ROUTES.bankBeneficiaries:
      return <Placeholder title="Beneficiaries" activeTab="Banking & Settlements" />;
    case ROUTES.bankUpi:
      return <Placeholder title="UPI Verification" activeTab="Banking & Settlements" />;
    case ROUTES.withdrawalRequests:
      return <Placeholder title="Withdrawal Requests" activeTab="Banking & Settlements" />;
    case ROUTES.withdrawalApprovals:
      return <Placeholder title="Withdrawal Approvals" activeTab="Banking & Settlements" />;
    case ROUTES.settlementQueue:
      return <Placeholder title="Settlement Queue" activeTab="Banking & Settlements" />;
    case ROUTES.bulkSettlements:
      return <Placeholder title="Bulk Settlements" activeTab="Banking & Settlements" />;
    case ROUTES.failedSettlements:
      return <Placeholder title="Failed Settlements" activeTab="Banking & Settlements" />;
    case ROUTES.payoutProcessing:
      return <Placeholder title="Payout Processing" activeTab="Banking & Settlements" />;
    case ROUTES.financeApprovals:
      return <Placeholder title="Finance Approvals" activeTab="Banking & Settlements" />;
    case ROUTES.bankingAnalytics:
      return <Placeholder title="Banking Analytics" activeTab="Banking & Settlements" />;
    case ROUTES.bankPerformance:
      return <Placeholder title="Bank Performance" activeTab="Banking & Settlements" />;

    // Revenue Management sub-routes
    case ROUTES.revenueDashboard:
      return <Placeholder title="Revenue Dashboard" activeTab="Revenue Management" />;
    case ROUTES.revenueOverview:
      return <Placeholder title="Revenue Overview" activeTab="Revenue Management" />;
    case ROUTES.revenueDaily:
      return <Placeholder title="Daily/Weekly/Monthly/Yearly Revenue" activeTab="Revenue Management" />;
    case ROUTES.revenuePartner:
      return <Placeholder title="Partner Revenue" activeTab="Revenue Management" />;
    case ROUTES.revenueSeller:
      return <Placeholder title="Seller Revenue" activeTab="Revenue Management" />;
    case ROUTES.revenueBranch:
      return <Placeholder title="Branch Revenue" activeTab="Revenue Management" />;
    case ROUTES.revenueEmployee:
      return <Placeholder title="Employee Revenue" activeTab="Revenue Management" />;
    case ROUTES.revenueService:
      return <Placeholder title="Service Revenue" activeTab="Revenue Management" />;
    case ROUTES.revenueProfitLoss:
      return <Placeholder title="Profit & Loss" activeTab="Revenue Management" />;
    case ROUTES.revenueExpenses:
      return <Placeholder title="Expenses" activeTab="Revenue Management" />;
    case ROUTES.revenueForecasting:
      return <Placeholder title="Revenue Forecasting" activeTab="Revenue Management" />;
    case ROUTES.revenueTargets:
      return <Placeholder title="Targets" activeTab="Revenue Management" />;
    case ROUTES.revenueExecutive:
      return <Placeholder title="Executive Dashboard" activeTab="Revenue Management" />;
    case ROUTES.revenueBI:
      return <Placeholder title="Business Intelligence Center" activeTab="Revenue Management" />;
    case ROUTES.revenueHealth:
      return <Placeholder title="Financial Health" activeTab="Revenue Management" />;

    // Referral Management sub-routes
    case ROUTES.referralDashboard:
      return <Placeholder title="Referral Dashboard" activeTab="Referral Management" />;
    case ROUTES.referralListing:
      return <Placeholder title="Referral Listing" activeTab="Referral Management" />;
    case ROUTES.referralCampaignDashboard:
      return <Placeholder title="Campaign Dashboard" activeTab="Referral Management" />;
    case ROUTES.referralCampaignListing:
      return <Placeholder title="Campaign Listing" activeTab="Referral Management" />;
    case ROUTES.referralCreateCampaign:
      return <Placeholder title="Create Campaign" activeTab="Referral Management" />;
    case ROUTES.referralRewardApprovals:
      return <Placeholder title="Reward Approval Queue" activeTab="Referral Management" />;
    case ROUTES.referralRewardSettlements:
      return <Placeholder title="Reward Settlements" activeTab="Referral Management" />;
    case ROUTES.referralConversionAnalytics:
      return <Placeholder title="Conversion Analytics" activeTab="Referral Management" />;
    case ROUTES.referralSources:
      return <Placeholder title="Referral Sources" activeTab="Referral Management" />;
    case ROUTES.referralLeaderboard:
      return <Placeholder title="Leaderboard" activeTab="Referral Management" />;
    case ROUTES.referralFraud:
      return <Placeholder title="Referral Fraud Detection" activeTab="Referral Management" />;
    case ROUTES.referralInvestigations:
      return <Placeholder title="Investigations" activeTab="Referral Management" />;
    case ROUTES.referralCoupons:
      return <Placeholder title="Coupon Management" activeTab="Referral Management" />;
    case ROUTES.referralQr:
      return <Placeholder title="QR Management" activeTab="Referral Management" />;

    // Notification Center sub-routes
    case ROUTES.notificationsPush:
      return <Placeholder title="Push Notifications" activeTab="Notification Center" />;
    case ROUTES.notificationsSms:
      return <Placeholder title="SMS Campaigns" activeTab="Notification Center" />;
    case ROUTES.notificationsWhatsapp:
      return <Placeholder title="WhatsApp Campaigns" activeTab="Notification Center" />;
    case ROUTES.notificationsEmail:
      return <Placeholder title="Email Campaigns" activeTab="Notification Center" />;
    case ROUTES.notificationsTemplates:
      return <Placeholder title="Notification Templates" activeTab="Notification Center" />;
    case ROUTES.notificationsAudience:
      return <Placeholder title="Audience Segments" activeTab="Notification Center" />;
    case ROUTES.notificationsScheduled:
      return <Placeholder title="Scheduled Campaigns" activeTab="Notification Center" />;
    case ROUTES.notificationsAutomation:
      return <Placeholder title="Automation Rules" activeTab="Notification Center" />;
    case ROUTES.notificationsDelivery:
      return <Placeholder title="Delivery Reports" activeTab="Notification Center" />;

    // Banner Management sub-routes
    case ROUTES.bannersHomepage:
      return <Placeholder title="Homepage Banners" activeTab="Banner Management" />;
    case ROUTES.bannersOffer:
      return <Placeholder title="Offer Banners" activeTab="Banner Management" />;
    case ROUTES.bannersCategory:
      return <Placeholder title="Category Banners" activeTab="Banner Management" />;
    case ROUTES.bannersPopup:
      return <Placeholder title="Popup Banners" activeTab="Banner Management" />;
    case ROUTES.bannersScheduling:
      return <Placeholder title="Banner Scheduling" activeTab="Banner Management" />;
    case ROUTES.bannersAnalytics:
      return <Placeholder title="Banner Analytics" activeTab="Banner Management" />;

    // CMS Management sub-routes
    case ROUTES.cmsAboutUs:
      return <Placeholder title="About Us" activeTab="CMS Management" />;
    case ROUTES.cmsTerms:
      return <Placeholder title="Terms & Conditions" activeTab="CMS Management" />;
    case ROUTES.cmsPrivacy:
      return <Placeholder title="Privacy Policy" activeTab="CMS Management" />;
    case ROUTES.cmsRefund:
      return <Placeholder title="Refund Policy" activeTab="CMS Management" />;
    case ROUTES.cmsContactUs:
      return <Placeholder title="Contact Us" activeTab="CMS Management" />;
    case ROUTES.cmsFaqs:
      return <Placeholder title="FAQs" activeTab="CMS Management" />;
    case ROUTES.cmsBlogs:
      return <Placeholder title="Blogs" activeTab="CMS Management" />;
    case ROUTES.cmsSeo:
      return <Placeholder title="SEO Settings" activeTab="CMS Management" />;

    // Reviews & Ratings sub-routes
    case ROUTES.reviewsUser:
      return <Placeholder title="User Reviews" activeTab="Reviews & Ratings" />;
    case ROUTES.reviewsPartner:
      return <Placeholder title="Partner Reviews" activeTab="Reviews & Ratings" />;
    case ROUTES.reviewsEmployee:
      return <Placeholder title="Employee Reviews" activeTab="Reviews & Ratings" />;
    case ROUTES.reviewsModeration:
      return <Placeholder title="Review Moderation" activeTab="Reviews & Ratings" />;
    case ROUTES.reviewsAnalytics:
      return <Placeholder title="Rating Analytics" activeTab="Reviews & Ratings" />;

    // SOS Management sub-routes
    case ROUTES.sosActive:
      return <Placeholder title="Active SOS" activeTab="SOS Management" />;
    case ROUTES.sosResolved:
      return <Placeholder title="Resolved SOS" activeTab="SOS Management" />;
    case ROUTES.sosEscalated:
      return <Placeholder title="Escalated SOS" activeTab="SOS Management" />;
    case ROUTES.sosTracking:
      return <Placeholder title="Emergency Tracking" activeTab="SOS Management" />;
    case ROUTES.sosIncidentReports:
      return <Placeholder title="Incident Reports" activeTab="SOS Management" />;

    // Support Center sub-routes
    case ROUTES.supportAll:
      return <Placeholder title="All Tickets" activeTab="Support Center" />;
    case ROUTES.supportOpen:
      return <Placeholder title="Open Tickets" activeTab="Support Center" />;
    case ROUTES.supportInProgress:
      return <Placeholder title="In Progress Tickets" activeTab="Support Center" />;
    case ROUTES.supportEscalated:
      return <Placeholder title="Escalated Tickets" activeTab="Support Center" />;
    case ROUTES.supportClosed:
      return <Placeholder title="Closed Tickets" activeTab="Support Center" />;
    case ROUTES.supportBookingIssues:
      return <Placeholder title="Booking Issues" activeTab="Support Center" />;
    case ROUTES.supportPaymentIssues:
      return <Placeholder title="Payment Issues" activeTab="Support Center" />;
    case ROUTES.supportWalletIssues:
      return <Placeholder title="Wallet Issues" activeTab="Support Center" />;
    case ROUTES.supportTechnicalIssues:
      return <Placeholder title="Technical Issues" activeTab="Support Center" />;
    case ROUTES.supportKycIssues:
      return <Placeholder title="KYC Issues" activeTab="Support Center" />;
    case ROUTES.supportSla:
      return <Placeholder title="SLA Monitoring" activeTab="Support Center" />;
    case ROUTES.supportAnalytics:
      return <Placeholder title="Support Analytics" activeTab="Support Center" />;

    // Fraud Management routing cases
    case ROUTES.fraudDashboard:
    case ROUTES.fraudUser:
    case ROUTES.fraudPartner:
    case ROUTES.fraudWallet:
    case ROUTES.fraudBooking:
    case ROUTES.fraudInvestigations:
    case ROUTES.fraudRisk:
    case ROUTES.blacklistManagement:
      return <FraudCenter />;

    // Reports & Analytics landing and sub-routes
    case ROUTES.reportsOperational:
    case ROUTES.reportsBooking:
    case ROUTES.reportsUser:
    case ROUTES.reportsPartner:
    case ROUTES.reportsEmployee:
    case ROUTES.reportsFinancial:
    case ROUTES.reportsRevenue:
    case ROUTES.reportsWallet:
    case ROUTES.reportsSettlement:
    case ROUTES.reportsMarketing:
    case ROUTES.reportsReferral:
    case ROUTES.reportsCampaign:
    case ROUTES.exportCenter:
      return <Analytics />;

    // Role & Permission admin sub-routes
    case ROUTES.rolePermissions:
      return <Placeholder title="All Roles" activeTab="Role & Permission" />;
    case ROUTES.createRole:
      return <Placeholder title="Create Role" activeTab="Role & Permission" />;
    case ROUTES.permissionMatrix:
      return <Placeholder title="Permission Matrix" activeTab="Role & Permission" />;
    case ROUTES.moduleAccess:
      return <Placeholder title="Module Access" activeTab="Role & Permission" />;
    case ROUTES.actionPermissions:
      return <Placeholder title="Action Permissions" activeTab="Role & Permission" />;
    case ROUTES.userAccessLogs:
      return <Placeholder title="User Access Logs" activeTab="Role & Permission" />;
    case ROUTES.roleAuditLogs:
      return <Placeholder title="Role Audit Logs" activeTab="Role & Permission" />;

    // Settings sub-routes
    case ROUTES.settingsPlatformGeneral:
      return <Placeholder title="Platform General Settings" activeTab="Settings" />;
    case ROUTES.settingsPlatformConfig:
      return <Placeholder title="Platform Configuration" activeTab="Settings" />;
    case ROUTES.settingsFinancialCommission:
      return <Placeholder title="Commission Settings" activeTab="Settings" />;
    case ROUTES.settingsFinancialTax:
      return <Placeholder title="Tax Settings" activeTab="Settings" />;
    case ROUTES.settingsFinancialWallet:
      return <Placeholder title="Wallet Settings" activeTab="Settings" />;
    case ROUTES.settingsFinancialSettlement:
      return <Placeholder title="Settlement Settings" activeTab="Settings" />;
    case ROUTES.settingsIntegrationPayment:
      return <Placeholder title="Payment Gateway Integration" activeTab="Settings" />;
    case ROUTES.settingsIntegrationSms:
      return <Placeholder title="SMS Gateway Integration" activeTab="Settings" />;
    case ROUTES.settingsIntegrationWhatsapp:
      return <Placeholder title="WhatsApp API Integration" activeTab="Settings" />;
    case ROUTES.settingsIntegrationEmail:
      return <Placeholder title="Email SMTP Integration" activeTab="Settings" />;
    case ROUTES.settingsIntegrationGoogleMaps:
      return <Placeholder title="Google Maps API Integration" activeTab="Settings" />;
    case ROUTES.settingsSecurityGeneral:
      return <Placeholder title="Security Settings" activeTab="Settings" />;
    case ROUTES.settingsSecurityPassword:
      return <Placeholder title="Password Policies" activeTab="Settings" />;
    case ROUTES.settingsSecuritySession:
      return <Placeholder title="Session Management" activeTab="Settings" />;
    case ROUTES.settingsSecurityAudit:
      return <Placeholder title="Audit Logs" activeTab="Settings" />;
    case ROUTES.settingsSystemBackup:
      return <Placeholder title="Backup Management" activeTab="Settings" />;
    case ROUTES.settingsSystemMaintenance:
      return <Placeholder title="Maintenance Mode" activeTab="Settings" />;
    case ROUTES.settingsSystemLogs:
      return <Placeholder title="System Logs" activeTab="Settings" />;

    default:
      return <RoleSelection />;
  }
}
