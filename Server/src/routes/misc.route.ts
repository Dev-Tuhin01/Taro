import express from "express";
import { authMiddleWare } from "../middlewares/auth.middleware.js";
import { buyFood, getChildren } from "../controllers/misc.controller.js";

const miscRouter = express.Router();

miscRouter.get("/children",authMiddleWare,getChildren);
miscRouter.post("/buy/food",authMiddleWare,buyFood);

export default miscRouter;