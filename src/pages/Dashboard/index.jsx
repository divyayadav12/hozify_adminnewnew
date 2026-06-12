import React from 'react';
import {
  CalendarCheck,
  Gift,
  Store,
  Users
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import KpiCard from '../../features/dashboard/KpiCard';
import QuickActions from '../../features/dashboard/QuickActions';
import PendingKyc from '../../features/dashboard/PendingKyc';
import PartnerGrowth from '../../features/dashboard/PartnerGrowth';
import RecentBookings from '../../features/dashboard/RecentBookings';
import AdminShell from '../../components/layouts/AdminShell';

const kpis = [
  { title: 'Total Users', value: '128,402', trend: '+8.2%', icon: Users, positive: true },
  { title: 'Total Partners', value: '4,810', trend: '+12.4%', icon: Gift, positive: true },
  { title: 'Total Sellers', value: '1,244', trend: '-2.1%', icon: Store, positive: false },
  { title: 'Total Bookings', value: '42,911', trend: '+22.5%', icon: CalendarCheck, positive: true },
  { title: 'Revenue (MTD)', value: '$2,482,100', footer: 'progress' },
  { title: 'Wallet Balance', value: '$412,055', footer: 'Ready for settlement' },
  { title: 'Pending Approvals', value: '124', footer: 'Applications', action: 'Review All →' },
  { title: 'Open Tickets', value: '18', footer: 'High Priority', negative: true }
];

const bookings = [
  ['#HZ-9102', 'JD', 'John Doe', 'Deep Cleaning', 'Oct 24, 10:30 AM', '$125.00', 'Completed'],
  ['#HZ-9101', 'SM', 'Sarah Miller', 'AC Maintenance', 'Oct 24, 11:15 AM', '$85.00', 'In Progress'],
  ['#HZ-9099', 'RK', 'Robert King', 'Plumbing Repair', 'Oct 24, 01:45 PM', '$210.00', 'Scheduled']
];

export default function Dashboard() {
  return (
    <AdminShell activeTab="Dashboard" searchPlaceholder="Global search...">
      <section className="kpi-grid">
        {kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}
      </section>
      <section className="dash-columns">
        <div className="dash-left">
          <div className="panel trends-panel">
            <div className="panel-head">
              <div>
                <h2>Revenue & Booking Trends</h2>
                <p>Last 30 days performance metrics</p>
              </div>
              <div className="segmented">
                <button className="active" type="button">Monthly</button>
                <button type="button">Weekly</button>
              </div>
            </div>
            <div className="bar-chart">
              {[45, 30, 54, 40, 68, 73, 49, 35, 59, 34, 64, 82].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} className={index % 6 === 5 ? 'deep' : index % 2 ? 'mid' : 'light'} />
              ))}
            </div>
            <div className="weeks">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
          <RecentBookings bookings={bookings} />
        </div>
        <aside className="dash-right">
          <QuickActions />
          <PendingKyc />
          <PartnerGrowth />
        </aside>
      </section>
    </AdminShell>
  );
}

