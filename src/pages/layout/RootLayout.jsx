import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./layout.css";
import { useDispatch } from "react-redux";
import { Posts } from "../../redux/reduser";
import { ModelsActions } from "../../redux/reduser.Models";
import { CarActions } from "../../redux/reduser.Cars";
import { UserActions } from "../../redux/reduser.Users";
import { CartActions } from "../../redux/reduser.Cart";

const RootLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const paths = [
      "/car/all",
      "/auth/getuser",
      "/model/all",
      "/users/getallusers",
      "/cart/all",
    ];
    if (
      (location.pathname !== "/login" &&
        paths.some((e) => e.includes(location.pathname))) ||
      ["/model", "/car", "/profile", "/cart", "/admin"].find((e) =>
        location.pathname.startsWith(e)
      )
    ) {
      paths.forEach((e) => {
        fetch(process.env.REACT_APP_BASE_URL + e, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.statusCode === 401) {
              dispatch(ModelsActions.setPosts([]));
              dispatch(Posts.setPosts([]));
              dispatch(CarActions.setPosts([]));
              dispatch(UserActions.setPosts([]));
              dispatch(CartActions.setPosts([]));
              window.location = "login";
            }
            e == "/model/all" && dispatch(ModelsActions.setPosts(data));
            e == "/auth/getuser" && dispatch(Posts.setPosts(data));
            e == "/car/all" && dispatch(CarActions.setPosts(data));
            e == "/users/getallusers" && dispatch(UserActions.setPosts(data));
            e == "/cart/all" && dispatch(CartActions.setPosts(data));
          })
          .catch((er) => {
            window.location = "/login";
          });
      });
    }
  }, []);
  return (
    <>
      {!["/login", "/register"].includes(location.pathname) && (
        <div className="container">
          <Header />
        </div>
      )}
      <div className="hr" />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
