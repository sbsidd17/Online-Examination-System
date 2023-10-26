import { Route, Routes } from "react-router-dom";
import Category from "../components/Category";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/category/:id" element={<Category />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default UserRoutes;
