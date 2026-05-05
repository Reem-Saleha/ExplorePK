import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Spinner from '../components/Spinner';
import '../styles/dashboard.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="col-md-6 col-lg-3">
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon"><i className={`bi ${icon}`}></i></div>
      <div>
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label-card">{label}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/users')
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="dashboard-page section-padding">
      <div className="container">
        <div className="dashboard-header mb-5">
          <h2 className="dashboard-title">Admin Panel</h2>
          <p className="text-muted">Manage ExplorePK content and users</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="row g-4 mb-5">
            <StatCard icon="bi-geo-alt-fill" label="Total Attractions" value={stats.totalAttractions} color="blue" />
            <StatCard icon="bi-calendar-event-fill" label="Total Events" value={stats.totalEvents} color="amber" />
            <StatCard icon="bi-people-fill" label="Total Users" value={stats.totalUsers} color="green" />
            <StatCard icon="bi-ticket-fill" label="Registrations" value={stats.totalRegistrations} color="purple" />
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions mb-5">
          <h5 className="section-title mb-3">Quick Actions</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <Link to="/admin/attractions/add" className="btn epk-btn-primary w-100">
                <i className="bi bi-plus-circle me-2"></i>Add Attraction
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/events/add" className="btn epk-btn-accent w-100">
                <i className="bi bi-plus-circle me-2"></i>Add Event
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/attractions" className="btn btn-outline-secondary w-100">
                <i className="bi bi-eye me-2"></i>View Attractions
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/events" className="btn btn-outline-secondary w-100">
                <i className="bi bi-eye me-2"></i>View Events
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs epk-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}>Recent Registrations</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}>Users</button>
          </li>
        </ul>

        {activeTab === 'overview' && (
          <div className="table-responsive">
            <table className="table epk-table">
              <thead>
                <tr><th>User</th><th>Event</th><th>Event Date</th></tr>
              </thead>
              <tbody>
                {stats?.recentRegistrations?.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-muted">No registrations yet</td></tr>
                ) : (
                  stats?.recentRegistrations?.map((reg) => (
                    <tr key={reg._id}>
                      <td>{reg.user?.name} <small className="text-muted">({reg.user?.email})</small></td>
                      <td>{reg.event?.title}</td>
                      <td>{reg.event?.date ? new Date(reg.event.date).toLocaleDateString('en-PK') : 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="table-responsive">
            <table className="table epk-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`badge ${u.role === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{u.role}</span></td>
                    <td>{new Date(u.createdAt).toLocaleDateString('en-PK')}</td>
                    <td>
                      {u.role !== 'admin' && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(u._id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
