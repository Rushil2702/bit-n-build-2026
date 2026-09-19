import React, { useState } from 'react';
import { AlertOctagon, Sparkles, ArrowRight, X, Check } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { aiOperationalAlert } from '../../data/mockData';

export default function AiOperationalAlert() {
  const [dismissed, setDismissed] = useState(false);
  const [actionDone, setActionDone] = useState('');

  if (dismissed) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: 'rgba(239, 68, 68, 0.06)',
          border: '1px dashed rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <span>AI Operational Alert was minimized for this session.</span>
        <button
          onClick={() => setDismissed(false)}
          style={{
            color: 'var(--color-primary)',
            fontSize: '12px',
            textDecoration: 'underline',
          }}
        >
          Restore Alert
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.07)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '10px',
        padding: '18px 22px',
        marginBottom: '20px',
        position: 'relative',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Left Icon */}
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-danger)',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <AlertOctagon size={20} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Badge variant="danger" size="sm">
              Critical AI Bottleneck
            </Badge>
            <Badge variant="neutral" size="sm">
              {aiOperationalAlert.urgency}
            </Badge>
          </div>

          <h3
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--text-heading)',
              marginBottom: '6px',
              letterSpacing: '-0.01em',
            }}
          >
            {aiOperationalAlert.title}
          </h3>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '14px',
            }}
          >
            {aiOperationalAlert.description}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="danger"
              size="sm"
              icon={actionDone === 'sponsorship' ? Check : Sparkles}
              onClick={() => setActionDone('sponsorship')}
            >
              {actionDone === 'sponsorship' ? 'Notification Sent to Lead' : 'Notify Sponsorship Lead'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={actionDone === 'facility' ? Check : ArrowRight}
              onClick={() => setActionDone('facility')}
            >
              {actionDone === 'facility' ? 'Work Order #4082 Queued' : 'File Facility Work Order (32A Line)'}
            </Button>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          title="Minimize Alert"
          style={{
            color: 'var(--text-muted)',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
