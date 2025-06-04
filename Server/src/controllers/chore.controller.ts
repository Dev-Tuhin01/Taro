import express from "express"
import User from "../models/user.model.ts";
import type {AuthReq} from "../middlewares/auth.middleware.ts"
import Chore, { type choreDocument } from "../models/chore.model.ts"
import mongoose from "mongoose";
import { error } from "console";

interface queryInterface extends mongoose.Document {
  parentId ?: mongoose.Types.ObjectId;
  childId ?: mongoose.Types.ObjectId
}

export const postChores = async (req:AuthReq, res:express.Response) =>{
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
      childId:child!._id,
      title,
      description,
      bounty
    });



    await chore.save();

    res.status(201).json(
      chore
    );

  } catch (error) {
    res.status(500).json({
      error:(error as Error).message
    })   
  }
}

export const getChorelist = async (req:AuthReq, res:express.Response) =>{
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }
    const userId = req.user._id;
    const userRole = req.user.role;

    let chores:choreDocument[] = [];

    if(userRole === "parent"){
      chores = await Chore.find({ parentId: userId}).populate("parentId","userName").populate("childId","userName");
    } else if (userRole === "child") {
      chores = await Chore.find({ childId: userId}).populate("parentId","userName").populate("childId","userName");
    } else {
      res.status(403).json({
        error:"Role is not defined"
      });
    }
    res.status(200).json(
      chores
    );
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

export const getChore = async (req:AuthReq, res: express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

    const id = req.params.choreId;
    const chore = await Chore.findOne( { _id: id }).populate("parentId","userName").populate("childId","userName");

    if (!chore) {
      res.status(404).json({
        error: "Could not find a chore with this id"
      });
      return ;
    }

    res.status(200).json(chore);
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

export const choreComplete = async (req:AuthReq, res: express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

    if (req.user.role !== "child") {
      res.status(403).json({
        error:" Only children can complete chores"
      });
      return ;
    }
    const chore = await Chore.findOne({
      _id: req.params.choreId,
      childId: req.user._id
    });

    if (!chore) {
      res.status(404).json({
        error: "Chore not found"
      });

      return ;
    }

    if (chore.status !== "pending") {
      res.status(400).json({
        error: "Chore is already completed"
      });
    }

    chore.status = "completed";
    chore.completedAt = Date.now();

    await chore!.save();
    res.status(200).json(chore);
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

export const choreApprove = async (req:AuthReq, res:express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

    if(req.user.role !== "parent" ) {
      res.status(403).json({
        error: "Only parents can approve Chore"
      });
    }

    const chore = await Chore.findOne({
      _id: req.params.choreId,
      parentId: req.user._id
    });

    if(!chore) {
      res.status(400).json({
        error: "No Chore found"
      });

      return ;
    }

    if( chore.status !== "completed"){
      res.status(400).json({
        error: "Chore not completed yet"
      });
    }

    chore.status = "approved";
    const now = Date.now();
    chore.approvedAt = now;

    const child = await User.findById(chore.childId);
    if(!child){
      res.status(404).json({
        error:"could not find child assigned with this chore"
      }) ;
      return ;
    }
    child.taroDollar += chore.bounty;
    await child.save();

    await chore.save();

    res.status(200).json(chore);

  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    })
  }
}

