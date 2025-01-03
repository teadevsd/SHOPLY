import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoVerified } from "react-icons/go";

import toast from "react-hot-toast";
import AxiosToastError from "../../utilitis/AxiosToastError";
import Axios from "../../utilitis/Axios";
import SummaryAPI from "../../common/SummaryAPI";

const VerifiedMail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verificationCode = new URLSearchParams(location.search).get("codes");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Call your backend API to verify the email with the code
        const response = await Axios({
          ...SummaryAPI.verifyEmail,
          data: { code: verificationCode }
        });

        if (response.data.success) {
          toast.success("Email verified successfully!");
          // Redirect to the 'verification-successful' page
          navigate("/verification-successful");
        } else {
          toast.error(response.data.message || "Verification failed.");
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };

    if (verificationCode) {
      verifyEmail();
    }
  }, [verificationCode, navigate]);

  return (
    <Wrapper>
      <InnerWrapper>
        <FormCont>
          <GoVerified />
          <p>Email Verified Successfully! You can now Login!</p>
        </FormCont>
      </InnerWrapper>
    </Wrapper>
  );
};

export default VerifiedMail;

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
  text-align: center;
`;

const FormCont = styled.div`
  svg {
    font-size: 70px;
    color: green;
  }

  p {
    font-size: 30px;
    margin: 10px 0;
  }

  button {
    padding: 10px 30px;
    border-radius: 4px;
    color: white;
    background-color: green;
    border: none;
    cursor: pointer;
  }
`;
