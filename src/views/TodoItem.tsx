import React, { useState } from 'react';
import { Todo } from '../types/TodoTypes';
import { AiFillEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { FaUndoAlt } from "react-icons/fa";

type TodoItemProps = {
    todo: Todo;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string, newPriority: number) => void;
    onComplete: (id: string) => void; 
    isFirstItem: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit, onComplete, isFirstItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.title);
    const [newPriority, setNewPriority] = useState(todo.priority);

    const handleSave = () => {
        onEdit(todo.id, newText, newPriority);
        setIsEditing(false);
    };

    return (
        <li className={`bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-sm mx-auto transition-transform transform hover:scale-105 ${isFirstItem ? "bg-yellow-100 border border-yellow-500 rounded p-2" : ""}`}>
            {isEditing ? (
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="border border-gray-300 rounded p-2 mb-4 w-full"
                        placeholder="Edit todo"
                    />
                    <input
                        type="number"
                        value={newPriority}
                        onChange={(e) => setNewPriority(Number(e.target.value))}
                        min="1"
                        max="5"
                        className="border border-gray-300 rounded p-2 mb-4 w-20 text-center"
                    />
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded transition duration-200"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center ">
                    <h1 className="text-lg font-semibold text-center text-gray-800">
                        {todo.title} {todo.completed && <span className="text-green-500">(Completed)</span>}
                    </h1>
                    <p className={"text-sm text-gray-600 mt-2"}>Priority: {todo.priority}</p>
                    <div className="flex space-x-2 mt-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
                        >
                            <AiFillEdit />
                        </button>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                        >
                            <AiTwotoneDelete />
                        </button>
                        <button
                            onClick={() => onComplete(todo.id)} 
                            className={`${todo.completed ? "bg-blue-500" : "bg-green-600"} hover:bg-${todo.completed ? "blue-600" : "green-600"} px-4 py-2 rounded transition duration-200`}
                        >
                            {todo.completed ? <FaUndoAlt /> : <TiTick />}
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
