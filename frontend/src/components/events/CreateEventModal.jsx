import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import Button from '../ui/Button';

export default function CreateEventModal({ isOpen, onClose, onAddEvent }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Flagship Hackathon');
  const [dates, setDates] = useState('December 18–19, 2026');
  const [daysRemaining, setDaysRemaining] = useState('72');
  const [location, setLocation] = useState('Computing Complex Wing B');
  const [leadName, setLeadName] = useState('Anushka Baghel');
  const [leadRole, setLeadRole] = useState('Lead Operations Director');
  const [budget, setBudget] = useState('8500');
  const [targetParticipants, setTargetParticipants] = useState('350');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newEvt = {
      id: `evt-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: name.trim(),
      fullTitle: `${name.trim()} — Operations Initiative`,
      category,
      dates,
      daysRemaining: parseInt(daysRemaining, 10) || 30,
      location,
      status: 'upcoming',
      statusLabel: 'Upcoming (Scheduled)',
      statusVariant: 'warning',
      readinessScore: 25,
      currentPhase: 'Phase 1: Concept & Approvals',
      lead: {
        name: leadName,
        role: leadRole,
        avatar: leadName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase() || 'OP',
        email: `${leadName.toLowerCase().replace(/\s+/g, '.')}@clubops.ai`,
      },
      budget: {
        allocated: parseInt(budget, 10) || 5000,
        spent: 0,
        currency: '$',
        percentage: 0,
      },
      participants: {
        registered: 0,
        target: parseInt(targetParticipants, 10) || 200,
        percentage: 0,
        statusNote: 'Registration portal queued',
      },
      tasks: {
        total: 15,
        completed: 0,
        inProgress: 2,
        blocked: 0,
        percentage: 0,
      },
      volunteers: {
        assigned: 4,
        target: 15,
        percentage: 26.7,
        activeShifts: 0,
      },
      riskLevel: 'low',
      riskNote: 'Initial charter created. Pending committee chair review.',
      timelinePhases: [
        { name: 'Concept & Approvals', status: 'in-progress' },
        { name: 'Budget Approval', status: 'upcoming' },
        { name: 'Sponsorship & Venue', status: 'upcoming' },
        { name: 'Marketing & Registrations', status: 'upcoming' },
        { name: 'Execution', status: 'upcoming' },
      ],
      tags: [category, 'New Initiative'],
    };

    onAddEvent(newEvt);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(4, 7, 13, 0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-hover)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '560px',
          boxShadow: 'var(--shadow-elevated)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>
              Create New Chapter Event
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Initialize operational tracking, telemetry, and AI copilot monitors.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-muted)', padding: '4px' }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Event Name */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              Event Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cloud Native HackDay 2026"
              style={{ width: '100%' }}
            />
          </div>

          {/* Category & Date Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Category Track
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="Flagship Hackathon">Flagship Hackathon</option>
                <option value="Hardware & AI">Hardware & AI</option>
                <option value="Developer Conference">Developer Conference</option>
                <option value="Competitive Programming">Competitive Programming</option>
                <option value="Workshop & Mentorship">Workshop & Mentorship</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Event Dates
              </label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. Dec 18–19, 2026"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Location & Days Left */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Venue / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Auditorium Hall B"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Days Until Launch
              </label>
              <input
                type="number"
                value={daysRemaining}
                onChange={(e) => setDaysRemaining(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Lead Organizer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Lead Organizer Name
              </label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Lead Role
              </label>
              <input
                type="text"
                value={leadRole}
                onChange={(e) => setLeadRole(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Budget & Target Participants */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Allocated Budget ($)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Target Hackers / Attendees
              </label>
              <input
                type="number"
                value={targetParticipants}
                onChange={(e) => setTargetParticipants(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Plus} type="submit">
              Create Event Charter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
