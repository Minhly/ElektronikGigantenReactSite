import React, { useState, useContext } from "react";
import { Home } from "./components/Layout/Home";
import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";
import Login from "./components/Login/Login";
import "./custom.css";
import AuthContext from "./Store/LoginAuthContext";
import Admin from "./components/Admin/Admin";
import {Routes, Route} from "react-router-dom";


const App = () => {
  const [cartIsShown, SetCartIsShown] = useState(false);
  const ctx = useContext(AuthContext);

  const showCartHandler = () => {
    SetCartIsShown(true);
    console.log(ctx.isLoggedIn);
  };

  const getStoredEmail = localStorage.getItem("mail");
  console.log(getStoredEmail);

  const hideCartHandler = () => {
    SetCartIsShown(false);
  };
  return (
    <React.Fragment>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Admin" element={<Admin/>}/>
        </Routes>
        {!ctx.isLoggedIn && "Not Logged in!"}
        {ctx.isLoggedIn && "Welcome " + getStoredEmail}
      </CartProvider>
    </React.Fragment>
  );
};

export default App;
