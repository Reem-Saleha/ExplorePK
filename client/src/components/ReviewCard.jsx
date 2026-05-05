import React from 'react';
import '../styles/cards.css';

const ReviewCard = ({ review, canDelete, onDelete }) => {
  const { user, rating, comment, createdAt } = review;
  const initials = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const date = new Date(createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">{initials}</div>
        <div>
          <p className="review-username">{user?.name || 'Anonymous'}</p>
          <p className="review-date">{date}</p>
        </div>
        <div className="review-stars ms-auto">
          {[1, 2, 3, 4, 5].map((s) => (
            <i key={s} className={`bi ${s <= rating ? 'bi-star-fill' : 'bi-star'}`}></i>
          ))}
        </div>
        {canDelete && (
          <button
            className="review-delete-btn"
            onClick={() => onDelete(review._id)}
            title="Delete review"
          >
            <i className="bi bi-trash3"></i>
          </button>
        )}
      </div>
      {comment && <p className="review-comment">{comment}</p>}
    </div>
  );
};

export default ReviewCard;
