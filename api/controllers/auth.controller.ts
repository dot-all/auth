import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

export const signup = async(req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({username, email, password: hashedPassword});
  try {
    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente!" })
  } catch (error) {
    res.status(500).json(error.message);
  }
}