import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./static/Header";
import Homepage from "./pages/Homepage";
import Signup from "./components/Signup-Login/Signup";
import Footer from "./static/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
       


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
