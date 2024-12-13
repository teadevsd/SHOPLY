import React, { useState } from "react";
import styled from "styled-components";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import signupimage from "../../assets/images/png/signupimage.png";
import { Link } from "react-router-dom";

const SetNewPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);


  return (
    <Wrapper>
      <InnerWrapper>

          <FormCont>
            <form>
            <p>Set new password for your Shoply account</p>
              
            <PasswordWrapper>
                <StyledInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                <EyeToggle onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? "🙈" : "👁️"}
                </EyeToggle>
              </PasswordWrapper>
             
              <PasswordWrapper>
                <StyledInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="password"
                />
                <EyeToggle onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? "🙈" : "👁️"}
                </EyeToggle>
              </PasswordWrapper>

              <SubmitButton type="submit">Login</SubmitButton>

              {/* <span>Don't have an account?<Link to="/login"> Sign up</Link> </span> */}
            </form>
          </FormCont>
      </InnerWrapper>

    </Wrapper>
  );
};

export default SetNewPassword;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background: #EDF2EE;
`;

const InnerWrapper = styled.div`
  width: 85%;
  /* margin: 0 auto; */
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

        a {
            text-decoration: none;
            color: red;
        }
    }
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
`;

