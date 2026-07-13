import React, { useMemo, useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  IndianRupee,
  TrendingUp,
  Wallet,
  Receipt,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";

const stats = [
  {
    title: "Total Revenue",
    value: "₹8.42Cr",
    delta: "+12%",
    icon: IndianRupee,
    subtitle: "Net partner earnings",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹1.24Cr",
    delta: "+9%",
    icon: TrendingUp,
    subtitle: "Current month performance",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Settlements",
    value: "₹92.8L",
    delta: "+6%",
    icon: Wallet,
    subtitle: "Cleared payouts",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    title: "Profit Margin",
    value: "28%",
    delta: "+4 pts",
    icon: Receipt,
    subtitle: "Partner contribution share",
    accent: "from-amber-500 to-orange-500",
  },
];

const revenueSources = [
  { title: "Subscriptions", amount: 3.24, percent: 38, change: "+12%", color: "from-slate-900 to-slate-600" },
  { title: "Service Revenue", amount: 2.18, percent: 26, change: "+8%", color: "from-cyan-700 to-sky-500" },
  { title: "Commission", amount: 1.84, percent: 22, change: "+5%", color: "from-indigo-700 to-indigo-500" },
  { title: "Other Revenue", amount: 1.16, percent: 14, change: "+3%", color: "from-violet-700 to-violet-500" },
];

const monthlyTrend = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 84 },
  { month: "Mar", value: 76 },
  { month: "Apr", value: 102 },
  { month: "May", value: 118 },
  { month: "Jun", value: 136 },
  { month: "Jul", value: 126 },
  { month: "Aug", value: 148 },
  { month: "Sep", value: 162 },
  { month: "Oct", value: 180 },
  { month: "Nov", value: 198 },
  { month: "Dec", value: 225 },
];

const topPartners = [
  { name: "Apex Digital", category: "Enterprise", revenue: "₹24.8L", growth: "+18%", status: "Top Performer" },
  { name: "Urban Connect", category: "Retail", revenue: "₹18.2L", growth: "+12%", status: "Growing" },
  { name: "Prime Hub", category: "Corporate", revenue: "₹15.4L", growth: "+8%", status: "Stable" },
  { name: "Elite Group", category: "Enterprise", revenue: "₹12.6L", growth: "+5%", status: "Stable" },
  { name: "Smart Connect", category: "SMB", revenue: "₹10.8L", growth: "+10%", status: "Rising" },
];

export default function PartnerRevenue() {
  const [selectedStat, setSelectedStat] = useState(stats[0].title);
  const [selectedSource, setSelectedSource] = useState(revenueSources[0].title);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(monthlyTrend.length - 1);

  const selectedStatData = stats.find((item) => item.title === selectedStat) || stats[0];
  const selectedSourceData = revenueSources.find((item) => item.title === selectedSource) || revenueSources[0];
  const selectedMonth = monthlyTrend[selectedMonthIndex];
  const maxTrendValue = useMemo(
    () => Math.max(...monthlyTrend.map((item) => item.value)),
    []
  );

  const trendChart = useMemo(() => {
    const padding = 18;
    const width = 340;
    const height = 120;
    const stepX = (width - padding * 2) / (monthlyTrend.length - 1);
    const points = monthlyTrend.map((item, index) => {
      const x = padding + stepX * index;
      const y = height - padding - (item.value / maxTrendValue) * (height - padding * 2);
      return { x, y, month: item.month, value: item.value };
    });
    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    return { path, points };
  }, [maxTrendValue]);

  return (
    <AdminShell
      activeTab="Partners"
      searchPlaceholder="Search Revenue..."
    >
      <div className="min-h-screen bg-slate-50 p-6 space-y-6">

        {/* Hero Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                REVENUE ANALYTICS
              </span>

              <h1 className="mt-4 text-3xl font-bold text-slate-900">
                Partner Revenue Insights
              </h1>

              <p className="mt-3 text-slate-500 max-w-2xl">
                Monitor partner earnings, settlements, and commissions with a clean, professional finance dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {stats.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedStat(item.title)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                    selectedStat === item.title
                      ? 'border-indigo-500 bg-indigo-100 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value.replace(',', '₹')}
                icon={item.icon}
                trend={parseInt(item.delta) || 0}
                color={item.accent === 'from-indigo-500 to-blue-600' ? '#2563eb' : item.accent === 'from-emerald-500 to-teal-500' ? '#059669' : item.accent === 'from-violet-500 to-indigo-500' ? '#7c3aed' : '#f97316'}
                bgColor={item.accent === 'from-indigo-500 to-blue-600' ? '#eff6ff' : item.accent === 'from-emerald-500 to-teal-500' ? '#ecfdf5' : item.accent === 'from-violet-500 to-indigo-500' ? '#f5f3ff' : '#fff7ed'}
                iconColor={item.accent === 'from-indigo-500 to-blue-600' ? '#2563eb' : item.accent === 'from-emerald-500 to-teal-500' ? '#059669' : item.accent === 'from-violet-500 to-indigo-500' ? '#7c3aed' : '#f97316'}
                onClick={() => setSelectedStat(item.title)}
                className={selectedStat === item.title ? 'ring-2 ring-indigo-500' : ''}
                style={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  padding: '20px',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  minHeight: '130px',
                  transform: selectedStat === item.title ? 'translateY(-2px)' : 'none',
                  boxShadow: selectedStat === item.title ? '0 8px 20px rgba(37,16,143,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {revenueSources.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">Monthly partner contribution</p>
                </div>
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>%</div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900">₹{item.amount.toFixed(2)}Cr</p>
                  <p className="text-xs text-slate-500">{item.percent}% share</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Revenue Distribution</h2>
                <p className="mt-2 text-sm text-slate-500">Revenue contribution across partner channels.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Real time</div>
            </div>

            <div className="mt-8 space-y-4">
              {revenueSources.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <span className="text-slate-500">{item.percent}%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Key Revenue Source</p>
            <h3 className="mt-4 text-3xl font-bold text-slate-900">Subscription Plans</h3>
            <p className="mt-3 text-slate-500">Primary contributor to partner revenue this quarter.</p>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-sm text-slate-500"><span>Revenue</span><span>₹3.24Cr</span></div>
              <div className="flex justify-between text-sm text-slate-500"><span>Share</span><span>38%</span></div>
              <div className="flex justify-between text-sm text-slate-500"><span>Growth</span><span className="text-emerald-600 font-semibold">+12%</span></div>
            </div>
          </div>
        </div>

        {/* Top Earning Partners */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Top Earning Partners</h2>
              <p className="mt-1 text-sm text-slate-500">Highest performing partners this month</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {topPartners.slice(0, 3).map((partner) => {
                const isActive = partner.name === selectedSource;
                return (
                  <button
                    key={partner.name}
                    type="button"
                    onClick={() => {
                      setSelectedSource(partner.name);
                      alert(`Viewing revenue details for ${partner.name}`);
                    }}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                      isActive 
                        ? "border-slate-900 bg-white text-slate-900 shadow-sm" 
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    }`}
                  >
                    {partner.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full">
              <thead className="bg-[#111166]">
                <tr className="text-left text-xs font-bold tracking-wider text-white uppercase">
                  <th className="px-6 py-4">Partner</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Growth</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {topPartners.map((partner, index) => (
                  <tr
                    key={partner.name}
                    className={`border-t border-slate-100 transition ${
                      partner.name === selectedSource ? 'bg-slate-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 font-semibold">{index + 1}</span>
                        <div>
                          <div className="font-semibold text-slate-900">{partner.name}</div>
                          <div className="text-xs text-slate-500">{partner.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{partner.category}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{partner.revenue}</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">{partner.growth}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{partner.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* Revenue Leaderboard */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Revenue Leaderboard</h2>
                <p className="mt-1 text-sm text-slate-500">Ranking by monthly revenue</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Live</span>
            </div>
            <div className="mt-5 space-y-3">
              {topPartners.map((partner, index) => (
                <div key={partner.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-900 text-white font-bold shadow-lg">#{index + 1}</span>
                    <div>
                      <div className="font-semibold text-slate-900">{partner.name}</div>
                      <div className="text-xs text-slate-500">{partner.category}</div>
                    </div>
                  </div>
                  <span className="text-slate-900 font-semibold">{partner.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Revenue Health</p>
            <h2 className="mt-4 text-5xl font-bold text-slate-900">94%</h2>
            <p className="mt-3 text-slate-600">Strong earnings performance across active partners.</p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex justify-between"><span>Active Partners</span><span>1,284</span></div>
              <div className="flex justify-between"><span>Avg Revenue</span><span>₹6.4L</span></div>
              <div className="flex justify-between"><span>Growth Rate</span><span className="text-emerald-700 font-semibold">+18%</span></div>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Monthly Revenue Trend</h2>
              <p className="mt-2 text-slate-500">Revenue growth throughout the year.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {monthlyTrend.map((item, index) => (
                <button
                  key={item.month}
                  type="button"
                  onClick={() => setSelectedMonthIndex(index)}
                  className={`rounded-full px-3 py-1 transition ${
                    selectedMonthIndex === index ? 'bg-indigo-100 text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.month}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="relative rounded-3xl bg-slate-100 p-5">
              <svg viewBox="0 0 340 140" className="w-full overflow-visible">
                <defs>
                  <linearGradient id="trendLine" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.18)" />
                    <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                  </linearGradient>
                </defs>
                <path d={`${trendChart.path} L 322 130 L 18 130 Z`} fill="url(#trendArea)" />
                <path d={trendChart.path} fill="none" stroke="url(#trendLine)" strokeWidth="4" strokeLinecap="round" />
                {trendChart.points.map((point, index) => (
                  <circle
                    key={point.month}
                    cx={point.x}
                    cy={point.y}
                    r={selectedMonthIndex === index ? 6 : 4}
                    fill={selectedMonthIndex === index ? '#1d4ed8' : '#0ea5e9'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                ))}
              </svg>
              <div className="mt-4 grid grid-cols-12 gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {monthlyTrend.map((item, index) => (
                  <div key={item.month} className="col-span-1 text-center">
                    <div className={`mx-auto h-2 w-2 rounded-full ${selectedMonthIndex === index ? 'bg-indigo-600' : 'bg-slate-400'}`} />
                    <p className="mt-2 text-xs">{item.month}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Current Month</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">₹{selectedMonth.value}L</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Peak Month</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">₹{maxTrendValue}L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settlement Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-slate-900 rounded-3xl p-6 text-white shadow-sm">
            <p className="uppercase text-xs tracking-[0.28em] opacity-80">Settlement Overview</p>
            <h2 className="mt-4 text-4xl font-bold">₹92.8L</h2>
            <p className="mt-2 text-slate-200">Total settlements processed this month.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-200">
              <div className="flex justify-between"><span>Successful</span><span>₹84.6L</span></div>
              <div className="flex justify-between"><span>Pending</span><span>₹6.2L</span></div>
              <div className="flex justify-between"><span>Failed</span><span>₹2.0L</span></div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md">
            <h3 className="text-2xl font-bold text-slate-900">Revenue Channels</h3>
            <div className="mt-6 space-y-4">
              {revenueSources.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{item.title}</span>
                    <span className="font-semibold text-slate-900">{item.percent}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Leaderboard */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Revenue Leaderboard</h2>
                <p className="mt-1 text-sm text-slate-500">Ranking by monthly revenue</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Live</span>
            </div>
            <div className="mt-4 space-y-3">
              {topPartners.map((partner, index) => (
                <div key={partner.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-200 text-slate-900 font-semibold">#{index + 1}</span>
                    <div>
                      <div className="font-semibold text-slate-900">{partner.name}</div>
                      <div className="text-xs text-slate-500">{partner.category}</div>
                    </div>
                  </div>
                  <span className="text-slate-900 font-semibold">{partner.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 text-slate-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Revenue Health</p>
            <h2 className="mt-4 text-5xl font-bold">94%</h2>
            <p className="mt-2 text-slate-600">Strong earnings performance across active partners.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Active Partners</span><span>1,284</span></div>
              <div className="flex justify-between"><span>Avg Revenue</span><span>₹6.4L</span></div>
              <div className="flex justify-between"><span>Growth Rate</span><span className="text-emerald-700 font-semibold">+18%</span></div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
