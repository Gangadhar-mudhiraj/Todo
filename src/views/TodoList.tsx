import React from 'react';
import { Todo } from '../types/TodoTypes';
import TodoItem from './TodoItem';

type TodoListProps = {
    todos: Todo[];
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string, newPriority: number) => void;
    onComplete: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit, onComplete }) => {
    const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-4">Todos Left</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedTodos.map((todo, index) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onComplete={onComplete}
                        isFirstItem={index === 0}
                    />
                ))}
            </ul>
        </>
    );
};

export default TodoList;
