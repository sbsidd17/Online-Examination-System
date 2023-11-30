import razorpayInstance from "../config/razorpayInstance.js";
import "dotenv/config";
import crypto from "crypto";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  const { amount } = req.body;
  let options = {
    amount: Number(amount) * 100,
    currency: "INR",
  };
  const key = process.env.RAZORPAY_KEY_ID;
  try {
    // create order
    razorpayInstance.orders.create(options, function (err, order) {
      if (!err) {
        // return response
        return res.status(200).json({
          success: "true",
          msg: "Order Created Successfully",
          order,
          key,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const verifySignature = async (req, res) => {
  const {order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const data = order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRATE)
    .update(data.toString())
    .digest("hex");

  if (generated_signature == razorpay_signature) {

    const user_id = req.user.id
    // find user and update
    await User.findByIdAndUpdate(
      { _id: user_id },
      {
        hasPass: true,
      },
      {
        new: true,
      }
    ).exec();
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Payment Success",
    });
  }

  return res.status(500).json({
    success: "false",
    msg: "Payment Failed",
  });
};
