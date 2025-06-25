import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoDto } from './types/Todo';
import { todoService } from './services/todoService';
import { ThemeProvider } from './contexts/ThemeContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

const AppContent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await todoService.getAllTodos();
      setTodos(todosData);
    } catch (err) {
      setError('Failed to load todos. Please make sure the API server is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData: CreateTodoDto) => {
    try {
      setSubmitting(true);
      setError(null);
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      setError(null);
      await todoService.toggleTodo(id);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id
            ? { ...todo, isCompleted: !todo.isCompleted, updatedAt: new Date().toISOString() }
            : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setError(null);
        await todoService.deleteTodo(id);
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } catch (err) {
        setError('Failed to delete todo. Please try again.');
        console.error('Error deleting todo:', err);
      }
    }
  };

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="app">
      <header className="header">
        <div className="header-controls">
          <ThemeToggle />
        </div>
        <h1>✨ Todo App</h1>
        <p>
          {totalCount > 0 ? (
            <>
              <span className="status-indicator status-completed">
                ✅ {completedCount} completed
              </span>
              {' • '}
              <span className="status-indicator status-pending">
                ⏳ {pendingCount} pending
              </span>
              {' • '}
              <span>📊 {totalCount} total tasks</span>
            </>
          ) : (
            'Start by adding your first todo!'
          )}
        </p>
      </header>

      {error && (
        <div className="error">
          <div className="error-message">
            <strong>⚠️ Error:</strong> {error}
          </div>
          <button 
            onClick={loadTodos} 
            className="btn btn-sm btn-primary"
          >
            🔄 Retry
          </button>
        </div>
      )}

      <TodoForm onSubmit={handleCreateTodo} loading={submitting} />

      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        loading={loading}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
