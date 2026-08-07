import React, { useState, useEffect } from 'react';
import api from '../api/client';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [myTeams, setMyTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newTeam, setNewTeam] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [allRes, myRes] = await Promise.all([
                api.get('/teams/'),
                api.get('/teams/my_teams/')
            ]);
            setTeams(allRes.data);
            setMyTeams(myRes.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const joinTeam = async (teamId) => {
        try {
            await api.post(`/teams/${teamId}/join/`);
            fetchData();
        } catch (error) {
            alert('Error joining team');
        }
    };

    const leaveTeam = async (teamId) => {
        try {
            await api.post(`/teams/${teamId}/leave/`);
            fetchData();
        } catch (error) {
            alert('Error leaving team');
        }
    };

    const createTeam = async (e) => {
        e.preventDefault();
        try {
            await api.post('/teams/', newTeam);
            setNewTeam({ name: '', description: '' });
            setShowCreate(false);
            fetchData();
        } catch (error) {
            alert('Error creating team');
        }
    };

    const isMember = (teamId) => {
        return myTeams.some(t => t.id === teamId);
    };

    if (loading) return <div className="loading">Loading teams...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 className="section-title">Teams</h2>
                <button className="btn-primary" onClick={() => setShowCreate(!showCreate)}>
                    {showCreate ? 'Cancel' : 'Create Team'}
                </button>
            </div>
            <p className="section-subtitle">Join teams and compete with others!</p>

            {showCreate && (
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3>Create New Team</h3>
                    <form onSubmit={createTeam}>
                        <div className="form-group">
                            <label>Team Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newTeam.name}
                                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="input-field"
                                value={newTeam.description}
                                onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                                rows="3"
                            />
                        </div>
                        <button type="submit" className="btn-primary">Create Team</button>
                    </form>
                </div>
            )}

            <div className="teams-grid">
                {teams.map((team) => {
                    const member = isMember(team.id);
                    return (
                        <div key={team.id} className="team-card">
                            <div className="team-header">
                                <h3>{team.name}</h3>
                                <span className="team-members">👥 {team.member_count} members</span>
                            </div>
                            <p>{team.description}</p>
                            <div className="team-footer">
                                <span>🏆 {team.total_points} pts</span>
                                {member ? (
                                    <button className="btn-danger" onClick={() => leaveTeam(team.id)}>
                                        Leave
                                    </button>
                                ) : (
                                    <button className="btn-primary" onClick={() => joinTeam(team.id)}>
                                        Join
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Teams;