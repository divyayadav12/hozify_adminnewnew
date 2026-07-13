import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Download,
  Edit3,
  Eye,
  FileText,
  Filter,
  LayoutGrid,
  MessageSquare,
  MoreVertical,
  PackageCheck,
  Plus,
  RefreshCcw,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
  XCircle
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';
import { downloadDummyPDF, triggerDownload, generateCSV } from '../../utils/downloadHelper';

import Select from "../../components/ui/Select";

const inr = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const sellers = [
  { name: 'Nexus Systems Intl.', short: 'NS', type: 'Tier 1 Partner', rating: 4.9, orders: 2104, response: '2.4h', success: 99.4, risk: 'Low' },
  { name: 'Global Logistics Pro', short: 'GL', type: 'Preferred Partner', rating: 4.7, orders: 1240, response: '4.2h', success: 92, risk: 'Low' },
  { name: 'Swift Supply Chain', short: 'SS', type: 'Logistics Partner', rating: 4.5, orders: 452, response: '6.1h', success: 95, risk: 'Medium' },
  { name: 'TechSource Solutions', short: 'TS', type: 'Standard Vendor', rating: 3.8, orders: 15, response: '9.4h', success: 88, risk: 'High' }
];

const quotations = [
  { id: 'QT-88219', rfq: 'RFQ-2024-004', seller: sellers[0].name, customer: 'Nexus Systems LLC', amount: 2450000, delivery: '5 Days', status: 'Pending', submitted: 'Oct 24, 2023', deadline: 'In 4h', material: 'Cloud Infrastructure Migration', score: 98, priority: 'Urgent' },
  { id: 'QT-88220', rfq: 'RFQ-2024-005', seller: sellers[1].name, customer: 'Guardian Sec', amount: 200000, delivery: '14 Days', status: 'Pending', submitted: 'Oct 22, 2023', deadline: 'Oct 24, 2023', material: 'Annual Cybersecurity Audit', score: 84, priority: 'Normal' },
  { id: 'QT-88221', rfq: 'RFQ-2024-008', seller: sellers[2].name, customer: 'CoolTech Solutions', amount: 2890000, delivery: '7 Days', status: 'Rejected', submitted: 'Sep 15, 2023', deadline: 'In 2h', material: 'Data Center Cooling Upgrade', score: 72, priority: 'Critical' },
  { id: 'QT-88192', rfq: 'RFQ-2024-0R2', seller: 'Pixel Perfect Agency', customer: 'Pixel Perfect Agency', amount: 450000, delivery: '2 Days', status: 'Approved', submitted: 'Oct 20, 2023', deadline: 'Cleared', material: 'UX Design Retainer - Q4', score: 89, priority: 'Normal' },
  { id: 'QT-8802-C', rfq: 'RFQ-2024-R02', seller: sellers[2].name, customer: 'Summit Manufacturing', amount: 312000, delivery: '2 Days', status: 'Negotiation', submitted: 'Oct 23, 2023', deadline: 'Oct 28, 2023', material: 'Structural Steel Beams', score: 91, priority: 'High' },
  { id: 'QT-8805-B', rfq: 'RFQ-2024-9R', seller: sellers[3].name, customer: 'NexTech Solutions', amount: 890000, delivery: '7 Days', status: 'Suspended', submitted: 'Oct 18, 2023', deadline: 'Expired today', material: 'Insulation Boards XPS', score: 60, priority: 'High' }
];

const rfqs = [
  { id: 'RFQ-2024-00R', booking: 'BK-7729R', material: 'High-Grade Concrete (C30/37)', qty: '500 Cubic Meters', sellers: 8, deadline: '24 Oct, 2023 17:00', status: 'Pending' },
  { id: 'RFQ-2024-005', booking: 'BK-77302', material: 'Structural Steel Beams (I-Section)', qty: '12 Tons - Custom Length', sellers: 2, deadline: '22 Oct, 2023 12:00', status: 'Verified' },
  { id: 'RFQ-2024-008', booking: 'BK-773R5', material: 'Insulation Boards (XPS)', qty: '2,400 Units', sellers: 12, deadline: 'Overdue', status: 'Suspended' },
  { id: 'RFQ-2024-0R2', booking: 'BK-7742R', material: 'Smart Lighting Controllers', qty: '45 Enterprise Units', sellers: 2, deadline: '28 Oct, 2023 09:00', status: 'Pending' },
  { id: 'RFQ-2024-0R5', booking: 'BK-77459', material: 'HVAC Central Unit - 5 Ton', qty: '2 Units + Installation', sellers: 3, deadline: '30 Oct, 2023 14:30', status: 'Verified' }
];

const materials = [
  { item: 'Titanium Alloy Grade 5', desc: 'Aeronautical grade - 500mm rods', qty: '150 units', unit: 45000, total: 6750000, remarks: 'Priority certification attached' },
  { item: 'C-Type Fasteners', desc: 'High-torque industrial grade', qty: '2,000 units', unit: 120, total: 240000, remarks: 'Bulk rate applied' },
  { item: 'Insulation Polymer Mesh', desc: 'Thermal resistance up to 800C', qty: '45 rolls', unit: 8550, total: 384750, remarks: 'Warehouse B delivery' }
];

const purchaseOrders = [
  { id: 'PO-2023-8842', seller: 'TechLink Solutions Ltd.', amount: 12450000, status: 'Shipped', date: 'Oct 24, 2023', delivery: 'Nov 12, 2023' },
  { id: 'PO-2023-8901', seller: 'Global Logistics Co.', amount: 4232000, status: 'Draft', date: 'Oct 26, 2023', delivery: 'Nov 20, 2023' },
  { id: 'PO-2023-8755', seller: 'Office Supply Experts', amount: 890000, status: 'Delivered', date: 'Oct 15, 2023', delivery: 'Oct 20, 2023' },
  { id: 'PO-2023-8812', seller: 'Vertex Manufacturing', amount: 29800000, status: 'Confirmed', date: 'Oct 22, 2023', delivery: 'Dec 01, 2023' }
];

const routeMeta = {
  [ROUTES.quotations]: { screen: 'dashboard', title: 'Quotation Overview', subtitle: 'Manage and monitor commercial proposals across all regions.' },
  [ROUTES.quotationSeller]: { screen: 'seller', title: 'Seller Quotations', subtitle: 'Review and manage incoming service bids across active RFQs.' },
  [ROUTES.quotationRfq]: { screen: 'rfq', title: 'Request for Quotations', subtitle: 'Track all quotation requests sent to sellers.' },
  [ROUTES.quotationCreateRfq]: { screen: 'createRfq', title: 'New Request for Quotation (RFQ)', subtitle: 'Initiate a procurement request for specialized project materials.' },
  [ROUTES.quotationDetails]: { screen: 'details', title: 'Quotation QT-88291-X', subtitle: 'Operations > Procurement > QT-88291-X' },
  [ROUTES.quotationApprovals]: { screen: 'approvalQueue', title: 'Quotation Approval Queue', subtitle: 'Review and authorize service requests from the partner network.' },
  [ROUTES.quotationApprovalDetail]: { screen: 'approvalDetail', title: 'Approval Detail', subtitle: 'Review quotation evidence, notes, and risk before decision.' },
  [ROUTES.quotationComparison]: { screen: 'comparison', title: 'Multi-Seller Analytics', subtitle: 'Comparing top 4 verified vendors for project: Infrastructure Phase II.' },
  [ROUTES.quotationWinner]: { screen: 'winner', title: 'Winner Selection', subtitle: 'Finalize supplier for Project Alpha.' },
  [ROUTES.quotationNegotiation]: { screen: 'negotiation', title: 'Negotiation Center', subtitle: 'Manage counter-offers and seller conversations.' },
  [ROUTES.quotationRevisions]: { screen: 'revisions', title: 'Quotation Revision Requests', subtitle: 'Track seller changes requested by procurement and finance.' },
  [ROUTES.quotationCustomer]: { screen: 'customer', title: 'Customer Quotations', subtitle: 'Review and manage quotes sent to international trade partners.' },
  [ROUTES.quotationCustomerDetails]: { screen: 'customerDetails', title: 'Customer Quote Details', subtitle: 'Quotation preview, terms, and customer response controls.' },
  [ROUTES.quotationExpired]: { screen: 'expired', title: 'Expired Quotations', subtitle: 'Reopen, duplicate, or remove expired seller quotes.' },
  [ROUTES.quotationRejected]: { screen: 'rejected', title: 'Rejected Quotations', subtitle: 'Review rejected quotes and restore when needed.' },
  [ROUTES.quotationCostOptimization]: { screen: 'cost', title: 'Cost Optimization Dashboard', subtitle: 'Real-time savings opportunities and vendor pricing analysis.' },
  [ROUTES.quotationSellerPerformance]: { screen: 'sellerPerformance', title: 'Seller Performance', subtitle: 'Reviewing performance metrics for Q3 2023.' },
  [ROUTES.quotationAnalytics]: { screen: 'advancedAnalytics', title: 'Procurement Efficiency Dashboard', subtitle: 'Real-time performance metrics across the quotation lifecycle.' },
  [ROUTES.quotationPricingAnalytics]: { screen: 'pricing', title: 'Pricing Analytics', subtitle: 'Quotation value, category pricing, and margin analysis.' },
  [ROUTES.quotationGeneratePo]: { screen: 'generatePo', title: 'Generate Purchase Order', subtitle: 'Finalize purchase order from an approved quotation.' },
  [ROUTES.quotationOrders]: { screen: 'poList', title: 'Purchase Order Listing', subtitle: 'Track and manage generated purchase orders across all vendors.' },
  [ROUTES.quotationOrderDetails]: { screen: 'poDetails', title: 'Purchase Order Details', subtitle: 'PO summary, invoice, delivery tracking, and timeline.' },
  [ROUTES.quotationCommunication]: { screen: 'communication', title: 'Quotation Communication Center', subtitle: 'Send RFQ, approval, rejection, and negotiation updates.' },
  [ROUTES.quotationReports]: { screen: 'reports', title: 'Quotation Reports', subtitle: 'Generate quotation, seller, RFQ, saving, and purchase order reports.' },
  [ROUTES.quotationDisputes]: { screen: 'disputes', title: 'Quotation Dispute Center', subtitle: 'Resolve pricing, delivery, quality, and contract disputes.' },
  [ROUTES.quotationHighValue]: { screen: 'highValue', title: 'High Value Quotations Review', subtitle: 'Special finance and risk review queue.' },
  [ROUTES.quotationBulkApproval]: { screen: 'bulk', title: 'Pending Quotations', subtitle: 'Manage and approve incoming quotes from multiple partners.' }
};

const tone = {
  Pending: 'warning',
  Approved: 'success',
  Accepted: 'success',
  Verified: 'success',
  Rejected: 'danger',
  Suspended: 'danger',
  Expired: 'muted',
  Negotiation: 'info',
  Draft: 'muted',
  Sent: 'info',
  Shipped: 'info',
  Delivered: 'success',
  Confirmed: 'info'
};

function Btn({ children, icon: Icon, variant = 'ghost', onClick }) {
  return <button className={`quote-btn ${variant}`} type="button" onClick={onClick}>{Icon && <Icon size={16} />}{children}</button>;
}

function Badge({ children, status }) {
  return <span className={`quote-badge ${tone[status] || status || 'info'}`}>{children}</span>;
}

function Kpi({ label, value, note, icon: Icon, danger }) {
  return (
    <article className="quote-kpi">
      {Icon && <span className="quote-kpi-icon"><Icon size={20} /></span>}
      <small>{label}</small>
      <strong>{value}</strong>
      {note && <em className={danger ? 'danger' : ''}>{note}</em>}
    </article>
  );
}

function MiniBars({ values = [28, 40, 34, 48, 44, 58, 66], alert = false }) {
  return <div className="quote-bars">{values.map((v, i) => <span key={i} style={{ height: `${v}%` }} className={i === values.length - 1 || alert ? 'hot' : ''} />)}</div>;
}

function Donut({ value = 72, label = 'TARGET' }) {
  return <div className="quote-donut" style={{ '--pct': `${value}%` }}><strong>{value}%</strong><span>{label}</span></div>;
}

function TrendChart({ months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }) {
  return <div className="quote-trend"><div className="quote-line" /><div className="quote-axis">{months.map((m) => <span key={m}>{m}</span>)}</div></div>;
}

function Modal({ title, body, onClose, onConfirm }) {
  if (!title) return null;
  return (
    <div className="quote-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="quote-modal" onClick={(event) => event.stopPropagation()}>
        <h3>{title}</h3>
        <p>{body}</p>
        <textarea placeholder="Approval notes..." />
        <div className="quote-actions">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => {
            if (onConfirm) onConfirm();
            onClose();
          }}>Confirm</Btn>
        </div>
      </section>
    </div>
  );
}

function Table({ columns, rows, renderActions, selectable = false }) {
  return (
    <div className="quote-table-wrap">
      <div className="table-responsive-wrapper">
<table className="quote-table">
        <thead><tr>{selectable && <th><input type="checkbox" /></th>}{columns.map((c) => <th key={c.key}>{c.label}</th>)}{renderActions && <th>Actions</th>}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {selectable && <td><input type="checkbox" /></td>}
              {columns.map((c) => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
              {renderActions && <td><div className="quote-row-actions">{renderActions(row)}</div></td>}
            </tr>
          ))}
        </tbody>
      </table>
</div>
    </div>
  );
}

function Dashboard({ nav }) {
  return (
    <>
      <section className="quote-kpi-grid six">
        <Kpi label="Total Quotes" value="1,284" note="+12%" icon={FileText} />
        <Kpi label="Pending" value="42" note="In queue" icon={Clock} />
        <Kpi label="Approved" value="892" note="69% rate" icon={CheckCircle2} />
        <Kpi label="Rejected" value="156" note="12% rate" icon={XCircle} danger />
        <Kpi label="Expired" value="74" note="-4%" icon={AlertTriangle} danger />
        <Kpi label="In Negotiation" value="120" note="Active" icon={MessageSquare} />
      </section>
      <section className="quote-layout-main">
        <article className="quote-card quote-chart-card"><div className="quote-card-head"><div><h3>Quotation Trends</h3><p>Monthly volume vs. target baseline</p></div><span className="quote-legend">Current Previous</span></div><TrendChart /></article>
        <aside className="quote-dark-card"><h3>Approval Rate</h3><p>YTD Commercial Performance</p><Donut value={72} /><div className="quote-dark-list"><span>Speed to Approval <b>2.4 Days</b></span><span>Margin Quality <b>High</b></span></div></aside>
      </section>
      <section className="quote-two-col">
        <article className="quote-card"><div className="quote-card-head"><h3>Recent Quotations</h3><button onClick={() => nav(ROUTES.quotationSeller)}>View All</button></div><QuotationTable nav={nav} compact /></article>
        <article className="quote-card"><h3>High Value Opportunities</h3>{quotations.slice(0, 3).map((q) => <div className="quote-opportunity" key={q.id}><span className="quote-avatar">{q.seller[0]}</span><div><strong>{q.material}</strong><small>{q.seller}</small></div><b>{inr(q.amount)}</b></div>)}<div className="quote-image-card">Total Pipeline Value<br /><strong>₹1.48M</strong></div></article>
      </section>
    </>
  );
}

function QuotationTable({ nav, compact = false, rows, setModal, toast }) {
  const dataRows = rows || (compact ? quotations.slice(0, 3) : quotations);
  return <Table columns={[
    { key: 'id', label: 'Quote ID', render: (q) => <button className="quote-link" onClick={() => nav(ROUTES.quotationDetails)}>{q.id}</button> },
    { key: 'rfq', label: 'RFQ ID' },
    { key: 'seller', label: 'Seller Name', render: (q) => <div className="quote-entity"><span className="quote-avatar">{q.seller.slice(0, 2)}</span><strong>{q.seller}</strong></div> },
    { key: 'amount', label: 'Amount', render: (q) => inr(q.amount) },
    ...(compact ? [] : [{ key: 'delivery', label: 'Delivery Time' }]),
    { key: 'status', label: 'Status', render: (q) => <Badge status={q.status}>{q.status}</Badge> },
    ...(compact ? [] : [{ key: 'submitted', label: 'Submitted Date' }])
  ]} rows={dataRows} renderActions={(q) => (
    <>
      <button title="View" onClick={() => nav(ROUTES.quotationDetails)}><Eye size={15} /></button>
      <button title="Compare" onClick={() => nav(ROUTES.quotationComparison)}><BarChart3 size={15} /></button>
      <button title="Approve" onClick={() => setModal ? setModal(['Approve Quotation', `Are you sure you want to approve quotation ${q.id} for ${inr(q.amount)}?`]) : toast('Quotation approved')}><CheckCircle2 size={15} /></button>
      <button title="Reject" onClick={() => setModal ? setModal(['Reject Quotation', `Are you sure you want to reject quotation ${q.id}?`]) : toast('Quotation rejected')}><XCircle size={15} /></button>
    </>
  )} />;
}

function SellerListing({ nav, toast, setModal }) {
  const [sellerFilter, setSellerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [rfqFilter, setRfqFilter] = useState('');
  const [amountRange, setAmountRange] = useState('ALL');

  const filteredQuotes = useMemo(() => {
    return quotations.filter((q) => {
      // Seller
      if (sellerFilter !== 'ALL' && q.seller !== sellerFilter) return false;
      // Status
      if (statusFilter !== 'ALL' && q.status.toUpperCase() !== statusFilter.toUpperCase()) return false;
      // RFQ ID
      if (rfqFilter.trim() !== '' && !q.rfq.toLowerCase().includes(rfqFilter.toLowerCase())) return false;
      // Amount Range
      if (amountRange !== 'ALL') {
        if (amountRange === 'UNDER_5L' && q.amount >= 500000) return false;
        if (amountRange === '5L_TO_20L' && (q.amount < 500000 || q.amount > 2000000)) return false;
        if (amountRange === 'OVER_20L' && q.amount <= 2000000) return false;
      }
      return true;
    });
  }, [sellerFilter, statusFilter, rfqFilter, amountRange]);

  const handleReset = () => {
    setSellerFilter('ALL');
    setStatusFilter('ALL');
    setRfqFilter('');
    setAmountRange('ALL');
    toast('Filters reset successfully.');
  };

  const avgBid = useMemo(() => {
    const total = filteredQuotes.reduce((acc, curr) => acc + curr.amount, 0);
    return filteredQuotes.length > 0 ? Math.round(total / filteredQuotes.length) : 0;
  }, [filteredQuotes]);

  const pendingCount = useMemo(() => {
    return filteredQuotes.filter(q => q.status === 'Pending').length;
  }, [filteredQuotes]);

  return (
    <>
      <section className="quote-kpi-grid">
        <Kpi label="Total Active Quotes" value={filteredQuotes.length} note="+12% vs last month" />
        <Kpi label="Avg. Bid Amount" value={inr(avgBid)} note="-2.4% vs last month" danger={avgBid > 1000000} />
        <Kpi label="Avg. Delivery Time" value="3.2 Days" note="Stable Trend" />
        <Kpi label="Pending Approval" value={pendingCount} note="Requires attention" danger={pendingCount > 0} />
      </section>
      <div className="quote-filterbar">
        <Filter size={18} />
        <span>Filters</span>
        <Select
          value={sellerFilter}
          onChange={(e) => setSellerFilter(e.target.value)}
          options={[
            { value: "ALL", label: "All Sellers" },
            ...sellers.map((s) => ({ value: s.name, label: s.name }))
          ]}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[{
            label: "All Statuses",
            value: "ALL"
          }, {
            label: "Pending",
            value: "Pending"
          }, {
            label: "Approved",
            value: "Approved"
          }, {
            label: "Rejected",
            value: "Rejected"
          }, {
            label: "Negotiation",
            value: "Negotiation"
          }, {
            label: "Suspended",
            value: "Suspended"
          }]} />
        <input 
          placeholder="RFQ ID" 
          value={rfqFilter} 
          onChange={(e) => setRfqFilter(e.target.value)} 
          style={{ 
            border: '1px solid #cbd5e1', 
            borderRadius: '6px', 
            padding: '4px 10px', 
            fontSize: '13px', 
            outline: 'none',
            color: '#1c2536' 
          }}
        />
        <Select
          value={amountRange}
          onChange={(e) => setAmountRange(e.target.value)}
          options={[{
            label: "All Amounts",
            value: "ALL"
          }, {
            label: "Under ₹5 Lakhs",
            value: "UNDER_5L"
          }, {
            label: "₹5 Lakhs - ₹20 Lakhs",
            value: "5L_TO_20L"
          }, {
            label: "Over ₹20 Lakhs",
            value: "OVER_20L"
          }]} />
        <Btn icon={RefreshCcw} onClick={handleReset}>Reset All</Btn>
      </div>
      <QuotationTable nav={nav} rows={filteredQuotes} setModal={setModal} toast={toast} />
      <section className="quote-two-col"><article className="quote-image-card large">Network Status<br /><span>All regions operating at 100% capacity.</span></article><article className="quote-image-card large alt">Market Insights<br /><span>Quote acceptance rates increased by 4.2% today.</span></article></section>
    </>
  );
}

function RfqListing({ nav, toast, setModal }) {
  const [rfqTab, setRfqTab] = useState('LIVE');
  const [rfqStatusFilter, setRfqStatusFilter] = useState('ALL');
  const [activeRfqFilter, setActiveRfqFilter] = useState(false);

  const displayedRfqs = useMemo(() => {
    return rfqs.filter((r) => {
      // Tab filter
      if (rfqTab === 'LIVE' && r.status === 'Suspended') return false;
      if (rfqTab === 'ARCHIVED' && r.status !== 'Suspended') return false;

      // Status filter
      if (rfqStatusFilter !== 'ALL' && r.status !== rfqStatusFilter) return false;

      return true;
    });
  }, [rfqTab, rfqStatusFilter]);

  const handleExportRfqs = () => {
    const data = [
      ["RFQ ID", "Booking ID", "Material Request", "Quantity", "Sellers Sent", "Deadline", "Status"],
      ...rfqs.map(r => [r.id, r.booking, r.material, r.qty, r.sellers, r.deadline, r.status])
    ];
    const csvContent = generateCSV(data[0], data.slice(1));
    triggerDownload(csvContent, "rfqs_list.csv", "text/csv");
    toast("RFQ list downloaded successfully!");
  };

  return (
    <>
      <section className="quote-kpi-grid">
        <Kpi label="Active RFQs" value={rfqs.filter(r => r.status !== 'Suspended').length} note="+12%" />
        <Kpi label="Avg. Response Time" value="4.2h" note="-0.5h" />
        <Kpi label="Pending Quotes" value="48" note="In queue" />
        <Kpi label="Conversion Rate" value="82%" note="Target" />
      </section>
      <article className="quote-card">
        <div className="quote-card-head">
          <div>
            <h3>Request for Quotations</h3>
            <button 
              className={`quote-chip ${rfqTab === 'LIVE' ? 'active' : ''}`}
              style={{ border: 'none', background: rfqTab === 'LIVE' ? '#25108f' : '#f1f5f9', color: rfqTab === 'LIVE' ? '#fff' : '#565365', cursor: 'pointer', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '800' }}
              onClick={() => setRfqTab('LIVE')}
            >
              Live
            </button>
            <button 
              className={`quote-chip ${rfqTab === 'ARCHIVED' ? 'active' : ''}`}
              style={{ border: 'none', background: rfqTab === 'ARCHIVED' ? '#25108f' : '#f1f5f9', color: rfqTab === 'ARCHIVED' ? '#fff' : '#565365', cursor: 'pointer', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '800', marginLeft: '6px' }}
              onClick={() => setRfqTab('ARCHIVED')}
            >
              Archived
            </button>
          </div>
          <div className="quote-actions" style={{ position: 'relative' }}>
            <Btn icon={Filter} onClick={() => setActiveRfqFilter(!activeRfqFilter)}>
              Filter: {rfqStatusFilter === 'ALL' ? 'All' : rfqStatusFilter}
            </Btn>

            {activeRfqFilter && (
              <>
                <div 
                  onClick={() => setActiveRfqFilter(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 999 }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    right: '100px', 
                    top: '36px', 
                    width: '160px', 
                    background: '#ffffff', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                    zIndex: 1000, 
                    padding: '6px 0',
                    textAlign: 'left'
                  }}
                >
                  {['ALL', 'Pending', 'Verified', 'Suspended'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setRfqStatusFilter(status);
                        setActiveRfqFilter(false);
                        toast(`Filtered RFQs by ${status}`);
                      }}
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: '#1c2536',
                        fontWeight: rfqStatusFilter === status ? '800' : '500',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="hover:bg-slate-50"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </>
            )}

            <Btn icon={Download} onClick={handleExportRfqs}>Export</Btn>
          </div>
        </div>
        <Table columns={[
          { key: 'id', label: 'RFQ ID', render: (r) => <button className="quote-link" onClick={() => nav(ROUTES.quotationCreateRfq)}>{r.id}</button> },
          { key: 'booking', label: 'Booking ID' },
          { key: 'material', label: 'Material Request', render: (r) => <div><strong>{r.material}</strong><small>{r.qty}</small></div> },
          { key: 'sellers', label: 'Sellers Sent', render: (r) => <span className="quote-avatar">+{r.sellers}</span> },
          { key: 'deadline', label: 'Deadline' },
          { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> }
        ]} rows={displayedRfqs} renderActions={(r) => <><button title="View RFQ" onClick={() => setModal([`RFQ Details: ${r.id}`, `Booking Ref: ${r.booking}\n\nMaterial: ${r.material}\nQuantity: ${r.qty}\nSellers Contacted: ${r.sellers}\nDeadline: ${r.deadline}\nStatus: ${r.status}`])}><Eye size={15} /></button><button title="Edit RFQ" onClick={() => nav(ROUTES.quotationCreateRfq)}><Edit3 size={15} /></button><button title="Delete RFQ" onClick={() => setModal(['Delete RFQ', `Are you sure you want to delete RFQ ${r.id} for booking ${r.booking}?`])}><XCircle size={15} /></button></>} />
      </article>
      <section className="quote-two-col"><article className="quote-card"><h3>Response Distribution</h3><MiniBars values={[45, 66, 30, 78, 55]} /></article><article className="quote-dark-card"><h3>Automate RFQs</h3><p>Match materials with verified local sellers instantly.</p><Btn variant="primary" onClick={() => toast('RFQ automation autopilot enabled!')}>Enable Auto-Pilot</Btn></article></section>
    </>
  );
}

function CreateRfq({ toast, nav }) {
  const [step, setStep] = useState(1);
  const steps = ['Booking Info', 'Materials', 'Sellers', 'Deadline', 'Send RFQ'];

  // Form Field States
  const [projectName, setProjectName] = useState('Skyline Tower Phase II');
  const [costCenter, setCostCenter] = useState('ENG-2024-CAPEX');
  const [deliveryDate, setDeliveryDate] = useState('2023-11-15');
  const [priority, setPriority] = useState('Normal');
  const [handling, setHandling] = useState('');

  // Step 2: Materials State
  const [selectedMaterials, setSelectedMaterials] = useState([
    { item: 'High-Grade Concrete (C30/37)', qty: '500 Cubic Meters' },
    { item: 'Structural Steel Beams (I-Section)', qty: '12 Tons' }
  ]);
  const [newMaterialItem, setNewMaterialItem] = useState('');
  const [newMaterialQty, setNewMaterialQty] = useState('');

  const handleAddMaterial = () => {
    if (!newMaterialItem.trim() || !newMaterialQty.trim()) {
      toast('Please enter material name and quantity.');
      return;
    }
    setSelectedMaterials(prev => [...prev, { item: newMaterialItem, qty: newMaterialQty }]);
    setNewMaterialItem('');
    setNewMaterialQty('');
    toast('Material added to RFQ.');
  };

  const handleRemoveMaterial = (index) => {
    setSelectedMaterials(prev => prev.filter((_, i) => i !== index));
    toast('Material removed.');
  };

  // Step 3: Sellers State
  const [checkedSellers, setCheckedSellers] = useState(['Nexus Systems Intl.', 'Global Logistics Pro']);

  const handleToggleSeller = (sellerName) => {
    if (checkedSellers.includes(sellerName)) {
      setCheckedSellers(prev => prev.filter(s => s !== sellerName));
    } else {
      setCheckedSellers(prev => [...prev, sellerName]);
    }
  };

  // Step 4: Deadline & Terms
  const [deadlineDate, setDeadlineDate] = useState('2023-10-28T17:00');
  const [paymentTerms, setPaymentTerms] = useState('Net-30');
  const [deliveryTerms, setDeliveryTerms] = useState('DAP - Delivered at Place');

  // Submit Handler
  const handleSendRFQ = () => {
    if (selectedMaterials.length === 0) {
      toast('Please add at least one material to the RFQ.');
      setStep(2);
      return;
    }
    if (checkedSellers.length === 0) {
      toast('Please select at least one seller to receive the RFQ.');
      setStep(3);
      return;
    }

    toast('RFQ successfully sent to selected sellers!');
    // Redirect to RFQ Listing after 1.5 seconds
    setTimeout(() => {
      nav(ROUTES.quotationRfq);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="quote-form-grid">
              <label>
                Project Name
                <input 
                  type="text" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)} 
                  placeholder="e.g. Skyline Tower Phase II" 
                />
              </label>
              <label>
                Cost Center
                <Select
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  options={[{
                    label: "ENG-2024-CAPEX",
                    value: "ENG-2024-CAPEX"
                  }, {
                    label: "MNT-2024-OPEX",
                    value: "MNT-2024-OPEX"
                  }, {
                    label: "PROJ-ALPHA-CAPEX",
                    value: "PROJ-ALPHA-CAPEX"
                  }]} />
              </label>
              <label>
                Preferred Delivery Date
                <input 
                  type="date" 
                  value={deliveryDate} 
                  onChange={(e) => setDeliveryDate(e.target.value)} 
                />
              </label>
              <label>
                Priority Level
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  options={[{
                    label: "Normal",
                    value: "Normal"
                  }, {
                    label: "Urgent",
                    value: "Urgent"
                  }, {
                    label: "Critical",
                    value: "Critical"
                  }]} />
              </label>
            </div>
            <label>
              Special Handling Instructions
              <textarea 
                value={handling} 
                onChange={(e) => setHandling(e.target.value)} 
                placeholder="Mention site access or unloading requirements..." 
              />
            </label>
          </div>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '13px', color: '#565365', fontWeight: '500' }}>
              Add the materials, specifications, and quantities required for this request.
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label style={{ flex: 2, minWidth: '150px' }}>
                Item Description
                <input 
                  type="text" 
                  placeholder="e.g. High-Grade Concrete (C30/37)" 
                  value={newMaterialItem}
                  onChange={(e) => setNewMaterialItem(e.target.value)}
                />
              </label>
              <label style={{ flex: 1, minWidth: '100px' }}>
                Quantity
                <input 
                  type="text" 
                  placeholder="e.g. 500 Cubic Meters" 
                  value={newMaterialQty}
                  onChange={(e) => setNewMaterialQty(e.target.value)}
                />
              </label>
              <Btn variant="primary" onClick={handleAddMaterial}>+ Add</Btn>
            </div>

            <div style={{ marginTop: '10px' }}>
              <strong style={{ fontSize: '11px', color: '#7a7688', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                RFQ Materials list ({selectedMaterials.length})
              </strong>
              {selectedMaterials.length === 0 ? (
                <div style={{ padding: '16px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', fontSize: '12.5px', color: '#7a7688' }}>
                  No materials added yet. Please use the form above to add materials.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedMaterials.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '13px', color: '#1c2536', display: 'block' }}>{m.item}</strong>
                        <span style={{ fontSize: '11.5px', color: '#565365' }}>Quantity: {m.qty}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveMaterial(idx)}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer', fontSize: '11.5px', fontWeight: '750' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '13px', color: '#565365', fontWeight: '500' }}>
              Select the suppliers to invite to this Request for Quotation.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sellers.map((s) => {
                const isChecked = checkedSellers.includes(s.name);
                return (
                  <div 
                    key={s.name} 
                    onClick={() => handleToggleSeller(s.name)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '12px 16px', 
                      background: isChecked ? '#f5f3ff' : '#ffffff', 
                      border: isChecked ? '1px solid #25108f' : '1px solid #e2e8f0', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => {}} 
                      style={{ pointerEvents: 'none' }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '13.5px', color: '#1c2536', display: 'block' }}>{s.name}</strong>
                      <span style={{ fontSize: '11px', color: '#7a7688' }}>{s.type} | Rating: {s.rating} ★ | Risk: {s.risk}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="quote-form-grid">
              <label>
                Response Deadline Date & Time
                <input 
                  type="datetime-local" 
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                />
              </label>
              <label>
                Payment Terms
                <Select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  options={[{
                    label: "Net-30 schedule",
                    value: "Net-30"
                  }, {
                    label: "50% Advance / 50% Delivery",
                    value: "50% Advance / 50% Delivery"
                  }, {
                    label: "Net-60 schedule",
                    value: "Net-60"
                  }]} />
              </label>
              <label>
                Delivery Terms
                <Select
                  value={deliveryTerms}
                  onChange={(e) => setDeliveryTerms(e.target.value)}
                  options={[{
                    label: "DAP - Delivered at Place",
                    value: "DAP - Delivered at Place"
                  }, {
                    label: "FOB Origin",
                    value: "FOB Origin"
                  }, {
                    label: "FOB Destination",
                    value: "FOB Destination"
                  }]} />
              </label>
            </div>
          </div>
        );
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '13px', color: 'var(--green)', fontWeight: '800', background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              ✓ All fields are configured. Please review the summary below before sending the RFQ.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div><strong>Project Name:</strong> {projectName || 'N/A'}</div>
                <div><strong>Cost Center:</strong> {costCenter}</div>
                <div><strong>Delivery Date:</strong> {deliveryDate || 'N/A'}</div>
                <div><strong>Priority:</strong> {priority}</div>
                <div><strong>Deadline:</strong> {deadlineDate.replace('T', ' ')}</div>
                <div><strong>Payment Terms:</strong> {paymentTerms}</div>
                <div><strong>Delivery Terms:</strong> {deliveryTerms}</div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                <strong style={{ fontSize: '11px', color: '#7a7688', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Materials ({selectedMaterials.length})
                </strong>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', color: '#1c2536' }}>
                  {selectedMaterials.map((m, idx) => (
                    <li key={idx}>{m.item} (Qty: {m.qty})</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                <strong style={{ fontSize: '11px', color: '#7a7688', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Selected Sellers ({checkedSellers.length})
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {checkedSellers.map((s, idx) => (
                    <span key={idx} style={{ background: '#f5f3ff', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '16px', fontSize: '11.5px', color: 'var(--primary)', fontWeight: '600' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="quote-stepper">{steps.map((label, index) => <button className={step === index + 1 ? 'active' : ''} key={label} onClick={() => setStep(index + 1)}><span>{index + 1}</span>{label}</button>)}</div>
      <section className="quote-layout-main">
        <article className="quote-card quote-form-card">
          <h3>{steps[step - 1]}</h3>
          {renderStepContent()}
          {step === 1 && (
            <div className="quote-summary-strip" style={{ marginTop: '20px' }}>
              <strong>Selected seller preview</strong>
              <span>{checkedSellers.join(', ') || 'No sellers selected'}</span>
            </div>
          )}
        </article>
        <aside className="quote-dark-card">
          <h3>Compliance Note</h3>
          <p>Please ensure all RFQ documents comply with ISO 9001:2015 procurement guidelines.</p>
          <div className="quote-dark-panel">
            <ShieldCheck size={22} /> Audit-Ready State
          </div>
        </aside>
      </section>
      <div className="quote-footer-actions">
        <Btn onClick={() => toast('Draft saved.')}>Save Draft</Btn>
        <Btn onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</Btn>
        <Btn variant="primary" onClick={() => step === 5 ? handleSendRFQ() : setStep(step + 1)}>
          {step === 5 ? 'Send RFQ' : 'Next'}
        </Btn>
      </div>
    </>
  );
}

function Details({ nav }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Materials', 'Pricing', 'Seller Information', 'Comparison', 'Negotiation', 'Timeline', 'Audit Logs'];
  const renderTab = () => {
    if (tab === 'Materials') return <Table columns={[{ key: 'item', label: 'Material', render: (m) => <div><strong>{m.item}</strong><small>{m.desc}</small></div> }, { key: 'qty', label: 'Quantity' }, { key: 'unit', label: 'Unit Cost', render: (m) => inr(m.unit) }, { key: 'total', label: 'Total Cost', render: (m) => inr(m.total) }, { key: 'remarks', label: 'Remarks' }]} rows={materials.map((m, i) => ({ ...m, id: i }))} />;
    if (tab === 'Pricing') return <section className="quote-kpi-grid"><Kpi label="Subtotal" value="₹78,247" /><Kpi label="GST" value="₹14,084" /><Kpi label="Delivery Charges" value="₹1,500" /><Kpi label="Final Amount" value="₹93,832" /></section>;
    if (tab === 'Seller Information') return <SellerPerformanceMini />;
    if (tab === 'Comparison') return <ComparisonMatrix compact />;
    if (tab === 'Negotiation') return <NegotiationFeed />;
    if (tab === 'Timeline') return <Timeline items={['RFQ Sent', 'Quotation Submitted', 'Negotiation Started', 'Revised Quote Submitted', 'Approved', 'PO Generated']} />;
    if (tab === 'Audit Logs') return <LogList items={['James approved risk review', 'Finance updated GST values', 'System generated PO draft', 'Seller uploaded compliance cert']} />;
    return <section className="quote-detail-grid"><article className="quote-card"><h3>Overview</h3><div className="quote-info-grid"><span>Quote ID <b>QT-8829R-F</b></span><span>RFQ ID <b>RFQ-2024-004</b></span><span>Seller <b>Nexus Systems Inc.</b></span><span>Status <Badge status="Pending">Pending Review</Badge></span></div></article><aside className="quote-dark-card"><h3>Pricing Summary</h3><p>Subtotal ₹78,247.50</p><p>GST ₹14,084.55</p><strong className="quote-total">₹93,832.05</strong></aside></section>;
  };
  return <><div className="quote-actions"><Btn icon={Download} onClick={() => downloadDummyPDF('Quotation_Export', 'Dummy Quotation Data')}>Export PDF</Btn><Btn variant="primary" icon={CheckCircle2} onClick={() => nav(ROUTES.quotationApprovalDetail)}>Approve Quote</Btn></div><div className="quote-tabs">{tabs.map((t) => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>{renderTab()}<section className="quote-kpi-grid"><article className="quote-card"><PackageCheck /><h3>Contract Terms</h3><p>Net-30 schedule requested by seller.</p></article><article className="quote-card"><PackageCheck /><h3>Shipping Details</h3><p>FOB origin with insured priority tracking.</p></article><article className="quote-card"><ShieldCheck /><h3>Compliance Checks</h3><p>All documentation attached in Materials tab.</p></article></section></>;
}

function ApprovalQueue({ nav, toast, setModal }) {
  return <><section className="quote-kpi-grid three"><Kpi label="Pending Review" value="24" note="+12.5%" icon={ClipboardCheck} /><Kpi label="High Value Quotes" value="₹412.8k" note="Active Pipeline" icon={FileText} /><Kpi label="Urgent Approvals" value="09" note="Expiring Soon" icon={AlertTriangle} danger /></section><article className="quote-card"><div className="quote-card-head"><h3>Live Approval Queue</h3><span className="quote-legend">Pending Approved</span></div><Table columns={[{ key: 'id', label: 'Quote / Service', render: (q) => <div><strong>{q.id}</strong><small>{q.material}</small></div> }, { key: 'seller', label: 'Seller Entity' }, { key: 'amount', label: 'Amount', render: (q) => inr(q.amount) }, { key: 'deadline', label: 'Deadline' }, { key: 'status', label: 'Status', render: (q) => <Badge status={q.status}>{q.status} Review</Badge> }]} rows={quotations.slice(0, 4)} renderActions={(q) => <><Btn onClick={() => nav(ROUTES.quotationApprovalDetail)}>Review</Btn><button title="Approve" onClick={() => setModal(['Approve Quotation', `Are you sure you want to approve quotation ${q.id} for ${inr(q.amount)}?`])}><CheckCircle2 size={15} /></button><button title="Reject" onClick={() => setModal(['Reject Quotation', `Are you sure you want to reject quotation ${q.id}?`])}><XCircle size={15} /></button></>} /></article><section className="quote-two-col"><article className="quote-card"><h3>Approval Pipeline Analysis</h3><Progress label="Technical Services" value={65} /><Progress label="Software Licenses" value={22} /><Progress label="Facilities & Maintenance" value={13} /></article><article className="quote-alert"><AlertTriangle />Compliance update required for 3 quotations from Global Logistix.</article></section></>;
}

function ApprovalDetail({ setModal }) {
  return <section className="quote-three-col"><article className="quote-card"><h3>Quotation Summary</h3><LogList items={['QT-88219', 'Nexus Systems Intl.', '₹24,50,000', 'Risk: Low', 'Priority: Urgent']} /></article><article className="quote-card"><h3>Material Breakdown</h3><Table columns={[{ key: 'item', label: 'Material' }, { key: 'qty', label: 'Qty' }, { key: 'total', label: 'Total', render: (m) => inr(m.total) }]} rows={materials.map((m, i) => ({ ...m, id: i }))} /></article><aside className="quote-dark-card"><h3>Approval Notes</h3><textarea placeholder="Write approval note..." /><Progress label="Cost vs Market" value={82} /><Badge status="info">Low Risk</Badge><div className="quote-actions vertical"><Btn variant="primary" onClick={() => setModal(['Approve quotation', 'This will authorize the selected seller quotation.'])}>Approve</Btn><Btn onClick={() => setModal(['Request revision', 'A revision request will be sent to the seller.'])}>Request Revision</Btn><Btn variant="danger" onClick={() => setModal(['Reject quotation', 'This will reject the quotation and notify the seller.'])}>Reject</Btn></div></aside></section>;
}

function ComparisonMatrix({ compact = false, setModal = () => {} }) {
  const rows = [
    ['Total Price', '₹24,50,000', '₹22,90,000', '₹20,80,000', '₹24,20,000'],
    ['Delivery Time', '14 Days', '5 Days', '21 Days', '10 Days'],
    ['Rating', '4.2', '4.9', '3.8', '4.5'],
    ['Previous Orders', '124', '2,104', '15', '452'],
    ['Success Rate', '92%', '99.4%', '88%', '95%'],
    ['Warranty', '6 Months', '18 Months', '3 Months', '12 Months'],
    ['Availability', 'Medium', 'High', 'Low', 'High'],
    ['Response Time', '4.2h', '2.4h', '9.4h', '3.8h'],
    ['Final Score', '84', '98', '72', '89']
  ];
  return <><div className="quote-matrix-wrap"><div className="table-responsive-wrapper">
<table className="quote-matrix"><thead><tr><th>Key Performance Indicators</th>{['Seller A', 'Seller B', 'Seller C', 'Seller D'].map((s, i) => <th className={i === 1 ? 'winner' : ''} key={s}>{i === 1 && <span className="quote-ribbon">Recommended</span>}<span className="quote-avatar"><Star size={18} /></span><strong>{s}</strong><small>{sellers[i].type}</small></th>)}</tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td>{r.slice(1).map((v, i) => <td className={i === 1 ? 'winner' : ''} key={i}>{v}</td>)}</tr>)}{!compact && <tr><td>Winner Recommendation</td>{['View Profile', 'Approve Seller', 'View Profile', 'View Profile'].map((v, i) => <td className={i === 1 ? 'winner' : ''} key={v + i}><Btn variant={i === 1 ? 'primary' : 'ghost'} onClick={() => i === 1 && setModal(['Approve Seller B', 'Seller B will become the winning supplier.'])}>{v}</Btn><Btn>Negotiate</Btn></td>)}</tr>}</tbody></table>
</div></div>{!compact && <section className="quote-kpi-grid three"><article className="quote-card"><h3>Optimization Hint</h3><p>Choosing Seller B could reduce procurement cycle time by 65%.</p></article><article className="quote-card"><h3>Budget Impact</h3><p>Lead offer is 4.5% below allocated budget ceiling.</p></article><article className="quote-card"><h3>Risk Assessment</h3><p>Seller C has lowest price but limited historical data.</p></article></section>}</>;
}

function Winner({ setModal, toast }) {
  return <section className="quote-layout-main"><div className="quote-stack">{sellers.slice(0, 3).map((s, i) => <article className="quote-winner-card" key={s.name}><div><span className="quote-avatar"><Trophy size={20} /></span><h3>{s.name}</h3><p>{s.type} • EST. {i ? 2012 + i : 2004}</p><div className="quote-metric-row"><div className="quote-metric-col"><small>Final Quote</small><b>{inr([42250000, 39800000, 45500000][i])}</b></div><div className="quote-metric-col"><small>Est. Savings</small><b className="good">{[14.2, 18.5, 6.8][i]}%</b></div><div className="quote-metric-col"><small>Risk</small><b>{s.risk}</b></div></div></div><Donut value={[90, 82, 60][i]} label="Score" /><div className="quote-actions vertical"><Btn variant={i === 0 ? 'primary' : 'dark'} onClick={() => setModal(['Select winner', `${s.name} will be selected as final supplier.`, () => toast(`${s.name} successfully selected as winner!`)])}>Select Winner</Btn><Btn onClick={() => setModal(['Final negotiation', 'Open negotiation drawer for final terms.', () => toast(`Opened final negotiation channel for ${s.name}.`)])}>Final Negotiation</Btn></div></article>)}</div><aside className="quote-side-stack"><article className="quote-card"><h3>Market Context</h3><Kpi label="Market Average" value="₹448.2k" note="5.4% below index" /><Progress label="Quality Compliance" value={98} /><Progress label="Financial Stability" value={85} /></article><article className="quote-dark-card"><h3>Intelligence</h3><p>Nexus Systems currently holds preferred status due to recent successful delivery.</p><Badge status="success">Approvers Ready</Badge></article></aside></section>;
}

function NegotiationCenter({ toast }) {
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState([
    { sender: 'seller', text: 'Hello Alex, current market volatility makes $42,500 our best pricing.', time: '10:30 AM' },
    { sender: 'admin', text: 'We can sign immediately at $41,500 if logistics cost improves.', time: '10:32 AM' },
    { sender: 'seller', text: 'We might bridge the gap. shipping_quote_v2.pdf attached.', time: '10:35 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'admin', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
    toast('Message sent to supplier.');
  };

  const columns = ['Requested', 'Counter Offered', 'Under Review', 'Accepted', 'Rejected'];

  return (
    <section 
      className="quote-negotiation" 
      style={{ 
        display: 'grid', 
        gap: 0, 
        gridTemplateColumns: chatOpen ? 'minmax(0, 1fr) 420px' : '1fr 0px', 
        minHeight: '720px',
        position: 'relative',
        transition: 'grid-template-columns 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', background: '#edf3ff', paddingTop: '24px', flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 24px' }}>
          <h2 style={{ fontSize: '18px', color: '#172033', margin: 0, fontWeight: '700' }}>Negotiation Kanban Board</h2>
          {!chatOpen && (
            <Btn 
              icon={MessageSquare} 
              onClick={() => setChatOpen(true)}
              variant="primary"
            >
              Open Chat
            </Btn>
          )}
        </div>

        <div className="quote-kanban" style={{ flex: 1, padding: '24px 24px 16px 24px' }}>
          {columns.map((col, index) => (
            <article className="quote-kanban-col" key={col} style={{ minWidth: '240px' }}>
              <h3 style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '8px', marginBottom: '12px' }}>
                {col} <span>{index + 1}</span>
              </h3>
              {quotations.slice(index, index + 2).map((q) => (
                <div 
                  className="quote-kanban-card" 
                  key={q.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toast(`Selected quote ${q.id} for negotiation.`)}
                >
                  <strong>{q.id}</strong>
                  <p>{q.material}</p>
                  <small>Supplier: {q.seller}</small>
                  <b>{inr(q.amount)}</b>
                  <Badge status={q.status}>{q.status}</Badge>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>

      {chatOpen && (
        <aside 
          className="quote-chat" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            borderLeft: '1px solid #d1ccd8', 
            background: '#ffffff',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
            <div>
              <h3 style={{ margin: 0 }}>QT-8821</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>MetalCorp Intl. Negotiations</p>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              style={{ 
                background: '#f1f5f9', 
                border: 'none', 
                borderRadius: '6px', 
                padding: '6px 10px', 
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                color: '#475569'
              }}
            >
              Hide Chat
            </button>
          </div>

          <div className="quote-offer" style={{ marginTop: '16px' }}>
            <div>
              Current Offer <strong>$42,500.00</strong>
            </div>
            <Btn variant="primary" onClick={() => toast('Counter offer submitted!')}>Counter</Btn>
          </div>

          <div 
            className="quote-feed" 
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '10px 0', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}
          >
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{ 
                  borderRadius: '7px', 
                  maxWidth: '85%', 
                  padding: '10px 14px',
                  alignSelf: m.sender === 'admin' ? 'flex-end' : 'flex-start',
                  background: m.sender === 'admin' ? '#25108f' : '#edf3ff',
                  color: m.sender === 'admin' ? '#ffffff' : '#1c2536',
                  border: m.sender === 'admin' ? 'none' : '1px solid #cfd8e8',
                  fontSize: '13px'
                }}
              >
                <div>{m.text}</div>
                <div style={{ fontSize: '10px', color: m.sender === 'admin' ? '#c0b6f2' : '#64748b', textAlign: 'right', marginTop: '4px' }}>
                  {m.time}
                </div>
              </div>
            ))}
          </div>

          <div className="quote-composer" style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <input 
              placeholder="Write a message or counter offer..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage}><Send size={18} /></button>
          </div>
        </aside>
      )}
    </section>
  );
}

function NegotiationFeed() {
  return null;
}

function GenericList({ kind, nav }) {
  const rows = kind === 'revisions' ? [
    { id: 'QT-8829-X', seller: 'Nexus Industrial', reason: 'Price too high', by: 'James Smith', status: 'Awaiting Seller' },
    { id: 'QT-9102-M', seller: 'Stark Dynamics', reason: 'Spec mismatch', by: 'Elena Moretti', status: 'Revised Received' },
    { id: 'QT-77S4-P', seller: 'Global Logistics Corp', reason: 'Delivery Lead Time', by: 'Arthur King', status: 'Negotiation' },
    { id: 'QT-6610-B', seller: 'Vertex Supply Co.', reason: 'Terms & Conditions', by: 'Marcus Lee', status: 'Disputed' }
  ] : quotations.map((q) => ({ ...q, reason: q.status === 'Rejected' ? 'Compliance failure' : 'Expired deadline', by: 'Procurement Lead', date: q.submitted }));
  return <><article className="quote-card"><div className="quote-card-head"><h3>{kind === 'revisions' ? 'Tracking Log' : kind === 'expired' ? 'Expired Quote Registry' : 'Rejected Quote Registry'}</h3><div className="quote-actions"><Btn icon={Filter}>Filters</Btn><Btn icon={Download} onClick={() => downloadDummyPDF('Log_Export', 'Dummy Log Data')}>Export</Btn></div></div><Table columns={[
    { key: 'id', label: 'Quote' },
    { key: 'seller', label: 'Seller' },
    { key: 'reason', label: 'Reason' },
    { key: 'by', label: kind === 'revisions' ? 'Requested By' : 'Rejected By' },
    { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> },
    { key: 'date', label: 'Date' }
  ]} rows={rows} renderActions={() => <><Btn onClick={() => nav(ROUTES.quotationDetails)}>View</Btn><button><CheckCircle2 size={15} /></button><button><XCircle size={15} /></button></>} /></article><section className="quote-two-col"><article className="quote-card"><h3>Status Distribution Trends</h3><MiniBars values={[52, 38, 78, 62, 31]} /></article><article className="quote-dark-card"><h3>Archive Optimization</h3><p>AI suggests archiving 15 additional expired quotes to improve system performance.</p><Btn variant="primary">Review Suggestions</Btn></article></section></>;
}

function CustomerQuotes({ nav, toast, setModal }) {
  const rows = quotations.slice(0, 5).map((q, i) => ({ ...q, status: ['Sent', 'Accepted', 'Expired', 'Rejected', 'Sent'][i], expiry: ['Oct 30, 2023', 'Accepted', 'Sep 30, 2023', 'Oct 22, 2023', 'Nov 01, 2023'][i] }));
  return <><section className="quote-kpi-grid"><Kpi label="Sent" value="42" note="+12%" /><Kpi label="Accepted" value="28" note="+5.2%" /><Kpi label="Rejected" value="06" note="-2%" danger /><Kpi label="Expired" value="11" note="Action Req." /></section><article className="quote-card"><div className="quote-card-head"><h3>Active Quotations</h3><span className="quote-legend">Sent Accepted Rejected Expired</span></div><Table columns={[{ key: 'id', label: 'Quote ID' }, { key: 'customer', label: 'Customer Name' }, { key: 'submitted', label: 'Date Sent' }, { key: 'amount', label: 'Amount', render: (q) => inr(q.amount) }, { key: 'status', label: 'Status', render: (q) => <Badge status={q.status}>{q.status}</Badge> }, { key: 'expiry', label: 'Expiry Date' }]} rows={rows} renderActions={(q) => <><button title="View Quote" onClick={() => nav(ROUTES.quotationCustomerDetails)}><Eye size={15} /></button><button title="Resend Notification" onClick={() => toast(`Resent quotation notification to ${q.customer} successfully.`)}><RefreshCcw size={15} /></button><button title="Cancel Quote" onClick={() => setModal(['Cancel Customer Quotation', `Are you sure you want to cancel customer quotation ${q.id} sent to ${q.customer}?`])}><XCircle size={15} /></button></>} /></article><section className="quote-two-col"><article className="quote-dark-card"><h3>Automated Resend is Active</h3><p>3 quotations are nearing expiry. System will notify customers in 24 hours.</p><Btn onClick={() => toast('Reviewing near-expiry client quotations...')}>Review Near Expiry</Btn></article><article className="quote-card"><h3>Pro Tip</h3><p>Custom terms increase acceptance rates by 14% this quarter.</p></article></section></>;
}

function CustomerDetails() {
  return <section className="quote-layout-main"><div className="quote-stack"><article className="quote-card"><h3>Summary of Services & Materials</h3><Table columns={[{ key: 'item', label: 'Item Description' }, { key: 'qty', label: 'Quantity' }, { key: 'unit', label: 'Unit Price', render: (m) => inr(m.unit) }, { key: 'total', label: 'Total', render: (m) => inr(m.total) }]} rows={materials.map((m, i) => ({ ...m, id: i }))} /><div className="quote-note">Vendor Note: Includes priority shipping for all racking units if approved before Friday.</div></article><article className="quote-card"><h3>Terms & Conditions</h3><div className="quote-grid-2"><p><b>Validity Period</b><br />Valid for 30 days from issue.</p><p><b>Payment Schedule</b><br />50% upfront, 40% delivery, 10% sign-off.</p><p><b>Cancellation Policy</b><br />5% handling fee within 7 days.</p><p><b>Compliance & Warranty</b><br />ISO-9001 standards and 12-month warranty.</p></div></article></div><aside className="quote-side-stack"><article className="quote-dark-card"><h3>Quote Total</h3><p>Subtotal ₹36,200</p><p>Tax ₹2,896</p><strong className="quote-total">₹39,639.00</strong></article><article className="quote-card"><h3>Your Response</h3><textarea placeholder="Add comment..." /><Btn variant="primary" icon={CheckCircle2}>Accept Quotation</Btn><div className="quote-actions"><Btn>Inquiry</Btn><Btn variant="danger">Reject</Btn></div></article></aside></section>;
}

function AnalyticsPage({ type, toast, setModal }) {
  const advanced = type === 'advanced';
  return <><section className="quote-kpi-grid"><Kpi label={advanced ? 'Active RFQs' : 'Potential Savings'} value={advanced ? '142' : '₹42,850'} note="+12%" icon={TrendingUp} /><Kpi label={advanced ? 'Avg. Savings %' : 'Avg Quotation Value'} value={advanced ? '18.4%' : '₹12,400'} note={advanced ? '+4%' : '-4.2%'} icon={TrendingDown} /><Kpi label={advanced ? 'Response Time' : 'Active RFQs'} value={advanced ? '2.4d' : '156'} note="Active" icon={BarChart3} /><Kpi label={advanced ? 'Win Rate' : 'Market Variance'} value={advanced ? '64%' : '+1.8%'} note="Stable" icon={ShieldCheck} /></section><section className="quote-layout-main"><article className="quote-card quote-chart-card"><div className="quote-card-head"><div><h3>{advanced ? 'Approval Funnel' : 'Overall Cost Trend'}</h3><p>{advanced ? 'Conversion from RFQ creation to final approval' : 'Monthly procurement expenditure across all categories'}</p></div></div>{advanced ? <Funnel /> : <TrendChart months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']} />}</article><aside className="quote-dark-card"><h3>{advanced ? 'Negotiation Funnel' : 'Savings Impact'}</h3>{advanced ? <><Progress label="Initial Quote Total" value={100} /><Progress label="Counter-Offer Avg." value={82} /><Progress label="Final Settlement" value={74} /><strong className="quote-total">$720k</strong></> : <><Donut value={75} /><LogList items={['Negotiated Savings ₹18.2k', 'Bulk Discounts ₹12.4k', 'Logistics Optimization ₹12.2k']} /></>}</aside></section><section className="quote-two-col"><article className="quote-card"><h3>{advanced ? 'Cost Reduction Distribution' : 'Seller Pricing Performance'}</h3><MiniBars /></article><article className="quote-dark-card"><h3>Strategic Recommendation</h3><p>Consolidating office supply RFQs could yield an additional 15% saving.</p><Btn onClick={() => setModal(['Apply Cost Strategy', 'Are you sure you want to consolidate office supply RFQs to apply the 15% savings strategy?', () => toast('Cost reduction strategy applied successfully!')])}>Apply Strategy</Btn></article></section></>;
}

function SellerPerformanceMini() {
  return <><section className="quote-kpi-grid three"><Kpi label="Quotation Win Rate" value="68.4%" note="+12%" icon={Trophy} /><Kpi label="Avg. Response Time" value="2.4 hrs" note="-4.2m" icon={Clock} /><Kpi label="Approval Rate" value="94.1%" note="0%" icon={ShieldCheck} /></section><section className="quote-layout-main"><article className="quote-card"><h3>Monthly Performance</h3><MiniBars values={[48, 64, 55, 76, 72, 88]} /></article><article className="quote-card"><h3>Order Fulfillment</h3><Donut value={82} label="On-Time" /><LogList items={['Delivered 1,240', 'Pending 284']} /></article></section></>;
}

function PricingAnalytics() {
  return <><section className="quote-kpi-grid"><Kpi label="Quotation Value Trend" value="₹8.2M" note="+8%" /><Kpi label="Category Pricing" value="12" note="Optimized" /><Kpi label="Seller Comparison" value="42" note="Tracked" /><Kpi label="Profit Margin" value="24.8%" note="+2.1%" /></section><section className="quote-two-col"><article className="quote-card"><h3>Quotation Value Trend</h3><TrendChart /></article><article className="quote-card"><h3>Profit Margin Analysis</h3><MiniBars values={[45, 52, 48, 61, 69, 73]} /></article><article className="quote-card"><h3>Category Pricing</h3><Progress label="Technical Services" value={65} /><Progress label="Software Licenses" value={22} /><Progress label="Facilities" value={13} /></article><article className="quote-card"><h3>Seller Pricing Comparison</h3><QuotationTable nav={() => {}} compact /></article></section></>;
}

function GeneratePo() {
  return (
    <section className="quote-layout-main"><div className="quote-stack"><article className="quote-hero-dark"><div><span className="quote-chip purple">Verified Quotation</span><h2>Finalize PO for Industrial Steel Supplies</h2><p>Review seller information and material quantities before generation.</p></div><Btn variant="primary" icon={FileText}>Generate PO</Btn></article><section className="quote-two-col"><article className="quote-card"><h3>Seller Information</h3><p>Metals Global Ltd.<br />Vendor ID: V-992104</p></article><article className="quote-card"><h3>Delivery Destination</h3><p>Main Warehouse B<br />900 Commerce Blvd, Dock 4</p></article></section><article className="quote-card"><h3>Material List</h3><Table columns={[{ key: 'item', label: 'Item Description' }, { key: 'qty', label: 'Quantity' }, { key: 'unit', label: 'Unit Price', render: (m) => inr(m.unit) }, { key: 'total', label: 'Total', render: (m) => inr(m.total) }]} rows={materials.map((m, i) => ({ ...m, id: i }))} /></article></div><aside className="quote-side-stack"><article className="quote-card"><h3>Delivery Terms</h3><Select
      options={[{
        label: "DAP - Delivered at Place",
        value: "DAP - Delivered at Place"
      }]} /><h3>Payment Terms</h3><label className="quote-radio"><input type="radio" defaultChecked /> Net 30</label><label className="quote-radio"><input type="radio" /> 50% Advance</label><textarea placeholder="Notes for seller..." /></article><article className="quote-info-panel"><h3>Approvals Required</h3><Timeline items={['Purchasing Dept: Approved', 'Finance Dept: Pending Generation']} /><Btn>Preview Draft</Btn></article></aside></section>
  );
}

function PoList({ nav, toast, setModal }) {
  const [filterType, setFilterType] = useState('ALL');

  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((p) => {
      if (filterType === 'ACTIVE') return p.status !== 'Delivered';
      if (filterType === 'COMPLETED') return p.status === 'Delivered';
      return true;
    });
  }, [filterType]);

  return (
    <>
      <section className="quote-kpi-grid">
        <Kpi label="Total Active POs" value={purchaseOrders.length} note="+12%" />
        <Kpi label="Total Commitment" value="$4.2M" note="+2.4%" />
        <Kpi label="Pending Delivery" value="42" note="5 Late" danger />
        <Kpi label="Avg. Lead Time" value="14d" note="-2d vs LY" />
      </section>
      <article className="quote-card">
        <div className="quote-filterbar inline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px' }}>
          <button 
            onClick={() => setFilterType('ALL')}
            style={{ 
              background: filterType === 'ALL' ? '#25108f' : 'transparent', 
              color: filterType === 'ALL' ? '#ffffff' : '#475569',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '12px'
            }}
          >
            All Orders
          </button>
          <button 
            onClick={() => setFilterType('ACTIVE')}
            style={{ 
              background: filterType === 'ACTIVE' ? '#25108f' : 'transparent', 
              color: filterType === 'ACTIVE' ? '#ffffff' : '#475569',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '12px'
            }}
          >
            Active
          </button>
          <button 
            onClick={() => setFilterType('COMPLETED')}
            style={{ 
              background: filterType === 'COMPLETED' ? '#25108f' : 'transparent', 
              color: filterType === 'COMPLETED' ? '#ffffff' : '#475569',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '12px'
            }}
          >
            Completed
          </button>
          <span style={{ fontSize: '12px', color: '#64748b', marginLeft: 'auto' }}>
            Showing {filteredOrders.length} orders
          </span>
        </div>
        <Table 
          columns={[
            { key: 'id', label: 'PO ID' }, 
            { key: 'seller', label: 'Seller Name' }, 
            { key: 'amount', label: 'Total Amount', render: (p) => inr(p.amount) }, 
            { key: 'date', label: 'Issue Date' }, 
            { key: 'delivery', label: 'Expected Delivery' }, 
            { key: 'status', label: 'Status', render: (p) => <Badge status={p.status}>{p.status}</Badge> }
          ]} 
          rows={filteredOrders} 
          renderActions={(p) => (
            <>
              <button title="View Details" onClick={() => nav(ROUTES.quotationOrderDetails)}><Eye size={15} /></button>
              <button title="Download PO" onClick={() => {
                const header = ["PO ID", "Seller Name", "Amount", "Issue Date", "Expected Delivery", "Status"];
                const row = [p.id, p.seller, p.amount, p.date, p.delivery, p.status];
                triggerDownload(generateCSV(header, [row]), `PO_${p.id}.csv`, 'text/csv');
                toast(`Purchase Order ${p.id} downloaded successfully!`);
              }}><Download size={15} /></button>
              <button title="Mark Delivered" onClick={() => setModal(['Confirm Delivery', `Are you sure you want to mark Purchase Order ${p.id} from ${p.seller} as Delivered?`, () => toast(`Purchase Order ${p.id} marked as Delivered!`)])}><PackageCheck size={15} /></button>
            </>
          )} 
        />
      </article>
      <section className="quote-two-col">
        <article className="quote-dark-card">
          <h3>Optimization Opportunity</h3>
          <p>Combining 4 pending POs could save ₹1,200 in logistics fees.</p>
          <Btn onClick={() => setModal(['Apply Consolidation', 'Are you sure you want to combine 4 pending POs to save ₹1,200 in logistics fees?', () => toast('Consolidation strategy applied successfully!')])}>Apply Consolidation</Btn>
        </article>
        <article className="quote-card">
          <h3>Quarterly Budget Progress</h3>
          <Donut value={75} />
        </article>
      </section>
    </>
  );
}

function PoDetails() {
  return <section className="quote-layout-main"><div className="quote-stack"><article className="quote-card"><h3>PO Summary</h3><div className="quote-info-grid"><span>PO ID <b>PO-2023-8842</b></span><span>Status <Badge status="Shipped">Shipped</Badge></span><span>Amount <b>₹1,24,50,000</b></span><span>Date <b>Oct 24, 2023</b></span></div></article><article className="quote-card"><h3>Material List</h3><Table columns={[{ key: 'item', label: 'Material' }, { key: 'qty', label: 'Quantity' }, { key: 'total', label: 'Total', render: (m) => inr(m.total) }]} rows={materials.map((m, i) => ({ ...m, id: i }))} /></article><article className="quote-card"><h3>Delivery Tracking</h3><Timeline items={['PO Generated', 'Seller Confirmed', 'Packed', 'Shipped', 'Out for Delivery']} /></article></div><aside className="quote-side-stack"><article className="quote-dark-card"><h3>Invoice Information</h3><p>INV-8842 • Tax included • Net 30</p><Btn icon={Download}>Download</Btn><Btn icon={PackageCheck}>Track Delivery</Btn></article><article className="quote-card"><h3>Seller Information</h3><p>TechLink Solutions Ltd.<br />Tier 1 Supplier</p></article></aside></section>;
}

function Communication() {
  const [channel, setChannel] = useState('Email');
  return (
    <section className="quote-layout-main"><article className="quote-card"><h3>Channel Selection</h3><div className="quote-kpi-grid four">{['Email', 'SMS', 'WhatsApp', 'Push'].map((c) => <button className={`quote-channel ${channel === c ? 'active' : ''}`} key={c} onClick={() => setChannel(c)}>{c}</button>)}</div><div className="quote-form-grid"><label>Template<Select
      options={[{
        label: "RFQ Invitation",
        value: "RFQ Invitation"
      }, {
        label: "Approval Notice",
        value: "Approval Notice"
      }, {
        label: "Rejection Notice",
        value: "Rejection Notice"
      }, {
        label: "Negotiation Request",
        value: "Negotiation Request"
      }]} /></label><label>Recipient<Select
      options={[{
        label: "Selected Sellers",
        value: "Selected Sellers"
      }, {
        label: "Customers",
        value: "Customers"
      }, {
        label: "Approvers",
        value: "Approvers"
      }]} /></label></div><textarea defaultValue={`Hello {{name}}, you have a new RFQ invitation for {{material}}. Please respond before {{deadline}}.`} /><label className="quote-radio"><input type="checkbox" /> Schedule for later</label><Btn variant="primary" icon={Send}>Send Message</Btn></article><aside className="quote-card"><h3>Message Preview</h3><div className="quote-preview-phone"><strong>{channel}</strong><p>Hello Nexus Systems, you have a new RFQ invitation for Structural Steel Beams.</p></div></aside></section>
  );
}

function Reports({ toast }) {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredExports = useMemo(() => {
    const list = quotations.slice(0, 4).map((q, idx) => ({
      id: idx === 0 ? 'Quotation Report' : idx === 1 ? 'Seller Report' : idx === 2 ? 'RFQ Report' : 'Cost Saving Report',
      seller: q.seller,
      submitted: q.submitted,
      status: idx % 2 === 0 ? 'Ready' : 'In Review'
    }));
    
    return list.filter((r) => {
      if (statusFilter === 'Ready' && r.status !== 'Ready') return false;
      if (statusFilter === 'In Review' && r.status !== 'In Review') return false;
      return true;
    });
  }, [statusFilter]);

  const reports = ['Quotation Report', 'Seller Report', 'RFQ Report', 'Cost Saving Report', 'Purchase Order Report'];

  return (
    <>
      <div className="quote-filterbar">
        <Calendar 
          size={18} 
          style={{ cursor: 'pointer', color: 'var(--primary)' }} 
          onClick={() => toast('Date range filter picker activated.')} 
        />
        <Select
          value={timeRange}
          onChange={(e) => { setTimeRange(e.target.value); toast(`Report timeline set to ${e.target.value}`); }}
          options={[{
            label: "Last 30 Days",
            value: "Last 30 Days"
          }, {
            label: "Last 7 Days",
            value: "Last 7 Days"
          }, {
            label: "This Month",
            value: "This Month"
          }, {
            label: "This Year",
            value: "This Year"
          }]} />
        <Select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); toast(`Filtering report exports by: ${e.target.value}`); }}
          options={[{
            label: "All Statuses",
            value: "ALL"
          }, {
            label: "Ready",
            value: "Ready"
          }, {
            label: "In Review",
            value: "In Review"
          }]} />
        <Btn icon={Download} onClick={() => downloadDummyPDF('Report_Export', 'Dummy Report Data')}>Export PDF</Btn>
        <Btn icon={Download} onClick={() => triggerDownload(generateCSV(['ID', 'Status'], [{ID: 1, Status: 'Dummy'}, {ID: 2, Status: 'Data'}]), 'Report_Export.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}>Export Excel</Btn>
        <Btn icon={Download} onClick={() => triggerDownload(generateCSV(['ID', 'Status'], [{ID: 1, Status: 'Dummy'}, {ID: 2, Status: 'Data'}]), 'Report_Export.csv', 'text/csv')}>Export CSV</Btn>
      </div>
      <section className="quote-kpi-grid">
        {reports.map((r) => (
          <article className="quote-card" key={r}>
            <FileText />
            <h3>{r}</h3>
            <p>Ready for executive and procurement review.</p>
            <div className="quote-actions">
              <Btn onClick={() => downloadDummyPDF(r, 'Dummy PDF Data for ' + r)}>PDF</Btn>
              <Btn onClick={() => triggerDownload(generateCSV(['Report', 'Data'], [{Report: r, Data: 'Dummy'}]), r.replace(/ /g, '_') + '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}>Excel</Btn>
              <Btn onClick={() => triggerDownload(generateCSV(['Report', 'Data'], [{Report: r, Data: 'Dummy'}]), r.replace(/ /g, '_') + '.csv', 'text/csv')}>CSV</Btn>
            </div>
          </article>
        ))}
      </section>
      <article className="quote-card">
        <h3>Recent Exports</h3>
        <Table 
          columns={[
            { key: 'id', label: 'Report' }, 
            { key: 'seller', label: 'Owner' }, 
            { key: 'submitted', label: 'Date' }, 
            { key: 'status', label: 'Status', render: (r) => <Badge status={r.status === 'Ready' ? 'success' : 'warning'}>{r.status}</Badge> }
          ]} 
          rows={filteredExports} 
        />
      </article>
    </>
  );
}

function Disputes({ toast, setModal }) {
  const [disputeList, setDisputeList] = useState([
    { id: 'QT-8802', title: 'Pricing Dispute', severity: 'warning', status: 'Active' },
    { id: 'QT-8812', title: 'Delivery Dispute', severity: 'warning', status: 'Active' },
    { id: 'QT-8822', title: 'Material Quality Dispute', severity: 'danger', status: 'Active' },
    { id: 'QT-8832', title: 'Contract Dispute', severity: 'danger', status: 'Active' }
  ]);
  const [notesText, setNotesText] = useState('');

  const handleSaveNotes = () => {
    if (!notesText.trim()) {
      toast('Please write resolution notes first.');
      return;
    }
    toast('Resolution notes saved successfully!');
    setNotesText('');
  };

  return (
    <section className="quote-layout-main">
      <article className="quote-card">
        <h3>Active Disputes</h3>
        {disputeList.length === 0 ? (
          <div style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            No active disputes found. All issues resolved!
          </div>
        ) : (
          disputeList.map((d) => (
            <div className="quote-dispute" key={d.id}>
              <div>
                <strong>{d.title}</strong>
                <small>{d.id} • Evidence package attached</small>
              </div>
              <Badge status={d.severity === 'danger' ? 'danger' : 'warning'}>
                {d.severity === 'danger' ? 'High' : 'Medium'}
              </Badge>
              <Btn 
                onClick={() => setModal([
                  'Resolve Dispute', 
                  `Are you sure you want to resolve the ${d.title} (${d.id})?`, 
                  () => {
                    setDisputeList(prev => prev.filter(item => item.id !== d.id));
                    toast(`${d.title} resolved successfully!`);
                  }
                ])}
              >
                Resolve
              </Btn>
              <Btn 
                onClick={() => setModal([
                  'Escalate Dispute', 
                  `Are you sure you want to escalate the ${d.title} (${d.id}) to senior management?`, 
                  () => {
                    toast(`${d.title} escalated successfully.`);
                  }
                ])}
              >
                Escalate
              </Btn>
              <Btn 
                onClick={() => setModal([
                  'Close Dispute', 
                  `Are you sure you want to close the ${d.title} (${d.id})?`, 
                  () => {
                    setDisputeList(prev => prev.filter(item => item.id !== d.id));
                    toast(`${d.title} closed.`);
                  }
                ])}
              >
                Close
              </Btn>
            </div>
          ))
        )}
      </article>
      <aside className="quote-side-stack">
        <article className="quote-card">
          <h3>Evidence Viewer</h3>
          <div className="quote-evidence">
            contracts.pdf<br />
            delivery-log.csv<br />
            photo-proof.png
          </div>
        </article>
        <article className="quote-dark-card">
          <h3>Resolution Notes</h3>
          <textarea 
            placeholder="Write resolution notes..." 
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
          />
          <Btn variant="primary" onClick={handleSaveNotes}>Save Resolution</Btn>
        </article>
      </aside>
    </section>
  );
}

function HighValue({ nav }) {
  return (
    <><section className="quote-kpi-grid"><Kpi label="Total High-Value Volume" value="$12.4M" note="+14%" /><Kpi label="Pending Financial Exposure" value="$4.1M" note="18 items" /><Kpi label="Average Risk Rating" value="Low" note="Stable" /><Kpi label="Approval Velocity" value="2.4d" note="-0.5d" danger /></section><div className="quote-filterbar"><span>Amount Range</span><Select
      options={[{
        label: "₹50k - ₹250k",
        value: "₹50k - ₹250k"
      }, {
        label: "₹1L+",
        value: "₹1L+"
      }, {
        label: "₹5L+",
        value: "₹5L+"
      }]} /><Select
      options={[{
        label: "Risk Review",
        value: "Risk Review"
      }]} /><Select
      options={[{
        label: "Awaiting CFO",
        value: "Awaiting CFO"
      }]} /></div><article className="quote-card"><Table columns={[{ key: 'rfq', label: 'RFQ Reference' }, { key: 'seller', label: 'Vendor Identity' }, { key: 'amount', label: 'Quoted Amount', render: (q) => inr(q.amount) }, { key: 'priority', label: 'Risk Status', render: (q) => <Badge status={q.priority === 'Critical' ? 'danger' : 'success'}>{q.priority === 'Critical' ? 'High Risk' : 'Low Risk'}</Badge> }, { key: 'status', label: 'Finance Stage' }, { key: 'delivery', label: 'Age' }]} rows={quotations.slice(0, 4)} renderActions={() => <><button onClick={() => nav(ROUTES.quotationApprovalDetail)}><Eye size={15} /></button><button><CheckCircle2 size={15} /></button><button><XCircle size={15} /></button></>} /></article><section className="quote-two-col"><article className="quote-card"><h3>Risk Concentration Heatmap</h3><div className="quote-heatmap">Interactive Risk Visualization Module</div></article><article className="quote-dark-card"><h3>Quick Action: Global Audit</h3><p>Systematic review of all pending high-value items across regions.</p><Progress label="Verification Progress" value={78} /><Btn variant="primary">Run Priority Verification</Btn></article></section></>
  );
}

function BulkApproval({ setModal }) {
  return (
    <><section className="quote-kpi-grid"><Kpi label="Awaiting Approval" value="24" note="-4% vs last week" danger /><Kpi label="Total Value" value="$142.8k" note="+12.5%" /><Kpi label="Average Savings" value="18.2%" note="Optimized" /><Kpi label="SLA Status" value="98%" note="On Track" /></section><div className="quote-filterbar"><button>All Pending</button><button>High Value</button><button>Due Soon</button><Select
      options={[{
        label: "Assign Reviewer",
        value: "Assign Reviewer"
      }, {
        label: "Alex Rivera",
        value: "Alex Rivera"
      }]} /><Btn variant="primary" onClick={() => setModal(['Bulk approve', 'Selected quotations will be approved together.'])}>Approve Selected</Btn><Btn variant="danger" onClick={() => setModal(['Bulk reject', 'Selected quotations will be rejected together.'])}>Reject Selected</Btn></div><article className="quote-card"><Table selectable columns={[{ key: 'id', label: 'Quotation ID' }, { key: 'seller', label: 'Vendor Partner' }, { key: 'material', label: 'Project / RFQ' }, { key: 'amount', label: 'Quote Value', render: (q) => inr(q.amount) }, { key: 'status', label: 'Status', render: (q) => <Badge status="Pending">Pending Review</Badge> }, { key: 'deadline', label: 'Deadline' }]} rows={quotations.slice(0, 4)} renderActions={() => <button><MoreVertical size={15} /></button>} /></article><section className="quote-two-col"><article className="quote-info-panel"><h3>Smart Sorting Enabled</h3><p>Pending quotations are sorted by project deadlines and vendor history.</p></article><article className="quote-dark-card"><h3>Bulk Selection Guide</h3><p>Hold Shift + Click to select a range of items for faster processing.</p></article></section></>
  );
}

function LogList({ items }) {
  return <div className="quote-log-list">{items.map((item) => <div key={item}>{item}</div>)}</div>;
}

function Timeline({ items }) {
  return <div className="quote-timeline">{items.map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong><small>{index < 3 ? 'Completed' : 'Pending'}</small></div>)}</div>;
}

function Progress({ label, value }) {
  return <div className="quote-progress"><div><span>{label}</span><b>{value}%</b></div><em><i style={{ width: `${value}%` }} /></em></div>;
}

function Funnel() {
  return <div className="quote-funnel">{['RFQ Created', 'Vendor Quoted', 'Review Stage', 'Negotiation', 'Approved'].map((s, i) => <span key={s} style={{ width: `${100 - i * 12}%` }}>{s}</span>)}</div>;
}

export default function QuotationManagement() {
  const { route, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const [modal, setModal] = useState(null);
  const meta = routeMeta[route] || routeMeta[ROUTES.quotations];
  const nav = (nextRoute) => navigate(nextRoute);
  const toast = (msg) => {
    setFeedback(msg);
    window.setTimeout(() => setFeedback(''), 2200);
  };

  useEffect(() => setModal(null), [route]);

  const content = useMemo(() => {
    const props = { nav, toast, setModal };
    switch (meta.screen) {
      case 'seller': return <SellerListing {...props} />;
      case 'rfq': return <RfqListing {...props} />;
      case 'createRfq': return <CreateRfq {...props} />;
      case 'details': return <Details {...props} />;
      case 'approvalQueue': return <ApprovalQueue {...props} />;
      case 'approvalDetail': return <ApprovalDetail {...props} />;
      case 'comparison': return <ComparisonMatrix {...props} />;
      case 'winner': return <Winner {...props} />;
      case 'negotiation': return <NegotiationCenter {...props} />;
      case 'revisions': return <GenericList kind="revisions" {...props} />;
      case 'customer': return <CustomerQuotes {...props} />;
      case 'customerDetails': return <CustomerDetails {...props} />;
      case 'expired': return <GenericList kind="expired" {...props} />;
      case 'rejected': return <GenericList kind="rejected" {...props} />;
      case 'cost': return <AnalyticsPage type="cost" {...props} />;
      case 'sellerPerformance': return <SellerPerformanceMini {...props} />;
      case 'pricing': return <PricingAnalytics {...props} />;
      case 'advancedAnalytics': return <AnalyticsPage type="advanced" {...props} />;
      case 'generatePo': return <GeneratePo {...props} />;
      case 'poList': return <PoList {...props} />;
      case 'poDetails': return <PoDetails {...props} />;
      case 'communication': return <Communication {...props} />;
      case 'reports': return <Reports {...props} />;
      case 'disputes': return <Disputes {...props} />;
      case 'highValue': return <HighValue {...props} />;
      case 'bulk': return <BulkApproval {...props} />;
      default: return <Dashboard {...props} />;
    }
  }, [meta.screen, route]);

  return (
    <AdminShell
      activeTab="Quotation Management"
      headerTitle="Quotation Manager"
      searchPlaceholder="Search quotations, sellers, or IDs..."
      searchValue={query}
      onSearchChange={setQuery}
      showGridIcon
      pageTitle="Quotation Management"
      pageSubtitle="Manage, track and approve quotations across all service categories."
    >
      <section className="quote-module">
        {feedback && <div className="quote-toast"><CheckCircle2 size={16} />{feedback}</div>}
        <div className="quote-page-head">
          <div>
            <button className="quote-back" type="button" onClick={() => navigate(ROUTES.quotations)}><ArrowLeft size={16} /> Dashboard</button>
            <h1>{meta.title}</h1>
            <p>{meta.subtitle}</p>
          </div>
          <div className="quote-actions">
            <Btn icon={Download} onClick={() => {
              const data = [
                ["Quote ID", "RFQ ID", "Seller Name", "Customer", "Amount", "Delivery Time", "Status", "Submitted Date"],
                ...quotations.map(q => [q.id, q.rfq, q.seller, q.customer, q.amount, q.delivery, q.status, q.submitted])
              ];
              const csvContent = generateCSV(data[0], data.slice(1));
              triggerDownload(csvContent, "quotations_report.csv", "text/csv");
              toast("Quotations report downloaded successfully!");
            }}>Export Report</Btn>
            <Btn icon={Plus} variant="primary" onClick={() => navigate(ROUTES.quotationCreateRfq)}>Create RFQ</Btn>
          </div>
        </div>
        <div className="quote-module-nav">
          {[
            ['Dashboard', ROUTES.quotations],
            ['Seller Quotes', ROUTES.quotationSeller],
            ['RFQs', ROUTES.quotationRfq],
            ['Create RFQ', ROUTES.quotationCreateRfq],
            ['Details', ROUTES.quotationDetails],
            ['Approvals', ROUTES.quotationApprovals],
            ['Approval Detail', ROUTES.quotationApprovalDetail],
            ['Comparison', ROUTES.quotationComparison],
            ['Winner', ROUTES.quotationWinner],
            ['Negotiation', ROUTES.quotationNegotiation],
            ['Revisions', ROUTES.quotationRevisions],
            ['Customer', ROUTES.quotationCustomer],
            ['Customer Detail', ROUTES.quotationCustomerDetails],
            ['Expired', ROUTES.quotationExpired],
            ['Rejected', ROUTES.quotationRejected],
            ['Cost', ROUTES.quotationCostOptimization],
            ['Seller Perf.', ROUTES.quotationSellerPerformance],
            ['Pricing', ROUTES.quotationPricingAnalytics],
            ['Generate PO', ROUTES.quotationGeneratePo],
            ['POs', ROUTES.quotationOrders],
            ['PO Detail', ROUTES.quotationOrderDetails],
            ['Comms', ROUTES.quotationCommunication],
            ['Analytics', ROUTES.quotationAnalytics],
            ['Reports', ROUTES.quotationReports],
            ['Disputes', ROUTES.quotationDisputes],
            ['High Value', ROUTES.quotationHighValue],
            ['Bulk', ROUTES.quotationBulkApproval]
          ].map(([label, r]) => <button key={r} className={route === r ? 'active' : ''} onClick={() => navigate(r)}>{label}</button>)}
        </div>
        <GlobalDashboardFilters />
        {content}
      </section>
      <Modal title={modal?.[0]} body={modal?.[1]} onClose={() => setModal(null)} onConfirm={modal?.[2]} />
    </AdminShell>
  );
}
