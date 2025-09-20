import type { AuthReq } from "../middlewares/auth.middleware.ts";
import express from "express";
import User from "../models/user.model.js";

export const getChildren = async (req:AuthReq, res:express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }
    
    if (req.user.role !== "parent") {
      res.status(403).json({
        error: "Only Parents can see their children"
      });

      return ;
    }

    const children = await User.find({parentId: req.user._id , role:"child"}).select("-password");

    res.status(200).json(children);

  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

export const buyFood = async (req:AuthReq, res:express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
  }

  const { unitOfFood } = req.body;
  
  if(!unitOfFood || unitOfFood === 0) {
    res.status(400).json({
      error: " Cannot buy nothing amount of Food"
    });

    return ;
  }

  const moneyNeeded = unitOfFood * 5;

  if (req.user.taroDollar < moneyNeeded) {
    res.status(400).json({
      error: "Not sufficient Balance"
    });
    return ;
  }

  req.user.taroDollar -= moneyNeeded;
  req.user.food += unitOfFood;

  await req.user.save();

  res.status(200).json({
    taroDollar:req.user.taroDollar,
    food: req.user.food
  });

  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}