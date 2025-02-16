import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../utilitis/Axios";
import SummaryAPI from "../../common/SummaryAPI";
import AxiosToastError from "../../utilitis/AxiosToastError";
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useAppContext } from "../../common/AuthContext";

const Signup = () => {
  const { setEmail } = useAppContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [statesAndCities, setStatesAndCities] = useState({});
  const [isCheckedBoxChecked, setIsCheckedBoxChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [setData, setSetData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        state: "",
        city: "",
      });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state
    setSetData({
      ...setData,
      [name]: value,
    });

    // Error handling logic
    const newErrors = { ...errors };

    // First Name validation
    if (name === "firstName" && (value.length < 3 || value.length > 8)) {
      newErrors.firstName = "First name should include 3-8 characters";
    } else {
      delete newErrors.firstName;
    }

    // Last Name validation
    if (name === "lastName" && (value.length < 3 || value.length > 8)) {
      newErrors.lastName = "Last name should include 3-8 characters";
    } else {
      delete newErrors.lastName;
    }

    // Email validation
    if (name === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      newErrors.email = "Enter a valid email";
    } else {
      delete newErrors.email;
    }

    // Phone Number Validation
    if (name === "phoneNumber") {
      const phoneNumberParsed = parsePhoneNumberFromString(value); // Parse the phone number
    
      if (!phoneNumberParsed) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      } else {
        // Check if the phone number is valid and if the country code matches the length
        if (!isValidPhoneNumber(value)) {
          newErrors.phoneNumber = "Please enter a valid phone number";
        } else {
          delete newErrors.phoneNumber;
        }
      }
    }

    // Password validation
    if (name === "password") {
      const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,16}$/;
      if (!passwordPattern.test(value)) {
        newErrors.password =
          "Password must be 6-16 characters, including at least one digit and one special character (!@#$%^&*)";
      } else {
        delete newErrors.password;
      }
    }

    // Confirm Password validation
    if (name === "confirmPassword" && value !== setData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const validValue =
    Object.values(setData).every((el) => el) &&
    Object.keys(errors).length === 0 &&
    isCheckedBoxChecked;

  const handleUserInput = async (e) => {
    e.preventDefault();
    setEmail(setData.email);

    if (setData.password !== setData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryAPI.register,
        data: setData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        setEmail(setData.email);
        
        toast.success(response.data.message);
        setSetData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          state: "",
          city: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const fetchStatesAndCities = async () => {
      try {
        const response = await axios.get(
          "https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode",
          {
            params: { countrycode: "ng" },
            headers: {
              "x-rapidapi-key": "e710dc4a12mshfe42c45038eb049p10c03cjsnf6580e20f6de",
              "x-rapidapi-host": "country-state-city-search-rest-api.p.rapidapi.com",
            },
          }
        );

        const stateCities = response.data.reduce((acc, item) => {
          const { stateCode: state, name: city } = item;
          if (state) {
            if (!acc[state]) acc[state] = [];
            acc[state].push(city);
          }
          return acc;
        }, {});

        setStatesAndCities(stateCities);
      } catch (error) {
        console.error("Error fetching states and cities:", error);
      }
    };

    fetchStatesAndCities();
  }, []);

  return (
    <Wrapper>
      <InnerWrapper>
        <SignContent>
          <FormCont>
            <form onSubmit={handleUserInput}>
              <p>Create your Shoply account</p>
              <StyledInput
                type="text"
                placeholder="First Name"
                name="firstName"
                value={setData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}

              <StyledInput
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={setData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}

              <StyledInput
                type="email"
                placeholder="Email"
                name="email"
                value={setData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <PhoneInput
                country={"ng"}
                inputStyle={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "12px",
                  border: "1px solid grey",
                  borderRadius: "4px",
                  paddingLeft: "45px",
                }}
                name="phoneNumber"
                value={setData.phoneNumber}
                onChange={(value) =>
                  setSetData((prevState) => ({
                    ...prevState,
                    phoneNumber: value,
                  }))
                }
                onBlur={() => {
                  const newErrors = { ...errors };
                  const phoneNumber = setData.phoneNumber;

                  try {
                    const phoneNumberParsed = parsePhoneNumberFromString(phoneNumber, "NG");

                    if (!phoneNumberParsed || !phoneNumberParsed.isValid()) {
                      newErrors.phoneNumber = "Please enter a valid phone number";
                    } else if (phoneNumberParsed.number.length < 10) {
                      newErrors.phoneNumber = "Phone number must be at least 10 digits long";
                    } else if (phoneNumberParsed.number.length > 15) {
                      newErrors.phoneNumber = "Phone number must not exceed 15 digits";
                    } else {
                      delete newErrors.phoneNumber;
                    }
                  } catch (error) {
                    newErrors.phoneNumber = "Please enter a valid phone number";
                  }

                  setErrors(newErrors);
                }}
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

              <StyledSelect
                name="state"
                onChange={(e) => handleChange(e)}
                value={setData.state}
              >
                <option value="">Select State</option>
                {Object.keys(statesAndCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </StyledSelect>

              {setData.state && (
                <StyledSelect
                  name="city"
                  onChange={(e) => handleChange(e)}
                  value={setData.city}
                >
                  <option value="">Select City</option>
                  {statesAndCities[setData.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </StyledSelect>
              )}

              <PasswordWrapper>
                <StyledInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={setData.password}
                  onChange={handleChange}
                />
                
                <EyeIcon onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? "🙈" : "👁️"}
                </EyeIcon>
              </PasswordWrapper>
              {errors.password && <span className="error">{errors.password}</span>}

              <PasswordWrapper>
                <StyledInput
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={setData.confirmPassword}
                  onChange={handleChange}
                />
               
                <EyeIcon onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? "🙈" : "👁️"}
                </EyeIcon>
              </PasswordWrapper>
               {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}

              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  name="acceptTerms"
                  onChange={() => setIsCheckedBoxChecked(!isCheckedBoxChecked)}
                />
                <label htmlFor="acceptTerms">I accept the Terms & Conditions</label>
              </CheckboxContainer>


                <span>
                   Already have an account? <Link to="/login">Login</Link>
                </span>
              <StyledButton
                type="submit"
                disabled={!validValue}
                style={{ cursor: validValue ? "pointer" : "not-allowed" }}
              >
        
                Sign Up
              </StyledButton>
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
  background: #edf2ee;
  padding: 50px 0;
`;

const InnerWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  max-width: 1280px;
`;

const SignContent = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  img {
    width: 45%;
  }

  @media (max-width: 768px) {

    img {
      display: none;
    }
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
    gap: 10px;
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

  .error{
    color: red;
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
  outline: none;
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

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const StyledButton = styled.button`
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  input[type="checkbox"] {
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


