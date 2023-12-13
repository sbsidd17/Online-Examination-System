/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcAddDatabase, FcAddImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import InstructorTestCard from "../../components/InstructorTestCard";
import { getAllCategory, getExamById } from "../../redux/slices/examSlice";
import { editExam } from "../../redux/slices/instructorSlice";

function EditExam() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.exam.categories.allCategories
  );

  const examData = useSelector((state) => state.exam.exams.curr_exam);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function getImage(e) {
    e.preventDefault();
    // getting the image
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setImageFile(uploadedImage);
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setImage(this.result);
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      price === "" ||
      selectedCategory === ""
    ) {
      toast.error("All Feilds Are Mandatory");
      return;
    }

    const formData = new FormData();
    formData.append("exam_name", name);
    formData.append("exam_description", description);
    formData.append("price", price);
    formData.append("category", selectedCategory);
    formData.append("image", imageFile);
    formData.append("exam_id", id);
    const res = await dispatch(editExam(formData));
    console.log(res);
  }

  async function getExamData() {
    await dispatch(getExamById(id));
  }

  useEffect(() => {
    dispatch(getAllCategory());
    getExamData();
  }, [id]);

  useEffect(() => {
    if (examData) {
      setName(examData.exam_name || "");
      setImage(examData.thumbnail || "");
      setPrice(examData.price || "");
      setDescription(examData.exam_description || "");
      setSelectedCategory(examData.category || "");
    }
  }, [examData]);

  return (
    <div className="mt-[70px] w-full px-5 md:px-20 py-5 flex justify-center items-center">
      {/* main div */}
      <div className="flex flex-col gap-10 w-full bg-white shadow-lg p-5">
        {/* edit exam details */}
        <form className="flex flex-col md:flex-row w-full gap-5">
          {/* left */}
          {/* thumbnail */}
          <div className="flex justify-center items-center w-full md:w-1/2">
            <input
              type="file"
              id="image"
              className="hidden"
              name="image"
              onChange={getImage}
            />
            <label
              htmlFor="image"
              className="flex flex-col justify-center items-center h-full w-full rounded-md border-2 border-dotted"
            >
              {image ? (
                <img src={image} className="w-full max-h-[400px]" />
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <FcAddImage size={144} />
                  Thumbnail
                </div>
              )}
            </label>
          </div>

          {/* Right div */}
          <div className="flex flex-col w-full md:w-1/2 gap-5">
            {/*name */}
            <input
              type="text"
              className="border bg-transparent focus:outline-none  p-2 rounded-md"
              placeholder="Exam Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/*Description */}
            <textarea
              rows="5"
              type="text"
              className="border bg-transparent focus:outline-none  p-2 rounded-md resize-none"
              placeholder="Exam Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* price */}
            <input
              type="number"
              className="border bg-transparent focus:outline-none  p-2 rounded-md"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* category */}
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Choose Category
              </option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.category_name}
                </option>
              ))}
            </select>
            <button
              onClick={submitHandler}
              className="w-[200px] bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
        <section className="flex flex-col gap-10 justify-center items-center">
          {/* Add Test */}
          <Link
            to={`/create-test/${id}`}
          >
            <button className="flex justify-center items-center gap-2 bg-green-400 px-5 py-2 text-white rounded-md hover:bg-green-500 transition-all duration-200 hover:scale-95">
              Create New Test
              <FcAddDatabase size={32} />
            </button>
          </Link>
          {/* Show all test */}
          <div className="flex flex-col gap-5 justify-center items-center w-full">
            <h1 className="text-2xl text-slate-500 font-semibold">
              All Tests ({examData?.all_tests?.length})
            </h1>
            {/* test card */}
            {examData?.all_tests?.length !== 0 ? (
              <div className="flex flex-wrap justify-center items-center gap-5 w-full">
                {examData?.all_tests?.map((test) => (
                  <InstructorTestCard key={test._id} test={test} exam_id={id} getExamData={getExamData} />
                ))}
              </div>
            ) : (
              <div>You have not created any exam till now...</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditExam;
