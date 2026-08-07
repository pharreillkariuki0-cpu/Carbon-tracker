import React, { useState, useEffect } from 'react';
import api from '../api/client';

function ProgressReport() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/progress-reports/latest/')
            .then(res => {
                setReport(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading report...</div>;

    if (!report || report.message) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <p style={{ color: '#6b6258', marginBottom: '16px' }}>
                    No progress reports yet. Keep tracking your carbon footprint!
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="section-title">Weekly Progress Report</h2>
            <p className="section-subtitle">Your carbon footprint summary</p>

            <div className="report-container">
                <div className="report-card">
                    <div className="report-header">
                        <span>Week of {new Date(report.week_start).toLocaleDateString()}</span>
                        <span>to {new Date(report.week_end).toLocaleDateString()}</span>
                    </div>
                    <div className="report-stats">
                        <div className="report-stat">
                            <span className="stat-label">Total CO₂</span>
                            <span className="stat-value">{report.total_co2} kg</span>
                        </div>
                        <div className="report-stat">
                            <span className="stat-label">Previous Week</span>
                            <span className="stat-value">{report.previous_co2 || 'N/A'} kg</span>
                        </div>
                        <div className="report-stat">
                            <span className="stat-label">Improvement</span>
                            <span className={`stat-value ${report.improvement > 0 ? 'positive' : 'negative'}`}>
                                {report.improvement > 0 ? `-${report.improvement}` : report.improvement} kg
                            </span>
                        </div>
                        <div className="report-stat">
                            <span className="stat-label">Actions Completed</span>
                            <span className="stat-value">{report.actions_completed}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressReport;