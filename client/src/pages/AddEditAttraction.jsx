import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import Spinner from '../components/Spinner';
import '../styles/forms.css';

const CATEGORIES = ['historical', 'natural', 'religious', 'adventure', 'cultural'];

const emptyHostel = { name: '', priceRange: '', rating: '', bookingUrl: '' };

const AddEditAttraction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '', city: '', category: 'historical', description: '',
    timings: '', images: '', lat: '', lng: ''
  });
  const [hostels, setHostels] = useState([]);
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
            images: a.images?.join(', ') || '',
            lat: a.location?.lat || '', lng: a.location?.lng || ''
          });
          if (a.hostels?.length > 0) {
            setHostels(a.hostels.map((h) => ({
              name: h.name || '', priceRange: h.priceRange || '',
              rating: h.rating ?? '', bookingUrl: h.bookingUrl || ''
            })));
          } else if (a.nearbyHotels?.length > 0) {
            setHostels(a.nearbyHotels.map((name) => ({ name, priceRange: '', rating: '', bookingUrl: '' })));
          }
        })
        .catch(() => setError('Failed to load attraction'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleHostelChange = (index, field, value) => {
    setHostels((prev) => prev.map((h, i) => i === index ? { ...h, [field]: value } : h));
  };

  const addHostel = () => setHostels((prev) => [...prev, { ...emptyHostel }]);

  const removeHostel = (index) => setHostels((prev) => prev.filter((_, i) => i !== index));

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
      images: form.images.split(',').map((i) => i.trim()).filter(Boolean),
      location: { lat: Number(form.lat) || 0, lng: Number(form.lng) || 0 },
      hostels: hostels
        .filter((h) => h.name.trim())
        .map((h) => ({ name: h.name.trim(), priceRange: h.priceRange.trim(), rating: Number(h.rating) || 0, bookingUrl: h.bookingUrl.trim() }))
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
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">Nearby Hotels / Hostels</label>
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={addHostel}>
                    + Add Hotel
                  </button>
                </div>
                {hostels.length === 0 && (
                  <p className="text-muted small">No hotels added yet. Click "+ Add Hotel" to add one.</p>
                )}
                {hostels.map((hostel, index) => (
                  <div key={index} className="border rounded p-3 mb-2" style={{ background: '#f9f9f9' }}>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <input
                          type="text" className="form-control epk-input form-control-sm"
                          placeholder="Hotel name *" value={hostel.name}
                          onChange={(e) => handleHostelChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text" className="form-control epk-input form-control-sm"
                          placeholder="Price range (e.g. PKR 3000-6000)" value={hostel.priceRange}
                          onChange={(e) => handleHostelChange(index, 'priceRange', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="number" min="0" max="5" step="0.1"
                          className="form-control epk-input form-control-sm"
                          placeholder="Rating (0-5)" value={hostel.rating}
                          onChange={(e) => handleHostelChange(index, 'rating', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text" className="form-control epk-input form-control-sm"
                          placeholder="Booking URL (optional)" value={hostel.bookingUrl}
                          onChange={(e) => handleHostelChange(index, 'bookingUrl', e.target.value)}
                        />
                      </div>
                      <div className="col-md-2 d-flex align-items-center">
                        <button type="button" className="btn btn-sm btn-danger w-100" onClick={() => removeHostel(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
