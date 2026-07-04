import React from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

export default function FilterBar({ 
  onSearch, 
  searchPlaceholder = "Search...", 
  filters = [], 
  onFilterChange,
  onReset,
  onApply
}) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'center',
      background: '#fff',
      padding: '16px',
      borderRadius: 'var(--radius-card)',
      border: '1.5px solid #25108f',
      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      marginBottom: 'var(--spacing-section)'
    }}>
      <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
        <input 
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          style={{
            width: '100%',
            height: '40px',
            padding: '0 16px 0 36px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid #cbd5e1',
            fontSize: 'var(--text-body)',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
        />
      </div>

      {filters.map((filter, index) => (
        <select
          key={index}
          onChange={(e) => onFilterChange && onFilterChange(filter.key, e.target.value)}
          style={{
            height: '40px',
            padding: '0 32px 0 16px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid #cbd5e1',
            fontSize: 'var(--text-body)',
            backgroundColor: '#fff',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ))}

      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
        {onReset && <Button variant="ghost" onClick={onReset}>Reset</Button>}
        {onApply && <Button variant="primary" onClick={onApply}>Apply Filters</Button>}
      </div>
    </div>
  );
}


