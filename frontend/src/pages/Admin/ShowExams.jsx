import { FcFullTrash } from "react-icons/fc";
import { useSelector } from "react-redux";

function ShowExams() {
  const { exams } = useSelector((state) => state.exam);
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
          {exams?.allExams?.map((exam, index) => {
            return (
              <tr key={exam._id} className="hover:shadow-md hover:bg-slate-100 transition-all duration-500 ease-in-out">
                <td>{index + 1}</td>
                <td>{exam.exam_name}</td>
                <td>
                  {exam.instructor.first_name} {exam.instructor.last_name}
                </td>
                <td>{exam.all_tests.length}</td>
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
