import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import EditCategories from "../pages/EditCategories";
import EditSliderImages from "../pages/EditSliderImages";
import ShowExams from "../pages/ShowExams";
import ShowInstructors from "../pages/ShowInstructors";
import ShowPayments from "../pages/ShowPayments";
import ShowStudents from "../pages/ShowStudents";


function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route path="/admin-dashboard/all-exams" element={<ShowExams />} />
        <Route path="/admin-dashboard/all-students" element={<ShowStudents />} />
        <Route path="/admin-dashboard/all-instructors" element={<ShowInstructors />} />
        <Route path="/admin-dashboard/all-payments" element={<ShowPayments />} />
        <Route path="/admin-dashboard//edit-categories" element={<EditCategories />} />
        <Route path="/admin-dashboard/edit-slider-images" element={<EditSliderImages />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
