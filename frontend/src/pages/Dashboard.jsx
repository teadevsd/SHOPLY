import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const DashboardLayout = () => {
  const user = useSelector((state) => state?.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container>
      {/* Sidebar Toggle Button (Only visible on tablets & mobile) */}
      <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>☰</MenuButton>

      {/* Sidebar */}
      <Sidebar className={sidebarOpen ? "open" : ""}>
        <h2>My Account</h2>
        <p>{user?.firstName} {user?.lastName}</p>
        <Link to="/dashboard/sub-category">Sub Category</Link>
        <Link to="/dashboard/category">Category</Link>
        <Link to="/dashboard/upload-products">Upload Products</Link>
        <Link to="/dashboard/products">Products</Link>
        <Link to="/dashboard/orders">My Orders</Link>
        <Link to="/dashboard/address">Address</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <button className="text-red-500">Logout</button>
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
  display: grid;
  grid-template-columns: 25% 75%;
  gap: 1rem;
  padding: 1rem;
  max-width: 1280px;
  width: 85%;
  margin: 120px auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) { 
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
`;

/* Sidebar */
const Sidebar = styled.div`
  border-right: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1024px) { /* iPad & Mobile */
    position: fixed;
    left: -70%;
    top: 0;
    height: 100%;
    width: 70%;
    background: white;
    z-index: 1000;
    padding: 20px;
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(100%);
    }
  }

  p {
    border-bottom: 1px solid #ccc;
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

/* Menu Button (Only visible on iPad & Mobile) */
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
  margin-top: 120px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

/* Main Content */
const MainContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 1rem 10px;
  }
`;
