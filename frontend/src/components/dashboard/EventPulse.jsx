import { useState } from 'react';
import { Activity, Check, Calendar, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function EventPulse() {
  const [selectedStage, setSelectedStage] = useState('setup');

  const stages = [
    {
      id: 'planning',
      label: 'Planning',
      status: 'Completed',
      statusVariant: 'success',
      dates: 'Aug 15 – Sep 30',
      progress: 100,
      isDone: true,
      isActive: false,
      summary: 'Auditorium reserved, core organizing leads appointed, portal live.',
      keyMilestones: [
        'Budget sign-off ($22,000 allocated)',
        'Devfolio portal registration kickoff',
        'Dean of Student Affairs venue approval',
      ],
    },
    {
      id: 'setup',
      label: 'Setup',
      status: 'Active (78%)',
      statusVariant: 'warning',
      dates: 'Oct 01 – Oct 23',
      progress: 78,
      isDone: false,
      isActive: true,
      summary: 'Hardware track lab testing, volunteer shifts, sponsor badge cutoffs.',
      keyMilestones: [
        'Lab 4 32A distribution box installation',
        '500 NFC check-in cards sample run',
        'Final judge flight travel clearances',
      ],
    },
    {
      id: 'live',
      label: 'Live',
      status: 'In 18 Days',
      statusVariant: 'info',
      dates: 'Oct 24 – Oct 26',
      progress: 0,
      isDone: false,
      isActive: false,
      summary: '842 registered hackers, 48h marathon, expo judging & keynotes.',
      keyMilestones: [
        'Opening Ceremony & Keynote (10:00 AM)',
        'Midnight pizza distribution (900 boxes)',
        'Grand Jury Stage finals & prize ceremony',
      ],
    },
    {
      id: 'wrapup',
      label: 'Wrap-up',
      status: 'Scheduled',
      statusVariant: 'neutral',
      dates: 'Oct 27 – Nov 05',
      progress: 0,
      isDone: false,
      isActive: false,
      summary: 'Prize disbursements, sponsor ROI dossiers, executive post-mortem.',
      keyMilestones: [
        'Direct bank prize distribution to winners',
        'Sponsor engagement analytics delivery',
        'Volunteer certificate generation',
      ],
    },
  ];

  const currentStage = stages.find((s) => s.id === selectedStage) || stages[1];

  return (
    <Card
      title="Event Pulse"
      subtitle="Lifecycle pipeline: Planning → Setup → Live → Wrap-up"
      icon={Activity}
      action={
        <Badge variant="neutral" size="sm">
          Current Sprint: Setup (T-18 Days)
        </Badge>
      }
    >
      {/* 4-Stage Horizontal Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        {stages.map((stage) => {
          const isCurrentSelected = stage.id === selectedStage;

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: isCurrentSelected ? 'var(--bg-card-elevated)' : 'var(--bg-canvas)',
                border: isCurrentSelected
                  ? '1px solid var(--border-accent)'
                  : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (!isCurrentSelected) e.currentTarget.style.borderColor = 'var(--border-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isCurrentSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Stage Progress Line Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: stage.isDone
                      ? 'var(--color-success)'
                      : stage.isActive
                      ? 'var(--color-primary)'
                      : 'var(--bg-muted-alpha)',
                    border: stage.isActive
                      ? '2px solid rgba(225, 29, 72, 0.4)'
                      : '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700',
                  }}
                >
                  {stage.isDone ? <Check size={13} strokeWidth={3} /> : stage.isActive ? '●' : '○'}
                </div>

                <Badge variant={stage.statusVariant} size="sm">
                  {stage.status}
                </Badge>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: isCurrentSelected ? 'var(--text-heading)' : 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {stage.label}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Calendar size={11} />
                <span>{stage.dates}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail Pane */}
      <div
        style={{
          backgroundColor: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text-heading)',
              }}
            >
              {currentStage.label} Stage Overview
            </span>
            <Badge variant={currentStage.statusVariant} size="sm">
              {currentStage.status}
            </Badge>
          </div>

          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Schedule: {currentStage.dates}
          </span>
        </div>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '14px',
          }}
        >
          {currentStage.summary}
        </p>

        {/* Milestone Checklist */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              marginBottom: '8px',
            }}
          >
            Key Track Milestones:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {currentStage.keyMilestones.map((ms) => (
              <div
                key={ms}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                }}
              >
                <ChevronRight size={13} color="var(--color-primary)" />
                <span>{ms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
