import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Please enter Name"],
        validate: validator.default.isEmail,
    },
});
export const Email = mongoose.model("email", schema);
