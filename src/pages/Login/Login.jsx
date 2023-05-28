import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Login.css";

function Copyright(props) {
  return (
    <p className="copyright">
      {"Copyright © "}
      <Link href="/">Pressa</Link> {new Date().getFullYear()}
      {"."}
    </p>
  );
}

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_BASE_URL + "/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.email.trim(),
        password: event.target.password.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if ("usename" === data.message) {
          return errors("error", "Username is required");
        }
        if (data?.error) {
          return errors("error", data.message);
        }
        if (data?.token) {
          localStorage.setItem("token", data.token);
          errors("success", data.message);
          return setIsAdmin(true);
        }
      });
  };
  const errors = (type, text) => {
    toast[type](text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <div>
      <div className="login_wrapper">
        <h1>Sign in</h1>
        <br />
        <br />
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="email_wrapper">
            <input required type="text" id="email" name="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="password_wrapper">
            <input required name="password" type="password" id="password" />
            <label htmlFor="password">Password</label>
          </div>
          <button className="loginSubmitBtn" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <Copyright />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
