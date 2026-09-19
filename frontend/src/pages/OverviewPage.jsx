import EventContextBanner from '../components/dashboard/EventContextBanner';
import SpiderSenseAlert from '../components/dashboard/SpiderSenseAlert';
import PersonalWorkspace from '../components/dashboard/PersonalWorkspace';
import EventPulse from '../components/dashboard/EventPulse';
import CommandCenter from '../components/dashboard/CommandCenter';
import TodayPriorities from '../components/dashboard/TodayPriorities';
import AiCopilotWidget from '../components/dashboard/AiCopilotWidget';
import OperationsDetailsPanel from '../components/dashboard/OperationsDetailsPanel';

export default function OverviewPage({ onNavigate }) {
  return (
    <div className="overview-page" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Hero / Event Context */}
      <EventContextBanner />

      {/* 2. Spider-Sense Signature Anomaly Alert */}
      <SpiderSenseAlert />

      {/* 3. Personal Workspace (My Tasks, Meetings, Volunteers, Active Events) */}
      <PersonalWorkspace onNavigate={onNavigate} />

      {/* 4. Core Operations 2-Column Split (8fr / 4fr) */}
      <div className="grid-2col-main-side">
        {/* Left Column: Event Lifecycle, Command Center, Priorities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* 4. Event Pulse: Planning → Setup → Live → Wrap-up */}
          <EventPulse />

          {/* 5. Command Center (Top 3 items requiring immediate attention) */}
          <CommandCenter />

          {/* 6. Today's Priorities (Clean task list, minimal AI noise) */}
          <TodayPriorities />
        </div>

        {/* Right Column: Quiet AI Assistant & Secondary Operations Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* 7. AI Operations Assistant (Visually secondary helper) */}
          <AiCopilotWidget />

          {/* Progressive Disclosure Panel: Deadlines, Volunteer Squads & Live Stream */}
          <OperationsDetailsPanel />
        </div>
      </div>
    </div>
  );
}
