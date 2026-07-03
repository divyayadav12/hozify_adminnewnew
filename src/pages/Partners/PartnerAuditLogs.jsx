import React from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  ShieldCheck,
  Activity,
  FileText,
  AlertTriangle,
  Clock,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";

const stats = [
  {
    title: "Total Audit Logs",
    value: "24,842",
    icon: FileText,
    accent: "blue",
    color: "#2563eb",
    bgColor: "#eff6ff"
  },
  {
    title: "Today's Activities",
    value: "1,248",
    icon: Activity,
    accent: "emerald",
    color: "#059669",
    bgColor: "#ecfdf5"
  },
  {
    title: "Risk Events",
    value: "42",
    icon: AlertTriangle,
    accent: "orange",
    color: "#d97706",
    bgColor: "#fffbeb"
  },
  {
    title: "Compliance Score",
    value: "96%",
    icon: ShieldCheck,
    accent: "violet",
    color: "#7c3aed",
    bgColor: "#f5f3ff"
  },
];

export default function PartnerAuditLogs() {
  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search audit logs..."
    >
      <div className="space-y-8">

        {/* HERO */}
        <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Audit Monitoring
          </p>

          <h1 className="mt-4 text-5xl font-normal text-slate-900">
            Partner Audit Logs
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600">
            Monitor user activities, security events,
            compliance tracking and system audit records.
          </p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              bgColor={item.bgColor}
              iconColor={item.color}
            />
          ))}
        </div>
        {/* RECENT ACTIVITIES */}
        <div className="rounded-[32px] bg-gradient-to-br from-slate-50 to-blue-100 border border-slate-200 p-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Recent Audit Activities
          </h2>

          <div className="mt-8 space-y-5">

            {[
              {
                user: "Admin User",
                action: "Updated Partner Information",
                time: "5 min ago",
              },
              {
                user: "Finance Team",
                action: "Approved Settlement Request",
                time: "18 min ago",
              },
              {
                user: "Compliance Team",
                action: "Generated Audit Report",
                time: "42 min ago",
              },
              {
                user: "Security Team",
                action: "Reviewed Risk Event",
                time: "1 hr ago",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {log.action}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {log.user}
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {log.time}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* AUDIT TABLE */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">

          <div className="p-6 border-b border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900">
              Audit Records
            </h2>
          </div>

          <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="text-left">Action</th>
                <th className="text-left">Module</th>
                <th className="text-left">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Admin", "Updated Partner", "Partners", "09:42 AM"],
                ["Finance", "Approved Payout", "Revenue", "10:15 AM"],
                ["Manager", "Modified Access", "Security", "11:02 AM"],
                ["System", "Generated Report", "Audit", "11:50 AM"],
              ].map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-5">{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                </tr>
              ))}
            </tbody>
          </table></div>

        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="rounded-[32px] bg-gradient-to-br from-blue-100 to-slate-100 border border-slate-200 p-8">

            <h2 className="text-2xl font-bold text-slate-900">
              Risk Events
            </h2>

            <div className="mt-8 space-y-4">

              {[
                "Multiple Failed Login Attempts",
                "Unusual Revenue Modification",
                "Unauthorized Permission Change",
                "Partner Data Access Alert",
              ].map((event) => (
                <div
                  key={event}
                  className="bg-white rounded-2xl p-5 flex items-center gap-4"
                >
                  <AlertTriangle
                    className="text-orange-500"
                    size={22}
                  />

                  <span className="font-medium text-slate-800">
                    {event}
                  </span>
                </div>
              ))}

            </div>

          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-indigo-100 to-slate-100 border border-slate-200 p-8">

            <h2 className="text-2xl font-bold text-slate-900">
              User Activity Summary
            </h2>

            <div className="mt-8 space-y-6">

              {[
                ["Admin Actions", "1,284"],
                ["Finance Actions", "842"],
                ["Partner Updates", "612"],
                ["Security Reviews", "324"],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-5 flex justify-between"
                >
                  <span>{title}</span>

                  <span className="font-bold text-blue-700">
                    {value}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-[28px] bg-gradient-to-br from-blue-100 to-slate-100 p-6">
            <h3 className="font-bold text-lg">
              Compliance Status
            </h3>

            <p className="mt-4 text-4xl font-bold text-blue-700">
              96%
            </p>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-blue-100 to-slate-100 p-6">
            <h3 className="font-bold text-lg">
              Active Sessions
            </h3>

            <p className="mt-4 text-4xl font-bold text-blue-700">
              248
            </p>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-blue-100 to-slate-100 p-6">
            <h3 className="font-bold text-lg">
              Audit Reports
            </h3>

            <p className="mt-4 text-4xl font-bold text-blue-700">
              132
            </p>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}