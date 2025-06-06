import express from "express";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";
import { choreApprove, choreComplete, getChorelist, getChore, postChores } from "../controllers/chore.controller.ts";

const choreRoute = express.Router();

choreRoute.post("/",authMiddleWare , postChores);
choreRoute.get("/",authMiddleWare,getChorelist);
choreRoute.get("/:choreId",authMiddleWare,getChore);
choreRoute.patch("/:choreId/complete",authMiddleWare,choreComplete);
choreRoute.patch("/:choreId/approve",authMiddleWare,choreApprove);

export default choreRoute;