import express from "express";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";
import { buyFood, getChildren } from "../controllers/misc.controller.ts";

const miscRouter = express.Router();

miscRouter.get("/children",authMiddleWare,getChildren);
miscRouter.post("/buy/food",authMiddleWare,buyFood);

export default miscRouter;