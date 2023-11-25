// Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend endpoint for authentication
      const response = await axios.post('http://127.0.0.1:8000/token/', {
        username,
        password,
      });

      // Assuming your backend returns a token upon successful login
      const token = response.data.token;

      // You can store the token in local storage or a state management solution
      // For simplicity, storing in local storage here
      localStorage.setItem('token', token);

      // Redirect or perform any other action upon successful login
      console.log('Login successful!');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
