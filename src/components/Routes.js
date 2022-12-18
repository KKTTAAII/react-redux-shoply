import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./List";
import Product from "./Product";
import Cart from "./Cart";
import NavBar from "./NavBar";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<List />} />
        <Route exact path="/products/:productId" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
