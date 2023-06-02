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

const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Category />} />
      <Route path="/:id" element={<CategoryCar />} />
      <Route path="/:id/:id" element={<Model_details />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
  )
);
export default rout;
