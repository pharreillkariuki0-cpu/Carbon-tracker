import React, { useState, useEffect } from 'react';
import api from '../api/client';

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/footprints/');
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="loading">Loading history...</div>;
    }

    if (history.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '48px 0', background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '60px', marginBottom: '16px' }}>📜</div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>No History Yet</h3>
                <p style={{ color: '#6b7280' }}>Calculate your first carbon footprint to start tracking your progress.</p>
            </div>
        );
    }

    const totalTransport = history.reduce((sum, i) => sum + i.transport_kg, 0);
    const totalFood = history.reduce((sum, i) => sum + i.food_kg, 0);
    const totalHome = history.reduce((sum, i) => sum + i.home_kg, 0);
    const totalShopping = history.reduce((sum, i) => sum + i.shopping_kg, 0);
    const total = history.reduce((sum, i) => sum + i.total_kg, 0);

    return (
        <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#15803d', textAlign: 'center', marginBottom: '24px' }}>
                Your Calculation History 📜
            </h2>

            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f0fdf4' }}>
                            <tr>
                                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Date</th>
                                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Transport</th>
                                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Food</th>
                                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Home</th>
                                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Shopping</th>
                                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 'bold', color: '#15803d' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody style={{ divideY: '1px solid #e5e7eb' }}>
                            {history.map((item) => (
                                <tr key={item.id} style={{ transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '12px 24px', fontSize: '14px', color: '#6b7280' }}>
                                        {formatDate(item.date_calculated)}
                                    </td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px' }}>{item.transport_kg}</td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px' }}>{item.food_kg}</td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px' }}>{item.home_kg}</td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px' }}>{item.shopping_kg}</td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 'bold', color: '#15803d' }}>
                                        {item.total_kg} kg
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot style={{ backgroundColor: '#f0fdf4', fontWeight: 'bold' }}>
                            <tr>
                                <td style={{ padding: '12px 24px', fontSize: '14px' }}>Total</td>
                                <td style={{ padding: '12px 24px', fontSize: '14px' }}>{totalTransport.toFixed(0)}</td>
                                <td style={{ padding: '12px 24px', fontSize: '14px' }}>{totalFood.toFixed(0)}</td>
                                <td style={{ padding: '12px 24px', fontSize: '14px' }}>{totalHome.toFixed(0)}</td>
                                <td style={{ padding: '12px 24px', fontSize: '14px' }}>{totalShopping.toFixed(0)}</td>
                                <td style={{ padding: '12px 24px', fontSize: '14px', color: '#15803d' }}>{total.toFixed(0)} kg</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
                Showing {history.length} calculations
            </div>
        </div>
    );
}

export default History;