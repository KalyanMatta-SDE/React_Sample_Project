import React, { useEffect, useRef, useState } from "react";
import "../App.css";

function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRef = useRef([]);

  console.log(otp);

  function handleInputChange(e, index) {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[newOtp.indexOf("", index)].focus();
    }
  }

  function hadleClick(event, index) {
    inputRef.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRef.current[index - 1].focus();
    }
  }

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  return (
    <div className="otpinput">
      {otp.map((value, index) => (
        <input
          type="text"
          value={value}
          key={index}
          onChange={(event) => handleInputChange(event, index)}
          onClick={(event) => hadleClick(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(input) => (inputRef.current[index] = input)}
        ></input>
      ))}
    </div>
  );
}

export default OtpInput;
