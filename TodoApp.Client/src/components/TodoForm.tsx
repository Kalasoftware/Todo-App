import React, { useState } from 'react';
import { CreateTodoDto } from '../types/Todo';

interface TodoFormProps {
  onSubmit: (todo: CreateTodoDto) => void;
  loading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<CreateTodoDto>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit({
        ...formData,
        dueDate: formData.dueDate || undefined,
        description: formData.description || undefined,
      });
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
      });
      setIsExpanded(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTitleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">
          📝 What needs to be done? *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onFocus={handleTitleFocus}
          placeholder="Add a new todo..."
          required
          disabled={loading}
          autoComplete="off"
        />
      </div>

      {isExpanded && (
        <>
          <div className="form-group">
            <label htmlFor="description">
              📄 Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about this task..."
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1', minWidth: '200px' }}>
              <label htmlFor="dueDate">
                📅 Due Date (optional)
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                disabled={loading}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
              <label htmlFor="priority">
                🎯 Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !formData.title.trim()}
        >
          {loading ? (
            <>⏳ Adding...</>
          ) : (
            <>➕ Add Todo</>
          )}
        </button>
        
        {isExpanded && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleCancel}
            disabled={loading}
          >
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
