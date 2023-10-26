import { useState } from "react";
import toast from "react-hot-toast";
import { GrMail } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/LoginImage.png";
import { login } from "../redux/slices/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onChangeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      toast.error("All Fields Are Required");
      return;
    }
    const response = await dispatch(login(formData));
    console.log(response.payload.user)
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", response.payload.user.role)
    localStorage.setItem("data", JSON.stringify(response.payload.user))
    navigate("/")
  }
  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)] flex-wrap">
      {/* main div */}
      <div className="flex w-full h-full">
        {/* left div */}
        <div className="flex flex-col gap-7 w-full md:w-1/2 h-full justify-center items-center bg-[#0ad0f4]">
          {/* heading */}
          <div className="text-4xl text-white font-bold">Welcome Back</div>

          {/* form data */}
          <form className="flex flex-col gap-5 w-11/12 md:w-3/4" noValidate>
            {/* email */}
            <div className="flex gap-2 items-center border border-white rounded-md p-2">
              <div className="text-white">
                <GrMail />
              </div>
              <input
                onChange={onChangeHandler}
                name="email"
                required
                className="border-none text-white bg-transparent focus:outline-none placeholder-white"
                type="email"
                placeholder="Email"
                value={formData.email}
              />
            </div>

            {/* password */}
            <div className="flex gap-2 items-center border border-white rounded-md p-2">
              <div className="text-white">
                <RiLockPasswordFill />
              </div>
              <input
                onChange={onChangeHandler}
                name="password"
                required
                className="border-none text-white bg-transparent focus:outline-none placeholder-white"
                type="password"
                placeholder="Password"
                value={formData.password}
              />
            </div>

            {/* forgot password */}
            <div className="flex gap-4">
              <div className="flex gap-2">
                <input type="checkbox" id="checkbox" />
                <label className="text-white" htmlFor="checkbox">
                  Remember Password
                </label>
              </div>
              <div className="text-white">
                <Link>Forgot Password</Link>
              </div>
            </div>

            {/* login */}
            <div className="flex flex-col">
              <button
                className="bg-white text-[#0ad0f4] text-xl font-bold rounded-md py-2 border hover:border-[#2d0af4]"
                onClick={submitHandler}
              >
                Login
              </button>
              <p className="text-center text-white">
                Don't Have an Account?{" "}
                <Link className="text-white" to={"/signup"}>
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* right div */}
        <div className="md:flex justify-center w-1/2 hidden h-full">
          <img src={LoginImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
