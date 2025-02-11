import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRightToBracket } from "react-icons/fa6";

// Importing assets
import baking from '../../assets/images/svg/baking.svg';
import beauty from '../../assets/images/svg/beauty.svg';
import beaverages from '../../assets/images/svg/beaverages.svg';
import blender from '../../assets/images/svg/blender.svg';
import bread from '../../assets/images/svg/bread.svg';
import dish from '../../assets/images/svg/dish.svg';
import gamepad from '../../assets/images/svg/gamepad.svg';
import ladiesheels from '../../assets/images/svg/ladiesheels.svg';
import laptop from '../../assets/images/svg/laptop.svg';
import meat from '../../assets/images/svg/meat.svg';
import oil from '../../assets/images/svg/oil.svg';
import phones from '../../assets/images/svg/phones.svg';

// Reusable CategoryCard Component
const CategoryCard = ({ image, text }) => (
  <Box>
    <img src={image} alt={text} />
    <p>{text}</p>
  </Box>
);

const Popular = () => {
  const popularList = [
    { image: ladiesheels, text: "Ladies Heels" },
    { image: laptop, text: "Laptop" },
    { image: meat, text: "Meat & Pie" },
    { image: gamepad, text: "Gaming" },
    { image: baking, text: "Baking" },
    { image: beauty, text: "Beauty" },
    { image: beaverages, text: "Beaverages" },
    { image: bread, text: "Bread" },
    { image: oil, text: "Oil" },
    { image: phones, text: "Phones" },
    { image: blender, text: "Blender" },
    { image: dish, text: "Dish" },
  ];

  return (
    <Wrapper>
      <Innerwrapper>
        <Headerlink>
          <h3>Popular Categories</h3>
          <Link>
            <button>View All <FaArrowRightToBracket /></button>
          </Link>
        </Headerlink>

        <PopularList>
          {popularList.map((item, index) => (
            <CategoryCard key={index} image={item.image} text={item.text} />
          ))}
        </PopularList>
      </Innerwrapper>
    </Wrapper>
  );
};

export default Popular;

// Styled Components
const Wrapper = styled.div`
  width: 100%;
`;

const Innerwrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 58%;
  margin: 50px auto;
  max-width: 1200px;
`;

const Headerlink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;

  a {
    text-decoration: none;
  }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #ff7a00;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PopularList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Six items per row */
  gap: 50px; /* Space between items */
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* Three items per row for smaller screens */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr); /* Two items per row for very small screens */
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 120px;
  padding: 16px;
  background: #f7f7f7;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
    border: 1px solid orange;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  p {
    margin-top: 8px;
    font-size: 14px;
    color: #333;
  }
`;
