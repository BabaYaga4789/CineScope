import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../models/User";

const UserController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await getUser(username);
      if (user.length === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        if (user[0].password === password) {
          res.json(user);
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getUserByID(req: Request, res: Response) {
    const id = req.params.userId;
    try {
      const user = await getUserById(id);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createUser(req: Request, res: Response) {
    const { email, password, userName, genres, dob } = req.body;

    try {
      const user = await createUser(email, password, userName, genres, dob);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { email, password, userName, genres, dob } = req.body;
      const user = await updateUser({ email, password, userName, genres, dob });
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const id = req.params.userId;
    try {
      const user = await deleteUser(id);
      res.json(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default UserController;
