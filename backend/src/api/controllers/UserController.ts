import { Request, Response } from "express";
import { createUser, getUser } from "../models/User";

const UserController = {
  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await getUser(id);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createUser(req: Request, res: Response) {
    const { email, password, name, displayName, genres } = req.body;

    try {
      const user = await createUser(email, password, name, displayName, genres);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateUser(req: Request, res: Response) {
    const { email, password, name, displayName, genres } = req.body;
    try {
      const user = await createUser(email, password, name, displayName, genres);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await getUser(id);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default UserController;
