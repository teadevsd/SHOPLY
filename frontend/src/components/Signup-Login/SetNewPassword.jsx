import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import the navigate hook
import AxiosToastError from "../../utilitis/AxiosToastError";
import Axios from "../../utilitis/Axios";
import SummaryAPI from "../../common/SummaryAPI";
import toast from "react-hot-toast";
import { useAppContext } from "../../common/AuthContext";

const SetNewPassword = () => {
  const { email, setEmail } = useAppContext(); // Get email directly from context
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const newErrors = { ...errors };

    if (name === "newPassword") {
      const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,16}$/;
      if (!passwordPattern.test(value)) {
        newErrors.newPassword = "Password must be 6-16 characters, including at least one digit and one special character (!@#$%^&*)";
      } else {
        delete newErrors.newPassword;
      }
    }

    // Confirm Password validation
    if (name === "confirmPassword" && value !== newPassword.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log data to see if it's structured correctly
    console.log({
      email,
      newPassword: newPassword.newPassword,
      confirmPassword: newPassword.confirmPassword,
    });

    try {
      const response = await Axios({
        ...SummaryAPI.resetPassword,
        data: {
          email, // Ensure email is passed correctly
          newPassword: newPassword.newPassword,
          confirmPassword: newPassword.confirmPassword,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message || 'Something went wrong');
      }

      if (response.data.success) {
        toast.success(response.data.message || 'Password changed successfully');
        setEmail(email); // Set the email in context after successful reset
        navigate("/login"); // Navigate to login page after successful reset
      }

    } catch (error) {
      AxiosToastError(error);
    }
};


  const isButtonDisabled =
    !newPassword.newPassword ||
    !newPassword.confirmPassword ||
    newPassword.newPassword !== newPassword.confirmPassword;

  return (
    <Wrapper>
      <InnerWrapper>
        <FormCont>
          <form onSubmit={handleSubmit}>
            <p>Set new password for your Shoply account</p>

            <PasswordWrapper>
              <StyledInput
                type={passwordVisible ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={newPassword.newPassword}
                onChange={handleInputChange}
              />
              <EyeToggle onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? "🙈" : "👁️"}
              </EyeToggle>
            </PasswordWrapper>
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}

            <PasswordWrapper>
              <StyledInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={newPassword.confirmPassword}
                onChange={handleInputChange}
              />
              <EyeToggle onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? "🙈" : "👁️"}
              </EyeToggle>
            </PasswordWrapper>

            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

            <SubmitButton
              type="submit"
              disabled={isButtonDisabled}
              active={!isButtonDisabled}
            >
              Create New Password
            </SubmitButton>
          </form>
        </FormCont>
      </InnerWrapper>
    </Wrapper>
  );
};



export default SetNewPassword;


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
  margin: 0 auto;
  background-color: #fff;
  width: 40%;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 20px;
    font-weight: 500;

    span {
      font-size: 12px;
      color: red;
    }
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding-right: 40px;
  }
`;

const EyeToggle = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${({ active }) => (active ? "green" : "#ccc")};
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#025b08" : "#ccc")};
  }
`;
