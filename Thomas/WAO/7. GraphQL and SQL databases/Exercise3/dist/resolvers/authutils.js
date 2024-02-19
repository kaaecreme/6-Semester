// authUtils.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SALT_ROUNDS = 10;
export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
};
export const authenticate = async (userid, password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
        return {
            code: "200",
            success: true,
            message: "User authenticated successfully!",
            token: generateToken(userid),
        };
    }
    else {
        return {
            code: "400",
            success: false,
            message: "Invalid credentials!",
        };
    }
};
export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
