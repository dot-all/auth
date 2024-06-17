import { Request, Response, Next } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

export const signup = async(req: Request, res: Response, next: Next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({username, email, password: hashedPassword});
  try {
    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente!" })
  } catch (error) {
    next(error);
  }
}