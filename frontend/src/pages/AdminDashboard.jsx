/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import {
  FcComboChart,
  FcContacts,
  FcManager,
  FcBusinessman,
} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { getAllInstructors, getAllStudents } from "../redux/slices/adminSlice";
import { getAllExams } from "../redux/slices/examSlice";
import ShowInstructors from "./ShowInstructors";

function AdminDashboard() {
  const { exams } = useSelector((state) => state.exam);
  const { allStudents, allInstructors } = useSelector((state) => state.admin);
  const [examsData, setExamsData] = useState();
  const [studentsData, setStudentsData] = useState();
  const [instructorsData, setInstructorsData] = useState();
  const dispatch = useDispatch();

  async function getData() {
    await dispatch(getAllExams());
    await dispatch(getAllStudents());
    await dispatch(getAllInstructors());
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (exams) {
      setExamsData(exams?.allExams);
    }
    if (allStudents) {
      setStudentsData(allStudents);
    }
    if (allInstructors) {
      setInstructorsData(allInstructors);
    }
  }, [exams, allStudents, allInstructors]);

  // console.log(examsData);
  return (
    <div className="mt-[70px] w-full min-h-[calc(100vh-70px)] bg-gray-100 p-5 md:p-20">
      <div className="flex flex-col gap-10">
        {/* heading */}
        <div className="w-full flex justify-center items-center text-2xl bg-white shadow-md rounded-md p-5 gap-2">
          <FcComboChart size={32} />
          Admin Dashboard
        </div>
        <div className="flex justify-center items-center text-2xl bg-white shadow-md rounded-md p-5 gap-5 flex-wrap">
          <Link to={"/admin-dashboard/all-exams"} state={{examsData}}>
            {" "}
            <AdminDashboardCard
              title="Total Exams"
              total={examsData?.length}
              icon={<FcContacts size={40} />}
            />{" "}
          </Link>
          <Link to={"/admin-dashboard/all-students"} state={{studentsData}}>
            {" "}
            <AdminDashboardCard
              title="Total Students"
              total={studentsData?.length}
              icon={<FcManager size={40} />}
            />{" "}
          </Link>
          <Link to={"/admin-dashboard/all-instructors"} state={{instructorsData}}>
            {" "}
            <AdminDashboardCard
              title="Total Instructors"
              total={instructorsData?.length}
              icon={<FcBusinessman size={40} />}
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
