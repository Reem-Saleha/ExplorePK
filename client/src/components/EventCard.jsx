import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cards.css';

const EventCard = ({ event }) => {
  const { _id, title, date, city, category, images, totalSeats, registeredCount, isFree, price } = event;
  const imgSrc = images?.[0] || 'https://via.placeholder.com/400x250?text=No+Image';
  const seatsLeft = totalSeats - registeredCount;
  const seatsPercent = Math.round((registeredCount / totalSeats) * 100);
  const eventDate = new Date(date);

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
      </div>
    </div>
  );
};

export default EventCard;
