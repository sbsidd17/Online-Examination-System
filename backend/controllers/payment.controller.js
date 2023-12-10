import razorpayInstance from "../config/razorpayInstance.js";
import "dotenv/config";
import crypto from "crypto";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  const { amount, email } = req.body;
  let options = {
    amount: Number(amount) * 100,
    currency: "INR",
    receipt: email,
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
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const data = order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRATE)
    .update(data.toString())
    .digest("hex");

  if (generated_signature == razorpay_signature) {
    const user_id = req.user.id;
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

export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const allPayments = await razorpayInstance.orders.all({
      count: count || 100,
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.created_at * 1000);

      return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
      success: true,
      message: "All Payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};
