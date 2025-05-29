import express from "express";
import type { AuthReq } from "../middlewares/auth.middleware.ts";
import Pet from "../models/pet.model.ts";

export const createPet = async (req:AuthReq, res: express.Response) => {
  try {
      if (req.user?.role !== "child") {
        res.status(403).json({
          error: "Only Children can create Taro"
        });
      }

      const existingPet = await Pet.findOne({ ownerId : req.user?._id});
      
      if (existingPet) {
        res.status(400).json({
          error: "A Taro already exists"
        });
      }

      const { name , type , variant } = req.body;

      const pet = new Pet({
        ownerId: req.user?._id,
        name,
        type,
        variant
      });

      await pet.save();


  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

