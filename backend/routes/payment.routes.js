import express from "express";
import { createOrder, verifySignature } from "../controllers/payment.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-order", auth, createOrder);
paymentRoute.post("/verify", auth, verifySignature);

export default paymentRoute;
