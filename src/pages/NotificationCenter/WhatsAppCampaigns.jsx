import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Play, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle,
  Download,
  FileText,
  Search,
  Plus,
  Info,
  Check,
  X,
  ArrowLeft
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function WhatsAppCampaigns({ activeTab = 'Notification Center' }) {
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [campaigns, setCampaigns] = useState([
    { id: 'WAC-88219', name: 'Q4 Retention Drive', template: 're_engage_v2', volume: '45,000', status: 'Active', readRate: '92.4%', launchDate: 'Oct 24, 2023', iconType: 'chart' },
    { id: 'WAC-88224', name: 'Flash Sale Alert', template: 'promo_alert_L1', volume: '12,500', status: 'Scheduled', readRate: '—', launchDate: 'Oct 30, 2023', iconType: 'calendar' },
    { id: 'WAC-88210', name: 'Weekly Newsletter', template: 'content_digest', volume: '65,000', status: 'Completed', readRate: '78.1%', launchDate: 'Oct 18, 2023', iconType: 'chart' },
    { id: 'WAC-88195', name: 'Payment Reminder', template: 'bill_reminder', volume: '2,302', status: 'Paused', readRate: '88.9%', launchDate: 'Oct 12, 2023', iconType: 'play' },
    { id: 'WAC-88184', name: 'Welcome Onboarding', template: 'welcome_standard', volume: '18,450', status: 'Completed', readRate: '82.0%', launchDate: 'Oct 05, 2023', iconType: 'chart' },
    { id: 'WAC-88176', name: 'Feedback Survey', template: 'feedback_csat', volume: '9,120', status: 'Completed', readRate: '64.0%', launchDate: 'Sep 28, 2023', iconType: 'chart' }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    template: 're_engage_v2',
    volume: '',
    status: 'Scheduled',
    launchDate: ''
  });

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.volume) return;

    const formattedVolume = Number(newCampaign.volume).toLocaleString();
    const created = {
      id: `WAC-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newCampaign.name,
      template: newCampaign.template,
      volume: formattedVolume,
      status: newCampaign.status,
      readRate: newCampaign.status === 'Active' ? '100.0%' : '—',
      launchDate: newCampaign.launchDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      iconType: newCampaign.status === 'Active' ? 'chart' : 'calendar'
    };

    setCampaigns([created, ...campaigns]);
    setShowNewCampaignModal(false);
    setToastMessage(`Campaign "${newCampaign.name}" created successfully.`);
    setShowToast(true);
    setNewCampaign({ name: '', template: 're_engage_v2', volume: '', status: 'Scheduled', launchDate: '' });
    setCurrentPage(1);
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.template.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / itemsPerPage));
  const displayedCampaigns = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    setToastMessage('Campaign Deleted');
    setShowToast(true);
    if (selectedCampaignId === id) setSelectedCampaignId(null);
    if (displayedCampaigns.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRestart = (id) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Active', iconType: 'chart', readRate: '0.0%' } : c));
    setToastMessage('WhatsApp Campaign Restarted');
    setShowToast(true);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Campaign Name', 'Template', 'Volume', 'Status', 'Read Rate', 'Launch Date'];
    const csvContent = [
      headers.join(','),
      ...filteredCampaigns.map(item => 
        `"${item.id}","${item.name}","${item.template}","${item.volume}","${item.status}","${item.readRate}","${item.launchDate}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'whatsapp_campaigns.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("Exported WhatsApp Campaigns successfully!");
    setShowToast(true);
  };

  const getStats = () => {
    if (selectedCampaignId) {
      const c = campaigns.find(c => c.id === selectedCampaignId);
      if (!c) {
        setSelectedCampaignId(null); // fallback if deleted
        return getAggregateStats(dateFilter);
      }
      const sent = parseInt(c.volume.replace(/,/g, '')) || 0;
      const delivered = Math.floor(sent * 0.98);
      
      return {
        title: `Campaign Details: ${c.name}`,
        subtitle: `ID: ${c.id} | Template: ${c.template} | Launched: ${c.launchDate}`,
        sent: c.volume,
        sentTrend: '—',
        delivered: delivered.toLocaleString(),
        deliveredRate: '98.0%',
        readRate: c.readRate,
        readTrend: '—',
        failedRate: '2.0%',
        failedTrend: '—',
        isDetail: true
      };
    }
    
    return getAggregateStats(dateFilter);
  };

  const getAggregateStats = (filter) => {
    const aggregateData = {
      'Last 30 Days': { sent: '124,802', sentTrend: '↗ +12.4%', delivered: '122,056', deliveredRate: '97.8%', readRate: '84.2%', readTrend: '↗ +2.1%', failedRate: '2.2%', failedTrend: '↘ -0.4%' },
      'Last Quarter': { sent: '452,100', sentTrend: '↗ +8.1%', delivered: '440,000', deliveredRate: '97.3%', readRate: '81.1%', readTrend: '↗ +1.2%', failedRate: '2.7%', failedTrend: '↘ -0.1%' },
      'Year-to-date': { sent: '1,200,450', sentTrend: '↗ +15.2%', delivered: '1,150,000', deliveredRate: '95.8%', readRate: '78.4%', readTrend: '↗ +4.5%', failedRate: '4.2%', failedTrend: '↘ -1.2%' }
    };
    const data = aggregateData[filter] || aggregateData['Last 30 Days'];
    return {
      title: 'WhatsApp Campaigns',
      subtitle: 'Real-time performance metrics for high-conversion messaging outreach.',
      ...data,
      isDetail: false
    };
  };

  const currentStats = getStats();

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="WhatsApp Campaigns"
      searchPlaceholder="Search campaigns or reports..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {currentStats.isDetail && (
                <button 
                  onClick={() => setSelectedCampaignId(null)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: 'var(--muted)', transition: 'all 0.2s' }}
                  title="Back to Overview"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                {currentStats.title}
              </h1>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0', paddingLeft: currentStats.isDetail ? '44px' : '0' }}>
              {currentStats.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Quick date filters */}
            {!currentStats.isDetail && (
              <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: '6px', background: '#fff', padding: '2px', gap: '2px' }}>
                {['Last 30 Days', 'Last Quarter', 'Year-to-date'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setDateFilter(tab); setToastMessage(`Filtered to ${tab}`); setShowToast(true); }}
                    style={{
                      border: 'none',
                      height: '32px',
                      padding: '0 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '750',
                      cursor: 'pointer',
                      background: dateFilter === tab ? 'var(--primary)' : 'transparent',
                      color: dateFilter === tab ? '#fff' : 'var(--muted)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowNewCampaignModal(true)}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} />
              New Campaign
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          
          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px' }}>MESSAGES SENT</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: currentStats.sentTrend.includes('-') ? 'var(--red)' : '#07956f' }}>{currentStats.sentTrend}</span>
            </div>
            <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>{currentStats.sent}</strong>
            <div style={{ height: '3px', background: 'var(--primary)', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px' }}>DELIVERED</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--green)' }}>{currentStats.deliveredRate}</span>
            </div>
            <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>{currentStats.delivered}</strong>
            <div style={{ height: '3px', background: '#07956f', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px' }}>READ RATE</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: currentStats.readTrend.includes('-') ? 'var(--red)' : '#07956f' }}>{currentStats.readTrend}</span>
            </div>
            <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>{currentStats.readRate}</strong>
            <div style={{ height: '3px', background: '#7c3aed', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px' }}>FAILED</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: currentStats.failedTrend.includes('+') ? 'var(--red)' : '#07956f' }}>{currentStats.failedTrend}</span>
            </div>
            <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>{currentStats.failedRate}</strong>
            <div style={{ height: '3px', background: 'var(--red)', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

        </div>

        {/* Table Panel */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Campaign Directory</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Filter campaigns..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    height: '32px',
                    padding: '0 10px 0 30px',
                    fontSize: '12px',
                    width: '180px',
                    background: '#fff'
                  }}
                />
              </div>
              <button 
                onClick={handleExportCSV}
                title="Export Data"
                style={{ height: '32px', width: '32px', border: '1px solid var(--line)', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--soft)'}
                onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
              >
                <Download size={14} style={{ color: 'var(--muted)' }} />
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1px solid var(--line)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Campaign Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Template</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Volume</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Read Rate</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Launch Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--muted)', fontWeight: '600' }}>No campaigns found.</td>
                  </tr>
                ) : (
                  displayedCampaigns.map((c, i) => (
                    <tr 
                      key={c.id} 
                      style={{ borderBottom: '1px solid var(--lavender)', background: selectedCampaignId === c.id ? 'var(--soft)' : 'transparent', transition: 'background 0.2s' }}
                    >
                      <td style={{ padding: '16px' }}>
                        <strong style={{ display: 'block', fontWeight: '800', color: 'var(--text)' }}>{c.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: {c.id}</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '11.5px',
                          fontWeight: '750',
                          color: 'var(--primary)',
                          background: '#f4eff8',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--lavender)',
                          fontFamily: "var(--materio-space)",
                        }}>
                          {c.template}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '750', color: 'var(--text)' }}>{c.volume}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '850',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: c.status === 'Active' ? '#ecfdf5' : c.status === 'Scheduled' ? '#eff6ff' : c.status === 'Completed' ? '#f1f5f9' : '#fffbeb',
                          color: c.status === 'Active' ? '#07956f' : c.status === 'Scheduled' ? 'var(--primary)' : c.status === 'Completed' ? 'var(--muted)' : '#b45309'
                        }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '750', color: 'var(--text)' }}>{c.readRate}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)' }}>{c.launchDate}</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
                          <button
                            onClick={() => setSelectedCampaignId(c.id)}
                            title="View Metrics"
                            style={{
                              border: 'none',
                              background: selectedCampaignId === c.id ? 'var(--primary)' : 'transparent',
                              cursor: 'pointer',
                              color: selectedCampaignId === c.id ? '#fff' : 'var(--primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '28px',
                              width: '28px',
                              borderRadius: '4px',
                              transition: 'all 0.2s'
                            }}
                          >
                            {c.iconType === 'chart' ? (
                              <BarChart3 size={15} />
                            ) : c.iconType === 'calendar' ? (
                              <Calendar size={15} />
                            ) : (
                              <Play size={15} />
                            )}
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === c.id ? null : c.id); }}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', height: '28px', width: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openDropdownId === c.id && (
                            <div style={{ position: 'absolute', right: '40px', top: '16px', width: '140px', background: '#fff', border: '1px solid var(--line)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 50, padding: '4px 0', textAlign: 'left' }}>
                              <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); setSelectedCampaignId(c.id); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--text)' }}>View Details</button>
                              <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleRestart(c.id); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--green)' }}>Restart</button>
                              <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); handleDelete(c.id); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#e11d48' }}>Delete</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table></div>
          </div>

          {/* Table Footer / Pagination */}
          {filteredCampaigns.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
              </span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{ border: 'none', background: 'transparent', color: currentPage === 1 ? 'var(--lavender)' : 'var(--muted)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: '12.5px', fontWeight: '750', color: 'var(--text)' }}>Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{ border: 'none', background: 'transparent', color: currentPage === totalPages ? 'var(--lavender)' : 'var(--muted)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Analytics block */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Messaging Trend Custom Area Chart */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Messaging Trend</h2>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  Sent
                </span>
                <span style={{ fontSize: '11px', fontWeight: '750', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#07956f' }} />
                  Read
                </span>
              </div>
            </div>

            {/* Custom Area Chart Canvas */}
            <div style={{ height: '220px', position: 'relative', border: '1px solid var(--lavender)', borderRadius: '6px', background: '#fcfbfe', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
              <svg style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="gradientSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="gradientRead" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#07956f" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#07956f" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="var(--lavender)" strokeDasharray="3" />
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="var(--lavender)" strokeDasharray="3" />
                <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="var(--lavender)" strokeDasharray="3" />

                {/* Sent Area & Line */}
                <path
                  d="M 0 170 Q 150 160 300 110 T 600 120 T 900 150 L 900 220 L 0 220 Z"
                  fill="url(#gradientSent)"
                />
                <path
                  d="M 0 170 Q 150 160 300 110 T 600 120 T 900 150"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Read Area & Line */}
                <path
                  d="M 0 180 Q 150 170 300 130 T 600 135 T 900 165 L 900 220 L 0 220 Z"
                  fill="url(#gradientRead)"
                />
                <path
                  d="M 0 180 Q 150 170 300 130 T 600 135 T 900 165"
                  fill="none"
                  stroke="#07956f"
                  strokeWidth="2.5"
                />
              </svg>

              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '11px',
                fontWeight: '800',
                color: 'var(--muted)',
                letterSpacing: '0.5px'
              }}>
                {selectedCampaignId ? `Detailed Activity Matrix for Campaign` : `Last 30 Days Activity Matrix`}
              </div>
            </div>

          </div>

          {/* Top Templates List */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Top Templates</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--muted)', marginRight: '6px' }}>01</span>
                    Order_Update_Gold
                  </span>
                  <span style={{ color: 'var(--green)', fontWeight: '850' }}>98% Read</span>
                </div>
                <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--primary)', height: '100%', width: '98%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--muted)', marginRight: '6px' }}>02</span>
                    Welcome_Standard
                  </span>
                  <span style={{ color: 'var(--muted)' }}>82% Read</span>
                </div>
                <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--primary)', height: '100%', width: '82%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--muted)', marginRight: '6px' }}>03</span>
                    Feedback_CSAT
                  </span>
                  <span style={{ color: 'var(--muted)' }}>64% Read</span>
                </div>
                <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--primary)', height: '100%', width: '64%' }} />
                </div>
              </div>

            </div>

            <button
              onClick={() => { setToastMessage("Redirecting to all templates center..."); setShowToast(true); }}
              style={{
                width: '100%',
                height: '38px',
                border: '1px solid var(--line)',
                background: '#fff',
                color: 'var(--text)',
                fontSize: '12.5px',
                fontWeight: '750',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--soft)'}
              onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
            >
              View All Templates
            </button>
          </div>

        </div>

      </div>

      {/* Floating Refresh Alert Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#111827',
          color: '#fff',
          padding: '12px 18px',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 10000,
          animation: 'fadeInUp 0.2s ease-out'
        }}>
          <div style={{ height: '18px', width: '18px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={12} style={{ color: '#fff' }} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              marginLeft: '8px'
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* New Campaign Creation Modal */}
      {showNewCampaignModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(17, 12, 60, 0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            border: '1px solid var(--line)',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 8px 24px rgba(17, 12, 60, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Create WhatsApp Campaign</h3>
              <button onClick={() => setShowNewCampaignModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Flash Sale Alert"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Select Template</label>
                <select
                  value={newCampaign.template}
                  onChange={(e) => setNewCampaign({ ...newCampaign, template: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px',
                    background: '#fff',
                    fontFamily: "var(--materio-space)",
                  }}
                >
                  <option value="re_engage_v2">re_engage_v2</option>
                  <option value="promo_alert_L1">promo_alert_L1</option>
                  <option value="content_digest">content_digest</option>
                  <option value="bill_reminder">bill_reminder</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Estimated Target Volume</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 50000"
                  value={newCampaign.volume}
                  onChange={(e) => setNewCampaign({ ...newCampaign, volume: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Launch Type</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      checked={newCampaign.status === 'Active'}
                      onChange={() => setNewCampaign({ ...newCampaign, status: 'Active' })}
                    />
                    Launch Instantly
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      checked={newCampaign.status === 'Scheduled'}
                      onChange={() => setNewCampaign({ ...newCampaign, status: 'Scheduled' })}
                    />
                    Schedule for later
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: '1px solid var(--line)',
                    background: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750',
                    cursor: 'pointer'
                  }}
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
