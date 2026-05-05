import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import '../styles/dashboard.css';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('registrations');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regRes, reviewRes] = await Promise.all([
          api.get('/users/my-registrations'),
          api.get('/users/my-reviews')
        ]);
        setRegistrations(regRes.data);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="dashboard-page section-padding">
      <div className="container">
        <div className="dashboard-header mb-5">
          <div className="user-welcome">
            <div className="user-avatar-lg">{currentUser?.name?.charAt(0).toUpperCase()}</div>
            <div>
              <h2 className="dashboard-title">Welcome, {currentUser?.name}!</h2>
              <p className="text-muted">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs epk-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'registrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('registrations')}>
              <i className="bi bi-calendar-check me-2"></i>My Registrations ({registrations.length})
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}>
              <i className="bi bi-star me-2"></i>My Reviews ({reviews.length})
            </button>
          </li>
        </ul>

        {activeTab === 'registrations' && (
          <div className="tab-content-epk">
            {registrations.length === 0 ? (
              <div className="empty-state-dash">
                <i className="bi bi-calendar-x"></i>
                <p>You haven't registered for any events yet.</p>
                <Link to="/events" className="btn epk-btn-accent mt-3">Browse Events</Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table epk-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>City</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg._id}>
                        <td>
                          <Link to={`/events/${reg.event?._id}`} className="fw-semibold text-decoration-none">
                            {reg.event?.title || 'N/A'}
                          </Link>
                        </td>
                        <td>{reg.event?.city || '—'}</td>
                        <td>{reg.event?.date ? new Date(reg.event.date).toLocaleDateString('en-PK') : '—'}</td>
                        <td>{reg.event?.isFree ? <span className="badge bg-success">Free</span> : `PKR ${reg.event?.price}`}</td>
                        <td><span className={`badge ${reg.status === 'confirmed' ? 'bg-success' : 'bg-danger'}`}>{reg.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="tab-content-epk">
            {reviews.length === 0 ? (
              <div className="empty-state-dash">
                <i className="bi bi-star"></i>
                <p>You haven't written any reviews yet.</p>
                <Link to="/attractions" className="btn epk-btn-primary mt-3">Explore Attractions</Link>
              </div>
            ) : (
              <div className="row g-3">
                {reviews.map((rev) => (
                  <div key={rev._id} className="col-md-6">
                    <div className="review-dash-card">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Link to={`/attractions/${rev.attraction?._id}`} className="fw-semibold text-decoration-none">
                          {rev.attraction?.name}
                        </Link>
                        <div className="stars-small">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <i key={s} className={`bi ${s <= rev.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted small mb-1">{rev.attraction?.city}</p>
                      <p className="review-comment">{rev.comment || <em className="text-muted">No comment</em>}</p>
                      <small className="text-muted">{new Date(rev.createdAt).toLocaleDateString('en-PK')}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
