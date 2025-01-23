import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Axios from "../../utilitis/Axios";
import SummaryAPI from "../../common/SummaryAPI";
import AxiosToastError from "../../utilitis/AxiosToastError";
import { useAppContext } from "../../common/AuthContext";

const Otpgen = () => {
  const { email, setEmail, isVerified, setIsVerified } = useAppContext();  // Get values from context
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();

  // Redirect if email is not available
  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please try again.");
      navigate("/");  // Navigate to homepage or login
    }
  }, [email, navigate]);

  // Countdown for OTP resend
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;  // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);  // Limit to 1 digit
    setOtp(newOtp);

    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) nextInput.focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");  // Combine OTP digits
    if (!otpCode || otpCode.length !== 4) {
      return toast.error("Please enter a valid 4-digit OTP.");
    }

    try {
      const response = await Axios({
        ...SummaryAPI.otpVerification,
        data: { otp: otpCode, email },
      });

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        setIsVerified(true);  // Update verification status in context
        navigate("/new-password");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleRequestOTP = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.resendOtp,
        data: { email },
      });

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setSeconds(60);  // Reset timer
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const isOtpValid = otp.every((digit) => /^\d$/.test(digit));  // Validate OTP

  return (
    <Wrapper>
      <InnerWrapper>
        <FormCont>
          <form onSubmit={handleSubmit}>
            <p>OTP Verification</p>
            <p>We sent an OTP to: {email}</p>
            <p>Enter the 6-digit code sent to your registered Email</p>

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

            <SubmitButton
              type="submit"
              className={isOtpValid ? "active" : ""}
              disabled={!isOtpValid}
            >
              Verify
            </SubmitButton>

            <span>
              Didn't get the code? Resend in {seconds}s{" "}
              {seconds === 0 && <button onClick={handleRequestOTP}>Resend</button>}
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
  background: #edf2ee;
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

      button {
        background: transparent;
        border: none;
        color: red;
      }
    }
  }

  @media (max-width: 768px) {
    width: 80%;
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
  width: 100%;
  background-color: gray;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
  transition: background-color 0.3s ease;

  &.active {
    background-color: green;
    cursor: pointer;
  }

  &:hover {
    background-color: #025b08;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const OtpInput = styled.div`
  display: flex;
  justify-content: space-between;
`;
