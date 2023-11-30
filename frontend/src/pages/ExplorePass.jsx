import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../redux/slices/paymentSlice";

function ExplorePass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);

  async function paymentHandler(amount) {
    const res = await dispatch(createOrder({ amount }));
    console.log(res.payload.order);
    let options = {
      key: res.payload.key, // Enter the Key ID generated from the Dashboard
      amount: res.payload.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: res.payload.order.currency,
      name: "Gyaan Book",
      description: "Gyaan Book Pass",
      image:
        "https://www.shutterstock.com/image-vector/book-people-sunrise-educational-logo-600nw-1673636527.jpg",
      order_id: res.payload.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const res = await dispatch(
          verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
        );
        if(res.payload.success){
          navigate("/")
        }
      },
      prefill: {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0ad0f4",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  return (
    <div className="mt-[70px]">
      <div className="bg-[#f7f6f6] dark:bg-gray-900">
        <div className="container px-6 py-8 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            Explore and Excel with Our Exclusive Passes
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6 dark:text-gray-300">
            Welcome to our Online Examination Price Page, where your journey to
            academic excellence begins! We offer three types of passes to cater
            to your unique preferences and study timelines. Unlock a world of
            knowledge, explore a multitude of exams, and elevate your learning
            experience with our monthly, 3-month, and yearly passes.
          </p>

          <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full p-8 space-y-8 bg-white text-center border border-gray-200 rounded-lg dark:border-gray-700">
              <p className="font-medium text-gray-500 uppercase dark:text-gray-300">
                Beginner
              </p>

              <h2 className="text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100">
                ₹199
              </h2>

              <p className="font-medium text-gray-500 dark:text-gray-300">
                1 Month
              </p>
              <ul className="flex-1 mb-6 dark:text-gray-400">
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Access to all exams for 30 days</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Unlimited test attempts</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Detailed performance analytics</span>
                </li>
              </ul>

              <button
                onClick={() => paymentHandler(199)}
                className="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Start Now
              </button>
            </div>

            <div className="w-full p-8 space-y-8 text-center bg-blue-600 rounded-lg">
              <p className="font-medium text-gray-200 uppercase">Premium</p>

              <h2 className="text-5xl font-bold text-white uppercase dark:text-gray-100">
                ₹499
              </h2>

              <p className="font-medium text-gray-200">3 Months</p>
              <ul className="flex-1 mb-6 text-white">
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Access to all exams for 90 days</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Exclusive content updates</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Priority customer support</span>
                </li>
              </ul>

              <button
                onClick={() => paymentHandler(499)}
                className="w-full px-4 py-2 mt-10 tracking-wide text-blue-500 capitalize transition-colors duration-300 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-200 focus:ring-opacity-80"
              >
                Start Now
              </button>
            </div>

            <div className="w-full p-8 space-y-8 bg-white text-center border border-gray-200 rounded-lg dark:border-gray-700">
              <p className="font-medium text-gray-500 uppercase dark:text-gray-300">
                Enterprise
              </p>

              <h2 className="text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100">
                ₹999
              </h2>

              <p className="font-medium text-gray-500 dark:text-gray-300">
                1 Year
              </p>
              <ul className="flex-1 mb-6 dark:text-gray-400">
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Access to all exams for 365 days</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Premium features includuded</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Certificate of Achievement</span>
                </li>
              </ul>

              <button
                onClick={() => paymentHandler(999)}
                className="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePass;
