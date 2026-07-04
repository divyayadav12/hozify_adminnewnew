import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { DateRangePicker as RDRDateRangePicker, createStaticRanges } from 'react-date-range';
import { addDays, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay, subMonths, isSameDay } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Custom defined ranges for the side panel
const customStaticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({ startDate: startOfDay(new Date()), endDate: endOfDay(new Date()) })
  },
  {
    label: 'Yesterday',
    range: () => ({ startDate: startOfDay(subDays(new Date(), 1)), endDate: endOfDay(subDays(new Date(), 1)) })
  },
  {
    label: 'Last 7 Days',
    range: () => ({ startDate: startOfDay(subDays(new Date(), 6)), endDate: endOfDay(new Date()) })
  },
  {
    label: 'Last 30 Days',
    range: () => ({ startDate: startOfDay(subDays(new Date(), 29)), endDate: endOfDay(new Date()) })
  },
  {
    label: 'This Month',
    range: () => ({ startDate: startOfMonth(new Date()), endDate: endOfMonth(new Date()) })
  },
  {
    label: 'Previous Month',
    range: () => ({ startDate: startOfMonth(subMonths(new Date(), 1)), endDate: endOfMonth(subMonths(new Date(), 1)) })
  }
]);

// Format date to e.g., "Oct 24 - Oct 30"
const formatRange = (start, end) => {
  if (!start || !end) return 'Select Date';
  
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  const startStr = formatter.format(start);
  const endStr = formatter.format(end);
  
  if (isSameDay(start, end)) return startStr;
  return `${startStr} - ${endStr}`;
};

export default function DateRangePicker({ 
  value, 
  onChange, 
  className,
  style,
  buttonContent // Allows overriding the internal button content
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [clickCount, setClickCount] = useState(0);

  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const ref = useRef(null);

  // Sync internal state if value prop is provided (controlled component)
  useEffect(() => {
    if (value && value.startDate && value.endDate) {
      setDateRange([{ ...value, key: 'selection' }]);
    }
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handler);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelect = (ranges) => {
    const selection = ranges.selection;
    setDateRange([selection]);
    
    if (onChange) {
      onChange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        label: formatRange(selection.startDate, selection.endDate)
      });
    }

    // Auto-close logic
    const isPreset = customStaticRanges.some(preset => {
      const pRange = preset.range();
      return isSameDay(pRange.startDate, selection.startDate) && isSameDay(pRange.endDate, selection.endDate);
    });

    if (isPreset) {
      setIsOpen(false);
      setClickCount(0);
    } else {
      // It's a custom date selection from the calendar
      if (selection.startDate !== selection.endDate) {
        // Range selected
        setTimeout(() => {
          setIsOpen(false);
          setClickCount(0);
        }, 150);
      } else {
        // Either first click or single day selection
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 2) {
          // Second click on the same day means they want a 1-day range
          setTimeout(() => {
            setIsOpen(false);
            setClickCount(0);
          }, 150);
        }
      }
    }
  };

  const currentLabel = formatRange(dateRange[0].startDate, dateRange[0].endDate);
  
  const isMobile = windowWidth < 768;

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
          right: 0,
          zIndex: 1000,
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '90vw'
        }}>
          <div style={{ overflowX: 'auto', display: 'flex' }}>
            <RDRDateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={isMobile ? 1 : 2}
              ranges={dateRange}
              direction="horizontal"
              rangeColors={['#25108f']} // The application's primary purple
              staticRanges={customStaticRanges}
              inputRanges={[]} // Disable the "days up to today" input boxes
            />
          </div>
        </div>
      )}
      
      {/* Global overrides for react-date-range aesthetics */}
      <style dangerouslySetInnerHTML={{__html: `
        .rdrDateRangePickerWrapper {
          font-family: inherit;
        }
        .rdrDefinedRangesWrapper {
          border-right: 1.5px solid #25108f !important;
          background: #f9f8fa;
        }
        .rdrStaticRange {
          border-bottom: 1.5px solid #25108f !important;
          background: #f9f8fa !important;
        }
        .rdrStaticRange:hover .rdrStaticRangeLabel, .rdrStaticRange:focus .rdrStaticRangeLabel {
          background: #f4eff8 !important;
          color: #25108f !important;
        }
        .rdrStaticRangeSelected {
          color: #25108f !important;
          font-weight: bold;
        }
        .rdrStaticRangeLabel {
          padding: 10px 20px !important;
          color: var(--text) !important;
        }
        .rdrDayToday .rdrDayNumber span:after {
          background: #25108f !important;
        }
        .rdrDayHovered {
          border-color: #25108f !important;
        }
        @media (max-width: 768px) {
          .rdrDateRangePickerWrapper {
            flex-direction: column !important;
          }
          .rdrDefinedRangesWrapper {
            border-right: none !important;
            border-bottom: 1.5px solid #25108f !important;
            width: 100% !important;
          }
        }
      `}} />
    </div>
  );
}


