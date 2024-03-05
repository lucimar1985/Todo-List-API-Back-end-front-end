import { Router } from "express";
import TodoController from "../api/controllers/todoController";

const router = Router();

router.get("/todos", TodoController.getAllTodos);
router.post("/todos", TodoController.createTodo);
router.patch("/todos/:id", TodoController.updateFinishedTodo);
router.delete("/todos/:id", TodoController.removeTodoById);

export default router;
