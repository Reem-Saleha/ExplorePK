import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import AttractionCard from '../components/AttractionCard';
import Spinner from '../components/Spinner';
import '../styles/attractions.css';

const CATEGORIES = ['historical', 'natural', 'religious', 'adventure', 'cultural'];
const PER_PAGE = 6;

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';
  const category = searchParams.get('category') || '';

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const fetchAttractions = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (city) params.city = city;
        if (category) params.category = category;
        const res = await api.get('/attractions', { params });
        setAttractions(res.data);
        const uniqueCities = [...new Set(res.data.map((a) => a.city))];
        setCities(uniqueCities);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttractions();
    setPage(1);
  }, [search, city, category]);

  const updateFilter = (key, value) => {
    const params = {};
    if (search) params.search = search;
    if (city) params.city = city;
    if (category) params.category = category;
    if (value) params[key] = value;
    else delete params[key];
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter('search', localSearch);
  };

  const paginated = attractions.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(attractions.length / PER_PAGE);

  return (
    <div className="attractions-page section-padding">
      <div className="container">
        <div className="page-header mb-4">
          <h2 className="section-title">Tourist Attractions</h2>
          <p className="section-subtitle">Explore Pakistan's most stunning destinations</p>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div className="filter-sidebar">
              <h5 className="filter-heading">Filter Attractions</h5>

              <form onSubmit={handleSearchSubmit} className="mb-4">
                <label className="filter-label">Search</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                  />
                  <button className="btn epk-btn-primary" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>

              <div className="mb-4">
                <label className="filter-label">City</label>
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="filter-label">Category</label>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className={`btn btn-sm ${!category ? 'epk-btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => updateFilter('category', '')}
                  >All</button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`btn btn-sm ${category === cat ? 'epk-btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => updateFilter('category', cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {(search || city || category) && (
                <button className="btn btn-sm btn-danger w-100" onClick={() => { setSearchParams({}); setLocalSearch(''); }}>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="col-lg-9">
            {loading ? <Spinner /> : (
              <>
                <p className="results-count">{attractions.length} attractions found</p>
                {attractions.length === 0 ? (
                  <div className="empty-state">
                    <i className="bi bi-compass"></i>
                    <p>No attractions found. Try different filters.</p>
                  </div>
                ) : (
                  <>
                    <div className="row g-4">
                      {paginated.map((a) => (
                        <div key={a._id} className="col-md-6 col-xl-4">
                          <AttractionCard
                            attraction={a}
                            onDeleted={(id) => setAttractions((prev) => prev.filter((x) => x._id !== id))}
                          />
                        </div>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <nav className="mt-5">
                        <ul className="pagination justify-content-center">
                          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
                          </li>
                          {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                            </li>
                          ))}
                          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attractions;
