import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';
import '../styles/detail.css';

const EventDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    setError('');
    setMessage('');
    try {
      await api.post(`/events/${id}/register`);
      setRegistered(true);
      setMessage('Successfully registered! See you there.');
      setEvent((prev) => ({ ...prev, registeredCount: prev.registeredCount + 1 }));
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      if (msg.includes('already registered')) setRegistered(true);
      setError(msg);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <Spinner />;
  if (!event) return <div className="container py-5 text-center"><h4>Event not found.</h4></div>;

  const { title, description, category, city, venue, date, time, images, totalSeats, registeredCount, isFree, price, location } = event;
  const seatsLeft = totalSeats - registeredCount;
  const seatsPercent = Math.round((registeredCount / totalSeats) * 100);
  const eventDate = new Date(date);

  return (
    <div className="detail-page section-padding">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/events">Events</a></li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </nav>

        <div className="row g-5">
          <div className="col-lg-7">
            {images?.[0] ? (
              <img src={images[0]} alt={title} className="main-img mb-4" />
            ) : (
              <div className="no-img-placeholder">No Image Available</div>
            )}
            <h4 className="detail-section-title">About This Event</h4>
            <p className="detail-description">{description}</p>
          </div>

          <div className="col-lg-5">
            <div className="detail-info-card">
              <span className={`category-badge badge-${category} mb-2`}>{category}</span>
              <h2 className="detail-title">{title}</h2>

              <div className="event-detail-meta">
                <div className="meta-row">
                  <i className="bi bi-calendar3"></i>
                  <span>{eventDate.toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                {time && (
                  <div className="meta-row">
                    <i className="bi bi-clock"></i>
                    <span>{time}</span>
                  </div>
                )}
                {venue && (
                  <div className="meta-row">
                    <i className="bi bi-map"></i>
                    <span>{venue}</span>
                  </div>
                )}
                {city && (
                  <div className="meta-row">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>{city}</span>
                  </div>
                )}
                {location?.lat && (
                  <div className="meta-row">
                    <i className="bi bi-map-fill"></i>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setShowMap(true)}>
                      View on Map
                    </button>
                  </div>
                )}
                <div className="meta-row">
                  <i className="bi bi-tag"></i>
                  <span>{isFree ? 'Free Entry' : `PKR ${price}`}</span>
                </div>
              </div>

              <div className="seats-section my-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-semibold">Seat Availability</span>
                  <span className={seatsLeft <= 10 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                    {seatsLeft} / {totalSeats} left
                  </span>
                </div>
                <div className="progress mb-2" style={{ height: '8px' }}>
                  <div className={`progress-bar ${seatsPercent > 80 ? 'bg-danger' : 'bg-success'}`}
                    style={{ width: `${seatsPercent}%` }}></div>
                </div>
              </div>

              {message && <div className="alert alert-success">{message}</div>}
              {error && !registered && <div className="alert alert-danger">{error}</div>}

              {registered ? (
                <div className="already-registered-badge">
                  <i className="bi bi-check-circle-fill me-2"></i>Already Registered
                </div>
              ) : isAuthenticated() ? (
                <button className="btn epk-btn-accent w-100 btn-lg" onClick={handleRegister}
                  disabled={registering || seatsLeft === 0}>
                  {registering ? 'Registering...' : seatsLeft === 0 ? 'Fully Booked' : 'Register / RSVP'}
                </button>
              ) : (
                <a href="/login" className="btn epk-btn-primary w-100 btn-lg">Login to Register</a>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMap && location?.lat && (
        <>
          <div className="modal-backdrop fade show" onClick={() => setShowMap(false)}></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-geo-alt-fill me-2 text-danger"></i>{venue || city}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowMap(false)}></button>
                </div>
                <div className="modal-body p-0">
                  <iframe
                    title="Event Location"
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="modal-footer">
                  <small className="text-muted me-auto">
                    <i className="bi bi-map me-1"></i>{venue}, {city}
                  </small>
                  <a
                    href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Open in Google Maps
                  </a>
                  <button className="btn btn-sm btn-secondary" onClick={() => setShowMap(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetail;
