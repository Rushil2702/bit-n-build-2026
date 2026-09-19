import { CheckSquare, Clock, AlertOctagon, CheckCircle2, ListTodo } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function TaskMetricsHeader({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const dueToday = tasks.filter((t) => t.dueCategory === 'today' && t.status !== 'completed').length;
  const blocked = tasks.filter((t) => t.isBlocked && t.status !== 'completed').length;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const metrics = [
    {
      label: 'Assigned Tasks',
      value: total,
      sub: 'Sprint 3 Ops Queue',
      icon: ListTodo,
      color: 'var(--color-primary)',
      badge: 'Active',
      badgeVariant: 'neutral',
    },
    {
      label: 'In Progress',
      value: inProgress,
      sub: 'Currently Underway',
      icon: CheckSquare,
      color: 'var(--color-info)',
      badge: `${inProgress} active`,
      badgeVariant: 'info',
    },
    {
      label: 'Due Today',
      value: dueToday,
      sub: 'Critical Today Window',
      icon: Clock,
      color: 'var(--color-warning)',
      badge: 'Action Today',
      badgeVariant: 'warning',
    },
    {
      label: 'Blocked / Dependent',
      value: blocked,
      sub: 'Awaiting Predecessors',
      icon: AlertOctagon,
      color: 'var(--color-danger)',
      badge: blocked > 0 ? 'Requires Action' : 'Clear',
      badgeVariant: blocked > 0 ? 'danger' : 'success',
    },
    {
      label: 'Completed',
      value: completed,
      sub: `${percent}% Completion Rate`,
      icon: CheckCircle2,
      color: 'var(--color-success)',
      badge: `${percent}% Done`,
      badgeVariant: 'success',
    },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Top Banner Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '14px',
        }}
      >
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '9px',
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
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-muted-alpha)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: m.color,
                  }}
                >
                  <Icon size={15} />
                </div>
                <Badge variant={m.badgeVariant} size="sm">
                  {m.badge}
                </Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'var(--text-heading)',
                    lineHeight: '1.2',
                  }}
                >
                  {m.value}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                  {m.label}
                </span>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {m.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar Strip */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
          Sprint 3 Task Velocity:
        </span>
        <div style={{ flex: 1 }}>
          <ProgressBar percentage={percent} color="var(--color-primary)" height={6} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
          {completed} of {total} Finished ({percent}%)
        </span>
      </div>
    </div>
  );
}
