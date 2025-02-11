import React, { useState, useEffect } from "react";
import styled from "styled-components";
import salesOfthemonth from "../../assets/images/png/salesOfthemonth.png";
import meatbox from "../../assets/images/png/meatbox.png";
import applebg from "../../assets/images/png/applebg.png";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const HomeAds = () => {
  // Initial state set to 120 hours from now
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Effect hook to update the time every second
  useEffect(() => {
    const targetTime = new Date().getTime() + 120 * 60 * 60 * 1000; // 120 hours from now

    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(targetTime);
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const calculateTimeLeft = (targetTime) => {
    const now = new Date().getTime(); // Current timestamp
    const difference = targetTime - now;

    if (difference > 0) {
      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return { days: "00", hours: "00", minutes: "00", seconds: "00" }; // Countdown expired
  };

  return (
    <Wrapper>
      <Innerwrap>

        <AdOne>
          <p className="best-deals">BEST DEALS</p>
          <p className="sales-month">Sales of the Month</p>
          <img src={salesOfthemonth} alt="sales of the month" />

          <CountdownWrapper>
            <Countdown>

              <TimeBox>
                <span>{timeLeft.days}</span>
                <small>DAYS</small>
              </TimeBox>

              <TimeBox>
                <span>{timeLeft.hours}</span>
                <small>HOURS</small>
              </TimeBox>

              <TimeBox>
                <span>{timeLeft.minutes}</span>
                <small>MINUTES</small>
              </TimeBox>

              <TimeBox>
                <span>{timeLeft.seconds}</span>
                <small>SECONDS</small>
              </TimeBox>

            </Countdown>
          </CountdownWrapper>

          <Link>
            <button>
              Shop now <FaArrowRightLong />
            </button>
          </Link>

        </AdOne>

        <AdTwo>
          <p className="fatfree">85% FAT FREE</p>
          <p className="lowfat">Low-Fat Meat</p>
          
          
          <img src={meatbox} alt="meatbox" />
          {/* <p className="started">Started at #1,000</p> */}
          <Link>
            <button>
              Shop now <FaArrowRightLong />
            </button>
          </Link>

        </AdTwo>

        <AdThree>
          <p className="fatfree">SUMMER SALE</p>
          <p className="lowfat">100% Fresh Fruit</p>
          {/* <p className="started">Started at #1,000</p> */}
          
          <img src={applebg} alt="apple background" />

          <Link>
            <button>
              Shop now <FaArrowRightLong />
            </button>
          </Link>
        </AdThree>

      </Innerwrap>
    </Wrapper>
  );
};

export default HomeAds;

const Wrapper = styled.div`
  width: 100%;
`;

const Innerwrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin: 150px auto;
  max-width: 1200px;
`;

const AdOne = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32%;
  margin-bottom: 30px;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
  }

  .best-deals,
  .sales-month {
    position: absolute;
    top: 5%;
    text-align: center;
    z-index: 10;
    color: white;
    font-size: 12px;
  }

  .sales-month {
    top: 10%;
    font-size: 16px;
  }

  

  button {
    position: absolute;
    bottom: 50%;
    z-index: 20;
    background: #fff;
    color: green;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: -50px;
  }
`;

const CountdownWrapper = styled.div`
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  z-index: 15;
  text-align: center;
  color: white;
  font-size: 20px;
`;

const Countdown = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 40px;
  }

  small {
    font-size: 10px;
    color: #ddd;
  }
`;

const AdTwo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32%;
  margin-bottom: 30px;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
  }

  .fatfree,
  .lowfat {
    position: absolute;
    top: 5%;
    text-align: center;
    z-index: 10;
    color: white;
    font-size: 12px;
  }

  .lowfat {
    top: 10%;
    font-size: 26px;
  }

  .started {
    top: 20%;
  }

  button {
    position: absolute;
    bottom: 50%;
    z-index: 20;
    background: #fff;
    color: green;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: -50px;
  }
`;

const AdThree = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32%;
  margin-bottom: 30px;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
  }

  .fatfree,
  .lowfat {
    position: absolute;
    top: 5%;
    text-align: center;
    z-index: 10;
    color: black;
    font-size: 12px;
  }

  .lowfat {
    top: 10%;
    font-size: 26px;
    color: black;
  }

  button {
    position: absolute;
    bottom: 50%;
    z-index: 20;
    background: #fff;
    color: green;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: -50px;
  }
`;
