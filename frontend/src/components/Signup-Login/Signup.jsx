import React, { useState } from "react";
import styled from "styled-components";
import shoplylogo from "/shoply.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import signupimage from "../../assets/images/png/signupimage.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [role, setRole] = useState("");

  return (
    <Wrapper>
      <InnerWrapper>
       
        <SignContent>
          <img src={signupimage} alt="Cartman Illustration" />

          <FormCont>
           
            <form>
            <p>Create your Shoply account</p>
              <StyledInput type="text" placeholder="First Name" name="firstName" />
              <StyledInput type="text" placeholder="Last Name" name="lastName" />
              <StyledInput type="email" placeholder="Email" name="email" />

              <PhoneInput
                country={"ng"}
                inputStyle={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  paddingLeft: "45px"
                }}
                containerStyle={{
                  textAlign: "left",
                }}
                countryCodeEditable={false}
              />

              <StyledSelect
                name="role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="">Select Role</option>
                <option value="Merchant">Merchant</option>
                <option value="User">User</option>
              </StyledSelect>

              <StyledInput type="text" placeholder="BVN" name="bvn" />

              {role === "Merchant" && (
                <StyledInput
                  type="text"
                  placeholder="Business Name"
                  name="businessName"
                />
              )}

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
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
                <EyeToggle
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? "🙈" : "👁️"}
                </EyeToggle>
              </PasswordWrapper>

              <CheckboxWrapper>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
              Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.
              </label>
            </CheckboxWrapper>

              <SubmitButton type="submit">Register</SubmitButton>

              <span>Already have an account<Link to="/login"> Sign in</Link> </span>
            </form>
          </FormCont>
      

        </SignContent>
      </InnerWrapper>

    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background: #f7f7f7;
`;

const InnerWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  max-width: 1200px;
`;

const SignContent = styled.div`
/* border: 1px solid; */
  display: flex;
  flex-direction: row-reverse;
  /* gap: 50px;  */
  /* justify-content: space-between; */
  align-items: center;
  margin-top: 100px;

  img {
    width: 45%;
  }
`;

const FormCont = styled.div`
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

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 14px;
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    /* appearance: none; */
    width: 22px;
    height: 22px;
    border: 2px solid grey;
    border-radius: 3px;
    margin-right: 8px;
    cursor: pointer;
    position: relative;
  }

  label {
    font-size: 12px;
    cursor: pointer;
    margin: 10px 0;
  }
`;
