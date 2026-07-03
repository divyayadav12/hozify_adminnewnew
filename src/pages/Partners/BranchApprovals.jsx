import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { Check, XCircle, MapPin, Building2, Map, ShieldCheck, CheckCircle2 } from "lucide-react";

// Global Unified Components
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import FilterBar from '../../components/ui/FilterBar';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function BranchApprovals() {
  const [branches, setBranches] = useState([
    { id: "BRH-4401", branchName: "Indore South Hub", city: "Indore, MP", manager: "Aman Verma", capacity: "150+ Partners/Day", status: "Pending", zone: "Tier-2 Operational" },
    { id: "BRH-9022", branchName: "Bengaluru East (HSR)", city: "Bengaluru, KA", manager: "Megha Hegde", capacity: "500+ Partners/Day", status: "Pending", zone: "Tier-1 Metro" },
    { id: "BRH-1105", branchName: "Noida Sector 62 Center", city: "Delhi NCR", manager: "Vikram Malhotra", capacity: "300+ Partners/Day", status: "Approved", zone: "Tier-1 Metro" },
    { id: "BRH-3312", branchName: "Patna Central Training Hub", city: "Patna, Bihar", manager: "Rajesh Mishra", capacity: "100+ Partners/Day", status: "Rejected", zone: "Tier-3 Onboarding" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("");

  const uniqueZones = useMemo(() => {
    return [...new Set(branches.map(b => b.zone))];
  }, [branches]);

  const handleStatusChange = (id, newStatus) => {
    setBranches(prev => prev.map(branch => branch.id === id ? { ...branch, status: newStatus } : branch));
  };

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch = branch.branchName.toLowerCase().includes(searchQuery.toLowerCase()) || branch.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesZone = !selectedZone || branch.zone === selectedZone;
      return matchesSearch && matchesZone;
    });
  }, [branches, searchQuery, selectedZone]);

  const columns = [
    { 
      header: 'Branch / Hub Details', 
      accessor: 'branchName',
      render: (b) => (
        <div>
          <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)' }}>
            <MapPin size={14} style={{ color: 'var(--primary)' }} /> {b.branchName}
          </strong>
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)', display: 'block', paddingLeft: '20px' }}>
            {b.id} • {b.city}
          </span>
        </div>
      )
    },
    { header: 'Territory Zone', accessor: 'zone' },
    { header: 'Regional Manager', accessor: 'manager', render: (b) => <strong style={{color: 'var(--text)'}}>{b.manager}</strong> },
    { header: 'Max Capacity', accessor: 'capacity' },
    { 
      header: 'Approval Status', 
      accessor: 'status',
      render: (b) => (
        <Badge variant={b.status === 'Approved' ? 'success' : b.status === 'Rejected' ? 'danger' : 'warning'}>
          {b.status}
        </Badge>
      )
    }
  ];

  const actions = (b) => {
    if (b.status === "Pending") {
      return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="primary" icon={Check} onClick={(e) => { e.stopPropagation(); handleStatusChange(b.id, "Approved"); }}>Approve</Button>
          <Button variant="ghost" icon={XCircle} onClick={(e) => { e.stopPropagation(); handleStatusChange(b.id, "Rejected"); }}>Reject</Button>
        </div>
      );
    }
    return null;
  };

  return (
    <AdminShell activeTab="Approvals" searchPlaceholder="Search by branch name, city, or manager...">
      <div style={{ padding: 'var(--spacing-page) 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        <PageHeader 
          title="Branch Expansion Approvals" 
          subtitle="Review setup audits, operational capacity, and activate regional training hubs or partner onboarding offices."
          actions={
            <Badge variant="info" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <Building2 size={14} /> Geo-Expansion Active
            </Badge>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-card)' }}>
          <StatCard 
            title="Awaiting Launch" 
            value={`${String(branches.filter(b => b.status === "Pending").length).padStart(2, '0')} Branches`} 
            trendLabel="Ready for Live Sign-off"
            icon={Map}
            color="var(--primary)"
          />
          <StatCard 
            title="Active Hubs" 
            value={`${branches.filter(b => b.status === "Approved").length + 41} Locations`} 
            trendLabel="Covering Regional Zones"
            icon={CheckCircle2}
            color="var(--green)"
          />
          <StatCard 
            title="Audits Rejected" 
            value={`${String(branches.filter(b => b.status === "Rejected").length).padStart(2, '0')} Sites`} 
            trendLabel="Safety Deficit Flagged"
            icon={XCircle}
            color="var(--red)"
          />
        </div>

        <FilterBar 
          searchPlaceholder="Filter by branch, manager, or ID..."
          onSearch={setSearchQuery}
          onFilterChange={(key, val) => setSelectedZone(val)}
          filters={[
            {
              key: 'zone',
              label: 'All Territories',
              options: uniqueZones.map(z => ({ label: z, value: z }))
            }
          ]}
        />

        <DataTable 
          columns={columns} 
          data={filteredBranches} 
          actions={actions}
          emptyState="No branch expansion requests found."
        />
        
      </div>
    </AdminShell>
  );
}