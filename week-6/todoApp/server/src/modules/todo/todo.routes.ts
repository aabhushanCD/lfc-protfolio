import express from "express";
import { validate } from "../../middleware/validation.middleware.ts";
import { createTodoSchema } from "./schema/todo.schema.ts";
import {
  createTodos,
  deleteTodos,
  getTodoByIds,
  getTodoByQuerys,
  getTodos,
  toggleComplete,
  updateTodos,
} from "./todo.controller.ts";
import { verifyToken } from "../../middleware/verifyToken.ts";

const router = express.Router();

router.get("/", verifyToken, getTodos);

router.get("/search", getTodoByQuerys);
router.get("/:id", getTodoByIds);

router.post("/", validate(createTodoSchema), verifyToken, createTodos);

router.put("/:id", validate(createTodoSchema), verifyToken, updateTodos);

router.delete("/:id", verifyToken, deleteTodos);

router.patch("/:id", verifyToken, toggleComplete);
export default router;
