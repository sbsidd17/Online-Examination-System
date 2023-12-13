import { useState } from "react";
import toast from "react-hot-toast";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RestetPasswordImage from "../../assets/images/RestetPasswordImage.png";
import { resetPassword } from "../../redux/slices/authSlice";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const { resetToken } = useParams();
//   console.log(resetToken);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function submitHandler(e){
    e.preventDefault()
    if(newPassword === "" || confirmNewPassword === ""){
        toast.error("All Feilds Are Required")
        return;
    }

    if(newPassword !== confirmNewPassword){
        toast.error("Password And Confirm Password Should Be Same")
        return;
    }

    const res = await dispatch(resetPassword({resetToken, newPassword}))
    if(res.type === "/auth/reset-password/fulfilled"){
        navigate("/login")
      }
  }


  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)]">
      {/* main div */}
      <div className="flex w-full h-full">
        {/* left div */}
        <div className="md:flex justify-center w-[40%] hidden h-full relative">
          <img src={RestetPasswordImage} alt="" 
          className="absolute top-0 left-[30%] w-full h-full"
          />
        </div>

        {/* right div */}
        <div className="flex flex-col gap-7 w-full md:w-[60%] h-full justify-center items-center bg-[#0ad0f4] p-5 md:p-30">
          {/* heading */}
          <div className="text-3xl text-white font-bold">Reset Password?</div>

          {/* form data */}
          <form className="flex flex-col gap-5 w-11/12 md:w-3/4" noValidate>
            {/* password */}
            <div className="flex gap-2 items-center border border-white rounded-md p-2">
              <div className="text-white">
                <RiLockPasswordFill />
              </div>
              <input
                onChange={(e)=>setNewPassword(e.target.value)}
                name="newPassword"
                required
                className="border-none text-white bg-transparent focus:outline-none placeholder-white"
                type="password"
                placeholder="New Password"
                value={newPassword}
              />
            </div>

            {/* confirm password */}
            <div className="flex gap-2 items-center border border-white rounded-md p-2">
              <div className="text-white">
                <RiLockPasswordFill />
              </div>
              <input
                onChange={(e)=>setConfirmNewPassword(e.target.value)}
                name="confirmPassword"
                required
                className="border-none text-white bg-transparent focus:outline-none placeholder-white"
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
              />
            </div>

            {/* login */}
            <div className="flex flex-col">
              <button
                className="bg-white text-[#0ad0f4] text-xl font-bold rounded-md py-2 border hover:border-[#2d0af4]"
                onClick={submitHandler}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
