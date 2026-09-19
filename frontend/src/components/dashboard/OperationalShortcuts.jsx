import { useState } from 'react';
import {
  FileText,
  Send,
  Receipt,
  AlertTriangle,
  Zap,
  Check,
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { operationalShortcuts } from '../../data/mockData';

const iconMap = {
  FileText: FileText,
  Send: Send,
  Receipt: Receipt,
  AlertTriangle: AlertTriangle,
};

export default function OperationalShortcuts() {
  const [activeShortcut, setActiveShortcut] = useState(null);

  const handleShortcutClick = (id) => {
    setActiveShortcut(id);
    setTimeout(() => setActiveShortcut(null), 2500);
  };

  return (
    <Card
      title="Operational Shortcuts"
      subtitle="High-frequency event execution actions"
      icon={Zap}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        {operationalShortcuts.map((sc) => {
          const Icon = iconMap[sc.icon] || FileText;
          const isTriggered = activeShortcut === sc.id;

          return (
            <button
              key={sc.id}
              onClick={() => handleShortcutClick(sc.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '14px 16px',
                backgroundColor: isTriggered ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-canvas)',
                border: isTriggered ? '1px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!isTriggered) {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isTriggered) {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-canvas)';
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: isTriggered ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.04)',
                    color: isTriggered ? '#ffffff' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {isTriggered ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <Badge variant={isTriggered ? 'success' : 'neutral'} size="sm">
                  {isTriggered ? 'Triggered' : sc.badge}
                </Badge>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-heading)',
                  marginBottom: '3px',
                }}
              >
                {sc.title}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  lineHeight: '1.3',
                }}
              >
                {sc.desc}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
