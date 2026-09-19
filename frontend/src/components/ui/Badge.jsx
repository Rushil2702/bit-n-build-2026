import React from 'react';

const variantStyles = {
  success: {
    bg: 'var(--color-success-bg)',
    color: 'var(--color-success)',
    border: 'var(--color-success-border)',
  },
  warning: {
    bg: 'var(--color-warning-bg)',
    color: 'var(--color-warning)',
    border: 'var(--color-warning-border)',
  },
  danger: {
    bg: 'var(--color-danger-bg)',
    color: 'var(--color-danger)',
    border: 'var(--color-danger-border)',
  },
  info: {
    bg: 'var(--color-info-bg)',
    color: 'var(--color-info)',
    border: 'var(--color-info-border)',
  },
  ai: {
    bg: 'var(--color-ai-light)',
    color: 'var(--color-ai)',
    border: 'var(--color-ai-border)',
  },
  neutral: {
    bg: 'var(--bg-badge-neutral)',
    color: 'var(--text-badge-neutral)',
    border: 'var(--border-badge-neutral)',
  },
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  style = {},
  className = '',
}) {
  const current = variantStyles[variant] || variantStyles.neutral;
  const isSm = size === 'sm';

  return (
    <span
      className={`clubops-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: isSm ? '2px 7px' : '3px 10px',
        borderRadius: '9999px',
        fontSize: isSm ? '11px' : '12px',
        fontWeight: '500',
        lineHeight: '1',
        backgroundColor: current.bg,
        color: current.color,
        border: `1px solid ${current.border}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.color,
            display: 'inline-block',
          }}
        />
      )}
      {children}
    </span>
  );
}
