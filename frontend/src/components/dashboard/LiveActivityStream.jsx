import { Activity } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { liveActivityStream } from '../../data/mockData';

export default function LiveActivityStream() {
  return (
    <Card
      title="Live Activity Stream"
      subtitle="Operational telemetry & committee event feed"
      icon={Activity}
      action={
        <Badge variant="info" size="sm" dot>
          Real-time
        </Badge>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {liveActivityStream.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            {/* User Avatar */}
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: item.avatar === 'AI' ? 'var(--color-ai-light)' : 'var(--bg-card-elevated)',
                border: item.avatar === 'AI' ? '1px solid var(--color-ai-border)' : '1px solid var(--border-default)',
                color: item.avatar === 'AI' ? 'var(--color-ai)' : 'var(--text-primary)',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {item.avatar}
            </div>

            {/* Content Body */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-heading)' }}>{item.actor}</span>{' '}
                <span style={{ color: 'var(--text-secondary)' }}>{item.action}</span>{' '}
                <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>{item.target}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '4px',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>{item.timestamp}</span>
                <span>•</span>
                <span style={{ textTransform: 'capitalize' }}>{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
