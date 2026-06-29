import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  Download,
  Filter,
  Grid2X2,
  Clock3,
  CreditCard,
  Calendar,
  ChevronRight,
} from "lucide-react";

const ALL_SERVICES = [
  {
    id: 1,
    title: "Strategic Consulting",
    code: "SC-001 • High Priority",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300",
    category: "Business Strategy",
    price: "$250.00",
    duration: "60 mins",
    availability: "Instant Booking",
    status: "green",
    tab: "ACTIVE",
  },
  {
    id: 2,
    title: "Architecture Review",
    code: "AR-042 • Technical",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=300",
    category: "Engineering",
    price: "$400.00",
    duration: "120 mins",
    availability: "Requires Approval",
    status: "yellow",
    tab: "ACTIVE",
  },
  {
    id: 3,
    title: "UI/UX Audit",
    code: "DS-009 • Creative",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300",
    category: "Design",
    price: "$180.00",
    duration: "45 mins",
    availability: "Instant Booking",
    status: "green",
    tab: "ACTIVE",
  },
  {
    id: 4,
    title: "Market Research",
    code: "MR-015 • Research",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300",
    category: "Analytics",
    price: "$320.00",
    duration: "90 mins",
    availability: "Requires Approval",
    status: "yellow",
    tab: "ARCHIVED",
  },
  {
    id: 5,
    title: "Brand Audit",
    code: "BA-007 • Branding",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300",
    category: "Branding",
    price: "$210.00",
    duration: "75 mins",
    availability: "Instant Booking",
    status: "green",
    tab: "ARCHIVED",
  },
];

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const PAGE_SIZE = 3;

export default function BusinessServices() {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [currentPage, setCurrentPage] = useState(1);
  const [peakPricingOn, setPeakPricingOn] = useState(true);
  const [memberDiscountOn, setMemberDiscountOn] = useState(false);
  const [activeDays, setActiveDays] = useState([1, 2, 3, 4, 5]); // MON–FRI
  const [clickedRow, setClickedRow] = useState(null);
  const [exportClicked, setExportClicked] = useState(false);
  const [filterClicked, setFilterClicked] = useState(false);
  const [gridClicked, setGridClicked] = useState(false);
  const [editHoursClicked, setEditHoursClicked] = useState(false);
  const [manageCampaignClicked, setManageCampaignClicked] = useState(false);

  const filtered = ALL_SERVICES.filter((s) => s.tab === activeTab);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalServices = ALL_SERVICES.filter((s) => s.tab === "ACTIVE").length;
  const avgRevenue = peakPricingOn ? "$1,435" : "$1,240";
  const activePromos =
    (peakPricingOn ? 1 : 0) + (memberDiscountOn ? 1 : 0) + 6;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleDayToggle = (index) => {
    setActiveDays((prev) =>
      prev.includes(index) ? prev.filter((d) => d !== index) : [...prev, index]
    );
  };

  const flashBtn = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 300);
  };

  const handleRowClick = (id) => {
    setClickedRow(id);
    setTimeout(() => setClickedRow(null), 400);
  };

  return (
    <AdminShell activeTab="Business Services" searchPlaceholder="Search services...">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">Business Services</h1>
            <p className="text-gray-500 mt-2 max-w-3xl">
              Manage your service offerings, define dynamic pricing, and control
              global availability windows from a centralized command center.
            </p>
          </div>

          <button
            className={`border border-gray-300 bg-white px-5 h-11 rounded-md flex items-center gap-2 transition-all duration-150 hover:bg-gray-50 active:scale-95 active:brightness-90 ${exportClicked ? "scale-95 brightness-90" : ""}`}
            onClick={() => flashBtn(setExportClicked)}
            type="button"
          >
            <Download size={16} />
            Export Catalog
          </button>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-12 gap-6">

          {/* CARD 1 */}
          <div className="col-span-4 bg-white border rounded-xl p-6">
            <h4 className="text-gray-500 text-xl">Total Services</h4>
            <div className="text-6xl mt-3 font-light transition-all duration-300">
              {totalServices}
            </div>
            <p className="mt-5 text-green-600 font-medium">↗ +3 this month</p>
          </div>

          {/* CARD 2 */}
          <div className="col-span-4 bg-white border rounded-xl p-6">
            <h4 className="text-gray-500 text-xl">Avg. Revenue / Service</h4>
            <div className="text-6xl mt-3 font-light transition-all duration-500">
              {avgRevenue}
            </div>
            <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-700 rounded-full transition-all duration-700"
                style={{ width: peakPricingOn ? "78%" : "65%" }}
              />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-span-4 bg-indigo-800 text-white rounded-xl p-6">
            <h4 className="text-xl text-indigo-200">Active Promotions</h4>
            <div className="text-6xl mt-3 transition-all duration-300">
              {String(activePromos).padStart(2, "0")}
            </div>
            <button
              className={`underline mt-5 font-medium transition-all duration-150 active:scale-95 hover:text-indigo-200 ${manageCampaignClicked ? "scale-95 opacity-70" : ""}`}
              onClick={() => flashBtn(setManageCampaignClicked)}
              type="button"
            >
              Manage Campaigns
            </button>
          </div>

        </div>

        {/* SERVICES TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden">

          {/* TABLE HEADER */}
          <div className="flex items-center justify-between px-6 py-5 border-b">

            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-medium">All Services</h2>

              <button
                onClick={() => handleTabChange("ACTIVE")}
                className={`px-4 py-1 text-sm rounded font-medium transition-all duration-150 active:scale-95 ${
                  activeTab === "ACTIVE" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
                type="button"
              >
                ACTIVE
              </button>

              <button
                onClick={() => handleTabChange("ARCHIVED")}
                className={`px-4 py-1 text-sm rounded font-medium transition-all duration-150 active:scale-95 ${
                  activeTab === "ARCHIVED" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
                type="button"
              >
                ARCHIVED
              </button>
            </div>

            <div className="flex gap-3">
              <button
                className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-all duration-150 active:scale-90 hover:bg-gray-50 ${filterClicked ? "bg-gray-100 scale-90" : ""}`}
                onClick={() => flashBtn(setFilterClicked)}
                type="button"
                title="Filter"
              >
                <Filter size={18} />
              </button>

              <button
                className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-all duration-150 active:scale-90 hover:bg-gray-50 ${gridClicked ? "bg-gray-100 scale-90" : ""}`}
                onClick={() => flashBtn(setGridClicked)}
                type="button"
                title="Grid View"
              >
                <Grid2X2 size={18} />
              </button>
            </div>

          </div>

          {/* TABLE HEADINGS */}
          <div className="grid grid-cols-12 px-6 py-5 border-b text-gray-600 font-semibold uppercase tracking-wide">
            <div className="col-span-3">Service Details</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Base Price</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2">Availability</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>

          {/* SERVICES ROWS */}
          {paginated.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-400 text-lg">
              No services in this category.
            </div>
          )}

          {paginated.map((service) => (
            <div
              key={service.id}
              className={`grid grid-cols-12 px-6 py-8 border-b items-center cursor-pointer transition-all duration-150 hover:bg-gray-50 active:bg-gray-100 active:scale-[0.995] select-none ${clickedRow === service.id ? "bg-indigo-50 scale-[0.995]" : ""}`}
              onClick={() => handleRowClick(service.id)}
            >

              {/* SERVICE DETAILS */}
              <div className="col-span-3 flex items-center gap-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold text-xl">{service.title}</h3>
                  <p className="text-gray-500 mt-1">{service.code}</p>
                </div>
              </div>

              {/* CATEGORY */}
              <div className="col-span-2">
                <span className="text-2xl text-gray-700">{service.category}</span>
              </div>

              {/* PRICE */}
              <div className="col-span-2">
                <span className="text-2xl font-semibold">{service.price}</span>
              </div>

              {/* DURATION */}
              <div className="col-span-2 flex items-center gap-2">
                <Clock3 size={18} />
                <span className="text-2xl text-gray-700">{service.duration}</span>
              </div>

              {/* AVAILABILITY */}
              <div className="col-span-2 flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    service.status === "green" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />
                <span className="font-medium text-gray-700">{service.availability}</span>
              </div>

              {/* ACTION */}
              <div className="col-span-1 flex justify-center">
                <button
                  className="hover:bg-gray-100 rounded-full p-2 transition-all duration-150 active:scale-75 active:bg-gray-200"
                  onClick={(e) => { e.stopPropagation(); handleRowClick(service.id); }}
                  type="button"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

            </div>
          ))}

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-5">
            <p className="text-gray-500 text-lg">
              Showing {paginated.length} of {filtered.length} services
            </p>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded transition-all duration-150 active:scale-90 font-medium ${
                    currentPage === page
                      ? "bg-indigo-700 text-white scale-105"
                      : "border hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(page)}
                  type="button"
                >
                  {page}
                </button>
              ))}

              <button
                className="w-10 h-10 border rounded flex items-center justify-center transition-all duration-150 active:scale-90 hover:bg-gray-50 disabled:opacity-40"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                type="button"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-12 gap-8">

          {/* GLOBAL PRICING RULES */}
          <div className="col-span-6 bg-white border rounded-xl p-6">

            <div className="flex items-start gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard size={26} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-3xl font-medium">Global Pricing Rules</h3>
                <p className="uppercase tracking-widest text-gray-500 text-sm mt-1">
                  Managed Automated Adjustments
                </p>
              </div>
            </div>

            {/* RULE 1 */}
            <div className="bg-gray-50 rounded-xl p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-medium">Dynamic Peak Pricing</h4>
                  <p className="text-gray-500 mt-1">
                    Automated {peakPricingOn ? "+15%" : "0%"} on weekends
                  </p>
                </div>
                <button
                  className={`relative w-12 h-7 rounded-full transition-all duration-300 active:scale-90 focus:outline-none ${peakPricingOn ? "bg-indigo-700" : "bg-gray-200"}`}
                  onClick={() => setPeakPricingOn((v) => !v)}
                  type="button"
                  title={peakPricingOn ? "Turn off peak pricing" : "Turn on peak pricing"}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${peakPricingOn ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>
            </div>

            {/* RULE 2 */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-medium">Member-only Discounts</h4>
                  <p className="text-gray-500 mt-1">
                    Universal {memberDiscountOn ? "-10%" : "0%"} for tier 2 clients
                  </p>
                </div>
                <button
                  className={`relative w-12 h-7 rounded-full transition-all duration-300 active:scale-90 focus:outline-none ${memberDiscountOn ? "bg-indigo-700" : "bg-gray-200"}`}
                  onClick={() => setMemberDiscountOn((v) => !v)}
                  type="button"
                  title={memberDiscountOn ? "Turn off member discounts" : "Turn on member discounts"}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${memberDiscountOn ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>
            </div>

          </div>

          {/* GLOBAL AVAILABILITY */}
          <div className="col-span-6 bg-white border rounded-xl p-6">

            <div className="flex items-start gap-4 mb-8">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar size={26} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-3xl font-medium">Global Availability</h3>
                <p className="uppercase tracking-widest text-gray-500 text-sm mt-1">
                  Calendar & Break Controls
                </p>
              </div>
            </div>

            {/* DAY BUTTONS */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {DAYS.map((day, index) => {
                const isActive = activeDays.includes(index);
                return (
                  <button
                    key={day}
                    className={`h-12 rounded font-medium text-sm transition-all duration-200 active:scale-90 select-none ${
                      isActive
                        ? "bg-indigo-700 text-white scale-100 shadow-md"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                    onClick={() => handleDayToggle(index)}
                    type="button"
                    title={isActive ? `Deselect ${day}` : `Select ${day}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* EDIT BUTTON */}
            <button
              className={`w-full h-14 border border-gray-300 rounded-lg text-xl font-medium transition-all duration-150 hover:bg-gray-50 active:scale-[0.98] active:bg-gray-100 ${editHoursClicked ? "bg-gray-100 scale-[0.98]" : ""}`}
              onClick={() => flashBtn(setEditHoursClicked)}
              type="button"
            >
              Edit Business Hours
            </button>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}