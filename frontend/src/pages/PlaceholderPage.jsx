import { ArrowLeft, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { NAV_ITEMS } from '../data/navigation';

export default function PlaceholderPage({ routeId, onNavigate }) {
  const item = NAV_ITEMS.find((n) => n.id === routeId) || {
    label: routeId,
    icon: Sparkles,
  };
  const Icon = item.icon;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <Card>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              margin: '0 auto 18px',
            }}
          >
            <Icon size={28} />
          </div>

          <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <Badge variant="info" size="sm" dot>
              Milestone 2 Roadmap
            </Badge>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-heading)',
              marginBottom: '10px',
            }}
          >
            {item.label} Module
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              margin: '0 auto 28px',
              lineHeight: '1.6',
            }}
          >
            The dedicated view for <strong>{item.label}</strong> is scheduled for the next
            implementation phase. Use the <strong>Overview Dashboard</strong> to monitor live status,
            deadlines, AI warnings, and priority queues.
          </p>

          <Button
            variant="primary"
            icon={ArrowLeft}
            onClick={() => onNavigate('overview')}
          >
            Return to Overview Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
