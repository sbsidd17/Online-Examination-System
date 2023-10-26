import "./App.css";
import "./index.css";
import UserRoutes from "./routes/UserRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <UserRoutes />
    </>
  );
}

export default App;
