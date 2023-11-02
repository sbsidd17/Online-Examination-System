import { Route, Routes } from "react-router-dom"
import Exam from "../pages/Exam"
import InstructorDashboard from "../pages/InstructorDashboard"
import ResultPage from "../pages/ResultPage"
import StartTest from "../pages/StartTest"

function ExamsRoutes() {
  return (
    <>
      <Routes>
        <Route path="/exam/:id" element={<Exam />}/>
        <Route path="/start-test/:id" element={<StartTest />}/>
        <Route path="/test-result/:id" element={<ResultPage />}/>
        <Route path="/instructor-dashboard/:id" element={<InstructorDashboard />}/>
      </Routes>
    </>
  )
}

export default ExamsRoutes
