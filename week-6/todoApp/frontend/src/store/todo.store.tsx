import { create } from "zustand";
import type { Todo } from "../types/todo.type";
import { todoApi } from "../api/todo.services";

type TodoStore = {
  todos: Todo[];
  setTodos: (updater: Todo[] | ((prev: Todo[]) => Todo[])) => void;
  addTodo: (data: Omit<Todo, "_id">) => Promise<void>;
  getTodos: () => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleComplete: (id: string, completed: boolean) => Promise<void>;
  updateTodo: (id: string, data: Partial<Omit<Todo, "_id">>) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (updater) =>
    set((state) => ({
      todos: typeof updater === "function" ? updater(state.todos) : updater,
    })),

  addTodo: async (data: Omit<Todo, "_id">) => {
    const response = await todoApi.create(data);
    set((state) => ({ todos: [response, ...state.todos] }));
  },
  updateTodo: async (id: string, data: Partial<Omit<Todo, "_id">>) => {
    set((state) => ({
      todos: state.todos.map((t) => (t._id === id ? { ...t, ...data } : t)),
    }));

    // 2. sync backend
    try {
      await todoApi.update(id, data);
    } catch (err) {
      console.error(err);
    }
  },
  getTodos: async () => {
    const todos = await todoApi.getAll();
    set({ todos });
  },

  deleteTodo: async (id: string) => {
    await todoApi.delete(id);
    set((state) => ({ todos: state.todos.filter((t) => t._id !== id) }));
  },

  toggleComplete: async (id: string, completed: boolean) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        t._id === id ? { ...t, completed: completed } : t,
      ),
    }));
    try {
      await todoApi.toggleComplete(id, completed);
    } catch (err) {
      console.error(err);
    }
  },
}));
