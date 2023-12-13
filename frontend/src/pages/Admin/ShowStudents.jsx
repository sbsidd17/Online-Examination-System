/* eslint-disable react-hooks/exhaustive-deps */

import {FcConferenceCall, FcFullTrash} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudents } from "../../redux/slices/adminSlice";
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
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";

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

  async function handleDelete(id) {
    await dispatch(deleteStudent(id));
    await getData();
  }

  useEffect(() => {
    getData();
  }, []);
  const activeStudent = allStudents?.filter((item) => item.hasPass);
  const inActiveStudents = allStudents?.length - activeStudent.length;
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
      <div className="flex flex-col md:flex-row justify-center items-center w-full bg-white">
        <div className="flex w-full md:w-1/3 justify-center items-center">
          <Pie
            className="pb-3 px-2.5"
            data={userData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-2/3 p-3 md:p-10 justify-normal items-center text-sm">
          <div className="flex gap-3 w-full md:w-1/3 justify-center items-center font-semibold">
            <div className="flex justify-center items-center">
              <FcConferenceCall size={32} />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center text-[#0ad0f4]">
              <div>Registered Students</div>
              <div>{allStudents?.length}</div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-1/3 justify-center items-center font-semibold">
            <div className="flex justify-center items-center">
              <FcConferenceCall size={32} />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center text-green-500">
              <div>Active Students</div>
              <div>{activeStudent.length}</div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-1/3 justify-center items-center font-semibold">
            <div className="flex justify-center items-center">
              <FcConferenceCall size={32} />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center text-red-500">
              <div>Inactive Students</div>
              <div>{inActiveStudents}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
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
                <tr
                  key={student._id}
                  className="hover:shadow-md hover:bg-slate-100 transition-all duration-500 ease-in-out"
                >
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
                      onClick={() => handleDelete(student._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowStudents;
