import express from "express";
import { EmailVerify } from "../controllers/emailValidate.js";
const app = express.Router();
// Route - /api/v1/user/new
app.post("/email-verify", EmailVerify);
export default app;
