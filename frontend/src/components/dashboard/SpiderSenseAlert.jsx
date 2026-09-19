import { useState } from 'react';
import { Zap, Check, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function SpiderSenseAlert() {
  const [dismissed, setDismissed] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [actionDone, setActionDone] = useState('');

  if (dismissed) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: 'var(--bg-muted-alpha)',
          border: '1px dashed var(--border-subtle)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={14} color="var(--color-primary)" />
          <span>Spider-Sense telemetry is monitoring background club operations.</span>
        </div>
        <button
          onClick={() => {
            setDismissed(false);
            setResolved(false);
          }}
          style={{
            color: 'var(--color-primary)',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Restore Alert
        </button>
      </div>
    );
  }

  if (resolved) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: 'var(--color-success-bg)',
          border: '1px solid var(--color-success-border)',
          borderRadius: '10px',
          fontSize: '13px',
          color: 'var(--color-success)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Check size={16} />
          <span>
            <strong>Anomaly Resolved:</strong> Escalation dispatched to Dean Office & DevRel Partner. Collateral print hold lifted.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          style={{ color: 'var(--color-success)', cursor: 'pointer', padding: '2px' }}
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="spider-sense-banner"
      style={{
        borderRadius: '12px',
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all var(--transition-normal)',
      }}
    >
      {/* Spider-Verse chromatic corner glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '180px',
          height: '100%',
          background: 'radial-gradient(ellipse at top right, rgba(225, 29, 72, 0.15), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '18px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Spider-Sense Pulse Radar Icon */}
        <div
          className="spider-sense-tingle"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-primary-light)',
            border: '1px solid var(--color-primary-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <Zap size={22} />
        </div>

        {/* Anomaly Body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Badge variant="danger" size="sm" dot>
              Spider-Sense Detected Something
            </Badge>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--color-secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Operational Risk #8819
            </span>
          </div>

          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--text-heading)',
              letterSpacing: '-0.01em',
              marginBottom: '6px',
            }}
          >
            Tier-1 Google Cloud MoU Inactive for 72 Hours
          </h3>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-primary)',
              lineHeight: '1.5',
              marginBottom: '10px',
            }}
          >
            <strong style={{ color: 'var(--color-primary)' }}>Why it matters:</strong> If the agreement is not signed by 5:00 PM today, official sponsor logos will be omitted from the printed hackathon welcome badges and stadium banners, risking the $7,500 commitment.
          </p>

          {/* Progressive Disclosure: Optional Details */}
          {showDetails && (
            <div
              style={{
                marginBottom: '14px',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Sign-off Queue:</span> Dean Student Welfare Office (Room 104)
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Partner Contact:</span> devrel-partners@google.com
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Collateral Batch:</span> Swag Lanyards + Stage Backdrop #3
                </div>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="primary"
              size="sm"
              icon={actionDone === 'resolve' ? Check : Zap}
              onClick={() => {
                setActionDone('resolve');
                setTimeout(() => setResolved(true), 600);
              }}
            >
              {actionDone === 'resolve' ? 'Escalation Dispatched' : 'Resolve with Dean Office'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Review Details'}
            </Button>
          </div>
        </div>

        {/* Minimize Button */}
        <button
          onClick={() => setDismissed(true)}
          title="Minimize Spider-Sense Alert"
          style={{
            color: 'var(--text-muted)',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
