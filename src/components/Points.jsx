import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Points() {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPoints();
    }, []);

    const fetchPoints = async () => {
        try {
            const response = await api.get('/my-points/');
            setPoints(response.data[0]?.total || 0);
        } catch (error) {
            console.error('Error fetching points:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading points...</div>;

    return (
        <div className="card" style={{ textAlign: 'center', padding: '48px 32px', maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e1e2a', marginBottom: '4px' }}>Your Points</h2>
            <p style={{ fontSize: '48px', fontWeight: 700, color: '#2d6a4f', margin: '16px 0' }}>
                {points} pts
            </p>
            <p style={{ color: '#6b6258' }}>
                Keep taking climate action to earn more points!
            </p>
        </div>
    );
}

export default Points;