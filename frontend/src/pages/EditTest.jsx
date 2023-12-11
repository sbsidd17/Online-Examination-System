/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcAddDatabase } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { editTest } from "../redux/slices/instructorSlice";
import { getTestData } from "../redux/slices/testSlice";
import CreateQuestion from "./CreateQuestion";

function EditTest() {
  const { id } = useParams();
  const test = useSelector((state) => state.test.test.testData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [testData, setTestData] = useState({
    test_name: "",
    total_questions: "",
    total_marks: "",
    total_time: "",
    test_id: "",
  });

  async function getData() {
    await dispatch(getTestData(id));
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (test) {
      setTestData({
        test_name: test?.test_name,
        total_questions: test?.total_questions,
        total_marks: test?.total_marks,
        total_time: test?.total_time,
        test_id: test?._id,
      });
    }
  }, [test]);
  function onChangeHandler(e) {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  }

  async function createTestHandler(e) {
    e.preventDefault();
    if (
      testData.test_name === "" ||
      testData.total_marks === "" ||
      testData.total_questions === "" ||
      testData.total_time === ""
    ) {
      toast.error("All Fields Are Required");
      return;
    }
    const res = await dispatch(editTest(testData));
    if (res.payload.success) {
      navigate(-1);
    }
  }
  return (
    <div className="mt-[70px] w-full p-5 md:p-20 flex flex-col gap-5 justify-center items-center">
      <div className="w-full flex justify-center items-center border-2 p-3">
        <h1 className="text-2xl text text-slate-500 font-semibold">
          Edit Test
        </h1>
      </div>
      <form className="w-full flex flex-col gap-5 justify-center items-center bg-white shadow-md p-5 md:p-20">
        <input
          className="w-full border bg-transparent focus:outline-none  p-2 rounded-md"
          type="text"
          placeholder="Test Name"
          name="test_name"
          onChange={onChangeHandler}
          value={testData.test_name}
        />
        <input
          className="w-full border bg-transparent focus:outline-none  p-2 rounded-md"
          type="number"
          placeholder="Total Question"
          name="total_questions"
          onChange={onChangeHandler}
          value={testData.total_questions}
        />
        <input
          className="w-full border bg-transparent focus:outline-none  p-2 rounded-md"
          type="number"
          placeholder="Total Marks"
          name="total_marks"
          onChange={onChangeHandler}
          value={testData.total_marks}
        />
        <input
          className="w-full border bg-transparent focus:outline-none  p-2 rounded-md"
          type="number"
          placeholder="Total Time"
          name="total_time"
          onChange={onChangeHandler}
          value={testData.total_time}
        />
        <button
          onClick={createTestHandler}
          className="w-[200px] bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95"
        >
          Save Changes
        </button>
      </form>
      <div className="w-full flex justify-center items-center border-2 p-3">
        <h1 className="text-2xl text text-slate-500 font-semibold">
          All Questions({test?.questions?.length})
        </h1>
      </div>
      {/* Add Test */}
      <button
        onClick={() => setOpenAddQuestion(true)}
        className="flex justify-center items-center gap-2 bg-green-400 px-5 py-2 text-white rounded-md hover:bg-green-500 transition-all duration-200 hover:scale-95"
      >
        Add New Question
        <FcAddDatabase size={32} />
      </button>
      <div className={openAddQuestion ? "flex" : "hidden"}>
        <CreateQuestion test_id={id} setOpenAddQuestion={setOpenAddQuestion} />
      </div>
      {/* Show all Questions */}
      {/* question card */}
      {test?.questions?.length !== 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
          {test?.questions?.map((question) => (
            <QuestionCard key={question._id} data={question} test_id={id} getData={getData}/>
          ))}
        </div>
      ) : (
        <div>You have not added any question till now...</div>
      )}
    </div>
  );
}

export default EditTest;
