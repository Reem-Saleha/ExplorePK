import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import '../styles/auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token, { _id: res.data._id, name: res.data.name, email: res.data.email, role: res.data.role });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
            <p className="auth-subtitle">Welcome back! Sign in to continue.</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-control epk-input" placeholder="you@example.com"
                value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control epk-input" placeholder="••••••••"
                value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn epk-btn-primary w-100 btn-lg" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="auth-footer mt-4 text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <div className="demo-credentials mt-3">
            <small><strong>Demo Admin:</strong> admin@explorepk.com / admin123</small><br />
            <small><strong>Demo User:</strong> user@explorepk.com / user123</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
