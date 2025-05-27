import express from "express";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";
import { choreApprove, choreComplete, getChorelist, postChores } from "../controllers/chore.controller.ts";

const choreRoute = express.Router();

choreRoute.post("/",authMiddleWare , postChores);
choreRoute.get("/",authMiddleWare,getChorelist);
choreRoute.patch("/:choreId/complete",choreComplete);
choreRoute.patch("/:choreId/approve",choreApprove);

export default choreRoute;