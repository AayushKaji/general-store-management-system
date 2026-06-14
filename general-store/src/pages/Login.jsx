import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        window.location.href = "/";
      })
      .catch(() => {
        alert("Invalid Credentials");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>General Store</h1>
        <p>Login to your account</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>
        <p style={{ marginTop: "15px" }}>
  New Shopkeeper?
  <Link to="/register">
    Register Here
  </Link>
</p>

      </div>
    </div>
  );
}

export default Login;