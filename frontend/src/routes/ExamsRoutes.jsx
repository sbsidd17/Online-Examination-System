import { Route, Routes } from "react-router-dom"
import CreateExam from "../pages/CreateExam"
import CreateTest from "../pages/CreateTest"
import EditExam from "../pages/editExam"
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
        <Route path="/create-exam/" element={<CreateExam />}/>
        <Route path="/edit-exam/:id" element={<EditExam />}/>
        <Route path="/create-test/:id" element={<CreateTest />}/>
      </Routes>
    </>
  )
}

export default ExamsRoutes
