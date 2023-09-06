import sendEmail from "../helpers/sendEmail.js";
import OTP from "../models/otp.model.js";
import { sendOtpTemplate } from "../templates/sendOtpTemplate.js";

const sendOTP = async (req, res) => {
  //take email from body
  const { email } = req.body;
  //generate 6 digit otp
  const generatedOtp = parseInt(Math.random() * 1000000 - 1);

  try {
    //Check OTP is Already Generated Or Not
    const isEmailExists = await OTP.findOne({ email });
    if (isEmailExists) {
      return res.status(400).json({
        success: false,
        msg: "OTP Already Generated For This Email. Wait for 5 Minutes To Generate New.",
      });
    }
    //save otp in database
    const otp = await OTP.create({
      email,
      otp: generatedOtp,
    });

    //Send OTP on User Email
    const message = sendOtpTemplate(generatedOtp)
    await sendEmail(email, "OTP for SignUp", message)
    //Return response
    return res.status(200).json({
      success: true,
      msg: "OTP sent Successfully.",
      otp,
    });

    
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error, otp not sent",
      error: error.message,
    });
  }
};

export { sendOTP };
