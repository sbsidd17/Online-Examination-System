import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTest } from "../../redux/slices/instructorSlice";

function CreateTest() {
  const { id } = useParams();
  const [testData, setTestData] = useState({
    test_name: "",
    total_questions: "",
    total_marks: "",
    total_time: "",
    exam_id: id,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  function onChangeHandler(e) {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  }

  async function createTestHandler(e) {
    e.preventDefault();
    if(testData.test_name === "" || testData.total_marks === "" || testData.total_questions === "" || testData.total_time === ""){
         toast.error("All Fields Are Required")
         return
    }
    const res = await dispatch(createTest(testData));
    if(res.payload.success){
      navigate(-1)
    }
  }
  return (
    <div className="mt-[70px] w-full p-5 md:p-20 flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center border-2 p-5">
        <h1 className="text-2xl text text-slate-500 font-semibold">
          Create Test
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
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTest;
