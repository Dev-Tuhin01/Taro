import type {Request ,Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.ts";
import { generateJWTToken } from "../utils/jwt.ts";

export const register = async (req:Request, res:Response) => {
  try {
    const { userName, password, role, parentCode } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    let parentId = null;

    if ( role === "child" && parentCode ) {
      const parent = await User.findOne({
        userName: parentCode ,
         role: "parent"});
      if(!parent) {
        res.status(400).json({
          error: "Invalid Parent Code"
        });
      }

      parentId = parent?._id;
    }

    const user = new User({
      userName,
      password:hashedPassword,
      role,
      parentId
    })

    await user.save();

    const token = generateJWTToken(user._id as string);

    res.status(201).json({
      user: {
        ...user.toObject(),
        password:undefined
      },
    });

  } catch (error: unknown) {
    res.status(400).json({
      error:(error as Error).message
    })
  }
}

export const login = async (req:Request, res:Response) => {
  try {
    const {userName, password} = req.body;
    
    const user = await User.findOne({userName});

    if(!user) {
      res.status(401).json({
        error:" Invalid Credential"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch) {
      res.status(401).json({
        error: "invalid credentials"
      });
    }

    const token = generateJWTToken( user._id as string);

    res.status

  } catch (error:unknown) {
    res.status(400).json({
      error:(error as Error).message
    })
  }
}