import { useState } from "react";
import { GrMail } from "react-icons/gr";
import { useDispatch } from "react-redux";
import ForgotPasswordImage from "../../assets/images/ForgotPasswordImage.png";
import { forgotPassword } from "../../redux/slices/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  function submitHandler() {
    const res = dispatch(forgotPassword({ email }));
    console.log(res);
  }

  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)]">
      {/* main div */}
      <div className="flex w-full h-full">
        {/* left */}
        <div className="hidden md:flex justify-center items-center relative w-1/2 h-full">
          <div className="bg-[#0ad0f4] w-2/3 h-full"></div>
          <img
            className="z-10 absolute top-10 left-5 w-11/12 h-11/12"
            src={ForgotPasswordImage}
            alt=""
          />
        </div>

        {/* right */}
        <div className="flex flex-col gap-5 justify-center items-center w-full md:w-1/2 h-full">
          <div className="text-3xl font-bold text-[#0ad0f4]">
            Forgot Password?
          </div>
          {/* email */}
          <div className="flex mt-5 gap-2 items-center border border-gray-400 rounded-md p-2 w-1/2">
            <GrMail />
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              className="border-none bg-transparent focus:outline-none"
              type="email"
              placeholder="Enter Email"
              value={email}
            />
          </div>

          <button
            className="bg-[#0ad0f4] text-white text-xl font-bold rounded-md py-2 hover:bg-[#07bcdc] w-1/2"
            onClick={submitHandler}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
