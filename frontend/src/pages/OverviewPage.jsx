import React from 'react';
import EventContextBanner from '../components/dashboard/EventContextBanner';
import AiOperationalAlert from '../components/dashboard/AiOperationalAlert';
import KeyMetricsGrid from '../components/dashboard/KeyMetricsGrid';
import ReadinessProgression from '../components/dashboard/ReadinessProgression';
import TodayPriorities from '../components/dashboard/TodayPriorities';
import VolunteerRoster from '../components/dashboard/VolunteerRoster';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import LiveActivityStream from '../components/dashboard/LiveActivityStream';
import ProactiveRiskRadar from '../components/dashboard/ProactiveRiskRadar';
import OperationalShortcuts from '../components/dashboard/OperationalShortcuts';
import AiCopilotWidget from '../components/dashboard/AiCopilotWidget';

export default function OverviewPage() {
  return (
    <div className="overview-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Event Context / Header */}
      <EventContextBanner />

      {/* 2. AI Operational Alert */}
      <AiOperationalAlert />

      {/* 3. Key Metrics (4 KPI Cards) */}
      <KeyMetricsGrid />

      {/* 4. Main 2-Column Desktop Grid for 1440px+ */}
      <div className="grid-2col-main-side">
        {/* Left / Major Operational Workstream Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Hackathon Readiness Progression */}
          <ReadinessProgression />

          {/* Today's Priorities */}
          <TodayPriorities />

          {/* Proactive Risk Radar */}
          <ProactiveRiskRadar />

          {/* Operational Shortcuts */}
          <OperationalShortcuts />
        </div>

        {/* Right / AI Intelligence & People Ops Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AI Copilot Panel */}
          <AiCopilotWidget />

          {/* Upcoming Deadlines */}
          <UpcomingDeadlines />

          {/* Volunteer Roster */}
          <VolunteerRoster />

          {/* Live Activity Stream */}
          <LiveActivityStream />
        </div>
      </div>
    </div>
  );
}
