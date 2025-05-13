import dotenv from "dotenv";

import app from "./app.ts";

dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port,()=>{
  console.log(`App is running on port:${port}`);
});