import React, { useMemo, useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";

import {
  Building2,
  MapPinned,
  Users,
  Activity,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";

const branchStats = [
  {
    title: "Active Branches",
    value: "812",
    growth: "+12%",
    icon: Building2,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    description: "Branches currently fully operational.",
  },
  {
    title: "Coverage Cities",
    value: "148",
    growth: "+8%",
    icon: MapPinned,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
    description: "Cities covered by active branch services.",
  },
  {
    title: "Branch Managers",
    value: "864",
    growth: "+15%",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    description: "Managers driving partner branch outcomes.",
  },
  {
    title: "Service Mapping",
    value: "96%",
    growth: "+4%",
    icon: Activity,
    color: "text-orange-600",
    bg: "bg-orange-100",
    description: "Service mapping coverage across locations.",
  },
];

const branches = [
  {
    name: "Mumbai Central Hub",
    code: "BR-1021",
    city: "Mumbai",
    employees: "82",
    manager: "Rahul Sharma",
    status: "Active",
  },
  {
    name: "Delhi Operations Center",
    code: "BR-1022",
    city: "Delhi",
    employees: "65",
    manager: "Amit Verma",
    status: "Active",
  },
  {
    name: "Bangalore Service Point",
    code: "BR-1023",
    city: "Bangalore",
    employees: "48",
    manager: "Priya Singh",
    status: "Pending",
  },
];

const actionInfo = {
  add: {
    title: "Add Branch",
    description: "Start a new branch setup flow with manager assignment, service mapping, and coverage planning.",
  },
  coverage: {
    title: "Coverage Map",
    description: "View the latest city coverage and branch reach, with hotspot regions highlighted for action.",
  },
  export: {
    title: "Export Data",
    description: "Generate a branch export package with the latest directory records and regional performance metrics.",
  },
  default: {
    title: "Branch Actions",
    description: "Click an action button to see a focused pop-up with the next step for branch operations.",
  },
};

export default function PartnerBranches() {
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [actionMode, setActionMode] = useState("default");
  const [selectedExportOptions, setSelectedExportOptions] = useState(["all"]);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const activeStat = branchStats[activeStatIndex];
  const activeAction = actionInfo[actionMode] || actionInfo.default;

  const branchExportStats = {
    total: branches.length,
    active: branches.filter((branch) => branch.status === "Active").length,
    pending: branches.filter((branch) => branch.status !== "Active").length,
  };

  const exportOptions = [
    {
      key: "directory",
      label: "Branch Directory",
      description: "Branch names, IDs, managers and city details.",
    },
    {
      key: "coverage",
      label: "Coverage Map Report",
      description: "Coverage and service reach per city.",
    },
    {
      key: "performance",
      label: "Performance Summary",
      description: "Branch KPIs, uptime and SLA metrics.",
    },
    {
      key: "all",
      label: "Full Export Package",
      description: "All documents and reports in one download.",
    },
  ];

  const toggleExportOption = (key) => {
    setSelectedExportOptions((current) => {
      if (key === "all") {
        return ["all"];
      }

      const next = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current.filter((item) => item !== "all"), key];

      return next.length === 0 ? ["all"] : next;
    });
  };

  const handleExport = (format) => {
    setIsExportOpen(false);
    alert(`${format} export for branch data is starting...`);
  };

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search branches..."
    >
      <div className="space-y-8">

        {/* Hero */}

        <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white">

          <div className="absolute inset-0 opacity-[0.03]">

            <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

          </div>

          <div className="relative z-10 p-10">

            <div className="flex flex-col xl:flex-row justify-between gap-10">

              <div>

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold tracking-[0.3em] text-emerald-700">
                  BRANCH OPERATIONS
                </span>

                <h1 className="mt-6 text-3xl font-bold text-slate-900">
                  Branch Network
                  <br />
                  Command Center
                </h1>

                <p className="mt-5 max-w-3xl text-lg text-slate-600">
                  Monitor branch performance, regional coverage,
                  workforce allocation and service mapping across
                  the entire partner network.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <button
                    type="button"
                    onClick={() => setActionMode("add")}
                    className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                      actionMode === "add"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    Add Branch
                  </button>

                  <button
                    type="button"
                    onClick={() => setActionMode("coverage")}
                    className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                      actionMode === "coverage"
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    Coverage Map
                  </button>

                  <button
                    type="button"
                    onClick={() => setActionMode("export")}
                    className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                      actionMode === "export"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    Export Data
                  </button>

                </div>

                {actionMode !== "default" && (
                  <div className="relative mt-5">
                    <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 rounded-sm bg-white shadow-sm" />
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-lg">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                            Action Preview
                          </p>
                          <h4 className="mt-2 text-lg font-semibold text-slate-900">
                            {activeAction.title}
                          </h4>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {activeAction.title}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">
                        {activeAction.description}
                      </p>

                      {actionMode === "export" && (
                        <div className="mt-5 space-y-3">
                          {exportOptions.map((option) => (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() => toggleExportOption(option.key)}
                              className={`flex w-full items-start justify-between rounded-3xl border px-4 py-4 text-left transition duration-200 ${
                                selectedExportOptions.includes(option.key)
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-slate-100"
                              }`}
                            >
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {option.label}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                  {option.description}
                                </p>
                              </div>
                              <span className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                                selectedExportOptions.includes(option.key)
                                  ? "border-indigo-500 bg-indigo-600 text-white"
                                  : "border-slate-200 bg-white text-slate-400"
                              }`}>
                                {selectedExportOptions.includes(option.key) ? "✓" : ""}
                              </span>
                            </button>
                          ))}

                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                            >
                              Export Selected
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              <div className="grid grid-cols-2 gap-3 min-w-[380px]">

                {branchStats.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveStatIndex(index)}
                      className={`rounded-3xl border px-4 py-4 text-left transition duration-200 ${
                        activeStatIndex === index
                          ? "border-indigo-400 bg-indigo-50 shadow-md"
                          : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${item.bg} shadow-lg`}>
                          <Icon className={`h-7 w-7 ${item.color} stroke-2`} />
                        </div>
                        <span className={`text-sm font-semibold ${item.color}`}>
                          {item.growth}
                        </span>
                      </div>

                      <p className="mt-4 text-sm font-semibold text-slate-700">
                        {item.title}
                      </p>

                      <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {item.value}
                      </h3>
                    </button>
                  );
                })}

              </div>

            </div>

          </div>

        </div>
        {/* ================= REGION ANALYTICS ================= */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* Coverage Analytics */}

  <div className="xl:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
          Regional Coverage
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Branch Network Distribution
        </h2>

      </div>

      <MapPinned className="text-emerald-600" size={28} />

    </div>

    <div className="mt-10 space-y-8">

      {[
        ["North Region", "92%"],
        ["South Region", "96%"],
        ["East Region", "81%"],
        ["West Region", "98%"],
      ].map(([region, value]) => (

        <div key={region}>

          <div className="mb-3 flex justify-between">

            <span className="font-medium text-slate-700">
              {region}
            </span>

            <span className="font-bold text-emerald-600">
              {value}
            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-100">

            <div
              className="h-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
              style={{
                width: value,
              }}
            />

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Top Branch */}

  <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-slate-900">

    <div className="flex items-center justify-between">

      <Activity size={28} className="text-orange-600" />

      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700">
        Top Metric
      </span>

    </div>

    <h3 className="mt-8 text-2xl font-bold text-slate-900">
      {activeStat.title}
    </h3>

    <p className="mt-3 text-slate-600">
      {activeStat.description}
    </p>

    <div className="mt-8 space-y-4">

      <div className="flex justify-between">
        <span className="text-slate-600">
          Current value
        </span>

        <span className="font-semibold text-slate-900">
          {activeStat.value}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-600">
          Growth
        </span>

        <span className={`font-semibold ${activeStat.color}`}>
          {activeStat.growth}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-600">
          Live update
        </span>

        <span className="font-semibold text-slate-900">
          {activeAction.description}
        </span>
      </div>

    </div>

  </div>

</div>

{/* ================= OPERATION METRICS ================= */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">

    <Building2 size={30} className="text-emerald-600" />

    <h3 className="mt-5 text-4xl font-bold text-slate-900">
      864
    </h3>

    <p className="mt-2 text-slate-600">
      Total Branch Locations
    </p>

  </div>

  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">

    <Users className="text-indigo-600" size={30} />

    <h3 className="mt-5 text-4xl font-bold text-slate-900">
      5,428
    </h3>

    <p className="mt-2 text-slate-600">
      Assigned Workforce
    </p>

  </div>

  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">

    <Activity className="text-orange-500" size={30} />

    <h3 className="mt-5 text-4xl font-bold text-slate-900">
      96.2%
    </h3>

    <p className="mt-2 text-slate-600">
      Avg Operational Score
    </p>

  </div>

</div>
{/* ================= BRANCH DIRECTORY ================= */}

<div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">

  {/* Header */}

  <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">

    <div>

      <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
        Branch Registry
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        Operational Branch Directory
      </h2>

      <p className="mt-1 text-slate-500">
        View and manage all registered branch locations
      </p>

    </div>

        <div className="flex items-center">
          <PartnerExportButton onClick={() => setIsExportOpen(true)} label="Export Branch Data" />
        </div>

        <PartnerExportModal
          open={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          title="Export Branch Data"
          description="Choose your preferred file format to download the current branch dataset."
          helper="Select one of the available export formats below."
          onExport={handleExport}
          confirmLabel="Generate Export"
        />
      </div>

<<<<<<< HEAD
  {/* Table */}

  <div className="overflow-x-auto">

    <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full">

      <thead className="bg-slate-50">

        <tr className="text-left text-sm font-semibold text-slate-500">

          <th className="px-6 py-5">BRANCH</th>
          <th>MANAGER</th>
          <th>CITY</th>
          <th>EMPLOYEES</th>
          <th>STATUS</th>
          <th>ACTIONS</th>

        </tr>

      </thead>

      <tbody>
=======
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-500">
              <th className="px-6 py-5">BRANCH</th>
              <th className="px-6 py-5">MANAGER</th>
              <th className="px-6 py-5">CITY</th>
              <th className="px-6 py-5">EMPLOYEES</th>
              <th className="px-6 py-5">STATUS</th>
              <th className="px-6 py-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
>>>>>>> 94fd7cb (Updated partner modules and export components)

        {branches.map((branch) => (

          <tr
            key={branch.code}
            className="border-t border-slate-100 hover:bg-slate-50"
          >

            <td className="px-6 py-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 font-bold text-emerald-700">
                  {branch.name.charAt(0)}
                </div>

                <div>

                  <h4 className="font-semibold text-slate-900">
                    {branch.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {branch.code}
                  </p>

                </div>

              </div>

            </td>

            <td className="font-medium">
              {branch.manager}
            </td>

            <td>
              {branch.city}
            </td>

            <td>
              {branch.employees}
            </td>

            <td>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  branch.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {branch.status}
              </span>

            </td>

            <td>

              <button className="rounded-xl p-2 hover:bg-slate-100">
                <MoreVertical size={18} />
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table></div>

  </div>

</div>

{/* ================= BRANCH LEADERS ================= */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="rounded-[32px] border border-slate-200 bg-white p-6">

    <div className="flex items-center justify-between">

      <h3 className="font-bold text-xl text-slate-900">
        Regional Lead
      </h3>

      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
        North
      </span>

    </div>

    <h4 className="mt-6 text-2xl font-bold">
      Rahul Sharma
    </h4>

    <p className="mt-2 text-slate-500">
      Oversees 42 branch locations across
      northern operational zones.
    </p>

  </div>

  <div className="rounded-[32px] border border-slate-200 bg-white p-6">

    <div className="flex items-center justify-between">

      <h3 className="font-bold text-xl text-slate-900">
        Regional Lead
      </h3>

      <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700">
        South
      </span>

    </div>

    <h4 className="mt-6 text-2xl font-bold">
      Priya Patel
    </h4>

    <p className="mt-2 text-slate-500">
      Responsible for service delivery and
      branch growth in southern regions.
    </p>

  </div>

  <div className="rounded-[32px] border border-slate-200 bg-white p-6">

    <div className="flex items-center justify-between">

      <h3 className="font-bold text-xl text-slate-900">
        Regional Lead
      </h3>

      <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">
        West
      </span>

    </div>

    <h4 className="mt-6 text-2xl font-bold">
      Amit Verma
    </h4>

    <p className="mt-2 text-slate-500">
      Managing operational performance and
      workforce planning across western zones.
    </p>

  </div>

</div>
{/* ================= ACTIVITY TIMELINE ================= */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* Timeline */}

  <div className="xl:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8">

    <div>

      <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
        Recent Activities
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        Branch Activity Timeline
      </h2>

    </div>

    <div className="mt-10 space-y-8">

      {[
        {
          time: "09:15 AM",
          title: "Mumbai Central Hub Approved",
          desc: "Branch verification completed successfully.",
        },
        {
          time: "11:42 AM",
          title: "New Delhi Branch Request",
          desc: "New branch registration submitted for review.",
        },
        {
          time: "01:20 PM",
          title: "Branch Manager Updated",
          desc: "Leadership assignment modified for Bangalore region.",
        },
        {
          time: "04:05 PM",
          title: "Coverage Mapping Completed",
          desc: "West region service coverage updated.",
        },
      ].map((activity, index) => (

        <div
          key={index}
          className="flex gap-5"
        >

          <div className="flex flex-col items-center">

            <div className="h-4 w-4 rounded-full bg-emerald-500"></div>

            {index !== 3 && (
              <div className="mt-2 h-20 w-[2px] bg-slate-200"></div>
            )}

          </div>

          <div>

            <p className="text-sm text-slate-500">
              {activity.time}
            </p>

            <h4 className="mt-1 font-bold text-slate-900">
              {activity.title}
            </h4>

            <p className="mt-1 text-slate-500">
              {activity.desc}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Coverage Score */}

  <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-slate-900">

    <p className="text-sm uppercase tracking-wider text-slate-500">
      Coverage Health
    </p>

    <h2 className="mt-5 text-6xl font-bold">
      96%
    </h2>

    <p className="mt-3 text-slate-600">
      Overall branch coverage efficiency across all operational regions.
    </p>

    <div className="mt-10 space-y-5">

      <div className="flex justify-between">
        <span className="text-slate-600">
          Active Regions
        </span>

        <span className="font-semibold text-slate-900">48</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-600">
          Coverage Cities
        </span>

        <span className="font-semibold text-slate-900">148</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-600">
          Expansion Requests
        </span>

        <span className="font-semibold text-slate-900">23</span>
      </div>

    </div>

  </div>

</div>

{/* ================= INSIGHTS ================= */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="rounded-[28px] border border-slate-200 bg-white p-6">

    <h3 className="font-bold text-lg text-slate-900">
      Fastest Growing Region
    </h3>

    <p className="mt-3 text-4xl font-bold text-emerald-600">
      South
    </p>

    <p className="mt-3 text-slate-500">
      Increased branch operations by 18%
      this quarter.
    </p>

  </div>

  <div className="rounded-[28px] border border-slate-200 bg-white p-6">

    <h3 className="font-bold text-lg text-slate-900">
      Best Performance
    </h3>

    <p className="mt-3 text-4xl font-bold text-cyan-600">
      98.4%
    </p>

    <p className="mt-3 text-slate-500">
      Mumbai Central Hub achieved highest
      operational score.
    </p>

  </div>

  <div className="rounded-[28px] border border-slate-200 bg-white p-6">

    <h3 className="font-bold text-lg text-slate-900">
      Expansion Pipeline
    </h3>

    <p className="mt-3 text-4xl font-bold text-violet-600">
      23
    </p>

    <p className="mt-3 text-slate-500">
      New branch requests currently under
      compliance review.
    </p>

  </div>

</div>

      </div>
    </AdminShell>
  );
}