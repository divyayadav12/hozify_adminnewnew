import React, { useMemo, useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";

import {
  Users,
  UserCheck,
  UserX,
  Clock3,
  Briefcase,
  ShieldCheck,
  MoreVertical,
} from "lucide-react";

const employeeStats = [
  {
    title: "Total Employees",
    value: "5,428",
    icon: Users,
    badge: "+8%",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    description: "Overall partner workforce strength and hiring momentum.",
  },
  {
    title: "Active Employees",
    value: "5,102",
    icon: UserCheck,
    badge: "94%",
    color: "text-green-600",
    bg: "bg-green-100",
    description: "Employees currently active across partner operations.",
  },
  {
    title: "Pending Verification",
    value: "86",
    icon: Clock3,
    badge: "Review",
    color: "text-orange-500",
    bg: "bg-orange-100",
    description: "Employees waiting for document verification and approval.",
  },
  {
    title: "Suspended",
    value: "34",
    icon: UserX,
    badge: "-2%",
    color: "text-red-500",
    bg: "bg-red-100",
    description: "Staff currently paused from partner systems.",
  },
];

const employees = [
  {
    name: "Rahul Sharma",
    id: "EMP-1001",
    partner: "SkyNet Logistics",
    department: "Operations",
    role: "Manager",
    status: "Active",
  },
  {
    name: "Ankit Verma",
    id: "EMP-1002",
    partner: "BlueWave Systems",
    department: "Support",
    role: "Executive",
    status: "Pending",
  },
  {
    name: "Priya Patel",
    id: "EMP-1003",
    partner: "Vertex Transit",
    department: "Sales",
    role: "Team Lead",
    status: "Active",
  },
  {
    name: "Nikhil Rao",
    id: "EMP-1004",
    partner: "BlueWave Systems",
    department: "Compliance",
    role: "Auditor",
    status: "Suspended",
  },
];
export default function PartnerEmployees() {
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const activeStat = employeeStats[activeStatIndex];

  const filteredEmployees = useMemo(() => {
    if (activeStatIndex === 0) return employees;
    if (activeStatIndex === 1) return employees.filter((employee) => employee.status === "Active");
    if (activeStatIndex === 2) return employees.filter((employee) => employee.status === "Pending");
    if (activeStatIndex === 3) return employees.filter((employee) => employee.status === "Suspended");
    return employees;
  }, [activeStatIndex]);

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search employees, departments..."
    >
      <div className="space-y-8">

        <div className="overflow-hidden rounded-[32px] bg-slate-50 border border-slate-200 p-8 text-slate-900 shadow-sm">

          <span className="rounded-full bg-slate-100 px-4 py-2 text-xs tracking-[0.3em] text-slate-600">
            PARTNER EMPLOYEES
          </span>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            {activeStat.title}
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600">
            {activeStat.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-[280px_1fr] items-start">
            <div className="rounded-[28px] bg-white p-6 shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Current value
              </p>
              <p className="mt-4 text-5xl font-bold text-slate-900">
                {activeStat.value}
              </p>
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Trend
              </p>
              <p className={`mt-4 text-4xl font-semibold ${activeStat.color}`}>
                {activeStat.badge}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Tap any stat card below to refresh this summary with the latest insight.
              </p>
            </div>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  {employeeStats.map((item, index) => {

    const Icon = item.icon;

    return (
      <button
        key={index}
        type="button"
        onClick={() => setActiveStatIndex(index)}
        className={`rounded-[28px] border p-6 text-left transition-shadow duration-200 ${
          activeStatIndex === index
            ? "border-indigo-500 bg-indigo-50 shadow-lg"
            : "border-slate-200 bg-white shadow-sm hover:border-indigo-300 hover:bg-slate-50"
        }`}
      >

        <div className="flex justify-between items-start gap-4">

          <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${item.bg} shadow-lg`}>
            <Icon className={`h-8 w-8 ${item.color} stroke-2`} />
          </div>

          <span className={`text-sm font-semibold ${item.color}`}>
            {item.badge}
          </span>

        </div>

        <p className="mt-5 text-slate-500">
          {item.title}
        </p>

        <h3 className="mt-2 text-4xl font-bold text-slate-900">
          {item.value}
        </h3>

      </button>
    );
  })}

</div>
<div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">

  <div className="border-b border-slate-200 p-6">

    <h2 className="text-3xl font-bold">
      Employee Directory — {activeStat.title}
    </h2>

    <p className="text-slate-500 mt-2">
      Showing {filteredEmployees.length} {activeStat.title.toLowerCase()} record{filteredEmployees.length === 1 ? "" : "s"}.
    </p>

  </div>

  <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full">

    <thead className="bg-slate-50">

      <tr>

        <th className="px-6 py-4 text-left">EMPLOYEE</th>
        <th>PARTNER</th>
        <th>DEPARTMENT</th>
        <th>ROLE</th>
        <th>STATUS</th>
        <th>ACTION</th>

      </tr>

    </thead>

    <tbody>

      {filteredEmployees.map((employee) => (

        <tr
          key={employee.id}
          className="border-t border-slate-100"
        >

          <td className="px-6 py-5">

            <h4 className="font-semibold">
              {employee.name}
            </h4>

            <p className="text-sm text-slate-500">
              {employee.id}
            </p>

          </td>

          <td>{employee.partner}</td>

          <td>{employee.department}</td>

          <td>{employee.role}</td>

          <td>

            <span
              className={`rounded-full px-4 py-2 text-sm ${
                employee.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : employee.status === "Pending"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {employee.status}
            </span>

          </td>

          <td>

            <button className="p-2 rounded-lg hover:bg-slate-100">
              <MoreVertical size={18} />
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table></div>

</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="rounded-[28px] bg-white border border-slate-200 p-6">
    <h3 className="font-bold text-xl">
      Attendance Rate
    </h3>
    <p className="mt-3 text-4xl font-bold text-green-600">
      96.4%
    </p>
  </div>

  <div className="rounded-[28px] bg-white border border-slate-200 p-6">
    <h3 className="font-bold text-xl">
      Verified Employees
    </h3>
    <p className="mt-3 text-4xl font-bold text-indigo-600">
      5,102
    </p>
  </div>

  <div className="rounded-[28px] bg-white border border-slate-200 p-6">
    <h3 className="font-bold text-xl">
      Avg Productivity
    </h3>
    <p className="mt-3 text-4xl font-bold text-violet-600">
      92%
    </p>
  </div>

</div>

      </div>
    </AdminShell>
  );
}