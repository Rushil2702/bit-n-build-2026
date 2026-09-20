import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [meetingText, setMeetingText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Theme State: 'dark' | 'light' | 'system'
  const [themeMode, setThemeMode] = useState('dark');
  const [resolvedTheme, setResolvedTheme] = useState('dark');

  useEffect(() => {
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e) => setResolvedTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedTheme(themeMode);
    }
  }, [themeMode]);

  const isDark = resolvedTheme === 'dark';

  const theme = {
    bg: isDark ? '#090a0f' : '#f8fafc',
    sidebarBg: isDark ? '#0d0f17' : '#ffffff',
    cardBg: isDark ? '#0e121d' : '#ffffff',
    innerCardBg: isDark ? '#090b12' : '#f1f5f9',
    border: isDark ? '#1a2033' : '#e2e8f0',
    subBorder: isDark ? '#161b2c' : '#cbd5e1',
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#475569',
    textMuted: isDark ? '#64748b' : '#94a3b8',
    activeNav: isDark ? '#1e2438' : '#e2e8f0',
  };

  const [actionItems, setActionItems] = useState([
    { id: 1, title: 'Finalize Sponsorship Brochure for TechFest', assignee: 'Rohan P.', tag: 'Logistics', deadline: 'Tomorrow', status: 'In Progress' },
    { id: 2, title: 'Confirm Main Auditorium key-handover', assignee: 'Priya S.', tag: 'Operations', deadline: '21 Sep', status: 'Pending' },
    { id: 3, title: 'Ship Instagram speaker reveal carousel', assignee: 'Anushka B.', tag: 'Design', deadline: 'Today', status: 'Done' },
    { id: 4, title: 'Procure badge lanyards & QR scanners', assignee: 'Kunal V.', tag: 'Supplies', deadline: '22 Sep', status: 'Pending' }
  ]);

  const [risks, setRisks] = useState([
    { id: 1, level: 'CRITICAL', title: 'Faculty NOC delayed', impact: 'Hall entry permission blocked without dean signature.', daysLeft: '2 days' },
    { id: 2, level: 'ELEVATED', title: 'Keynote flight tickets unbooked', impact: 'Budget clearance pending with college finance office.', daysLeft: '4 days' }
  ]);

  const handleExtract = () => {
    if (!meetingText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setActionItems(prev => [
        { id: Date.now(), title: 'Deploy stage mic check & backup mixers', assignee: 'Aman K.', tag: 'Tech', deadline: '22 Sep', status: 'Pending' },
        ...prev
      ]);
      setRisks(prev => [
        { id: Date.now(), level: 'CRITICAL', title: 'WiFi router limit in Lab 2', impact: 'Bandwidth choke during hackathon live judging.', daysLeft: '1 day' },
        ...prev
      ]);
      setMeetingText('');
      setIsProcessing(false);
    }, 700);
  };

  const updateTaskStatus = (id, newStatus) => {
    setActionItems(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done':
        return { bg: 'rgba(34, 197, 94, 0.12)', color: '#16a34a', border: '1px solid rgba(34, 197, 94, 0.25)' };
      case 'In Progress':
        return { bg: 'rgba(14, 165, 233, 0.12)', color: '#0284c7', border: '1px solid rgba(14, 165, 233, 0.25)' };
      default:
        return { bg: 'rgba(245, 158, 11, 0.12)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.25)' };
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.bg, color: theme.textPrimary, fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{ width: '260px', background: theme.sidebarBg, borderRight: `1px solid ${theme.border}`, padding: '24px 18px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>C</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.3px', color: theme.textPrimary }}>ClubOps</div>
            <div style={{ fontSize: '11px', color: theme.textMuted }}>Operations OS</div>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontWeight: '600', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', paddingLeft: '8px' }}>Workspace</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'overview', label: 'Command Center', icon: '⌘' },
            { id: 'tasks', label: 'Task Matrix', icon: '⊞' },
            { id: 'risks', label: 'Risk Radar', icon: '◬' },
            { id: 'docs', label: 'Club Archive', icon: '▤' }
          ].map(tab => (
            <div
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: currentTab === tab.id ? '600' : '400',
                color: currentTab === tab.id ? theme.textPrimary : theme.textSecondary,
                background: currentTab === tab.id ? theme.activeNav : 'transparent',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '14px', opacity: 0.8 }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </nav>

        {/* Theme Toggles */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: theme.innerCardBg, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '4px', display: 'flex', gap: '4px' }}>
            {[
              { id: 'light', label: '☀️ Light' },
              { id: 'dark', label: '🌙 Dark' },
              { id: 'system', label: '💻 Auto' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setThemeMode(m.id)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: themeMode === m.id ? (isDark ? '#27314a' : '#ffffff') : 'transparent',
                  color: themeMode === m.id ? theme.textPrimary : theme.textMuted,
                  borderRadius: '6px',
                  padding: '6px 0',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', background: theme.innerCardBg, border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: theme.textPrimary }}>TechFest 2026</span>
            </div>
            <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '4px' }}>CVM University Chapter</p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main style={{ flex: 1, padding: '36px 44px', overflowY: 'auto' }}>

        {/* TAB 1: COMMAND CENTER (OVERVIEW) */}
        {currentTab === 'overview' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px', color: theme.textPrimary }}>Execution Dashboard</h1>
                <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>Real-time team synchronization and auto-extracted action vectors.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.textSecondary, padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>Share View</button>
                <button onClick={() => setCurrentTab('tasks')} style={{ background: '#6366f1', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>View Task Board</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
              {[
                { label: 'Active Workstreams', value: '04', trend: 'Healthy', color: '#6366f1' },
                { label: 'Pending Action Items', value: String(actionItems.length), trend: '2 Due Today', color: '#0284c7' },
                { label: 'Flagged Blockers', value: String(risks.length), trend: 'Attention Required', color: '#ef4444' },
                { label: 'Volunteer Readiness', value: '88%', trend: '+4% this week', color: '#16a34a' }
              ].map((card, i) => (
                <div key={i} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, padding: '18px 20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: theme.textMuted, fontWeight: '500' }}>{card.label}</div>
                  <div style={{ fontSize: '26px', fontWeight: '700', margin: '8px 0 4px', color: theme.textPrimary }}>{card.value}</div>
                  <div style={{ fontSize: '11px', color: card.color, fontWeight: '500' }}>{card.trend}</div>
                </div>
              ))}
            </div>

            {/* AI Parser */}
            <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>PARSER ENGINE</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: theme.textPrimary }}>Transcript & Chat Ingestion</span>
                </div>
                <span style={{ fontSize: '11px', color: theme.textMuted }}>Paste rough discussion text</span>
              </div>
              <textarea
                value={meetingText}
                onChange={(e) => setMeetingText(e.target.value)}
                placeholder="Paste raw conversation, WhatsApp transcript, or rough bullet points here..."
                rows="3"
                style={{ width: '100%', background: theme.innerCardBg, border: `1px solid ${theme.border}`, borderRadius: '6px', padding: '12px 14px', color: theme.textPrimary, fontSize: '13px', outline: 'none', resize: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={handleExtract}
                  style={{ background: isProcessing ? '#475569' : 'linear-gradient(135deg, #4f46e5, #6366f1)', border: 'none', color: '#fff', padding: '9px 18px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {isProcessing ? 'Deconstructing context...' : 'Extract Deliverables →'}
                </button>
              </div>
            </div>

            {/* Split View */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '20px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '600', color: theme.textPrimary, marginBottom: '16px' }}>Action Items</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {actionItems.slice(0, 4).map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '6px', background: theme.innerCardBg, border: `1px solid ${theme.subBorder}` }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '500', color: theme.textPrimary }}>{item.title}</span>
                          <span style={{ fontSize: '10px', background: isDark ? '#181e30' : '#e2e8f0', color: theme.textSecondary, padding: '2px 6px', borderRadius: '3px' }}>{item.tag}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: theme.textMuted }}>Assigned: {item.assignee} • Due: {item.deadline}</span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: '600', padding: '3px 8px', borderRadius: '4px', ...getStatusBadge(item.status) }}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '20px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '600', color: theme.textPrimary, marginBottom: '16px' }}>Vulnerability Log</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {risks.map(r => (
                    <div key={r.id} style={{ padding: '14px', borderRadius: '6px', background: theme.innerCardBg, border: `1px solid ${theme.subBorder}`, borderLeft: '3px solid #ef4444' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: theme.textPrimary }}>{r.title}</span>
                        <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: '700' }}>{r.level}</span>
                      </div>
                      <p style={{ fontSize: '11px', color: theme.textSecondary }}>{r.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: KANBAN BOARD */}
        {currentTab === 'tasks' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.textPrimary }}>Task Matrix</h1>
              <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>Manage operational stages and volunteer distribution.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
              {['Pending', 'In Progress', 'Done'].map(statusCol => (
                <div key={statusCol} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textPrimary }}>{statusCol}</h3>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>{actionItems.filter(t => t.status === statusCol).length}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {actionItems.filter(t => t.status === statusCol).map(task => (
                      <div key={task.id} style={{ background: theme.innerCardBg, border: `1px solid ${theme.subBorder}`, borderRadius: '8px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', background: isDark ? '#181e30' : '#e2e8f0', color: theme.textSecondary, padding: '2px 6px', borderRadius: '4px' }}>{task.tag}</span>
                          <span style={{ fontSize: '11px', color: theme.textMuted }}>{task.deadline}</span>
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: '500', color: theme.textPrimary, marginBottom: '10px' }}>{task.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: theme.textSecondary }}>👤 {task.assignee}</span>
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                            style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontSize: '10px', borderRadius: '4px', padding: '3px 6px', cursor: 'pointer', outline: 'none' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RISK RADAR */}
        {currentTab === 'risks' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.textPrimary }}>Vulnerability Radar</h1>
              <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>Automated blockers, timeline bottlenecks, and pending institutional permissions.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {risks.map(r => (
                <div key={r.id} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: theme.textPrimary }}>{r.title}</h3>
                    <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700', background: 'rgba(239, 68, 68, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>{r.level}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: theme.textSecondary, marginBottom: '10px' }}>{r.impact}</p>
                  <span style={{ fontSize: '11px', color: theme.textMuted }}>Window Buffer: {r.daysLeft}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ARCHIVE / KNOWLEDGE BASE */}
        {currentTab === 'docs' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.textPrimary }}>Club Archive & Guidelines</h1>
              <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>Historical templates, Dean office approvals, and past sponsorship brochures.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {['TechFest 2025 Sponsorship Deck.pdf', 'Auditorium Booking Form Format.docx', 'Volunteer Code of Conduct.pdf'].map((doc, idx) => (
                <div key={idx} style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '18px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>📄</div>
                  <h4 style={{ fontSize: '13px', fontWeight: '500', color: theme.textPrimary }}>{doc}</h4>
                  <span style={{ fontSize: '11px', color: '#6366f1', marginTop: '8px', display: 'inline-block', cursor: 'pointer' }}>View Document →</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}