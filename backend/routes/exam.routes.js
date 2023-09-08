import express from "express";
import { createCatagory } from "../controllers/catagory.controller.js";
import { createExam } from "../controllers/Exam.controller.js";
import { createTest } from "../controllers/test.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import uploadSingle from "../middlewares/multer.js";
import { isAdmin, isInstructor } from "../middlewares/role.middleware.js";

const examRoute = express.Router()

examRoute.post("/create-catagory", auth, isAdmin, createCatagory)
examRoute.post("/create-exam", auth, isInstructor, uploadSingle, createExam)
examRoute.post("/create-test", auth, isInstructor, createTest)

export default examRoute;