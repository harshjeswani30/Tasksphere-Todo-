import React from 'react';
import { ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const StatsPanel = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  // Check overdue: not completed and due date is in the past
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Compare date-only
  const overdue = todos.filter((todo) => {
    if (todo.completed || !todo.dueDate) return false;
    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < now;
  }).length;

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="glass-card">
      <div className="stats-panel">
        {/* Total Stat */}
        <div className="stat-item">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <ListTodo size={20} className="text-muted" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total</div>
        </div>

        {/* Completed Stat */}
        <div className="stat-item">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />
          </div>
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>

        {/* Pending Stat */}
        <div className="stat-item">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <Clock size={20} style={{ color: 'var(--color-warning)' }} />
          </div>
          <div className="stat-value">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>

        {/* Overdue Stat */}
        <div className="stat-item">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <AlertCircle size={20} style={{ color: overdue > 0 ? 'var(--color-danger)' : 'var(--text-muted)' }} />
          </div>
          <div className="stat-value" style={{ color: overdue > 0 ? '#ef4444' : 'inherit' }}>{overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>

        {/* Progress Bar Row */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }} />
        </div>
        <div className="stats-footer">
          <span>Completion Progress</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
