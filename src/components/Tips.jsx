import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Tips() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await api.get('/tips/personalized/');
                setTips(response.data);
            } catch (error) {
                console.error('Error fetching tips:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTips();
    }, []);

    if (loading) {
        return <div className="loading">Loading tips...</div>;
    }

    if (tips.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '56px 40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: '#1e1e2a' }}>No tips available</h3>
                <p style={{ color: '#6b6258' }}>Complete a footprint calculation to get personalized tips.</p>
            </div>
        );
    }

    return (
        <>
            <div className="tip-grid">
                {tips.map((tip) => (
                    <div key={tip.id} className="tip-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>{tip.title}</h3>
                                <p>{tip.description}</p>
                                <span className="saved">🌱 Saves {tip.co2_saved} kg CO₂ per year</span>
                            </div>
                            <span className="badge">{tip.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Tips;