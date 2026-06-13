# Hozify Admin — Complete Restructuring Analysis & Implementation Plan

---

## 1. Current Project Architecture Analysis

### 1.1 Folder Structure
```
src/
├── app/
│   ├── App.jsx
│   ├── providers/
│   │   └── AppProvider.jsx          ← Global state: route, session, theme, currentPartnerId, currentBranchId
│   └── router/
│       └── Router.jsx               ← Custom switch-based router (NOT react-router)
├── components/
│   ├── common/
│   │   └── Requirement.jsx
│   ├── layouts/
│   │   ├── AdminShell.jsx           ← Shared sidebar + header layout
│   │   └── PublicShell.jsx          ← Login/public layout wrapper
│   └── ui/                          ← (empty — no shared UI components extracted yet)
├── config/
│   ├── routes.js                    ← ROUTES constant object (64 route strings)
│   └── storageKeys.js
├── constants/
│   ├── roles.jsx
│   └── validation.js
├── data/
│   └── dashboardData.jsx
├── features/
│   └── dashboard/                   ← (empty shell — no feature files)
├── hooks/
│   └── useApp.js                    ← AppContext consumer
├── pages/
│   ├── AddBanking/           index.jsx
│   ├── AddServices/          index.jsx
│   ├── Analytics/            index.jsx
│   ├── ApprovalQueue/        index.jsx
│   ├── Branches/             index.jsx + 10 sub-components
│   ├── Business/             index.jsx + 9 sub-components
│   ├── CommunicationsCenter/ index.jsx
│   ├── Dashboard/            index.jsx
│   ├── Employees/            index.jsx + 10 sub-components
│   ├── ForgotPassword/       index.jsx
│   ├── FraudCenter/          index.jsx
│   ├── Login/                index.jsx
│   ├── OnboardingAddress/    index.jsx
│   ├── OtpVerification/      index.jsx
│   ├── PartnerDetails/       index.jsx
│   ├── Partners/             index.jsx
│   ├── PasswordResetSuccess/ index.jsx
│   ├── Placeholder/          index.jsx
│   ├── RegisterPartner/      index.jsx
│   ├── ResetPassword/        index.jsx
│   ├── RoleSelection/        index.jsx
│   ├── ServiceAreas/         index.jsx
│   ├── Services/             index.jsx + 12 sub-components
│   ├── Settlements/          index.jsx
│   └── Users/                index.jsx
├── services/
│   └── authStorage.js
├── styles.css                        ← All CSS (85KB monolithic file)
└── utils/
    └── validation.js
```

### 1.2 Routing Architecture
The project uses a **custom switch-based router** (NOT React Router / Next.js).
- `AppProvider` manages `route` state with a `navigate(path)` function.
- `Router.jsx` does a `switch(route)` and renders the matching page component.
- All routes are defined as string constants in `config/routes.js`.
- **No URL bar routing** — all navigation is in-memory state.

**Current Route Inventory (64 routes):**

| Route Key | Path | Renders |
|---|---|---|
| `roles` | `/roles` | RoleSelection |
| `login` | `/login` | Login |
| `forgotPassword` | `/forgot-password` | ForgotPassword |
| `otpVerification` | `/otp-verification` | OtpVerification |
| `resetPassword` | `/reset-password` | ResetPassword |
| `passwordResetSuccess` | `/password-reset-success` | PasswordResetSuccess |
| `dashboard` | `/dashboard` | Dashboard |
| `partners` | `/partners` | Partners |
| `partnerDetails` | `/partner-details` | PartnerDetails |
| `addPartner` | `/partners/add` | RegisterPartner |
| `onboardingAddress` | `/partners/onboarding-address` | OnboardingAddress |
| `addServices` | `/partners/add-services` | AddServices |
| `addBanking` | `/partners/add-banking` | AddBanking |
| `approvalQueue` | `/partners/approval-queue` | ApprovalQueue |
| `fraudCenter` | `/fraud-detection` | FraudCenter |
| `communications` | `/communications` | CommunicationsCenter |
| `settlements` | `/settlements` | Settlements |
| `analytics` | `/analytics` | Analytics |
| `users` | `/users` | Users |
| `kyc` | `/kyc` | KycQueue (in Employees/) |
| `business` | `/business` | BusinessRegistry |
| `businessApproval` | `/business/approval` | BusinessRegistry |
| `businessDetails` | `/business/details` | BusinessDetails |
| `businessReview` | `/business/review` | BusinessReview |
| `businessVerify` | `/business/verify` | BusinessVerify |
| `businessSuspension` | `/business/suspension` | BusinessSuspension |
| `businessRisk` | `/business/risk-management` | BusinessRisk |
| `addBusiness` | `/business/add` | AddBusiness |
| `businessDocReview` | `/business/review/document` | BusinessDocReview |
| `businessTaxonomy` | `/business/taxonomy` | BusinessTaxonomy |
| `branches` | `/branches` | Branches |
| `branchPerformance` | `/branches/performance` | Branches (defaultTab="Performance") |
| `branchApproval` | `/branches/approval` | Branches (defaultTab="ApprovalQueue") |
| `branchAnalytics` | `/branches/analytics` | Branches (defaultTab="Analytics") |
| `branchSchedule` | `/branches/schedule` | BranchSchedule |
| `branchSuspend` | `/branches/suspend` | BranchSuspend |
| `branchCompliance` | `/branches/compliance` | Branches (defaultTab="Compliance") |
| `addBranch` | `/branches/add` | AddBranch |
| `branchProfile` | `/branches/profile` | BranchProfile |
| `branchManagerAssignment` | `/branches/assign-manager` | ManagerAssignment |
| `serviceAreas` | `/service-areas` | ServiceAreas |
| `services` | `/services` | Services (multi-tab) |
| `employees` | `/employees` | Employees (multi-tab) |
| `performance` | `/performance` | Employees (tab=Performance) |
| `reports` | `/reports` | Employees (tab=Reports) |
| `attendance` | `/attendance` | Employees (tab=Attendance) |
| `leaveManagement` | `/leave-management` | Employees (tab=LeaveManagement) |
| `bookings` | `/bookings` | Placeholder |
| `liveTracking` | `/live-tracking` | Placeholder |
| `materials` | `/materials` | Placeholder |
| `quotations` | `/quotations` | Placeholder |
| `wallet` | `/wallet` | Placeholder |
| `banking` | `/banking` | Placeholder |
| `revenue` | `/revenue` | Placeholder |
| `referrals` | `/referrals` | Placeholder |
| `notifications` | `/notifications` | Placeholder |
| `banners` | `/banners` | Placeholder |
| `cms` | `/cms` | Placeholder |
| `reviews` | `/reviews` | Placeholder |
| `sos` | `/sos` | Placeholder |
| `support` | `/support` | Placeholder |
| `settings` | `/settings` | Placeholder |

### 1.3 Current Sidebar Structure
The current sidebar in `AdminShell.jsx` is a **flat (non-hierarchical) navigation list** — no dropdowns, no submenus.

**Current sidebar items (in order):**
1. Dashboard
2. Users
3. Partners
4. KYC
5. Business
6. Analytics
7. Branches
8. Service Areas
9. Services
10. Employees
11. Bookings
12. Live Tracking
13. Materials
14. Quotations
15. Wallet
16. Banking
17. Revenue
18. Referrals
19. Communications
20. Banners
21. CMS
22. Reviews
23. SOS
24. Support

**Bottom items:** Roles, Settings

### 1.4 Current Module Structure

| Module | Pages / Sub-Components |
|---|---|
| Auth | Login, ForgotPassword, OtpVerification, ResetPassword, PasswordResetSuccess, RoleSelection |
| Dashboard | Dashboard/index.jsx |
| Users | Users/index.jsx |
| Partners | Partners, PartnerDetails, RegisterPartner, OnboardingAddress, AddServices, AddBanking, ApprovalQueue |
| KYC | Employees/KycQueue.jsx (⚠️ WRONG — KYC is under Employees module folder) |
| Business | Business/index, BusinessDetails, BusinessReview, BusinessVerify, BusinessSuspension, BusinessRisk, AddBusiness, BusinessDocReview, BusinessTaxonomy |
| Branches | Branches/index, BranchPerformance, BranchApproval, BranchAnalytics, BranchCompliance, BranchSchedule, BranchSuspend, AddBranch, BranchProfile, ManagerAssignment, BranchInventory |
| Services | Services/index, ServicesList, ServiceCategories, ZoneAnalysis, NewServiceWizard, ServiceProfile, ApprovalsList, ApprovalDetails, ServiceDashboard, PricingStrategy, FeaturedManagement, ComparisonHub, MediaLibrary |
| Employees | Employees/index, EmployeeOverview, EmployeeWorkforce, EmployeeProfile, AvailabilityBoard, AddEmployee, PerformanceDashboard, EmployeeReports, AttendanceDashboard, LeaveManagement, KycQueue |
| Fraud | FraudCenter/index.jsx |
| Settlements | Settlements/index.jsx |
| Analytics | Analytics/index.jsx |
| Communications | CommunicationsCenter/index.jsx |
| ServiceAreas | ServiceAreas/index.jsx (⚠️ WRONG — should be under Branches or Services) |
| Placeholders | Bookings, LiveTracking, Materials, Quotations, Wallet, Banking, Revenue, Referrals, Notifications, Banners, CMS, Reviews, SOS, Support, Settings |

---

## 2. Sidebar Analysis

### 2.1 Current vs. Target Sidebar — Full Diff

| # | Target Module (from LEFT SIDEBAR STRUCTURE.docx) | Current Status |
|---|---|---|
| 1 | **Dashboard** (dropdown: Overview, Revenue Dashboard, Booking Analytics, User Analytics, Partner Analytics, Approval Dashboard, Activity Center, System Health) | ⚠️ Exists as single flat item, no dropdown |
| 2 | **User Management** (dropdown: Users > All Users, Add User, User Approvals, Blocked Users / Operations > User Wallets, User Referrals, User Documents, User Complaints, User Reviews / Monitoring > User Timeline, User Activity Logs, User Fraud Monitoring, User Audit Logs) | ⚠️ Exists as flat "Users" item, no dropdown |
| 3 | **Partner Management** (dropdown: Partners > All Partners, Add Partner, ISP Partners, BSP Partners, Business Sellers / Approvals > Partner Approvals, KYC Approvals, Service Approvals, Branch Approvals / Operations > Partner Wallets, Partner Banking, Partner Employees, Partner Branches, Partner Services / Monitoring > Partner Reviews, Partner Revenue, Partner Fraud Monitoring, Partner Audit Logs) | ⚠️ Exists as flat "Partners" item, no dropdown |
| 4 | **KYC Management** (dropdown: Pending KYC, Approved KYC, Rejected KYC, Reupload Requests, Aadhaar Verification, PAN Verification, GST Verification, Driving License Verification, Voter ID Verification, Selfie Verification, Face Match Verification, Video KYC Verification, Risk Assessment, Manual Investigation, Reviewer Management, KYC Analytics, Audit Logs) | ⚠️ Exists as flat "KYC" item, KycQueue.jsx is inside Employees/ |
| 5 | **Business Management** (dropdown: All Businesses, Add Business, Business Approvals, GST Verification, PAN Verification, Registration Verification, Ownership Verification, Business Branches, Business Services, Business Employees, Business Revenue, Business Reviews, Compliance Center, Fraud Investigation, Audit Logs) | ⚠️ Exists as flat "Business" item, no dropdown |
| 6 | **Branch Management** (dropdown: All Branches, Add Branch, Branch Approvals, Branch Services, Branch Employees, Branch Bookings, Branch Revenue, Service Areas, Coverage Mapping, Availability Calendar, Branch Reviews, Branch Performance, Compliance Center, Audit Logs) | ⚠️ Exists as flat "Branches" item + separate "Service Areas" flat item |
| 7 | **Service Management** (dropdown: Categories, Sub Categories, All Services, Add Service, Service Approvals, Pricing Management, Commission Management, Service Areas, Coverage Mapping, Service Performance, Service Analytics, Featured Services, Media Library, Audit Logs) | ⚠️ Exists as flat "Services" item, no dropdown |
| 8 | **Employee Management** (dropdown: All Employees, Add Employee, Branch Managers, Assignments, Availability Board, Attendance, Leave Management, Employee Documents, Employee KYC, Performance Dashboard, Ratings & Reviews, Earnings, Employee Analytics, Audit Logs) | ⚠️ Exists as flat "Employees" item, no dropdown |
| 9 | **Booking Management** (dropdown: All Bookings, Create Booking, Status Based [Pending/Assigned/Accepted/In Progress/Material Pending/Quotation Pending/OTP Pending/Completed/Cancelled/Refunded/Escalated/Disputed] / Operations > Assignment Center, OTP Verification, Booking Calendar, Booking Map View / Finance > Payments, Invoices, Refunds / Monitoring > SLA Monitoring, Booking Analytics, Fraud Detection / Archive) | ⚠️ Exists as flat "Bookings" (Placeholder) |
| 10 | **Live Tracking** (dropdown: Live Dashboard, Operations Map, Active Jobs, Employee Tracking, Route Tracking, ETA Monitoring, Delay Monitoring, Geofence Management, Geofence Logs, Movement History, Heatmaps, SOS Tracking, Tracking Analytics) | ⚠️ Exists as flat "Live Tracking" (Placeholder) |
| 11 | **Material Management** (dropdown: Material Requests, Create Request, Approval Queue, Inventory Dashboard, Inventory Listing, Material Categories, Restocking, Vendor Recommendations, Supplier Comparison, Purchase Orders, Delivery Tracking, Material Consumption, Material Returns, Supplier Performance, Material Analytics) | ⚠️ Exists as flat "Materials" (Placeholder) |
| 12 | **Quotation Management** (dropdown: Seller Quotations, Customer Quotations, RFQ Listing, Create RFQ, Approval Queue, Winner Selection, Negotiation Center, Purchase Orders, Cost Optimization, Seller Performance, Pricing Analytics, Disputes, Reports) | ⚠️ Exists as flat "Quotations" (Placeholder) |
| 13 | **Wallet Management** (dropdown: All Wallets, User Wallets, Partner Wallets, Seller Wallets, Employee Wallets, Transactions, Refunds, Penalties, Settlements, Freeze Wallets, Fraud Monitoring, Chargebacks, Wallet Analytics, Earnings Dashboard, Reconciliation) | ⚠️ Exists as flat "Wallet" (Placeholder); Settlements is a separate flat item |
| 14 | **Banking & Settlements** (dropdown: Bank Accounts, Beneficiaries, UPI Verification, Withdrawal Requests, Withdrawal Approvals, Settlement Queue, Bulk Settlements, Failed Settlements, Reconciliation, Payout Processing, Finance Approvals, Banking Analytics, Bank Performance) | ⚠️ Exists as flat "Banking" (Placeholder); Settlements is separate |
| 15 | **Revenue Management** (dropdown: Revenue Dashboard, Revenue Overview, Daily/Weekly/Monthly/Yearly Revenue, Partner Revenue, Seller Revenue, Branch Revenue, Employee Revenue, Service Revenue, Profit & Loss, Expenses, Revenue Forecasting, Targets, Executive Dashboard, Business Intelligence Center, Financial Health) | ⚠️ Exists as flat "Revenue" (Placeholder) |
| 16 | **Referral Management** (dropdown: Referral Dashboard, Referral Listing, Campaign Dashboard, Campaign Listing, Create Campaign, Reward Approval Queue, Reward Settlements, Conversion Analytics, Referral Sources, Leaderboard, Referral Fraud Detection, Investigations, Coupon Management, QR Management) | ⚠️ Exists as flat "Referrals" (Placeholder) |
| 17 | **Notification Center** (dropdown: Push Notifications, SMS Campaigns, WhatsApp Campaigns, Email Campaigns, Notification Templates, Audience Segments, Scheduled Campaigns, Automation Rules, Delivery Reports) | ⚠️ Exists as flat "Communications" item (page exists: CommunicationsCenter) |
| 18 | **Banner Management** (dropdown: Homepage Banners, Offer Banners, Category Banners, Popup Banners, Banner Scheduling, Banner Analytics) | ⚠️ Exists as flat "Banners" (Placeholder) |
| 19 | **CMS Management** (dropdown: About Us, Terms & Conditions, Privacy Policy, Refund Policy, Contact Us, FAQs, Blogs, SEO Settings) | ⚠️ Exists as flat "CMS" (Placeholder) |
| 20 | **Reviews & Ratings** (dropdown: User Reviews, Partner Reviews, Employee Reviews, Review Moderation, Rating Analytics) | ⚠️ Exists as flat "Reviews" (Placeholder) |
| 21 | **SOS Management** (dropdown: Active SOS, Resolved SOS, Escalated SOS, Emergency Tracking, Incident Reports) | ⚠️ Exists as flat "SOS" (Placeholder) |
| 22 | **Support Center** (dropdown: All Tickets, Open Tickets, In Progress Tickets, Escalated Tickets, Closed Tickets, Booking Issues, Payment Issues, Wallet Issues, Technical Issues, KYC Issues, SLA Monitoring, Support Analytics) | ⚠️ Exists as flat "Support" (Placeholder) |
| 23 | **Fraud Management** (dropdown: Fraud Dashboard, User Fraud, Partner Fraud, Wallet Fraud, Booking Fraud, Investigations, Risk Scoring, Blacklist Management) | ⚠️ Exists as flat-linked FraudCenter page but NOT in sidebar |
| 24 | **Reports & Analytics** (dropdown: Operational Reports, Booking Reports, User Reports, Partner Reports, Employee Reports, Financial Reports, Revenue Reports, Wallet Reports, Settlement Reports, Marketing Reports, Referral Reports, Campaign Reports, Export Center, PDF/Excel/CSV Exports) | ⚠️ Exists as flat "Analytics" item (Analytics page exists); no dropdown |
| 25 | **Role & Permission** (dropdown: All Roles, Create Role, Permission Matrix, Module Access, Action Permissions, User Access Logs, Role Audit Logs) | ⚠️ Bottom nav has "Roles" (goes to RoleSelection — auth screen, NOT admin screen) |
| 26 | **Settings** (dropdown: Platform > General Settings, Platform Configuration / Financial > Commission Settings, Tax Settings, Wallet Settings, Settlement Settings / Integrations > Payment Gateway, SMS Gateway, WhatsApp API, Email SMTP, Google Maps API / Security > Security Settings, Password Policies, Session Management, Audit Logs / System > Backup Management, Maintenance Mode, System Logs) | ⚠️ Exists as flat "Settings" (Placeholder) |

### 2.2 Key Sidebar Changes Required
1. **Rebuild `AdminShell.jsx` sidebar** from flat list → collapsible grouped dropdowns
2. **Rename items** to match target labels (e.g., "Communications" → "Notification Center")
3. **Move "Service Areas"** from top-level sidebar item → into Branch Management dropdown
4. **Add "Fraud Management"** as top-level sidebar module (currently accessible only via routes)
5. **Add "Reports & Analytics"** as top-level sidebar module (currently "Analytics")
6. **Add "Role & Permission"** as admin module (currently "Roles" goes to auth screen)
7. **Move "Analytics"** sub-links into "Reports & Analytics" dropdown
8. **Move "Settlements"** into Wallet Management dropdown
9. **KYC Management** becomes its own top-level module

---

## 3. Module Mapping Analysis

### 3.1 Page-to-Module Mapping

| Existing Page/Component | Current Module | Target Module | Action |
|---|---|---|---|
| `Dashboard/index.jsx` | Dashboard | Dashboard | ✅ Keep, add sub-routes for sub-dashboards |
| `Users/index.jsx` | Users | User Management | ✅ Keep, expose sub-items from sidebar dropdown |
| `Partners/index.jsx` | Partners | Partner Management → Partners → All Partners | ✅ Keep |
| `PartnerDetails/index.jsx` | Partners | Partner Management → Partners | ✅ Keep |
| `RegisterPartner/index.jsx` | Partners | Partner Management → Partners → Add Partner | ✅ Keep |
| `OnboardingAddress/index.jsx` | Partners | Partner Management → Partners (onboarding sub-step) | ✅ Keep as step in RegisterPartner flow |
| `AddServices/index.jsx` | Partners | Partner Management → Partner Services | ✅ Keep as sub-step in partner onboarding |
| `AddBanking/index.jsx` | Partners | Partner Management → Partner Banking | ✅ Keep as sub-step in partner onboarding |
| `ApprovalQueue/index.jsx` | Partners | Partner Management → Approvals → Partner Approvals | ⚠️ Rename + reassign route |
| `Employees/KycQueue.jsx` | Employees | KYC Management (own module) | ⚠️ Move + create new KYC module page |
| `FraudCenter/index.jsx` | (orphan route) | Fraud Management | ⚠️ Add to sidebar under Fraud Management |
| `Settlements/index.jsx` | (flat item) | Wallet Management → Settlements | ⚠️ Move route under wallet; keep page |
| `Analytics/index.jsx` | Analytics | Reports & Analytics | ⚠️ Rename module label in sidebar |
| `CommunicationsCenter/index.jsx` | Communications | Notification Center | ⚠️ Rename in sidebar; route change optional |
| `Business/index.jsx` | Business | Business Management → All Businesses | ✅ Keep |
| `Business/AddBusiness.jsx` | Business | Business Management → Add Business | ✅ Keep |
| `Business/BusinessDetails.jsx` | Business | Business Management | ✅ Keep |
| `Business/BusinessReview.jsx` | Business | Business Management → Business Approvals | ✅ Keep |
| `Business/BusinessVerify.jsx` | Business | Business Management → GST/PAN/Registration Verification | ✅ Keep |
| `Business/BusinessSuspension.jsx` | Business | Business Management | ✅ Keep |
| `Business/BusinessRisk.jsx` | Business | Business Management → Fraud Investigation | ✅ Keep |
| `Business/BusinessDocReview.jsx` | Business | Business Management → Ownership Verification | ✅ Keep |
| `Business/BusinessTaxonomy.jsx` | Business | Business Management (categories) | ✅ Keep |
| `Branches/index.jsx` (multi-tab) | Branches | Branch Management → All Branches | ✅ Keep |
| `Branches/BranchInventory.jsx` | Branches | Branch Management → All Branches | ✅ Keep |
| `Branches/BranchApproval.jsx` | Branches | Branch Management → Branch Approvals | ✅ Keep |
| `Branches/BranchPerformance.jsx` | Branches | Branch Management → Branch Performance | ✅ Keep |
| `Branches/BranchAnalytics.jsx` | Branches | Branch Management → Branch Revenue | ✅ Keep |
| `Branches/BranchCompliance.jsx` | Branches | Branch Management → Compliance Center | ✅ Keep |
| `Branches/BranchSchedule.jsx` | Branches | Branch Management → Availability Calendar | ✅ Keep |
| `Branches/BranchSuspend.jsx` | Branches | Branch Management | ✅ Keep |
| `Branches/AddBranch.jsx` | Branches | Branch Management → Add Branch | ✅ Keep |
| `Branches/BranchProfile.jsx` | Branches | Branch Management | ✅ Keep |
| `Branches/ManagerAssignment.jsx` | Branches | Branch Management | ✅ Keep |
| `ServiceAreas/index.jsx` | (Top-level flat) | Branch Management → Service Areas | ⚠️ Move sidebar item from top-level to Branch dropdown |
| `Services/index.jsx` (multi-tab) | Services | Service Management | ✅ Keep |
| `Services/ServicesList.jsx` | Services | Service Management → All Services | ✅ Keep |
| `Services/ServiceCategories.jsx` | Services | Service Management → Categories | ✅ Keep |
| `Services/ZoneAnalysis.jsx` | Services | Service Management → Coverage Mapping / Service Areas | ✅ Keep |
| `Services/NewServiceWizard.jsx` | Services | Service Management → Add Service | ✅ Keep |
| `Services/ServiceProfile.jsx` | Services | Service Management | ✅ Keep |
| `Services/ApprovalsList.jsx` | Services | Service Management → Service Approvals | ✅ Keep |
| `Services/ApprovalDetails.jsx` | Services | Service Management → Service Approvals | ✅ Keep |
| `Services/ServiceDashboard.jsx` | Services | Service Management → Service Performance | ✅ Keep |
| `Services/PricingStrategy.jsx` | Services | Service Management → Pricing Management | ✅ Keep |
| `Services/FeaturedManagement.jsx` | Services | Service Management → Featured Services | ✅ Keep |
| `Services/ComparisonHub.jsx` | Services | Service Management → Service Analytics | ✅ Keep |
| `Services/MediaLibrary.jsx` | Services | Service Management → Media Library | ✅ Keep |
| `Employees/index.jsx` | Employees | Employee Management | ✅ Keep |
| `Employees/EmployeeOverview.jsx` | Employees | Employee Management (Dashboard) | ✅ Keep |
| `Employees/EmployeeWorkforce.jsx` | Employees | Employee Management → All Employees | ✅ Keep |
| `Employees/EmployeeProfile.jsx` | Employees | Employee Management | ✅ Keep |
| `Employees/AvailabilityBoard.jsx` | Employees | Employee Management → Availability Board | ✅ Keep |
| `Employees/AddEmployee.jsx` | Employees | Employee Management → Add Employee | ✅ Keep |
| `Employees/PerformanceDashboard.jsx` | Employees | Employee Management → Performance Dashboard | ✅ Keep |
| `Employees/EmployeeReports.jsx` | Employees | Employee Management → Employee Analytics | ✅ Keep |
| `Employees/AttendanceDashboard.jsx` | Employees | Employee Management → Attendance | ✅ Keep |
| `Employees/LeaveManagement.jsx` | Employees | Employee Management → Leave Management | ✅ Keep |
| `Placeholder` (Bookings) | — | Booking Management | ✅ Keep as placeholder |
| `Placeholder` (Live Tracking) | — | Live Tracking | ✅ Keep as placeholder |
| `Placeholder` (Materials) | — | Material Management | ✅ Keep as placeholder |
| `Placeholder` (Quotations) | — | Quotation Management | ✅ Keep as placeholder |
| `Placeholder` (Wallet) | — | Wallet Management | ✅ Keep as placeholder |
| `Placeholder` (Banking) | — | Banking & Settlements | ✅ Keep as placeholder |
| `Placeholder` (Revenue) | — | Revenue Management | ✅ Keep as placeholder |
| `Placeholder` (Referrals) | — | Referral Management | ✅ Keep as placeholder |
| `Placeholder` (Notifications) | — | Notification Center | ✅ Keep as placeholder |
| `Placeholder` (Banners) | — | Banner Management | ✅ Keep as placeholder |
| `Placeholder` (CMS) | — | CMS Management | ✅ Keep as placeholder |
| `Placeholder` (Reviews) | — | Reviews & Ratings | ✅ Keep as placeholder |
| `Placeholder` (SOS) | — | SOS Management | ✅ Keep as placeholder |
| `Placeholder` (Support) | — | Support Center | ✅ Keep as placeholder |
| `Placeholder` (Settings) | — | Settings | ✅ Keep as placeholder |

### 3.2 Incorrectly Placed Pages

| Page | Issue | Fix |
|---|---|---|
| `Employees/KycQueue.jsx` | KYC module lives inside Employees folder | Create `/kyc` module route → KYC Management |
| `ServiceAreas/index.jsx` | Appears as a top-level sidebar item | Remove from sidebar top-level; place under Branch Management dropdown |
| `Settlements/index.jsx` | Separate top-level flat item | Keep the route/page; move sidebar entry under Wallet Management dropdown |
| `FraudCenter/index.jsx` | Route exists but not in sidebar | Add to sidebar under Fraud Management dropdown |
| `Analytics/index.jsx` | Sidebar label "Analytics" doesn't match target "Reports & Analytics" | Rename sidebar entry; assign under Reports & Analytics |
| `CommunicationsCenter/index.jsx` | Sidebar label "Communications" doesn't match target "Notification Center" | Rename sidebar entry |
| `RoleSelection` | Bottom-nav "Roles" leads to auth role picker | Create a separate "Role & Permission" admin page/placeholder |

---

## 4. Flow Analysis

### 4.1 Flow Document Coverage
The Flow Document covers **Modules 04, 06, 07, 08, 09** in detail:
- **Module 04**: Partner Management
- **Module 06**: Business Management
- **Module 07**: Branch Management
- **Module 08**: Service Management
- **Module 09**: Employee Management

> **Modules 01, 02, 03, 05, 10–26** are **not** detailed in the Flow Document but are fully defined in the Left Sidebar Structure document.

### 4.2 Navigation Gaps

| Flow Requirement | Current State | Gap |
|---|---|---|
| Partner → ApprovalQueue → PartnerDetails | Route exists, but ApprovalQueue is labeled under partners only | Minor gap: rename `approvalQueue` route to be clearer |
| Partner → KYC Approvals | Exists as `/kyc` route → KycQueue | KycQueue is in Employees/ folder — confusing ownership |
| Business Approval → Review → Verify → Details | Routes exist and are wired | ✅ Aligned |
| Branch → Service Areas (as tab within Branch module) | ServiceAreas is a top-level route, not nested | ⚠️ Needs re-routing |
| Service Management → Sub Categories | No separate Sub Categories route or page | ⚠️ Missing (future screen) |
| Service Management → Commission Management | No dedicated commission page | ⚠️ Partially in PricingStrategy.jsx |
| Employee → Earnings | No Earnings sub-screen | ⚠️ Missing (future) |
| Employee → Branch Managers | No separate Branch Managers screen | ⚠️ Missing (future) |
| Employee → Assignments | No separate Assignments screen | ⚠️ Missing (future) |
| Wallet Management → Settlements | Settlements is currently a top-level route | ⚠️ Needs sidebar re-mapping |
| Fraud Management | FraudCenter exists as route but not in sidebar | ⚠️ Add to sidebar |
| KYC Management (standalone module) | KycQueue inside Employees folder | ⚠️ Needs module reorganization |
| Reports & Analytics | Analytics page exists, not structured as Reports module | ⚠️ Sidebar label change + dropdown |
| Role & Permission (admin module) | Bottom nav "Roles" is auth screen, not admin role matrix | ⚠️ Need to separate auth vs admin |
| Dashboard sub-screens | Single Dashboard page, no sub-dashboards | ⚠️ Sidebar shows 8 dropdown items |

### 4.3 Flow Conflicts

1. **"Roles" bottom nav vs "Role & Permission" module**: Current "Roles" = auth role selection screen. Target "Role & Permission" = admin module to manage admin roles/permissions. These are two different things. We must NOT break the auth flow.

2. **ServiceAreas**: Currently a top-level sidebar item. Per Left Sidebar Structure, "Service Areas" appears under **both** Branch Management AND Service Management dropdowns. The single `ServiceAreas/index.jsx` page can serve both contexts — just needs sidebar wiring.

3. **KYC Module**: `KycQueue.jsx` is inside `Employees/` folder but the Router imports it as `pages/Employees/KycQueue`. It renders under the separate `/kyc` route. The **page works correctly**, but organizational ownership is wrong.

---

## 5. Dependency Analysis

### 5.1 Shared Components
| Component | Used By | Safe to Modify? |
|---|---|---|
| `AdminShell.jsx` | ALL admin pages | ⚠️ High risk — touches every page |
| `PublicShell.jsx` | Login/auth pages | ✅ Low risk |
| `Placeholder/index.jsx` | 15+ placeholder routes | ✅ Safe |
| `Requirement.jsx` | Unknown (likely unused) | ✅ Safe |

### 5.2 Shared Hooks
| Hook | Used By |
|---|---|
| `useApp()` | AppProvider, Router, AdminShell, all pages that navigate |

### 5.3 Shared Services
| Service | Used By |
|---|---|
| `authStorage.js` | AppProvider only |

### 5.4 Shared Config
| Config | Used By |
|---|---|
| `ROUTES` constant | Router.jsx, AppProvider.jsx, AdminShell.jsx, all pages |

### 5.5 State Management
All state is in `AppProvider` via React Context:
- `route` — current page
- `session` — auth state
- `selectedRole` — role selection
- `recovery` — password reset state
- `theme` — light/dark (unused in UI currently)
- `currentPartnerId` — partner context
- `currentBranchId` — branch context (hardcoded `'BR-90210'`)

---

## 6. Risk Analysis

| Risk | Severity | Description | Mitigation |
|---|---|---|---|
| Breaking `AdminShell` sidebar | 🔴 HIGH | Every page uses AdminShell. Sidebar rebuild could break active state, navigation, etc. | Implement dropdown sidebar while preserving all existing `activeTab` matching logic |
| KycQueue folder misplacement | 🟡 MEDIUM | `KycQueue.jsx` is in `Employees/` but imported as standalone. Moving it requires updating import path in Router.jsx | Keep file in place; add KYC module page that wraps/redirects to it |
| Route conflicts after renaming | 🟡 MEDIUM | If route strings change, AppProvider's navigation guard must be updated | Add new routes to AppProvider guard; keep old route strings as aliases |
| Sidebar "Roles" vs "Role & Permission" | 🟡 MEDIUM | Bottom nav "Roles" currently routes to auth RoleSelection. Target wants a different admin module | Keep "Roles" in bottom nav for auth; add new "Role & Permission" placeholder in sidebar |
| Service Areas duplication | 🟡 MEDIUM | `serviceAreas` route exists; left sidebar wants it under Branch AND Service Management | Keep single route/page; wire it from both dropdown items |
| Settlements relocation | 🟡 MEDIUM | Settlements is a flat route. Moving sidebar entry under Wallet won't break functionality | Only change sidebar — don't change route |
| FraudCenter visibility | 🟡 MEDIUM | FraudCenter route exists but user can only reach it via direct navigation (not sidebar) | Add to Fraud Management dropdown in sidebar |
| AppProvider navigation guard | 🟡 MEDIUM | New routes must be added to the auth guard in AppProvider | Add all new routes to the guard list |
| `businessApproval` route conflict | 🟢 LOW | Both `business` and `businessApproval` render `BusinessRegistry` — this is intentional | Keep as-is |
| Missing sub-category page | 🟢 LOW | No Sub Categories page exists | Create a Placeholder route for it |

---

## 7. Migration Strategy

### 7.1 Recommended Implementation Order
1. **Phase 1: Sidebar Rebuild** — highest impact, most visible change
2. **Phase 2: Route additions** — add missing routes + new sidebar dropdown routes
3. **Phase 3: AppProvider guard update** — add new routes to auth guard
4. **Phase 4: Sidebar active-state mapping** — update `isItemActive` logic in AdminShell
5. **Phase 5: Module label corrections** — rename sidebar labels to match spec
6. **Phase 6: KYC module extraction** — create dedicated KYC page/wrapper
7. **Phase 7: Fraud Management sidebar entry** — wire FraudCenter to Fraud Management dropdown
8. **Phase 8: Role & Permission placeholder** — add admin module separate from auth roles

### 7.2 Safe Migration Approach
- **No file deletions** — all existing pages remain
- **No route string changes** — only ADD new routes, keep existing ones
- **Only one file has major changes**: `AdminShell.jsx` (sidebar rebuild)
- **One file has moderate changes**: `Router.jsx` (add new route cases)
- **One file has moderate changes**: `config/routes.js` (add new route constants)
- **One file has moderate changes**: `AppProvider.jsx` (add new routes to auth guard)

---

## 8. Phase-wise Implementation Plan

### Phase 1: Sidebar Rebuild (AdminShell.jsx)
**Goal**: Replace flat sidebar with collapsible dropdown sidebar matching Left Sidebar Structure exactly.

**Tasks:**
- [ ] Design collapsible dropdown sidebar component within AdminShell
- [ ] Define `navItems` as hierarchical array: `{ label, icon, route, children: [{label, route}] }`
- [ ] Implement open/close state for each top-level dropdown item
- [ ] Map all 26 target modules to their icons and routes
- [ ] Implement active-state logic for both parent module and child item
- [ ] Preserve bottom nav (Roles → auth screen, Settings)
- [ ] Ensure sidebar scrolls when content overflows
- [ ] Test all existing pages still render correctly under AdminShell

**Files changed:**
- `src/components/layouts/AdminShell.jsx`

---

### Phase 2: Route Additions (routes.js)
**Goal**: Add route constants for all new sidebar items that currently have no route.

**New routes to add:**

```
// Dashboard sub-routes
dashboardRevenue: '/dashboard/revenue'
dashboardBookings: '/dashboard/bookings'
dashboardUsers: '/dashboard/users-analytics'
dashboardPartners: '/dashboard/partners-analytics'
dashboardApprovals: '/dashboard/approvals'
dashboardActivity: '/dashboard/activity'
dashboardSystemHealth: '/dashboard/system-health'

// User Management sub-routes
addUser: '/users/add'
userApprovals: '/users/approvals'
blockedUsers: '/users/blocked'
userWallets: '/users/wallets'
userReferrals: '/users/referrals'
userDocuments: '/users/documents'
userComplaints: '/users/complaints'
userReviews: '/users/reviews'

// Partner Management sub-routes
ispPartners: '/partners/isp'
bspPartners: '/partners/bsp'
businessSellers: '/partners/business-sellers'
partnerApprovals: '/partners/approvals'
kycApprovals: '/partners/kyc-approvals'
serviceApprovals: '/partners/service-approvals'
branchApprovals: '/partners/branch-approvals'
partnerWallets: '/partners/wallets'
partnerBanking: '/partners/banking'
partnerEmployees: '/partners/employees'
partnerBranches: '/partners/branches'
partnerServices: '/partners/services'
partnerReviews: '/partners/reviews'
partnerRevenue: '/partners/revenue'
partnerFraud: '/partners/fraud'

// KYC Management sub-routes
kycPending: '/kyc/pending'
kycApproved: '/kyc/approved'
kycRejected: '/kyc/rejected'
kycReupload: '/kyc/reupload'
kycAadhaar: '/kyc/aadhaar'
kycPan: '/kyc/pan'
kycGst: '/kyc/gst'
kycDriving: '/kyc/driving-license'
kycVoter: '/kyc/voter-id'
kycSelfie: '/kyc/selfie'
kycFaceMatch: '/kyc/face-match'
kycVideo: '/kyc/video'
kycRisk: '/kyc/risk'
kycManual: '/kyc/manual'
kycAnalytics: '/kyc/analytics'

// Service Management sub-routes
serviceSubCategories: '/services/sub-categories'
serviceCommission: '/services/commission'

// Employee Management sub-routes
branchManagers: '/employees/branch-managers'
employeeAssignments: '/employees/assignments'
employeeDocuments: '/employees/documents'
employeeEarnings: '/employees/earnings'
employeeRatings: '/employees/ratings'
employeeKyc: '/employees/kyc'

// Wallet Management sub-routes  
walletAll: '/wallet/all'
walletUser: '/wallet/user'
walletPartner: '/wallet/partner'
walletSeller: '/wallet/seller'
walletEmployee: '/wallet/employee'
walletTransactions: '/wallet/transactions'
walletRefunds: '/wallet/refunds'
walletPenalties: '/wallet/penalties'
walletFreeze: '/wallet/freeze'
walletFraud: '/wallet/fraud'
walletAnalytics: '/wallet/analytics'
walletReconciliation: '/wallet/reconciliation'

// Banking & Settlements sub-routes
bankAccounts: '/banking/accounts'
bankBeneficiaries: '/banking/beneficiaries'
bankUpi: '/banking/upi'
withdrawalRequests: '/banking/withdrawals'
settlementQueue: '/banking/settlement-queue'
bulkSettlements: '/banking/bulk-settlements'
failedSettlements: '/banking/failed'
payoutProcessing: '/banking/payouts'
bankingAnalytics: '/banking/analytics'

// Fraud Management sub-routes
fraudDashboard: '/fraud/dashboard'
fraudUser: '/fraud/user'
fraudPartner: '/fraud/partner'
fraudWallet: '/fraud/wallet'
fraudBooking: '/fraud/booking'
fraudInvestigations: '/fraud/investigations'
fraudRisk: '/fraud/risk-scoring'
blacklistManagement: '/fraud/blacklist'

// Role & Permission sub-routes
rolePermissions: '/roles/admin'
createRole: '/roles/create'
permissionMatrix: '/roles/permissions'
roleAuditLogs: '/roles/audit-logs'

// Reports & Analytics sub-routes
reportsOperational: '/reports/operational'
reportsBooking: '/reports/bookings'
reportsUser: '/reports/users'
reportsPartner: '/reports/partners'
reportsEmployee: '/reports/employees'
reportsFinancial: '/reports/financial'
reportsRevenue: '/reports/revenue'
exportCenter: '/reports/export'
```

**Files changed:**
- `src/config/routes.js`

---

### Phase 3: Router Updates (Router.jsx)
**Goal**: Add new route cases — all new routes render appropriate Placeholder or redirect to existing page.

**Tasks:**
- [ ] Add cases for all new routes defined in Phase 2
- [ ] Most new routes → `<Placeholder title="[Name]" activeTab="[Module]" />`
- [ ] Wire `kycPending`, `kycApproved` etc. → KycQueue (existing page)
- [ ] Wire `fraudDashboard`, `fraudPartner` etc. → FraudCenter (existing page)
- [ ] Wire `rolePermissions` → new admin placeholder (NOT RoleSelection auth screen)

**Files changed:**
- `src/app/router/Router.jsx`

---

### Phase 4: AppProvider Auth Guard Update
**Goal**: Add all new routes to the authentication guard so protected pages redirect unauthenticated users.

**Tasks:**
- [ ] Add all new route constants from Phase 2 to the `navigate()` auth guard in AppProvider

**Files changed:**
- `src/app/providers/AppProvider.jsx`

---

### Phase 5: KYC Module Extraction
**Goal**: KYC Management becomes a standalone top-level module, not nested inside Employees.

**Tasks:**
- [ ] `KycQueue.jsx` stays physically in `pages/Employees/` (no file move to avoid risk)
- [ ] Create `src/pages/KYC/index.jsx` — a wrapper that renders KycQueue as the default view
- [ ] Add route `kyc` → KYC/index.jsx in Router.jsx (replace current `KycQueue` direct import)
- [ ] The sidebar "KYC Management" dropdown items (pending, approved, etc.) route to the KYC wrapper with different active tabs

**Files changed:**
- `src/pages/KYC/index.jsx` (NEW)
- `src/app/router/Router.jsx`

---

### Phase 6: Fraud Management Sidebar Wiring
**Goal**: FraudCenter becomes accessible via Fraud Management dropdown in sidebar.

**Tasks:**
- [ ] FraudCenter route stays at `/fraud-detection`
- [ ] Add `fraudDashboard` route that navigates to FraudCenter
- [ ] In sidebar, Fraud Management → Fraud Dashboard navigates to `/fraud-detection`
- [ ] Other fraud sub-items (User Fraud, Partner Fraud, etc.) → Placeholder for now

**Files changed:**
- Covered in Phase 1 (AdminShell sidebar wiring)

---

### Phase 7: ServiceAreas Sidebar Relocation
**Goal**: ServiceAreas removed from top-level sidebar; accessible from Branch Management and Service Management dropdowns.

**Tasks:**
- [ ] Keep route `/service-areas` and page intact
- [ ] In Branch Management dropdown: "Service Areas" → navigate to `/service-areas`
- [ ] In Service Management dropdown: "Service Areas" → navigate to `/service-areas`
- [ ] Remove "Service Areas" from top-level sidebar items

**Files changed:**
- Covered in Phase 1 (AdminShell sidebar items array)

---

### Phase 8: Role & Permission Module
**Goal**: Create a separate admin Role & Permission module. Keep auth "Roles" flow intact.

**Tasks:**
- [ ] Add `rolePermissions` route → `<Placeholder title="Role & Permission" activeTab="Role & Permission" />`
- [ ] In sidebar, "Role & Permission" module → dropdown items point to new route
- [ ] Keep bottom nav "Roles" → `ROUTES.roles` (auth flow, unchanged)

**Files changed:**
- Covered in Phase 2 + Phase 3

---

### Phase 9: Label & Naming Corrections
**Goal**: Align all sidebar labels with Left Sidebar Structure document.

| Current Label | New Label |
|---|---|
| Communications | Notification Center |
| Analytics | Reports & Analytics |
| KYC | KYC Management |
| Fraud Detection (route) | Fraud Management |
| Referrals | Referral Management |
| Banking | Banking & Settlements |
| Reviews | Reviews & Ratings |
| SOS | SOS Management |
| Support | Support Center |
| Banners | Banner Management |
| CMS | CMS Management |

**Files changed:**
- `src/components/layouts/AdminShell.jsx`

---

### Phase 10: Sub-Category & Commission Management (Future Screens)
**Goal**: Add placeholder routes for screens that don't exist yet.

**Tasks:**
- [ ] `serviceSubCategories` → `<Placeholder title="Sub Categories" />`
- [ ] `serviceCommission` → `<Placeholder title="Commission Management" />`
- [ ] Mark clearly as `[FUTURE]` in route definitions

**Files changed:**
- Covered in Phase 2 + Phase 3

---

## 9. Validation Checklist

### After Phase 1 (Sidebar)
- [ ] All 26 top-level modules appear in sidebar
- [ ] Each module has its correct dropdown children
- [ ] Clicking a child item navigates to the correct route
- [ ] Active state is correctly highlighted for parent module and child item
- [ ] Sidebar scrolls when items overflow
- [ ] Bottom nav (Roles, Settings) still works

### After Phase 2-4 (Routes)
- [ ] All new routes exist in `config/routes.js`
- [ ] All new routes are handled in `Router.jsx`
- [ ] All new routes are in AppProvider auth guard
- [ ] Unauthenticated users are redirected to login when accessing protected routes

### After Phase 5 (KYC)
- [ ] `/kyc` route renders KYC management page
- [ ] KYC sidebar dropdown items navigate correctly
- [ ] Employee module still has KYC tab within Employee Profile

### After All Phases
- [ ] All 25 existing page modules still render correctly
- [ ] All existing navigation flows (Login → Dashboard → Partner → etc.) still work
- [ ] Partner onboarding flow (RegisterPartner → OnboardingAddress → AddServices → AddBanking) still works
- [ ] Business management flow (BusinessRegistry → BusinessDetails/Review/Verify/Suspension/Risk) still works
- [ ] Branch management flow (Branches → BranchProfile → BranchSchedule → ManagerAssignment) still works
- [ ] Employee flow (Employees → EmployeeProfile → Availability/Performance/Attendance/Leave) still works
- [ ] Services flow (Services → ServiceProfile → ApprovalDetails → PricingStrategy) still works
- [ ] No console errors on any page
- [ ] No broken imports

---

## 10. Testing Checklist

- [ ] Login flow (roles → login → dashboard)
- [ ] Forgot password flow
- [ ] Dashboard loads correctly
- [ ] Each sidebar module expands/collapses correctly
- [ ] Each sidebar child item navigates correctly
- [ ] Partners module: list → details → approval queue
- [ ] Business module: list → add → review → details → suspension → risk
- [ ] Branches module: list → profile → schedule → suspend → manager assignment
- [ ] Services module: list → categories → approval → pricing → featured → comparison
- [ ] Employees module: overview → workforce → profile → attendance → leave → performance
- [ ] KYC module: renders correctly
- [ ] Fraud management: FraudCenter accessible from sidebar
- [ ] Analytics / Reports accessible from sidebar
- [ ] All placeholder pages render with correct title
- [ ] Logout works from all pages

---

## 11. Future Screens — Handling Strategy

The following items from the Left Sidebar Structure and Flow Document do NOT currently have implementations. They will be created as **Placeholder routes** only:

| Target Item | Status | Treatment |
|---|---|---|
| Sub Categories page | Not implemented | Placeholder route |
| Commission Management page | Not implemented | Placeholder (PricingStrategy has partial) |
| Employee Earnings page | Not implemented | Placeholder route |
| Employee Assignments page | Not implemented | Placeholder route |
| Branch Managers page | Not implemented | Placeholder route |
| All Booking sub-screens (16+ items) | Not implemented | Placeholder routes |
| Live Tracking sub-screens | Not implemented | Placeholder routes |
| Material Management sub-screens | Not implemented | Placeholder routes |
| Quotation Management sub-screens | Not implemented | Placeholder routes |
| Wallet Management sub-screens | Not implemented | Placeholder routes |
| Banking & Settlements sub-screens | Not implemented | Placeholder routes |
| Revenue Management sub-screens | Not implemented | Placeholder routes |
| Referral Management sub-screens | Not implemented | Placeholder routes |
| Notification Center sub-screens | Not implemented | Placeholder routes (CommunicationsCenter covers main) |
| Banner Management sub-screens | Not implemented | Placeholder routes |
| CMS Management sub-screens | Not implemented | Placeholder routes |
| Reviews & Ratings sub-screens | Not implemented | Placeholder routes |
| SOS Management sub-screens | Not implemented | Placeholder routes |
| Support Center sub-screens | Not implemented | Placeholder routes |
| Fraud Management sub-screens | Not implemented | Placeholder routes (FraudCenter covers main) |
| Reports & Analytics sub-screens | Not implemented | Placeholder routes (Analytics covers main) |
| Role & Permission sub-screens | Not implemented | Placeholder routes |
| Settings sub-screens | Not implemented | Placeholder routes |
| Dashboard sub-dashboards | Not implemented | Placeholder routes |

---

## 12. Open Questions for User Review

> [!IMPORTANT]
> Please review these questions before approving implementation. Answers will affect implementation decisions.

### Q1 — Sidebar Dropdown Behavior
Should the sidebar dropdowns:
- **A)** Accordion-style (one open at a time — clicking another closes the current)
- **B)** Multi-open (multiple dropdowns can be open simultaneously)
- **C)** Hover-to-expand (expand on hover, no click needed)

### Q2 — KycQueue.jsx Ownership
The `KycQueue.jsx` file is physically inside `src/pages/Employees/`. Should it:
- **A)** Stay in Employees/ folder (only change the sidebar wiring)
- **B)** Be physically moved to a new `src/pages/KYC/` folder
  *(Note: Moving risks import path errors if not done carefully)*

### Q3 — ServiceAreas Deduplication
"Service Areas" appears as a dropdown item under both **Branch Management** and **Service Management** in the Left Sidebar Structure. Should both items:
- **A)** Navigate to the SAME existing `/service-areas` route (same page)
- **B)** Navigate to different pages (one for branches, one for services — requires new page)

### Q4 — "Roles" Bottom Nav Conflict
The current bottom nav "Roles" navigates to the **auth role picker** (Login → RoleSelection). The Left Sidebar Structure defines "Role & Permission" as an **admin module** for managing admin roles/permissions matrix.
- **A)** Keep "Roles" bottom nav as auth screen; add "Role & Permission" as a separate sidebar dropdown module
- **B)** Remove "Roles" bottom nav entirely; put Role & Permission only in sidebar

### Q5 — Settlements Route
Currently `Settlements/index.jsx` has its own top-level route `/settlements`. In the new structure, it belongs under Wallet Management dropdown. Should the route path:
- **A)** Stay at `/settlements` (only the sidebar wiring changes)
- **B)** Change to `/wallet/settlements` (path changes too — requires AppProvider guard update)

### Q6 — Partner Onboarding Steps
The current partner onboarding is a multi-step flow: `RegisterPartner → OnboardingAddress → AddServices → AddBanking`. Per the Left Sidebar Structure, these appear as "Add Partner" under the Partner Management dropdown. Should these steps:
- **A)** Stay as separate routes (current behavior — each step is a separate page/route)
- **B)** Be consolidated into a single wizard route (`/partners/add`) with internal step state

### Q7 — Analytics Page
The existing `Analytics/index.jsx` is a large, fully implemented page (53KB). Under the new structure it belongs under "Reports & Analytics". Should it:
- **A)** Become the default landing page for "Reports & Analytics" module
- **B)** Be placed as a specific sub-item ("Operational Reports" or "Booking Analytics")

---

## 13. Summary of Files to Modify

| File | Change Type | Risk |
|---|---|---|
| `src/components/layouts/AdminShell.jsx` | Major rebuild (sidebar) | 🔴 HIGH |
| `src/config/routes.js` | Add 60+ new route constants | 🟢 LOW |
| `src/app/router/Router.jsx` | Add 60+ new route cases (all Placeholder) | 🟡 MEDIUM |
| `src/app/providers/AppProvider.jsx` | Add new routes to auth guard | 🟡 MEDIUM |
| `src/pages/KYC/index.jsx` | NEW FILE (wrapper for KycQueue) | 🟢 LOW |
| All other existing files | NO CHANGE | ✅ SAFE |
