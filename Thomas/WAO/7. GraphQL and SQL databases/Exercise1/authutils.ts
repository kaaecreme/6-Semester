// authUtils.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginResponse } from "../__generated__/resolvers-types";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

export const authenticate = async (
  userid,
  password,
  hashedPassword
): Promise<LoginResponse> => {
  const match = await bcrypt.compare(password, hashedPassword);
  if (match) {
    return {
      code: "200",
      success: true,
      message: "User authenticated successfully!",
      token: generateToken(userid),
    };
  } else {
    return {
      code: "400",
      success: false,
      message: "Invalid credentials!",
    };
  }
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
