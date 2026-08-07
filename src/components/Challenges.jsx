import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Challenges() {
    const [challenges, setChallenges] = useState([]);
    const [myChallenges, setMyChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [allRes, myRes] = await Promise.all([
                api.get('/challenges/'),
                api.get('/my-challenges/')
            ]);
            setChallenges(allRes.data);
            setMyChallenges(myRes.data);
        } catch (error) {
            console.error('Error fetching challenges:', error);
        } finally {
            setLoading(false);
        }
    };

    const joinChallenge = async (challengeId) => {
        try {
            await api.post(`/challenges/${challengeId}/join/`);
            fetchData();
        } catch (error) {
            alert('Already joined this challenge or error occurred');
        }
    };

    const updateProgress = async (challengeId, progress) => {
        try {
            await api.post(`/challenges/${challengeId}/update_progress/`, { progress });
            fetchData();
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const isJoined = (challengeId) => {
        return myChallenges.some(uc => uc.challenge.id === challengeId && !uc.completed);
    };

    const isCompleted = (challengeId) => {
        return myChallenges.some(uc => uc.challenge.id === challengeId && uc.completed);
    };

    const getMyChallenge = (challengeId) => {
        return myChallenges.find(uc => uc.challenge.id === challengeId);
    };

    if (loading) return <div className="loading">Loading challenges...</div>;

    const getDifficultyColor = (difficulty) => {
        const colors = { easy: '#2d6a4f', medium: '#d4a373', hard: '#e76f51' };
        return colors[difficulty] || '#6b7280';
    };

    return (
        <>
            <h2 className="section-title">Challenges</h2>
            <p className="section-subtitle">Join challenges to reduce your carbon footprint and earn points!</p>

            <div className="challenges-grid">
                {challenges.map((challenge) => {
                    const joined = isJoined(challenge.id);
                    const completed = isCompleted(challenge.id);
                    const myChallenge = getMyChallenge(challenge.id);

                    return (
                        <div key={challenge.id} className="challenge-card">
                            <div className="challenge-header">
                                <span className="challenge-icon">{challenge.icon || '🎯'}</span>
                                <span className="challenge-points">+{challenge.points} pts</span>
                            </div>
                            <h3>{challenge.name}</h3>
                            <p>{challenge.description}</p>
                            <div className="challenge-meta">
                                <span>⏱️ {challenge.duration_days} days</span>
                                <span>🌱 Saves {challenge.co2_saved_estimate} kg</span>
                                <span className="challenge-difficulty" style={{ color: getDifficultyColor(challenge.difficulty) }}>
                                    {challenge.difficulty}
                                </span>
                            </div>

                            {completed && (
                                <div className="challenge-completed">✅ Completed!</div>
                            )}

                            {joined && !completed && (
                                <div className="challenge-progress">
                                    <label>Progress: {myChallenge?.progress || 0}%</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={myChallenge?.progress || 0}
                                        onChange={(e) => updateProgress(challenge.id, parseInt(e.target.value))}
                                        className="progress-slider"
                                    />
                                    <span style={{ fontSize: '13px', color: '#6b6258' }}>
                                        {myChallenge?.days_remaining || 0} days remaining
                                    </span>
                                </div>
                            )}

                            {!joined && !completed && (
                                <button 
                                    className="btn-primary" 
                                    onClick={() => joinChallenge(challenge.id)}
                                    style={{ width: '100%' }}
                                >
                                    Join Challenge
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Challenges;