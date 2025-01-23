import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import axios from 'axios';
import { GoVerified } from "react-icons/go";
import { useAppContext } from '../../common/AuthContext';


const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get('codes');
  const navigate = useNavigate();
  const { setIsVerified } = useAppContext();

  useEffect(() => {
      const verifyEmail = async () => {
          if (!verificationCode) return;

          try {
              const response = await axios.get(`/api/verify-email?codes=${verificationCode}`);
              toast.success(response.data.message || 'Email verified successfully.');
              setIsVerified(true);
              setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
          } catch (error) {
              const errorMessage = error.response?.data?.message || 'Something went wrong.';
              toast.error(errorMessage);
          }
      };

      verifyEmail();
  }, [verificationCode, navigate, setIsVerified]);

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

export default VerifyEmail;

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
