import { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Zap,
  ArrowRight,
  Check,
  Copy,
  FileCode,
  Layers,
  Bot,
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { aiEventIntelligence } from '../../data/eventsData';

export default function AiEventIntelligence({ onApplyRecommendation }) {
  const [feedback, setFeedback] = useState({});
  const [selectedBlueprint, setSelectedBlueprint] = useState(aiEventIntelligence.blueprints[0].id);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlueprint, setGeneratedBlueprint] = useState(aiEventIntelligence.blueprints[0]);

  const handleAction = (key, title) => {
    setFeedback((prev) => ({ ...prev, [key]: true }));
    if (onApplyRecommendation) {
      onApplyRecommendation(title);
    }
    setTimeout(() => {
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 3000);
  };

  const handleSelectBlueprint = (id) => {
    setSelectedBlueprint(id);
    const found = aiEventIntelligence.blueprints.find((b) => b.id === id);
    if (found) {
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedBlueprint(found);
        setIsGenerating(false);
      }, 350);
    }
  };

  const handleCopyBlueprint = () => {
    if (generatedBlueprint) {
      navigator.clipboard.writeText(generatedBlueprint.content);
      setCopiedBlueprint(true);
      setTimeout(() => setCopiedBlueprint(false), 2500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Main AI Sentinel Intelligence Card */}
      <Card
        title="AI Event Intelligence"
        subtitle="Cross-event resource telemetry & autonomous schedule optimization"
        icon={Sparkles}
        aiGlow
        action={
          <Badge variant="ai" size="sm" dot>
            Ops-Sentinel
          </Badge>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Cross-Event Resource Conflicts */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <AlertTriangle size={14} color="var(--color-warning)" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Resource Contention Alerts
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiEventIntelligence.crossEventConflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-heading)' }}>
                      {conflict.title}
                    </span>
                    <Badge variant={conflict.severity === 'critical' ? 'danger' : 'warning'} size="sm">
                      {conflict.severity}
                    </Badge>
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.4' }}>
                    {conflict.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(139, 92, 246, 0.07)',
                      border: '1px solid var(--color-ai-border)',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'var(--text-primary)' }}>
                      <strong>Fix:</strong> {conflict.suggestedResolution}
                    </span>
                    <Button
                      variant="ai"
                      size="sm"
                      onClick={() => handleAction(conflict.id, conflict.title)}
                      disabled={feedback[conflict.id]}
                    >
                      {feedback[conflict.id] ? <Check size={12} /> : 'Resolve'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Velocity & Readiness Projections */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Zap size={14} color="var(--color-ai)" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Event Readiness Projections
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {aiEventIntelligence.projections.map((proj, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    fontSize: '11px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>
                      {proj.event}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>
                      Bottleneck: <span style={{ color: 'var(--text-secondary)' }}>{proj.criticalPathItem}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: proj.trend === 'Accelerating' ? 'var(--color-success)' : proj.trend === 'Stalled' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                      {proj.readinessForecast}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                      {proj.confidence}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous AI Recommendations */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Bot size={14} color="var(--color-primary)" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                AI Recommendations
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiEventIntelligence.recommendations.map((rec) => {
                const isDone = feedback[rec.id];
                return (
                  <div
                    key={rec.id}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-canvas)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-heading)' }}>
                        {rec.title}
                      </span>
                      <Badge variant={rec.urgency === 'CRITICAL' ? 'danger' : 'info'} size="sm">
                        {rec.impact}
                      </Badge>
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.4' }}>
                      {rec.description}
                    </p>

                    <Button
                      variant={isDone ? 'secondary' : 'ai'}
                      size="sm"
                      icon={isDone ? Check : ArrowRight}
                      onClick={() => handleAction(rec.id, rec.title)}
                      disabled={isDone}
                      style={{ width: '100%' }}
                    >
                      {isDone ? 'Executed' : rec.actionLabel}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Interactive AI Event Blueprint & Planner Tool */}
      <Card
        title="AI Event Planner & Blueprints"
        subtitle="Generate operational protocols, run-of-show & compliance schedules"
        icon={FileCode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Blueprint Selector */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
              Select Operational Blueprint
            </label>
            <select
              value={selectedBlueprint}
              onChange={(e) => handleSelectBlueprint(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '7px',
                padding: '8px 12px',
                fontSize: '13px',
                color: 'var(--text-primary)',
              }}
            >
              {aiEventIntelligence.blueprints.map((bp) => (
                <option key={bp.id} value={bp.id}>
                  {bp.label} ({bp.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Blueprint Preview & Content */}
          <div
            style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={13} color="var(--color-ai)" />
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-heading)' }}>
                  {generatedBlueprint?.label}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={copiedBlueprint ? Check : Copy}
                onClick={handleCopyBlueprint}
              >
                {copiedBlueprint ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {generatedBlueprint?.description}
            </p>

            <pre
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '10px 12px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5',
                maxHeight: '180px',
                overflowY: 'auto',
                opacity: isGenerating ? 0.4 : 1,
                transition: 'opacity var(--transition-fast)',
              }}
            >
              {isGenerating ? 'Synthesizing live operational blueprint...' : generatedBlueprint?.content}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
