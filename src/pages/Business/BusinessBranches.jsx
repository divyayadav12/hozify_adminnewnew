import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Search,
  User,
  Users,
  MapPin,
  Plus,
  Minus,
  Compass,
  Building2,
  X,
} from "lucide-react";

const INITIAL_BRANCHES = [
  {
    id: 1,
    name: "Downtown Flagship",
    address: "442 Broadway, New York, NY 10013",
    manager: "Sarah Jenkins",
    staff: 12,
    statusLabel: "ACTIVE",
    statusColor: "text-[#0369A1]",
    statusBg: "bg-[#E0F2FE]",
    tag: "HQ REGION",
    active: true,
    mapLeft: "52%",
    mapTop: "24%",
    capacity: 85,
    onSite: "10/12",
    region: "East Coast",
    iconBg: "bg-black",
  },
  {
    id: 2,
    name: "East Bay Logistics",
    address: "2100 Powell St, Emeryville, CA 94608",
    manager: "Michael Chen",
    staff: 45,
    statusLabel: "MAINTENANCE",
    statusColor: "text-[#DC2626]",
    statusBg: "bg-[#FEE2E2]",
    tag: "WEST COAST",
    active: false,
    mapLeft: "63%",
    mapTop: "12%",
    capacity: 42,
    onSite: "30/45",
    region: "West Coast",
    iconBg: "bg-[#70707A]",
  },
  {
    id: 3,
    name: "Austin Tech Hub",
    address: "501 Congress Ave, Austin, TX 78701",
    manager: "Elena Rodriguez",
    staff: 28,
    statusLabel: "ACTIVE",
    statusColor: "text-[#0369A1]",
    statusBg: "bg-[#E0F2FE]",
    tag: "SOUTH CENTRAL",
    active: true,
    mapLeft: "61%",
    mapTop: "40%",
    capacity: 71,
    onSite: "22/28",
    region: "South Central",
    iconBg: "bg-black",
  },
];

export default function BusinessBranches() {
  const { addToast } = useToast();

  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [selectedBranchId, setSelectedBranchId] = useState(1);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapZoom, setMapZoom] = useState(1);

  const selectedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  const filteredBranches = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (branchId) => {
    setBranches((prev) =>
      prev.map((b) => {
        if (b.id !== branchId) return b;
        const nowActive = !b.active;
        addToast(
          nowActive
            ? `${b.name} activated successfully.`
            : `${b.name} deactivated.`,
          nowActive ? "success" : "info"
        );
        return {
          ...b,
          active: nowActive,
          statusLabel: nowActive ? "ACTIVE" : "INACTIVE",
          statusColor: nowActive ? "text-[#0369A1]" : "text-[#9CA3AF]",
          statusBg: nowActive ? "bg-[#E0F2FE]" : "bg-[#F3F4F6]",
        };
      })
    );
  };

  const handleBranchClick = (branch) => {
    setSelectedBranchId(branch.id);
    setTooltipVisible(true);
    addToast(`Viewing ${branch.name} on map.`, "info");
  };

  const handleExportCSV = () => {
    addToast("Exporting branch directory as CSV...", "success");
    const headers = "Branch ID,Branch Name,Address,Manager,Staff Count,Status,Region,Capacity,On Site";
    const csvRows = branches.map(b => 
      `"${b.id}","${b.name}","${b.address}","${b.manager}","${b.staff}","${b.statusLabel}","${b.region}","${b.capacity}","${b.onSite}"`
    );
    const csvContent = [headers, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'branch_directory.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setMapZoom((z) => {
      const next = Math.min(z + 0.15, 2);
      addToast(`Map zoom: ${Math.round(next * 100)}%`, "info");
      return next;
    });
  };

  const handleZoomOut = () => {
    setMapZoom((z) => {
      const next = Math.max(z - 0.15, 0.5);
      addToast(`Map zoom: ${Math.round(next * 100)}%`, "info");
      return next;
    });
  };

  const handleCompass = () => {
    setMapZoom(1);
    addToast("Map orientation reset to north.", "info");
  };

  const handleViewAnalytics = () => {
    addToast(`Opening full analytics for ${selectedBranch.name}...`, "info");
  };

  const activeBranchCount = branches.filter((b) => b.active).length;

  return (
    <AdminShell activeTab="Branch Management">
      {/* Main Full-Screen Layout Container */}
      <div className="flex h-screen w-full overflow-hidden bg-[#F5F6F8]">

        {/* ================= LEFT SIDEBAR (BRANCH DIRECTORY LIST) ================= */}
        <div className="w-[340px] border-r border-[#E5E7EB] bg-white flex flex-col h-full z-10 shrink-0">

          {/* Header Section */}
          <div className="p-5 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold text-[#111827]">Branch Directory</h2>
              <span className="rounded bg-[#1E1B4B] px-2.5 py-1 text-[12px] font-semibold text-white">
                {activeBranchCount} Active / {branches.length} Total
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[36px] pl-8 pr-3 rounded border border-[#E5E7EB] text-[13px] text-[#111827] outline-none bg-[#F9FAFB] placeholder-[#9CA3AF]"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                className="h-[38px] rounded bg-black text-[13px] font-medium text-white shadow-sm transition-all duration-150 active:scale-95 active:brightness-75 hover:brightness-90"
                onClick={() => addToast("Switched to List View.", "info")}
                type="button"
              >
                List View
              </button>
              <button
                className="h-[38px] rounded border border-[#CFCFD4] bg-white text-[13px] font-medium text-[#333] shadow-sm transition-all duration-150 active:scale-95 active:bg-[#F3F4F6] hover:bg-[#F9FAFB]"
                onClick={handleExportCSV}
                type="button"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* List Content - Scrollable area */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E5E7EB]">
            {filteredBranches.length === 0 && (
              <p className="p-5 text-[13px] text-[#9CA3AF] text-center">No branches match your search.</p>
            )}

            {filteredBranches.map((branch) => {
              const isSelected = branch.id === selectedBranchId;
              return (
                <div
                  key={branch.id}
                  className="p-5 cursor-pointer transition-all duration-150 active:scale-[0.985] active:brightness-95 select-none"
                  style={{ background: isSelected ? "#F0F4FF" : branch.id % 2 === 1 ? "#FAFAFB" : "#fff", borderLeft: isSelected ? "3px solid #1E1B4B" : "3px solid transparent" }}
                  onClick={() => handleBranchClick(branch)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[15px] font-bold text-[#111827]">{branch.name}</h3>

                    {/* Toggle Switch */}
                    <div
                      className={`relative w-9 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-all duration-200 active:scale-90 hover:opacity-80 ${branch.active ? "bg-black justify-end" : "bg-[#CBD5E1] justify-start"}`}
                      onClick={(e) => { e.stopPropagation(); handleToggle(branch.id); }}
                      title={branch.active ? "Deactivate branch" : "Activate branch"}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200" />
                    </div>
                  </div>

                  <p className="text-[12px] text-[#70707A] mb-3">{branch.address}</p>

                  <div className="grid grid-cols-2 gap-y-2 text-[13px] text-[#5E6470] mb-4">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-[#9CA3AF]" />
                      <span>{branch.manager}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-[#9CA3AF]" />
                      <span>{branch.staff} Staff</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className={`rounded ${branch.statusBg} px-2 py-0.5 text-[11px] font-bold ${branch.statusColor}`}>
                      {branch.statusLabel}
                    </span>
                    <span className="rounded bg-[#F3F4F6] px-2 py-0.5 text-[11px] font-bold text-[#4B5563]">
                      {branch.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT MAP OVERLAY GRAPHIC SYSTEM ================= */}
        <div className="flex-1 relative h-full bg-[#E3E5E8] overflow-hidden">

          {/* Map backdrop with zoom transform */}
          <div
            className="absolute inset-0 pointer-events-none opacity-90 select-none bg-cover bg-center transition-transform duration-300"
            style={{
              backgroundImage: "url('/assets/nyc-light-map-grid.jpg')",
              transform: `scale(${mapZoom})`,
              transformOrigin: "center center",
            }}
          >
            <div className="absolute left-[35%] top-[10%] font-bold text-[24px] text-[#94A3B8] tracking-wide">West New York</div>
            <div className="absolute left-[30%] top-[14%] font-bold text-[22px] text-[#94A3B8]">North Bergen</div>
            <div className="absolute left-[65%] top-[5%] font-bold text-[22px] text-[#94A3B8]">City of New York</div>
            <div className="absolute left-[70%] top-[20%] font-bold text-[20px] text-[#A8A29E] tracking-widest">MANHATTAN</div>
            <div className="absolute left-[40%] top-[38%] font-bold text-[22px] text-[#94A3B8]">Hoboken</div>
            <div className="absolute left-[36%] top-[48%] font-bold text-[28px] text-[#64748B] tracking-wide">Jersey City</div>
            <div className="absolute left-[54%] top-[51%] font-bold text-[44px] text-[#334155] tracking-wide">New York</div>
            <div className="absolute left-[75%] top-[65%] font-bold text-[22px] text-[#94A3B8]">Brooklyn</div>
          </div>

          {/* Branch Map Pins */}
          {branches.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <div
                key={branch.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                style={{ left: branch.mapLeft, top: branch.mapTop }}
                onClick={() => handleBranchClick(branch)}
                title={branch.name}
              >
                <div
                  className={`rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all duration-200 group-active:scale-75 group-hover:scale-110 ${isSelected ? "w-9 h-9" : "w-10 h-10"}`}
                  style={{ background: isSelected ? "#1E1B4B" : branch.active ? "#70707A" : "#CBD5E1" }}
                >
                  {branch.id % 2 === 0
                    ? <Building2 size={isSelected ? 22 : 18} className="text-white" />
                    : <MapPin size={isSelected ? 22 : 20} className="text-white" />
                  }
                </div>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border border-white animate-pulse" />
                )}
              </div>
            );
          })}

          {/* ================= MAP TOOLTIP (Selected Branch) ================= */}
          {tooltipVisible && (
            <div
              className="absolute z-20 w-[280px] bg-white rounded-lg shadow-xl border border-[#D7D9E0] p-4"
              style={{
                left: selectedBranch.mapLeft,
                top: `calc(${selectedBranch.mapTop} - 80px)`,
                transform: "translateX(-50%)",
              }}
            >
              {/* Tooltip arrow */}
              <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-[#D7D9E0]" />

              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded ${selectedBranch.iconBg} flex items-center justify-center`}>
                    <Building2 size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#111827]">{selectedBranch.name}</h4>
                    <span className={`text-[10px] font-bold ${selectedBranch.statusColor}`}>{selectedBranch.statusLabel}</span>
                  </div>
                </div>
                <button
                  className="text-[#9CA3AF] hover:text-[#4B5563] transition-all duration-150 active:scale-75 hover:rotate-90"
                  onClick={() => setTooltipVisible(false)}
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="text-[12px] text-[#5E6470] mb-3 space-y-1">
                <p className="leading-relaxed">
                  Current load: <strong className="text-[#111827]">{selectedBranch.capacity}%</strong> capacity. Staff on-site: <strong className="text-[#111827]">{selectedBranch.onSite}</strong>.
                </p>
                <p className="flex items-center gap-1">
                  <User size={11} className="text-[#9CA3AF]" /> Manager: <strong className="text-[#111827] ml-1">{selectedBranch.manager}</strong>
                </p>
              </div>

              {/* Capacity bar */}
              <div className="mb-3">
                <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${selectedBranch.capacity}%`,
                      background: selectedBranch.capacity > 80 ? "#ef4444" : selectedBranch.capacity > 50 ? "#f59e0b" : "#10b981",
                    }}
                  />
                </div>
              </div>

              <button
                className="w-full h-[32px] bg-black rounded text-[12px] font-medium text-white hover:bg-[#222] transition-all duration-150 active:scale-95 active:brightness-75"
                onClick={handleViewAnalytics}
                type="button"
              >
                View Full Analytics
              </button>
            </div>
          )}

          {/* ================= MAP CONTROLS ================= */}
          <div className="absolute right-6 top-6 flex flex-col gap-2 z-20">
            <div className="flex flex-col rounded-lg bg-white shadow-md border border-[#E5E7EB] overflow-hidden">
              <button
                className="w-10 h-10 flex items-center justify-center text-[#4B5563] hover:bg-[#F9FAFB] border-b border-[#E5E7EB] transition-all duration-150 active:scale-75 active:bg-[#E5E7EB]"
                onClick={handleZoomIn}
                type="button"
                title="Zoom In"
              >
                <Plus size={18} />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center text-[#4B5563] hover:bg-[#F9FAFB] transition-all duration-150 active:scale-75 active:bg-[#E5E7EB]"
                onClick={handleZoomOut}
                type="button"
                title="Zoom Out"
              >
                <Minus size={18} />
              </button>
            </div>

            <button
              className="w-10 h-10 rounded-lg bg-white shadow-md border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:bg-[#F9FAFB] transition-all duration-300 active:scale-75 hover:rotate-180"
              onClick={handleCompass}
              type="button"
              title="Reset Map"
            >
              <Compass size={18} />
            </button>
          </div>

          {/* ================= REGIONAL PERFORMANCE WIDGET ================= */}
          <div className="absolute left-6 bottom-6 w-[240px] bg-white rounded-xl border border-[#D7D9E0] shadow-xl p-5 z-20">
            <h4 className="text-[14px] font-bold text-[#111827] mb-4">Regional Performance</h4>

            <div className="space-y-4">
              {[
                { label: "East Coast", value: branches.filter(b => b.tag === "HQ REGION" && b.active).length > 0 ? 92 : 20 },
                { label: "West Coast", value: branches.filter(b => b.tag === "WEST COAST" && b.active).length > 0 ? 64 : 10 },
                { label: "South Central", value: branches.filter(b => b.tag === "SOUTH CENTRAL" && b.active).length > 0 ? 71 : 10 },
              ].map((region) => (
                <div key={region.label}>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                    <span>{region.label}</span>
                    <span className="text-[#111827]">{region.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all duration-500"
                      style={{ width: `${region.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}