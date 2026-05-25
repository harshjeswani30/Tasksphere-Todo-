import React from 'react';
import { Calendar, Trash2, Edit2, Check, AlertCircle } from 'lucide-react';

const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const { _id, title, description, dueDate, completed } = todo;

  // Evaluate overdue status: not completed and due date is prior to today
  const isOverdue = (() => {
    if (completed || !dueDate) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Date-only comparison
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < now;
  })();

  const formatDueDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    // Add timezone adjustment if date strings are parsed as UTC to display the date as input
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Mongoose dates are saved as UTC, force display consistent with entry
    });
  };

  return (
    <div className={`todo-item-card ${completed ? 'completed' : ''}`}>
      {/* Checkbox Wrapper */}
      <div className="todo-checkbox-wrapper">
        <button
          type="button"
          aria-label={completed ? 'Mark task incomplete' : 'Mark task complete'}
          className={`custom-checkbox ${completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(todo)}
        >
          {completed && <Check size={14} strokeWidth={3} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="todo-content-wrapper">
        <h3 className="todo-item-title">{title}</h3>
        {description && <p className="todo-item-desc">{description}</p>}

        {/* Badges and Meta Row */}
        <div className="todo-meta">
          {completed ? (
            <span className="todo-badge badge-completed">Completed</span>
          ) : isOverdue ? (
            <span className="todo-badge badge-overdue">
              <AlertCircle size={12} /> Overdue
            </span>
          ) : (
            <span className="todo-badge badge-pending">Active</span>
          )}

          {dueDate && (
            <span className={`todo-date ${isOverdue ? 'overdue' : ''}`}>
              <Calendar size={12} />
              Due: {formatDueDate(dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Side Action Buttons */}
      <div className="todo-actions">
        <button
          type="button"
          aria-label="Edit todo"
          className="btn-icon"
          onClick={() => onEdit(todo)}
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          aria-label="Delete todo"
          className="btn-icon btn-icon-danger"
          onClick={() => onDelete(_id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
