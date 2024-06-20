import mongoose from "mongoose";

interface User extends mongoose.Document {
    _doc: User;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export const User = mongoose.model<User>("User", userSchema);