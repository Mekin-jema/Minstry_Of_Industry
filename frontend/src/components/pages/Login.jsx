import { Alert, Button, Label, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import OAuth from "./OAuth.jsx";
import InputField from "../input/Input.jsx";
import { LoginContext } from '../helpers/LoginContext.jsx';
import axios from "axios";

const SignIn = () => {
  const { login } = useContext(LoginContext); 
    const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log("Form data:", formData);
    // Check if email and password are provided
    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);

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
        setFormData({
          email: "",
          password: "",
        })
        // Redirect to home after successful login
        navigate("/"); 
      }
    } catch (error) {
      // Handle errors during the login request
      console.error("Error during login:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white px-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#214394]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {message && <h1>{message}</h1>}
            <div className="mb-4">
              <Label
                htmlFor="email"
                value="Your email"
                className="block text-sm font-medium text-gray-700"
              />
              <InputField
                label="Email Address"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                // error={formData.email === "" ? "Email is required" : ""}
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="password"
                value="Your password"
                className="block text-sm font-medium text-gray-700"
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                // error={
                //   formData.password.length < 6
                //     ? "Password must be at least 6 characters"
                //     : ""
                // }
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#214394] hover:bg-[#2851b1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </Button>
          </div>

          <div className="text-center">
            <OAuth />
          </div>

          <div className="text-center text-sm text-gray-600">
            <span>Don't have an account?</span>
            <Link
              to="/signup"
              className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;