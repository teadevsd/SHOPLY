import styled from 'styled-components'
import shoplylogo from "../../public/shoply.png";

// import './Footer.css'

const Footer = () =>{
    return(
<>
      
     <Wrapper>
        <Newscont>
              <ContentWrapper>
              <Subscribe>
                <h4>Subcribe to our Newsletter</h4>
                <p>Join Our Community: Fresh Deals and New Arrivals Straight to Your Inbox</p>
                </Subscribe>

                <Inputfield>
                    <input type="text" placeholder='Your email address'/> <button>Subscribe</button>
                </Inputfield>
              </ContentWrapper>
            </Newscont>
        <FooterCont>
         
          

          <FooterSection>
            <ul>
              <Logocont>
                <img src={shoplylogo} alt="shoplylogo" />
                <p>Shoply</p>
              </Logocont>
                  
              </ul>
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
                <li>Contact us</li>
                <li>About Us</li>
                <li>Faqs</li>
                <li>Terms & conditions</li>
                <li>Privacy policy</li>
              </ul>
          </FooterSection>
    
          <FooterSection>
            <strong>Proxy</strong>
              <ul>
                <li>Wallet</li>
                <li>Shop</li>
                <li>Terms of service</li>
                <li>Product</li>
                <li>Cookie policy</li>
                <li>Track order</li>
              </ul>
          </FooterSection>
      </FooterCont>
     <Hrline>
     <hr />
     <p>Shoply © 2024. All Rights Reserved</p>
     </Hrline>
    </Wrapper>

    </>
    )
  }
  
  export default Footer

  const Wrapper = styled.div`
    width: 100%;
    background-color:#1A1A1A;
    color: grey;
    /* text-align: center; */
    font-size: 12px;
    
  `
  const FooterCont = styled.div`
    max-width: 1280px;
    margin: 0px auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: rgb(255, 255, 255);
    padding: 30px 60px;
    /* margin-top: 80px; */

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  `
const Newscont = styled.div`
width: 100%;
background-color: #f7f7f7;
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
justify-content: space-evenly;

@media (max-width: 768px) {
  flex-direction: column;
  align-items: center;
}
`;

const Subscribe = styled.div`
flex: 1;
text-align: left;

h4 {
  font-size: 18px;
  color: #1a1a1a;
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
  border-radius: 4px 0 0 4px;
  outline: none;
  position: relative;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  background-color:#0c6b09;  
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: -70px;
  z-index: 1;
  
  ;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
}

@media (max-width: 768px) {
  justify-content: center;

  input {
    max-width: none;
    width: 70%;
  }

  button {
    flex: 0;
  }
}
`;


  const FooterSection = styled.div`
    /* flex: 1; */
    /* min-width: 100px; */
    margin: 10px;

    @media (max-width: 768px) {
      text-align: center;
    }

    h3{
      font-size: 28px;
      margin-bottom: 10px;
    }

    ul {
    list-style: none;
    }

    li {
    margin: 5px 0;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: grey;
    }
   }
  `
 const Logocont = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 28px;
    gap: 10px;

    p {
        font-size: 14px;
    }
    
    img{
        width: 30px;
    }
 `

 const Hrline = styled.div`
    text-align: center;

    p {
      padding: 10px 0;
    }
 `