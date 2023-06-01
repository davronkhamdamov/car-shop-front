import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./layout.css";

const RootLayout = () => {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <div className="hr" />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
