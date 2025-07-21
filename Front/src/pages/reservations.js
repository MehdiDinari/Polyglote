import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajouté ici
import axiosInstance from '../axios';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Ajouté ici

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirection si pas connecté
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get('courses/list/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filtered = response.data.filter(course => course.reserved_slots > 0);
        setReservations(filtered);
      } catch (error) {
        console.error("Erreur de récupération des réservations :", error);
      }
    };

    fetchReservations();
  }, [token, navigate]);

  const cancelReservation = async (courseId) => {
    try {
      await axiosInstance.patch(
        `courses/cancel-reservation/${courseId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Réservation annulée.');
      setReservations(reservations.filter((course) => course.id !== courseId));
    } catch (error) {
      alert(`Erreur lors de l'annulation : ${error?.response?.data?.message || 'Erreur inconnue'}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Déconnexion réussie.');
    navigate('/login');
  };

  return (
    <div className="reservations-container">
      <div className="header">
        <h1>Mes Réservations</h1>
        <button onClick={handleLogout}>Se déconnecter</button> {/* Bouton ajouté */}
      </div>

      {reservations.length === 0 ? (
        <p>Aucune réservation en cours.</p>
      ) : (
        <ul>
          {reservations.map((course) => (
            <li key={course.id} className="reservation-card">
              <h2>{course.title}</h2>
              <p>{course.reserved_slots} place(s) réservée(s)</p>
              <button onClick={() => cancelReservation(course.id)}>
                Annuler la réservation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reservations;
