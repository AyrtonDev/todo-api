import { Router } from "express";

import * as apiController from "../controllers/todo.controller";

const router = Router();

router.get("/todos", apiController.listTodos);
router.get("/todo/:title", () => {});
router.post("/todo", apiController.createTodo);
router.put("/todo/:id", () => {});
router.delete("/todo/:id", () => {});

export default router;
