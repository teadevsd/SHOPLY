import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./static/Header";
import Homepage from "./pages/Homepage";
import Signup from "./components/Signup-Login/Signup";
import Footer from "./static/Footer";

import Otpgen from "./components/Signup-Login/ResetPassword.jsx";
import Login from "./components/Signup-Login/Login";
import SetNewPassword from "./components/Signup-Login/SetNewPassword.jsx";
import Choosepage from "./pages/Choosepage.jsx";
import MerchantList from "./components/Merchant-Search.jsx/MerchantList.jsx";
import Searchpage from "./pages/Searchpage.jsx";
import toast, { Toaster } from 'react-hot-toast';

import VerifyEmailOTP from "./components/Signup-Login/Newpassword-Verify-OTP.jsx";

import CheckYourMail from "./components/Signup-Login/checkYourMail.jsx";
import OtpVerifcation from "./components/Signup-Login/OtpVerifcation.jsx";

import VerifyEmail from "./components/Signup-Login/Verified.jsx";
import VerificationSuccessful from "./components/Signup-Login/VerifiedSuccessfully.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email-forgot password" element={<VerifyEmailOTP />} />
        <Route path="/otp-verification" element={<Otpgen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-password" element={<SetNewPassword />} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/check-your-mail" element={<CheckYourMail/>}/>
        <Route path="/search" element={<Searchpage />} />
        <Route path="/select-merchant" element={<Choosepage />} />
        <Route path="/merchant-lists" element={<MerchantList />} />
        <Route path="/verification-otp" element={<OtpVerifcation />} />
        <Route path="/verification-successful" element={<VerificationSuccessful />} />





      </Routes>
      <Footer/>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
