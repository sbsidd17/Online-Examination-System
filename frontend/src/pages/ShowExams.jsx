import React from "react";
import { useLocation} from "react-router-dom";
import { FcFullTrash } from "react-icons/fc";
import { useDispatch } from "react-redux";

function ShowExams() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { examsData } = location.state;
  console.log(examsData);
  return (
    <div className="w-full">
      <table className="w-full border-separate border-spacing-2 border bg-white">
        <thead className="bg-slate-300 font-semibold">
          <tr>
            <td>S.N.</td>
            <td>Exam Name</td>
            <td>Created By</td>
            <td>Total Tests</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {examsData?.map((exam, index) => {
            return (
              <tr key={exam._id}>
                <td>{index + 1}</td>
                <td>
                  {exam.exam_name}
                </td>
                <td>{exam.instructor.first_name} {exam.instructor.last_name}</td>
                <td>
                  {exam.all_tests.length}
                </td>
                <td>
                  <FcFullTrash size={28} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowExams;
