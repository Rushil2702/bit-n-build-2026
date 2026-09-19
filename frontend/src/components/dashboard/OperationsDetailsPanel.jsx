import { useState } from 'react';
import { CalendarClock, Users, Radio } from 'lucide-react';
import UpcomingDeadlines from './UpcomingDeadlines';
import VolunteerRoster from './VolunteerRoster';
import LiveActivityStream from './LiveActivityStream';

export default function OperationsDetailsPanel() {
  const [activeTab, setActiveTab] = useState('deadlines');

  const tabs = [
    { id: 'deadlines', label: 'Upcoming Deadlines', icon: CalendarClock, count: 5 },
    { id: 'volunteers', label: 'Volunteer Squads', icon: Users, count: 42 },
    { id: 'activity', label: 'Live Stream', icon: Radio, count: 'Live' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Progressive Disclosure Secondary Tab Switcher */}
      <div
        style={{
          display: 'flex',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px',
          padding: '4px',
          gap: '4px',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 10px',
                borderRadius: '7px',
                fontSize: '12px',
                fontWeight: isSelected ? '600' : '500',
                backgroundColor: isSelected ? 'var(--bg-card-elevated)' : 'transparent',
                color: isSelected ? 'var(--text-heading)' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--border-default)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Icon size={14} color={isSelected ? 'var(--color-primary)' : 'var(--text-muted)'} />
              <span style={{ whiteSpace: 'nowrap' }}>{tab.label}</span>
              <span
                style={{
                  fontSize: '10px',
                  color: isSelected ? 'var(--color-primary)' : 'var(--text-muted)',
                  backgroundColor: 'var(--bg-muted-alpha)',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  fontWeight: '600',
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Render Active Secondary View */}
      <div>
        {activeTab === 'deadlines' && <UpcomingDeadlines />}
        {activeTab === 'volunteers' && <VolunteerRoster />}
        {activeTab === 'activity' && <LiveActivityStream />}
      </div>
    </div>
  );
}
