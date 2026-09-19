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
          background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
          color: '#ffffff',
          border: '1px solid rgba(167, 139, 250, 0.4)',
          hoverBg: '#6d28d9',
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
          hoverBg: 'rgba(255, 255, 255, 0.05)',
        };
      case 'danger':
        return {
          background: 'var(--color-danger)',
          color: '#ffffff',
          border: '1px solid var(--color-danger)',
          hoverBg: '#dc2626',
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
          padding: '5px 10px',
          fontSize: '12px',
          iconSize: 14,
          gap: '6px',
        };
      case 'lg':
        return {
          padding: '10px 18px',
          fontSize: '14px',
          iconSize: 18,
          gap: '8px',
        };
      case 'md':
      default:
        return {
          padding: '7px 14px',
          fontSize: '13px',
          iconSize: 16,
          gap: '8px',
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
        fontSize: currentSize.fontSize,
        fontWeight: '500',
        borderRadius: '7px',
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
