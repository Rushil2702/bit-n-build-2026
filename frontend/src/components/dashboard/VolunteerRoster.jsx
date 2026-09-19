import { Users } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { volunteerRoster } from '../../data/mockData';

export default function VolunteerRoster() {
  const totalOnDuty = volunteerRoster.reduce((sum, sq) => sum + sq.onDuty, 0);
  const totalAssigned = volunteerRoster.reduce((sum, sq) => sum + sq.assigned, 0);

  return (
    <Card
      title="Volunteer Roster & Squads"
      subtitle={`${totalOnDuty} of ${totalAssigned} personnel currently deployed`}
      icon={Users}
      action={
        <Badge variant="success" size="sm" dot>
          {totalOnDuty} Active
        </Badge>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {volunteerRoster.map((squad, idx) => (
          <div
            key={idx}
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
            }}
          >
            {/* Squad Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-heading)' }}>
                  {squad.squad}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '6px' }}>
                  • Lead: {squad.lead}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {squad.onDuty}/{squad.assigned}
                </span>
                <Badge variant={squad.onDuty === squad.assigned ? 'success' : 'info'} size="sm">
                  {squad.status}
                </Badge>
              </div>
            </div>

            {/* Members chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {squad.members.map((member, mIdx) => (
                <div
                  key={mIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 8px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '5px',
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor:
                        member.status === 'On Shift' || member.status === 'On Duty'
                          ? 'var(--color-success)'
                          : member.status === 'Break'
                          ? 'var(--color-warning)'
                          : 'var(--text-muted)',
                    }}
                  />
                  <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{member.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({member.role})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
