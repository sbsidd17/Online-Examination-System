/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "../../index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { getTestData, testResult } from "../../redux/slices/testSlice";
import Timer from "../../components/Timer";

function StartTest() {
  // State variables
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [marked, setMarked] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [markedAndAnswered, setMarkedAndAnswered] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testData = useSelector((state) => state.test.test.testData);
  const Quizdata = testData?.questions;
  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();
  async function getQuizData() {
    await dispatch(getTestData(id));
  }

  useEffect(() => {
    document.querySelector("#nav").classList.add("hidden");
    document.querySelector("#test").requestFullscreen();
    getQuizData();
  }, [id]);

  // Option change handler
  function optionChangeHandler(e) {
    setSelectedOptions((pre) => ({
      ...pre,
      [questionIndex]: e.target.value,
    }));
    setAnsweredQuestions((prev) => [...new Set([...prev, questionIndex])]);
    setAnswered((pre) => pre + 1);
    // console.log(selectedOptions)
  }

  // Submit handler
  async function submitHandler() {
    // console.log(selectedOptions)
    let r = 0;
    let w = 0;
    let n = 0;

    for (let i = 0; i < Quizdata?.length; i++) {
      if (selectedOptions[i] === Quizdata[i]?.answer.answer_title) {
        r++;
      } else if (selectedOptions[i] === undefined) {
        n++;
      } else {
        w++;
      }
    }

    const result = {
      total: Quizdata?.length,
      right: r,
      wrong: w,
      not_answered: n,
      ans: r + w,
      marked: marked,
      markedAndAnswered: markedAndAnswered,
      selectedOptions,
      answeredQuestions,
    };

    document.querySelector("#nav").classList.remove("hidden");
    // document.querySelector("#test").exitFullscreen()

    await dispatch(testResult(result));
    navigate(`/test-result/${testData._id}`);
  }

  // Mark for review handler
  function markForReviewHandler() {
    if (markedForReview.includes(questionIndex)) {
      setMarkedForReview((prev) =>
        prev.filter((item) => item !== questionIndex)
      );
      setMarked((prev) => prev - 1);

      if (selectedOptions[questionIndex] !== undefined) {
        setMarkedAndAnswered((prev) => prev - 1);
      }
    } else {
      setMarkedForReview((prev) => [...prev, questionIndex]);
      setMarked((prev) => prev + 1);

      if (selectedOptions[questionIndex] !== undefined) {
        setMarkedAndAnswered((prev) => prev + 1);
      }
    }
  }

  // Clear response handler
  function clearResponseHandler() {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: undefined,
    }));

    setAnsweredQuestions((prev) => {
      const filteredQuestions = prev.filter((index) => index !== questionIndex);

      // Decrement answered value only if the question was previously answered
      if (prev.length !== filteredQuestions.length) {
        setAnswered((prev) => prev - 1);
      }

      return filteredQuestions;
    });
  }

  // Render quiz component
  return (
    <>
      <div className="flex flex-col relative md:flex-row w-screen h-screen overflow-hidden" id="test">
        {/* Left Section */}
        <div className="h-full w-full flex flex-col justify-between">
          <div>
            {/* Category Section */}
            <div className="flex justify-between items-center border-b-2 p-3 font-sans font-bold">
              <div>Test Name : {testData?.test_name}</div>
              <Timer
                givenTime={testData?.total_time}
                submitHandler={submitHandler}
              />
            </div>
            {/* Quiz Header */}
            <div>
              <div className="flex justify-between items-center border-b-1 shadow-sm p-4">
                <div className="font-bold">{`Question No. ${
                  questionIndex + 1
                } of ${Quizdata?.length}`}</div>
                <div>
                  Marks{" "}
                  <span className="bg-green-500 text-sm text-white px-2 rounded-xl">
                    +2
                  </span>{" "}
                  <span className="bg-red-700 text-sm text-white px-2 rounded-xl">
                    -0.5
                  </span>{" "}
                </div>
              </div>
            </div>
            {/* Quiz Questions */}
            <div className="m-5 overflow-y-auto">
              <div className="font-medium">
                {Quizdata?.length > 0 && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: Quizdata[questionIndex]?.question_title,
                    }}
                  ></span>
                )}
              </div>
              <div className="m-3">
                {Quizdata?.length > 0 &&
                  Quizdata[questionIndex]?.options?.map((option) => {
                    return (
                      <label key={option._id}>
                        <input
                          type="radio"
                          name={Quizdata[questionIndex]}
                          value={option.option_title}
                          onChange={optionChangeHandler}
                          checked={
                            option.option_title ===
                            selectedOptions[questionIndex]
                          }
                        />
                        {"  "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: option.option_title,
                          }}
                        ></span>
                        <br />
                        <br />
                      </label>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* Quiz Controls */}
          <div className="flex justify-between bg-slate-100 border-t-2 p-3">
            <div className="flex flex-col md:flex-row gap-5">
              <button
                className="bg-blue-300 p-2 rounded-md hover:bg-blue-500"
                onClick={markForReviewHandler}
              >
                Mark For Review
              </button>
              <button
                className="bg-blue-300 p-2 rounded-md hover:bg-blue-500"
                onClick={clearResponseHandler}
              >
                Clear Response
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {questionIndex > 0 && (
                <button
                  className="bg-cyan-300 p-2 rounded-md hover:bg-cyan-500 text-white"
                  onClick={() => setQuestionIndex((pre) => pre - 1)}
                >
                  Previous
                </button>
              )}
              {questionIndex < Quizdata?.length - 1 && (
                <button
                  className="bg-cyan-300 p-2 rounded-md hover:bg-cyan-500 text-white"
                  onClick={() => setQuestionIndex((pre) => pre + 1)}
                >
                  Save & Next
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className={`flex absolute right-0 top-0 md:relative h-full md:w-[30%] transition-all duration-1000 ease-in-out ${openSubmenu ? "w-[80%]" : "w-[22px] overflow-hidden"}`}>
         <div className="block md:hidden">
         {
          openSubmenu ? (<button onClick={()=>setOpenSubmenu(!openSubmenu)}> <GrClose size={22} /></button>) : (<button onClick={()=>setOpenSubmenu(!openSubmenu)}><GiHamburgerMenu size={22}/></button>)
         }
         </div>
          <div className="flex flex-col justify-between bg-cyan-100 h-full w-full">
            {/* User Details */}
            <div>
              <div className="flex gap-2 items-center p-2 border-b-2">
                <img
                  src={userData?.userProfile?.profile_image}
                  alt="userImg"
                  className="w-8 h-8 rounded-full"
                />
                <span>{`${userData?.first_name} ${userData?.last_name}`}</span>
              </div>
              {/* Quiz Statistics */}
              <div className="flex flex-wrap gap-5 p-4">
                <div className="flex items-center">
                  <button className="px-2 border bg-green-500  text-white">
                    {answered}
                  </button>
                  <p>Answered</p>
                </div>
                <div className="flex items-center">
                  <button className="px-2 border bg-violet-500  text-white">
                    {marked}
                  </button>
                  <p>Marked</p>
                </div>
                <div className="flex items-center">
                  <button className="px-2 border bg-violet-500 text-white after:content-['*'] after:ml-0.5 after:text-green-500">
                    {markedAndAnswered}
                  </button>
                  <p>Marked And Answered</p>
                </div>
                <div className="flex items-center">
                  <button className="px-2 border bg-white">
                    {String(Quizdata?.length - answered)}
                  </button>
                  <p>Not Answered</p>
                </div>
              </div>
              <div className="p-4">Section :</div>
              {/* Quiz Navigation */}
              <div className="flex flex-wrap gap-3 p-4">
                {Quizdata?.map((item, index) => {
                  const isAnswered = answeredQuestions.includes(index);
                  const isMarkedForReview = markedForReview.includes(index);
                  const isAnsweredAndMarkedForReview =
                    isAnswered && isMarkedForReview;

                  return (
                    <button
                      id={index}
                      key={index}
                      value={index}
                      className={`px-2 border ${
                        isAnsweredAndMarkedForReview
                          ? `bg-violet-500 text-white after:content-["*"] after:ml-0.5 after:text-green-500`
                          : isAnswered
                          ? "bg-green-500  text-white"
                          : isMarkedForReview
                          ? "bg-violet-500  text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setQuestionIndex(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Submit Button */}
            <div className="p-4">
              <button
                className="bg-cyan-300 p-2 rounded-md hover:bg-cyan-500 text-white w-full"
                onClick={submitHandler}
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartTest;
