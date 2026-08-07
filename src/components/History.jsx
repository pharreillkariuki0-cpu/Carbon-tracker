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
            <div className="card" style={{ textAlign: 'center', padding: '56px 40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📜</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: '#1e1e2a' }}>No history yet</h3>
                <p style={{ color: '#6b6258' }}>Calculate your first carbon footprint to start tracking.</p>
            </div>
        );
    }

    const totalTransport = history.reduce((sum, i) => sum + i.transport_kg, 0);
    const totalFood = history.reduce((sum, i) => sum + i.food_kg, 0);
    const totalHome = history.reduce((sum, i) => sum + i.home_kg, 0);
    const totalShopping = history.reduce((sum, i) => sum + i.shopping_kg, 0);
    const total = history.reduce((sum, i) => sum + i.total_kg, 0);

    return (
        <>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transport</th>
                            <th>Food</th>
                            <th>Home</th>
                            <th>Shopping</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td>{formatDate(item.date_calculated)}</td>
                                <td>{item.transport_kg}</td>
                                <td>{item.food_kg}</td>
                                <td>{item.home_kg}</td>
                                <td>{item.shopping_kg}</td>
                                <td style={{ fontWeight: 600, color: '#2d6a4f' }}>{item.total_kg} kg</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td>{totalTransport.toFixed(0)}</td>
                            <td>{totalFood.toFixed(0)}</td>
                            <td>{totalHome.toFixed(0)}</td>
                            <td>{totalShopping.toFixed(0)}</td>
                            <td style={{ color: '#2d6a4f', fontWeight: 700 }}>{total.toFixed(0)} kg</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '16px', color: '#b5aaa0', fontSize: '14px' }}>
                {history.length} calculations
            </p>
        </>
    );
}

export default History;