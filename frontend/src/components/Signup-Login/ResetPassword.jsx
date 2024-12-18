import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Otpgen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(60); // State for the countdown

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1); // Decrease by 1 every second
      }, 1000);
      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }
  }, [seconds]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Prevent non-numeric input

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only allow one digit
    setOtp(newOtp);

    // Automatically move to the next input if not the last box
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <FormCont>
          <form>
            <p>OTP Verification</p>
            <p>Enter the 4-digit code sent to your registered Email</p>

            <OtpInput>
              {otp.map((digit, index) => (
                <StyledInput
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  maxLength="1"
                />
              ))}
            </OtpInput>

            <SubmitButton type="submit">Verify</SubmitButton>
            <span>
              Resend in {seconds}s{" "}
              {seconds === 0 && (
                <Link to="">Resend</Link> // Resend link only appears when the countdown reaches 0
              )}
            </span>
          </form>
        </FormCont>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Otpgen;

// Styled Components

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background: #EDF2EE;
`;

const InnerWrapper = styled.div`
  width: 85%;
  max-width: 1200px;
`;

const FormCont = styled.div`
  background-color: #fff;
  width: 40%;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 auto;

  p:nth-child(2) {
    font-size: 12px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 20px;
    font-weight: 500;

    span {
      font-size: 12px;
      display: flex;
      justify-content: space-between;

      a {
        text-decoration: none;
        color: red;
      }
    }
  }
`;

const StyledInput = styled.input`
  width: 60px;
  height: 60px;
  padding: 12px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: green;
    background-color: #e8ffe8;
  }
`;

const SubmitButton = styled.button`
  background-color: green;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #025b08;
  }
`;

const OtpInput = styled.div`
  display: flex;
  justify-content: space-between;
`;
