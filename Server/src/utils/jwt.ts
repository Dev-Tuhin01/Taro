import jwt from "jsonwebtoken";

export const generateJWTToken = (userId:string) => jwt.sign({ userId }, process.env.JWT_SECRET as string, {
  expiresIn: "15d",
});
