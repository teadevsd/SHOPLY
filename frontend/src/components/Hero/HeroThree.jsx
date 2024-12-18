import styled from "styled-components"
import womenimage from "../../assets/images/png/attractive.png"

const HeroThree = () => {
  return (
    <Wrapper>
        <Innerwrapper>
            <Herotthreecontent>

                <Contents>
                    <p>Women’s Collections</p>
                    <span>Featured woman collections that give you another vibe.</span>
                    <strong>Shop Now</strong>
                </Contents>

                <img src= {womenimage} alt="" />
            </Herotthreecontent>
        </Innerwrapper>
    </Wrapper>
  )
}

export default HeroThree

const Wrapper = styled.div`
    width: 100%;
    height: 600px; 
    background-color: #0d0d0d;
    display: flex;
    align-items: center;
`
const Innerwrapper = styled.div`
    /* border: 1px solid white; */
    width: 85%;
    margin: 0 auto;
    max-width: 1200px;
    
`
const Herotthreecontent = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: space-between; 
    margin-top: 30px;
    display: flex;

    img {
        max-width: 700px;
    }
`
const Contents = styled.div`
    
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    color: white;

    strong {
        text-decoration: solid;
        color: grey;
        cursor: pointer;
    }

    p {
        font-size: 30px;
    }
`


