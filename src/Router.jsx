import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout.jsx";
import Category from "./pages/Category/Category.jsx";
import Login from "./pages/Login/Login.jsx";
import Model_details from "./pages/ModelDetails/Model_details";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin.jsx";
import CategoryCar from "./pages/Categorycar/CategoryCar.jsx";
import Users from "./components/Users/Users.jsx";
import Models from "./components/Models/Models";
import Cars from "./components/Cars/Cars.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Register from "./pages/Register/Register.jsx";

const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Category />} />
      <Route path="/model/:id" element={<CategoryCar />} />
      <Route path="/car/:id" element={<Model_details />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="users" element={<Users />} />
        <Route index path="models" element={<Models />} />
        <Route path="cars" element={<Cars />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
export default rout;
