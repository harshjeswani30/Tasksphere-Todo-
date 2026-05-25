import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardList, RefreshCw, Search, ArrowUpDown, X } from 'lucide-react';

const TodoList = ({
  todos,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortMode,
  onSortToggle,
  onRefresh,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  // Apply filtering locally for instant responsive feedback
  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'completed') return todo.completed;
    if (activeFilter === 'pending') return !todo.completed;
    return true; // 'all'
  }).filter((todo) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.trim().toLowerCase();
    return (
      todo.title.toLowerCase().includes(query) ||
      (todo.description || '').toLowerCase().includes(query)
    );
  }).sort((left, right) => {
    if (sortMode === 'dueDate') {
      const leftDue = left.dueDate ? new Date(left.dueDate).getTime() : Number.POSITIVE_INFINITY;
      const rightDue = right.dueDate ? new Date(right.dueDate).getTime() : Number.POSITIVE_INFINITY;
      return leftDue - rightDue;
    }

    const leftCreated = left.createdAt ? new Date(left.createdAt).getTime() : 0;
    const rightCreated = right.createdAt ? new Date(right.createdAt).getTime() : 0;
    return rightCreated - leftCreated;
  });

  return (
    <div className="glass-card" style={{ paddingBottom: '30px' }}>
      <div className="list-toolbar">
        <div className="search-field-wrap">
          <Search size={16} />
          <input
            type="text"
            className="search-field"
            placeholder="Search tasks or descriptions"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="toolbar-icon-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="toolbar-actions">
          <button type="button" className="toolbar-action-btn" onClick={onRefresh}>
            <RefreshCw size={15} />
            Refresh
          </button>
          <button type="button" className="toolbar-action-btn" onClick={onSortToggle}>
            <ArrowUpDown size={15} />
            {sortMode === 'newest' ? 'Newest' : 'Due date'}
          </button>
        </div>
      </div>

      {/* Filtering Header Bar */}
      <div className="filter-header">
        <h2 className="filter-title">My Tasks</h2>
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onFilterChange('pending')}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Todo List / Empty State Grid */}
      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <ClipboardList className="empty-icon" />
          <h3 className="empty-text">No tasks found</h3>
          <p className="empty-subtext">
            {activeFilter === 'all'
              ? 'Your todo list is empty. Add a new task above!'
              : activeFilter === 'pending'
              ? 'You do not have any active tasks. Good job!'
              : 'You have not completed any tasks yet. Keep going!'}
          </p>
        </div>
      ) : (
        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
