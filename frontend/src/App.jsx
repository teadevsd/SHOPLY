import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./static/Header";
import Homepage from "./pages/Homepage";
import Signup from "./components/Signup-Login/Signup";
import Footer from "./static/Footer";
import Otpgen from "./components/Signup-Login/OtpVerifcation.jsx";
import Login from "./components/Signup-Login/Login";
import SetNewPassword from "./components/Signup-Login/SetNewPassword.jsx";
import Choosepage from "./pages/Choosepage.jsx";
import MerchantList from "./components/Merchant-Search.jsx/MerchantList.jsx";
import Searchpage from "./pages/Searchpage.jsx";
import toast, { Toaster } from 'react-hot-toast';
import VerifyEmailOTP from "./components/Signup-Login/Newpassword-Verify-OTP.jsx";
import CheckYourMail from "./components/Signup-Login/checkYourMail.jsx";
import OtpVerifcation from "./components/Signup-Login/OtpVerifcation.jsx";
import VerificationSuccessful from "./components/Signup-Login/VerifiedSuccessfully.jsx";
import VerifyEmail from "./components/Signup-Login/Verified.jsx";
import { AppProvider } from "./common/AuthContext.jsx";
import fetchUserDetails from "./utilitis/fetchUserDetails.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice.js";
import Popular from "./components/Home/Popular.jsx";
import HomeAds from "./components/Home/HomeAds.jsx";
import ExploreProducts from "./components/Home/ExploreProducts.jsx";

import Category from "./pages/Category.jsx";
import SubCategory from "./pages/SubCategory.jsx";
import UploadProducts from "./components/Categories/UploadProducts.jsx";
import ProductAdmin from "./pages/ProductAdmin.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Account from "./pages/Settings.jsx";
import DashboardLayout from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";


function App() {

  const dispatch = useDispatch(); 
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    // console.log("userData", userData.data)
    dispatch(setUserDetails(userData.data));
  }

  useEffect(() =>{
    fetchUser()
  },[])

  return (
    <AppProvider>
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
        <Route path="/popular-product" element={<Popular />} />
        <Route path="/product-ads" element={<HomeAds />} />
        <Route path="/explore-products" element={<ExploreProducts />} />

        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="settings" element={<Settings />} />
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="upload-products" element={<UploadProducts />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="orders" element={<MyOrder />} />
        </Route>









      </Routes>
      <Footer/>
      <Toaster/>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
