import React from 'react';

export default function ProgressBar({
  percentage = 0,
  color = 'var(--color-primary)',
  height = 8,
  showLabel = false,
  labelPrefix = '',
  className = '',
  style = {},
}) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`clubops-progress-container ${className}`} style={{ width: '100%', ...style }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
            fontSize: '12px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>{labelPrefix}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{clamped}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${height}px`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: `${height}px`,
            transition: 'width 400ms ease-out',
          }}
        />
      </div>
    </div>
  );
}
