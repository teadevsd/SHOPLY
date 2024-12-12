import styled from "styled-components"
import Heroimage from "../../assets/images/png/shooping.jpg"
import { Link } from "react-router-dom"


const Hero = () => {
  return (
    <Wrapper>
        <Innerwrap>
            <Herocont>
                <h2>
                Browse products from trusted merchants near you—shop made simple!
                </h2>

                <Link><button>Explore</button></Link>
            </Herocont>
        </Innerwrap>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px); 
  background-image: url(${Heroimage}); 
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const Innerwrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  width: 85%;
  margin: 0 auto;
  max-width: 1200px;
`;

const Herocont = styled.div`

  h2 {
    margin-right: 80px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    line-height: 1.4; 
    padding: 20px;
    border-radius: 8px;
    text-align: left; 
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    max-width: 400px;
    background: rgba(0, 0, 0, 0.5);
  }

  button {
    padding: 12px 30px;
        border-radius: 4px;
        background-color: green;
        color: white;
        border: none;
        margin: 10px 0;

        display: flex;
        align-items: center;
        cursor: pointer;
        animation: fadeInFromTop 1.5s ease-out;

        &:hover {
        background-color: #035503;
    }
  }

  a {
    text-decoration: none;
  }
`;


