import { useEffect, useRef } from 'react';
import { Sun, Moon, Monitor, Check, Zap } from 'lucide-react';
import { useTheme } from '../../context/useTheme';

export default function ThemeSelectorPopover({ isOpen, onClose }) {
  const { theme, setTheme } = useTheme();
  const popoverRef = useRef(null);

  // Close on click outside or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options = [
    {
      id: 'spider-verse',
      label: 'Spider-Verse',
      subtext: 'Noir & crimson pulse aesthetic',
      icon: Zap,
    },
    {
      id: 'dark',
      label: 'Dark',
      subtext: 'Deep space operations mode',
      icon: Moon,
    },
    {
      id: 'light',
      label: 'Light',
      subtext: 'Clean SaaS daylight palette',
      icon: Sun,
    },
    {
      id: 'system',
      label: 'System',
      subtext: 'Matches operating system',
      icon: Monitor,
    },
  ];

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        left: '12px',
        right: '12px',
        backgroundColor: 'var(--bg-popover)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg, 10px)',
        boxShadow: 'var(--shadow-popover)',
        padding: '6px',
        zIndex: 200,
        animation: 'popoverIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 10px 6px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
          }}
        >
          Theme Appearance
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: '600',
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-primary-light)',
            padding: '1px 6px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
          }}
        >
          {theme}
        </span>
      </div>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setTheme(opt.id);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm, 6px)',
                backgroundColor: isSelected ? 'var(--bg-sidebar-active)' : 'transparent',
                border: isSelected ? '1px solid var(--border-accent)' : '1px solid transparent',
                color: isSelected ? 'var(--text-heading)' : 'var(--text-primary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-sidebar-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-muted-alpha)',
                    color: isSelected ? 'var(--color-primary)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: isSelected ? '600' : '500' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {opt.subtext}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div
                  style={{
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '6px',
                  }}
                >
                  <Check size={14} strokeWidth={2.5} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
