/* eslint-disable react/prop-types */

import { FcDocument, FcOvertime, FcQuestions } from "react-icons/fc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TestCard({ test }) {
  const { isLoggedIn, hasPass } = useSelector((state) => state.auth);
  return (
    // main div
    <div className="flex justify-between items-center bg-white w-full shadow-md py-5 px-20">
      {/* left */}
      <div className="flex flex-col gap-2 w-1/2">
        <h1>{test.test_name}</h1>
        <div className="flex justify-start items-center gap-2">
          <div className="flex justify-center items-center">
            <FcQuestions />
            <p className="text-sm text-slate-500">{`${test.total_questions} Questions`}</p>
          </div>
          <div className="flex justify-center items-center">
            <FcDocument />{" "}
            <p className="text-sm text-slate-500">{`${test.total_marks} Marks`}</p>
          </div>
          <div className="flex justify-center items-center">
            <FcOvertime />{" "}
            <p className="text-sm text-slate-500">{`${test.total_time} Mins`}</p>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex justify-normal items-center">
        {isLoggedIn ? (
          <div>
            {hasPass ? (
              <Link to={`/start-test/${test._id}`} className="w-full">
                <button className="w-full bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
                  Start Now
                </button>
              </Link>
            ) : (
              <Link to={`/explore-pass`} className="w-full">
                <button className="w-full bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
                  Unlock
                </button>
              </Link>
            )}
          </div>
        ) : (
          <Link to={`/login`} className="w-full">
            <button className="w-full bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">
              Login Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TestCard;
