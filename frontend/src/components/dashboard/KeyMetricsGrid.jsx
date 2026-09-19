import { DollarSign, Users, CheckSquare, ShieldCheck, TrendingUp } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { keyMetrics } from '../../data/mockData';

const metricIcons = {
  'metric-budget': DollarSign,
  'metric-hackers': Users,
  'metric-tasks': CheckSquare,
  'metric-volunteers': ShieldCheck,
};

const progressColors = {
  'metric-budget': 'var(--color-primary)',
  'metric-hackers': 'var(--color-info)',
  'metric-tasks': 'var(--color-warning)',
  'metric-volunteers': 'var(--color-success)',
};

export default function KeyMetricsGrid() {
  return (
    <div className="grid-4col" style={{ marginBottom: '20px' }}>
      {keyMetrics.map((metric) => {
        const Icon = metricIcons[metric.id] || CheckSquare;
        const barColor = progressColors[metric.id] || 'var(--color-primary)';

        return (
          <div
            key={metric.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-card)',
              transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            {/* Top row: Title + Icon + Status Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: barColor,
                  }}
                >
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                  {metric.title}
                </span>
              </div>
              <Badge variant={metric.statusType} size="sm">
                {metric.status}
              </Badge>
            </div>

            {/* Middle: Big Numbers */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'var(--text-heading)',
                    lineHeight: '1.2',
                  }}
                >
                  {metric.current}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  / {metric.total}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '10px' }}>
              <ProgressBar percentage={metric.percentage} color={barColor} height={6} />
            </div>

            {/* Bottom: Trend and Context note */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                <TrendingUp size={12} color="var(--color-primary)" />
                <span>{metric.trend}</span>
              </div>
              <span>{metric.percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
