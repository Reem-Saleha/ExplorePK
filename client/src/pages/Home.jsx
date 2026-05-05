import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import AttractionCard from '../components/AttractionCard';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import '../styles/home.css';

const HERO_IMAGES = [
  'https://cdn.theculturetrip.com/wp-content/uploads/2019/02/ef2kn5.jpg',
  'https://wallpaperaccess.com/full/861515.jpg',
  'https://wallpaperaccess.com/full/191265.jpg',
  'https://civilisable.com/wp-content/uploads/2024/10/Pakistani-Folk-Art-28.10.2024.jpg',
  'https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1661243930/Faisal_Mosque_travelpakistani.jpg',
];
const SLIDE_INTERVAL = 5000;

const Home = () => {
  const [attractions, setAttractions] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalAttractions: 0, totalEvents: 0, totalUsers: 0, totalRegistrations: 0 });
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, evtRes, statsRes] = await Promise.all([
          api.get('/attractions'),
          api.get('/events'),
          api.get('/stats')
        ]);
        setAttractions(attRes.data.slice(0, 6));
        setEvents(evtRes.data.slice(0, 4));
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <Spinner />;

  const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  const contentOpacity = Math.max(1 - scrollProgress * 2.5, 0);
  const imageScale = 1 + scrollProgress * 0.08;
  const imageTranslateY = scrollY * 0.4;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        {/* Stacked slide layers — active one fades in */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img}
            className={`hero-bg ${i === activeSlide ? 'hero-bg--active' : ''}`}
            style={{
              backgroundImage: `url('${img}')`,
              transform: i === activeSlide
                ? `scale(${imageScale}) translateY(${imageTranslateY * -0.5}px)`
                : 'scale(1)',
            }}
          />
        ))}
        {/* Dark gradient overlay */}
        <div className="hero-gradient" />

        {/* Content */}
        <div className="hero-content" style={{ opacity: contentOpacity }}>
          <div className="container text-center text-white">
            <div className="hero-badge animate-hero-in">Pakistan Tourism</div>
            <h1 className="hero-title animate-hero-in delay-1">
              Discover the<br />
              <span className="hero-title-accent">Soul of Pakistan</span>
            </h1>
            <p className="hero-subtitle animate-hero-in delay-2">
              From the ancient ruins of Mohenjo-daro to the peaks of the Karakoram — explore it all.
            </p>
            <div className="animate-hero-in delay-3">
              <SearchBar />
            </div>
            <div className="hero-cta mt-4 animate-hero-in delay-4">
              <Link to="/attractions" className="btn epk-btn-accent me-3 btn-lg">Explore Attractions</Link>
              <Link to="/events" className="btn btn-outline-light btn-lg">Browse Events</Link>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="hero-dots" style={{ opacity: contentOpacity }}>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === activeSlide ? 'hero-dot--active' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator" style={{ opacity: contentOpacity }}>
          <span>Scroll to explore</span>
          <div className="hero-scroll-arrow" />
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip">
        <div className="container">
          <div className="row text-center">
            <div className="col-6 col-md-3">
              <h3 className="stat-number">{stats.totalAttractions}</h3>
              <p className="stat-label">Attractions</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="stat-number">{stats.totalEvents}</h3>
              <p className="stat-label">Events</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="stat-number">{stats.totalUsers}</h3>
              <p className="stat-label">Registered Users</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="stat-number">{stats.totalRegistrations}</h3>
              <p className="stat-label">Event RSVPs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Attractions</h2>
            <p className="section-subtitle">Handpicked gems from across Pakistan</p>
          </div>
          <div className="row g-4">
            {attractions.map((a) => (
              <div key={a._id} className="col-md-6 col-lg-4">
                <AttractionCard attraction={a} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/attractions" className="btn epk-btn-primary btn-lg">View All Attractions</Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-light-epk">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Don't miss out on Pakistan's most exciting events</p>
          </div>
          <div className="row g-4">
            {events.map((e) => (
              <div key={e._id} className="col-md-6 col-lg-3">
                <EventCard event={e} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/events" className="btn epk-btn-accent btn-lg">View All Events</Link>
          </div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore by Category</h2>
          </div>
          <div className="row g-3">
            {['historical', 'natural', 'religious', 'adventure', 'cultural'].map((cat) => (
              <div key={cat} className="col-6 col-md-4 col-lg-2">
                <Link to={`/attractions?category=${cat}`} className={`category-pill category-pill-${cat}`}>
                  <i className={`bi ${catIcon(cat)} mb-2`} style={{ fontSize: '1.5rem' }}></i>
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const catIcon = (cat) => {
  const icons = { historical: 'bi-bank', natural: 'bi-tree', religious: 'bi-moon-stars', adventure: 'bi-activity', cultural: 'bi-music-note-beamed' };
  return icons[cat] || 'bi-compass';
};

export default Home;
