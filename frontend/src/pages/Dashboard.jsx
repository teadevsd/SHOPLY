import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosToastError from "../utilitis/AxiosToastError";
import Axios from "../utilitis/Axios";
import SummaryAPI from "../common/SummaryAPI";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";

const DashboardLayout = () => {
  const user = useSelector((state) => state?.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const response = await Axios({ ...SummaryAPI.logout });

      if (response.data.success) {
        toast.success("Logout Successfully");
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error(response.data.message || "Error while logging out");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <Container>
      {/* Sidebar Toggle Button */}
      <MenuButton onClick={() => setSidebarOpen(true)}>☰</MenuButton>

      {/* Blurred Background Overlay */}
      {sidebarOpen && <Backdrop onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <Sidebar className={sidebarOpen ? "open" : ""}>
        <CloseButton onClick={() => setSidebarOpen(false)}>✖</CloseButton>
        <h2>My Account</h2>
        <p>{user?.firstName} {user?.lastName} ({user?.role})</p> 

        <Link to="/dashboard/sub-category">Sub Category</Link>
        <Link to="/dashboard/category">Category</Link>
        <Link to="/dashboard/upload-products">Upload Products</Link>
        <Link to="/dashboard/products">Products</Link>
        <Link to="/dashboard/orders">My Orders</Link>
        <Link to="/dashboard/address">Address</Link>
        <Link to="/dashboard/settings">Profile</Link>

        <button onClick={handleLogOut}>Logout</button>
      </Sidebar>

      {/* Main Content */}
      <MainContent onClick={() => setSidebarOpen(false)}>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default DashboardLayout;

/* Dashboard Container */
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1280px;
  width: 85%;
  margin: 0 auto;
  padding: 110px 0;
`;

/* Sidebar */
const Sidebar = styled.div`
  width: 25%;
  min-width: 250px;
  max-width: 300px;
  border-right: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease-in-out;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%); /* Sidebar hidden by default */
  z-index: 1100;
  padding: 20px;

  &.open {
    transform: translateX(0); /* Sidebar slides in when open */
  }

  @media (max-width: 1024px) { 
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  p {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 24px;
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 14px;
    padding: 10px;
    display: block;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: lightgreen;
    }
  }

  button {
    padding: 12px 18px;
    background-color: green;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #045104;
    }
  }
`;


/* Close Button */
const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: darkred;

  &:hover {
    color: red;
  }
`;

/* Blurred Background when Sidebar Opens */
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;
`;

/* Menu Button */
const MenuButton = styled.button`
  display: none;
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1100;
  margin-top: 60px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

/* Main Content */
const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background: #f8f8f8;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;
