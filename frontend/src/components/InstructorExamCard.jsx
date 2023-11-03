/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FcDeleteDatabase, FcDataRecovery } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteExam } from "../redux/slices/instructorSlice";
import {GoAlert} from "react-icons/go"

function InstructorExamCard({ exam }) {
  const dispatch = useDispatch()

  function openModal(){
      document.querySelector("#modal").classList.remove("hidden")
  }

  function closeModal(){
    document.querySelector("#modal").classList.add("hidden")
  }

  async function deleteHandler(){
    await dispatch(deleteExam({
      exam_id:exam._id,
      category_id:exam.category
    }))
    document.querySelector("#modal").classList.add("hidden")
  }
  return (
    <>
      {/* card */}
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
          <Link to={`/edit-exam/${exam._id}`}>
            <button className="flex justify-center items-center gap-1 bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
              Edit Exam
              <FcDataRecovery size={22} />
            </button>
          </Link>
          <button onClick={openModal} className="flex justify-center items-center gap-1 bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
            Delete
            <FcDeleteDatabase size={22} />
          </button>
        </div>
      </div>
      {/* delete exam confirmation modal */}
      <main id="modal" className="hidden z-[99] fixed top-0 left-0 w-screen h-screen antialiased bg-[#6e6c6c00] text-gray-900 font-sans overflow-x-hidden">
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex items-center">
              <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <i className="text-3xl"><GoAlert /></i>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">Delete This Exam</p>
                <p className="text-sm text-gray-700 mt-1">
                  You will lose all data of this Exam data by deleting this Exam. This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button onClick={deleteHandler} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                Delete Exam
              </button>
              <button
              onClick={closeModal}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default InstructorExamCard;
