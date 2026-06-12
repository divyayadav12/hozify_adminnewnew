import React, { useState } from 'react';
import {
  Users as UsersIcon,
  CheckSquare,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Search,
  Mail,
  Phone
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import KpiCard from '../../features/dashboard/KpiCard';
import AdminShell from '../../components/layouts/AdminShell';

const initialUsersList = [
  {
    id: '#USR-90210',
    name: 'Sarah Connor',
    email: 'sconnor@skynet.org',
    phone: '+1 (555) 123-4567',
    role: 'Customer',
    registered: 'Oct 24, 2023',
    status: 'Active'
  },
  {
    id: '#USR-88219',
    name: 'Marcus Sterling',
    email: 'm.sterling@hozify.com',
    phone: '+1 (555) 987-6543',
    role: 'Fleet Manager',
    registered: 'Oct 24, 2023',
    status: 'Pending'
  },
  {
    id: '#USR-76431',
    name: 'Elena Rostova',
    email: 'e.rostova@gmail.com',
    phone: '+1 (555) 456-7890',
    role: 'Customer',
    registered: 'Oct 23, 2023',
    status: 'Active'
  },
  {
    id: '#USR-55210',
    name: 'Sarah Jenkins',
    email: 's.jenkins@yahoo.com',
    phone: '+1 (555) 789-0123',
    role: 'Operator',
    registered: 'Oct 22, 2023',
    status: 'Suspended'
  },
  {
    id: '#USR-44329',
    name: 'David Kim',
    email: 'd.kim@outlook.com',
    phone: '+1 (555) 321-7654',
    role: 'Customer',
    registered: 'Oct 21, 2023',
    status: 'Active'
  },
  {
    id: '#USR-33821',
    name: 'Michael Scott',
    email: 'mscott@dundermifflin.com',
    phone: '+1 (555) 234-5678',
    role: 'Driver',
    registered: 'Oct 20, 2023',
    status: 'Pending'
  }
];

export default function Users() {
  const { navigate } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(initialUsersList);

  const handleAddUser = () => {
    // Add user placeholder
    const newId = `#USR-${Math.floor(10000 + Math.random() * 90000)}`;
    const names = ['Jim Halpert', 'Pam Beesly', 'Dwight Schrute', 'Angela Martin', 'Stanley Hudson'];
    const selectedName = names[Math.floor(Math.random() * names.length)];
    const emailPrefix = selectedName.toLowerCase().replace(' ', '.');
    
    const newUser = {
      id: newId,
      name: selectedName,
      email: `${emailPrefix}@dundermifflin.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      role: Math.random() > 0.5 ? 'Customer' : 'Driver',
      registered: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending'
    };

    setUsers([newUser, ...users]);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  const filteredUsers = users.filter((u) => {
    const matchesFilter = filter === 'All' || u.status === filter;
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const kpisData = [
    { title: 'Total Users', value: users.length.toString(), topLabel: '+8.2%', topLabelClass: 'green-text trend-icon', icon: UsersIcon },
    { title: 'Active Users', value: users.filter(u => u.status === 'Active').length.toString(), topLabel: 'Active', topLabelClass: 'gray-badge', icon: CheckSquare },
    { title: 'Pending Approval', value: users.filter(u => u.status === 'Pending').length.toString(), topLabel: 'Verify', topLabelClass: 'orange-badge', icon: Clock },
    { title: 'Suspended Users', value: users.filter(u => u.status === 'Suspended').length.toString(), topLabel: '-1.2%', topLabelClass: 'red-text trend-icon-down', icon: AlertTriangle }
  ];

  return (
    <AdminShell
      activeTab="Users"
      searchPlaceholder="Search users, email, or role..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="partners-page-header">
        <div>
          <h1 className="page-title">Users Directory</h1>
          <p className="page-subtitle">Manage registered customers, drivers, and platform operators across Hozify.</p>
        </div>
        <div className="partners-header-buttons">
          <button className="secondary-action-btn" type="button">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="secondary-action-btn" type="button">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
          <button className="primary-action-btn" type="button" onClick={handleAddUser}>
            <Plus size={16} />
            <span>Create User</span>
          </button>
        </div>
      </div>

      <section className="kpi-grid partners-kpis" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {kpisData.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} />
        ))}
      </section>

      <section className="panel partner-directory-panel">
        <div className="directory-panel-header">
          <h2>User Accounts</h2>
          <div className="segmented-tab-filter">
            <button
              className={filter === 'All' ? 'active' : ''}
              onClick={() => setFilter('All')}
              type="button"
            >
              All Users
            </button>
            <button
              className={filter === 'Active' ? 'active' : ''}
              onClick={() => setFilter('Active')}
              type="button"
            >
              Active
            </button>
            <button
              className={filter === 'Pending' ? 'active' : ''}
              onClick={() => setFilter('Pending')}
              type="button"
            >
              Pending
            </button>
            <button
              className={filter === 'Suspended' ? 'active' : ''}
              onClick={() => setFilter('Suspended')}
              type="button"
            >
              Suspended
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="partner-table">
            <thead>
              <tr>
                <th>USER ID</th>
                <th>NAME / IDENTITY</th>
                <th>ROLE</th>
                <th>CONTACT INFO</th>
                <th>REGISTERED</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="partner-row-clickable">
                  <td className="partner-id-cell">
                    <strong>{user.id}</strong>
                  </td>
                  <td className="partner-name-cell">
                    <div className="partner-info-wrap">
                      <div className="partner-logo-placeholder" style={{ backgroundColor: 'var(--lavender)', color: 'var(--primary)' }}>
                        <span>{user.name.charAt(0)}</span>
                      </div>
                      <div className="partner-name-meta">
                        <span className="partner-name-txt">{user.name}</span>
                        <span className="partner-est-txt">Role: {user.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`partner-type-badge`} style={{ background: '#f5f3ff', color: 'var(--primary-3)' }}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} color="var(--muted)" /> {user.email}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} color="var(--muted)" /> {user.phone}
                      </span>
                    </div>
                  </td>
                  <td>{user.registered}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="partner-actions-cell" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {user.status !== 'Active' && (
                        <button
                          style={{ border: 'none', background: 'transparent', color: 'var(--green)', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                          onClick={() => handleStatusChange(user.id, 'Active')}
                        >
                          Activate
                        </button>
                      )}
                      {user.status !== 'Suspended' && (
                        <button
                          style={{ border: 'none', background: 'transparent', color: 'var(--red)', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                          onClick={() => handleStatusChange(user.id, 'Suspended')}
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px' }}>
                    No users found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="directory-table-footer">
          <span className="footer-results-text">Showing 1-{filteredUsers.length} of {users.length} results</span>
          <div className="pagination-wrap">
            <button className="pag-nav-btn" type="button" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="pag-num-btn active" type="button">1</button>
            <button className="pag-nav-btn" type="button" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <footer className="partner-page-bottom-strip">
        <div className="strip-left">
          <span className="status-dot-green">●</span>
          <span>CONSOLE ONLINE</span>
          <span className="vertical-sep">|</span>
          <span>SYSTEM VERSION 2.4.0-ENTERPRISE</span>
        </div>
        <div className="strip-right">
          <span>LAST SYNC: SECONDS AGO</span>
        </div>
      </footer>
    </AdminShell>
  );
}
