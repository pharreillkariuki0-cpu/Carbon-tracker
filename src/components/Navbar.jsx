import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Carbon<span>Tracker</span></Link>

                <div className="nav-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/calculator">Calculate</Link>
                            <Link to="/tips">Tips</Link>
                            <Link to="/history">History</Link>
                            <Link to="/challenges">Challenges</Link>
                            <Link to="/badges">Badges</Link>
                            <Link to="/action-plan">Action Plan</Link>
                            <Link to="/points">Points</Link>
                            <Link to="/progress">Progress</Link>
                            <Link to="/teams">Teams</Link>
                            <Link to="/community">Community</Link>
                            <Link to="/recommendations">AI Tips</Link>
                            <Link to="/profile">Profile</Link>
                            <button onClick={handleLogout} className="btn-danger">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="signup-btn">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;