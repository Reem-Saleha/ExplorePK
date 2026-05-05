import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const SearchBar = ({ placeholder = 'Search attractions, cities, events...' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/attractions?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form className="epk-search-bar" onSubmit={handleSearch}>
      <div className="input-group input-group-lg">
        <span className="input-group-text bg-white border-0">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-0"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn epk-btn-primary px-4" type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
