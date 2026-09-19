import { Search, X, User } from 'lucide-react';

export default function TaskFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onlyMyTasks,
  onToggleMyTasks,
  totalResults,
  onResetFilters,
}) {
  const statusOptions = [
    { id: 'all', label: 'All Tasks' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'today', label: 'Due Today' },
    { id: 'blocked', label: 'Blocked' },
    { id: 'completed', label: 'Completed' },
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    categoryFilter !== 'all' ||
    onlyMyTasks;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '14px 18px',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Top Row: Search Input & Quick Status Pills */}
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
        <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '240px' }}>
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
            placeholder="Search task title, description, or lead..."
            style={{
              width: '100%',
              paddingLeft: '32px',
              paddingRight: '12px',
              height: '36px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '7px',
              fontSize: '13px',
              color: 'var(--text-primary)',
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
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Segmented Control */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '3px',
            gap: '2px',
            overflowX: 'auto',
          }}
        >
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onStatusFilterChange(opt.id)}
                style={{
                  padding: '5px 11px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--text-heading)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-card-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--border-default)' : '1px solid transparent',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Selectors & Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          {/* Priority Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Priority:
            </span>
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
              style={{
                height: '32px',
                padding: '4px 10px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              style={{
                height: '32px',
                padding: '4px 10px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <option value="all">All Committees</option>
              <option value="Tech & Infra">Tech & Infra</option>
              <option value="Sponsorship">Sponsorship</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Logistics">Logistics</option>
              <option value="PR & Web">PR & Web</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Safety">Safety</option>
            </select>
          </div>

          {/* Only My Tasks Toggle Button */}
          <button
            onClick={onToggleMyTasks}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: onlyMyTasks ? 'var(--color-primary-light)' : 'var(--bg-canvas)',
              border: onlyMyTasks ? '1px solid var(--color-primary)' : '1px solid var(--border-subtle)',
              color: onlyMyTasks ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <User size={13} />
            <span>Assigned to Me (Anushka)</span>
          </button>
        </div>

        {/* Right side: Results count & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Showing <strong>{totalResults}</strong> tasks
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              style={{
                fontSize: '12px',
                color: 'var(--color-primary)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
