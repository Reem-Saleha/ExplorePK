import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/cards.css';

const EventCard = ({ event, onDeleted }) => {
  const { _id, title, date, city, category, images, totalSeats, registeredCount, isFree, price } = event;
  const imgSrc = images?.[0] || 'https://via.placeholder.com/400x250?text=No+Image';
  const seatsLeft = totalSeats - registeredCount;
  const seatsPercent = Math.round((registeredCount / totalSeats) * 100);
  const eventDate = new Date(date);
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/events/${_id}`);
      if (onDeleted) onDeleted(_id);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event.');
    }
  };

  return (
    <div className="epk-card h-100">
      <div className="card-img-wrapper">
        <img src={imgSrc} alt={title} className="card-img" />
        <span className={`category-badge badge-${category}`}>{category}</span>
        <span className={`price-badge ${isFree ? 'badge-free' : 'badge-paid'}`}>
          {isFree ? 'Free' : `PKR ${price}`}
        </span>
      </div>
      <div className="card-body-epk">
        <div className="event-meta">
          <span><i className="bi bi-calendar3 me-1"></i>
            {eventDate.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span><i className="bi bi-geo-alt-fill me-1"></i>{city}</span>
        </div>
        <h5 className="card-title-epk">{title}</h5>
        <div className="seats-section mt-2">
          <div className="d-flex justify-content-between mb-1">
            <small className="text-muted">Seats Available</small>
            <small className={seatsLeft <= 10 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
              {seatsLeft} left
            </small>
          </div>
          <div className="progress" style={{ height: '6px' }}>
            <div
              className={`progress-bar ${seatsPercent > 80 ? 'bg-danger' : 'bg-success'}`}
              style={{ width: `${seatsPercent}%` }}
            ></div>
          </div>
        </div>
        <Link to={`/events/${_id}`} className="btn epk-btn-accent w-100 mt-3">
          View Details <i className="bi bi-arrow-right ms-1"></i>
        </Link>
        {isAdmin() && (
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-warning btn-sm flex-fill"
              onClick={() => navigate(`/admin/events/edit/${_id}`)}
            >
              <i className="bi bi-pencil-fill me-1"></i>Edit
            </button>
            <button
              className="btn btn-danger btn-sm flex-fill"
              onClick={handleDelete}
            >
              <i className="bi bi-trash-fill me-1"></i>Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
