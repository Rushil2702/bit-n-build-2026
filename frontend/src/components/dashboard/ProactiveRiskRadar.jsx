import { useState } from 'react';
import { ShieldAlert, ShieldCheck, Check } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { riskRadar as initialRisks } from '../../data/mockData';

const riskImpactVariants = {
  High: 'danger',
  Medium: 'warning',
  Low: 'info',
};

export default function ProactiveRiskRadar() {
  const [risks, setRisks] = useState(initialRisks);

  const toggleMitigate = (id) => {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === 'Mitigated' ? 'Active Risk' : 'Mitigated',
            }
          : r
      )
    );
  };

  return (
    <Card
      title="Proactive Risk Radar"
      subtitle="Autonomous risk detection, buffer windows & mitigation readiness"
      icon={ShieldAlert}
      action={
        <Badge variant="warning" size="sm" dot>
          {risks.filter((r) => r.status !== 'Mitigated').length} Open Risks
        </Badge>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {risks.map((risk) => {
          const isMitigated = risk.status === 'Mitigated';
          const impactVariant = isMitigated ? 'success' : riskImpactVariants[risk.impact] || 'neutral';

          return (
            <div
              key={risk.id}
              style={{
                padding: '14px 16px',
                backgroundColor: 'var(--bg-canvas)',
                border: isMitigated
                  ? '1px solid rgba(16, 185, 129, 0.2)'
                  : risk.impact === 'High'
                  ? '1px solid rgba(239, 68, 68, 0.25)'
                  : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                transition: 'all var(--transition-fast)',
              }}
            >
              {/* Header: Title + Severity Badges + Buffer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Badge variant={impactVariant} size="sm">
                      {isMitigated ? 'Mitigated' : `${risk.impact} Impact`}
                    </Badge>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      • {risk.committee}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      • Buffer: {risk.bufferDays}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: isMitigated ? 'var(--text-muted)' : 'var(--text-heading)',
                      textDecoration: isMitigated ? 'line-through' : 'none',
                    }}
                  >
                    {risk.title}
                  </h4>
                </div>

                <Button
                  variant={isMitigated ? 'ghost' : 'outline'}
                  size="sm"
                  icon={isMitigated ? ShieldCheck : Check}
                  onClick={() => toggleMitigate(risk.id)}
                >
                  {isMitigated ? 'Resolved' : 'Mitigate'}
                </Button>
              </div>

              {/* Mitigation Details */}
              <div
                style={{
                  fontSize: '12px',
                  color: isMitigated ? 'var(--text-muted)' : 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-card-subtle)',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontWeight: '600', color: isMitigated ? 'var(--text-muted)' : 'var(--color-primary)' }}>
                  Action Protocol:
                </span>{' '}
                {risk.mitigation}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
