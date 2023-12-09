/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FcFullTrash } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudents } from "../redux/slices/adminSlice";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function ShowStudents() {
  const dispatch = useDispatch();
  const { allStudents } = useSelector((state) => state.admin);

  async function getData() {
    await dispatch(getAllStudents());
  }

  useEffect(() => {
    getData();
  }, []);
  const activeStudent = allStudents?.filter((item) => item.hasPass);
  const inActiveStudents = allStudents.length - activeStudent.length;
  const userData = {
    labels: ["Active Students", "Inactive Students"],
    fontColor: "#fff",
    datasets: [
      {
        label: "",
        data: [activeStudent.length, inActiveStudents],
        backgroundColor: ["green", "red"],
        borderWidth: 1,
        borderColor: ["green", "red"],
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="w-full h-60">
        <Pie
          className="pb-3 px-2.5"
          data={userData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <table className="w-full border-separate border-spacing-2 border bg-white">
        <thead className="bg-slate-300 font-semibold">
          <tr>
            <td>S.N.</td>
            <td>Name</td>
            <td>Email</td>
            <td>Subscription</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {allStudents?.map((student, index) => {
            return (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.email}</td>
                <td>
                  {student.hasPass ? (
                    <div className="bg-green-500 text-white p-1 text-center">
                      Active
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white p-1 text-center">
                      Inactive
                    </div>
                  )}
                </td>
                <td className="text-center">
                  <FcFullTrash
                    className="hover:cursor-pointer"
                    size={28}
                    onClick={() => {
                      dispatch(deleteStudent(student._id));
                      getData();
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowStudents;
