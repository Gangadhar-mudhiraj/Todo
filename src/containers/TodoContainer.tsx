import React from 'react';
import { Todo } from '../types/TodoTypes';
import TodoInput from '../views/TodoInput';
import TodoList from '../views/TodoList';

type TodoContainerProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (text: string, priority: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, newText: string, newPriority: number) => Promise<void>;  // Adjusted for async
  onComplete: (id: string) => Promise<void>;  // Adjusted for async
};

const TodoContainer: React.FC<TodoContainerProps> = ({ todos, addTodo, onDelete, onEdit, onComplete }) => {
  return (
    <>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />
    </>
  );
};

export default TodoContainer;
