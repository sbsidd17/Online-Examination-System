import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // This sets the document to expire after 300 seconds (5 minutes)
  },
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
