import React, { useState, useEffect } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { toast } from "react-hot-toast";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Undo2,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  Eye,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock Data
const MOCK_SUMMARY = {
  totalBalance: 1245000,
  totalCredits: 800000,
  totalDebits: 400000,
  pendingTransactions: 142,
  successfulTransactions: 15842,
  failedTransactions: 24,
  totalRefunds: 15400
};

const MOCK_TRANSACTIONS = Array.from({ length: 50 }, (_, i) => ({
  id: `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
  userName: `User ${i + 1}`,
  type: Math.random() > 0.5 ? 'Credit' : 'Debit',
  amount: Math.floor(100 + Math.random() * 5000),
  method: ['UPI', 'Credit Card', 'Bank Transfer', 'Wallet'][Math.floor(Math.random() * 4)],
  status: ['Success', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  referenceId: `REF-${Math.floor(10000000 + Math.random() * 90000000)}`
}));

// Utility for formatting currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function WalletReportPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  
  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal State
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Fetch Data (Mock)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setSummary(MOCK_SUMMARY);
        setTransactions(MOCK_TRANSACTIONS);
      } catch (error) {
        toast.error("Failed to fetch wallet report data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      txn.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || txn.type === filterType;
    const matchesStatus = filterStatus === "All" || txn.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleExport = (type) => {
    toast.success(`Exporting report as ${type}...`);
    // Implement actual export logic here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Failed': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search reports...">
      <div className="w-full min-h-screen bg-[#f8fafd] p-4 sm:p-6 lg:p-8 text-slate-700 font-sans">
        
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Wallet Report</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Comprehensive overview of wallet balances and transactions
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleExport('Excel')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FileSpreadsheet size={16} className="text-green-600" /> Export Excel
            </button>
            <button 
              onClick={() => handleExport('CSV')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Download size={16} className="text-blue-600" /> Export CSV
            </button>
            <button 
              onClick={() => handleExport('PDF')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1d0094] rounded-lg text-sm font-bold text-white shadow-sm hover:bg-opacity-90 transition-colors"
            >
              <FileText size={16} /> Download PDF
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d0094]"></div>
          </div>
        ) : (
          <>
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#1d0094]">
                    <Wallet size={20} />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500">Total Wallet Balance</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(summary.totalBalance)}</h3>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500">Total Credits</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(summary.totalCredits)}</h3>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                    <ArrowDownLeft size={20} />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500">Total Debits</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(summary.totalDebits)}</h3>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Undo2 size={20} />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500">Total Refunds</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(summary.totalRefunds)}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
                 <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Successful</p>
                    <h4 className="text-xl font-black text-slate-900">{summary.successfulTransactions.toLocaleString()}</h4>
                 </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
                 <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <Clock size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pending</p>
                    <h4 className="text-xl font-black text-slate-900">{summary.pendingTransactions.toLocaleString()}</h4>
                 </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
                 <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <XCircle size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Failed</p>
                    <h4 className="text-xl font-black text-slate-900">{summary.failedTransactions.toLocaleString()}</h4>
                 </div>
              </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 p-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                <div className="relative w-full md:w-1/3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Transaction ID or User Name..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1d0094] focus:border-transparent"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-500" />
                    <span className="text-sm font-bold text-gray-600">Filters:</span>
                  </div>
                  
                  <select 
                    className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1d0094]"
                  >
                    <option value="All">All Time</option>
                    <option value="Today">Today</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="This Month">This Month</option>
                  </select>

                  <select 
                    value={filterType}
                    onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                    className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1d0094]"
                  >
                    <option value="All">All Types</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                  </select>

                  <select 
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                    className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1d0094]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TRANSACTIONS TABLE */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-gray-200 uppercase text-xs font-bold tracking-wider">
                      <th className="py-4 px-6">Transaction ID</th>
                      <th className="py-4 px-6">User Name</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6">Method</th>
                      <th className="py-4 px-6">Date & Time</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-slate-700">
                    {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((txn, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 font-bold">{txn.id}</td>
                          <td className="py-4 px-6 font-medium">{txn.userName}</td>
                          <td className="py-4 px-6">
                            <span className={`font-bold ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {txn.type}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-black text-slate-900">
                            {txn.type === 'Credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                          </td>
                          <td className="py-4 px-6 text-gray-500">{txn.method}</td>
                          <td className="py-4 px-6 text-gray-500 text-xs font-medium">
                            {new Date(txn.date).toLocaleString()}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${getStatusColor(txn.status)}`}>
                              {txn.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button 
                              onClick={() => setSelectedTxn(txn)}
                              className="text-[#1d0094] hover:text-indigo-800 font-bold text-xs flex items-center justify-end gap-1 w-full"
                            >
                              <Eye size={14} /> View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center">
                            <Wallet size={48} className="mb-4 text-gray-300" />
                            <p className="text-base font-bold text-slate-600">No transactions found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-slate-50">
                  <span className="text-sm text-gray-500 font-medium">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-bold text-slate-700 px-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* TRANSACTION DETAILS MODAL */}
      {selectedTxn && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-black text-slate-900">Transaction Details</h2>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="p-2 rounded-full hover:bg-gray-200 transition text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="flex flex-col items-center justify-center mb-6 pb-6 border-b border-gray-100">
                <span className={`text-xs font-bold border px-3 py-1 rounded-full mb-3 ${getStatusColor(selectedTxn.status)}`}>
                  {selectedTxn.status}
                </span>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                  {selectedTxn.type === 'Credit' ? '+' : '-'}{formatCurrency(selectedTxn.amount)}
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-widest">{selectedTxn.type}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Transaction ID</span>
                  <span className="font-bold text-slate-900">{selectedTxn.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Reference ID</span>
                  <span className="font-bold text-slate-900">{selectedTxn.referenceId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Date & Time</span>
                  <span className="font-bold text-slate-900">{new Date(selectedTxn.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">User Name</span>
                  <span className="font-bold text-slate-900">{selectedTxn.userName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Method</span>
                  <span className="font-bold text-slate-900">{selectedTxn.method}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-gray-100 mt-auto">
              <button 
                onClick={() => setSelectedTxn(null)}
                className="w-full py-3 bg-[#1d0094] text-white font-bold rounded-xl shadow-sm hover:bg-indigo-800 transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}