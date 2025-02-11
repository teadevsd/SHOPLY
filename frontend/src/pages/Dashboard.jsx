import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const DashboardLayout = () => {
    const user = useSelector((state) => state?.user)
  return (
    <Container>
      <Sidebar>
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

      <MainContent>
        <Outlet /> 
      </MainContent>
    </Container>
  );
};

export default DashboardLayout;

const Container = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  gap: 1rem;
  padding: 1rem;
  max-width: 1280px;
  width: 85%;
  margin: 120px auto;
`;

const Sidebar = styled.div`
  border-right: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    border-bottom: 1px solid #ccc;
  }

  h2 {
    font-size: 24px;
    /* margin-bottom: 10px; */
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 14px;
    padding: 10px;
    display: block; /* Ensures stable size */
    text-align: left; /* Centers text */
    transition: background-color 0.3s ease; /* Smooth transition */

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
    text-align: center;

    &:hover {
      background-color: #045104;
    }
  }
`;


const MainContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
