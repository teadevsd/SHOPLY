import styled from "styled-components";
import shoplylogo from "/shoply.png";
import { MdFavorite } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoReorderTwoOutline } from "react-icons/io5";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);


  useEffect(() => {
    const isSearch = location.pathname === '/search'
    setIsSearchPage(isSearch)
  },[location]);


  const redirectToSearchPage = () => {
    navigate('/search');
  };

  console.log('search', isSearchPage);

  return (
    <>
    <Wrapper>
      <Headerwrap>

        <Link to= "/">
          <Logocont>
            <img src={shoplylogo} alt="shoplylogo" />
            <p>Shoply</p>
          </Logocont>
        </Link>
        
       <SearchInput>
          <div>
            {
              !isSearchPage ? (
                <Inputfield onClick={redirectToSearchPage}>
                <div className="input-wrapper">
                  <FiSearch className="search-icon" />
                  {/* <input type="text" placeholder="Search" /> */}
    

                    <div className="animation-div">
                      <TypeAnimation
                        sequence={[
                          // Same substring at the start will only be typed once, initially
                          'Search "Milk"',
                          1000,
                          'Search "Electronics"',
                          1000,
                          'Search "Phones"',
                          1000,
                          'Search "Kitchen utensils"',
                          1000,
                        ]}
                        speed={50}
                        style={{ fontSize: '12px' }}
                        repeat={Infinity}
                      />
                    </div>
                    
                </div>
    
                  <button>Search</button>
    
              </Inputfield>
              ) : (
                <div className="searchInputfield">
                    <SearchInputfield>
                      <FiSearch/>
                      <input type="text" placeholder="Search for items" />
                      <button>Search</button>
                    </SearchInputfield>
                </div>

              )
            }
          </div>
       </SearchInput>

        <Faqfield>
          <MdFavorite className="favorite-icon" />
          <div className="divider"></div>
          <span>FAQs</span>
        </Faqfield>

        <Sidenav onClick={handleToggle}>
            <IoReorderTwoOutline />
          </Sidenav>

      </Headerwrap>

      <Navbar>
        <InnerNav>
          <Navlist>
              <Link to= "/" ><p>Home </p> </Link>
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
    {toggle && <Sidebar setDisplay={setToggle} />}
    </>
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

  a {
    text-decoration: none;
    color: green;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
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

  @media (max-width: 768px) {
    p {
      display: none;
    }
  }
`;

const Inputfield = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 500px; /* Set a max width */
  min-width: 300px; /* Prevent collapsing */
  border: 1px solid #ccc;
  border-radius: 4px;

  .input-wrapper {
    display: flex;
    align-items: center;
    flex: 1; /* Ensures it expands properly */
    padding-left: 30px;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    font-size: 16px;
    color: gray;
  }

  .animation-div {
    flex: 1; /* Takes up available space */
    font-size: 12px;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    background-color: green;
    color: white;
    padding: 8px 16px;
    border: none;
    font-size: 12px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
    flex-shrink: 0; /* Prevents the button from shrinking */
  }

  button:hover {
    background-color: darkgreen;
  }

  @media (max-width: 768px) {
    min-width: 250px;
    
  }

  button {
    padding: 8px 12px;
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

  @media (max-width: 768px) {
    display: none;
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
  
  @media (max-width: 768px) {
    justify-content: center;
  }
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

    @media (max-width: 768px) {
      display: none;
    }
`;

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
`;

const SearchInputfield = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  min-width: 300px; /* Set a max width */
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden; /* Ensures content stays inside the border */

  input {
    flex: 1; /* Allows input to take full width */
    border: none;
    outline: none;
    font-size: 12px;
    padding: 8px;
  }

  input::placeholder {
    color: #aaa;
  }

  button {
    background-color: green;
    color: white;
    padding: 10px 16px;
    border: none;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0; /* Prevents the button from shrinking */
  }

  button:hover {
    background-color: darkgreen;
  }

  svg {
    margin-left: 10px;
    color: #ccc;
  }

`;

const SearchInput = styled.div``;
const Sidenav = styled.div`
  font-size: 40px;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;


