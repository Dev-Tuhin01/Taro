import { Request, Response } from "express"
import User from "../models/user.model";
import { authReq } from "../middlewares/auth.middleware.ts";
import Chore from "../models/chore.model.ts"
import app from "../app";
import mongoose from "mongoose";

interface queryInterface extends mongoose.Document {
  parentId ?: mongoose.Types.ObjectId;
  childId ?: mongoose.Types.ObjectId
}

export const postChores = async (req:authReq, res:Response) =>{
  try {

    if(req.user?.role !== "parent"){
      res.status(403).json({
        error:"Only parents can create chore"
      });
    }

    const { title, description, bounty, childName } = req.body;

    const child = await User.findOne({
      userName: childName,
      parentId: req.user?._id
    });

    if(!child){
      res.status(400).json({
        error:"invalid child name"
      });
    }
    
    const chore = new Chore({
      parentId:req.user?._id,
      childId:child._id,
      title,
      description,
      bounty
    });

    await chore.save();

    res.status(201).json(
      chore
    );

  } catch (error) {
    res.status(400).json({
      error:(error as Error).message
    })   
  }
}

export const getChorelist = async (req:authReq, res:Response) =>{
  try {

    const userId = req.user._id;
    const userRole = req.user.role;

    let chores;

    if(userRole === "parent"){
      chores = await Chore.find({ parentId: userId}).populate("parentId").populate("childId");
    } else if (userRole === "child") {
      chores = await Chore.find({ parentId: userId}).populate("parentId").populate("childId");
    } else {
      res.status(403).json({
        error:"Role is not defined"
      });
    }
    
    res.status(200).json(
      chores
    );
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export const choreComplete = async (req:authReq, res: Response) => {
  try {
    const chore = await Chore.findOne({
      _id: req.params.choreId,
      childId: req.user._id
    });

    if (!chore) {
      res.status(404).json({
        error: "Chore not found"
      });
    }

    if (chore.status !== "pending") {
      res.status(400).json({
        error: "Chore is already completed"
      });
    }

    chore.status = "completed";
    chore.completedAt = Date.now();

    await chore.save();
    res.status(200).json(chore);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export const choreApprove = async (req:authReq, res:Response) => {
  try {
    if(req.user?.role !== "parent" ) {
      res.status(403).json({
        error: "Only parents can approve Chore"
      });
    }

    const chore = await Chore.findOne({
      _id: req.params.choreId,
      parentId: req.user?._id
    });

    if(!chore) {
      res.status(400).json({
        error: "No Chore found"
      });
    }

    if( chore.status !== "completed"){
      res.status(400).json({
        error: "Chore not completed yet"
      });
    }

    chore.status = "Approved";
    chore.approvedAt = Date.now();

    const child = await User.findById(chore.childId);
    child.taroDollars += chore.bounty;
    await child.save();

    await chore.save();

    res.status(200).json(chore);

  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    })
  }
}

