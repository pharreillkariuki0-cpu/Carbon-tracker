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
            <div style={{ textAlign: 'center', padding: '48px 0', background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '60px', marginBottom: '16px' }}>📊</div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>No Data Yet</h3>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                    Calculate your first carbon footprint to see your dashboard.
                </p>
                <Link to="/calculator">
                    <button style={{
                        backgroundColor: '#15803d',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        Calculate Now →
                    </button>
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
            backgroundColor: ['#3b82f6', '#22c55e', '#eab308', '#8b5cf6'],
            borderWidth: 2,
        }]
    } : null;

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px'
    };

    const statCardStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    const grid2Style = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
    };

    return (
        <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#15803d', marginBottom: '24px' }}>Your Climate Dashboard</h2>

            <div style={statsGridStyle}>
                <div style={statCardStyle}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Latest Footprint</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#15803d' }}>{stats.latest_total} kg</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>CO₂ per year</p>
                </div>
                <div style={statCardStyle}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Average</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb' }}>{stats.average_total} kg</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>CO₂ per year</p>
                </div>
                <div style={statCardStyle}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Calculations</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}>{stats.total_calculations}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>Total entries</p>
                </div>
                <div style={statCardStyle}>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Improvement</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: stats.improvement > 0 ? '#15803d' : '#dc2626' }}>
                        {stats.improvement > 0 ? `-${stats.improvement}` : stats.improvement} kg
                    </p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>First → Latest</p>
                </div>
            </div>

            <div style={grid2Style}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Breakdown by Category</h4>
                    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                        {pieData && <Doughnut data={pieData} />}
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Quick Stats</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                            <span style={{ color: '#6b7280' }}>🚗 Transport</span>
                            <span style={{ fontWeight: 'bold' }}>{latestFootprint?.transport_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                            <span style={{ color: '#6b7280' }}>🍔 Food</span>
                            <span style={{ fontWeight: 'bold' }}>{latestFootprint?.food_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                            <span style={{ color: '#6b7280' }}>🏠 Home</span>
                            <span style={{ fontWeight: 'bold' }}>{latestFootprint?.home_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                            <span style={{ color: '#6b7280' }}>🛍️ Shopping</span>
                            <span style={{ fontWeight: 'bold' }}>{latestFootprint?.shopping_kg || 0} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                            <span style={{ fontWeight: 'bold', color: '#15803d' }}>Total</span>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>{latestFootprint?.total_kg || 0} kg</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Link to="/calculator">
                    <button style={{
                        backgroundColor: '#15803d',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginRight: '12px'
                    }}>
                        Recalculate
                    </button>
                </Link>
                <Link to="/tips">
                    <button style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        View Tips
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;