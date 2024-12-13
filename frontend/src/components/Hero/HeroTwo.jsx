import styled from "styled-components"
import Herotwo from "../../assets/images/png/Hero2Image.png"
import { Link } from "react-router-dom"


const HeroTwo = () => {
  return (
    <Wrapper>
        <InnerWrap>
            <Herotwocontent>
                    <Imagedisc>
                        <Discountpri>
                            <p>70% <br/> OFF</p>
                        </Discountpri>
                         <img src= {Herotwo} alt="Herotwo" />
                    </Imagedisc>
                <Detailcont>
                    <p>WELCOME TO SHOPLY!</p>
                    <h3>Fresh & Healthy
                    Organic Food</h3>
                    <span>Free shipping on all your order. we deliver, you enjoy</span>

                    <Link><button>Shop Now!</button></Link>
                </Detailcont>

            </Herotwocontent>
        </InnerWrap>
    </Wrapper>
  )
}

export default HeroTwo

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px); /* Adjust based on your header height */
  max-height: 1000px; /* Max height for larger screens */
  min-height: 600px; /* Minimum height for smaller screens */
  
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const InnerWrap = styled.div`
      display: flex;
    align-items: center;
    justify-content: flex-end; 
    width: 85%;
    margin: 0 auto;
    max-width: 1200px;
`
const Herotwocontent = styled.div`
    /* border: 1px solid; */
    img {
        max-width: 50%;
    }
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    align-items: center;
    margin-top: 150px;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 30px;
    }
`
const Detailcont = styled.div`
    /* border: 1px solid red; */
    max-width: 40%;
    p {
        color: green;
        font-weight: 500;
    }
    h3 {
        font-size: 40px;
        line-height: 1.2;
        margin: 10px 0;
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
        

        &:hover {
        background-color: #035503;
    }
  }

  a {
    text-decoration: none;
  }

  
  @media (max-width: 768px) {
    
    text-align: center;
     max-width: 100%;
}
`;

const Imagedisc = styled.div`
  position: relative; 
  display: inline-block;

  img {
    display: block; 
    max-width: 80%;
  }
`;

const Discountpri = styled.div`
  position: absolute; 
  top: 10px; 
  right: 40px; 
  color: white;
  font-size: 20px;
  line-height: 1.1;
  font-weight: 600;
  height: 80px;
  width: 80px;
  background-color: #FF8A00;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 10px; 
`;
