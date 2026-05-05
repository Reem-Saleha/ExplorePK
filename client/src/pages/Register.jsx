import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import '../styles/auth.css';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('All fields are required.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password });
      login(res.data.token, { _id: res.data._id, name: res.data.name, email: res.data.email, role: res.data.role });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title"><span className="brand-explore">Explore</span><span className="brand-pk">PK</span></h2>
            <p className="auth-subtitle">Create your account and start exploring Pakistan.</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control epk-input" placeholder="Ali Hassan"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-control epk-input" placeholder="you@example.com"
                value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control epk-input" placeholder="Min 6 characters"
                value={form.password} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control epk-input" placeholder="Repeat password"
                value={form.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn epk-btn-primary w-100 btn-lg" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="auth-footer mt-4 text-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
