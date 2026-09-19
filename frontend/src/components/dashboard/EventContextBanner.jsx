import { Calendar, MapPin, Flag, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';
import { eventDetails } from '../../data/mockData';

export default function EventContextBanner() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '24px 28px',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Accent Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '240px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Left: Event Details & Meta */}
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Badge variant="info" size="sm" dot>
              {eventDetails.status}
            </Badge>
            <Badge variant="neutral" size="sm">
              {eventDetails.currentSprint}
            </Badge>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '22px',
              fontWeight: '700',
              color: 'var(--text-heading)',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
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
              <MapPin size={14} color="var(--color-primary)" />
              <span>{eventDetails.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flag size={14} color="var(--color-primary)" />
              <span>{eventDetails.chapter}</span>
            </div>
          </div>
        </div>

        {/* Right: Operations Health & Quick Stats Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '14px 20px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
          }}
        >
          {/* Days Left Widget */}
          <div style={{ textAlign: 'center', paddingRight: '20px', borderRight: '1px solid var(--border-subtle)' }}>
            <div
              style={{
                fontSize: '26px',
                fontWeight: '800',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-brand)',
                lineHeight: '1',
              }}
            >
              {eventDetails.daysRemaining}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Days to Launch
            </div>
          </div>

          {/* Readiness Score Widget */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: 'var(--color-success)',
                  fontFamily: 'var(--font-brand)',
                  lineHeight: '1',
                }}
              >
                {eventDetails.readinessScore}%
              </span>
              <CheckCircle2 size={18} color="var(--color-success)" />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Overall Readiness
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
