import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const generateJWTToken = (userId:string) => jwt.sign({ userId }, process.env.JWT_SECRET as string, {
  expiresIn: "15d",
})
