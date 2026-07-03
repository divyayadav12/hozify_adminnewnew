import React from 'react';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 'var(--spacing-section)'
    }}>
      <div>
        <h1 style={{ 
          fontSize: 'var(--text-title-page)', 
          fontWeight: '800', 
          color: 'var(--text)', 
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em'
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ 
            fontSize: 'var(--text-body)', 
            color: 'var(--muted)', 
            margin: 0,
            maxWidth: '600px',
            lineHeight: 1.5
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: 'var(--spacing-btn, 12px)', alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
}
