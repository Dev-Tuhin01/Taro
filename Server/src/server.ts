import dotenv from "dotenv";
import path from "path";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port, async ()=>{
  await connectDB();
  console.log(`App is running on port:${port}`);
});