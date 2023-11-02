import { useSelector } from "react-redux";

function Dashboard() {
  const { data } = useSelector((state) => state.auth);
  return (
    <div className="mt-[70px] w-full h-[calc(100vh-70px)] p-20 flex justify-center items-center">
      <div className="flex flex-col gap-10 items-center min-h-full w-full bg-white shadow-lg">
        
      </div>
    </div>
  );
}

export default Dashboard;
