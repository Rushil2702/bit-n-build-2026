import { useState } from 'react';
import { Target, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function CommandCenter() {
  const [expandedId, setExpandedId] = useState(null);
  const [actionsTaken, setActionsTaken] = useState({});

  const items = [
    {
      id: 'cmd-1',
      title: 'Google Cloud Tier-1 MoU Inactive for 72h',
      problem: 'Tier-1 sponsorship contract ($7,500 commitment) awaiting Dean signature for over 72 hours.',
      whyItMatters: 'Printed badge lanyards and auditorium banners cut-off is in 24h. Delays forfeit guaranteed logo placements.',
      primaryAction: 'Send MoU Escalation',
      actionSuccess: 'Escalation Sent to Dean Office',
      urgency: 'Action within 24h',
      urgencyVariant: 'danger',
      details: {
        document: 'GCP_TechFest_Tier1_MoU_v3.pdf',
        contact: 'devrel-partners@google.com',
        queue: 'Dean Student Welfare Queue #8819',
        impact: 'Logo inclusion on 1,000 participant kits',
      },
    },
    {
      id: 'cmd-2',
      title: 'Lab 4 Circuit Overdraw (38A Peak vs 30A Limit)',
      problem: 'Simultaneous soldering irons and robotic motor drivers project 38A peak load against a 30A breaker.',
      whyItMatters: 'Severe risk of tripping circuit breakers during the live robotics track kickoff with 24 teams on stage.',
      primaryAction: 'Request 32A Feed Line',
      actionSuccess: 'Work Order #4082 Queued',
      urgency: 'Action by 2:30 PM',
      urgencyVariant: 'warning',
      details: {
        location: 'STEM Wing B — Lab 4 Electrical Substation',
        contact: 'Campus Electrician Team (Ext 2411)',
        solution: 'Install dedicated secondary 32A feed line box',
        timeline: 'Requires 2 hours electrician installation',
      },
    },
    {
      id: 'cmd-3',
      title: 'Catering Headcount & Dietary Lock Pending',
      problem: 'Final participant dietary count sign-off is pending verification with the hospitality squad.',
      whyItMatters: 'Sodexo meal cutoff is strictly 6:00 PM today. Missing the window incurs a 15% campus late surcharge.',
      primaryAction: 'Confirm 850 Hacker Meals',
      actionSuccess: 'Meal Count Locked & Dispatched',
      urgency: 'Action by 6:00 PM',
      urgencyVariant: 'warning',
      details: {
        breakdown: '850 Lunches, 900 Midnight Pizzas, 750 Breakfast Boxes',
        dietary: '142 Verified Vegan / Gluten-Free / Halal custom badges',
        vendor: 'Sodexo Campus Hospitality (Contract #CT-991)',
        lead: 'Aarav Patel (Hospitality Lead)',
      },
    },
  ];

  const handleAction = (id) => {
    setActionsTaken((prev) => ({ ...prev, [id]: true }));
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Card
      title="Command Center"
      subtitle="Top 3 operational items requiring immediate attention"
      icon={Target}
      action={
        <Badge variant="neutral" size="sm">
          3 Items Active
        </Badge>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((item, idx) => {
          const isDone = !!actionsTaken[item.id];
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-canvas)',
                border: isDone ? '1px solid var(--color-success-border)' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '16px 18px',
                transition: 'all var(--transition-fast)',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-card-elevated)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isDone ? 'var(--text-muted)' : 'var(--text-heading)',
                      textDecoration: isDone ? 'line-through' : 'none',
                    }}
                  >
                    {item.title}
                  </h4>
                </div>

                <Badge variant={isDone ? 'success' : item.urgencyVariant} size="sm">
                  {isDone ? 'Resolved' : item.urgency}
                </Badge>
              </div>

              {/* Problem & Why it matters */}
              <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '12px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Problem:</strong> {item.problem}
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>Why it matters:</strong> {item.whyItMatters}
                </p>
              </div>

              {/* Progressive Disclosure (Optional Details) */}
              {isExpanded && (
                <div
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {Object.entries(item.details).map(([key, val]) => (
                      <div key={key}>
                        <span style={{ textTransform: 'capitalize', color: 'var(--text-muted)', fontWeight: '500' }}>
                          {key}:{' '}
                        </span>
                        <span style={{ color: 'var(--text-primary)' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {isExpanded ? (
                    <>
                      <span>Hide details</span>
                      <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      <span>View details</span>
                      <ChevronDown size={14} />
                    </>
                  )}
                </button>

                <Button
                  variant={isDone ? 'outline' : 'primary'}
                  size="sm"
                  icon={isDone ? Check : Zap}
                  onClick={() => handleAction(item.id)}
                  disabled={isDone}
                >
                  {isDone ? item.actionSuccess : item.primaryAction}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
