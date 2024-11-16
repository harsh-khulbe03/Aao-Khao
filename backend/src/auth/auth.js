import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const salt = parseInt(process.env.SALT_ROUNDS);

export async function encryptPassword(plainPassword) {
  const hashedPassword = bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

export async function comparePassword(plainPassword, hashPassword) {
  const res = await bcrypt.compare(plainPassword, hashPassword);
  return res;
}

export function generateToken(userId, email) {
    const token = jwt.sign({_id:userId,email},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
    return token;
}

