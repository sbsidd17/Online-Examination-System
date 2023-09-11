import express from "express";
import { createCategory, deleteCategory, editCategory, showAllCategory } from "../controllers/category.controller.js";
import { createExam, deleteExam, editExam, showAllExams } from "../controllers/Exam.controller.js";
import { createAnswer, createOption, createQuestion, deleteAnswer, deleteOption, deleteQuestion, editAnswer, editOption, editQuestion, getQuestionData } from "../controllers/question.controller.js";
import { createTest, deleteTest, editTest, getTestData, showAllTests } from "../controllers/test.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import uploadSingle from "../middlewares/multer.js";
import { isAdmin, isApproved, isInstructor } from "../middlewares/role.middleware.js";

const examRoute = express.Router()

// Category Routes
examRoute.post("/create-category", auth, isAdmin, createCategory)
examRoute.post("/edit-category", auth, isAdmin, editCategory)
examRoute.post("/delete-category", auth, isAdmin, deleteCategory)
examRoute.get("/all-categories", showAllCategory)

//Exams Routes
examRoute.post("/create-exam", auth, isInstructor, isApproved, uploadSingle, createExam)
examRoute.post("/edit-exam", auth, isInstructor, isApproved, uploadSingle, editExam)
examRoute.post("/delete-exam", auth, isInstructor, isApproved, deleteExam)
examRoute.get("/all-exams", showAllExams)

//Test Routes
examRoute.post("/create-test", auth, isInstructor, isApproved, createTest)
examRoute.post("/delete-test", auth, isInstructor, isApproved, deleteTest)
examRoute.post("/edit-test", auth, isInstructor, isApproved, editTest)
examRoute.get("/all-tests", showAllTests)
examRoute.get("/get-test-data/testId=:testId", auth, getTestData)

//Question Routes
examRoute.post("/create-question", auth, isInstructor, isApproved, uploadSingle, createQuestion)
examRoute.post("/edit-question", auth, isInstructor, isApproved, uploadSingle, editQuestion)
examRoute.post("/delete-question", auth, isInstructor, isApproved, deleteQuestion)
examRoute.get("/get-question-data/questionId=:questionId", auth, isInstructor, getQuestionData)

//Option Routes
examRoute.post("/create-option", auth, isInstructor, isApproved, uploadSingle, createOption)
examRoute.post("/edit-option", auth, isInstructor, isApproved, uploadSingle, editOption)
examRoute.post("/delete-option", auth, isInstructor, isApproved, deleteOption)

//Answer Routes
examRoute.post("/create-answer", auth, isInstructor, isApproved, uploadSingle, createAnswer)
examRoute.post("/edit-answer", auth, isInstructor, isApproved, uploadSingle, editAnswer)
examRoute.post("/delete-answer", auth, isInstructor, isApproved, deleteAnswer)


export default examRoute;