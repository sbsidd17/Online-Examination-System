import express from "express";
import { createCategory, deleteCategory, editCategory, showAllCategory } from "../controllers/category.controller.js";
import { createExam, deleteExam, editExam, showAllExams } from "../controllers/Exam.controller.js";
import { createAnswer, createOption, createQuestion, deleteAnswer, deleteOption, deleteQuestion, editAnswer, editOption, editQuestion } from "../controllers/question.controller.js";
import { createTest, deleteTest, editTest, showAllTests } from "../controllers/test.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import uploadSingle from "../middlewares/multer.js";
import { isAdmin, isInstructor } from "../middlewares/role.middleware.js";

const examRoute = express.Router()
// Category Routes
examRoute.post("/create-category", auth, isAdmin, createCategory)
examRoute.post("/edit-category", auth, isAdmin, editCategory)
examRoute.post("/delete-category", auth, isAdmin, deleteCategory)
examRoute.get("/all-categories", showAllCategory)

//Exams Routes
examRoute.post("/create-exam", auth, isInstructor, uploadSingle, createExam)
examRoute.post("/edit-exam", auth, isInstructor, uploadSingle, editExam)
examRoute.post("/delete-exam", auth, isInstructor, deleteExam)
examRoute.get("/all-exams", showAllExams)

//Test Routes
examRoute.post("/create-test", auth, isInstructor, createTest)
examRoute.post("/delete-test", auth, isInstructor, deleteTest)
examRoute.post("/edit-test", auth, isInstructor, editTest)
examRoute.get("/all-tests", showAllTests)

//Question Routes
examRoute.post("/create-question", auth, isInstructor, uploadSingle, createQuestion)
examRoute.post("/edit-question", auth, isInstructor, uploadSingle, editQuestion)
examRoute.post("/delete-question", auth, isInstructor, deleteQuestion)

//Option Routes
examRoute.post("/create-option", auth, isInstructor, uploadSingle, createOption)
examRoute.post("/edit-option", auth, isInstructor, uploadSingle, editOption)
examRoute.post("/delete-option", auth, isInstructor, deleteOption)

//Answer Routes
examRoute.post("/create-answer", auth, isInstructor, uploadSingle, createAnswer)
examRoute.post("/edit-answer", auth, isInstructor, uploadSingle, editAnswer)
examRoute.post("/delete-answer", auth, isInstructor, deleteAnswer)


export default examRoute;