import { useState } from 'react';
import { Search, Bell, Plus, Clock, Check } from 'lucide-react';
import Button from '../ui/Button';
import { eventDetails } from '../../data/mockData';

export default function Header({ currentTitle = 'Overview', onQuickAction }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerNotification = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <header
      className="clubops-header"
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-header)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'absolute',
            top: '72px',
            right: '32px',
            backgroundColor: 'var(--bg-card-elevated)',
            border: '1px solid var(--border-hover)',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '13px',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-elevated)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 999,
          }}
        >
          <Check size={16} color="var(--color-success)" />
          {toastMsg}
        </div>
      )}

      {/* Left: View Title & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--text-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            {currentTitle}
          </h1>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            / Ops Command
          </span>
        </div>

        {/* Live Countdown Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid var(--color-primary-light)',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--color-primary)',
          }}
        >
          <Clock size={13} />
          <span>T-{eventDetails.daysRemaining} Days to Kickoff</span>
        </div>
      </div>

      {/* Right: Search + Quick CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Global Search Bar */}
        <div
          style={{
            position: 'relative',
            width: '260px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '10px',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search tasks, risks, volunteers... (⌘K)"
            style={{
              width: '100%',
              paddingLeft: '32px',
              paddingRight: '12px',
              height: '34px',
              fontSize: '12px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '7px',
              color: 'var(--text-primary)',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                triggerNotification(`Searching for "${e.currentTarget.value}"...`);
              }
            }}
          />
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => triggerNotification('2 pending operational alerts requiring sign-off')}
          title="Notifications"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '7px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            position: 'relative',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <Bell size={15} />
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-danger)',
            }}
          />
        </button>

        {/* Quick Action Primary CTA */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            if (onQuickAction) onQuickAction();
            triggerNotification('Quick Action menu opened');
          }}
        >
          + Quick Action
        </Button>
      </div>
    </header>
  );
}
