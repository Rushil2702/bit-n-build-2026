import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  action,
  icon: Icon,
  aiGlow = false,
  className = '',
  style = {},
  noPadding = false,
}) {
  return (
    <div
      className={`clubops-card ${aiGlow ? 'clubops-card-ai' : ''} ${className}`}
      style={{
        background: aiGlow ? 'var(--bg-card-ai)' : 'var(--bg-card)',
        border: aiGlow ? '1px solid var(--color-ai-border)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg, 10px)',
        boxShadow: aiGlow ? 'var(--shadow-ai-glow)' : 'var(--shadow-card)',
        overflow: 'hidden',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast)',
        ...style,
      }}
    >
      {(title || subtitle || action || Icon) && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {Icon && (
              <div
                style={{
                  color: aiGlow ? 'var(--color-ai)' : 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Icon size={18} />
              </div>
            )}
            <div>
              {title && (
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'var(--text-heading)',
                    lineHeight: '1.2',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div style={{ display: 'flex', alignItems: 'center' }}>{action}</div>}
        </div>
      )}
      <div style={{ padding: noPadding ? '0' : '20px' }}>{children}</div>
    </div>
  );
}
