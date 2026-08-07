import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Badges() {
    const [badges, setBadges] = useState([]);
    const [myBadges, setMyBadges] = useState([]);
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [badgesRes, myBadgesRes, pointsRes] = await Promise.all([
                api.get('/badges/'),
                api.get('/my-badges/'),
                api.get('/my-points/')
            ]);
            setBadges(badgesRes.data);
            setMyBadges(myBadgesRes.data);
            setPoints(pointsRes.data[0]?.total || 0);
        } catch (error) {
            console.error('Error fetching badges:', error);
        } finally {
            setLoading(false);
        }
    };

    const hasBadge = (badgeId) => {
        return myBadges.some(mb => mb.badge.id === badgeId);
    };

    if (loading) return <div className="loading">Loading badges...</div>;

    return (
        <>
            <div className="points-display">
                <h2 className="section-title" style={{ color: '#fff' }}>Your Points</h2>
                <div className="points-total">{points} pts</div>
            </div>

            <h2 className="section-title">Badges</h2>
            <p className="section-subtitle">Earn badges by taking climate action!</p>

            <div className="badges-grid">
                {badges.map((badge) => {
                    const earned = hasBadge(badge.id);
                    return (
                        <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                            <div className="badge-icon">{badge.icon || '🏅'}</div>
                            <h4>{badge.name}</h4>
                            <p>{badge.description}</p>
                            <span className="badge-requirement">📋 {badge.requirement}</span>
                            <span className="badge-points">+{badge.points} pts</span>
                            {earned && <span className="badge-earned">✅ Earned!</span>}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Badges;