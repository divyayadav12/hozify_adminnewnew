import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  Search,
  Mail,
  MessageSquare,
  Smartphone,
  Plus,
  Eye,
  Clock,
  User,
  LayoutGrid,
  List,
  ChevronDown,
  TrendingUp,
  ChevronRight,
  MoreVertical
} from "lucide-react";

// Mock Data Source for Dynamic State
const INITIAL_TEMPLATES = [
  { id: 1, title: "Welcome Onboard", channel: "email", status: "APPROVED", desc: "First interaction email sent to new users...", time: "2h ago", author: "Admin", internalId: "TMPL_001" },
  { id: 2, title: "Two-Factor Auth", channel: "sms", status: "PENDING", desc: "Quick SMS template for security codes and logins", time: "5h ago", author: "Sarah J.", internalId: "TMPL_002" },
  { id: 3, title: "System Downtime", channel: "push", status: "APPROVED", desc: "Critical push notification alert for infrastructure maintenance", time: "1d ago", author: "Admin", internalId: "TMPL_003" },
  { id: 4, title: "Weekly Digest", channel: "email", status: "APPROVED", desc: "Automated content summary sent every weekend...", time: "3d ago", author: "Mike T.", internalId: "TMPL_004" },
  { id: 5, title: "Re-engagement", channel: "email", status: "PENDING", desc: "Win-back campaign targeting users who have been inactive", time: "4d ago", author: "Sarah J.", internalId: "TMPL_005" },
  { id: 6, title: "Password Reset", channel: "email", status: "APPROVED", desc: "Secure recovery links sent on-demand to system accounts", time: "5d ago", author: "System", internalId: "TMPL_009" },
  { id: 7, title: "Order Confirmation", channel: "email", status: "APPROVED", desc: "Instant invoice delivery template following checkouts", time: "6d ago", author: "Mike T.", internalId: "TMPL_042" }
];

export default function NotificationTemplates() {
  // State Management
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // recent or name
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter and Search Logic
  const filteredTemplates = INITIAL_TEMPLATES.filter((template) => {
    const matchesChannel = selectedChannel === "all" || template.channel === selectedChannel;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  // Sort Logic
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    return 0; // Defaulting to recent order in mock data array
  });

  // Action Handlers
  const handleEdit = (title) => {
    alert(`Editing Template: ${title}`);
  };

  const handleReview = (title) => {
    alert(`Reviewing Template: ${title}`);
  };

  const handleCreateNew = () => {
    alert("Opening wizard to create a new blank canvas template!");
  };

  return (
    <AdminShell activeTab="Notifications" searchPlaceholder="Search templates...">
      <div className="min-h-screen bg-slate-50 p-8 text-slate-800 space-y-6">
        
        {/* ================= HEADER SEARCH & CONTROLS ================= */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4 flex-1 w-full">
            <h2 className="text-lg font-bold tracking-tight text-[#0f143a] whitespace-nowrap">
              Notification Templates
            </h2>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#251fa3] text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* ================= SUB-HEADER ACTION CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Channels Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => setSelectedChannel("all")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${selectedChannel === "all" ? "bg-[#251fa3] text-white" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"}`}
            >
              All Channels
            </button>
            <button 
              onClick={() => setSelectedChannel("email")}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 border transition-colors ${selectedChannel === "email" ? "bg-[#251fa3] text-white border-[#251fa3]" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              <Mail size={15} /> Email
            </button>
            <button 
              onClick={() => setSelectedChannel("sms")}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 border transition-colors ${selectedChannel === "sms" ? "bg-[#251fa3] text-white border-[#251fa3]" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              <MessageSquare size={15} /> SMS
            </button>
            <button 
              onClick={() => setSelectedChannel("push")}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 border transition-colors ${selectedChannel === "push" ? "bg-[#251fa3] text-white border-[#251fa3]" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              <Smartphone size={15} /> Push
            </button>
          </div>

          {/* Right Layout Views & Sorting */}
          <div className="flex items-center gap-3 self-end sm:self-auto relative">
            <div className="flex items-center border border-slate-200 rounded-md bg-white p-0.5">
              <button className="p-1.5 bg-slate-100 text-slate-800 rounded-sm">
                <LayoutGrid size={16} />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600">
                <List size={16} />
              </button>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 px-4 py-2 rounded-md bg-white text-slate-800 border border-slate-200 font-medium text-sm hover:bg-slate-50"
              >
                {sortBy === "recent" ? "Recently Created" : "Alphabetical (A-Z)"}
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-md shadow-lg z-10 py-1">
                  <button 
                    onClick={() => { setSortBy("recent"); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 font-medium"
                  >
                    Recently Created
                  </button>
                  <button 
                    onClick={() => { setSortBy("name"); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 font-medium"
                  >
                    Alphabetical (A-Z)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= CARDS GRID CONTAINER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Create New Blank Canvas (Dark Blue Dashed Outline) */}
          <div 
            onClick={handleCreateNew}
            className="border-2 border-dashed border-[#1d1880]/40 bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#1d1880] transition-colors h-[280px] shadow-sm"
          >
            <div className="h-10 w-10 rounded-md border border-[#1d1880]/30 flex items-center justify-center text-slate-400 group-hover:text-[#1d1880] group-hover:border-[#1d1880] transition-colors">
              <Plus size={18} />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-700 group-hover:text-[#1d1880]">Create New</p>
            <p className="text-xs text-slate-400 mt-1">Start with a blank canvas</p>
          </div>

          {/* Dynamic Rendered Template Cards with Dark Blue Outlines */}
          {sortedTemplates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white rounded-lg border border-[#1d1880]/20 hover:border-[#1d1880] transition-all p-5 flex flex-col justify-between text-slate-800 h-[280px] shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-indigo-50 text-[#1d1880] rounded">
                    {template.channel === "email" && <Mail size={18} />}
                    {template.channel === "sms" && <MessageSquare size={18} />}
                    {template.channel === "push" && <Smartphone size={18} />}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${template.status === "APPROVED" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"}`}>
                    {template.status}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-slate-900 text-base">{template.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{template.desc}</p>
              </div>

              <div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {template.time}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {template.author}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => template.status === 'PENDING' ? handleReview(template.title) : handleEdit(template.title)}
                    className="flex-1 py-2 text-xs font-semibold rounded bg-[#1d1880] text-white hover:bg-[#161266]"
                  >
                    {template.status === "PENDING" ? "Review" : "Edit"}
                  </button>
                  <button className="px-3 border border-slate-200 text-slate-400 rounded hover:bg-slate-50">
                    {template.status === "PENDING" ? <MoreVertical size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Fallback state when search/filter returns nothing */}
          {sortedTemplates.length === 0 && (
            <div className="col-span-full bg-white p-8 rounded-md border border-slate-200 text-center text-slate-400 text-sm">
              No templates found matching your filter criteria.
            </div>
          )}
        </div>

        {/* Second Row Grid: Performance Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4 bg-gradient-to-b from-[#0c0d2e] to-[#04051a] rounded-lg border border-slate-800 p-6 flex flex-col justify-between min-h-[200px] shadow-md">
            <div>
              <h4 className="text-sm font-semibold text-slate-400">Performance Overview</h4>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-end mt-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">SENT TODAY</span>
                <span className="block text-3xl font-black mt-1 text-white">1.2M</span>
                <span className="block text-[10px] font-semibold text-green-500 mt-1">+12% vs yesterday</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">OPEN RATE</span>
                <span className="block text-3xl font-black mt-1 text-white">24.8%</span>
                <span className="block text-[10px] text-slate-500 mt-1">Avg across all email</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">CTR</span>
                <span className="block text-3xl font-black mt-1 text-white">3.2%</span>
                <span className="block text-[10px] text-slate-500 mt-1">Avg across all channels</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="h-14 w-24 bg-[#14163c] rounded-md flex items-center justify-center text-indigo-400 border border-slate-800">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RECENT ACTIVITY LOG (Excel Format Table) ================= */}
        <div className="bg-white border-2 border-slate-300 rounded shadow-sm overflow-hidden text-slate-800 font-mono text-xs">
          <div className="px-4 py-2 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between font-sans">
            <h3 className="font-bold text-slate-800 text-xs tracking-tight">📁 Spreadsheet View: recent_activity_log.xlsx</h3>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-semibold font-mono">Ready</span>
          </div>

          <div className="overflow-x-auto">
<<<<<<< HEAD
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full border-collapse text-left text-xs">
=======
            {/* Grid/Border Excel Sheet Styling */}
            <table className="w-full border-collapse border border-slate-300">
>>>>>>> 94fd7cb (Updated partner modules and export components)
              <thead>
                <tr className="bg-slate-200 text-slate-700 font-bold border-b border-slate-300 text-left">
                  <th className="border border-slate-300 bg-slate-300/60 w-8 text-center text-slate-500 text-[10px]"></th>
                  <th className="border border-slate-300 px-4 py-2 text-[11px]">A: TEMPLATE NAME</th>
                  <th className="border border-slate-300 px-4 py-2 text-[11px]">B: CHANNEL</th>
                  <th className="border border-slate-300 px-4 py-2 text-[11px]">C: INTERNAL ID</th>
                  <th className="border border-slate-300 px-4 py-2 text-[11px]">D: MODIFIED BY</th>
                  <th className="border border-slate-300 px-4 py-2 text-[11px]">E: STATUS</th>
                  <th className="border border-slate-300 px-2 py-2 text-center w-12">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {sortedTemplates.map((template, index) => (
                  <tr key={template.id} className="hover:bg-amber-50/40 transition-colors">
                    {/* Excel Row Index Indicator */}
                    <td className="border border-slate-300 bg-slate-100 text-center text-[10px] text-slate-400 font-bold select-none">
                      {index + 1}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 font-semibold text-slate-900 font-sans">
                      {template.title}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 text-slate-700 capitalize">
                      {template.channel}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 text-indigo-700 font-semibold font-mono">
                      {template.internalId}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 text-slate-600 font-sans">
                      {template.author}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${template.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
                        {template.status}
                      </span>
                    </td>
                    <td className="border border-slate-300 px-2 py-2 text-center">
                      <button 
                        onClick={() => handleEdit(template.title)} 
                        className="p-1 hover:bg-slate-200 rounded text-slate-600"
                        title="Open Row Data"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}