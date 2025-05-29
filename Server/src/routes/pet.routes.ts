import express from "express";
import { createPet, feedPet, getMyPet,exercisePet, cleanPet } from "../controllers/pet.controller.ts";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";

const petRoutes = express.Router();

petRoutes.post("/",authMiddleWare, createPet);
petRoutes.get("/my",authMiddleWare,getMyPet);
petRoutes.post("/:petId/feed",authMiddleWare,feedPet);
petRoutes.post("/:petId/exercise",authMiddleWare,exercisePet);
petRoutes.post("/:petId/clean",authMiddleWare,cleanPet);
petRoutes.post("/:petId/sleep",()=>{});

export default petRoutes;