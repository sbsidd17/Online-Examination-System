import { Route, Routes } from "react-router-dom";
import CreateExam from "../pages/Instructor/CreateExam";
import CreateTest from "../pages/Instructor/CreateTest";
import EditTest from "../pages/Instructor/EditTest";
import EditExam from "../pages/Instructor/EditExam";
import Exam from "../pages/Home/Exam";
import ExploreExams from "../pages/Home/ExploreExams";
import ExplorePass from "../pages/Home/ExplorePass";
import InstructorDashboard from "../pages/Instructor/InstructorDashboard";
import ResultPage from "../pages/User/ResultPage";
import StartTest from "../pages/User/StartTest";

function ExamsRoutes() {
  return (
    <>
      <Routes>
        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/start-test/:id" element={<StartTest />} />
        <Route path="/test-result/:id" element={<ResultPage />} />
        <Route path="/instructor-dashboard/:id" element={<InstructorDashboard />}/>
        <Route path="/create-exam/" element={<CreateExam />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />
        <Route path="/create-test/:id" element={<CreateTest />} />
        <Route path="/edit-test/:id" element={<EditTest />} />
        <Route path="/explore-exams" element={<ExploreExams />} />
        <Route path="/explore-pass" element={<ExplorePass />} />
      </Routes>
    </>
  );
}

export default ExamsRoutes;
