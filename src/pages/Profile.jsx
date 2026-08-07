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

    return (
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '56px', marginBottom: '8px' }}>👤</div>
                <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#1e1e2a', marginBottom: '4px' }}>Your Profile</h2>
                <p style={{ color: '#6b6258', marginBottom: '24px' }}>Your carbon footprint summary</p>

                <div className="stats-grid" style={{ maxWidth: '380px', margin: '0 auto' }}>
                    <div className="stat-card">
                        <p className="label">Calculations</p>
                        <p className="number">{stats?.total_calculations || 0}</p>
                    </div>
                    <div className="stat-card">
                        <p className="label">Latest Footprint</p>
                        <p className="number">{stats?.latest_total || 0} kg</p>
                    </div>
                </div>

                <div style={{ marginTop: '24px', padding: '16px', background: '#f8f5f0', borderRadius: '14px', border: '1px solid #efeae3' }}>
                    <p style={{ fontSize: '14px', color: '#6b6258' }}>
                        💡 Calculate your footprint monthly to track your progress.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;