import styled from 'styled-components';
import milkposter from "../../assets/images/png/milkposter.png";
import softdrink from "../../assets/images/png/softdrinkposter.png";
import breakfast from "../../assets/images/png/breakfast.png";
import { Link } from 'react-router-dom';

const Advert = () => {
  return (
    <Wrapper>
        <Innerwrapper>
            <Posters>
                <Link><img src= {milkposter} alt="milk poster" /></Link>
                <Link><img src= {softdrink} alt="soft drink" /></Link>
                <Link><img src= {breakfast} alt="breakfast" /></Link>
                
            </Posters>
        </Innerwrapper>
    </Wrapper>
  )
}

export default Advert

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: auto;
    background: #fff;
    padding: 50px 0;
`
const Innerwrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    max-width: 1280px;
    text-align: center;
    
`
const Posters = styled.div`
    padding: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* flex-wrap: wrap; */

    img {
        width: 90%;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`