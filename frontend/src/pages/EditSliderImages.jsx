/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSliderImage, deleteSliderImage, getAllSliderImage } from "../redux/slices/adminSlice";
import { FcFullTrash } from "react-icons/fc";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";


function EditSliderImages() {
  const { sliderImages } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [addImage, setAddImage] = useState(false)
  const [image, setImage] = useState("")

  async function addImageHandler(){
      const formData = new FormData()
      formData.append("image", image)
      await dispatch(addSliderImage(formData))
      setImage("")
      setAddImage(false)
      getData()
  }

  async function deleteImageHandler(id){
    await dispatch(deleteSliderImage(id))
    getData()
  }

  function getImage(e) {
    e.preventDefault();
    // getting the image
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setImage(uploadedImage);
    }
  }

  async function getData() {
    await dispatch(getAllSliderImage());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-center items-center text-xl font-semibold">
        Slider Images
      </div>
      <div className="flex justify-between items-center">
        <div>
          {addImage && <div className="flex gap-2">
            <input type="file" onChange={getImage}/>
          </div>}
        </div>
        {
          addImage ? (<button
            onClick={ addImageHandler}
            className="flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white p-1 rounded-sm"
          >
            <MdCloudUpload size={18} />
            Add
          </button>) : (<button
          onClick={() => setAddImage(!addImage)}
          className="flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 text-white p-1 rounded-sm"
        >
          <IoMdAddCircleOutline size={18} />
          Add New
        </button>)
        }
      </div>
      <div className="w-full flex flex-col gap-10">
        {sliderImages.map((image) => {
          return (
            <div
              key={image._id}
              className="flex justify-between items-center p-5 md:px-20 border"
            >
              <img
                src={image.image}
                alt="img"
                className="w-[300px] h-[200px]"
              />
              <button onClick={()=>deleteImageHandler(image._id)} className="flex bg-[#0ad0f4] text-white p-2 rounded-md hover:bg-[#09a4c0]">
                <MdDelete size={22} />
                <span>Delete</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EditSliderImages;
