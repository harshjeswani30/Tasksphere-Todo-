import React, { useState, useEffect } from 'react';
import { Plus, Check, X } from 'lucide-react';

const TodoForm = ({ onSubmit, editTodo, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Sync state if in edit mode
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title || '');
      setDescription(editTodo.description || '');
      // Format YYYY-MM-DD for input date field
      if (editTodo.dueDate) {
        setDueDate(new Date(editTodo.dueDate).toISOString().split('T')[0]);
      } else {
        setDueDate('');
      }
      setError('');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setError('');
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || title.trim() === '') {
      setError('Title is required');
      return;
    }
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null
    });

    // Reset after adding
    if (!editTodo) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
    setError('');
  };

  return (
    <div className="glass-card">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {editTodo ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            id="title"
            type="text"
            className="input-field"
            placeholder="e.g., Design UI mockups"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
          />
          {error && <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{error}</span>}
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input-field"
            placeholder="Describe the details of this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Due Date & Submission */}
        <div className="input-row form-group">
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              className="input-field"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            {editTodo ? (
              <>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <Check size={18} /> Update
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                  <X size={18} /> Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Plus size={18} /> Add Task
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
