import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Attractions from './pages/Attractions';
import AttractionDetail from './pages/AttractionDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddEditAttraction from './pages/AddEditAttraction';
import AddEditEvent from './pages/AddEditEvent';
import TravelBot from './components/TravelBot';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/attractions/:id" element={<AttractionDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute><UserDashboard /></ProtectedRoute>
              } />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminRequired><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/attractions/add" element={
                <ProtectedRoute adminRequired><AddEditAttraction /></ProtectedRoute>
              } />
              <Route path="/admin/attractions/edit/:id" element={
                <ProtectedRoute adminRequired><AddEditAttraction /></ProtectedRoute>
              } />
              <Route path="/admin/events/add" element={
                <ProtectedRoute adminRequired><AddEditEvent /></ProtectedRoute>
              } />
              <Route path="/admin/events/edit/:id" element={
                <ProtectedRoute adminRequired><AddEditEvent /></ProtectedRoute>
              } />

              {/* 404 fallback */}
              <Route path="*" element={
                <div className="container text-center py-5">
                  <h2>404 - Page Not Found</h2>
                  <a href="/" className="btn epk-btn-primary mt-3">Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <TravelBot />
      </Router>
    </AuthProvider>
  );
};

export default App;
