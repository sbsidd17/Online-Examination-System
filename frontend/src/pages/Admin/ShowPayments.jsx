/* eslint-disable react-hooks/exhaustive-deps */
import { FcCurrencyExchange, FcPositiveDynamic } from "react-icons/fc";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getAllPayment } from "../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function ShowPayments() {
  const { allPayments } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  async function getData() {
    await dispatch(getAllPayment());
  }

  useEffect(() => {
    getData();
  }, []);

  const monthlySalesRecord = allPayments.all_data.monthlySalesRecord;

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Orders / Month",
        data: monthlySalesRecord,
        backgroundColor: ["red"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-md shadow-md">
      {/* for displaying the bar chart */}
      <div className="h-60 relative w-full">
        <Bar
          data={salesData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-full p-3 md:p-10 gap-3">
        <div className="flex gap-3 w-full md:w-1/2 justify-center items-center font-semibold">
            <div className="flex justify-center items-center">
            <FcPositiveDynamic size={42} />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
                <div>Subscriptions Count</div>
                <div>{allPayments?.all_data?.allPayments?.count}</div>
            </div>
        </div>
        <div className="flex gap-3 w-full md:w-1/2 justify-center items-center font-semibold">
            <div className="flex justify-center items-center">
            <FcCurrencyExchange size={42} />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
                <div>Total Revenue</div>
                <div>₹ {allPayments?.total_amount/100}</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPayments;
