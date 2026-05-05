import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import Spinner from '../components/Spinner';
import '../styles/forms.css';

const CATEGORIES = ['historical', 'natural', 'religious', 'adventure', 'cultural'];

const AddEditAttraction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '', city: '', category: 'historical', description: '',
    timings: '', nearbyHotels: '', images: '',
    lat: '', lng: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/attractions/${id}`)
        .then((res) => {
          const a = res.data.attraction;
          setForm({
            name: a.name || '', city: a.city || '', category: a.category || 'historical',
            description: a.description || '', timings: a.timings || '',
            nearbyHotels: a.nearbyHotels?.join(', ') || '',
            images: a.images?.join(', ') || '',
            lat: a.location?.lat || '', lng: a.location?.lng || ''
          });
        })
        .catch(() => setError('Failed to load attraction'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.city || !form.description) {
      setError('Name, city, and description are required.'); return;
    }
    setSubmitting(true);
    setError('');
    const payload = {
      name: form.name, city: form.city, category: form.category,
      description: form.description, timings: form.timings,
      nearbyHotels: form.nearbyHotels.split(',').map((h) => h.trim()).filter(Boolean),
      images: form.images.split(',').map((i) => i.trim()).filter(Boolean),
      location: { lat: Number(form.lat) || 0, lng: Number(form.lng) || 0 }
    };
    try {
      if (isEdit) await api.put(`/attractions/${id}`, payload);
      else await api.post('/attractions', payload);
      navigate('/attractions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save attraction');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="form-page section-padding">
      <div className="container">
        <div className="form-card">
          <h3 className="form-title">{isEdit ? 'Edit Attraction' : 'Add New Attraction'}</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Attraction Name *</label>
                <input type="text" name="name" className="form-control epk-input" value={form.name} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">City *</label>
                <input type="text" name="city" className="form-control epk-input" value={form.city} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <select name="category" className="form-select epk-input" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Timings</label>
                <input type="text" name="timings" className="form-control epk-input" placeholder="e.g. 9:00 AM - 6:00 PM" value={form.timings} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">Description *</label>
                <textarea name="description" className="form-control epk-input" rows={4} value={form.description} onChange={handleChange} required></textarea>
              </div>
              <div className="col-12">
                <label className="form-label">Image URLs <small className="text-muted">(comma separated)</small></label>
                <input type="text" name="images" className="form-control epk-input" placeholder="https://..., https://..." value={form.images} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">Nearby Hotels <small className="text-muted">(comma separated)</small></label>
                <input type="text" name="nearbyHotels" className="form-control epk-input" placeholder="Hotel A, Hotel B" value={form.nearbyHotels} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Latitude</label>
                <input type="number" step="any" name="lat" className="form-control epk-input" placeholder="e.g. 31.5204" value={form.lat} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Longitude</label>
                <input type="number" step="any" name="lng" className="form-control epk-input" placeholder="e.g. 74.3587" value={form.lng} onChange={handleChange} />
              </div>
              <div className="col-12 d-flex gap-3 mt-3">
                <button type="submit" className="btn epk-btn-primary btn-lg" disabled={submitting}>
                  {submitting ? 'Saving...' : isEdit ? 'Update Attraction' : 'Add Attraction'}
                </button>
                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/attractions')}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditAttraction;
