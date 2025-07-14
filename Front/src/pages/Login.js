// src/pages/Login.js
import React, { useState } from 'react';
import axiosInstance from '../axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('users/login/', {
        username,
        password,
      });
      setToken(response.data.access); // Récupérer le token JWT
      localStorage.setItem('token', response.data.access); // Sauvegarder dans localStorage
      alert('Connexion réussie!');
      // Rediriger vers la page des réservations ou dashboard
      window.location.href = '/reservations';
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Échec de la connexion. Vérifie tes identifiants.');
    }
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
