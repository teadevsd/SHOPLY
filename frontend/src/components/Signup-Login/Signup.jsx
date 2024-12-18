import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import signupimage from "../../assets/images/png/signupimage.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [role, setRole] = useState("");
  const [statesAndCities, setStatesAndCities] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
  
        console.log("API Response:", response.data); // Debugging: Log response to see structure
  
        // Create a mapping of states to cities
       const stateCities = response.data.reduce((acc, item) => {
          const { stateCode: state, name: city } = item; // Adjust to the actual keys
          if (state) {
            if (!acc[state]) acc[state] = [];
            acc[state].push(city);
          }
          return acc;
        }, {});

        console.log(stateCities);

        
  
        console.log("State Cities Mapping:", stateCities); // Debugging: Log state-to-cities mapping
        setStatesAndCities(stateCities);
      } catch (error) {
        console.error("Error fetching states and cities:", error);
      }
    };
  
    fetchStatesAndCities();
  }, []);
  
  
  

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity(""); // Reset city selection when state changes
  };

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
                  name="state"
                  onChange={handleStateChange}
                  value={selectedState}
                >
                  <option value="">Select State</option>
                  {Object.keys(statesAndCities).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </StyledSelect>

                {selectedState && (
                  <StyledSelect
                    name="city"
                    onChange={(e) => setSelectedCity(e.target.value)}
                    value={selectedCity}
                  >
                    <option value="">Select City</option>
                    {statesAndCities[selectedState]?.map((city) => (
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

              <span>Already have an account<Link to="/login"> Sign in</Link></span>
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
