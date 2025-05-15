import {request, response, NextFunction, Response, Request} from "express";
import Jwt from "jsonwebtoken";
import User from "../models/user.model";
import { userInfo } from "os";

export const authMiddleWare = (req:Request, res:Response, next: NextFunction) => {
  try {
    const token = req.header("authorization")?.replace("bearer", "");
    if(!token) throw new Error("No token found");

    const decoded = Jwt.verify(token,process.env.JWT_SECRET as string) as { userId: string};
    const user = User.findById(decoded.userId).select("-password");
    if(!user) throw new Error("No user found");
  } catch (error) {
    console.log(error as String);
    res.status(401).json({
      message: "Please Authenticate"
    })
  }
}