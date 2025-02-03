import React, { useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../components/helpers/LoginContext.jsx';  // Import context
import { useNavigate } from 'react-router-dom';  // Corrected: useNavigate instead of Navigate()
import '../styles/Signin.css';

const Signin = () => {
  const { login } = useContext(LoginContext);  // Use context to update login state
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();  // Correct: use useNavigate hook

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = user;
      if (!name || !email || !password) {
        setMessage('All fields are required');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/signin', user);

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
    <div className='signin'>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className='signin-form'>
          {message && <h1 className='signin-message'> {message}</h1>}
          <input type='text' placeholder='Name' name='name' value={user.name} onChange={handleChange} />
        </div>
        <div>
          <input type='email' placeholder='Email' name='email' value={user.email} onChange={handleChange} />
        </div>
        <div>
          <input type='password' placeholder='Password' name='password' value={user.password} onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
