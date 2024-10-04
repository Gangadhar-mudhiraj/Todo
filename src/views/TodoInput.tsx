import React, { useState } from 'react';

type TodoInputProps = {
    addTodo: (text: string, priority: number) => void;
};

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState<string>('');
    const [priority, setPriority] = useState<number | ''>('');

    const handleAddTodo = () => {
        if (newTodo.trim() && priority) {
            console.log(priority)
            addTodo(newTodo, Number(priority));
            setNewTodo('');
            setPriority('');
        } else {
            setNewTodo('');
            setPriority('');
        }
    };

    return (
        <div className="mb-8 max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Create a New Todo</h2>


            <div className="mb-4">
                <label htmlFor="todoText" className="block text-gray-700 text-lg mb-1 font-medium">Task Title</label>
                <input
                    id="todoText"
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a new Todo..."
                />
            </div>


            <div className="mb-4">
                <label htmlFor="priority" className="block text-gray-700 text-lg mb-1 font-medium">Priority </label>
                <input
                    id="priority"
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set priority"

                />
            </div>


            <button
                onClick={handleAddTodo}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
                Add Todo
            </button>
        </div>
    );
};

export default TodoInput;
