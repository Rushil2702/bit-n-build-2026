import { Target } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { readinessTracks } from '../../data/mockData';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Ready':
    case 'On Track':
      return <Badge variant="success" size="sm">{status}</Badge>;
    case 'Needs Attention':
      return <Badge variant="warning" size="sm">{status}</Badge>;
    case 'Behind Schedule':
      return <Badge variant="danger" size="sm">{status}</Badge>;
    default:
      return <Badge variant="neutral" size="sm">{status}</Badge>;
  }
};

const getTrackColor = (score) => {
  if (score >= 85) return 'var(--color-success)';
  if (score >= 70) return 'var(--color-primary)';
  if (score >= 65) return 'var(--color-warning)';
  return 'var(--color-danger)';
};

export default function ReadinessProgression() {
  return (
    <Card
      title="Hackathon Readiness Progression"
      subtitle="Committee milestones and operational readiness for TechFest 2026"
      icon={Target}
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sprint 3 Target:</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)' }}>80% Target</span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {readinessTracks.map((track) => {
          const trackColor = getTrackColor(track.score);

          return (
            <div
              key={track.id}
              style={{
                padding: '12px 14px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                transition: 'border-color var(--transition-fast)',
              }}
            >
              {/* Header row: Track Name + Lead + Status + Score */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginBottom: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--text-heading)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {track.name}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    • Lead: {track.lead}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  {getStatusBadge(track.status)}
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: trackColor,
                      minWidth: '36px',
                      textAlign: 'right',
                    }}
                  >
                    {track.score}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '8px' }}>
                <ProgressBar percentage={track.score} color={trackColor} height={5} />
              </div>

              {/* Summary description */}
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {track.summary}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
