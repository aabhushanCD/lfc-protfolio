import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  getTodoByQuery,
  updateTodo,
} from "./todo.service.ts";
import { errorHandler } from "../../middleware/errorHandler.ts";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const data = await getTodo();
    res.json({ message: "This is the list of todos", data });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

export const createTodos = async (req: Request, res: Response) => {
  try {
    const savedTodo = await createTodo(req.body);
    return res
      .status(201)
      .json({ message: "Todo created successfully", data: savedTodo });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

export const updateTodos = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updatedTodo = await updateTodo(id, req.body);
    res.json({ message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

export const deleteTodos = async (req: Request, res: Response) => {
  try {
    const deletedTodo = await deleteTodo(req.params.id as string);
    res.json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

export const getTodoByIds = async (req: Request, res: Response) => {
  try {
    const todo = await getTodoById(req.params.id as string);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo fetched successfully", data: todo });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

export const getTodoByQuerys = async (req: Request, res: Response) => {
  try {
    const { completed } = req.query;
    const todos = await getTodoByQuery(completed === "true");
    res.json({ message: "Todos fetched successfully", data: todos });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
