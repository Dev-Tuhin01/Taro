// In Server/src/app.ts

import express, { type Request, type Response } from "express";
import cors from "cors";
import path from "path"; // Import the 'path' module
import authRouter from "./routes/auth.route.ts";
import petRoutes from "./routes/pet.routes.ts";
import choreRoute from "./routes/chore.route.ts";
import miscRouter from "./routes/misc.route.ts";

const app = express();

app.use(cors({
  // Replace with your actual Vercel deployment URL in production
  origin: ["http://localhost:5173", "https://taro-rho.vercel.app"]
}));
app.use(express.json());

// API routes
app.use("/api/auth", authRouter);
app.use("/api/pet", petRoutes);
app.use("/api/chore", choreRoute);
app.use("/api/misc/", miscRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '/Client/dist')));

  // The "catchall" handler: for any request that doesn't match one above,
  // send back React's index.html file.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'))
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "API is running..."
    });
  });
}

export default app;