import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile_wrapper">
      <h2 className="settings_title">Settings</h2>
      <div className="profile_information">
        <p className="profile_text">Account</p>
        <div className="user_information_wrapper">
          <div className="user_information">
            <div className="user_item">Name</div>
            <div className="user_item">Davron Xamdamov</div>
            <button>Edit</button>
          </div>
          <div className="user_information">
            <div className="user_item">Email</div>
            <div className="user_item">xamdamovdavron6@gmail.com</div>
            <button>Edit</button>
          </div>
          <div className="user_information">
            <div className="user_item">Password</div>
            <div className="user_item">••••••••</div>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
