import React, { useState, useEffect } from 'react';
import api from '../api/client';

function ActionPlan() {
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasFootprint, setHasFootprint] = useState(false);

    useEffect(() => {
        checkFootprint();
        fetchPlan();
    }, []);

    const checkFootprint = async () => {
        try {
            const response = await api.get('/footprints/');
            setHasFootprint(response.data.length > 0);
        } catch (error) {
            console.error('Error checking footprint:', error);
        }
    };

    const fetchPlan = async () => {
        try {
            const response = await api.get('/action-plans/');
            if (response.data.length > 0) {
                setPlan(response.data[0]);
            }
        } catch (error) {
            console.error('Error fetching plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const generatePlan = async () => {
        try {
            const response = await api.post('/action-plans/');
            setPlan(response.data);
        } catch (error) {
            alert('Please calculate your footprint first');
        }
    };

    const completeItem = async (itemId) => {
        try {
            await api.post(`/action-plans/${plan.id}/complete_item/`, { item_id: itemId });
            fetchPlan();
        } catch (error) {
            console.error('Error completing item:', error);
        }
    };

    if (loading) return <div className="loading">Loading action plan...</div>;

    const getStatusBadge = (status) => {
        const statusMap = {
            'pending': '⏳ Pending',
            'in_progress': '🔄 In Progress',
            'completed': '✅ Completed',
            'skipped': '⏭️ Skipped'
        };
        return statusMap[status] || status;
    };

    return (
        <>
            <h2 className="section-title">Your Action Plan</h2>
            <p className="section-subtitle">Personalized steps to reduce your carbon footprint</p>

            {!plan ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                    {hasFootprint ? (
                        <>
                            <p style={{ color: '#6b6258', marginBottom: '16px' }}>
                                Ready to take action? Generate your personalized plan.
                            </p>
                            <button className="btn-primary" onClick={generatePlan}>
                                Generate My Action Plan
                            </button>
                        </>
                    ) : (
                        <>
                            <p style={{ color: '#6b6258', marginBottom: '16px' }}>
                                Calculate your carbon footprint first to get a personalized action plan.
                            </p>
                            <a href="/calculator">
                                <button className="btn-primary">Go to Calculator</button>
                            </a>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className="plan-progress">
                        <h4>Progress: {plan.progress}% complete</h4>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${plan.progress}%` }}></div>
                        </div>
                        {plan.completed_at && (
                            <p style={{ color: '#2d6a4f', fontWeight: 600, marginTop: '8px' }}>
                                🎉 Plan completed!
                            </p>
                        )}
                    </div>

                    <div className="plan-items">
                        {[1, 2, 3, 4].map((week) => {
                            const weekItems = plan.items?.filter(item => item.week === week) || [];
                            if (weekItems.length === 0) return null;
                            return (
                                <div key={week} className="week-section">
                                    <h3 className="week-title">Week {week}</h3>
                                    {weekItems.map((item) => (
                                        <div key={item.id} className="plan-item">
                                            <div className="item-info">
                                                <span className={`item-status ${item.status === 'completed' ? 'completed' : ''}`}>
                                                    {getStatusBadge(item.status)}
                                                </span>
                                                <h4>{item.title}</h4>
                                                <p>{item.description}</p>
                                                <span className="item-saved">🌱 Saves {item.co2_saved} kg CO₂/year</span>
                                            </div>
                                            {item.status !== 'completed' && (
                                                <button 
                                                    className="btn-primary" 
                                                    onClick={() => completeItem(item.id)}
                                                    style={{ padding: '8px 20px', fontSize: '13px' }}
                                                >
                                                    Complete
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
}

export default ActionPlan;