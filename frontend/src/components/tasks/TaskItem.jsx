import { useState } from 'react';
import {
  Check,
  Clock,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import Badge from '../ui/Badge';

const priorityVariants = {
  CRITICAL: 'danger',
  HIGH: 'warning',
  MEDIUM: 'info',
  LOW: 'neutral',
};

export default function TaskItem({
  task,
  onToggleComplete,
  onStatusChange,
  onToggleSubtask,
}) {
  const [expanded, setExpanded] = useState(false);

  const isCompleted = task.status === 'completed';
  const isBlocked = task.isBlocked;
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;

  return (
    <div
      style={{
        backgroundColor: isCompleted
          ? 'rgba(255, 255, 255, 0.015)'
          : isBlocked
          ? 'rgba(239, 68, 68, 0.04)'
          : 'var(--bg-card)',
        border: isBlocked
          ? '1px solid rgba(239, 68, 68, 0.25)'
          : isCompleted
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid var(--border-subtle)',
        borderRadius: '9px',
        padding: '16px 18px',
        marginBottom: '10px',
        boxShadow: 'var(--shadow-card)',
        transition: 'all var(--transition-fast)',
        opacity: isCompleted ? 0.75 : 1,
      }}
    >
      {/* Top Main Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        {/* Left: Checkbox + Title + Description */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: 0 }}>
          {/* Main Completion Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            title={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '5px',
              border: isCompleted
                ? '1px solid var(--color-success)'
                : '1px solid var(--border-default)',
              backgroundColor: isCompleted ? 'var(--color-success)' : 'var(--bg-canvas)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              marginTop: '3px',
              transition: 'all var(--transition-fast)',
            }}
          >
            {isCompleted && <Check size={13} color="#ffffff" strokeWidth={3} />}
          </button>

          <div style={{ minWidth: 0, flex: 1 }}>
            {/* Badges strip: Category + Priority + Status */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-primary-light)',
                }}
              >
                {task.category}
              </span>

              <Badge variant={priorityVariants[task.priority] || 'neutral'} size="sm">
                {task.priority}
              </Badge>

              {isBlocked && (
                <Badge variant="danger" size="sm" dot>
                  Blocked Dependency
                </Badge>
              )}

              {task.status === 'in-progress' && (
                <Badge variant="info" size="sm">
                  In Progress
                </Badge>
              )}
            </div>

            {/* Title */}
            <h4
              style={{
                fontSize: '14px',
                fontWeight: isCompleted ? '400' : '600',
                color: isCompleted ? 'var(--text-muted)' : 'var(--text-heading)',
                textDecoration: isCompleted ? 'line-through' : 'none',
                lineHeight: '1.4',
                marginBottom: '4px',
              }}
            >
              {task.title}
            </h4>

            {/* Description */}
            {task.description && (
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.45',
                  marginBottom: '8px',
                }}
              >
                {task.description}
              </p>
            )}

            {/* Blocked alert reason */}
            {isBlocked && task.blockedBy && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '5px',
                  fontSize: '11px',
                  color: 'var(--color-danger)',
                  marginBottom: '8px',
                }}
              >
                <AlertOctagon size={13} flexShrink={0} />
                <span>{task.blockedBy}</span>
              </div>
            )}

            {/* Meta row: Assignee, Deadline, Subtasks toggle */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                fontSize: '12px',
                color: 'var(--text-muted)',
              }}
            >
              {/* Assignee */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: task.assignee.isUser ? 'var(--color-primary-light)' : 'var(--bg-card-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: task.assignee.isUser ? 'var(--color-primary)' : 'var(--text-secondary)',
                    fontSize: '9px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {task.assignee.avatar}
                </div>
                <span style={{ color: task.assignee.isUser ? 'var(--text-primary)' : 'inherit' }}>
                  {task.assignee.name} {task.assignee.isUser && '(You)'}
                </span>
              </div>

              {/* Deadline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} color={task.dueCategory === 'today' ? 'var(--color-warning)' : 'inherit'} />
                <span
                  style={{
                    color: task.dueCategory === 'today' ? 'var(--color-warning)' : 'inherit',
                    fontWeight: task.dueCategory === 'today' ? '600' : '400',
                  }}
                >
                  {task.dueDate}
                </span>
              </div>

              {/* Subtasks Expander */}
              {subtasks.length > 0 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  <span>
                    Subtasks ({completedSubtasks}/{subtasks.length})
                  </span>
                  {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Status Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            style={{
              height: '30px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: '500',
              borderRadius: '6px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Expandable Subtask List */}
      {expanded && subtasks.length > 0 && (
        <div
          style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
            paddingLeft: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {subtasks.map((st) => (
            <div
              key={st.id}
              onClick={() => onToggleSubtask(task.id, st.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                color: st.completed ? 'var(--text-muted)' : 'var(--text-secondary)',
              }}
            >
              {st.completed ? (
                <CheckCircle2 size={14} color="var(--color-success)" />
              ) : (
                <Circle size={14} color="var(--text-muted)" />
              )}
              <span style={{ textDecoration: st.completed ? 'line-through' : 'none' }}>
                {st.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
