import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatsPanel from './components/StatsPanel';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('newest');
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Fetch all todos from the backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      showToast(
        error.response?.data?.message || 'Failed to fetch tasks from server',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleRefreshTodos = () => {
    fetchTodos();
    showToast('Task list refreshed.', 'success');
  };

  const handleSortToggle = () => {
    setSortMode((current) => (current === 'newest' ? 'dueDate' : 'newest'));
  };

  // Form Submit Handler (Creation or Editing Update)
  const handleFormSubmit = async (formData) => {
    if (editTodo) {
      // Update Mode
      try {
        const response = await axios.put(`${API_URL}/${editTodo._id}`, formData);
        setTodos((prev) =>
          prev.map((t) => (t._id === editTodo._id ? response.data : t))
        );
        setEditTodo(null);
        showToast('Task updated successfully!', 'success');
      } catch (error) {
        console.error('Error updating todo:', error);
        showToast(error.response?.data?.message || 'Failed to update task', 'error');
      }
    } else {
      // Create Mode
      try {
        const response = await axios.post(API_URL, formData);
        setTodos((prev) => [response.data, ...prev]);
        showToast('New task added!', 'success');
      } catch (error) {
        console.error('Error creating todo:', error);
        showToast(error.response?.data?.message || 'Failed to create task', 'error');
      }
    }
  };

  // Checkbox Completion Toggle
  const handleToggleComplete = async (todo) => {
    try {
      const response = await axios.put(`${API_URL}/${todo._id}`, {
        completed: !todo.completed
      });
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? response.data : t))
      );
      
      if (response.data.completed) {
        showToast('Task marked as completed!', 'success');
      } else {
        showToast('Task marked active.', 'warning');
      }
    } catch (error) {
      console.error('Error toggling complete:', error);
      showToast('Failed to update task status', 'error');
    }
  };

  // Delete Action
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      showToast('Task deleted successfully.', 'success');
      
      // If we are deleting the item currently being edited, cancel edit mode
      if (editTodo && editTodo._id === id) {
        setEditTodo(null);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      showToast('Failed to delete task', 'error');
    }
  };

  // Select Item for Edit
  const handleSelectEdit = (todo) => {
    setEditTodo(todo);
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  return (
    <div className="app-shell">
      <div className="workspace-grid">
        <div className="workspace-left">
          <header className="app-header">
            <div className="app-header-copy">
              <h1 className="app-title-gradient" aria-label="TaskSphere">
                {'TaskSphere'.split('').map((letter, index) => (
                  <span key={`${letter}-${index}`}>{letter}</span>
                ))}
              </h1>
            </div>
          </header>

          <aside className="workspace-sidebar">
            <div className="workspace-sidebar-scroll">
              <StatsPanel todos={todos} />

              <TodoForm
                onSubmit={handleFormSubmit}
                editTodo={editTodo}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </aside>
        </div>

        <main className="workspace-main">
          {loading ? (
            <div className="loading-state">
              <Loader2 size={34} className="loading-spinner" />
              <p>Connecting to database...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortMode={sortMode}
              onSortToggle={handleSortToggle}
              onRefresh={handleRefreshTodos}
              onToggleComplete={handleToggleComplete}
              onEdit={handleSelectEdit}
              onDelete={handleDeleteTodo}
            />
          )}
        </main>
      </div>

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div>{toast.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
