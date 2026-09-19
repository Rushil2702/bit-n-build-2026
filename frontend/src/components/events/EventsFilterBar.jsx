import {
  Search,
  X,
  LayoutGrid,
  CalendarRange,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export default function EventsFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalResults,
  onResetFilters,
  statusCounts = {},
  categories = [],
}) {
  const statusTabs = [
    { id: 'all', label: 'All Events', count: statusCounts.all || 0 },
    { id: 'active', label: 'Active', count: statusCounts.active || 0, color: 'var(--color-info)' },
    { id: 'at-risk', label: 'At-Risk', count: statusCounts['at-risk'] || 0, color: 'var(--color-danger)' },
    { id: 'upcoming', label: 'Upcoming', count: statusCounts.upcoming || 0, color: 'var(--color-warning)' },
    { id: 'completed', label: 'Completed', count: statusCounts.completed || 0, color: 'var(--color-success)' },
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    categoryFilter !== 'all' ||
    sortBy !== 'readiness';

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '14px 18px',
        marginBottom: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Top Row: Search Input, Category Select, Sort Select, View Switcher */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Search Field */}
        <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '220px' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '11px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search event name, lead, venue, tags..."
            style={{
              width: '100%',
              paddingLeft: '32px',
              paddingRight: searchQuery ? '30px' : '12px',
              height: '36px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '7px',
              color: 'var(--text-primary)',
              fontSize: '13px',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                padding: '2px',
              }}
              aria-label="Clear search query"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={13} color="var(--text-muted)" />
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            style={{
              height: '36px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '7px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              padding: '0 10px',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Tracks & Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowUpDown size={13} color="var(--text-muted)" />
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            style={{
              height: '36px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '7px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              padding: '0 10px',
              cursor: 'pointer',
            }}
          >
            <option value="readiness">Sort: Readiness Score</option>
            <option value="date">Sort: Days Remaining (Soonest)</option>
            <option value="budget">Sort: Budget Size</option>
            <option value="name">Sort: Event Name (A-Z)</option>
          </select>
        </div>

        {/* View Mode Toggle: Grid vs Timeline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '7px',
            padding: '2px',
          }}
        >
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            title="Card Grid View"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: viewMode === 'grid' ? '600' : '400',
              color: viewMode === 'grid' ? 'var(--text-heading)' : 'var(--text-muted)',
              backgroundColor: viewMode === 'grid' ? 'var(--bg-card-elevated)' : 'transparent',
              border: viewMode === 'grid' ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            }}
          >
            <LayoutGrid size={13} />
            <span>Cards</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('timeline')}
            title="Milestone Roadmap Timeline"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: viewMode === 'timeline' ? '600' : '400',
              color: viewMode === 'timeline' ? 'var(--text-heading)' : 'var(--text-muted)',
              backgroundColor: viewMode === 'timeline' ? 'var(--bg-card-elevated)' : 'transparent',
              border: viewMode === 'timeline' ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            }}
          >
            <CalendarRange size={13} />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Status Filter Tabs & Results Count */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          paddingTop: '8px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
          {statusTabs.map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onStatusFilterChange(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: isSelected ? '600' : '400',
                  color: isSelected ? 'var(--text-heading)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--bg-sidebar-active)' : 'transparent',
                  border: isSelected
                    ? '1px solid var(--color-primary)'
                    : '1px solid var(--border-subtle)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '1px 5px',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--bg-badge-neutral)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results summary & Reset Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{totalResults}</strong> of {statusCounts.all || totalResults} events
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              style={{
                color: 'var(--color-primary)',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <X size={12} />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
