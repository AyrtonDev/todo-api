import { Request, Response } from "express";

import { Todo } from "../models/Todo";

export const listTodos = async (req: Request, res: Response) => {
  const list = await Todo.findAll();

  if (list.length === 0) {
    res.status(404);
    res.json({
      message: "none item todo was create",
    });
  } else {
    res.json({ list });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  console.log(title);

  if (title === "" || title === undefined) {
    res.status(422);
    res.json({
      message: "The item 'title' cannot empty",
    });
  } else {
    const newTodo = await Todo.create({ title });

    res.status(201);
    res.json({ id: newTodo.id, message: "Item to-do was created" });
  }
};
