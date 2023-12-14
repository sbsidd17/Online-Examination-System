/* eslint-disable react/prop-types */
import { useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import CategoryLogo from "../assets/logo/CategoryLogo.png";
import { createCategory } from "../redux/slices/examSlice";

function CreateNewCategory({ setOpenAddCategory, getData }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [image, setImage] = useState(CategoryLogo);

  const dispatch = useDispatch();

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

  async function submitHandler() {
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_description", categoryDescription);
    formData.append("image", imageFile);
    await dispatch(createCategory(formData));
    getData()
    setCategoryName("")
    setCategoryDescription("")
    setImageFile("")
    setOpenAddCategory(false)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000024] flex justify-center items-center p-5 md:p-1">
      <div className="relative flex flex-col w-full md:w-1/2 bg-white rounded-md shadow-md py-5 gap-5">
        <button
          onClick={() => setOpenAddCategory(false)}
          className="z-[99] absolute top-2 right-2 flex justify-center items-center w-[25px] h-[25px] cursor-pointer hover:bg-[#0000000e] rounded-full"
        >
          <GrClose />
        </button>
        <div className="flex justify-center items-center text-lg font-semibold">
          Create New Category
        </div>
        <div className="flex w-full">
          <div className="flex w-1/2 justify-center items-center">
            {/* Logo */}
            <input
              type="file"
              id="image"
              className="hidden"
              name="image"
              onChange={getImage}
              required
            />
            <label
              htmlFor="image"
              className="relative h-[100px] w-[100px] rounded-full"
            >
              <img
                className="rounded-full w-full h-full"
                src={image}
                alt="profile_img"
              />
              <div className="absolute top-[70px] left-[70px]">
                <FcEditImage size={32} />
              </div>
            </label>
          </div>
          {/* Name an description */}
          <div className="flex flex-col w-1/2 justify-center items-center gap-3 p-2">
            <input
              className="w-full border bg-transparent focus:outline-none"
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <textarea
              className="w-full border bg-transparent focus:outline-none"
              placeholder="Enter Description Here"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-[#0ad0f4] text-white font-semibold rounded-md py-2 px-4 border hover:bg-[#06aecc]"
            onClick={submitHandler}
          >Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewCategory;
