import React, { useEffect, useState } from 'react';
import TodoContainer from '../containers/TodoContainer';
import { Todo } from '../types/TodoTypes';
import { auth, db } from "../Database/firabase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [user, setUser] = useState<any>(null);

    // Fetch user tasks from Firestore on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        setUser(user);
                        const tasksCollection = collection(db, "Users", user.uid, "tasks");
                        const querySnapshot = await getDocs(tasksCollection);
                        const todoList: Todo[] = [];
                        querySnapshot.forEach((doc) => {
                            todoList.push({ id: doc.id, ...doc.data() } as Todo);
                        });
                        setTodos(todoList);
                    } else {
                        setTodos([]);
                    }
                });
            } catch (error) {
                toast.error("Failed to fetch tasks", {
                    position: "top-center"
                });
            }
        };

        fetchTodos();
    }, []);

    // Add a new task to Firestore for the current user
    const addTodo = async (text: string, priority: number) => {
        if (!user) return;
        const newTodo: Omit<Todo, 'id'> = {
            title: text,
            priority,
            completed: false,
        };

        try {
            const tasksCollection = collection(db, "Users", user.uid, "tasks");
            const docRef = await addDoc(tasksCollection, newTodo);
            setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: docRef.id }]);
            toast.success("Task added successfully", {
                position: "top-center"
            });
        } catch (error) {
            toast.error("Failed to add task", {
                position: "top-center"
            });
        }
    };

    // Delete a task from Firestore for the current user
    const deleteTodo = async (id: string) => {
        if (!user) return;
        try {
            const taskRef = doc(db, "Users", user.uid, "tasks", id);
            await deleteDoc(taskRef);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            toast.success("Task deleted successfully", {
                position: "top-center"
            });
        } catch (error) {
            toast.error("Failed to delete task", {
                position: "top-center"
            });
        }
    };

    // Update a task in Firestore for the current user
    const editTodo = async (id: string, newText: string, newPriority: number) => {
        if (!user) return;
        try {
            const taskRef = doc(db, "Users", user.uid, "tasks", id);
            await updateDoc(taskRef, {
                title: newText,
                priority: newPriority,
            });
            setTodos((prevTodos) =>
                prevTodos.map((todo) => todo.id === id ? { ...todo, title: newText, priority: newPriority } : todo)
            );
            toast.success("Task updated successfully", {
                position: "top-center"
            });
        } catch (error) {
            toast.error("Failed to update task", {
                position: "top-center"
            });
        }
    };

    // Mark task as completed/incomplete in Firestore for the current user
    const completeTodo = async (id: string) => {
        if (!user) return;
        try {
            const taskRef = doc(db, "Users", user.uid, "tasks", id);
            const todo = todos.find((todo) => todo.id === id);
            if (todo) {
                await updateDoc(taskRef, { completed: !todo.completed });
                setTodos((prevTodos) =>
                    prevTodos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
                );
                toast.success("Task completion status updated", {
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.error("Failed to update task", {
                position: "top-center"
            });
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center m-3 underline text-red-400">Taskify</h1>
            <TodoContainer
                todos={todos}
                setTodos={setTodos}
                addTodo={addTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onComplete={completeTodo}
            />
        </div>
    );
};

export default HomePage;
