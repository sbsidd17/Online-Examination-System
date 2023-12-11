/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FcFullTrash } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../redux/slices/examSlice";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import CreateNewCategory from "../components/CreateNewCategory";

function EditCategories() {
  const { categories } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [image, setImage] = useState("");
  const [openAddCategory, setOpenAddCategory] = useState(false);
  async function getData() {
    console.log("getData Called");
    await dispatch(getAllCategory());
  }

  function editCategory(id) {
    const curr_category = categories?.allCategories.find((cat) => {
      return cat._id === id;
    });

    setCategoryName(curr_category.category_name);
    setCategoryDescription(curr_category.category_description);
    setEditMode(!editMode);
    setId(id);
  }

  function getImage(e) {
    e.preventDefault();
    // getting the image
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setImage(uploadedImage);
    }
  }

  async function handleUpdateCategory(id) {
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_description", categoryDescription);
    formData.append("category_id", id);
    formData.append("image", image);
    await dispatch(updateCategory(formData));
    getData();
    setEditMode(!editMode);
  }

  async function handleDelete(id) {
    await dispatch(deleteCategory({ id }));
    await getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-end items-center">
        <button
          onClick={() => setOpenAddCategory(true)}
          className="flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white p-1 rounded-sm"
        >
          <IoMdAddCircleOutline size={18} />
          Add New
        </button>
        {openAddCategory && (
          <CreateNewCategory
            setOpenAddCategory={setOpenAddCategory}
            getData={getData}
          />
        )}
      </div>
      <table className="w-full border-separate border-spacing-2 border bg-white">
        <thead className="bg-slate-300 font-semibold">
          <tr>
            <td>S.N.</td>
            <td>Logo</td>
            <td>Category Name</td>
            <td>Description</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {categories?.allCategories?.map((category, index) => {
            return (
              <tr
                key={category._id}
                className="hover:shadow-md hover:bg-slate-100 transition-all duration-500 ease-in-out"
              >
                <td>{index + 1}</td>
                <td>
                  {editMode && id === category._id ? (
                    <input type="file" onChange={getImage} />
                  ) : (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={category.category_image}
                      alt="logo"
                    />
                  )}
                </td>
                <td>
                  {editMode && id === category._id ? (
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  ) : (
                    <p>{category.category_name}</p>
                  )}
                </td>
                <td>
                  {editMode && id === category._id ? (
                    <input
                      type="text"
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                  ) : (
                    <p>{category.category_description}</p>
                  )}
                </td>
                <td>
                  {editMode && id === category._id ? (
                    <button onClick={() => handleUpdateCategory(category._id)}>
                      <FaSave size={28} />
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button onClick={() => editCategory(category._id)}>
                        <MdEdit size={28} />
                      </button>
                      <button onClick={() => handleDelete(category._id)}>
                        <FcFullTrash size={28} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EditCategories;
