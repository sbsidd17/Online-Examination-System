/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {FcDeleteDatabase, FcDataRecovery} from "react-icons/fc"

function InstructorExamCard({ exam }) {
  return (
    <div className="flex flex-col w-[300px] bg-white rounded-md shadow-md p-5 gap-3">
      <div className="flex justify-center items-center">
        <img className="w-[280px]" src={exam.thumbnail} alt="ExamThumbnail" />
      </div>
      <div className="font-semibold">{exam.exam_name}</div>
      <div className="text-sm">{exam.all_tests.length} Total Tests</div>
      <div className="text-sm">Price : {exam.price} Rupees</div>
      <div className="text-sm">
        Enrolled Users : {exam.enrolled_student.length}
      </div>
      <div className="flex justify-between items-center">
      <Link to={`/edit-exam/${exam._id}`} >
        <button className="flex justify-center items-center gap-1 bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
          Edit Exam
          <FcDataRecovery size={22}/>
        </button>
      </Link>
      <button className="flex justify-center items-center gap-1 bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
          Delete
          <FcDeleteDatabase size={22}/>
        </button>
      </div>
    </div>
  );
}

export default InstructorExamCard;
