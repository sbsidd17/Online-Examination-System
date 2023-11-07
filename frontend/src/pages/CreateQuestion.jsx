/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createAnswer,
  createOption,
  createQuestion,
} from "../redux/slices/instructorSlice";
import { getQuestionData } from "../redux/slices/testSlice";

function CreateQuestion({ test_id, setOpenAddQuestion }) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [optionTitle, setOptionTitle] = useState("");
  const [optionImage, setOptionImage] = useState("");
  const [answerTitle, setAnswerTitle] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.test.test.questionData);

  async function addQuestionHandler() {
    const questionData = new FormData();
    questionData.append("question_title", questionTitle);
    questionData.append("image", questionImage);
    questionData.append("test_id", test_id);
    console.log(questionData);
    const res = await dispatch(createQuestion(questionData));
    if (res.payload.success) {
      setQuestionId(res.payload.question._id);
    }
  }

  async function addOptionHandler() {
    const optionData = new FormData();
    optionData.append("option_title", optionTitle);
    optionData.append("image", optionImage);
    optionData.append("question_id", questionId);
    console.log(optionData);
    const res = await dispatch(createOption(optionData));
    console.log(res);
    await dispatch(getQuestionData(questionId));
    setOptionTitle("")
    setOptionImage("")
  }

  async function saveHandler() {
    const res = await dispatch(
      createAnswer({ answer_title: answerTitle, question_id: questionId })
    );
    if (res.payload.success) {
      window.location.reload();
    }
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000024] flex justify-center items-center p-5 md:p-1">
      <div className="relative flex flex-col w-full md:w-1/2 bg-white rounded-md shadow-md py-5">
        <button
          onClick={() => setOpenAddQuestion(false)}
          className="z-[99] absolute top-2 right-2 flex justify-center items-center w-[25px] h-[25px] cursor-pointer hover:bg-[#0000000e] rounded-full"
        >
          <GrClose />
        </button>
        {/*Question */}
        <div className="flex flex-col">
          <p className="ml-5 font-semibold">Question</p>
          <div className="flex flex-wrap justify-between items-center gap-2 p-5">
            <input
              type="text"
              className="border bg-transparent focus:outline-none  p-2 rounded-md flex-1"
              placeholder="Question Title"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              disabled={questionId ? true : false}
            />
            <div className={questionId ? "hidden" : "flex flex-col"}>
              <p>Question Image</p>
              <input
                type="file"
                onChange={(e) => setQuestionImage(e.target.files[0])}
              />
            </div>
            <button
              onClick={addQuestionHandler}
              className={
                questionId
                  ? "hidden"
                  : "bg-[#0ad0f4] text-white text-sm rounded-md p-2 hover:bg-[#07bcdc]"
              }
            >
              Add
            </button>
          </div>
        </div>

        {/* options */}
        <div className="flex flex-col">
          <p className="ml-5 font-semibold">Options</p>
          <ol className="ml-10 font-semibold list-decimal">
            {question?.options?.map((option) => (
              <li key={option._id}>{option.option_title}</li>
            ))}
          </ol>
          {questionId && (
            <div className="flex justify-between items-center gap-2 p-5 ml-5">
              <input
                type="text"
                className="border bg-transparent focus:outline-none  p-2 rounded-md flex-1"
                placeholder="Option Title"
                value={optionTitle}
                onChange={(e) => setOptionTitle(e.target.value)}
              />
              <div className="flex flex-col">
                <p>Option Image</p>
                <input
                  type="file"
                  onChange={(e) => setOptionImage(e.target.files[0])}
                />
              </div>
              <button
                onClick={addOptionHandler}
                className="bg-[#0ad0f4] text-white text-sm rounded-md p-2 hover:bg-[#07bcdc]"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* answer */}
        <p className="ml-5 font-semibold">Answer</p>
        <select
          className="block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mx-10"
          value={answerTitle}
          onChange={(e) => setAnswerTitle(e.target.value)}
        >
          <option value="" disabled>
            Choose Answer
          </option>
          {question?.options?.map((op) => (
            <option key={op._id} value={op.option_title}>
              {op.option_title}
            </option>
          ))}
        </select>
        <div className="flex justify-center items-center mt-3">
        <button className="w-[200px] bg-[#0ad0f4] text-white p-1 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95" onClick={saveHandler}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
