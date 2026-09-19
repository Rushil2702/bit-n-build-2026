import {
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  FileDown,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { eventsPortfolioMetrics } from '../../data/eventsData';

export default function EventsHeader({
  events = [],
  onCreateClick,
  onSyncClick,
  onExportClick,
}) {
  const total = events.length;
  const active = events.filter((e) => e.status === 'active').length;
  const atRisk = events.filter((e) => e.status === 'at-risk').length;
  const upcoming = events.filter((e) => e.status === 'upcoming').length;
  const completed = events.filter((e) => e.status === 'completed').length;

  const avgReadiness =
    total > 0
      ? Math.round(events.reduce((acc, curr) => acc + (curr.readinessScore || 0), 0) / total)
      : 0;

  const statCards = [
    {
      label: 'Total Portfolio',
      value: total,
      sub: 'All Initiatives',
      icon: CalendarDays,
      color: 'var(--color-primary)',
      badge: 'Active Q3-Q4',
      badgeVariant: 'neutral',
    },
    {
      label: 'Active in Sprint',
      value: active,
      sub: 'In-Flight Execution',
      icon: TrendingUp,
      color: 'var(--color-info)',
      badge: 'Live',
      badgeVariant: 'info',
    },
    {
      label: 'At-Risk / Action Required',
      value: atRisk,
      sub: 'Bottlenecks Detected',
      icon: AlertTriangle,
      color: 'var(--color-danger)',
      badge: atRisk > 0 ? `${atRisk} Blocked` : 'Nominal',
      badgeVariant: atRisk > 0 ? 'danger' : 'success',
    },
    {
      label: 'Upcoming Pipeline',
      value: upcoming,
      sub: 'Next 60 Days',
      icon: Clock,
      color: 'var(--color-warning)',
      badge: 'Scheduled',
      badgeVariant: 'warning',
    },
    {
      label: 'Completed',
      value: completed,
      sub: '100% Post-Mortem',
      icon: CheckCircle2,
      color: 'var(--color-success)',
      badge: 'Archived',
      badgeVariant: 'success',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
      {/* Top Banner Row: Title + CTAs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--text-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              Events Portfolio & Lifecycle Operations
            </span>
            <Badge variant="ai" size="sm" dot>
              Autonomous Tracking
            </Badge>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time readiness progression, cross-event resource telemetry, and AI contingency planning.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={onSyncClick}
            title="Recalculate cross-event telemetry and burn rates"
          >
            Sync AI Telemetry
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileDown}
            onClick={onExportClick}
            title="Download executive run-of-show summary"
          >
            Export Deck
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={onCreateClick}
          >
            New Event
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
        }}
      >
        {statCards.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '14px 16px',
                boxShadow: 'var(--shadow-card)',
                transition: 'border-color var(--transition-fast)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-muted-alpha)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: st.color,
                  }}
                >
                  <Icon size={16} />
                </div>
                <Badge variant={st.badgeVariant} size="sm">
                  {st.badge}
                </Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'var(--text-heading)',
                    lineHeight: '1.2',
                  }}
                >
                  {st.value}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                  {st.label}
                </span>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {st.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Portfolio Health Progress Bar Banner */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px 18px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
          <Sparkles size={16} color="var(--color-ai)" />
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Portfolio Average Readiness:
          </span>
          <Badge variant={avgReadiness >= 75 ? 'success' : avgReadiness >= 50 ? 'warning' : 'danger'} size="sm">
            {avgReadiness}% Operational
          </Badge>
        </div>

        <div style={{ flex: '1 1 280px' }}>
          <ProgressBar
            percentage={avgReadiness}
            color={avgReadiness >= 75 ? 'var(--color-success)' : 'var(--color-primary)'}
            height={7}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>
            Allocated Budget: <strong style={{ color: 'var(--text-primary)' }}>${eventsPortfolioMetrics.totalBudgetSpent.toLocaleString()}</strong> / ${eventsPortfolioMetrics.totalBudget.toLocaleString()}
          </span>
          <span>
            Participants: <strong style={{ color: 'var(--text-primary)' }}>{eventsPortfolioMetrics.totalParticipants.toLocaleString()}</strong> Registered
          </span>
        </div>
      </div>
    </div>
  );
}
