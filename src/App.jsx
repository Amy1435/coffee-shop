import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import AboutPage from "./components/AboutPage";
import Contacts from "./components/Contacts";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LogInSignUp from "./components/LogInSignUp";
import NotFound from "./components/NotFound";
import { useEffect, useContext } from "react";
import { useUser } from "./components/user-context/context";
import { useNavigate, useLocation } from "react-router-dom";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import ShopCheckOut from "./components/ShopCheckout";
import CheckOutSuccess from "./components/CheckoutSuccess";

const { VITE_URL_BACK_END } = import.meta.env;

function App() {
  const { user, token } = useUser();
  const location = useLocation();
  const { login } = useUser();
  const navigate = useNavigate();

  //console.log(user);

  return (
    // <div className="h-screen">
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login-signup" element={user ? <HomePage /> : <LogInSignUp />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ShopCheckOut />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
