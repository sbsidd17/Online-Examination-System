/* eslint-disable react/prop-types */

import { FaEdit } from "react-icons/fa";
import { FcDocument, FcOvertime, FcQuestions } from "react-icons/fc";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTest } from "../redux/slices/instructorSlice";

function InstructorTestCard({ test, exam_id }) {
  const dispatch = useDispatch()
async function deleteHandler(){
    await dispatch(deleteTest({test_id:test._id, exam_id}))
}
  return (
    // main div
    <div className="flex justify-between items-center bg-white w-full shadow-md py-5 px-20">
      {/* left */}
      <div className="flex flex-col gap-2 w-1/2">
        <h1>{test.test_name}</h1>
        <div className="flex justify-start items-center gap-2">
          <div className="flex justify-center items-center">
            <FcQuestions />
            <p className="text-sm text-slate-500">{`${test.total_questions} Questions`}</p>
          </div>
          <div className="flex justify-center items-center">
            <FcDocument />{" "}
            <p className="text-sm text-slate-500">{`${test.total_marks} Marks`}</p>
          </div>
          <div className="flex justify-center items-center">
            <FcOvertime />{" "}
            <p className="text-sm text-slate-500">{`${test.total_time} Mins`}</p>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex justify-normal items-center gap-3">
        <Link to={`/edit-test/${test._id}`}>
            <FaEdit size={22}/>
        </Link>
        <button onClick={deleteHandler}><RiDeleteBin2Line size={22}/></button>
      </div>
    </div>
  );
}

export default InstructorTestCard;
