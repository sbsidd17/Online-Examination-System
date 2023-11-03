/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FcAddDatabase } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import InstructorExamCard from "../components/InstructorExamCard";
import { getExamsByInstructor } from "../redux/slices/instructorSlice";

function InstructorDashboard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const examData = useSelector((state) => state.instructor.instructorExams);
  console.log(examData);
  async function getExamData() {
    await dispatch(getExamsByInstructor(id));
  }

  useEffect(() => {
    getExamData();
  }, [id]);
  return (
    <div className="mt-[70px] w-full">
      {/* main div */}
      <div className="w-full flex flex-col bg-[#fbfcfc] gap-10">
        <div className="w-full flex justify-center items-center pt-5">
          <h1 className="text-2xl font-semibold text-slate-500">
            Instructor Dashboard
          </h1>
        </div>

        <Link to={"/create-exam"} className="flex justify-center items-center">
          <button className="flex justify-center items-center gap-2 bg-green-400 px-5 py-2 text-white rounded-md hover:bg-green-500 transition-all duration-200 hover:scale-95">
            Create New Exam
            <FcAddDatabase size={32} />
          </button>
        </Link>

        <section className="flex flex-col justify-center items-start gap-3 p-5 bg-blue-50">
          <h1 className="text-2xl font-semibold text-slate-500">
            Exams Created By You
          </h1>
          <div className="w-full flex flex-wrap justify-center items-start gap-5">
            {examData.map((exam) => {
              return <InstructorExamCard key={exam._id} exam={exam} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default InstructorDashboard;
