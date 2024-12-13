import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hero from "../components/Hero/Hero";
import HeroTwo from "../components/Hero/HeroTwo";
import HeroThree from "../components/Hero/HeroThree";
import HeroFour from "../components/Hero/HeroFour";

const Homepage = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [prevHero, setPrevHero] = useState(null);

  // Auto-scroll every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextHero(); // Go to the next hero automatically
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Go to the next hero
  const nextHero = () => {
    setPrevHero(currentHero); // Track the previous hero
    setCurrentHero((prev) => (prev === 3 ? 0 : prev + 1));
  };

  // Go to the previous hero
  const prevHeroSlide = () => {
    setPrevHero(currentHero); // Track the current hero before switching
    setCurrentHero((prev) => (prev === 0 ? 3 : prev - 1));
  };

  return (
    <Slider>
      {/* Navigation arrows */}
      <Arrow onClick={prevHeroSlide}>&lt;</Arrow>

      {/* Slides */}
      {[Hero, HeroTwo, HeroThree, HeroFour].map((Component, index) => (
        <Slide
          key={index}
          active={currentHero === index}
          prevActive={prevHero === index}
        >
          <Component />
        </Slide>
      ))}

      <Arrow onClick={nextHero}>&gt;</Arrow>
    </Slider>

    
  );
};

export default Homepage;

// Styled components
const Slider = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 140px);
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-top: 100px;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ active, prevActive }) => (active || prevActive ? 1 : 0)};
  z-index: ${({ active, prevActive }) => (active ? 10 : prevActive ? 5 : 0)};
  transform: ${({ active, prevActive }) =>
    active
      ? "translateX(0)" // Current hero is centered
      : prevActive
      ? "translateX(-100%)" // Previous hero slides left briefly
      : "translateX(100%)"}; // Next hero is off-screen
  transition: all 1s ease-in-out;
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
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;
