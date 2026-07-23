import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/register/', { username, email, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            onRegister();
        } catch (err) {
            const errorData = err.response?.data;
            if (typeof errorData === 'object') {
                const messages = Object.values(errorData).flat().join(' ');
                setError(messages);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '480px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', color: '#15803d', fontSize: '24px', marginBottom: '24px' }}>
                Join the Climate Action! 🌱
            </h2>
            
            {error && (
                <div style={{
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#b91c1c',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                        required
                        minLength="6"
                    />
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Minimum 6 characters</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        backgroundColor: '#15803d',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        opacity: loading ? 0.5 : 1
                    }}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '16px', color: '#6b7280' }}>
                Already have an account? <Link to="/login" style={{ color: '#15803d' }}>Login</Link>
            </p>
        </div>
    );
}

export default Register;