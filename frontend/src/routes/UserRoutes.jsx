import { Route, Routes } from "react-router-dom";
import Category from "../components/Category";
import Home from "../pages/Home";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/category/:id" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
