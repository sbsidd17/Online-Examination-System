/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FcFullTrash } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudents } from "../redux/slices/adminSlice";

function ShowStudents() {
  const [studentsData, setStudentsData] = useState();
  const dispatch = useDispatch();
  console.log(studentsData);
  const { allStudents } = useSelector((state) => state.admin);

  async function getData() {
    await dispatch(getAllStudents());
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (allStudents) {
      setStudentsData(allStudents);
    }
  }, [allStudents]);

  return (
    <div className="w-full">
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
          {studentsData?.map((student, index) => {
            return (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.email}</td>
                <td>
                  {student.hasPass ? <div>Active</div> : <div>Inactive</div>}
                </td>
                <td>
                  <FcFullTrash
                    className="hover:cursor-pointer"
                    size={28}
                    onClick={() => {
                      dispatch(deleteStudent(student._id));
                      window.location.reload()
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
