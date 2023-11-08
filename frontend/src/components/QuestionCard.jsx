/* eslint-disable react/prop-types */

import { useState } from "react";
import { GrClose, GrView } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../redux/slices/instructorSlice";

function QuestionCard({ data, test_id }) {
  const [openViewQuestion, setOpenViewQuestion] = useState(false);
  const dispatch = useDispatch()

  async function deleteQuestionHandler(){
    const res = await dispatch(deleteQuestion({question_id:data._id, test_id}))
    if(res.payload.success){
        window.location.reload()
    }
  }
  return (
    <>
      <div className="w-full flex justify-between items-center py-5 px-10 bg-white shadow-md">
        <div className="">{data.question_title}</div>
        <div className="flex justify-center items-center gap-3">
          <button
            className="cursor-pointer"
            onClick={() => setOpenViewQuestion(!openViewQuestion)}
          >
            <GrView size={22} />
          </button>
          <button className="cursor-pointer"
          onClick={deleteQuestionHandler}
          >
            <RiDeleteBin2Line size={22} />
          </button>
        </div>
      </div>

      {/* view question */}
      <div className={openViewQuestion ? "flex" : "hidden"}>
        <div className="z-[99] fixed top-0 left-0 w-screen h-screen bg-[#0000003a] flex justify-center items-center p-5 md:p-1">
          <div className="relative flex flex-col gap-5 w-full md:w-1/2 bg-white rounded-md shadow-md py-5">
            {/* close button */}
            <button
              onClick={() => setOpenViewQuestion(!openViewQuestion)}
              className="z-[99] absolute top-2 right-2 flex justify-center items-center w-[25px] h-[25px] cursor-pointer hover:bg-[#0000000e] rounded-full"
            >
              <GrClose />
            </button>
            <div className="flex flex-col justify-center items-start gap-5 p-5 font-semibold">
              {/* Question */}
              <div>Question : {data.question_title}</div>
              {/* options */}
              <div className="pl-5">
                <p>Options :</p>
                <ol className="list-decimal pl-10">
                  {data.options.map((option) => (
                    <li key={option._id}>{option.option_title}</li>
                  ))}
                </ol>
              </div>
              {/* answer */}
              <div>Answer : {data?.answer?.answer_title}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
