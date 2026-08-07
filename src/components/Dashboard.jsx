import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import api from '../api/client';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [latestFootprint, setLatestFootprint] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, footprintRes] = await Promise.all([
                    api.get('/footprints/stats/'),
                    api.get('/footprints/')
                ]);
                setStats(statsRes.data);
                if (footprintRes.data.length > 0) {
                    setLatestFootprint(footprintRes.data[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading your dashboard...</div>;
    }

    if (!stats || stats.total_calculations === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '56px 40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: '#1e1e2a' }}>No data yet</h3>
                <p style={{ color: '#6b6258', marginBottom: '20px' }}>
                    Calculate your first carbon footprint to see your dashboard.
                </p>
                <Link to="/calculator">
                    <button className="btn-primary">Calculate Now</button>
                </Link>
            </div>
        );
    }

    const pieData = latestFootprint ? {
        labels: ['Transport', 'Food', 'Home', 'Shopping'],
        datasets: [{
            data: [
                latestFootprint.transport_kg,
                latestFootprint.food_kg,
                latestFootprint.home_kg,
                latestFootprint.shopping_kg
            ],
            backgroundColor: ['#2d6a4f', '#409f7a', '#7ec4a8', '#b8d9cc'],
            borderWidth: 0,
        }]
    } : null;

    return (
        <>
            <div className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <p className="label">Latest Footprint</p>
                        <p className="number">{stats.latest_total} <span style={{ fontSize: '16px', fontWeight: 400, color: '#6b6258' }}>kg</span></p>
                        <p className="sub">CO₂ per year</p>
                    </div>
                    <div className="stat-card">
                        <p className="label">Average</p>
                        <p className="number">{stats.average_total} <span style={{ fontSize: '16px', fontWeight: 400, color: '#6b6258' }}>kg</span></p>
                        <p className="sub">CO₂ per year</p>
                    </div>
                    <div className="stat-card">
                        <p className="label">Calculations</p>
                        <p className="number">{stats.total_calculations}</p>
                        <p className="sub">Total entries</p>
                    </div>
                    <div className="stat-card">
                        <p className="label">Improvement</p>
                        <p className="number" style={{ color: stats.improvement > 0 ? '#2d6a4f' : '#e76f51' }}>
                            {stats.improvement > 0 ? `-${stats.improvement}` : stats.improvement} <span style={{ fontSize: '16px', fontWeight: 400, color: '#6b6258' }}>kg</span>
                        </p>
                        <p className="sub">First → Latest</p>
                    </div>
                </div>
            </div>

            <div className="grid-2">
                <div className="card">
                    <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#1e1e2a' }}>Breakdown by category</h4>
                    <div style={{ maxWidth: '280px', margin: '0 auto' }}>
                        {pieData && <Doughnut data={pieData} />}
                    </div>
                </div>

                <div className="card">
                    <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#1e1e2a' }}>Your breakdown</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0ebe3', paddingBottom: '10px' }}>
                            <span style={{ color: '#6b6258' }}>Transport</span>
                            <span style={{ fontWeight: 600 }}>{latestFootprint?.transport_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0ebe3', paddingBottom: '10px' }}>
                            <span style={{ color: '#6b6258' }}>Food</span>
                            <span style={{ fontWeight: 600 }}>{latestFootprint?.food_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0ebe3', paddingBottom: '10px' }}>
                            <span style={{ color: '#6b6258' }}>Home</span>
                            <span style={{ fontWeight: 600 }}>{latestFootprint?.home_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0ebe3', paddingBottom: '10px' }}>
                            <span style={{ color: '#6b6258' }}>Shopping</span>
                            <span style={{ fontWeight: 600 }}>{latestFootprint?.shopping_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                            <span style={{ fontWeight: 700, color: '#1e1e2a' }}>Total</span>
                            <span style={{ fontSize: '22px', fontWeight: 700, color: '#2d6a4f' }}>{latestFootprint?.total_kg || 0} kg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link to="/calculator">
                    <button className="btn-primary" style={{ marginRight: '14px' }}>Recalculate</button>
                </Link>
                <Link to="/tips">
                    <button className="btn-secondary">View Tips</button>
                </Link>
            </div>
        </>
    );
}

export default Dashboard;