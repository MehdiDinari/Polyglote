// src/pages/Reservations.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Récupérer le token de localStorage (ou d'un autre moyen d'authentification)
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get('courses/list/', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setReservations(response.data.filter(course => course.reserved_slots > 0));
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    };

    if (storedToken) {
      fetchReservations();
    }
  }, []);

  const cancelReservation = async (courseId) => {
    if (!token) {
      alert('Token non trouvé, veuillez vous reconnecter.');
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `courses/cancel-reservation/${courseId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Réservation annulée!');
      // Rafraîchir la liste des réservations
      setReservations(reservations.filter((course) => course.id !== courseId));
    } catch (error) {
      alert('Erreur de l\'annulation : ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Mes réservations</h1>
      <ul>
        {reservations.map((course) => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>Réservé : {course.reserved_slots} place(s)</p>
            <button
              onClick={() => cancelReservation(course.id)}
            >
              Annuler réservation
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservations;
