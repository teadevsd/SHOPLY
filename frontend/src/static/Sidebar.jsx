import styled from "styled-components";
import { IoMdArrowDropright, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ setDisplay }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open

  const handleClick = () => {
    setDisplay(false);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <Container>
      <Naviga>
        <Styledlink to="/" onClick={handleClick}>
          <nav>Home</nav>
        </Styledlink>

        {/* Dropdown for Dashboard */}
        {/* <Dropdown>
          <DropdownToggle onClick={() => toggleDropdown("dashboard")}>
            <nav>
              Dashboard
              {openDropdown === "dashboard" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </nav>
          </DropdownToggle>
          {openDropdown === "dashboard" && (
            <DropdownMenu>
              <Styledlink to="/profile" onClick={handleClick}>
                <DropdownItem>
                  <IoMdArrowDropright /> Profile
                </DropdownItem>
              </Styledlink>
              <Styledlink to="/payment-history" onClick={handleClick}>
                <DropdownItem>
                  <IoMdArrowDropright /> Payment History
                </DropdownItem>
              </Styledlink>
              <Styledlink to="/qr-management" onClick={handleClick}>
                <DropdownItem>
                  <IoMdArrowDropright /> QR Code Management
                </DropdownItem>
              </Styledlink>
              <Styledlink to="/notifications" onClick={handleClick}>
                <DropdownItem>
                  <IoMdArrowDropright /> Notifications
                </DropdownItem>
              </Styledlink>
              <Styledlink to="/account-settings" onClick={handleClick}>
                <DropdownItem>
                  <IoMdArrowDropright /> Account Settings
                </DropdownItem>
              </Styledlink>
            </DropdownMenu>
          )}
        </Dropdown> */}

        <Styledlink to="/wallet" onClick={handleClick}>
          <nav>Order</nav>
        </Styledlink>
        <Styledlink to="/about" onClick={handleClick}>
          <nav>Cart</nav>
        </Styledlink>
        <Styledlink to="/contact" onClick={handleClick}>
          <nav>Profile</nav>
        </Styledlink>
        <Styledlink to="/contact" onClick={handleClick}>
          <nav>About Us</nav>
        </Styledlink>
        <Styledlink to="/contact" onClick={handleClick}>
          <nav>Contact Us</nav>
        </Styledlink>
      </Naviga>

      <Loginbutton>
        <Button>
          <button>
            <Link to="/login" onClick={handleClick}>
              Login
            </Link>
          </button>
        </Button>
        <Sighin>
          <button>
            <Link to="/signup" onClick={handleClick}>
              Sign Up
            </Link>
          </button>
        </Sighin>
      </Loginbutton>
      
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding-left: 20px;
  background-color: #edeff2;
  margin-top: 70px;
`;

const Naviga = styled.div``;

const Styledlink = styled(Link)`
  text-decoration: none;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-bottom: 1px solid lightgrey;
    font-size: 14px;
    font-weight: 500;
    padding: 20px 0;
    color: #30506b;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownToggle = styled.div`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid lightgrey;
    font-size: 14px;
    font-weight: 500;
    padding: 20px 0;
    color: #30506b;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  font-size: 14px;
  color: #30506b;
  cursor: pointer;

  &:hover {
    color: #fa8232;
  }
`;

const Loginbutton = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`;

const Button = styled.div`
  button {
    background-color: transparent;
    padding: 8px 24px;
    border-radius: 4px;
    border: 1px solid #fa8232;
    color: black;
    cursor: pointer;

    &:hover {
      background-color: #bfc0c0;
      color: white;
      border: none;
    }

    a {
      text-decoration: none;
      color: black;
    }
  }
`;

const Sighin = styled.div`
  button {
    padding: 8px 24px;
    border-radius: 4px;
    background-color: #fa8232;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #c96d05;
    }

    a {
      text-decoration: none;
      color: white;
    }
  }
`;
