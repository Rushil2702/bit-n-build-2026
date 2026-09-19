import { Calendar, MapPin, Flag, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';
import { eventDetails } from '../../data/mockData';

export default function EventContextBanner() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div
      className="bg-halftone-pattern"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '26px 30px',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Spider-Verse Subtle Atmospheric Lights */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '20%',
          width: '280px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          right: '-40px',
          width: '220px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: Greeting & Current Event Context */}
        <div style={{ flex: '1 1 520px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--color-primary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {getGreeting()}, {eventDetails.leadOrganizer.name.split(' ')[0]}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <Badge variant="neutral" size="sm">
              {eventDetails.currentSprint}
            </Badge>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '24px',
              fontWeight: '800',
              color: 'var(--text-heading)',
              letterSpacing: '-0.025em',
              marginBottom: '12px',
              lineHeight: '1.2',
            }}
          >
            {eventDetails.fullTitle}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} color="var(--color-primary)" />
              <span>{eventDetails.dates}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="var(--color-secondary)" />
              <span>{eventDetails.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flag size={14} color="var(--text-muted)" />
              <span>{eventDetails.chapter}</span>
            </div>
          </div>
        </div>

        {/* Right: Days to Launch & Readiness Meter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px 24px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Days Left Countdown */}
          <div style={{ textAlign: 'center', paddingRight: '20px', borderRight: '1px solid var(--border-subtle)' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: '900',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-brand)',
                lineHeight: '1',
                letterSpacing: '-0.03em',
              }}
            >
              T-{eventDetails.daysRemaining}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginTop: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600',
              }}
            >
              Days to Launch
            </div>
          </div>

          {/* Readiness Score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: '900',
                  color: 'var(--color-success)',
                  fontFamily: 'var(--font-brand)',
                  lineHeight: '1',
                  letterSpacing: '-0.03em',
                }}
              >
                {eventDetails.readinessScore}%
              </span>
              <CheckCircle2 size={20} color="var(--color-success)" />
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginTop: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600',
              }}
            >
              Readiness Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
