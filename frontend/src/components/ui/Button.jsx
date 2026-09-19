import React from 'react';

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  style = {},
  type = 'button',
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--color-primary)',
          color: '#ffffff',
          border: '1px solid var(--color-primary)',
          hoverBg: 'var(--color-primary-hover)',
        };
      case 'ai':
        return {
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #991b1b 100%)',
          color: '#ffffff',
          border: '1px solid var(--color-primary-border)',
          hoverBg: 'var(--color-primary-hover)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-default)',
          hoverBg: 'var(--bg-card-hover)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent',
          hoverBg: 'var(--bg-hover-subtle)',
        };
      case 'danger':
        return {
          background: 'var(--color-danger)',
          color: '#ffffff',
          border: '1px solid var(--color-danger)',
          hoverBg: 'var(--color-danger-hover)',
        };
      case 'secondary':
      default:
        return {
          background: 'var(--bg-card-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-default)',
          hoverBg: 'var(--border-hover)',
        };
    }
  };

  const currentVariant = getVariantStyles();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '4px 10px',
          fontSize: '12px',
          iconSize: 14,
          gap: '6px',
          height: '30px',
        };
      case 'lg':
        return {
          padding: '10px 18px',
          fontSize: '14px',
          iconSize: 18,
          gap: '8px',
          height: '42px',
        };
      case 'md':
      default:
        return {
          padding: '6px 14px',
          fontSize: '13px',
          iconSize: 16,
          gap: '8px',
          height: '36px',
        };
    }
  };

  const currentSize = getSizeStyles();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`clubops-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: currentSize.gap,
        padding: currentSize.padding,
        minHeight: currentSize.height,
        fontSize: currentSize.fontSize,
        fontWeight: '500',
        borderRadius: 'var(--radius-sm, 6px)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--transition-fast)',
        backgroundColor: currentVariant.background,
        color: currentVariant.color,
        border: currentVariant.border,
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && currentVariant.hoverBg) {
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.filter = 'none';
        }
      }}
    >
      {Icon && iconPosition === 'left' && <Icon size={currentSize.iconSize} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={currentSize.iconSize} />}
    </button>
  );
}
