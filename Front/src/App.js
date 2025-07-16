import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

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
  }, [token]);

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

  return (
    <div className="reservations-container">
      <h1>Mes Réservations</h1>
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
