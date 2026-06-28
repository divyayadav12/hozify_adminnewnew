import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  Filter,
  Download,
  MoreVertical,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ALL_EMPLOYEES = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.c@hozify.com",
    role: "Senior Operations Manager",
    dept: "Logistics & Supply",
    permissions: ["ADMIN", "FINANCE"],
    performance: "EXCEEDING",
    performanceColor: "bg-green-100 text-green-700",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    id: 2,
    name: "Marcus Holloway",
    email: "m.holloway@hozify.com",
    role: "Product Lead",
    dept: "Growth & Innovation",
    permissions: ["EDITOR"],
    performance: "CONSISTENT",
    performanceColor: "bg-blue-100 text-blue-700",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@hozify.com",
    role: "Support Specialist",
    dept: "Customer Relations",
    permissions: ["SUPPORT", "CHAT"],
    performance: "RISING STAR",
    performanceColor: "bg-purple-100 text-purple-700",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1?w=200",
  },
  {
    id: 4,
    name: "Julian Vane",
    email: "j.vane@hozify.com",
    role: "Technical Architect",
    dept: "Engineering",
    permissions: ["SYSADMIN"],
    performance: "VETERAN",
    performanceColor: "bg-orange-100 text-orange-700",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200",
  },
  {
    id: 5,
    name: "Priya Nair",
    email: "p.nair@hozify.com",
    role: "Data Analyst",
    dept: "Analytics & Insights",
    permissions: ["VIEWER", "REPORTS"],
    performance: "EXCEEDING",
    performanceColor: "bg-green-100 text-green-700",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
  },
  {
    id: 6,
    name: "Liam O'Brien",
    email: "l.obrien@hozify.com",
    role: "DevOps Engineer",
    dept: "Engineering",
    permissions: ["SYSADMIN", "DEPLOY"],
    performance: "CONSISTENT",
    performanceColor: "bg-blue-100 text-blue-700",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
  },
  {
    id: 7,
    name: "Ava Thompson",
    email: "a.thompson@hozify.com",
    role: "Brand Manager",
    dept: "Marketing",
    permissions: ["EDITOR"],
    performance: "RISING STAR",
    performanceColor: "bg-purple-100 text-purple-700",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  },
  {
    id: 8,
    name: "Noah Kim",
    email: "n.kim@hozify.com",
    role: "Finance Controller",
    dept: "Finance",
    permissions: ["FINANCE", "ADMIN"],
    performance: "VETERAN",
    performanceColor: "bg-orange-100 text-orange-700",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
];

const PAGE_SIZE = 4;
const TOTAL_PAGES = 3; // simulated

export default function BusinessEmployees() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [exportClicked, setExportClicked] = useState(false);
  const [accessLogsClicked, setAccessLogsClicked] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Simulated page data — page 1 shows first 4, page 2 next 4, page 3 wraps
  const pageEmployees = ALL_EMPLOYEES.slice(
    ((currentPage - 1) % 2) * PAGE_SIZE,
    ((currentPage - 1) % 2) * PAGE_SIZE + PAGE_SIZE
  );

  // Dynamic stats based on current page
  const headcounts = [1248, 1261, 1275];
  const retentions = ["94.8%", "95.1%", "95.4%"];
  const topPerformers = [82, 84, 86];
  const moraleBars = [88, 91, 85];

  const headcount = headcounts[currentPage - 1];
  const retention = retentions[currentPage - 1];
  const topPct = topPerformers[currentPage - 1];
  const morale = moraleBars[currentPage - 1];

  const flashBtn = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 300);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
    setSelectedRow(null);
  };

  const handleRowClick = (id) => {
    setSelectedRow((prev) => (prev === id ? null : id));
    setMenuOpenId(null);
  };

  const handleMenuClick = (e, id) => {
    e.stopPropagation();
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <AdminShell
      activeTab="Employee Management"
      searchPlaceholder="Search employees..."
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">Employee Management</h1>
            <p className="text-gray-500 mt-2 transition-all duration-300">
              Manage {headcount.toLocaleString()} active staff members across 14 departments.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className={`h-12 px-5 border rounded-lg flex items-center gap-2 transition-all duration-150 active:scale-95 hover:bg-gray-50 ${filterActive ? "bg-black text-white border-black" : ""}`}
              onClick={() => setFilterActive((v) => !v)}
              type="button"
            >
              <Filter size={18} />
              {filterActive ? "Clear Filter" : "Filter"}
            </button>

            <button
              className={`h-12 px-5 border rounded-lg flex items-center gap-2 transition-all duration-150 active:scale-95 hover:bg-gray-50 ${exportClicked ? "scale-95 bg-gray-100" : ""}`}
              onClick={() => flashBtn(setExportClicked)}
              type="button"
            >
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-12 gap-6">

          {/* CARD 1 — Total Headcount */}
          <div className="col-span-3 bg-white border rounded-xl p-6">
            <h4 className="uppercase tracking-widest text-gray-500 text-sm">
              Total Headcount
            </h4>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-6xl font-light transition-all duration-500">
                {headcount.toLocaleString()}
              </span>
              <span className="text-green-600 font-semibold">+4.2%</span>
            </div>
          </div>

          {/* CARD 2 — Retention Rate */}
          <div className="col-span-3 bg-white border rounded-xl p-6">
            <h4 className="uppercase tracking-widest text-gray-500 text-sm">
              Retention Rate
            </h4>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-6xl font-light transition-all duration-500">
                {retention}
              </span>
              <span className="text-gray-500">High Stability</span>
            </div>
          </div>

          {/* CARD 3 — Performance Highlight */}
          <div className="col-span-6 bg-indigo-950 text-white rounded-xl p-8">
            <h4 className="uppercase tracking-widest text-indigo-300 text-sm">
              Performance Highlight
            </h4>
            <h3 className="text-4xl font-semibold mt-4 max-w-xl transition-all duration-500">
              {topPct}% Employees with 'Top Performer' Badges
            </h3>
            <p className="text-indigo-200 mt-5 max-w-2xl">
              Quarterly assessments show a significant increase in client
              satisfaction scores across the Logistics department.
            </p>
          </div>

        </div>

        {/* EMPLOYEE TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-12 px-8 py-5 bg-gray-50 border-b text-gray-500 font-semibold uppercase tracking-wide">
            <div className="col-span-3">Employee</div>
            <div className="col-span-4">Role & Dept</div>
            <div className="col-span-2">Permissions</div>
            <div className="col-span-2">Performance</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* EMPLOYEE ROWS */}
          {pageEmployees.map((employee) => {
            const isSelected = selectedRow === employee.id;
            const menuOpen = menuOpenId === employee.id;
            return (
              <div
                key={employee.id}
                className={`grid grid-cols-12 px-8 py-6 border-b items-center cursor-pointer transition-all duration-150 select-none active:scale-[0.997] ${
                  isSelected
                    ? "bg-indigo-50 border-l-4 border-l-indigo-700"
                    : "hover:bg-gray-50 border-l-4 border-l-transparent"
                }`}
                onClick={() => handleRowClick(employee.id)}
              >

                {/* EMPLOYEE */}
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className={`w-14 h-14 rounded-full object-cover transition-all duration-200 ${isSelected ? "ring-2 ring-indigo-500 ring-offset-2 scale-110" : ""}`}
                  />
                  <div>
                    <h3 className="text-xl font-medium">{employee.name}</h3>
                    <p className="text-gray-500">{employee.email}</p>
                  </div>
                </div>

                {/* ROLE */}
                <div className="col-span-4">
                  <h4 className="text-xl font-medium">{employee.role}</h4>
                  <p className="text-gray-500 mt-1">{employee.dept}</p>
                </div>

                {/* PERMISSIONS */}
                <div className="col-span-2 flex flex-wrap gap-2">
                  {employee.permissions.map((permission) => (
                    <span
                      key={permission}
                      className={`px-3 py-1 text-xs rounded transition-all duration-200 ${
                        isSelected
                          ? "bg-indigo-100 text-indigo-700 font-semibold"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {permission}
                    </span>
                  ))}
                </div>

                {/* PERFORMANCE */}
                <div className="col-span-2">
                  <span className={`px-4 py-2 rounded font-semibold text-sm ${employee.performanceColor}`}>
                    {employee.performance}
                  </span>
                </div>

                {/* ACTION */}
                <div className="col-span-1 flex justify-center relative">
                  <button
                    className="hover:bg-gray-100 p-2 rounded-full transition-all duration-150 active:scale-75 active:bg-gray-200"
                    onClick={(e) => handleMenuClick(e, employee.id)}
                    type="button"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 top-10 w-40 bg-white border rounded-lg shadow-xl z-30 overflow-hidden animate-[fadeIn_0.15s_ease]">
                      {["View Profile", "Edit Role", "Revoke Access"].map((action) => (
                        <button
                          key={action}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 active:bg-gray-100 transition-colors"
                          onClick={(e) => { e.stopPropagation(); setMenuOpenId(null); }}
                          type="button"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-8 py-5">
            <p className="text-gray-500 text-lg transition-all duration-300">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, headcount)} of{" "}
              {headcount.toLocaleString()} employees
            </p>

            <div className="flex items-center gap-2">
              <button
                className="w-10 h-10 border rounded flex items-center justify-center transition-all duration-150 active:scale-90 hover:bg-gray-50 disabled:opacity-40"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                type="button"
              >
                <ChevronLeft size={16} />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-12 h-12 rounded font-medium transition-all duration-150 active:scale-90 ${
                    currentPage === page
                      ? "bg-black text-white scale-105"
                      : "border hover:bg-gray-50"
                  }`}
                  onClick={() => handlePageChange(page)}
                  type="button"
                >
                  {page}
                </button>
              ))}

              <span className="px-2 text-gray-400">...</span>

              <button
                className={`w-14 h-12 border rounded transition-all duration-150 active:scale-90 hover:bg-gray-50 ${
                  currentPage === TOTAL_PAGES ? "bg-black text-white border-black" : ""
                }`}
                onClick={() => handlePageChange(TOTAL_PAGES)}
                type="button"
              >
                312
              </button>

              <button
                className="w-10 h-10 border rounded flex items-center justify-center transition-all duration-150 active:scale-90 hover:bg-gray-50 disabled:opacity-40"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === TOTAL_PAGES}
                type="button"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-12 gap-6">

          {/* HEALTH CARD */}
          <div className="col-span-6 bg-white border rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center">
                <Award className="text-white" size={26} />
              </div>
              <h3 className="text-4xl font-semibold">Employee Health & Morale</h3>
            </div>

            <p className="text-gray-600 text-xl leading-relaxed transition-all duration-500">
              Aggregate employee engagement scores have remained stable at{" "}
              <strong>{(morale / 20).toFixed(1)}/5</strong>. Recent "Quick
              Feedback" sessions suggest high satisfaction with current project
              management tools.
            </p>

            <div className="mt-10">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-700"
                  style={{ width: `${morale}%` }}
                />
              </div>
            </div>
          </div>

          {/* SECURITY CARD */}
          <div className="col-span-6 bg-white border rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="text-orange-700" size={26} />
              </div>
              <h3 className="text-4xl font-semibold">Security & Access Audits</h3>
            </div>

            <p className="text-gray-600 text-xl leading-relaxed">
              98% of employees have completed their mandatory annual security
              training. {currentPage === 1 ? 14 : currentPage === 2 ? 17 : 21} new "Admin" level permissions were granted this month
              following promotion cycles.
            </p>

            <button
              className={`mt-10 text-2xl font-semibold transition-all duration-150 hover:text-indigo-700 active:scale-95 active:text-indigo-900 ${accessLogsClicked ? "text-indigo-700 scale-95" : ""}`}
              onClick={() => flashBtn(setAccessLogsClicked)}
              type="button"
            >
              View Access Logs →
            </button>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}