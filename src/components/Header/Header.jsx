import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [isLogin, setIslogin] = useState(true);
  const [isActive, setIsActive] = useState(false);
  if (["/login"].includes(location.pathname)) return;
  return (
    <div className="header">
      <>
        <div className="headerLogo">
          <Link to="/">GM</Link>
        </div>
        {!isLogin ? (
          <div className="header_nav">
            <Link to="/login" className="loginBtn">
              <BiLogIn />
              Register
            </Link>
            <Link to="/login" className="loginBtn">
              <AiOutlineUser />
              Login
            </Link>
          </div>
        ) : (
          <div
            className={isActive ? "profile_img active" : "profile_img"}
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <img src="https://picsum.photos/60/60" alt="" />
            <div className="profile_model">
              <Link to="profile">
                <CgProfile />
                Profile
              </Link>
              <Link to="login">
                <FiLogOut />
                Logout
              </Link>
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
