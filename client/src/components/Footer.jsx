import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => (
  <footer className="epk-footer">
    <div className="container">
      <div className="row py-5">
        <div className="col-lg-4 col-md-6 mb-4">
          <h4 className="footer-brand">
            <span className="brand-explore">Explore</span><span className="brand-pk">PK</span>
          </h4>
          <p className="footer-tagline">Discover the beauty of Pakistan — its timeless heritage, breathtaking landscapes, and vibrant culture.</p>
          <div className="footer-socials">
            <a href="#!" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            <a href="#!" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            <a href="#!" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#!" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 mb-4">
          <h6 className="footer-heading">Explore</h6>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/attractions">Attractions</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-6 mb-4">
          <h6 className="footer-heading">Account</h6>
          <ul className="footer-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <h6 className="footer-heading">Contact</h6>
          <ul className="footer-links">
            <li><i className="bi bi-envelope me-2"></i>hello@explorepk.com</li>
            <li><i className="bi bi-telephone me-2"></i>+92 300 0000000</li>
            <li><i className="bi bi-geo-alt me-2"></i>Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom text-center py-3">
        <p>&copy; {new Date().getFullYear()} ExplorePK. All rights reserved. Built with the MERN Stack.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
