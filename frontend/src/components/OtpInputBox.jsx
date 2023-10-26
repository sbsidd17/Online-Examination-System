import React, { useState } from 'react';

function OtpInputBox() {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Automatically focus on the previous input field if backspace is pressed
    if (e.target.value === '' && index > 0) {
      document.getElementById(`digit${index}`).focus();
    } else if (e.target.value.length === 1 && index < 3) {
      document.getElementById(`digit${index + 2}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0) {
      document.getElementById(`digit${index - 1}`).focus();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <p className="text-gray-500 mb-4">We've sent a one-time password to your mobile number.</p>
      <div className="flex justify-center items-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            className="w-12 h-12 text-3xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            id={`digit${index + 1}`}
          />
        ))}
      </div>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Resend OTP</button>
    </div>
  );
}

export default OtpInputBox;
