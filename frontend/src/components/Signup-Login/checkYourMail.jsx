import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CheckYourMail = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <FormCont>
          
          <p>Thank you for registering on Shoply. <br/>Please login to you mail box and verify your email.<br/> Thanks👌</p>
          <Link>
            
          </Link>
        </FormCont>
      </InnerWrapper>
    </Wrapper>
  )
}

export default CheckYourMail

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
    font-size: 20px;
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
