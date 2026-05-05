import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import Spinner from '../components/Spinner';
import '../styles/forms.css';

const CATEGORIES = ['cultural', 'music', 'sports', 'youth', 'food', 'other'];

const AddEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '', description: '', category: 'cultural', city: '', venue: '',
    date: '', time: '', images: '', totalSeats: 100, isFree: true, price: 0,
    lat: '', lng: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/events/${id}`)
        .then((res) => {
          const ev = res.data;
          setForm({
            title: ev.title || '', description: ev.description || '',
            category: ev.category || 'cultural', city: ev.city || '',
            venue: ev.venue || '', date: ev.date ? ev.date.split('T')[0] : '',
            time: ev.time || '', images: ev.images?.join(', ') || '',
            totalSeats: ev.totalSeats || 100, isFree: ev.isFree, price: ev.price || 0,
            lat: ev.location?.lat || '', lng: ev.location?.lng || ''
          });
        })
        .catch(() => setError('Failed to load event'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.date) {
      setError('Title, category, and date are required.'); return;
    }
    setSubmitting(true);
    setError('');
    const payload = {
      ...form,
      images: form.images.split(',').map((i) => i.trim()).filter(Boolean),
      totalSeats: Number(form.totalSeats),
      price: Number(form.price),
      location: form.lat && form.lng ? { lat: Number(form.lat), lng: Number(form.lng) } : undefined
    };
    try {
      if (isEdit) await api.put(`/events/${id}`, payload);
      else await api.post('/events', payload);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="form-page section-padding">
      <div className="container">
        <div className="form-card">
          <h3 className="form-title">{isEdit ? 'Edit Event' : 'Add New Event'}</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Event Title *</label>
                <input type="text" name="title" className="form-control epk-input" value={form.title} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Category *</label>
                <select name="category" className="form-select epk-input" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input type="text" name="city" className="form-control epk-input" value={form.city} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Venue</label>
                <input type="text" name="venue" className="form-control epk-input" value={form.venue} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Latitude <small className="text-muted">(for map)</small></label>
                <input type="number" name="lat" step="any" className="form-control epk-input" placeholder="e.g. 31.5204" value={form.lat} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Longitude <small className="text-muted">(for map)</small></label>
                <input type="number" name="lng" step="any" className="form-control epk-input" placeholder="e.g. 74.3587" value={form.lng} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Date *</label>
                <input type="date" name="date" className="form-control epk-input" value={form.date} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Time</label>
                <input type="text" name="time" className="form-control epk-input" placeholder="e.g. 6:00 PM" value={form.time} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Total Seats</label>
                <input type="number" name="totalSeats" className="form-control epk-input" value={form.totalSeats} onChange={handleChange} min={1} />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control epk-input" rows={4} value={form.description} onChange={handleChange}></textarea>
              </div>
              <div className="col-12">
                <label className="form-label">Image URLs <small className="text-muted">(comma separated)</small></label>
                <input type="text" name="images" className="form-control epk-input" value={form.images} onChange={handleChange} />
              </div>
              <div className="col-md-4 d-flex align-items-center gap-2 mt-2">
                <input type="checkbox" name="isFree" className="form-check-input" id="isFree" checked={form.isFree} onChange={handleChange} />
                <label htmlFor="isFree" className="form-check-label">Free Event</label>
              </div>
              {!form.isFree && (
                <div className="col-md-4">
                  <label className="form-label">Price (PKR)</label>
                  <input type="number" name="price" className="form-control epk-input" value={form.price} onChange={handleChange} min={0} />
                </div>
              )}
              <div className="col-12 d-flex gap-3 mt-3">
                <button type="submit" className="btn epk-btn-accent btn-lg" disabled={submitting}>
                  {submitting ? 'Saving...' : isEdit ? 'Update Event' : 'Add Event'}
                </button>
                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/events')}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditEvent;
