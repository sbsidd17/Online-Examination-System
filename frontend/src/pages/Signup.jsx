/* eslint-disable react/no-unescaped-entities */
import SignupImage from "../assets/images/SignupImage.png";
import { FaUserAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import axiosInstance from "../config/axiosInstance";

function Signup() {
  const [otp, setOtp] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "Student",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onChangeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function createAccountHandler(e) {
    e.preventDefault();
    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
    ) {
      toast.error("All Fields Are Required");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Password and Confirm Password Should Be Same");
      return;
    }

    const sendingToast = toast.loading("Sending OTP...");
    const res = await axiosInstance.post("/auth/sendOtp", {
      email: formData.email,
    });
    toast.dismiss(sendingToast);
    toast.success(res.data.msg);
    setIsOpen(true);
    // console.log(formData);
  }

  async function submitHandler() {
    setFormData({ ...formData, userOtp: otp });
    const response = await dispatch(signup({ ...formData, userOtp: otp }));
    // console.log(response.type);
    if (response.type === "auth/signUp/fulfilled") {
      navigate("/login");
    }
  }

  return (
    <div className="mt-[70px] h-[calc(100vh-70px)] w-full flex">
      {/* left */}
      <div className="hidden md:flex w-1/2 h-full relative">
        <div className="w-1/2 h-full bg-[#0ad0f4]"></div>
        <div className="w-1/2"></div>
        <img
          className="absolute top-0 left-[20%] z-10 w-1/2 h-full"
          src={SignupImage}
          alt="image"
        />
      </div>
      {/* right */}
      <div className="flex h-full w-full md:w-1/2 p-10 md:p-5 justify-start items-center">
        <form className="flex flex-col gap-5 justify-between">
          <p className="font-bold text-[#0ad0f4] text-3xl">Create Account</p>

          {/* name */}
          <div className="flex gap-5 w-full">
            <div className="flex gap-2 items-center border border-gray-400 rounded-md p-2 w-1/2">
              <FaUserAlt />
              <input
                onChange={onChangeHandler}
                name="first_name"
                required
                className="border-none bg-transparent focus:outline-none w-full"
                type="text"
                placeholder="First Name"
                value={formData.first_name}
              />
            </div>
            <div className="flex gap-2 items-center border border-gray-400 rounded-md p-2 w-1/2">
              <FaUserAlt />
              <input
                onChange={onChangeHandler}
                name="last_name"
                required
                className="border-none bg-transparent focus:outline-none w-full"
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
              />
            </div>
          </div>

          {/* email */}
          <div className="flex gap-2 items-center border border-gray-400 rounded-md p-2 w-full">
            <GrMail />
            <input
              onChange={onChangeHandler}
              name="email"
              required
              className="border-none bg-transparent focus:outline-none w-full"
              type="email"
              placeholder="Email"
              value={formData.email}
            />
          </div>

          {/* password */}
          <div className="flex gap-5 w-full">
            <div className="flex gap-5 w-full">
              <div className="flex gap-2 items-center border border-gray-400 rounded-md p-2 w-1/2">
                <RiLockPasswordFill />
                <input
                  onChange={onChangeHandler}
                  name="password"
                  required
                  className="border-none bg-transparent focus:outline-none w-full"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                />
              </div>
              <div className="flex gap-2 items-center border border-gray-400 rounded-md p-2 w-1/2">
                <RiLockPasswordFill />
                <input
                  onChange={onChangeHandler}
                  name="confirm_password"
                  required
                  className="border-none bg-transparent focus:outline-none w-full"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                />
              </div>
            </div>
          </div>

          {/* role */}
          <div className="flex gap-10">
            <div className="flex justify-center items-center gap-2">
              <input
                onChange={onChangeHandler}
                required
                type="radio"
                name="role"
                className="radio radio-info"
                id="Student"
                value="Student"
                defaultChecked
              />
              <label htmlFor="student">Student</label>
            </div>
            <div className="flex justify-center items-center gap-2">
              <input
                onChange={onChangeHandler}
                required
                type="radio"
                name="role"
                className="radio radio-info"
                id="Instructor"
                value="Instructor"
              />
              <label htmlFor="instructor">Instructor</label>
            </div>
          </div>

          {/* create account */}
          <div className="flex flex-col">
            <button
              className="bg-[#0ad0f4] text-white text-xl font-bold rounded-md py-2 hover:bg-[#07bcdc]"
              onClick={createAccountHandler}
            >
              Create Account
            </button>
            <p className="text-center">
              Already Have Account?{" "}
              <Link className="text-blue-600" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* otp modal */}
      {isOpen && (
        <div className="fixed left-0 top-0 w-full h-full z-50 bg-[#00000066] flex justify-center items-center">
          <div className="relative flex flex-col justify-center items-center bg-blue-200 rounded-md p-10 shadow-md">
            <XIcon
              onClick={() => setIsOpen(false)}
              className="h-5 w-5 absolute top-4 right-5 hover:bg-slate-400 hover:rounded-full cursor-pointer "
            />
            <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
            <p className="text-gray-500 mb-4">
              We've sent a one-time password to your Email. Don't close this
              before enter OTP.
            </p>
            <div className="flex flex-col justify-center items-center gap-5">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                containerStyle="flex justify-center items-center gap-5"
                inputStyle="text-2xl"
                renderSeparator={<span>--</span>}
                renderInput={(props) => <input {...props} />}
              />
              <button
                onClick={submitHandler}
                className="border border-[#0ad0f4] text-[#0ad0f4] text-xl rounded-md hover:bg-[#0ad0f4] hover:text-white px-5 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
