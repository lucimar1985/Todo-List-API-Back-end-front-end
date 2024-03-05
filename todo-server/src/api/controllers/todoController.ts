import { Request, Response } from "express";
import Todo from "../models/Todo";

class TodoController {
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await Todo.find();
      return res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { task } = req.body;

      if (!task) {
        return res.status(400).send("Task is empty. Please fill fields!");
      }

      const todo = await Todo.create({ task });

      return res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  }

  async updateFinishedTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { finished } = req.body;

      const todo = await Todo.findByIdAndUpdate(id, { finished }, { new: true });

      if (!todo) {
        return res.status(404).send("Todo not found");
      }

      return res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  }

  async removeTodoById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByIdAndDelete(id);

      if (!todo) {
        return res.status(404).send("Todo not found");
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  }
}

export default new TodoController();