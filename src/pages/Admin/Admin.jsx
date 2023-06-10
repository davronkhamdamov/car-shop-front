import React from "react";
import "./Admin.css";
import { HiOutlineHome } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageNotFound from "../PageNotFound/PageNotFound";

function Admin() {
  const location = useLocation();
  const userData = useSelector((data) => data.user.data);
  if (!userData[0] && !userData.role) {
    return <PageNotFound />;
  }
  if (["/admin", "/admin/"].includes(location.pathname)) {
    window.location = "/admin/cars";
  }
  return (
    <div className="admin_wraper">
      <div className="navigator">
        <NavLink className="navigator-item" to="cars">
          <HiOutlineHome />
          Cars
        </NavLink>
        <NavLink to="models" className="navigator-item">
          <AiOutlineUnorderedList />
          Models
        </NavLink>
        <NavLink to="users" className="navigator-item">
          <FiUsers />
          Users
        </NavLink>
      </div>
      <div className="dashborad">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
