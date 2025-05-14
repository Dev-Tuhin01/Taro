import express from "express";

const petRoutes = express.Router();

petRoutes.post("/",()=>{});
petRoutes.get("/my",()=>{});
petRoutes.post("/:petId/feed",()=>{});
petRoutes.post("/:petId/exercise",()=>{});
petRoutes.post("/:petId/clean",()=>{});
petRoutes.post("/:petId/sleep",()=>{});

export default petRoutes;