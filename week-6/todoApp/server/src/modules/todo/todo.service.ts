import { Todo } from "./model/todo.model.ts";
import { CreateTodoInput } from "./schema/todo.schema.ts";

export const getTodo = async () => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  return todos;
};

export const createTodo = async (data: CreateTodoInput) => {
  const newTodo = new Todo(data);
  return await newTodo.save();
};

export const getTodoById = async (id: string) => {
  const todo = await Todo.findById(id);
  return todo;
};

export const updateTodo = async (
  id: string,
  data: Partial<CreateTodoInput>,
) => {
  const updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const deletedTodo = await Todo.findByIdAndDelete(id);
  return deletedTodo;
};

export const getTodoByQuery = async (completed?: boolean) => {
  return Todo.find(completed !== undefined ? { completed } : {}).sort({
    createdAt: -1,
  });
};
