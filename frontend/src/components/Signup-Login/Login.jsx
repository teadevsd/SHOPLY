import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI, { baseURL } from "../../common/SummaryAPI";
import toast from "react-hot-toast";
import AxiosToastError from "../../utilitis/AxiosToastError";
import Axios from "../../utilitis/Axios";
import { useDispatch} from "react-redux";
import fetchUserDetails from "../../utilitis/fetchUserDetails";
import { setUserDetails } from "../../store/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Check if both email and password fields are filled
  const validValue = formData.email.trim() !== "" && formData.password.trim() !== "";

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios({
        method: "POST",
        url: `${baseURL}${SummaryAPI.login.url}`,
        data: formData,
      });
  
      console.log("Response:", response);
  
      if (response.data.error) {
        toast.error(response.data.message); // Show error from backend
      } else {
        toast.success(response.data.message);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        setFormData({
          email: "",
          password: "",
        });
        navigate("/select-merchant");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log the error to understand the issue
      AxiosToastError(error); // Handle the error from Axios with toast
      if (error.response) {
        // This will log the error response from the backend if it exists
        console.log("Error Response:", error.response.data);
        toast.error(error.response.data.message || "An error occurred during login");
      }
    }
  };
  
  
  
  
  return (
    <Wrapper>
      <InnerWrapper>
        <FormCont>
          <form onSubmit={handleUserInput}>
            <p>Login to Shoply account</p>

            <StyledInput
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <PasswordWrapper>
              <StyledInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <EyeToggle onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? "🙈" : "👁️"}
              </EyeToggle>
            </PasswordWrapper>

            <Link to="/verify-email-forgot password">
              <p>Forgot password</p>
            </Link>

            <SubmitButton
              className={`${validValue ? "active" : ""}`}
              disabled={!validValue}
            >
              Login
            </SubmitButton>

            <span>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </span>
          </form>
        </FormCont>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Login;

// Styled Components (no changes)
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

  p:nth-last-child(1) {
    font-size: 12px;
    color: red;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 20px;
    font-weight: 500;

    span {
      font-size: 12px;

      a {
        text-decoration: none;
        color: red;
      }
    }

    a {
      text-decoration: none;
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

  &.active {
    background-color: green;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
