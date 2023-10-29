import { useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/slices/authSlice";

function Profile() {
  const { data } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [image, setImage] = useState(data.userProfile.profile_image);
  const [about, setAbout] = useState(data.userProfile.about);
  const [imageFile, setImageFile] = useState("");

  const dispatch = useDispatch()

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
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("about", about);
    formData.append("image", imageFile);
    await dispatch(updateProfile(formData))
  }

  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)] p-20 flex justify-center items-center">
      <div className="flex w-full bg-white shadow-lg p-5">
        <form className="flex flex-col w-full gap-5">
          {/* profile picture */}
          <div className="flex flex-col md:flex-row justify-start items-center gap-5 w-full">
            <input
              type="file"
              id="image"
              className="hidden"
              name="image"
              onChange={getImage}
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
            <h1 className="text-3xl font-bold">{`${data.first_name} ${data.last_name}`}</h1>
          </div>

          {/*name */}
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              className="border bg-transparent focus:outline-none w-full md:w-1/2 p-2 rounded-md"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="border bg-transparent focus:outline-none w-full md:w-1/2 p-2 rounded-md"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/*email and phone */}
          <div className="flex flex-col md:flex-row gap-5">
            <input
              disabled
              type="text"
              className="border bg-transparent focus:outline-none w-full md:w-1/2 p-2 rounded-md"
              placeholder="Email"
              value={data.email}
            />
            <input
              type="text"
              className="border bg-transparent focus:outline-none w-full md:w-1/2 p-2 rounded-md"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <button
            onClick={submitHandler}
            className="w-[200px] bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
