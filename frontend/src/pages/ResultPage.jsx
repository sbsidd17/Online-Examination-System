import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FcPrint } from "react-icons/fc";

function ResultPage() {
  const { id } = useParams();
  console.log(id);
  const { test } = useSelector((state) => state.test);
  const { data } = useSelector((state) => state.auth);
  const { exams } = useSelector((state) => state.exam);
  const result = test?.testResult;
  const userAnswers = Object.values(test?.testResult?.selectedOptions);
  console.log(userAnswers);
  console.log(test?.testResult?.answeredQuestions.length);
  const answersArray = new Array(test?.testData?.questions?.length);
  answersArray.fill(undefined);
  for (let i = 0; i < test?.testResult?.answeredQuestions.length; i++) {
    answersArray[test?.testResult?.answeredQuestions[i]] =
      test?.testResult?.selectedOptions[i];
  }

  console.log(answersArray);

  return (
    <div className="mt-[70px] w-full p-3 md:p-10 bg-[#fbfcfc]">
      <div className="flex flex-col w-full h-full p-2 md:p-10 bg-white shadow-md gap-5">
        {/* result header */}
        <div className="flex justify-start items-center gap-5 bg-gray-200">
          <div className="flex w-[70px] h-[70px]">
            <img
              className="h-full w-full rounded-md"
              src={data?.userProfile?.profile_image}
              alt="img"
            />
          </div>
          <div className="flex flex-col text-sm font-serif">
            <p>
              Candidate Name :{" "}
              <span className="text-[#0ad0f4]">{`${data?.first_name} ${data?.last_name}`}</span>
            </p>
            <p>
              Exam Name :{" "}
              <span className="text-[#0ad0f4]">
                {exams?.curr_exam?.exam_name}
              </span>
            </p>
            <p>
              Test Name :{" "}
              <span className="text-[#0ad0f4]">
                {test?.testData?.test_name}
              </span>
            </p>
          </div>
        </div>
        {/* result details */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-center">
                        Score Card
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Total Question
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {result.total}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Total Attempted
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {result.ans}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Mark For Review
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {result.marked}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Marked And Answered
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {result.markedAndAnswered}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Correct Answered
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {result.right}
                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Incorrect Answered
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {result.wrong}
                      </td>
                    </tr>
                    <tr>
                      <th scope="col" className="px-6 py-4 text-center">
                        Final Result :{" "}
                        {`${result.right} out of ${result.total}`}
                      </th>
                    </tr>
                  </tbody>
                </table>
                {/* print result */}
                <div className="flex w-full justify-end">
                  <p>Print Result</p>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <FcPrint size={32} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
        Answer Key
      </h1>
      <div className="flex">
        <ol className="list-decimal">
          {test?.testData?.questions?.map((question, index) => {
            return (
              <>
                <li key={question._id}>
                  <h1 className="font-semibold">{question.question_title}</h1>
                  <ol className="list-decimal">
                    {question?.options?.map((option) => {
                      return (
                        <li className="ml-5" key={option._id}>
                          {option.option_title}
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <p>
                  Your Answer :{" "}
                  {answersArray[index] ? answersArray[index] : "Not Answered"}
                </p>
                <p>Rigth Answer : {question.answer.answer_title}</p>
              </>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default ResultPage;
