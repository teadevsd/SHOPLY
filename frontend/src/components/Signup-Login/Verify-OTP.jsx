import React, { useState } from "react";
import styled from "styled-components";
import shoplylogo from "/shoply.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import signupimage from "../../assets/images/png/signupimage.png";
import { Link } from "react-router-dom";

const Verify = () => {
 

  return (
    <Wrapper>
      <InnerWrapper>
          <FormCont>
            <form>
            <p>Verification details</p>
              <StyledInput type="email" placeholder="Email" name="email" />

              <SubmitButton type="submit">Verify</SubmitButton>
              <span>Already have an account<Link to="/login"> Sign in</Link> </span>
            </form>
          </FormCont>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Verify;

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
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

