import React from 'react';
import {
  Calendar,
  AlertTriangle,
  MapPin,
  LayoutDashboard,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

export default function EventsTimelineView({ events = [], onNavigate }) {
  // Sort events chronologically (or by daysRemaining)
  const sortedEvents = [...events].sort((a, b) => {
    // Completed last or first?
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (b.status === 'completed' && a.status !== 'completed') return -1;
    return a.daysRemaining - b.daysRemaining;
  });

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--text-heading)',
            marginBottom: '4px',
          }}
        >
          2026 Chapter Milestone Roadmap
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Chronological execution horizon across Q3 and Q4 2026 operations.
        </p>
      </div>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Continuous vertical timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '24px',
            width: '2px',
            backgroundColor: 'var(--border-subtle)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sortedEvents.map((evt) => {
            const isCompleted = evt.status === 'completed';
            const isAtRisk = evt.status === 'at-risk';
            const isActive = evt.status === 'active';

            const nodeColor = isCompleted
              ? 'var(--color-success)'
              : isAtRisk
              ? 'var(--color-danger)'
              : isActive
              ? 'var(--color-primary)'
              : 'var(--color-warning)';

            return (
              <div key={evt.id} style={{ position: 'relative' }}>
                {/* Timeline node circle */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-card)',
                    border: `3px solid ${nodeColor}`,
                    boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none',
                    zIndex: 2,
                  }}
                />

                {/* Event timeline card content */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    border: isAtRisk
                      ? '1px solid rgba(239, 68, 68, 0.3)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge variant="neutral" size="sm">
                        {evt.category}
                      </Badge>
                      <Badge
                        variant={
                          isCompleted
                            ? 'success'
                            : isAtRisk
                            ? 'danger'
                            : isActive
                            ? 'info'
                            : 'warning'
                        }
                        size="sm"
                        dot
                      >
                        {evt.statusLabel}
                      </Badge>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <Calendar size={13} color="var(--color-primary)" />
                      <strong style={{ color: 'var(--text-primary)' }}>{evt.dates}</strong>
                      <span>({evt.daysRemaining > 0 ? `T-${evt.daysRemaining}d` : 'Concluded'})</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                    <div>
                      <h4
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: 'var(--text-heading)',
                          marginBottom: '2px',
                        }}
                      >
                        {evt.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} /> {evt.location}
                        </span>
                        <span>Lead: <strong style={{ color: 'var(--text-secondary)' }}>{evt.lead.name}</strong></span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      icon={LayoutDashboard}
                      onClick={() => onNavigate('overview')}
                    >
                      Command Deck
                    </Button>
                  </div>

                  {/* Readiness Bar & Phase */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {evt.currentPhase}:
                    </span>
                    <div style={{ flex: 1 }}>
                      <ProgressBar
                        percentage={evt.readinessScore}
                        color={nodeColor}
                        height={5}
                      />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: nodeColor, whiteSpace: 'nowrap' }}>
                      {evt.readinessScore}%
                    </span>
                  </div>

                  {/* Warning snippet if at risk */}
                  {isAtRisk && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '6px 10px',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'var(--color-danger)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <AlertTriangle size={13} />
                      <span>{evt.riskNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
