import React from "react";
import { useSelector } from "react-redux";
import ExamCard2 from "../../components/ExamCard2";

function ExploreExams() {
  const { exams } = useSelector((state) => state.exam);
  return (
    <div className="mt-[70px] w-full min-h-[calc(100vh-70px)] bg-gray-100 p-5 md:p-20">
      <div className="flex justify-center items-center flex-wrap h-full w-full gap-10">
        {exams?.allExams?.map((exam) => {
          return <ExamCard2 key={exam._id} exam={exam} />;
        })}
      </div>
    </div>
  );
}

export default ExploreExams;
