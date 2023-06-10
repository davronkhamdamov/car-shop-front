import React, { useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../../redux/reduser";

const Profile = () => {
  const userData = useSelector((data) => data.user.data);
  const [userNameEdit, setUserNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [imgEdit, setimgEdit] = useState(false);
  const dispatch = useDispatch();

  async function fileUpload(formData) {
    const img = await fetch(
      "https://api.cloudinary.com/v1_1/didddubfm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data.url;
      });
    return img;
  }

  return (
    <div className="profile_wrapper">
      <br />
      <h2 className="settings_title">Settings</h2>
      <div className="profile_information">
        <p className="profile_text">Account</p>
        <div className="user_information_wrapper">
          <div className="user_information">
            <div className="user_item">Name</div>
            <div className="user_item">{userData.username}</div>
            <button onClick={() => setUserNameEdit(true)}>Edit</button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(
                  process.env.REACT_APP_BASE_URL + "/users/updateusername",
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      username: e.target.username.value,
                    }),
                    headers: {
                      authorization: localStorage.getItem("token"),
                      "content-type": "application/json",
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.message === "User successfully updated") {
                      setUserNameEdit(false);
                      dispatch(Posts.setPosts(data.user));
                    }
                  });
              }}
              className={
                userNameEdit ? "active userNameModal" : "userNameModal"
              }
            >
              <input
                placeholder="Enter you new Username"
                autoFocus
                type="text"
                required
                name="username"
                defaultValue={userData.username}
              />
              <div className="btnGroup">
                <button type="button" onClick={() => setUserNameEdit(false)}>
                  Cancel
                </button>
                <button>Submit</button>
              </div>
            </form>
          </div>
          <div className="user_information">
            <div className="user_item">Email</div>
            <div className="user_item">{userData.email}</div>
            <button onClick={() => setEmailEdit(true)}>Edit</button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(process.env.REACT_APP_BASE_URL + "/users/updateemail", {
                  method: "PUT",
                  body: JSON.stringify({
                    email: e.target.email.value,
                  }),
                  headers: {
                    authorization: localStorage.getItem("token"),
                    "content-type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.message === "User successfully updated") {
                      setEmailEdit(false);
                      dispatch(Posts.setPosts(data.user));
                    }
                  });
              }}
              className={emailEdit ? "active emailModal" : "emailModal"}
            >
              <input
                placeholder="Enter you new email"
                type="email"
                required
                name="email"
                defaultValue={userData.email}
              />
              <div className="btnGroup">
                <button type="button" onClick={() => setEmailEdit(false)}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div className="user_information">
            <div className="user_item">Password</div>
            <div className="user_item">••••••••</div>
            <button onClick={() => setPasswordEdit(true)}>Edit</button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className={
                passwordEdit ? "active passwordModal" : "passwordModal"
              }
            >
              <input
                placeholder="Enter you new password"
                autoFocus
                type="password"
              />
              <div className="btnGroup">
                <button onClick={(e) => setPasswordEdit(false)}>Cancel</button>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {(passwordEdit || userNameEdit || emailEdit || imgEdit) && (
        <div
          className="visible1"
          onClick={() => {
            setUserNameEdit(false);
            setPasswordEdit(false);
            setEmailEdit(false);
            setimgEdit(false);
          }}
        ></div>
      )}
      <div className="profile_information">
        <p className="profile_text">Options</p>
        <div className="user_information">
          <div>Your image</div>
          <div className="user_img">
            <img src={userData.imgurl} alt="" />
          </div>
          <button onClick={() => setimgEdit(true)}>Edit</button>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              let files = e.target.file.files;

              const formData = new FormData();

              formData.append("file", files[0]);
              formData.append("upload_preset", "youtube");

              const imgUrl = await fileUpload(formData);
              console.log(
                "🚀 ~ file: Profile.jsx:182 ~ onSubmit={ ~ imgUrl:",
                imgUrl
              );

              fetch(process.env.REACT_APP_BASE_URL + "/users/updateimgurl", {
                method: "PUT",
                body: JSON.stringify({ imgUrl }),
                headers: {
                  authorization: localStorage.getItem("token"),
                  "content-type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "User successfully updated") {
                    setimgEdit(false);
                    dispatch(Posts.setPosts(data.user));
                  }
                });
            }}
            className={imgEdit ? "userFileModal active" : "userFileModal"}
          >
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg, image/webp"
            />
            <div className="btnGroup">
              <button onClick={() => setimgEdit(false)}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
