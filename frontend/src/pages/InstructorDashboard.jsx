import { useParams } from "react-router-dom"

function InstructorDashboard() {
    const {id} = useParams()
    console.log(id)
  return (
    <div className="mt-[70px] w-full p-10">
        {/* main div */}
        <div className="flex flex-col justify-center items-center bg-[#fbfcfc]">
            <h1 className="text-3xl font-semibold text-slate-500">Instructor Dashboard</h1>
        </div>
    </div>
  )
}

export default InstructorDashboard
