import express from "express";
import { createCategory, deleteCategory, editCategory, showAllCategory } from "../controllers/category.controller.js";
import { createExam, showAllExams } from "../controllers/Exam.controller.js";
import { createAnswer, createOption, createQuestion } from "../controllers/question.controller.js";
import { createTest } from "../controllers/test.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import uploadSingle from "../middlewares/multer.js";
import { isAdmin, isInstructor } from "../middlewares/role.middleware.js";

const examRoute = express.Router()
// Category Routes
examRoute.post("/create-category", auth, isAdmin, createCategory)
examRoute.get("/all-categories", showAllCategory)
examRoute.post("/edit-category", auth, isAdmin, editCategory)
examRoute.post("/delete-category", auth, isAdmin, deleteCategory)

//Exams Routes
examRoute.post("/create-exam", auth, isInstructor, uploadSingle, createExam)
examRoute.get("/all-exams", showAllExams)
examRoute.post("/create-test", auth, isInstructor, createTest)
examRoute.post("/create-question", auth, isInstructor, uploadSingle, createQuestion)
examRoute.post("/create-option", auth, isInstructor, uploadSingle, createOption)
examRoute.post("/create-answer", auth, isInstructor, uploadSingle, createAnswer)


export default examRoute;