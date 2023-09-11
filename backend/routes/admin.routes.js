import express from "express";
import { approveInstructor, deleteStudent, viewAllInstructors, viewAllStudents } from "../controllers/admin.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const adminRoute = express.Router();

adminRoute.get("/all-students", auth, isAdmin, viewAllStudents);
adminRoute.get("/delete-student/id=:id", auth, isAdmin, deleteStudent);
adminRoute.get("/all-instructor", auth, isAdmin, viewAllInstructors);
adminRoute.get("/approve-instructor/id=:id", auth, isAdmin, approveInstructor);

export default adminRoute;
