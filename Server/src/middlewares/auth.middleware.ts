import express from "express";
import Jwt from "jsonwebtoken";
import User,  {type UserDocument } from "../models/user.model.ts";

export interface AuthReq extends express.Request {
  user?: UserDocument;
}

export const authMiddleWare = async (req:AuthReq, res:express.Response, next: express.NextFunction) => {
  try {
    const token = req.header("authorization")?.replace("bearer", "");
    if(!token) throw new Error("No token found");

    const decoded = Jwt.verify(token,process.env.JWT_SECRET as string) as { userId: string};
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) throw new Error("No user found");
    req.user = user;
    next();
  } catch (error) {
    console.log(error as String);
    res.status(401).json({
      message: "Please Authenticate",
      error:(error as Error).message
    })
  }
}