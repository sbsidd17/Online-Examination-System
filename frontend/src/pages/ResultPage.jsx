import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ResultPage() {
  const { id } = useParams();
  console.log(id);
  const { test } = useSelector((state) => state.test);
  const result = test?.testResult;
//   console.log(result);
  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)] p-10 bg-[#fbfcfc]">
      <div className="flex flex-col w-full h-full p-10 bg-white shadow-md justify-center items-center gap-5">
        <div className="text-2xl font-semibold">{`${test.testData.test_name} Result :`}</div>
        <p>Total Questions : {result.total}</p>
        <p>Answered : {result.ans}</p>
        <p>Not Answered : {result.not_answered}</p>
        <p>Right Questions : {result.right}</p>
        <p>Wrong Questions : {result.wrong}</p>
        <p>Marked Questions : {result.marked}</p>
        <p>Marked And Answered : {result.markedAndAnswered}</p>
      </div>
    </div>
  );
}

export default ResultPage;
