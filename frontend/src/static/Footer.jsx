import styled from 'styled-components';
import shoplylogo from "/shoply.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <Wrapper>
                <Newscont>
                    <ContentWrapper>
                        <Subscribe>
                            <h4>Subscribe to our Newsletter</h4>
                            <p>Join Our Community: Fresh Deals and New Arrivals Straight to Your Inbox</p>
                        </Subscribe>
                        <Inputfield>
                            <input type="text" placeholder='Your email address' />
                            <button>Subscribe</button>
                        </Inputfield>
                    </ContentWrapper>
                </Newscont>
                <FooterCont>
                    <FooterSection>
                        <Logocont>
                            <img src={shoplylogo} alt="shoplylogo" />
                            <p>Shoply</p>
                        </Logocont>
                        <p>Your one-stop shop for all your needs. Quality products at great prices!</p>
                        <SocialIcons>
                            <FaFacebook />
                            <FaTwitter />
                            <FaInstagram />
                        </SocialIcons>
                    </FooterSection>
                    <FooterSection>
                        <strong>My Account</strong>
                        <ul>
                            <li>Dashboard</li>
                            <li>Order History</li>
                        </ul>
                    </FooterSection>
                    <FooterSection>
                        <strong>Help</strong>
                        <ul>
                            <li>Contact Us</li>
                            <li>About Us</li>
                            <li>FAQs</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </FooterSection>
                    <FooterSection>
                        <strong>Quick Links</strong>
                        <ul>
                            <li>Wallet</li>
                            <li>Shop</li>
                            <li>Cookie Policy</li>
                            <li>Track Order</li>
                        </ul>
                    </FooterSection>
                </FooterCont>
                <Hrline>
                    <hr />
                    <p>Shoply © 2024. All Rights Reserved</p>
                </Hrline>
            </Wrapper>
        </>
    );
};

export default Footer;

const Wrapper = styled.div`
    width: 100%;
    background-color: #0c0c0c;
    color: #b5b5b5;
`;

const Newscont = styled.div`
    width: 100%;
    background-color: #1a1a1a;
    display: flex;
    justify-content: center;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 20px 10px;
    }
`;

const ContentWrapper = styled.div`
    max-width: 1280px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Subscribe = styled.div`
    flex: 1;

    h4 {
        font-size: 18px;
        color: white;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        color: grey;
        margin: 0;
    }

    @media (max-width: 768px) {
        text-align: center;
        margin-bottom: 20px;
    }
`;

const Inputfield = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    input {
        flex: 1;
        max-width: 400px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px 0 0 5px;
        outline: none;
    }

    button {
        padding: 10px 20px;
        font-size: 14px;
        background-color: #0c6b09;
        color: white;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;

        &:hover {
            background-color: #1c8c1c;
        }
    }

    @media (max-width: 768px) {
        justify-content: center;

        input {
            max-width: none;
            width: 70%;
        }
    }
`;

const FooterCont = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: white;
    padding: 40px 60px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FooterSection = styled.div`
    flex: 1;
    min-width: 200px;
    margin: 20px;

    strong {
        font-size: 16px;
        margin-bottom: 10px;
        display: block;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            color: #0c6b09;
        }
    }

    p {
        font-size: 12px;
        margin: 10px 0;
        color: grey;
    }

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const Logocont = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;

    img {
        width: 30px;
    }

    p {
        font-size: 16px;
    }
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 10px;

    svg {
        font-size: 20px;
        color: grey;
        cursor: pointer;

        &:hover {
            color: white;
        }
    }
`;

const Hrline = styled.div`
    text-align: center;
    padding: 20px 0;

    p {
        margin: 10px 0;
        font-size: 12px;
        color: grey;
    }
`;
