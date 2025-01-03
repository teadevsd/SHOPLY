import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const VerificationSuccessful = () => {
    const navigate = useNavigate(); // useNavigate instead of useHistory

    const goToLogin = () => {
        navigate('/login'); // Navigate to login page after success
    };

    return (
        <Wrapper>
            <h2>Email Verified Successfully</h2>
            <p>Your email has been successfully verified. You can now log in.</p>
            <button onClick={goToLogin}>Go to Login</button>
        </Wrapper>
    );
};

export default VerificationSuccessful;

const Wrapper = styled.div`
    margin: 150px;

`
