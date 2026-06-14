import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shop_name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    axios
      .post(
        "http://localhost:5000/auth/register",
        form
      )
      .then(() => {
        alert("Registration Successful");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
        alert("Registration Failed");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>General Store</h1>
        <p>Create your shop account</p>

        <input
          type="text"
          name="name"
          placeholder="Owner Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          type="text"
          name="shop_name"
          placeholder="Shop Name"
          onChange={handleChange}
        />

        <button onClick={register}>
          Register
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login">
            Login Here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;