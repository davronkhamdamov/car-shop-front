import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BiCart, BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Posts } from "../../redux/reduser";
import { ModelsActions } from "../../redux/reduser.Models";
import { CarActions } from "../../redux/reduser.Cars";
import { UserActions } from "../../redux/reduser.Users";
import { CartActions } from "../../redux/reduser.Cart";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const userData = useSelector((data) => data.user.data);
  const items = useSelector((data) => data.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="header">
      <>
        <div className="headerLogo">
          <Link to="/">GM</Link>
        </div>
        {!userData.imgurl ? (
          <div className="header_nav">
            <Link to="/register" className="loginBtn">
              <BiLogIn />
              Register
            </Link>
            <Link to="/login" className="loginBtn">
              <AiOutlineUser />
              Login
            </Link>
          </div>
        ) : (
          <div className="navbar_nav">
            <Link to="cart" className="cart_wrapper">
              <BiCart />
              <span>{items.length === 0 ? 0 : items.length}</span>
            </Link>
            <div
              className={isActive ? "profile_img active" : "profile_img"}
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <img src={userData.imgurl} alt="" />
              <div className="profile_model">
                <Link
                  onClick={() => {
                    dispatch(ModelsActions.setPosts([]));
                    dispatch(Posts.setPosts([]));
                    dispatch(CarActions.setPosts([]));
                    dispatch(UserActions.setPosts([]));
                    dispatch(CartActions.setPosts([]));
                    localStorage.clear();
                    navigate("/login"); 	
                  }}
                >
                  <FiLogOut />
                  Logout
                </Link>
                <Link to="profile">
                  <CgProfile />
                  Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
      <div
        className={isActive ? "visible active" : "visible"}
        onClick={() => setIsActive(!isActive)}
      />
    </div>
  );
};

export default Header;
