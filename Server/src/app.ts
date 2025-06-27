import express, {type Request, type Response} from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.ts";
import petRoutes from "./routes/pet.routes.ts";
import choreRoute from "./routes/chore.route.ts";
import miscRouter from "./routes/misc.route.ts";


const app = express();

app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/pet",petRoutes);
app.use("/api/chore",choreRoute);
app.use("/api/misc/",miscRouter);

app.get("/",(req:Request,res:Response)=>{
  res.status(200).json({
    message:"All working correctly"
  })
});


export default app;

