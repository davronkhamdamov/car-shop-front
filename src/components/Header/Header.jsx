import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
const Header = () => {
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
