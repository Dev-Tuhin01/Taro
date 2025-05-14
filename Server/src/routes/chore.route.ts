import express from "express";

const choreRoute = express.Router();

choreRoute.post("/",()=>{});
choreRoute.get("/",()=>{});
choreRoute.patch("/:choreId/complete",()=>{});
choreRoute.patch("/:choreId/approve",()=>{});

export default choreRoute;