import { Link } from "react-router-dom";
import GyanBookLogoWhite from "../assets/logo/GyanBookLogoWhite.png";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    // footer with 3 colums and 2 rows
    <div className="bg-gray-800 relative left-0 bottom-0 w-full flex flex-col p-20 mt-20">

      {/* row 1 */}
      <div className=" w-full flex justify-between">
        {/* column 1 */}
        <div className="flex flex-col justify-between gap-5">
          <div className="flex justify-between">
            <img src={GyanBookLogoWhite} alt="logo" className="w-[250px]" />
          </div>
          <div>
            <p className="text-white">Sd Education Pvt. Ltd.</p>
            <p className="text-gray-400 text-sm">
              Baghpat, Uttar Pradesh, 250617
            </p>
            <p className="text-gray-400 text-sm">India</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">SdEducationFree@gmail.com</p>
          </div>
        </div>
        {/* column 2 */}
        <div className="flex flex-col justify-between gap-5">
          <p className="text-white font-semibold">Services</p>
          <Link className="text-gray-400 text-sm">Test Series</Link>
          <Link className="text-gray-400 text-sm">Quiz</Link>
          <Link className="text-gray-400 text-sm">GyaanBook Pass</Link>
          <Link className="text-gray-400 text-sm">Blog</Link>
        </div>

        {/* column 3 */}
        <div className="flex flex-col gap-10 items-center">
          <p className="text-white font-semibold">Follow Us On</p>
          <div className="flex gap-5">
            <FaFacebookF size={28} className="text-gray-400" />
            <FaTwitter size={28} className="text-gray-400" />
            <FaLinkedinIn size={28} className="text-gray-400" />
            <FaGithub size={28} className="text-gray-400" />
          </div>
        </div>
      </div>
      {/* row 2 */}
      <hr className="text-gray-400 mt-10" />
      <div className="flex justify-center items-center text-gray-400 font-semibold m-5">
      Copyright © 2023-24 SdEducation Pvt. Ltd. All rights reserved
      </div>
    </div>
  );
}

export default Footer;
