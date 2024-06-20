import { Request, Response, Next } from "express";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

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

export const signin = async(req: Request, res: Response, next: Next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorHandler(401, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid password"));
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
}