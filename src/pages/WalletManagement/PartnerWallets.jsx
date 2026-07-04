import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import {
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Upload,
  X,
  Building2,
  Calendar,
  ChevronDown
} from "lucide-react";
import PartnerExportButton from "../../components/ui/PartnerExportButton";
import PartnerExportModal from "../../components/ui/PartnerExportModal";
import { useToast } from "../../components/common/ToastNotification";

// Global Unified Components
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import FilterBar from '../../components/ui/FilterBar';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const initialWalletPartners = [
  { name: "SkyNet Logistics", id: "ID-94821", type: "ISP", balance: 42500.00, threshold: 10000.00, status: "On Track", velocity: [40, 60, 45, 75, 50, 90, 65] },
  { name: "BlueWave Systems", id: "ID-44210", type: "BSP", balance: 128400.12, threshold: 50000.00, status: "Overdue", velocity: [80, 50, 95, 40, 70, 85, 100] },
  { name: "Apex Pro Logistics", id: "ID-33109", type: "ISP", balance: 5120.00, threshold: 10000.00, status: "Awaiting", velocity: [20, 30, 25, 35, 15, 40, 30] },
  { name: "Vertex Transit", id: "ID-22874", type: "ISP", balance: 89230.50, threshold: 25000.00, status: "Processing", velocity: [60, 70, 80, 65, 90, 75, 85] }
];

export default function PartnerWallets() {
  const [walletPartners, setWalletPartners] = useState(initialWalletPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(""); 
  const [activeModalData, setActiveModalData] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { addToast } = useToast();

  const showToast = (msg) => addToast(msg, 'success');

  const filteredPartners = useMemo(() => {
    return walletPartners.filter((partner) => {
      const matchSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || partner.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = !selectedType || partner.type === selectedType;
      return matchSearch && matchType;
    });
  }, [walletPartners, searchQuery, selectedType]);

  const metrics = useMemo(() => {
    let total = 0, overdueCount = 0;
    filteredPartners.forEach((p) => {
      total += p.balance;
      if (p.status === "Overdue") overdueCount++;
    });
    return { total, overdueCount };
  }, [filteredPartners]);

  const formatCurrency = (val) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const handleReviewPayouts = () => {
    const activePayoutsCount = walletPartners.filter(p => p.status === "Processing" || p.status === "Overdue").length;
    showToast(`Success: Triggered dispatch logs for ${activePayoutsCount} active high-priority settlements.`);
  };

  const combinedGraphBars = useMemo(() => {
    if (filteredPartners.length === 0) return Array(7).fill(10);
    const result = Array(7).fill(0);
    filteredPartners.forEach(p => p.velocity.forEach((v, idx) => { result[idx] += v; }));
    const maxVal = Math.max(...result);
    return result.map(v => (v / maxVal) * 100);
  }, [filteredPartners]);

  const columns = [
    { 
      header: 'Partner Identity', 
      accessor: 'name',
      render: (p) => (
        <div>
          <strong style={{ display: 'block', color: 'var(--text)' }}>{p.name}</strong>
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', fontFamily: "var(--materio-space)", }}>{p.id}</span>
        </div>
      )
    },
    { 
      header: 'Classification', 
      accessor: 'type',
      render: (p) => (
        <Badge variant="default" style={{ border: '1.5px solid #25108f' }}>{p.type}</Badge>
      )
    },
    { header: 'Current Balance', accessor: 'balance', render: (p) => <strong style={{ color: 'var(--text)' }}>{formatCurrency(p.balance)}</strong> },
    { header: 'Threshold Limit', accessor: 'threshold', render: (p) => <span style={{ color: 'var(--muted)' }}>{formatCurrency(p.threshold)}</span> },
    { 
      header: 'Operational Status', 
      accessor: 'status',
      render: (p) => (
        <Badge variant={p.status === 'On Track' ? 'success' : p.status === 'Overdue' ? 'danger' : 'warning'}>
          {p.status}
        </Badge>
      )
    }
  ];

  return (
    <AdminShell activeTab="Wallet Management" searchPlaceholder="Search wallets...">
      <div style={{ padding: 'var(--spacing-page) 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        <PageHeader 
          title="Partner Intelligence Hub" 
          subtitle="Manage ISP/BSP balances, monitor liability velocity, and execute batch settlements."
          actions={
            <>
              <Button variant="ghost" icon={Upload} onClick={() => showToast("Upload dialog triggered.")}>Upload</Button>
              <PartnerExportButton onClick={() => setIsExportOpen(true)} label="Export Report" />
            </>
          }
        />

        <PartnerExportModal
          open={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          title="Export Wallet Data"
          description="Choose the file format for exporting wallet balances and settlement summaries."
          onExport={(f) => { setIsExportOpen(false); showToast(`${f} export started.`); }}
          confirmLabel="Generate Export"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-card)' }}>
          <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: 'var(--text-small)', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Liabilities</span>
            <strong style={{ fontSize: '28px', color: 'var(--text)' }}>{formatCurrency(metrics.total)}</strong>
          </Card>
          
          <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--soft)' }}>
            <span style={{ fontSize: 'var(--text-small)', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>Upcoming Batch Settlements</span>
            <strong style={{ fontSize: '28px', color: 'var(--text)' }}>$240,150</strong>
            <Button variant="primary" onClick={handleReviewPayouts} style={{ marginTop: 'auto' }}>Dispatch Queue Verification</Button>
          </Card>

          <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: 'var(--text-small)', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Settlement Velocity Graph</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '60px', gap: '4px', marginTop: 'auto' }}>
              {combinedGraphBars.map((val, i) => (
                <div key={i} style={{ flex: 1, height: '100%', background: 'var(--bg)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${val}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', fontWeight: '800', borderTop: '1.5px solid #25108f', paddingTop: '4px' }}>
              <span>Mon</span><span>Sun</span>
            </div>
          </Card>
        </div>

        <FilterBar 
          searchPlaceholder="Filter secure registry by partner name or ID..."
          onSearch={setSearchQuery}
          onFilterChange={(key, val) => setSelectedType(val)}
          filters={[
            {
              key: 'type',
              label: 'All Classifications',
              options: [{ label: 'ISP', value: 'ISP' }, { label: 'BSP', value: 'BSP' }]
            }
          ]}
        />

        <DataTable 
          columns={columns} 
          data={filteredPartners} 
          onRowClick={(row) => setActiveModalData(row)}
          emptyState="No matching architectural records located."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-card)' }}>
          <StatCard title="Liability Velocity" value="+12.4%" icon={TrendingUp} color="var(--primary)" trendLabel="Structural shift" />
          <StatCard title="Compliance Factor" value="98%" icon={ShieldCheck} color="var(--green)" trendLabel="Active validation" />
          <StatCard title="Overdue Settlements" value={String(metrics.overdueCount).padStart(2, '0')} icon={AlertTriangle} color="var(--red)" trendLabel="Exceeding bounds" />
        </div>

      </div>

      {activeModalData && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.4)', padding: '16px' }}>
          <Card style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1.5px solid #25108f', paddingBottom: '16px' }}>
              <div>
                <Badge variant="info">{activeModalData.type} Node Profile</Badge>
                <h3 style={{ fontSize: '18px', margin: '8px 0 0', color: 'var(--text)' }}>{activeModalData.name}</h3>
              </div>
              <Button variant="ghost" icon={X} onClick={() => setActiveModalData(null)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: 'var(--text-body)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Registry ID</span><strong>{activeModalData.id}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Available Balance</span><strong>{formatCurrency(activeModalData.balance)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Threshold</span><span>{formatCurrency(activeModalData.threshold)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted)' }}>Status</span><Badge variant={activeModalData.status === 'On Track' ? 'success' : 'danger'}>{activeModalData.status}</Badge></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <Button variant="ghost" onClick={() => { showToast(`Audit logs pulled for ${activeModalData.name}`); setActiveModalData(null); }} style={{ background: '#f1f5f9' }}>Audit Stream</Button>
              <Button variant="primary" onClick={() => { showToast(`Settlement initialized for ${activeModalData.name}`); setActiveModalData(null); }}>Settle Node</Button>
            </div>
          </Card>
        </div>
      )}
    </AdminShell>
  );
}

