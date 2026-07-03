import React from 'react';

export default function Badge({ children, variant = 'default', className = '', ...props }) {
  const variants = {
    default: { background: '#f1f5f9', color: '#475569' },
    success: { background: 'rgba(7, 149, 111, 0.1)', color: 'var(--green)' }, // Approved, Active
    warning: { background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' },     // Pending
    danger: { background: 'rgba(211, 41, 41, 0.1)', color: 'var(--red)' },    // Rejected, Inactive
    info: { background: 'rgba(37, 16, 143, 0.1)', color: 'var(--primary)' }
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 'var(--radius-badge)',
        fontSize: 'var(--text-small)',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        ...variants[variant]
      }}
      {...props}
    >
      {children}
    </span>
  );
}
