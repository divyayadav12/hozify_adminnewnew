import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { 
  MoreVertical, 
  SlidersHorizontal, 
  Download, 
  Building2,
  X
} from "lucide-react";

const SETTLEMENT_DATA = [
  { id: '#SET-99021-X', merchant: 'Blue-Chip Retail Hub', volume: '$450,200.00', velocity: 80, status: 'Settled', statusColor: 'emerald', yield: '+$12,400.00', yieldColor: 'emerald' },
  { id: '#SET-99022-P', merchant: 'Quantum Tech APAC', volume: '$1,290,000.50', velocity: 92, status: 'Settled', statusColor: 'emerald', yield: '+$38,210.15', yieldColor: 'emerald' },
  { id: '#SET-99025-F', merchant: 'Neo-Bank Liquidity', volume: '$85,400.00', velocity: 33, status: 'Frozen', statusColor: 'rose', yield: '-$1,250.00', yieldColor: 'rose' },
  { id: '#SET-99028-W', merchant: 'Luxe Global Logistics', volume: '$310,000.00', velocity: 50, status: 'Pending', statusColor: 'slate', yield: '$0.00', yieldColor: 'slate' },
];

export default function WalletAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const toast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['Settlement ID', 'Merchant Group', 'Volume', 'Status', 'Net Yield'];
    const rows = SETTLEMENT_DATA.map(r => [r.id, r.merchant, r.volume, r.status, r.yield]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Wallet_Analytics_${timeRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Settlement ledger exported successfully!');
  };

  const filteredData = filterStatus === 'All' ? SETTLEMENT_DATA : SETTLEMENT_DATA.filter(r => r.status === filterStatus);

  const statusBadgeClass = (color) => ({
    emerald: 'bg-emerald-50 text-emerald-700',
    rose: 'bg-rose-50 text-rose-600',
    slate: 'bg-slate-100 text-slate-500'
  })[color] || 'bg-slate-100 text-slate-500';

  const yieldClass = (color) => ({
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
    slate: 'text-slate-400'
  })[color] || 'text-slate-400';

  return (
    <>
    {/* Toast Notifications */}
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10001, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background: '#1e293b', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', maxWidth: '320px' }}>{t.message}</div>
      ))}
    </div>

    {/* Modal Overlay */}
    {modal && (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '28px 32px', maxWidth: '460px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{modal.title}</h3>
            <button onClick={() => setModal(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}><X size={18} /></button>
          </div>
          {modal.content}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button onClick={() => setModal(null)} style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Close</button>
            {modal.onConfirm && (
              <button onClick={() => { modal.onConfirm(); setModal(null); }} style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#1d1880', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Apply</button>
            )}
          </div>
        </div>
      </div>
    )}

    <AdminShell activeTab="Analytics" searchPlaceholder="Search metrics...">

      
      {/* Light slate layout framework matching standard floating layout card templates */}
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 space-y-6 ">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1e224e]">Analytics Engine</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time fiscal monitoring and performance distribution.</p>
          </div>
          
          {/* Timeframe Selector Button Group */}
          <div className="flex bg-white p-1 rounded border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            {['24h', '7d', '30d', 'Custom'].map(r => (
              <button
                key={r}
                onClick={() => {
                  if (r === 'Custom') {
                    setModal({
                      title: 'Custom Date Range',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div><label style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>From</label><input type="date" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', outline: 'none' }} /></div>
                          <div><label style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>To</label><input type="date" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', outline: 'none' }} /></div>
                        </div>
                      ),
                      onConfirm: () => { setTimeRange('Custom'); toast('Custom date range applied!'); }
                    });
                  } else {
                    setTimeRange(r);
                    toast(`Analytics view changed to ${r}`);
                  }
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  timeRange === r ? 'bg-[#1d1880] text-white shadow-xs' : 'hover:bg-slate-50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ================= 4 TOP CARD METRICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Wallet Vol */}
          <div className="bg-white rounded p-4 border border-slate-200/80 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Wallet Vol.</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12.5%</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-2">$4,289,502</h2>
            <div className="mt-4 h-6 w-full text-emerald-600 opacity-80">
              <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,15 Q25,5 50,15 T100,8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: Net Settlement */}
          <div className="bg-white rounded p-4 border border-slate-200/80 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Settlement</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Stable</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-2">$892,100</h2>
            <div className="mt-4 h-6 w-full text-indigo-600 opacity-80">
              <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,10 Q30,15 60,8 T100,12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Refund Rate */}
          <div className="bg-white rounded p-4 border border-slate-200/80 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Refund Rate</span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">+0.4%</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-2">0.82%</h2>
            <div className="mt-4 h-6 w-full text-rose-600 opacity-80">
              <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,5 Q50,18 100,14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Active Merchants */}
          <div className="bg-white rounded p-4 border border-slate-200/80 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Merchants</span>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">New: 42</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-2">1,402</h2>
            <div className="mt-4 flex items-end gap-1 h-6 pt-2">
              <div className="bg-teal-600/30 w-full h-2 rounded-xs" />
              <div className="bg-teal-600/30 w-full h-3 rounded-xs" />
              <div className="bg-teal-600/30 w-full h-2.5 rounded-xs" />
              <div className="bg-teal-600/30 w-full h-4 rounded-xs" />
              <div className="bg-teal-600/30 w-full h-4.5 rounded-xs" />
            </div>
          </div>

        </div>

        {/* ================= VISUAL DATA CHARTS SPLIT LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Block: Wallet Growth Trend Line Plot */}
          <div className="lg:col-span-2 bg-white rounded p-5 border border-slate-200/80 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Wallet Growth Trend</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Cumulative deposit and withdrawal volume</p>
              </div>
              <button
                className="text-slate-400 hover:text-slate-600"
                onClick={() => setModal({
                  title: 'Chart Options',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {['Download as PNG', 'Download as SVG', 'View Full Screen', 'Compare Periods'].map(opt => (
                        <button key={opt} onClick={() => { setModal(null); toast(`${opt} triggered!`); }} style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{opt}</button>
                      ))}
                    </div>
                  )
                })}
              >
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="my-6 relative h-48 w-full border-b border-slate-100">
              <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible text-indigo-900">
                <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeDasharray="4 4" />
                
                <line x1="370" y1="0" x2="370" y2="150" stroke="#a78bfa" strokeDasharray="3 3" />
                <circle cx="370" cy="50" r="4" className="fill-indigo-900 stroke-white stroke-2" />

                <path 
                  d="M0,100 L80,95 L140,110 L210,80 L280,85 L350,60 L420,50 L500,35" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>

          {/* Right Block: Revenue Distribution Donut Split */}
          <div className="bg-white rounded p-5 border border-slate-200/80 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Distribution</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Allocation by asset class</p>
            </div>

            <div className="flex justify-center items-center my-4 relative">
              <div className="h-32 w-32 rounded-full border-[14px] border-indigo-900 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[14px] border-emerald-600 border-t-transparent border-r-transparent border-b-transparent -m-[14px] rotate-45" />
                <div className="absolute inset-0 rounded-full border-[14px] border-rose-600 border-t-transparent border-l-transparent border-b-transparent -m-[14px] -rotate-12" />
                
                <span className="text-xs font-black text-slate-900 tracking-tight">Global</span>
                <span className="text-[10px] font-semibold text-slate-400">100%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-900" />
                  <span>Transaction Fees</span>
                </div>
                <span className="font-bold text-slate-900">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Merchant Services</span>
                </div>
                <span className="font-bold text-slate-900">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-600" />
                  <span>Compliance Penalties</span>
                </div>
                <span className="font-bold text-slate-900">10%</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= SETTLEMENT PERFORMANCE LEDGER TABLE ================= */}
        <div className="bg-white rounded text-slate-800 border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Settlement Performance Ledger</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 text-xs font-semibold hover:bg-slate-50 text-slate-600"
                onClick={() => setModal({
                  title: 'Filter Settlements',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Filter by settlement status:</p>
                      {['All', 'Settled', 'Frozen', 'Pending'].map(s => (
                        <button key={s} onClick={() => { setFilterStatus(s); setModal(null); toast(`Filter applied: ${s}`); }} style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${filterStatus === s ? '#1d1880' : '#e2e8f0'}`, background: filterStatus === s ? '#eff6ff' : '#f8fafc', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: filterStatus === s ? '#1d1880' : '#1e293b' }}>{s}</button>
                      ))}
                    </div>
                  )
                })}
              >
                <SlidersHorizontal size={13} /> Filter {filterStatus !== 'All' && `(${filterStatus})`}
              </button>
              <button
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-[#1d1880] text-white text-xs font-bold shadow-xs"
                onClick={handleExportCSV}
              >
                <Download size={13} /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3.5">Settlement ID</th>
                  <th className="px-6 py-3.5">Merchant Group</th>
                  <th className="px-6 py-3.5">Volume</th>
                  <th className="px-6 py-3.5">Velocity</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Net Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {filteredData.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4  text-slate-400">{row.id}</td>
                    <td className="px-6 py-4 font-bold text-indigo-900">{row.merchant}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.volume}</td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${row.statusColor === 'emerald' ? 'bg-emerald-600' : row.statusColor === 'rose' ? 'bg-rose-600' : 'bg-slate-300'}`} style={{ width: `${row.velocity}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-xs uppercase ${statusBadgeClass(row.statusColor)}`}>{row.status}</span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${yieldClass(row.yieldColor)}`}>{row.yield}</td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-400 font-bold">No records match the current filter.</td></tr>
                )}
              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* ================= LOWER RATIO & LIQUIDITY WIDGET ================= */}
        <div className="bg-white rounded text-slate-800 p-5 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Credit/Debit Ratio</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Real-time balancing of inbound vs outbound flow. Current ratio is within healthy parameters.</p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600">Credit Liquidity</span>
                    <span className="text-emerald-600">72%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: "72%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600">Debit Obligation</span>
                    <span className="text-rose-600">28%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-600 h-full" style={{ width: "28%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 border border-slate-100 bg-slate-50/50 rounded-md p-6 flex flex-col items-center text-center space-y-2">
              <Building2 size={24} className="text-indigo-900" />
              <h4 className="text-sm font-black text-indigo-950 tracking-tight">Liquidity Index: Stable</h4>
              <p className="text-[11px] text-slate-400 max-w-sm leading-normal font-medium">
                Our algorithm monitors credit/debit volatility 24/7 to ensure settlement reserves remain at +20% of peak historical volume.
              </p>
            </div>

          </div>
        </div>

      </div>
    </AdminShell>
    </>
  );
}