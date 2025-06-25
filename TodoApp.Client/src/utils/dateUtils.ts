import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, isPast } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }
  
  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'h:mm a')}`;
  }
  
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, yyyy \'at\' h:mm a');
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const isOverdue = (dateString: string, isCompleted: boolean): boolean => {
  if (isCompleted) return false;
  return isPast(new Date(dateString));
};

export const isDueSoon = (dateString: string, isCompleted: boolean, hoursThreshold: number = 24): boolean => {
  if (isCompleted) return false;
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffInHours > 0 && diffInHours <= hoursThreshold;
};

export const getDueDateStatus = (dueDate: string | null | undefined, isCompleted: boolean): {
  status: 'none' | 'completed' | 'overdue' | 'due-soon' | 'future';
  message: string;
  icon: string;
} => {
  if (!dueDate) {
    return { status: 'none', message: '', icon: '' };
  }
  
  if (isCompleted) {
    return { status: 'completed', message: 'Completed', icon: '✅' };
  }
  
  if (isOverdue(dueDate, isCompleted)) {
    return { status: 'overdue', message: 'Overdue', icon: '⚠️' };
  }
  
  if (isDueSoon(dueDate, isCompleted)) {
    return { status: 'due-soon', message: 'Due Soon', icon: '⏰' };
  }
  
  return { status: 'future', message: 'Scheduled', icon: '📅' };
};
