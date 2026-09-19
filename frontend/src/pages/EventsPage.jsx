import { useState } from 'react';
import { Check, Inbox } from 'lucide-react';
import EventsHeader from '../components/events/EventsHeader';
import EventsFilterBar from '../components/events/EventsFilterBar';
import EventCard from '../components/events/EventCard';
import AiEventIntelligence from '../components/events/AiEventIntelligence';
import EventsTimelineView from '../components/events/EventsTimelineView';
import CreateEventModal from '../components/events/CreateEventModal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { initialEvents } from '../data/eventsData';

export default function EventsPage({ onNavigate }) {
  const [events, setEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('readiness');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'timeline'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  // Distinct categories for filter
  const categories = Array.from(new Set(events.map((e) => e.category)));

  // Status counts
  const statusCounts = {
    all: events.length,
    active: events.filter((e) => e.status === 'active').length,
    'at-risk': events.filter((e) => e.status === 'at-risk').length,
    upcoming: events.filter((e) => e.status === 'upcoming').length,
    completed: events.filter((e) => e.status === 'completed').length,
  };

  // Filter & Sort Logic
  const filteredEvents = events
    .filter((e) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = e.name.toLowerCase().includes(q);
        const matchTitle = e.fullTitle.toLowerCase().includes(q);
        const matchLoc = e.location.toLowerCase().includes(q);
        const matchLead = e.lead.name.toLowerCase().includes(q);
        const matchCat = e.category.toLowerCase().includes(q);
        const matchTags = e.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchLoc && !matchLead && !matchCat && !matchTags) {
          return false;
        }
      }

      // Status
      if (statusFilter !== 'all' && e.status !== statusFilter) {
        return false;
      }

      // Category
      if (categoryFilter !== 'all' && e.category !== categoryFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          if (a.status === 'completed' && b.status !== 'completed') return 1;
          if (b.status === 'completed' && a.status !== 'completed') return -1;
          return a.daysRemaining - b.daysRemaining;
        case 'budget':
          return b.budget.allocated - a.budget.allocated;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'readiness':
        default:
          return b.readinessScore - a.readinessScore;
      }
    });

  // Action handlers
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    triggerToast(`Event created: "${newEvent.name}" initialized.`);
  };

  const handleSyncTelemetry = () => {
    triggerToast('AI Telemetry Synchronized: 6 events scanned, 2 resource alerts updated.');
  };

  const handleExportDeck = () => {
    triggerToast('Run-of-show portfolio summary generated & ready for download.');
  };

  const handleApplyRecommendation = (title) => {
    triggerToast(`AI Recommendation executed: "${title}"`);
  };

  const handleTriggerDiagnostic = (event) => {
    triggerToast(`AI Sentinel Diagnostic: ${event.name} readiness score at ${event.readinessScore}%`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('readiness');
  };

  return (
    <div className="events-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            right: '32px',
            backgroundColor: 'var(--bg-card-elevated)',
            border: '1px solid var(--border-hover)',
            borderRadius: '8px',
            padding: '10px 18px',
            fontSize: '13px',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-elevated)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 999,
          }}
        >
          <Check size={16} color="var(--color-success)" />
          {toastMessage}
        </div>
      )}

      {/* 1. Header with Portfolio Summary KPIs */}
      <EventsHeader
        events={events}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onSyncClick={handleSyncTelemetry}
        onExportClick={handleExportDeck}
      />

      {/* 2. Main 2-Column Desktop Grid for 1440px+ */}
      <div className="grid-2col-main-side">
        {/* Left Column (8fr): Filter Bar & Events List / Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Filter, Search & View Controls */}
          <EventsFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={filteredEvents.length}
            onResetFilters={handleResetFilters}
            statusCounts={statusCounts}
            categories={categories}
          />

          {/* Render Either Grid Cards View OR Timeline Roadmap View */}
          {viewMode === 'timeline' ? (
            <EventsTimelineView
              events={filteredEvents}
              onNavigate={onNavigate}
            />
          ) : (
            <div>
              {filteredEvents.length === 0 ? (
                <Card>
                  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-muted-alpha)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        margin: '0 auto 16px',
                      }}
                    >
                      <Inbox size={24} />
                    </div>
                    <h4
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--text-heading)',
                        marginBottom: '6px',
                      }}
                    >
                      No events matching active filters
                    </h4>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        maxWidth: '380px',
                        margin: '0 auto 20px',
                      }}
                    >
                      Try broadening your search term or clearing the current status filter.
                    </p>
                    <Button variant="outline" size="sm" onClick={handleResetFilters}>
                      Clear Active Filters
                    </Button>
                  </div>
                </Card>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredEvents.map((evt) => (
                    <EventCard
                      key={evt.id}
                      event={evt}
                      onNavigate={onNavigate}
                      onTriggerDiagnostic={handleTriggerDiagnostic}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (4fr): AI Event Intelligence & Planner Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AiEventIntelligence
            onApplyRecommendation={handleApplyRecommendation}
          />
        </div>
      </div>

      {/* New Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
