import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../components/helpers/LoginContext.jsx";
// import "../styles/Login.css";
const Login = () => {
  const { login } = useContext(LoginContext);  // Use context to update login state
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Corrected: useNavigate instead of Navigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    // Check if email and password are provided
    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", user);

      // Handle different error responses from the API
      if (response.status === 404) {
        setMessage("User not found");
      } else if (response.status === 401) {
        setMessage("Invalid password");
      } else if (response.status === 500) {
        setMessage("Internal server error");
      } else if (response.status === 200) {
        // On successful login, update the context state and store the token
        login(response.data.token); 
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setMessage("Login successful");

        // Redirect to home after successful login
        navigate("/"); 
      }
    } catch (error) {
      // Handle errors during the login request
      console.error("Error during login:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div><h2>Login</h2></div>
        <div className="login-form">
          {message && <h1 className="login-message">{message}</h1>}
        </div>
        <div className="login-input">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
