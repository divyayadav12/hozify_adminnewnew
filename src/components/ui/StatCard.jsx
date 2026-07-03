import React from 'react';
import Card from './Card';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel, 
  color = 'var(--primary)',
  bgColor = '#eff6ff',
  iconColor = '#2563eb',
  className = '',
  ...props
}) {
  const isPositive = trend && trend > 0;
  
  return (
    <Card 
      className={`stat-card ${className}`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        padding: '20px',
        position: 'relative',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        cursor: props.onClick ? 'pointer' : 'default',
        minHeight: '130px'
      }}
      onMouseOver={(e) => {
        if (props.onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,16,143,0.06)';
        }
      }}
      onMouseOut={(e) => {
        if (props.onClick) {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      {...props}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {Icon ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '36px', 
            height: '36px', 
            borderRadius: '8px', 
            background: bgColor, 
            color: iconColor 
          }}>
            <Icon size={20} />
          </div>
        ) : <div />}
        
        {trend && (
          <span style={{ 
            fontSize: '11px', 
            fontWeight: '800', 
            color: isPositive ? '#16a34a' : '#dc2626', 
            background: isPositive ? '#dcfce7' : '#fee2e2', 
            padding: '3px 8px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px' 
          }}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </span>
        <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '4px', fontWeight: '800', lineHeight: 1.1 }}>
          {value}
        </strong>
      </div>
      <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: 'auto' }}>
        <div style={{ width: '100%', height: '100%', background: color || iconColor }} />
      </div>
    </Card>
  );
}
