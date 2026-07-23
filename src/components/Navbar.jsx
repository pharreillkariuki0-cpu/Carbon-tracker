import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const navStyle = {
        backgroundColor: '#15803d',
        color: 'white',
        padding: '16px 0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const logoStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'white'
    };

    const linksStyle = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.3s'
    };

    const logoutBtnStyle = {
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '6px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <nav style={navStyle}>
            <div style={containerStyle}>
                <Link to="/" style={logoStyle}>🌍 Climate Tracker</Link>
                
                <div style={linksStyle}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                            <Link to="/calculator" style={linkStyle}>Calculate</Link>
                            <Link to="/tips" style={linkStyle}>Tips</Link>
                            <Link to="/history" style={linkStyle}>History</Link>
                            <Link to="/profile" style={linkStyle}>Profile</Link>
                            <button onClick={handleLogout} style={logoutBtnStyle}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={linkStyle}>Login</Link>
                            <Link to="/register" style={{
                                ...linkStyle,
                                backgroundColor: '#16a34a',
                                padding: '6px 16px',
                                borderRadius: '4px'
                            }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;