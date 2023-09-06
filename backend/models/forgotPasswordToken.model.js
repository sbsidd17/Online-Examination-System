import mongoose from "mongoose";

const forgotPasswordTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // This sets the document to expire after 300 seconds (5 minutes)
  },
});

const ForgotPasswordToken = mongoose.model("forgotPasswordToken", forgotPasswordTokenSchema);
export default ForgotPasswordToken;
