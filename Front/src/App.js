import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importer Routes et Navigate

import Login from './pages/Login';
import Reservations from './pages/reservations';
import Logout from './pages/Logout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (!token) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      window.location.href = '/login';
    }
  }, [token]);

  return (
    <Router>
      <Routes>  {/* Remplacer Switch par Routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/reservations"
          element={token ? (
            <Reservations />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/login" />} />  {/* Rediriger vers /login si l'utilisateur arrive sur la page d'accueil */}
      </Routes>
    </Router>
  );
}

export default App;
