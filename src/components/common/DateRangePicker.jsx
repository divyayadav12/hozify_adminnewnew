import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { addDays, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay, subMonths, isSameDay } from 'date-fns';

// Custom defined ranges for the side panel
const customStaticRanges = [
  { label: 'Today', range: () => ({ startDate: startOfDay(new Date()), endDate: endOfDay(new Date()) }) },
  { label: 'Yesterday', range: () => ({ startDate: startOfDay(subDays(new Date(), 1)), endDate: endOfDay(subDays(new Date(), 1)) }) },
  { label: 'Last 7 Days', range: () => ({ startDate: startOfDay(subDays(new Date(), 6)), endDate: endOfDay(new Date()) }) },
  { label: 'Last 30 Days', range: () => ({ startDate: startOfDay(subDays(new Date(), 29)), endDate: endOfDay(new Date()) }) },
  { label: 'This Month', range: () => ({ startDate: startOfMonth(new Date()), endDate: endOfMonth(new Date()) }) },
  { label: 'Previous Month', range: () => ({ startDate: startOfMonth(subMonths(new Date(), 1)), endDate: endOfMonth(subMonths(new Date(), 1)) }) }
];

// Format date to e.g., "Oct 24 - Oct 30"
const formatRange = (start, end) => {
  if (!start || !end) return 'Select Date';
  
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  const startStr = formatter.format(start);
  const endStr = formatter.format(end);
  
  if (isSameDay(start, end)) return startStr;
  return `${startStr} - ${endStr}`;
};

// Returns yyyy-mm-dd for the native date input
const toInputDate = (dateObj) => {
  if (!dateObj) return '';
  const d = new Date(dateObj);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split('T')[0];
};

export default function DateRangePicker({ 
  value, 
  onChange, 
  className,
  style,
  buttonContent,
  align = 'left', // Allows changing the dropdown alignment
  compact = false // When true, skips presets
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customView, setCustomView] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 6),
    endDate: new Date()
  });
  const ref = useRef(null);

  // Sync internal state if value prop is provided (controlled component)
  useEffect(() => {
    if (value && value.startDate && value.endDate) {
      setDateRange({ startDate: value.startDate, endDate: value.endDate });
    }
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleSelect = (start, end) => {
    setDateRange({ startDate: start, endDate: end });
    if (onChange) {
      onChange({
        startDate: start,
        endDate: end,
        label: formatRange(start, end)
      });
    }
    setIsOpen(false);
  };

  const currentLabel = formatRange(dateRange.startDate, dateRange.endDate);

  return (
    <div className={`relative ${className || ''}`} ref={ref} style={style}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {buttonContent ? (
          buttonContent(currentLabel)
        ) : (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid #25108f',
              background: '#fff',
              padding: '7px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '750',
              cursor: 'pointer'
            }}
            type="button"
          >
            <Calendar size={14} style={{ color: 'var(--muted)' }} />
            <span>{currentLabel}</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          ...(align === 'right' ? { right: 0 } : { left: 0 }),
          zIndex: 99999,
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          width: '260px'
        }}>
          {!compact && (
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px', borderBottom: customView ? '1px solid #e2e8f0' : 'none' }}>
              {customStaticRanges.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => { const r = preset.range(); handleSelect(r.startDate, r.endDate); }}
                  style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '6px', background: 'transparent', border: 'none', fontSize: '13px', fontWeight: '600', color: 'var(--text)', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {preset.label}
                </button>
              ))}
              <button
                onClick={() => setCustomView(!customView)}
                style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '6px', background: customView ? '#eef2ff' : 'transparent', border: 'none', fontSize: '13px', fontWeight: '600', color: customView ? '#4f46e5' : 'var(--text)', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                Custom Range...
              </button>
            </div>
          )}
          
          {(compact || customView) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: '#f8fafc' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Start Date</label>
                <input
                  type="date"
                  value={toInputDate(dateRange.startDate)}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDateRange({ ...dateRange, startDate: startOfDay(new Date(e.target.value)) });
                    }
                  }}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>End Date</label>
                <input
                  type="date"
                  value={toInputDate(dateRange.endDate)}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDateRange({ ...dateRange, endDate: endOfDay(new Date(e.target.value)) });
                    }
                  }}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                />
              </div>
              <button
                onClick={() => handleSelect(dateRange.startDate, dateRange.endDate)}
                style={{ padding: '8px 16px', marginTop: '8px', borderRadius: '6px', border: 'none', background: '#25108f', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Apply Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
