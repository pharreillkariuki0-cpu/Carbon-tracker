import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calc';
import Tips from './components/Tips';
import History from './components/History';
import Profile from './pages/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    };

    if (loading) {
        return (
            <div className="loading" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '20px', color: '#15803d' }}>Loading...</div>
            </div>
        );
    }

    return (
        <Router>
            <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <div className="container" style={{ padding: '32px 20px' }}>
                    <Routes>
                        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
                        <Route path="/login" element={
                            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
                        } />
                        <Route path="/register" element={
                            isAuthenticated ? <Navigate to="/" /> : <Register onRegister={handleLogin} />
                        } />
                        <Route path="/dashboard" element={
                            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                        } />
                        <Route path="/calculator" element={
                            isAuthenticated ? <Calculator /> : <Navigate to="/login" />
                        } />
                        <Route path="/tips" element={
                            isAuthenticated ? <Tips /> : <Navigate to="/login" />
                        } />
                        <Route path="/history" element={
                            isAuthenticated ? <History /> : <Navigate to="/login" />
                        } />
                        <Route path="/profile" element={
                            isAuthenticated ? <Profile /> : <Navigate to="/login" />
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;