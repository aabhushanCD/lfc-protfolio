import type { Todo } from "../types/todo.type";
import axiosInstance from "./fetch";

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await axiosInstance.get("/todos");

    return res.data;
  },

  create: async (data: Omit<Todo, "_id">): Promise<Todo> => {
    const res = await axiosInstance.post("/todos", data);

    return res.data.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<Todo, "_id">>,
  ): Promise<Todo> => {
    const res = await axiosInstance.put(`/todos/${id}`, data);

    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/todos/${id}`);
  },

  toggleComplete: async (id: string, completed: boolean): Promise<Todo> => {
    const res = await axiosInstance.patch(`/todos/${id}/`, {
      completed,
    });

    return res.data.data;
  },
};
