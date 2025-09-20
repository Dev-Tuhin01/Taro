import type {Request ,Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateJWTToken } from "../utils/jwt.js";

export const register = async (req:Request, res:Response) => {
  try {
    const { userName, password, role, parentCode } = req.body;

    const existingUser = await User.findOne({userName});

    if(existingUser) {
      res.status(409).json({
        error: "User Already exist"
      });
      return ;
    }

    const hashedPassword = await bcrypt.hash(password,10);
    let parentId = null;

    if ( role === "child" && !parentCode ) {
      res.status(400).json({
        error: "Children Need Parent to be born"
      });
    }
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
    });

    await user.save();

    const token = generateJWTToken(user._id as string);

    res.status(201).json({
      user: {
        ...user.toObject(),
        password:undefined
      },
      token
    });

  } catch (error: unknown) {
    res.status(400).json({
      error:(error as Error).message
    });
  }
}

export const login = async (req:Request, res:Response) => {
  try {
    const {userName, password, role} = req.body;
    
    const user = await User.findOne({userName,role});

    if(!user) {
      res.status(401).json({
        error:" Invalid Credential"
      });
      return ;
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch) {
      res.status(401).json({
        error: "invalid credentials"
      });
    }

    const token = generateJWTToken( user._id as string);

    res.status(200).json({
      user:{
        ...user.toObject(),
        password:undefined
      },
      token
    });

  } catch (error:unknown) {
    res.status(400).json({
      error:(error as Error).message
    });
  }
}