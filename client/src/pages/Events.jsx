import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import EventCard from '../components/EventCard';
import Spinner from '../components/Spinner';
import '../styles/events.css';

const CATEGORIES = ['cultural', 'music', 'sports', 'youth', 'food', 'other'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || '';
  const city = searchParams.get('city') || '';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (city) params.city = city;
        if (dateFrom) params.dateFrom = dateFrom;
        if (dateTo) params.dateTo = dateTo;
        const res = await api.get('/events', { params });
        setEvents(res.data);
        setCities([...new Set(res.data.map((e) => e.city).filter(Boolean))]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [category, city, dateFrom, dateTo]);

  const updateFilter = (key, value) => {
    const params = {};
    if (category) params.category = category;
    if (city) params.city = city;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    if (value) params[key] = value;
    else delete params[key];
    setSearchParams(params);
  };

  return (
    <div className="events-page section-padding">
      <div className="container">
        <div className="page-header mb-4">
          <h2 className="section-title">Events in Pakistan</h2>
          <p className="section-subtitle">Register for Pakistan's most exciting festivals, concerts, and more</p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs mb-4">
          <button className={`tab-btn ${!category ? 'active' : ''}`} onClick={() => updateFilter('category', '')}>All</button>
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`tab-btn ${category === cat ? 'active' : ''}`}
              onClick={() => updateFilter('category', cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="filter-date-label">Filter Cities</label>
            <select className="form-select" value={city} onChange={(e) => updateFilter('city', e.target.value)}>
              <option value="">All Cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="filter-date-label">FROM</label>
            <input type="date" className="form-control" value={dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="filter-date-label">TO</label>
            <input type="date" className="form-control" value={dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)} />
          </div>
          {(category || city || dateFrom || dateTo) && (
            <div className="col-md-3">
              <button className="btn btn-outline-danger w-100" onClick={() => setSearchParams({})}>Clear Filters</button>
            </div>
          )}
        </div>

        {loading ? <Spinner /> : (
          <>
            <p className="results-count">{events.length} events found</p>
            {events.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-calendar-x"></i>
                <p>No events found. Try different filters.</p>
              </div>
            ) : (
              <div className="row g-4">
                {events.map((e) => (
                  <div key={e._id} className="col-md-6 col-lg-3">
                    <EventCard
                      event={e}
                      onDeleted={(id) => setEvents((prev) => prev.filter((x) => x._id !== id))}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
