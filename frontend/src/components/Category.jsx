/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategoryById } from "../redux/slices/examSlice";
import ExamCard from "./ExamCard";

function Category() {
  const { categories } = useSelector((state) => state.exam);

  const dispatch = useDispatch();

  const { id } = useParams();

  async function getCategoryData() {
    await dispatch(getCategoryById(id));
  }

  useEffect(() => {
    getCategoryData();
  }, [id]);

  return (
    <>
      <div className="flex justify-center lg:justify-between items-center flex-wrap gap-5">
        {categories.curr_category?.exams?.map((exam) => {
          return (
            <Link key={exam._id} to={`/exam/${exam._id}`} className="w-full">
              <ExamCard
                name={exam.exam_name}
                url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png"
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Category;
