import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { Download, Printer, ArrowUpRight, ArrowDownRight, HelpCircle, Landmark } from "lucide-react";

// Mock global database pool array holding ledger objects
const INITIAL_TRANSACTIONS = [
  { id: "#TXN-882104-B", ownerInitials: "AS", ownerName: "Acme Solutions Corp", credit: 12450.00, debit: 0, balance: 1042550.00, source: "Wire Transfer", reference: "Settlement Payout", status: "COM", date: "2026-06-25" },
  { id: "#TXN-882103-X", ownerInitials: "JL", ownerName: "Janus Logistics", credit: 0, debit: 4200.00, balance: 1030100.00, source: "ACH Batch", reference: "Platform Fee Dec", status: "COM", date: "2026-06-26" },
  { id: "#TXN-882099-C", ownerInitials: "GT", ownerName: "Global Tech Partners", credit: 0, debit: 150000.00, balance: 1034300.00, source: "Swift Payment", reference: "Infrastructure Reserve", status: "APP", date: "2026-06-24" },
  { id: "#TXN-882098-F", ownerInitials: "MM", ownerName: "Merchant Max", credit: 0, debit: 850.00, balance: 1184300.00, source: "Card Chargeback", reference: "Dispute #88312", status: "PEN", date: "2026-06-27" },
  { id: "#TXN-882097-Z", ownerInitials: "HS", ownerName: "Hyper Scale Inc", credit: 55000.00, debit: 0, balance: 1185150.00, source: "Internal Transfer", reference: "Equity Drawdown", status: "COM", date: "2026-06-23" },
  { id: "#TXN-882096-A", ownerInitials: "UX", ownerName: "UserX Labs", credit: 1200.00, debit: 0, balance: 1130150.00, source: "Gateway Credit", reference: "Refund Receipt #3", status: "COM", date: "2026-06-22" }
];

export default function TransactionLedger() {
  // Input Form States (Controlled Elements)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [txnType, setTxnType] = useState("All Types");
  const [sourceChannel, setSourceChannel] = useState("All Sources");

  // Committed / Active Filter Criteria applied to render data
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    txnType: "All Types",
    sourceChannel: "All Sources",
  });

  // Export Action Handler Engine — generates and downloads a proper CSV
  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Owner", "Credit", "Debit", "Balance", "Source", "Reference", "Status", "Date"];
    const rows = filteredTransactions.map(t => [
      t.id, t.ownerName, t.credit, t.debit, t.balance, t.source, t.reference, t.status, t.date
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Transaction_Ledger_Export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print Action Handler Engine
  const handlePrintLedger = () => {
    window.print();
  };

  // Click handler to batch commit reactive inputs tracking structure
  const handleApplyFilters = () => {
    setAppliedFilters({
      startDate,
      endDate,
      txnType,
      sourceChannel
    });
  };

  // Computed data selector processing rows on standard memo pipelines
  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(item => {
      // Date verification conditions
      if (appliedFilters.startDate && item.date < appliedFilters.startDate) return false;
      if (appliedFilters.endDate && item.date > appliedFilters.endDate) return false;
      
      // Transaction structure verification type condition matching 
      if (appliedFilters.txnType === "Credit Only" && item.credit === 0) return false;
      if (appliedFilters.txnType === "Debit Only" && item.debit === 0) return false;

      // Source routing channel verification parameter evaluation
      if (appliedFilters.sourceChannel !== "All Sources" && item.source !== appliedFilters.sourceChannel) return false;

      return true;
    });
  }, [appliedFilters]);

  // Aggregate dynamically lower analytical calculations grid objects
  const totals = useMemo(() => {
    let credits = 0;
    let debits = 0;
    let holdsCount = 0;

    filteredTransactions.forEach(t => {
      credits += t.credit;
      debits += t.debit;
      if (t.status === "PEN" || t.status === "APP") holdsCount++;
    });

    return { credits, debits, holdsCount };
  }, [filteredTransactions]);

  return (
    <AdminShell activeTab="Transactions" searchPlaceholder="Search ledgers...">
      
      {/* Background container layout rendering framework setup structure */}
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 space-y-6 font-sans">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2b35db]">Transaction Ledger</h1>
            <p className="text-xs text-slate-500 mt-1">Real-time audit trail for all global wallet activities across multi-currency channels.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-slate-200 text-xs font-bold text-[#3139cb] hover:bg-slate-100 transition-colors shadow-xs active:scale-95"
            >
              <Download size={13} /> Export CSV
            </button>
            <button 
              onClick={handlePrintLedger}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-slate-200 text-xs font-bold text-[#3139cb] hover:bg-slate-100 transition-colors shadow-xs active:scale-95"
            >
              <Printer size={13} /> Print Ledger
            </button>
          </div>
        </div>

        {/* ================= FILTER TOOLBAR CONTAINER ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* Date Range Block — stacked so both date pickers are fully visible */}
          <div className="bg-white rounded p-3 border border-slate-200 shadow-xs">
            <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Date Range (YYYY-MM-DD)</label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">From</span>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-indigo-500 transition-all font-semibold"
                  style={{ minWidth: 0 }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase">To</span>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-indigo-500 transition-all font-semibold"
                  style={{ minWidth: 0 }}
                />
              </div>
            </div>
          </div>

          {/* Transaction Type Dropdown */}
          <div className="bg-white rounded p-3 border border-slate-200 shadow-xs">
            <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Transaction Type</label>
            <select 
              value={txnType}
              onChange={(e) => setTxnType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 font-bold outline-none focus:border-indigo-500"
            >
              <option value="All Types">All Types</option>
              <option value="Credit Only">Credit Only (+)</option>
              <option value="Debit Only">Debit Only (-)</option>
            </select>
          </div>

          {/* Source Channel Dropdown */}
          <div className="bg-white rounded p-3 border border-slate-200 shadow-xs">
            <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Source Channel</label>
            <select 
              value={sourceChannel}
              onChange={(e) => setSourceChannel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 font-bold outline-none focus:border-indigo-500"
            >
              <option value="All Sources">All Sources</option>
              <option value="Wire Transfer">Wire Transfer</option>
              <option value="ACH Batch">ACH Batch</option>
              <option value="Swift Payment">Swift Payment</option>
              <option value="Card Chargeback">Card Chargeback</option>
              <option value="Internal Transfer">Internal Transfer</option>
              <option value="Gateway Credit">Gateway Credit</option>
            </select>
          </div>

          {/* Core Apply Action Button */}
          <button 
            onClick={handleApplyFilters}
            className="w-full bg-[#1e1591] hover:bg-[#181075] text-white rounded py-3.5 text-xs font-black tracking-wider uppercase transition-all shadow-sm active:scale-[0.99]"
          >
            Apply Filters
          </button>
        </div>

        {/* ================= MAIN TRANSACTION LEDGER TABLE ================= */}
        <div className="bg-white rounded text-slate-800 border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Transaction ID</th>
                  <th className="px-5 py-4">Owner / Entity</th>
                  <th className="px-5 py-4 text-right">Credit (+)</th>
                  <th className="px-5 py-4 text-right">Debit (-)</th>
                  <th className="px-5 py-4 text-right">Running Balance</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Reference</th>
                  <th className="px-5 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors animate-fadeIn">
                      <td className="px-5 py-4 font-mono font-bold text-blue-900">{item.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-50 text-blue-900 font-black text-[9px] p-1 rounded-sm tracking-tighter">{item.ownerInitials}</span>
                          <span className="font-black text-slate-900">{item.ownerName}</span>
                        </div>
                      </td>
                      <td className={`px-5 py-4 text-right font-black ${item.credit > 0 ? "text-emerald-600" : "text-slate-400"}`}>
                        {item.credit > 0 ? `$${item.credit.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "--"}
                      </td>
                      <td className={`px-5 py-4 text-right font-black ${item.debit > 0 ? "text-rose-600" : "text-slate-400"}`}>
                        {item.debit > 0 ? `$${item.debit.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "--"}
                      </td>
                      <td className="px-5 py-4 text-right font-black text-slate-900">${item.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                      <td className="px-5 py-4 text-[11px] text-slate-500 font-semibold">{item.source}</td>
                      <td className="px-5 py-4 text-[11px] text-slate-400">{item.reference}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase ${
                          item.status === "COM" ? "bg-blue-900 text-white" : 
                          item.status === "APP" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-slate-400 font-bold tracking-tight">
                      No ledger lines found matching active filter configurations.
                    </td>
                  </tr>
                )}

              </tbody>
            </table></div>
          </div>

          {/* Table Control Pagination Footer Block */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-semibold text-slate-500">
            <span>Showing {filteredTransactions.length} of {filteredTransactions.length} items queried</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">‹</button>
              <button className="px-3 py-1 rounded bg-blue-900 text-white">1</button>
              <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">›</button>
            </div>
          </div>
        </div>

        {/* ================= LOWER FOUR PERFORMANCE INDICATORS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Box 1: Total Credits */}
          <div className="bg-white rounded p-4 text-slate-800 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Total Filtered Credits</span>
                <ArrowUpRight size={14} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-2 leading-none">
                ${totals.credits.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 mt-4">Calculated live <span className="text-slate-400 font-medium">from grid view</span></p>
          </div>

          {/* Box 2: Total Debits */}
          <div className="bg-white rounded p-4 text-slate-800 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Total Filtered Debits</span>
                <ArrowDownRight size={14} className="text-rose-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-2 leading-none">
                ${totals.debits.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <p className="text-[10px] font-bold text-rose-600 mt-4">Updated instantly <span className="text-slate-400 font-medium">on filter frame</span></p>
          </div>

          {/* Box 3: Active Holds */}
          <div className="bg-white rounded p-4 text-slate-800 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Pending / Review Log</span>
                <HelpCircle size={14} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-black text-amber-600 tracking-tight mt-2">{totals.holdsCount} Entries</h2>
            </div>
            <p className="text-[10px] font-medium text-slate-400 mt-4">Requires manual operator check</p>
          </div>

          {/* Box 4: Current Liquidity */}
          <div className="bg-[#1e1591] rounded p-4 text-white flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
                <span>Current Liquidity Baseline</span>
                <Landmark size={14} className="text-indigo-200" />
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-2">$8.24M</h2>
            </div>
            <p className="text-[10px] font-medium text-indigo-200 mt-4">Aggregated global pool balance</p>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}