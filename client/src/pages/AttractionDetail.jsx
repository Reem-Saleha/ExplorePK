import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ReviewCard from '../components/ReviewCard';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';
import '../styles/detail.css';

const AttractionDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, currentUser, isAdmin } = useAuth();
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/attractions/${id}`);
        setData(res.data.attraction);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setReviewError('');
    try {
      const res = await api.post('/reviews', { attractionId: id, ...reviewForm });
      setReviews([res.data, ...reviews]);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!data) return <div className="container py-5 text-center"><h4>Attraction not found.</h4></div>;

  const { name, city, category, description, images, timings, hostels, nearbyHotels, averageRating, totalReviews, location } = data;

  return (
    <div className="detail-page section-padding">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/attractions">Attractions</a></li>
            <li className="breadcrumb-item active">{name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Left: Images + Map */}
          <div className="col-lg-7">
            {images?.length > 0 ? (
              <div className="img-gallery">
                <img src={images[activeImg]} alt={name} className="main-img mb-3" />
                {images.length > 1 && (
                  <div className="thumb-row">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" className={`thumb-img ${activeImg === i ? 'active-thumb' : ''}`}
                        onClick={() => setActiveImg(i)} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-img-placeholder">No Images Available</div>
            )}

            {location?.lat && location?.lng && (
              <div className="map-section mt-4">
                <h5 className="detail-section-title">Location</h5>
                <iframe
                  title="map"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: '12px' }}
                  src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="col-lg-5">
            <div className="detail-info-card">
              <span className={`category-badge badge-${category} mb-2`}>{category}</span>
              <h2 className="detail-title">{name}</h2>
              <p className="detail-city"><i className="bi bi-geo-alt-fill me-2"></i>{city}</p>
              <div className="detail-rating mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i key={s} className={`bi ${s <= Math.round(averageRating) ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                ))}
                <span>{averageRating?.toFixed(1)} ({totalReviews} reviews)</span>
              </div>
              <p className="detail-description">{description}</p>

              {timings && (
                <div className="detail-info-row">
                  <i className="bi bi-clock me-2"></i>
                  <strong>Timings:</strong>&nbsp;{timings}
                </div>
              )}

              {hostels?.length > 0 && (
                <div className="mt-3">
                  <h6 className="detail-section-title">
                    <i className="bi bi-building me-2"></i>Nearby Hotels
                  </h6>
                  <div className="hostel-grid">
                    {hostels.map((hostel, i) => (
                      <div key={i} className="hostel-card">
                        <div className="hostel-card-top">
                          <span className="hostel-name">{hostel.name}</span>
                          {hostel.priceRange && <span className="hostel-price-badge">{hostel.priceRange}</span>}
                        </div>
                        <div className="hostel-card-bottom">
                          <div className="hostel-stars">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <i key={s} className={`bi ${s <= Math.round(hostel.rating) ? 'bi-star-fill' : 'bi-star'}`}></i>
                            ))}
                            {hostel.rating > 0 && <span className="hostel-rating-num">{hostel.rating?.toFixed(1)}</span>}
                          </div>
                          {hostel.bookingUrl && (
                            <a href={hostel.bookingUrl} target="_blank" rel="noopener noreferrer" className="hostel-book-btn">
                              Book Now
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!hostels?.length) && nearbyHotels?.length > 0 && (
                <div className="mt-3">
                  <h6 className="detail-section-title">
                    <i className="bi bi-building me-2"></i>Nearby Hotels
                  </h6>
                  <ul className="list-unstyled mb-0">
                    {nearbyHotels.map((hotel, i) => (
                      <li key={i} className="mb-1">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>{hotel}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section mt-5">
          <h4 className="detail-section-title">Reviews ({reviews.length})</h4>

          {isAuthenticated() && (
            <div className="review-form-card mb-4">
              <h6>Write a Review</h6>
              {reviewError && <div className="alert alert-danger">{reviewError}</div>}
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select className="form-select" value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea className="form-control" rows={3} value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Share your experience..."></textarea>
                </div>
                <button className="btn epk-btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="row g-3">
              {reviews.map((r) => (
                <div key={r._id} className="col-md-6">
                  <ReviewCard
                    review={r}
                    canDelete={isAdmin() || currentUser?._id === r.user?._id}
                    onDelete={handleDeleteReview}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;
