import { deleteCache, getCache, setCache } from "../../cache/cache.service.ts";
import { Todo } from "./model/todo.model.ts";
import { CreateTodoInput } from "./schema/todo.schema.ts";

export const getTodo = async () => {
  const cachedTodos = await getCache("todos");
  if (cachedTodos) {
    return cachedTodos;
  }
  const todos = await Todo.find().sort({ createdAt: -1 });

  await setCache("todos", todos, 3000);
  return todos;
};

export const createTodo = async (data: CreateTodoInput) => {
  const newTodo = new Todo(data);
  const savedTodo = await newTodo.save();
  await deleteCache("todos");
  return savedTodo;
};

export const getTodoById = async (id: string) => {
  const todo = await Todo.findById(id);
  return todo;
};

export const updateTodo = async (
  id: string,
  data: Partial<CreateTodoInput>,
) => {
  const updatedTodo = await Todo.findByIdAndUpdate(id, data, { after: true });
  await deleteCache("todos");
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const deletedTodo = await Todo.findByIdAndDelete(id);
  await deleteCache("todos");
  return deletedTodo;
};

export const getTodoByQuery = async (completed?: boolean) => {
  return Todo.find(completed !== undefined ? { completed } : {}).sort({
    createdAt: -1,
  });
};
