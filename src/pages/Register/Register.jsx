import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_BASE_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.name.value.trim(),
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
        if (data?.error || data.status) {
          return errors("error", data.message);
        }
        if (data?.message) {
          errors("success", data.message);
          setTimeout(() => {
            window.location = "/login";
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
        <h1 className="signinTitle">Sign Up</h1>
        <br />
        <br />
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="email_wrapper">
            <input required type="text" id="name" name="name" />
            <label htmlFor="name">Name</label>
          </div>
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
        <p>
          Already have an account? <Link to="/login">Sign in →</Link>
        </p>
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
};
export default Register;
