import dotenv from "dotenv";

import app from "./app.ts";
import connectDB from "./config/db.ts";

dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port, async ()=>{
  await connectDB();
  console.log(`App is running on port:${port}`);
});