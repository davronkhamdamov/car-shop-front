import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
const Header = () => {
  const location = useLocation();
  if (location.pathname === "/login") return;
  return (
    <div className="header">
      <div className="headerLogo">
        <Link to="/">GM</Link>
      </div>
      <div>
        <Link to="/login" className="loginBtn">
          <AiOutlineUser />
          Admin o‘tish
        </Link>
      </div>
    </div>
  );
};

export default Header;
