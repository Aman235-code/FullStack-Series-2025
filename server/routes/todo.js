import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createTodo);
router.route("/getTodos").get(getAllTodos);
router.route("/:todoId").put(isAuthenticated, updateTodo);
router.route("/:todoId").delete(isAuthenticated, deleteTodo);

export default router;
