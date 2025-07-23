// In Server/src/app.ts
import express, { type Request, type Response } from "express";
import cors from "cors";
import path from "path"; // <-- Make sure to import path
import authRouter from "./routes/auth.route.js";
import petRoutes from "./routes/pet.routes.js";
import choreRoute from "./routes/chore.route.js";
import miscRouter from "./routes/misc.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Your API routes
app.use("/api/auth", authRouter);
app.use("/api/pet", petRoutes);
app.use("/api/chore", choreRoute);
app.use("/api/misc/", miscRouter);

// --- Static File Serving and Catch-All Route ---
// This section is the fix
const __dirname = path.resolve();
const clientDistPath = path.join(__dirname, 'Client', 'dist');

// Serve static files from the React app
app.use(express.static(clientDistPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});
// --- End of Fix ---

export default app;