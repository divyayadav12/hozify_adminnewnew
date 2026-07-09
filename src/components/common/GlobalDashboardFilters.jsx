import React, { useState } from 'react';
import { ChevronDown, Calendar, MapPin, Building, Wrench, Users } from 'lucide-react';

export default function GlobalDashboardFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    city: 'All Cities',
    district: 'All Districts',
    service: 'All Services',
    partner: 'All Partners',
    timeframe: 'Daily'
  });

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2035 - 2026 + 1 }, (_, i) => 2026 + i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const selectStyle = {
    padding: '8px 12px',
    paddingRight: '32px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '130px',
  };

  const wrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const iconStyle = {
    position: 'absolute',
    right: '10px',
    color: '#94a3b8',
    pointerEvents: 'none'
  };
  
  const leftIconStyle = {
    position: 'absolute',
    left: '10px',
    color: '#64748b',
    pointerEvents: 'none'
  };

  const getSelectStyleWithIcon = () => ({
    ...selectStyle,
    paddingLeft: '32px'
  });

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '12px 16px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '20px',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
        <strong style={{ fontSize: '13px', color: '#1e293b' }}>Filters:</strong>
      </div>

      <div style={wrapperStyle}>
        <MapPin size={14} style={leftIconStyle} />
        <select 
          style={getSelectStyleWithIcon()}
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
        >
          <option value="All Cities">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
        <ChevronDown size={14} style={iconStyle} />
      </div>

      <div style={wrapperStyle}>
        <Building size={14} style={leftIconStyle} />
        <select 
          style={getSelectStyleWithIcon()}
          value={filters.district}
          onChange={(e) => updateFilter('district', e.target.value)}
        >
          <option value="All Districts">All Districts</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 3">District 3</option>
        </select>
        <ChevronDown size={14} style={iconStyle} />
      </div>

      <div style={wrapperStyle}>
        <Wrench size={14} style={leftIconStyle} />
        <select 
          style={getSelectStyleWithIcon()}
          value={filters.service}
          onChange={(e) => updateFilter('service', e.target.value)}
        >
          <option value="All Services">All Services</option>
          <option value="AC Repair">AC Repair</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Painting">Painting</option>
        </select>
        <ChevronDown size={14} style={iconStyle} />
      </div>

      <div style={wrapperStyle}>
        <Users size={14} style={leftIconStyle} />
        <select 
          style={getSelectStyleWithIcon()}
          value={filters.partner}
          onChange={(e) => updateFilter('partner', e.target.value)}
        >
          <option value="All Partners">Partner Wise</option>
          <option value="Partner A">Partner A</option>
          <option value="Partner B">Partner B</option>
        </select>
        <ChevronDown size={14} style={iconStyle} />
      </div>

      <div style={wrapperStyle}>
        <Calendar size={14} style={leftIconStyle} />
        <select 
          style={getSelectStyleWithIcon()}
          value={filters.timeframe}
          onChange={(e) => updateFilter('timeframe', e.target.value)}
        >
          <optgroup label="Preset">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </optgroup>
          <optgroup label="Monthly">
            {months.map(m => (
              <option key={m} value={`Month: ${m}`}>Monthly ({m})</option>
            ))}
          </optgroup>
          <optgroup label="Yearly">
            {years.map(y => (
              <option key={y} value={`Year: ${y}`}>Yearly ({y})</option>
            ))}
          </optgroup>
        </select>
        <ChevronDown size={14} style={iconStyle} />
      </div>
    </div>
  );
}
