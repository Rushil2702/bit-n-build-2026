import { CalendarClock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { upcomingDeadlines } from '../../data/mockData';

export default function UpcomingDeadlines() {
  return (
    <Card
      title="Upcoming Deadlines"
      subtitle="Impending cut-offs within next 7 days"
      icon={CalendarClock}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {upcomingDeadlines.map((dl) => {
          const isUrgent = dl.daysLeft <= 2;

          return (
            <div
              key={dl.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 13px',
                backgroundColor: 'var(--bg-canvas)',
                border: isUrgent ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
              }}
            >
              <div style={{ minWidth: 0, flex: 1, paddingRight: '12px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {dl.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '3px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ color: 'var(--color-primary)' }}>{dl.committee}</span>
                  <span>•</span>
                  <span>{dl.dueDate}</span>
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                <Badge
                  variant={dl.daysLeft === 1 ? 'danger' : dl.daysLeft <= 3 ? 'warning' : 'neutral'}
                  size="sm"
                  dot={isUrgent}
                >
                  {dl.daysLeft === 1 ? 'Tomorrow' : `In ${dl.daysLeft}d`}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
