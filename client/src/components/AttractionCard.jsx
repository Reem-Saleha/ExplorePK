import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/cards.css';

const StarRating = ({ rating }) => {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={`bi ${star <= Math.round(rating) ? 'bi-star-fill' : 'bi-star'}`}></i>
      ))}
      <span className="ms-1">({rating?.toFixed(1) || '0.0'})</span>
    </span>
  );
};

const AttractionCard = ({ attraction, onDeleted }) => {
  const { _id, name, city, category, description, images, averageRating, totalReviews } = attraction;
  const imgSrc = images?.[0] || 'https://via.placeholder.com/400x250?text=No+Image';
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/attractions/${_id}`);
      if (onDeleted) onDeleted(_id);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete attraction.');
    }
  };

  return (
    <div className="epk-card h-100">
      <div className="card-img-wrapper">
        <img src={imgSrc} alt={name} className="card-img" />
        <span className={`category-badge badge-${category}`}>{category}</span>
      </div>
      <div className="card-body-epk">
        <div className="city-badge">
          <i className="bi bi-geo-alt-fill me-1"></i>{city}
        </div>
        <h5 className="card-title-epk">{name}</h5>
        <p className="card-desc">{description?.substring(0, 100)}...</p>
        <div className="card-footer-epk">
          <StarRating rating={averageRating} />
          <span className="review-count">{totalReviews} reviews</span>
        </div>
        <Link to={`/attractions/${_id}`} className="btn epk-btn-primary w-100 mt-3">
          View Details <i className="bi bi-arrow-right ms-1"></i>
        </Link>
        {isAdmin() && (
          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-warning btn-sm flex-fill"
              onClick={() => navigate(`/admin/attractions/edit/${_id}`)}
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

export default AttractionCard;
