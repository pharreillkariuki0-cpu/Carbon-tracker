import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const response = await api.get('/recommendations/personalized/');
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading recommendations...</div>;

    if (recommendations.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <p style={{ color: '#6b6258', marginBottom: '16px' }}>
                    No recommendations yet. Complete your footprint calculation to get personalized suggestions.
                </p>
            </div>
        );
    }

    const getCategoryIcon = (category) => {
        const icons = {
            'transport': '🚗',
            'food': '🍔',
            'home': '🏠',
            'shopping': '🛍️'
        };
        return icons[category] || '💡';
    };

    const getTypeBadge = (type) => {
        const badges = {
            'product': 'Product',
            'service': 'Service',
            'provider': 'Provider',
            'tip': 'Tip'
        };
        return badges[type] || type;
    };

    return (
        <div>
            <h2 className="section-title">AI Recommendations</h2>
            <p className="section-subtitle">Personalized suggestions to reduce your carbon footprint</p>

            <div className="recommendations-grid">
                {recommendations.map((rec) => (
                    <div key={rec.id} className="recommendation-card">
                        <div className="recommendation-header">
                            <span className="recommendation-icon">{getCategoryIcon(rec.category)}</span>
                            <span className="recommendation-type">{getTypeBadge(rec.type)}</span>
                        </div>
                        <h3>{rec.title}</h3>
                        <p>{rec.description}</p>
                        <div className="recommendation-meta">
                            <span>🌱 Saves {rec.co2_saved} kg CO₂/year</span>
                            {rec.cost_saved && (
                                <span>💰 Saves ${rec.cost_saved}/year</span>
                            )}
                        </div>
                        {rec.url && (
                            <a href={rec.url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-block', marginTop: '12px', padding: '8px 20px', fontSize: '13px' }}>
                                Learn More
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommendations;