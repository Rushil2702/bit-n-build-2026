import { useState } from 'react';
import { CheckSquare, Check, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { todayPriorities as initialPriorities } from '../../data/mockData';

const urgencyVariants = {
  CRITICAL: 'danger',
  HIGH: 'warning',
  MEDIUM: 'info',
  LOW: 'neutral',
};

export default function TodayPriorities() {
  const [priorities, setPriorities] = useState(initialPriorities);

  const toggleTask = (id) => {
    setPriorities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = priorities.filter((p) => p.completed).length;

  return (
    <Card
      title="Today's Priorities"
      subtitle={`${completedCount} of ${priorities.length} critical items resolved`}
      icon={CheckSquare}
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="neutral" size="sm">
            {completedCount}/{priorities.length} Done
          </Badge>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {priorities.map((item) => {
          const isDone = item.completed;
          const urgencyVariant = urgencyVariants[item.urgency] || 'neutral';

          return (
            <div
              key={item.id}
              onClick={() => toggleTask(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                backgroundColor: isDone ? 'var(--bg-muted-alpha)' : 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                opacity: isDone ? 0.65 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isDone) e.currentTarget.style.borderColor = 'var(--border-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isDone) e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Checkbox + Task Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isDone ? '1px solid var(--color-success)' : '1px solid var(--border-default)',
                    backgroundColor: isDone ? 'var(--color-success)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {isDone && <Check size={12} color="#ffffff" strokeWidth={3} />}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: isDone ? '400' : '500',
                      color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                      textDecoration: isDone ? 'line-through' : 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.task}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '3px',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span style={{ color: 'var(--color-primary)' }}>{item.committee}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} /> {item.deadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Urgency Pill + Assignee Initials */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
                <Badge variant={urgencyVariant} size="sm">
                  {item.urgency}
                </Badge>
                <div
                  title={`Assigned to: ${item.assignee}`}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-card-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.assigneeInitials}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
