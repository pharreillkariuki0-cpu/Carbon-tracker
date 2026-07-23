import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Profile() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/footprints/stats/');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    const containerStyle = {
        maxWidth: '672px',
        margin: '0 auto'
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        maxWidth: '400px',
        margin: '0 auto'
    };

    const statBoxStyle = {
        background: '#f0fdf4',
        borderRadius: '8px',
        padding: '16px'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={{ fontSize: '60px', marginBottom: '16px' }}>👤</div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px' }}>Climate Hero</h2>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>🌍 Making a difference, one calculation at a time</p>

                <div style={gridStyle}>
                    <div style={statBoxStyle}>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Calculations</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>
                            {stats?.total_calculations || 0}
                        </p>
                    </div>
                    <div style={statBoxStyle}>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Latest Footprint</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                            {stats?.latest_total || 0} kg
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '24px', padding: '16px', background: '#fefce8', borderRadius: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        💡 Tip: Calculate your footprint monthly to track your progress!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;