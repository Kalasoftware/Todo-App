import React from 'react';
import { Todo } from '../types/Todo';
import { formatDate, formatRelativeDate, getDueDateStatus } from '../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '🟡';
    }
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.isCompleted);

  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-header">
        <h3 className={`todo-title ${todo.isCompleted ? 'completed' : ''}`}>
          {todo.isCompleted && '✅ '}
          {todo.title}
        </h3>
        <span className={`todo-priority ${getPriorityClass(todo.priority)}`}>
          {getPriorityIcon(todo.priority)} {todo.priority}
        </span>
      </div>

      {todo.description && (
        <p className="todo-description">
          📄 {todo.description}
        </p>
      )}

      <div className="todo-meta">
        <div>
          <div className="todo-meta-item">
            <span>🕒 Created {formatRelativeDate(todo.createdAt)}</span>
          </div>
          {todo.dueDate && (
            <div className={`todo-meta-item ${dueDateStatus.status === 'overdue' ? 'overdue' : ''}`}>
              <span>
                {dueDateStatus.icon} Due: {formatDate(todo.dueDate)}
                {dueDateStatus.status !== 'none' && dueDateStatus.status !== 'completed' && 
                 ` (${dueDateStatus.message})`}
              </span>
            </div>
          )}
        </div>
        <div>
          <span className={`status-indicator ${
            todo.isCompleted ? 'status-completed' : 
            dueDateStatus.status === 'overdue' ? 'status-overdue' : 'status-pending'
          }`}>
            {todo.isCompleted ? '✅ Completed' : 
             dueDateStatus.status === 'overdue' ? '⚠️ Overdue' : 
             dueDateStatus.status === 'due-soon' ? '⏰ Due Soon' : '⏳ Pending'}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => todo.id && onToggle(todo.id)}
          className={`btn btn-sm ${todo.isCompleted ? 'btn-secondary' : 'btn-success'}`}
          title={todo.isCompleted ? 'Mark as pending' : 'Mark as completed'}
        >
          {todo.isCompleted ? '↩️ Undo' : '✅ Complete'}
        </button>
        
        {onEdit && (
          <button
            onClick={() => onEdit(todo)}
            className="btn btn-sm btn-primary"
            title="Edit todo"
          >
            ✏️ Edit
          </button>
        )}
        
        <button
          onClick={() => todo.id && onDelete(todo.id)}
          className="btn btn-sm btn-danger"
          title="Delete todo"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
