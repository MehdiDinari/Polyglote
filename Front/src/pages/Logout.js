// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate

function Logout() {
  const navigate = useNavigate();  // Remplacer useHistory par useNavigate

  useEffect(() => {
    // Supprimer le token de localStorage
    localStorage.removeItem('token');
    alert('Vous êtes maintenant déconnecté.');

    // Rediriger l'utilisateur vers la page de connexion
    navigate('/login');  // Utiliser navigate pour rediriger vers /login
  }, [navigate]);

  return null;
}

export default Logout;
