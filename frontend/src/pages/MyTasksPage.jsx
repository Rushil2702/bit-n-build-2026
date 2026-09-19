import { useState } from 'react';
import { Plus, Check, ListTodo } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TaskMetricsHeader from '../components/tasks/TaskMetricsHeader';
import TaskFilterBar from '../components/tasks/TaskFilterBar';
import TaskItem from '../components/tasks/TaskItem';
import AiTaskIntelligence from '../components/tasks/AiTaskIntelligence';
import { initialTasks } from '../data/tasksData';

export default function MyTasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [onlyMyTasks, setOnlyMyTasks] = useState(false);

  // Quick Add Task Form State
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Tech & Infra');
  const [newPriority, setNewPriority] = useState('HIGH');
  const [newDeadline, setNewDeadline] = useState('Today, 5:00 PM');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Toggle main task completion
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus = t.status === 'completed' ? 'in-progress' : 'completed';
          return {
            ...t,
            status: newStatus,
            subtasks: t.subtasks?.map((st) => ({
              ...st,
              completed: newStatus === 'completed',
            })),
          };
        }
        return t;
      })
    );
  };

  // Status dropdown change
  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    triggerToast(`Task status updated to ${newStatus}`);
  };

  // Subtask checkbox toggle
  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const allDone = updatedSubtasks.every((st) => st.completed);
          return {
            ...t,
            subtasks: updatedSubtasks,
            status: allDone ? 'completed' : t.status === 'completed' ? 'in-progress' : t.status,
          };
        }
        return t;
      })
    );
  };

  // Apply AI critical path sequence
  const handleApplySequence = () => {
    const priorityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    setTasks((prev) =>
      [...prev].sort((a, b) => {
        // Incomplete first
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (b.status === 'completed' && a.status !== 'completed') return -1;
        // Then priority
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      })
    );
    triggerToast('Tasks prioritized according to AI Critical Path recommendation.');
  };

  // Quick Add Task Submit
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: 'Created via Quick Action bar for immediate squad dispatch.',
      category: newCategory,
      priority: newPriority,
      status: 'pending',
      dueDate: newDeadline,
      dueCategory: newDeadline.toLowerCase().includes('today') ? 'today' : 'upcoming',
      isOverdue: false,
      assignee: {
        name: 'Anushka Baghel',
        role: 'Lead Operations Director',
        avatar: 'AB',
        isUser: true,
      },
      dependencies: [],
      isBlocked: false,
      blockedBy: null,
      subtasks: [],
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setShowQuickAdd(false);
    triggerToast(`New task added: "${newTask.title}"`);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setOnlyMyTasks(false);
  };

  // Filtering Logic
  const filteredTasks = tasks.filter((t) => {
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      const matchLead = t.assignee?.name.toLowerCase().includes(q);
      const matchCat = t.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLead && !matchCat) return false;
    }

    // Status Filter
    if (statusFilter === 'in-progress' && t.status !== 'in-progress') return false;
    if (statusFilter === 'today' && (t.dueCategory !== 'today' || t.status === 'completed')) return false;
    if (statusFilter === 'blocked' && !t.isBlocked) return false;
    if (statusFilter === 'completed' && t.status !== 'completed') return false;

    // Priority Filter
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;

    // Category Filter
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

    // Only My Tasks
    if (onlyMyTasks && !t.assignee.isUser) return false;

    return true;
  });

  return (
    <div className="my-tasks-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '4px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '22px',
                fontWeight: '700',
                color: 'var(--text-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              My Tasks & Squad Workstreams
            </h2>
            <Badge variant="primary" size="sm">
              Sprint 3 Active
            </Badge>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time operational task assignments, milestone deadlines & blocker telemetry for TechFest 2026.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowQuickAdd(!showQuickAdd)}
        >
          {showQuickAdd ? 'Cancel' : '+ New Task'}
        </Button>
      </div>

      {/* Quick Add Task Form Banner */}
      {showQuickAdd && (
        <form
          onSubmit={handleCreateTask}
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-accent)',
            borderRadius: '10px',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-heading)' }}>
            Create Operational Task:
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Inspect Auditorium soundboard & wireless mic battery levels"
              style={{
                flex: '1 1 360px',
                height: '36px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '7px',
                padding: '0 12px',
                fontSize: '13px',
                color: 'var(--text-primary)',
              }}
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{
                height: '36px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '7px',
                padding: '0 10px',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <option value="Tech & Infra">Tech & Infra</option>
              <option value="Sponsorship">Sponsorship</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Logistics">Logistics</option>
              <option value="PR & Web">PR & Web</option>
              <option value="Safety">Safety</option>
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              style={{
                height: '36px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '7px',
                padding: '0 10px',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <option value="CRITICAL">Critical Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>

            <input
              type="text"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              placeholder="Deadline (e.g. Today, 5:00 PM)"
              style={{
                width: '180px',
                height: '36px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '7px',
                padding: '0 12px',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            />

            <Button variant="primary" size="md" type="submit">
              Add Task
            </Button>
          </div>
        </form>
      )}

      {/* Task Overview Summary Counters */}
      <TaskMetricsHeader tasks={tasks} />

      {/* Task Filters and Search Bar */}
      <TaskFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onlyMyTasks={onlyMyTasks}
        onToggleMyTasks={() => setOnlyMyTasks(!onlyMyTasks)}
        totalResults={filteredTasks.length}
        onResetFilters={handleResetFilters}
      />

      {/* Main 2-Column Desktop Grid for 1440px+ */}
      <div className="grid-2col-main-side">
        {/* Left Column: Filtered Task List */}
        <div>
          {filteredTasks.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px dashed var(--border-hover)',
                borderRadius: '10px',
                padding: '48px 24px',
                textAlign: 'center',
              }}
            >
              <ListTodo size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-heading)', marginBottom: '6px' }}>
                No tasks match your active filters
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Try adjusting your search query, priority selector, or status filter.
              </p>
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div>
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onStatusChange={handleStatusChange}
                  onToggleSubtask={handleToggleSubtask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: AI Task Intelligence & Workload Delegation */}
        <div>
          <AiTaskIntelligence onApplySequence={handleApplySequence} />
        </div>
      </div>
    </div>
  );
}
