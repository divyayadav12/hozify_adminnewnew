import React from 'react';

export default function Card({ children, className = '', noPadding = false, style = {}, ...props }) {
  return (
    <div
      className={className}
      style={{
        background: '#fff',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-standard)',
        padding: noPadding ? '0' : '24px',
        border: '1.5px solid #25108f',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

