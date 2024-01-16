import React from "react";
import { useState } from "react";
import "../App.css";
import OtpInput from "./OtpInput";

function PhoneOtp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();
    //Checking the valid phone number or not

    let regex = /^\d{10}$/;
    //console.log(phoneNumber.length, regex.test(phoneNumber.toString()));

    if (phoneNumber.length < 10 || !regex.test(phoneNumber)) {
      alert("Invalid phone number");
    } else {
      setShowOtp(true);
    }
  }

  function handleBackClick() {
    setShowOtp(false);
  }
  function onOtpSubmit(otp) {
    console.log("succesful login : ", otp);
  }

  return (
    <div className="otpForm">
      {showOtp ? (
        <div>
          Enter OTP send to this {phoneNumber} Number
          <OtpInput onOtpSubmit={onOtpSubmit} />
          <button
            style={{ width: "50px", height: "30px" }}
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="phonenumber">
          <input
            name="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
          <p>*The phone number must contain 10 numbers and numbers only*</p>
          <button type="submit">Generate OTP</button>
        </form>
      )}
    </div>
  );
}

export default PhoneOtp;
