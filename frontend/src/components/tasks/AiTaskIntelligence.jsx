import { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  GitPullRequest,
  Users,
  ArrowRight,
  Check,
  Zap,
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { aiTaskInsights } from '../../data/tasksData';

export default function AiTaskIntelligence({ onApplySequence }) {
  const [feedback, setFeedback] = useState({});

  const handleAction = (key, msg) => {
    setFeedback((prev) => ({ ...prev, [key]: msg }));
    setTimeout(() => {
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 2800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* 1. Main AI Operations Card */}
      <Card
        title="AI Task Intelligence"
        subtitle="Autonomous schedule optimization & dependency analysis"
        icon={Sparkles}
        aiGlow
        action={
          <Badge variant="ai" size="sm" dot>
            Ops-Copilot
          </Badge>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Critical Path Execution Sequence */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--color-ai-border)',
              borderRadius: '8px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} color="var(--color-ai)" />
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-heading)' }}>
                  Recommended Critical Path
                </span>
              </div>
              <Button
                variant="ai"
                size="sm"
                icon={feedback.sequence ? Check : ArrowRight}
                onClick={() => {
                  if (onApplySequence) onApplySequence();
                  handleAction('sequence', 'Prioritized by Critical Path');
                }}
              >
                {feedback.sequence ? 'Sequence Applied' : 'Apply Sequence'}
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {aiTaskInsights.suggestedSequence.map((seq) => (
                <div
                  key={seq.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-ai-light)',
                      color: 'var(--color-ai)',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {seq.rank}
                  </span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>
                    {seq.title}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{seq.rationale}</span>
                </div>
              ))}
            </div>
          </div>

          {/* At-Risk Deadlines */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-heading)',
                marginBottom: '8px',
              }}
            >
              <AlertTriangle size={14} color="var(--color-danger)" />
              <span>Imminent Deadline Risks ({aiTaskInsights.deadlineRisks.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiTaskInsights.deadlineRisks.map((risk) => (
                <div
                  key={risk.id}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '7px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {risk.title}
                    </span>
                    <Badge variant={risk.severity === 'critical' ? 'danger' : 'warning'} size="sm">
                      {risk.countdown}
                    </Badge>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                    {risk.detail}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={feedback[risk.id] ? Check : ArrowRight}
                    onClick={() => handleAction(risk.id, `Escalation sent for ${risk.title}`)}
                  >
                    {feedback[risk.id] ? 'Escalated' : risk.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Blocked Dependencies */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-heading)',
                marginBottom: '8px',
              }}
            >
              <GitPullRequest size={14} color="var(--color-warning)" />
              <span>Blocked Tasks & Chains ({aiTaskInsights.blockedTasks.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiTaskInsights.blockedTasks.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '7px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {b.title}
                    </span>
                    <Badge variant="warning" size="sm">
                      Blocked
                    </Badge>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-danger)', marginBottom: '4px' }}>
                    Cause: {b.blocker}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Recommendation: {b.recommendation}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={feedback[b.id] ? Check : Zap}
                    onClick={() => handleAction(b.id, `Action applied for ${b.title}`)}
                  >
                    {feedback[b.id] ? 'Applied' : b.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Workload Optimizer Card */}
      <Card
        title="Workload & Delegation"
        subtitle="Organizer bandwidth & bottleneck prevention"
        icon={Users}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              padding: '10px 12px',
              backgroundColor: 'rgba(59, 130, 246, 0.06)',
              border: '1px solid var(--color-primary-light)',
              borderRadius: '7px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: '1.4',
            }}
          >
            <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>Bandwidth Alert:</span>{' '}
            {aiTaskInsights.workloadOptimizer.assessment}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Suggested Reallocations:
            </span>
            {aiTaskInsights.workloadOptimizer.recommendations.map((rec) => (
              <div
                key={rec.id}
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {rec.taskTitle}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-primary)', marginTop: '2px' }}>
                    Reassign to: {rec.suggestedAssignee}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {rec.reason}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={feedback[rec.id] ? Check : Users}
                  onClick={() => handleAction(rec.id, `Delegation request queued for ${rec.suggestedAssignee}`)}
                >
                  {feedback[rec.id] ? 'Reassigned' : 'Delegate'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
