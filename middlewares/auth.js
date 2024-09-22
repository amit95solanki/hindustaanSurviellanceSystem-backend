import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
// Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler("Saale Login Kr phle", 401));
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Saale Fake ID Deta Hai", 401));
    if (user.role !== "admin")
        return next(new ErrorHandler("Saale Aukat Nhi Hai Teri", 403));
    next();
});
export const verifyToken = TryCatch(async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return next(new ErrorHandler("Token is required for authorization", 403));
    }
    // Remove 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    console.log("Token", token);
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decodedData", decodedData);
    // Attach decoded user data to request object
    req.user = decodedData;
    next();
});
