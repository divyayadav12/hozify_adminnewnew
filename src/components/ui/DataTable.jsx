import React from 'react';

export default function DataTable({ columns, data, className = '', onRowClick, actions, emptyState }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`} style={{ 
      background: '#fff', 
      borderRadius: 'var(--radius-table)', 
      boxShadow: 'var(--shadow-standard)',
      border: '1px solid var(--line)'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--line)' }}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{
                padding: '16px 24px',
                fontSize: 'var(--text-label)',
                fontWeight: '600',
                color: '#64748b',
                whiteSpace: 'nowrap'
              }}>
                {col.header}
              </th>
            ))}
            {actions && (
              <th style={{ padding: '16px 24px', fontSize: 'var(--text-label)', fontWeight: '600', color: '#64748b', textAlign: 'right' }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} style={{ padding: '48px', textAlign: 'center' }}>
                {emptyState || <span style={{ color: 'var(--muted)' }}>No data available</span>}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                style={{ 
                  borderBottom: rowIndex !== data.length - 1 ? '1px solid #e2e8f0' : 'none',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 150ms ease'
                }}
                onMouseEnter={(e) => {
                  if (onRowClick) e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (onRowClick) e.currentTarget.style.background = 'transparent';
                }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '16px 24px', fontSize: 'var(--text-body)', color: 'var(--text)' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {actions && (
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
