import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Hero from "../components/Hero/Hero";
import HeroTwo from "../components/Hero/HeroTwo";
import HeroThree from "../components/Hero/HeroThree";
import HeroFour from "../components/Hero/HeroFour";

const Homepage = () => {
  const [currentHero, setCurrentHero] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextHero(); // Go to the next hero automatically
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Go to the next hero
  const nextHero = () => {
    setCurrentHero((prev) => (prev === 3 ? 0 : prev + 1));
  };

  // Go to the previous hero
  const prevHero = () => {
    setCurrentHero((prev) => (prev === 0 ? 3 : prev - 1));
  };

  return (
    <Slider>
      {/* Add navigation arrows */}
      <Arrow onClick={prevHero}>&lt;</Arrow>

      <Slide active={currentHero === 0}>
        <Hero />
      </Slide>
      <Slide active={currentHero === 1}>
        <HeroTwo />
      </Slide>
      <Slide active={currentHero === 2}>
        <HeroThree />
      </Slide>
      <Slide active={currentHero === 3}>
        <HeroFour />
      </Slide>

      <Arrow onClick={nextHero}>&gt;</Arrow>
    </Slider>
  );
};

export default Homepage;

// Keyframe animations
const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Styled components
const Slider = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 140px);
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${({ active }) => (active ? slideIn : slideOut)} 1s ease-in-out;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  user-select: none;
  height: 50px;
  width: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  /* border-radius: 50%; */
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:first-of-type {
    left: 0px;
  }

  &:last-of-type {
    right: 0px;
  }
`;
