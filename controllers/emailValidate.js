import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { sendMail } from "../utils/mailer.js";
import CryptoJS from 'crypto-js';
const encryptString = (text, secretKey) => {
    const cipherText = CryptoJS.AES.encrypt(text, secretKey).toString();
    return cipherText.replace(/\//g, '_'); // Replace '/' with '_'
};
export const EmailVerify = TryCatch(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    console.log("jai shree ram");
    const encryptedText = encryptString(email, process.env.ACCESS_TOKEN_SECRET);
    console.log('Encrypted Text:', encryptedText);
    let msg = '<p>Please click the following link to verify your email: <a href="http://localhost:3000/macho-man-shop/sign-up/' +
        encryptedText +
        '">Verify Email</a></p>';
    sendMail(email, "Macho man email verify", msg);
    res.status(200).json({
        success: true,
        message: `email Verify successfully`,
    });
});
