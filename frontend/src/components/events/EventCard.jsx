import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  CheckCircle2,
  CircleDot,
  DollarSign,
  Users,
  Layers,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

export default function EventCard({
  event,
  onNavigate,
  onTriggerDiagnostic,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 75) return 'var(--color-success)';
    if (score >= 50) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'active':
        return 'info';
      case 'at-risk':
        return 'danger';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const scoreColor = getScoreColor(event.readinessScore);
  const isAtRisk = event.status === 'at-risk' || event.riskLevel === 'critical' || event.riskLevel === 'high';

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: isAtRisk ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: isAtRisk ? '0 2px 12px rgba(239, 68, 68, 0.08)' : 'var(--shadow-card)',
        transition: 'all var(--transition-fast)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isAtRisk
          ? 'var(--color-danger)'
          : 'var(--border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isAtRisk
          ? 'rgba(239, 68, 68, 0.35)'
          : 'var(--border-subtle)';
      }}
    >
      {/* Top Subtle Glow for Active/At-Risk */}
      {event.status === 'active' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
          }}
        />
      )}
      {isAtRisk && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)',
          }}
        />
      )}

      {/* Header Row: Category Badge, Status Badge, Days Remaining Chip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="neutral" size="sm">
            {event.category}
          </Badge>
          <Badge variant={getStatusBadgeVariant(event.status)} size="sm" dot>
            {event.statusLabel}
          </Badge>
        </div>

        {/* Countdown / Status Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 9px',
            borderRadius: '6px',
            backgroundColor: event.daysRemaining > 0 ? 'rgba(59, 130, 246, 0.08)' : 'rgba(16, 185, 129, 0.08)',
            border: `1px solid ${event.daysRemaining > 0 ? 'var(--color-primary-light)' : 'var(--color-success-border)'}`,
            fontSize: '11px',
            fontWeight: '600',
            color: event.daysRemaining > 0 ? 'var(--color-primary)' : 'var(--color-success)',
          }}
        >
          <Clock size={12} />
          <span>{event.daysRemaining > 0 ? `T-${event.daysRemaining} Days` : 'Completed'}</span>
        </div>
      </div>

      {/* Title & Metadata Row */}
      <div style={{ marginBottom: '14px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--text-heading)',
            letterSpacing: '-0.01em',
            marginBottom: '4px',
          }}
        >
          {event.name}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
          {event.fullTitle}
        </p>

        {/* Location, Date, Lead Organizers */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '18px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} color="var(--color-primary)" />
            <span style={{ color: 'var(--text-secondary)' }}>{event.dates}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={13} color="var(--color-primary)" />
            <span style={{ color: 'var(--text-secondary)' }}>{event.location}</span>
          </div>

          {/* Organizer Lead */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {event.lead.avatar}
            </div>
            <span>
              Lead: <strong style={{ color: 'var(--text-primary)' }}>{event.lead.name}</strong> ({event.lead.role})
            </span>
          </div>
        </div>
      </div>

      {/* Readiness Progression Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px 14px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={13} color={scoreColor} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-heading)' }}>
              Current: {event.currentPhase}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: scoreColor }}>
              {event.readinessScore}% Readiness
            </span>
          </div>
        </div>

        <ProgressBar
          percentage={event.readinessScore}
          color={scoreColor}
          height={6}
        />
      </div>

      {/* Operational Metrics Strip (4 mini-cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        {/* Budget */}
        <div
          style={{
            padding: '8px 10px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <DollarSign size={12} color="var(--color-primary)" />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Budget Spent
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            ${event.budget.spent.toLocaleString()}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            of ${event.budget.allocated.toLocaleString()} ({event.budget.percentage}%)
          </div>
        </div>

        {/* Participants */}
        <div
          style={{
            padding: '8px 10px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Users size={12} color="var(--color-info)" />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Registrations
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {event.participants.registered}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            target {event.participants.target} ({event.participants.percentage}%)
          </div>
        </div>

        {/* Tasks Velocity */}
        <div
          style={{
            padding: '8px 10px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <CheckSquare size={12} color="var(--color-success)" />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Tasks Closed
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {event.tasks.completed} / {event.tasks.total}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            {event.tasks.percentage}% completion
          </div>
        </div>

        {/* Volunteers */}
        <div
          style={{
            padding: '8px 10px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Users size={12} color="var(--color-warning)" />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Volunteers
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {event.volunteers.assigned} / {event.volunteers.target}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            {event.volunteers.activeShifts > 0 ? `${event.volunteers.activeShifts} shifts active` : 'Completed'}
          </div>
        </div>
      </div>

      {/* At-Risk Warning Box (if applicable) */}
      {isAtRisk && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <AlertTriangle size={16} color="var(--color-danger)" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-danger)', marginBottom: '2px' }}>
              Operational Constraint Identified
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {event.riskNote}
            </p>
          </div>
        </div>
      )}

      {/* Expandable Phase Timeline Stepper */}
      {isExpanded && (
        <div
          style={{
            padding: '14px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            marginBottom: '14px',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
            Phase Progression Stepper
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {event.timelinePhases.map((phase, idx) => {
              const isDone = phase.status === 'completed';
              const isInProg = phase.status === 'in-progress';
              const isBlocked = phase.status === 'blocked';

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: isInProg ? 'rgba(59, 130, 246, 0.06)' : isBlocked ? 'rgba(239, 68, 68, 0.06)' : 'transparent',
                    border: isInProg ? '1px solid var(--color-primary-light)' : isBlocked ? '1px solid var(--color-danger-border)' : '1px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isDone ? (
                      <CheckCircle2 size={14} color="var(--color-success)" />
                    ) : isBlocked ? (
                      <AlertTriangle size={14} color="var(--color-danger)" />
                    ) : isInProg ? (
                      <CircleDot size={14} color="var(--color-primary)" />
                    ) : (
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          border: '1px solid var(--text-muted)',
                          margin: '2px',
                        }}
                      />
                    )}
                    <span
                      style={{
                        color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: isDone ? 'line-through' : 'none',
                        fontWeight: isInProg || isBlocked ? '600' : '400',
                      }}
                    >
                      {phase.name}
                    </span>
                  </div>

                  <Badge
                    variant={isDone ? 'success' : isBlocked ? 'danger' : isInProg ? 'info' : 'neutral'}
                    size="sm"
                  >
                    {phase.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        {/* Left: Expand Stepper Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <span>{isExpanded ? 'Hide Phases' : 'View Phases'}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Right Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            variant="ghost"
            size="sm"
            icon={Sparkles}
            onClick={() => onTriggerDiagnostic(event)}
            title="Run AI operational risk diagnosis"
          >
            AI Insight
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={CheckSquare}
            onClick={() => onNavigate('tasks')}
            title="View operational tasks for this event"
          >
            Tasks
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={LayoutDashboard}
            onClick={() => onNavigate('overview')}
            title="Open command deck dashboard"
          >
            Command Deck
          </Button>
        </div>
      </div>
    </div>
  );
}
