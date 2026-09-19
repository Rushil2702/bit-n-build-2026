import { CheckSquare, Calendar, Users, Flag, ArrowUpRight } from 'lucide-react';
import Badge from '../ui/Badge';

export default function PersonalWorkspace({ onNavigate }) {
  const cards = [
    {
      id: 'my-tasks',
      title: 'My Tasks',
      metric: '5 Open',
      subtext: '1 critical due today @ 2:30 PM',
      badge: '1 Urgent',
      badgeVariant: 'danger',
      icon: CheckSquare,
      accent: 'var(--color-primary)',
      targetRoute: 'tasks',
    },
    {
      id: 'meetings',
      title: 'Upcoming Meeting',
      metric: '3:00 PM Today',
      subtext: 'Tech & Infra Briefing (Dean Room 2B)',
      badge: 'In 3 Hours',
      badgeVariant: 'info',
      icon: Calendar,
      accent: 'var(--color-secondary)',
      targetRoute: 'overview',
    },
    {
      id: 'volunteers',
      title: 'Volunteers On-Duty',
      metric: '42 / 50 Active',
      subtext: '4 operational squads deployed',
      badge: '92% Shift Fill',
      badgeVariant: 'success',
      icon: Users,
      accent: 'var(--color-success)',
      targetRoute: 'overview',
    },
    {
      id: 'events',
      title: 'Active Event',
      metric: 'TechFest 2026',
      subtext: 'T-18 Days • 842 Hackers Registered',
      badge: '78% Ready',
      badgeVariant: 'warning',
      icon: Flag,
      accent: 'var(--color-primary)',
      targetRoute: 'events',
    },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
            }}
          >
            Personal Workspace
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>• Active Overview</span>
        </div>
      </div>

      <div className="grid-4col">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="spider-interactive-card"
              onClick={() => onNavigate && onNavigate(card.targetRoute)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '18px 20px',
                cursor: onNavigate ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-muted-alpha)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.accent,
                  }}
                >
                  <Icon size={17} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Badge variant={card.badgeVariant} size="sm">
                    {card.badge}
                  </Badge>
                  {onNavigate && (
                    <ArrowUpRight size={14} color="var(--text-muted)" style={{ opacity: 0.7 }} />
                  )}
                </div>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '4px',
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.01em',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-brand)',
                }}
              >
                {card.metric}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {card.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
