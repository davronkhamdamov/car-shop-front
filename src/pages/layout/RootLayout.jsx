import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./layout.css";
import { useDispatch } from "react-redux";
import { newItemAction } from "../../redux/reduser";
const RootLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== "/login") {
      fetch(process.env.REACT_APP_BASE_URL + "/auth/getuser", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(newItemAction(data));
        });
    }
  }, []);
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
