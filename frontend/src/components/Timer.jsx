/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";

function Timer({ givenTime, submitHandler }) {
  const [time, setTime] = useState(0);

  function startTimer() {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          submitHandler()
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  // Function to convert seconds to MM:SS format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    setTime(givenTime*60);
  }, [givenTime]);

  useEffect(() => {
    const timer = startTimer();
    return () => clearInterval(timer);
  }, []);
  return <div>Remaning Time : {formatTime(time)}</div>;
}

export default Timer;
