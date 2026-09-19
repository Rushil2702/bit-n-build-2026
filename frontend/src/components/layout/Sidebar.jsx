import { Zap, Layers } from 'lucide-react';
import { eventDetails } from '../../data/mockData';
import { NAV_ITEMS } from '../../data/navigation';

export default function Sidebar({ currentRoute = 'overview', onNavigate }) {
  return (
    <aside
      className="clubops-sidebar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        userSelect: 'none',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          height: 'var(--header-height)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 0 14px rgba(59, 130, 246, 0.4)',
          }}
        >
          <Zap size={18} fill="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--text-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              ClubOps
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#ffffff',
                backgroundColor: 'var(--color-ai)',
                padding: '1px 5px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              AI
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Operations OS
          </span>
        </div>
      </div>

      {/* Chapter & Event Switcher Badge */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '2px',
              }}
            >
              Current Chapter
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={eventDetails.fullTitle}
            >
              TechFest 2026
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              CVM University Chapter
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-muted)',
            }}
          >
            <Layers size={13} />
          </div>
        </div>
      </div>

      {/* Navigation Links Header */}
      <div style={{ padding: '10px 12px 0 16px', marginBottom: '6px' }}>
        <span
          style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
          }}
        >
          Operations Menu
        </span>
      </div>

      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '4px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentRoute === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '7px',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? 'var(--text-heading)' : 'var(--text-secondary)',
                backgroundColor: isActive
                  ? 'var(--bg-sidebar-active)'
                  : 'transparent',
                border: isActive
                  ? '1px solid var(--border-hover)'
                  : '1px solid transparent',
                textAlign: 'left',
                transition: 'all var(--transition-fast)',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-sidebar-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <Icon
                  size={16}
                  style={{
                    color: isActive
                      ? item.id === 'ai-assistant'
                        ? 'var(--color-ai)'
                        : 'var(--color-primary)'
                      : 'var(--text-muted)',
                    transition: 'color var(--transition-fast)',
                  }}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '2px 6px',
                    borderRadius: '999px',
                    backgroundColor:
                      item.badgeVariant === 'ai'
                        ? 'var(--color-ai-light)'
                        : item.badgeVariant === 'warning'
                        ? 'var(--color-warning-bg)'
                        : 'rgba(255, 255, 255, 0.07)',
                    color:
                      item.badgeVariant === 'ai'
                        ? 'var(--color-ai)'
                        : item.badgeVariant === 'warning'
                        ? 'var(--color-warning)'
                        : 'var(--text-muted)',
                    border:
                      item.badgeVariant === 'ai'
                        ? '1px solid var(--color-ai-border)'
                        : item.badgeVariant === 'warning'
                        ? '1px solid var(--color-warning-border)'
                        : '1px solid var(--border-subtle)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-sidebar)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '700',
              flexShrink: 0,
            }}
          >
            {eventDetails.leadOrganizer.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-heading)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {eventDetails.leadOrganizer.name}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {eventDetails.leadOrganizer.role}
            </div>
          </div>
        </div>

        <div
          title="System Operational"
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success)',
            boxShadow: '0 0 6px var(--color-success)',
          }}
        />
      </div>
    </aside>
  );
}
