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
            <div style={{ textAlign: 'center', padding: '48px 0', background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '60px', marginBottom: '16px' }}>💡</div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>No Tips Available</h3>
                <p style={{ color: '#6b7280' }}>Complete a footprint calculation to get personalized tips.</p>
            </div>
        );
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
    };

    const tipCardStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s'
    };

    return (
        <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#15803d', textAlign: 'center', marginBottom: '24px' }}>
                Personalized Climate Tips 💡
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px' }}>
                Based on your lifestyle, here are ways to reduce your carbon footprint.
            </p>

            <div style={gridStyle}>
                {tips.map((tip) => (
                    <div key={tip.id} style={tipCardStyle}>
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '32px', marginRight: '16px' }}>{tip.icon || '💡'}</div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{tip.title}</h3>
                                <p style={{ color: '#6b7280', marginBottom: '8px' }}>{tip.description}</p>
                                <span style={{ color: '#15803d', fontWeight: 'bold' }}>
                                    🌱 Saves {tip.co2_saved} kg CO₂/year
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tips;