export interface Todo {
  id?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string;
  priority?: 'Low' | 'Medium' | 'High';
}
