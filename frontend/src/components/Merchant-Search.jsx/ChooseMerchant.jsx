import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { BiQrScan } from "react-icons/bi";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { Link } from "react-router-dom";

const ChooseMerchant = () => {
  return (
    <Wrapper>
      <Innerwrapper>
        <h2>Choose Merchants</h2>

        <Choosecard>

          <Link>
            <Search>
                <Iconstyle as={CiSearch} />

                <SearchDetails>
                <strong>Search</strong>
                <p>For Merchant Business Name</p>
                </SearchDetails>
            </Search>
          </Link>

          <Link>
                <Search>
                    <Iconstyle as={BiQrScan} />

                    <SearchDetails>
                    <strong>Scan QR Code</strong>
                    <p>Instant access to Merchant’s space</p>
                    </SearchDetails>
                </Search>
          </Link>

        <Link>
                <Search>
                    <Iconstyle as={MdOutlinePersonalInjury} />

                    <SearchDetails>
                    <strong>Previous Merchants</strong>
                    <p>Choose from list of previous merchants.</p>
                    </SearchDetails>
                </Search>
        </Link>

        </Choosecard>
      </Innerwrapper>
    </Wrapper>
  );
};

export default ChooseMerchant;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: calc(100vh - 100px); */
  background: #edf2ee;
  padding: 100px 0;
`;

const Innerwrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 1280px;
  text-align: center;

  h2 {
    margin: 70px 0;
  }
`;

const Choosecard = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  justify-content: space-around;
  align-items: center;
  margin-top: 80px;

  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Search = styled.div`
  display: flex;
  gap: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
color: black;
  strong {
    /* color: black; */

    &:hover {
        background-color: green;
    color: white;
    }
  }

  &:hover {
    background-color: green;
    color: white;

    p {
      color: white;
    }
  }
`;

const SearchDetails = styled.div`
  text-align: left;

  p {
    color: grey;
    font-size: 14px;
    margin-top: 2px;
  }
`;

const Iconstyle = styled.p`
  color: #00b207;
  font-size: 30px;

  &:hover {
    color: white;
  }
`;
