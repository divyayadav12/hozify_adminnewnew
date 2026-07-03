import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  isLoading, 
  disabled, 
  className = '', 
  ...props 
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-btn)',
    fontWeight: '600',
    fontSize: 'var(--text-body)',
    transition: 'var(--transition-standard)',
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.7 : 1,
  };

  const variants = {
    primary: {
      background: 'var(--primary)',
      color: '#fff',
    },
    secondary: {
      background: 'var(--soft)',
      color: 'var(--primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--muted)',
    },
    danger: {
      background: 'var(--red)',
      color: '#fff',
    }
  };

  const sizes = {
    sm: { height: '32px', padding: '0 12px', fontSize: 'var(--text-small)' },
    md: { height: '40px', padding: '0 16px' },
    lg: { height: '48px', padding: '0 24px', fontSize: '15px' },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size]
  };

  return (
    <button style={combinedStyles} disabled={disabled || isLoading} className={className} {...props}>
      {isLoading ? (
        <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'inherit', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
    </button>
  );
}
