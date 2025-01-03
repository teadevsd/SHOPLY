import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SetNewPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isButtonDisabled =
    !newPassword.password ||
    !newPassword.confirmPassword ||
    newPassword.password !== newPassword.confirmPassword;

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
                value={newPassword.password}
                onChange={handleInputChange}
              />
              <EyeToggle onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? "🙈" : "👁️"}
              </EyeToggle>
            </PasswordWrapper>

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

            <Link to={isButtonDisabled ? "#" : "/login"}>
              <SubmitButton 
                type="submit" 
                disabled={isButtonDisabled} 
                active={!isButtonDisabled} // Pass active prop
              >
                Login
              </SubmitButton>
            </Link>
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
