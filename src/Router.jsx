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

const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Category />} />
      <Route path="/cars/:id" element={<Model_details />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
export default rout;