import { Router } from "express";

import * as todoController from "../controllers/todo.controller";

const router = Router();

router.get("/todos", todoController.all);
router.get("/todo/:id", todoController.one);
router.post("/todo", todoController.create);
router.put("/todo/:id", todoController.update);
router.delete("/todo/:id", todoController.destroy);

export default router;
