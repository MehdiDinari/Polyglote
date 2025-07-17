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
      alert('Connexion réussie .');

      window.location.href = '/reservations'; // Redirection
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert("Échec de la connexion. Vérifie ton nom d'utilisateur ou ton mot de passe.");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
