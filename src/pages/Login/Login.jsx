import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

function Copyright() {
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
    fetch(process.env.REACT_APP_BASE_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: event.target.email.value.trim(),
        password: event.target.password.value.trim(),
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
          errors("success", data.message);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location = "/";
          }, 2000);
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
        <h1 className="signinTitle">Sign in</h1>
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
