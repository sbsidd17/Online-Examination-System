import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import ShowExams from "../pages/ShowExams";
import ShowInstructors from "../pages/ShowInstructors";
import ShowStudents from "../pages/ShowStudents";


function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route path="/admin-dashboard/all-exams" element={<ShowExams />} />
        <Route path="/admin-dashboard/all-students" element={<ShowStudents />} />
        <Route path="/admin-dashboard/all-instructors" element={<ShowInstructors />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
