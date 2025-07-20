import React, { useState } from 'react';
import axiosInstance from '../axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('users/login/', {
        username,
        password,
      });

      const token = response.data.access;
      localStorage.setItem('token', token);
      alert('Login Successful.');

      window.location.href = '/reservations'; // Redirect
    } catch (error) {
      console.error('Login error:', error);
      alert("Login failed. Please check your username or password.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
