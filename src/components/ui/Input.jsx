import React from 'react';

export default function Input({ label, error, helperText, className = '', containerStyle = {}, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...containerStyle }} className={className}>
      {label && (
        <label style={{ fontSize: 'var(--text-label)', fontWeight: '600', color: '#334155' }}>
          {label}
        </label>
      )}
      <input
        style={{
          height: '40px',
          padding: '0 12px',
          border: `1px solid ${error ? 'var(--red)' : '#cbd5e1'}`,
          borderRadius: 'var(--radius-input)',
          fontSize: 'var(--text-body)',
          color: 'var(--text)',
          outline: 'none',
          transition: 'border-color 200ms ease',
          backgroundColor: '#fff',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)'
        }}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = 'var(--primary)';
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = '#cbd5e1';
        }}
        {...props}
      />
      {error ? (
        <span style={{ fontSize: 'var(--text-small)', color: 'var(--red)' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: 'var(--text-small)', color: 'var(--muted)' }}>{helperText}</span>
      ) : null}
    </div>
  );
}
