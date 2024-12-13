import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./static/Header";
import Homepage from "./pages/Homepage";
import Signup from "./components/Signup-Login/Signup";
import Footer from "./static/Footer";
import Verify from "./components/Signup-Login/Verify-OTP.jsx";
import Otpgen from "./components/Signup-Login/ResetPassword.jsx";
import Login from "./components/Signup-Login/Login";
import SetNewPassword from "./components/Signup-Login/SetNewPassword.jsx";
import Choosepage from "./pages/Choosepage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/otp-verification" element={<Otpgen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-password" element={<SetNewPassword />} />


        <Route path="/select-merchant" element={<Choosepage />} />


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
