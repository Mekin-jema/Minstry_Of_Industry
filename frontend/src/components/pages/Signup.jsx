import { Alert, Button, Label, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import OAuth from "./OAuth";
import InputField from "../input/Input.jsx";
import { LoginContext } from "../helpers/LoginContext.jsx";
import axios from "axios";

const SignUP = () => {
  const { login } = useContext(LoginContext); 
     const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = formData;
      if (!name || !email || !password) {
        setMessage('All fields are required');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/signin', formData);

      if (response.status === 409) {
        setMessage('User already exists');
      } else if (response.status === 500) {
        setMessage('Internal server error');
      } else if (response.status === 201) { 
        setMessage('User created successfully');
        
        // After successful signup, log the user in (update the login state and store the token)
        login(response.data.token); 
        localStorage.setItem('token', response.data.token);  // Store token in localStorage
        
        // Navigate to home after successful sign-in
        navigate('/');  // Corrected: use navigate() instead of navigator()
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
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
          {message && <h1>{message}</h1>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <InputField
                label="First Name"
                type="fname"
                id="name"
                placeholder="Enter your First Name"
                value={formData.name}
                onChange={handleChange}
                // error={formData.email === "" ? "First Name is required" : ""}
              />
            </div>
            <div className="mb-4">
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
              Register
            </Button>
          </div>

          <div className="text-center">
            <OAuth />
          </div>

          <div className="text-center text-sm text-gray-600">
            <span>Don't have an account?</span>
            <Link
              to="/login"
              className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUP;