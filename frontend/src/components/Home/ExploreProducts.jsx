import React from 'react';
import styled from 'styled-components';
import jacket from '../../assets/images/svg/jacket.svg';
import gamingpad from '../../assets/images/svg/gamingpad.svg';
import boot from '../../assets/images/svg/boot.svg';
import kidelectriccar from '../../assets/images/svg/kidelectriccar.svg';
import curology from '../../assets/images/svg/curology.svg';
import gaminglaptop from '../../assets/images/svg/gaminglaptop.svg';
import camera from '../../assets/images/svg/camera.svg';
import breeddog from '../../assets/images/svg/breeddog.svg';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa"; // Wishlist Icon
import { FaShoppingCart } from "react-icons/fa"; // Add to Cart Icon

const ExploreProducts = () => {
  const products = [
    {
      image: jacket,
      text: "Breed Dry Dog Food",
      price: "$100",
      rating: 4,
    },
    {
      image: gamingpad,
      text: "Gaming Pad",
      price: "$50",
      rating: 3,
    },
    {
      image: boot,
      text: "Winter Boots",
      price: "$80",
      rating: 5,
    },
    {
      image: kidelectriccar,
      text: "Kid's Electric Car",
      price: "$200",
      rating: 4,
    },
    {
      image: curology,
      text: "Curology Cream",
      price: "$120",
      rating: 4,
    },
    {
      image: gaminglaptop,
      text: "Gaming Laptop",
      price: "$1200",
      rating: 5,
    },
    {
      image: camera,
      text: "Camera",
      price: "$500",
      rating: 4,
    },
    {
      image: breeddog,
      text: "Breed Dog Food",
      price: "$150",
      rating: 5,
    }
  ];

  return (
    <Wrapper>
      <Innerwrapper>
        <h2>Explore Our Products</h2>
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCardHover key={index}>
              <img src={product.image} alt={product.text} />
              <ProductInfo>
                <p>{product.text}</p>
                <Rating>
                  {[...Array(5)].map((_, idx) => (
                    <MdOutlineStarPurple500
                      key={idx}
                      style={{
                        color: idx < product.rating ? "#ffbb00" : "#ddd",
                        fontSize: "18px",
                      }}
                    />
                  ))}
                </Rating>
                <Price>{product.price}</Price>
                <Buttons>
                  <button className="wishlist">
                    <FaRegHeart />
                  </button>
                  <button className="add-to-cart">
                    <FaShoppingCart /> 
                  </button>
                </Buttons>
              </ProductInfo>
            </ProductCardHover>
          ))}
          
        </ProductsGrid>
        <button>View All Products</button>
      </Innerwrapper>
    </Wrapper>
  );
};

export default ExploreProducts;

const Wrapper = styled.div`
  width: 100%;
  background-color: #f9f9f9;
`;

const Innerwrapper = styled.div`
  width: 80%;
  margin: 120px auto;
  max-width: 1200px;
    text-align: center;
  h2 {
    font-size: 32px;
    margin: 30px 0;
    color: #333;
  }

  button {
    padding: 16px 20px;
    margin: 30px 0;
    cursor: pointer;
    background-color: green;
    color: #fff;
    border: none;
    border-radius: 8px;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  /* border: 1px solid; */
  position: absolute;
  /* bottom: 20px; */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  button {
    background-color: #008000;
    color: white;
    
    padding: 10px 18px;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease;
  }

  button.wishlist {
    background-color: transparent;
    /* border: 2px solid #ff4d4d; */
    color: #ff4d4d;
    
    padding: 16px;
    border-radius: 50%;
  }

  button.wishlist:hover {
    background-color: #ff4d4d;
    color: white;
  }

  button.add-to-cart {
    background-color: #008000;
    color: white;
  }

  button.add-to-cart:hover {
    background-color: #006400;
  }
`;

const ProductCard = styled.div`
  background-color: white;
  height: 300px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    max-width: 150px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProductCardHover = styled(ProductCard)`
  &:hover ${Buttons} {
    opacity: 1;
    visibility: visible;
  }
`;

const ProductInfo = styled.div`
  text-align: center;
  p {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`;

const Rating = styled.div`
  display: flex;
`;

const Price = styled.p`
  font-size: 20px;
  color: #333;
`;
