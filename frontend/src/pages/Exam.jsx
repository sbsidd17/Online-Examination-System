/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import TestCard from "../components/TestCard"
import { getExamById } from "../redux/slices/examSlice"

function Exam() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const exam = useSelector(state=>state.exam.exams.curr_exam)

  async function getExamData(){
    await dispatch(getExamById(id))
  }
  useEffect(()=>{
    getExamData()
  },[id])
  return (
    <div className="mt-[70px] w-full flex flex-col bg-[#fbfcfc]">
      {/* detail section */}
      <section className="flex flex-col md:flex-row w-full h-full gap-10 pt-10 bg-blue-50">
        {/* left div */}
        <div className="flex w-full md:w-1/2 items-start justify-start p-5">
          <img className="w-full" src={exam?.thumbnail} alt="img" />
        </div>

        {/* right div */}
        <div className="flex flex-col gap-5 p-5 w-full md:w-1/2">
          <h1 className="text-3xl text-slate-500 font-sans font-semibold">{exam?.exam_name}</h1>
          <p className=" text-slate-700">{exam.exam_description}</p>
          <p className=" text-slate-700">Total Tests : {exam?.all_tests?.length}</p>
          <p className="text-slate-700">Created By : {`${exam?.instructor?.first_name} ${exam?.instructor?.last_name}`}</p>
        </div>
      </section>

      {/* tests section */}
      <section className="flex flex-col w-full p-5 md:p-20 justify-center items-center gap-10">
          <h1 className="text-2xl font-bold">{`${exam?.exam_name} All Tests : (${exam?.all_tests?.length})`}</h1>
          {
            exam?.all_tests?.map((test)=>{
              return <TestCard key={test._id} test={test} />
            })
          }
      </section>
    </div>
  )
}

export default Exam
