import express from "express";
import { createPet, feedPet, getMyPet,exercisePet, cleanPet, sleepPet } from "../controllers/pet.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const petRoutes = express.Router();

petRoutes.post("/",authMiddleWare, createPet);
petRoutes.get("/my",authMiddleWare,getMyPet);
petRoutes.post("/:petId/feed",authMiddleWare,feedPet);
petRoutes.post("/:petId/exercise",authMiddleWare,exercisePet);
petRoutes.post("/:petId/clean",authMiddleWare,cleanPet);
petRoutes.post("/:petId/sleep",authMiddleWare,sleepPet);

export default petRoutes;