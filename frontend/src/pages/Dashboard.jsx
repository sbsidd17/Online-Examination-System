import { useSelector } from "react-redux";
import EnrolledExamCard from "../components/EnrolledExamCard";

function Dashboard() {
  const { data } = useSelector((state) => state.auth);
  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)] p-20 flex justify-center items-center">
      <div className="flex flex-col gap-10 items-center min-h-full w-full bg-white shadow-lg">
        <h1 className="text-3xl font-semibold text-[#0ad0f4]">
          Enrolled Exams
        </h1>
        <div className="flex flex-wrap justify-center items-center p-5">
          {data.exams.length === 0 ? (
            <h1>You are not enrolled in any exam !</h1>
          ) : (
            data.exams.map((exam) => {
              return (
                <EnrolledExamCard
                  key={exam._id}
                  exam_id={exam._id}
                  name={exam.exam_name}
                  image={exam.thumbnail}
                  totalTests={exam.all_tests.length}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
