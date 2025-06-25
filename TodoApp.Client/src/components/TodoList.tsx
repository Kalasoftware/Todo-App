import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void;
  loading?: boolean;
}

type FilterType = 'all' | 'pending' | 'completed';
type SortType = 'created' | 'priority' | 'dueDate' | 'title';

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onEdit, 
  loading = false 
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No todos yet!</h3>
        <p>Create your first todo using the form above to get started on your productivity journey.</p>
      </div>
    );
  }

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'pending':
        return !todo.isCompleted;
      case 'completed':
        return todo.isCompleted;
      default:
        return true;
    }
  });

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'priority':
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = (priorityOrder[a.priority as keyof typeof priorityOrder] || 0) - 
                    (priorityOrder[b.priority as keyof typeof priorityOrder] || 0);
        break;
      case 'dueDate':
        const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        comparison = aDate - bDate;
        break;
      case 'created':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const pendingCount = todos.filter(todo => !todo.isCompleted).length;
  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const overdueCount = todos.filter(todo => 
    !todo.isCompleted && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;

  return (
    <div className="todo-list-container">
      {/* Filter and Sort Controls */}
      <div className="todo-controls" style={{ 
        background: 'var(--bg-primary)', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '20px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontSize: '14px', 
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              🔍 Filter:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            >
              <option value="all">All ({todos.length})</option>
              <option value="pending">Pending ({pendingCount})</option>
              <option value="completed">Completed ({completedCount})</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontSize: '14px', 
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              📊 Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            >
              <option value="created">Created Date</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontSize: '14px', 
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              🔄 Order:
            </label>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn btn-sm btn-secondary"
              style={{ minWidth: '80px' }}
            >
              {sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc'}
            </button>
          </div>
        </div>

        {overdueCount > 0 && (
          <div className="status-indicator status-overdue" style={{ fontSize: '14px' }}>
            ⚠️ {overdueCount} overdue task{overdueCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Todo Items */}
      <div className="todo-list">
        {sortedTodos.length === 0 ? (
          <div className="empty-state">
            <h3>No todos match your filter</h3>
            <p>Try adjusting your filter settings or create a new todo.</p>
          </div>
        ) : (
          sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
