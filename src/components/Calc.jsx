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
        { key: 'commute_mode', label: 'How do you commute?', options: [
            { value: 'car', label: 'Car' },
            { value: 'transit', label: 'Public Transit' },
            { value: 'bike', label: 'Bike' },
            { value: 'walk', label: 'Walk' }
        ]},
        { key: 'flights_per_year', label: 'Flights per year', options: [
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4+' }
        ]},
        { key: 'diet_type', label: 'Your diet', options: [
            { value: 'meat-heavy', label: 'Meat Heavy' },
            { value: 'mixed', label: 'Mixed' },
            { value: 'veg', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' }
        ]},
        { key: 'electricity_bill', label: 'Monthly electricity bill', options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
        ]},
        { key: 'shopping_frequency', label: 'How often do you buy new clothes?', options: [
            { value: 'monthly', label: 'Monthly' },
            { value: 'few-months', label: 'Every Few Months' },
            { value: 'yearly', label: 'Yearly' },
            { value: 'rarely', label: 'Rarely' }
        ]},
        { key: 'waste_amount', label: 'How much waste do you produce?', options: [
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

    return (
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e1e2a', textAlign: 'center', marginBottom: '24px' }}>
                Calculate your footprint
            </h2>

            {!result ? (
                <form className="card" onSubmit={handleSubmit}>
                    {questions.map((q) => (
                        <div key={q.key} style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '14px', color: '#1e1e2a' }}>
                                {q.label}
                            </label>
                            <select
                                value={answers[q.key]}
                                onChange={(e) => handleChange(q.key, e.target.value)}
                                className="input-field"
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
                        className="btn-primary btn-block"
                    >
                        {loading ? 'Calculating...' : 'Calculate'}
                    </button>
                </form>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1e1e2a', marginBottom: '4px' }}>
                        {result.total_kg} kg CO₂ per year
                    </h3>
                    <p style={{ color: '#6b6258', marginBottom: '20px' }}>Redirecting to dashboard...</p>
                    <div className="progress-bar">
                        <div className="fill"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calculator;