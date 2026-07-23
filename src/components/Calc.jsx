import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

function Calculator() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [answers, setAnswers] = useState({
        commute_mode: 'car',
        flights_per_year: 0,
        diet_type: 'mixed',
        electricity_bill: 'medium',
        shopping_frequency: 'few-months',
        waste_amount: 'average'
    });

    const questions = [
        { key: 'commute_mode', label: '🚗 How do you commute?', options: [
            { value: 'car', label: 'Car' },
            { value: 'transit', label: 'Public Transit' },
            { value: 'bike', label: 'Bike' },
            { value: 'walk', label: 'Walk' }
        ]},
        { key: 'flights_per_year', label: '✈️ How many flights per year?', options: [
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4+' }
        ]},
        { key: 'diet_type', label: '🍔 What\'s your diet?', options: [
            { value: 'meat-heavy', label: 'Meat Heavy' },
            { value: 'mixed', label: 'Mixed' },
            { value: 'veg', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' }
        ]},
        { key: 'electricity_bill', label: '💡 Monthly electricity bill?', options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
        ]},
        { key: 'shopping_frequency', label: '🛍️ How often do you buy new clothes?', options: [
            { value: 'monthly', label: 'Monthly' },
            { value: 'few-months', label: 'Every Few Months' },
            { value: 'yearly', label: 'Yearly' },
            { value: 'rarely', label: 'Rarely' }
        ]},
        { key: 'waste_amount', label: '🗑️ How much waste do you produce?', options: [
            { value: 'lot', label: 'A Lot' },
            { value: 'average', label: 'Average' },
            { value: 'little', label: 'Little' }
        ]}
    ];

    const handleChange = (key, value) => {
        setAnswers({ ...answers, [key]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/footprints/', answers);
            setResult(response.data);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to calculate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '672px',
        margin: '0 auto'
    };

    const formStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    const successStyle = {
        background: '#dcfce7',
        border: '2px solid #15803d',
        borderRadius: '12px',
        padding: '32px',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#15803d', textAlign: 'center', marginBottom: '24px' }}>
                Calculate Your Footprint 🌍
            </h2>

            {!result ? (
                <form onSubmit={handleSubmit} style={formStyle}>
                    {questions.map((q) => (
                        <div key={q.key} style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                                {q.label}
                            </label>
                            <select
                                value={answers[q.key]}
                                onChange={(e) => handleChange(q.key, e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            >
                                {q.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            backgroundColor: '#15803d',
                            color: 'white',
                            padding: '16px',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: loading ? 0.5 : 1
                        }}
                    >
                        {loading ? 'Calculating...' : 'Calculate My Footprint'}
                    </button>
                </form>
            ) : (
                <div style={successStyle}>
                    <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px' }}>
                        Your footprint: {result.total_kg} kg CO₂/year
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                        Redirecting to dashboard...
                    </p>
                    <div style={{ width: '100%', background: '#e5e7eb', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            background: '#15803d',
                            borderRadius: '8px',
                            animation: 'pulse 1.5s ease-in-out infinite',
                            width: '100%'
                        }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calculator;