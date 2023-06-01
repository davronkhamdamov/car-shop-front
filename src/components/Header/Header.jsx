import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

const Header = () => {
  const location = useLocation();
  const [isLogin, setIslogin] = useState(true);
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
          <Link className="profile_img" to="/profile">
            <img src="https://picsum.photos/60/60" alt="" />
          </Link>
        )}
      </>
    </div>
  );
};

export default Header;
