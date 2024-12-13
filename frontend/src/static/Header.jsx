import styled from "styled-components";
import shoplylogo from "/shoply.png";
import { MdFavorite } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

const Header = () => {
  return (
    <Wrapper>
      <Headerwrap>
        <Logocont>
          <img src={shoplylogo} alt="shoplylogo" />
          <p>Shoply</p>
        </Logocont>

        <Inputfield>
          <div className="input-wrapper">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
          <button>Search</button>
        </Inputfield>

        <Faqfield>
          <MdFavorite className="favorite-icon" />
          <div className="divider"></div>
          <span>FAQs</span>
        </Faqfield>
      </Headerwrap>

      <Navbar>
        <InnerNav>
             
        <Navlist>
            <Link><p>Home </p> </Link>
            <Link><p>Order <TiArrowSortedDown/> </p> </Link>
            <Link><p>Cart <TiArrowSortedDown/> </p> </Link>
            <Link><p>Profile <TiArrowSortedDown/> </p> </Link>
            <Link><p>About Us </p> </Link>
            <Link><p>Contact Us</p> </Link>
        </Navlist>

        <LoginDet>
            <Link to= "/login"><button>Login</button></Link>
            <Link to= "/signup"><button className="signBtn">Sign up</button></Link>
        </LoginDet>   
        </InnerNav>

      </Navbar>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  position: fixed; 
  top: 0; 
  width: 100%; 
  z-index: 1000; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
`;

const Headerwrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  max-width: 1200px;
  padding: 0 20px;
  height: 70px;
`;

const Logocont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  img {
    width: 25px;
    height: 30px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Inputfield = styled.div`
  display: flex;
  align-items: center;

  .input-wrapper {
    position: relative;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    color: gray;
  }

  input {
    padding: 7px 30px 7px 30px;
    border-radius: 4px;
    outline: none;
    border: 1px solid grey;
    font-size: 14px;
  }

  button {
    background-color: green;
    color: white;
    padding: 8px 26px;
    border: none;
    font-size: 14px;
    margin-left: -15px; 
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: darkgreen;
  }
`;

const Faqfield = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .favorite-icon {
    font-size: 18px;
    color: green;
    cursor: pointer;
  }

  .divider {
    height: 20px;
    width: 1px;
    background-color: gray;
  }

  span {
    font-size: 14px;
    color: black;
    cursor: pointer;
  }
`;

const Navbar = styled.div`
  height: 41px;
  width: 100%;
  background-color: #333333;
  display: flex; 
  justify-content: center;
`;

const InnerNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto; 
  padding: 0 20px;
  height: 40px; 
`;

const Navlist = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    
    p {
        color: #bcbcbc;
        font-size: 10px;
        display: flex;
        align-items: center;
    }

    a {
        text-decoration: none;
    }
`
const LoginDet = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    

    button {
        padding: 6px 24px;
        border: none;
        cursor: pointer;
        font-size: 10px;

        
    }
    .signBtn {
        background-color: green;
        color: white;
        cursor: pointer;
    }
`
