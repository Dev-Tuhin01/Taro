import express from "express";
import type { AuthReq } from "../middlewares/auth.middleware.ts";
import Pet from "../models/pet.model.ts";
import updatePetStat from "../utils/updatePetStats.ts";

export const createPet = async (req:AuthReq, res: express.Response) => {
  try {
      if(!req.user){
        res.status(400).json({
          error: " Authentication Error"
        });
        return ;
      }

      if (req.user.role !== "child") {
        res.status(403).json({
          error: "Only Children can create Taro"
        });
      }

      const existingPet = await Pet.findOne({ ownerId : req.user._id});
      
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
      res.status(201).json({
        pet,
        message: "Pet Created successfully"
      });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

export const getMyPet = async (req:AuthReq, res:express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

  const pet = await Pet.findOne({ ownerId : req.user._id});

  if (!pet) {
    res.status(404).json({
      error: "No Taro found for you"
    });
    return ;
  }

  updatePetStat(pet);
  await pet.save();

  res.status(200).json(pet);

  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

// interactions

export const feedPet = async (req: AuthReq , res:express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }
    const pet = await Pet.findOne({_id:req.params.petId , ownerId: req.user._id});

    if (!pet) {
      res.status(404).json({
        error: "No Taro found"
      });
      return ;
    }

    updatePetStat(pet);

    const { food } = req.body;

    if( !food ) {
      res.status(400).json({
        error: " Without Food Taros can't eat"
      });
      return ;
    }

    if (food > req.user?.food) {
      res.status(400).json({
        error : " Not Enough Food in inventory"
      });

      return ;
    }

    const foodPoint = food * (pet.state === "malnourished" ? 40 : 80);

    pet.hunger = Math.min((pet.hunger + foodPoint) , pet.maxHunger);
    pet.lastFed = Date.now();

    await pet.save();

    req.user.food -= food;
    await req.user.save();
    res.status(200).json({
      pet,
      food: req.user.food
    });

  } catch (error) {
    res.status(500).json({
      error:(error as Error).message
    });
  }
}

export const exercisePet = async (req:AuthReq, res:express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

    const pet = await Pet.findOne({_id:req.params.petId , ownerId: req.user._id});

    if (!pet) {
      res.status(404).json({
        error: "No Taro found"
      });
      return ;
    }

    updatePetStat(pet);

    if (pet.stamina < 30 ) {
      res.status(400).json({
        error: " Taro is too tire to excersize"
      }); 
    }

    pet.stamina -= 30;
    pet.lastExercised = Date.now();
    pet.filth += 5;

    req.user.taroDollar += 10;

    await req.user.save();
    await pet.save();

    res.status(200).json({
      pet,
      taroDollar: req.user.taroDollar
    })

  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }  
}

export const cleanPet = async (req: AuthReq, res: express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

    const pet = await Pet.findOne({_id:req.params.petId , ownerId: req.user._id});

    if (!pet) {
      res.status(404).json({
        error: "No Taro found"
      });
      return ;
    }

    updatePetStat(pet);

    pet.filth = Math.max(0, (pet.filth - 50));
    pet.livingConditions = Math.min(255, pet.livingConditions + 30);
    pet.lastCleaned = Date.now();

    await pet.save();

    res.status(200).json(pet);
    
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}

export const sleepPet = async (req:AuthReq, res: express.Response) => {
  try {
    if(!req.user){
      res.status(400).json({
        error: " Authentication Error"
      });
      return ;
    }

    const pet = await Pet.findOne({_id:req.params.petId , ownerId: req.user._id});

    if (!pet) {
      res.status(404).json({
        error: "No Taro found"
      });
      return ;
    }

    updatePetStat(pet);

    pet.stamina = pet.maxStamina;
    await pet.save();

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message
    });
  }
}
