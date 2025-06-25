import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/Todo';

// Use different API URLs for development and production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000/api'  // When running in Docker, the browser still connects to localhost
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },

  // Get todo by id
  getTodoById: async (id: string): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: string, todo: UpdateTodoDto): Promise<void> => {
    await api.put(`/todos/${id}`, todo);
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  // Toggle todo completion
  toggleTodo: async (id: string): Promise<void> => {
    await api.patch(`/todos/${id}/toggle`);
  },
};
