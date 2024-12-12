import styled from "styled-components"
import hero4image from "../../assets/images/png/hero4Image.png"
import { Link } from "react-router-dom"

const HeroFour = () => {
  return (
    <Wrapper>
        <Innerwrapper>

            <Wrapcontent>
                <strong>Bobolax</strong>
                <article>Nutri 7-In-1 <p>Base
                On Formula 400g</p>
                </article>
                <span>Trusted Baby-food product</span>

                <Link><button>Shop Now!</button></Link>
            </Wrapcontent>
            
            <img src= {hero4image} alt="hero4image" />

        </Innerwrapper>
    </Wrapper>
  )
}

export default HeroFour

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 140px); 
    background-color: #F0E7D9;
    display: flex;
`
const Innerwrapper = styled.div`
    width: 85%;
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;

    img {
        max-width: 400px;
        max-height: 300px;

    }
`
const Wrapcontent = styled.div`
    article {
        font-size: 30px;
        line-height: 1.1;
        font-weight: 500;
    }

    span {
        font-size: 12px;
    }

    button {
        padding: 12px 30px;
        border-radius: 4px;
        background-color: #01A49E;
        color: white;
        border: none;
        margin: 10px 0;

        display: flex;
        align-items: center;
        cursor: pointer;
        

        &:hover {
        background-color: #033c55;
    }
  }

  a {
    text-decoration: none;
  }
`