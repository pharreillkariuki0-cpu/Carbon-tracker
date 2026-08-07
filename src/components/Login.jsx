import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            onLogin();
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Welcome <span>back</span></h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary btn-block"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '18px', color: '#6b6258', fontSize: '14px' }}>
                Don't have an account? <Link to="/register" style={{ color: '#2d6a4f', fontWeight: 600 }}>Sign up</Link>
            </p>
        </div>
    );
}

export default Login;