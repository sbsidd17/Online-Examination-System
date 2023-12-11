/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import {
  FcComboChart,
  FcContacts,
  FcManager,
  FcBusinessman,
  FcSalesPerformance,
} from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import AdminDashboardCard from "../components/AdminDashboardCard";
import {
  getAllInstructors,
  getAllPayment,
  getAllStudents,
} from "../redux/slices/adminSlice";
import { getAllExams } from "../redux/slices/examSlice";

function AdminDashboard() {
  const { exams } = useSelector((state) => state.exam);
  const { allStudents, allInstructors, allPayments } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  async function getData() {
    await dispatch(getAllExams());
    await dispatch(getAllStudents());
    await dispatch(getAllInstructors());
    await dispatch(getAllPayment());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-[70px] w-full min-h-[calc(100vh-70px)] bg-gray-100  md:px-20">
      <div className="flex flex-col gap-10">

        {/* heading */}
        <div className="mt-5 w-full flex justify-center items-center text-2xl bg-white shadow-md rounded-md md:p-5 gap-2">
          <FcComboChart size={32} />
          Admin Dashboard
        </div>

        {/* manage links */}
        <div className="flex justify-end items-start">
          <div className="flex gap-3">
            <Link to={"/admin-dashboard/edit-categories"} className="flex justify-center items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded-sm"><FaRegEdit size={18}/>Edit Categories</Link>
            <Link to={"/admin-dashboard/edit-slider-images"} className="flex justify-center items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded-sm"><FaRegEdit size={18}/>Edit Slider Images</Link>
          </div>
        </div>

        {/* dashboard cards */}
        <div className="flex justify-center items-center text-2xl bg-white shadow-md rounded-md p-5 gap-5 flex-wrap">
          <Link to={"/admin-dashboard/all-exams"}>
            {" "}
            <AdminDashboardCard
              title="Total Exams"
              total={exams?.allExams?.length}
              icon={<FcContacts size={40} />}
            />{" "}
          </Link>
          <Link to={"/admin-dashboard/all-students"}>
            {" "}
            <AdminDashboardCard
              title="Total Students"
              total={allStudents?.length}
              icon={<FcManager size={40} />}
            />{" "}
          </Link>
          <Link to={"/admin-dashboard/all-instructors"}>
            {" "}
            <AdminDashboardCard
              title="Total Instructors"
              total={allInstructors?.length}
              icon={<FcBusinessman size={40} />}
            />{" "}
          </Link>
          <Link to={"/admin-dashboard/all-payments"}>
            {" "}
            <AdminDashboardCard
              title="Total Revenue"
              total={`₹ ${allPayments?.total_amount / 100}`}
              icon={<FcSalesPerformance size={40} />}
            />{" "}
          </Link>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
