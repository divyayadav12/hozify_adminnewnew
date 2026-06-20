import React, { useEffect, useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import EmployeeOverview from './EmployeeOverview';
import EmployeeWorkforce from './EmployeeWorkforce';
import EmployeeProfile from './EmployeeProfile';
import AvailabilityBoard from './AvailabilityBoard';
import AddEmployee from './AddEmployee';
import PerformanceDashboard from './PerformanceDashboard';
import EmployeeReports from './EmployeeReports';
import AttendanceDashboard from './AttendanceDashboard';
import LeaveManagement from './LeaveManagement';

export default function Employees({ defaultTab }) {
  const { route, navigate } = useApp();
  
  const getDefaultTab = () => {
    if (defaultTab) return defaultTab;
    if (route === ROUTES.employeeAll) return 'Workforce';
    if (route === ROUTES.employeeAdd) return 'AddEmployee';
    if (route === ROUTES.employeeAvailability) return 'Availability';
    if (route === ROUTES.performance) return 'Performance';
    if (route === ROUTES.reports) return 'Reports';
    if (route === ROUTES.attendance) return 'Attendance';
    if (route === ROUTES.leaveManagement) return 'LeaveManagement';
    return 'Overview';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    setActiveTab(getDefaultTab());
  }, [route, defaultTab]);

  const handleSelectEmployee = (emp) => {
    setSelectedEmployee(emp);
    setActiveTab('Profile');
  };

  const handleOnboardingComplete = (newEmp) => {
    navigate(ROUTES.employeeAll);
  };

  const employeeTabRoutes = {
    Overview: ROUTES.employees,
    Workforce: ROUTES.employeeAll,
    Availability: ROUTES.employeeAvailability,
    Performance: ROUTES.performance,
    Attendance: ROUTES.attendance,
    LeaveManagement: ROUTES.leaveManagement,
    Reports: ROUTES.reports
  };

  const handleTabClick = (tabId) => {
    navigate(employeeTabRoutes[tabId] || ROUTES.employees);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <EmployeeOverview
            onNavigateToWorkforce={() => navigate(ROUTES.employeeAll)}
            onNavigateToAddEmployee={() => navigate(ROUTES.employeeAdd)}
          />
        );
      case 'Workforce':
        return (
          <EmployeeWorkforce
            onSelectEmployee={handleSelectEmployee}
            onNavigateToAddEmployee={() => navigate(ROUTES.employeeAdd)}
          />
        );
      case 'Availability':
        return (
          <AvailabilityBoard
            onNavigateToAddEmployee={() => navigate(ROUTES.employeeAdd)}
          />
        );
      case 'Performance':
        return (
          <PerformanceDashboard
            onNavigateToAddEmployee={() => navigate(ROUTES.employeeAdd)}
          />
        );
      case 'Attendance':
        return (
          <AttendanceDashboard />
        );
      case 'LeaveManagement':
        return (
          <LeaveManagement />
        );
      case 'Reports':
        return (
          <EmployeeReports />
        );
      case 'Profile':
        return (
          <EmployeeProfile
            employee={selectedEmployee}
            onBack={() => {
              setSelectedEmployee(null);
              setActiveTab('Workforce');
            }}
          />
        );
      case 'AddEmployee':
        return (
          <AddEmployee
            onBack={() => navigate(ROUTES.employeeAll)}
            onComplete={handleOnboardingComplete}
          />
        );
      default:
        return (
          <EmployeeOverview
            onNavigateToWorkforce={() => navigate(ROUTES.employeeAll)}
            onNavigateToAddEmployee={() => navigate(ROUTES.employeeAdd)}
          />
        );
    }
  };

  const showTabHeader = [
    'Overview',
    'Workforce',
    'Availability',
    'Performance',
    'Attendance',
    'LeaveManagement',
    'Reports'
  ].includes(activeTab);

  return (
    <AdminShell
      activeTab="Employees"
      headerTitle="Employee Management"
      searchPlaceholder="Search in employee suite..."
    >
      {/* Sub-tab selection bar */}
      {showTabHeader && (
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--line)', marginBottom: '24px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {[
            { id: 'Overview', label: 'Overview' },
            { id: 'Workforce', label: 'Workforce Directory' },
            { id: 'Availability', label: 'Availability Board' },
            { id: 'Performance', label: 'Performance' },
            { id: 'Attendance', label: 'Attendance' },
            { id: 'LeaveManagement', label: 'Leave Management' },
            { id: 'Reports', label: 'Reports & Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
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
                marginRight: '8px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Render sub-view component */}
      {renderContent()}
    </AdminShell>
  );
}
