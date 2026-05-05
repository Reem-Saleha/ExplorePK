import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/navbar.css';

const Navbar = () => {
  const { currentUser, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg epk-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand epk-brand" to="/">
          <span className="brand-explore">Explore</span><span className="brand-pk">PK</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/attractions" onClick={() => setMenuOpen(false)}>Attractions</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events" onClick={() => setMenuOpen(false)}>Events</NavLink>
            </li>
            {isAdmin() && (
              <li className="nav-item">
                <NavLink className="nav-link epk-admin-link" to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</NavLink>
              </li>
            )}
          </ul>

          <div className="navbar-nav">
            {isAuthenticated() ? (
              <div className="nav-item dropdown">
                <button className="btn epk-user-btn dropdown-toggle" data-bs-toggle="dropdown">
                  <span className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                  {currentUser.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/dashboard" onClick={() => setMenuOpen(false)}>My Dashboard</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="btn epk-btn-outline me-2" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link className="btn epk-btn-primary" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
