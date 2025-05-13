import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import petRoutes from "./routes/pet.routes";
import choreRoute from "./routes/chore.route";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/pet",petRoutes);
app.use("/api/chore",choreRoute);


export default app;

