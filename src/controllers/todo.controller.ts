import { Request, Response } from "express";

import { Todo } from "../models/Todo";

export const all = async (req: Request, res: Response) => {
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

export const one = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  if (todo) {
    res.json({ todo });
  } else {
    res.status(404);
    res.json({ message: `Todo id ${id} was not find` });
  }
};

export const create = async (req: Request, res: Response) => {
  const { title, done } = req.body;

  console.log(title);

  if (title === "" || title === undefined) {
    res.status(422);
    res.json({
      message: "The item 'title' cannot empty",
    });
  } else {
    const newTodo = await Todo.create({ title, done: done ? true : false });

    res.status(201);
    res.json({ id: newTodo.id, message: "Item to-do was created" });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, done } = req.body;

  const todo = await Todo.findByPk(id);

  if (todo) {
    if (title) {
      todo.title = title;
    }

    if (done) {
      switch (done.toLowerCase()) {
        case "true":
        case "1":
          todo.done = true;
          break;
        case "false":
        case "0":
          todo.done = false;
          break;
      }
    }

    await todo.save();
    res.json({ item: todo });
  } else {
    res.status(404);
    res.json({ message: `Todo id ${id} was not find` });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);

  if (todo) {
    todo.destroy();
    res.json({
      message: `Todo id ${id} was deleted`,
    });
  } else {
    res.status(404);
    res.json({ message: `Todo id ${id} was not find` });
  }
};
