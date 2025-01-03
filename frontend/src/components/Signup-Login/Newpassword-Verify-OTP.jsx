import React, { useState } from "react";
import styled from "styled-components";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../utilitis/Axios";
import SummaryAPI from "../../common/SummaryAPI";
import toast from "react-hot-toast";	

const VerifyEmailOTP = () => {
  const [email, setEmail] = useState("");
  const isEmailValid = email.trim() !== "";

  const [data, setData] = useState({
    email : ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value} =e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryAPI.forgotPassword,
        data: data
      })

      if(!data.email.trim()) {
        toast.error('Email is required');
        return;
      }

      if( response.data.error) {
        toast.error(error.message || "Something went wrong");
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          email : ""
        })
        navigate("/verification-otp")
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

  return (
    <Wrapper>
      <InnerWrapper>
          <FormCont>
            <form onSubmit={handleSubmit}>
            <p>Verification details</p>
              <StyledInput type="email" placeholder="Email" name="email" value={data.email} onChange={(e) =>setEmail(e.target.value)}/>

              <SubmitButton type="submit"
              className= {isEmailValid ? "active" : ""} 
              disabled={!isEmailValid}
              onClick={handleChange}
              >
              Verify</SubmitButton>
              {/* <span>Already have an account<Link to="/login"> Sign in</Link> </span> */}
            </form>
          </FormCont>
      </InnerWrapper>
    </Wrapper>
  );
};

export default VerifyEmailOTP;

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

const SubmitButton = styled.button`
  width: 100%;
  background-color: green;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

