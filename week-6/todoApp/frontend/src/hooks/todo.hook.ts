import { useState } from "react";
import type { Todo } from "../types/todo.type";
import { axiosInstance } from "../api/fetch";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // CREATE (POST)
  const addTodo = async (data: Omit<Todo, "_id">) => {
    const response = await axiosInstance.post("/todos", data);
    setTodos((prev) => [response.data.data, ...prev]);
  };

  // DELETE
  const deleteTodo = async (id: number) => {
    await axiosInstance.delete(`todos/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (id: number) => {
    const response = await axiosInstance.patch(`/todos/${id}`, {
      completed: !todos.find((t) => t._id === id)?.completed,
    });
    setTodos((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, completed: response.data.data.completed } : t,
      ),
    );
  };

  return {
    todos,
    addTodo,
    setTodos,
    deleteTodo,
    toggleComplete,
  };
};
