import React, { useState, useEffect } from 'react';
import api from '../api/client';

function CommunityPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', content: '', team: '' });
    const [teams, setTeams] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [postsRes, teamsRes] = await Promise.all([
                api.get('/posts/'),
                api.get('/teams/my_teams/')
            ]);
            setPosts(postsRes.data);
            setTeams(teamsRes.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (e) => {
        e.preventDefault();
        try {
            await api.post('/posts/', newPost);
            setNewPost({ title: '', content: '', team: '' });
            setShowCreate(false);
            fetchData();
        } catch (error) {
            alert('Error creating post');
        }
    };

    const toggleLike = async (postId) => {
        try {
            await api.post(`/posts/${postId}/like/`);
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) return <div className="loading">Loading posts...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 className="section-title">Community Posts</h2>
                <button className="btn-primary" onClick={() => setShowCreate(!showCreate)}>
                    {showCreate ? 'Cancel' : 'New Post'}
                </button>
            </div>

            {showCreate && (
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3>Create New Post</h3>
                    <form onSubmit={createPost}>
                        <div className="form-group">
                            <label>Team (optional)</label>
                            <select
                                className="input-field"
                                value={newPost.team}
                                onChange={(e) => setNewPost({ ...newPost, team: e.target.value })}
                            >
                                <option value="">Public</option>
                                {teams.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                className="input-field"
                                rows="4"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">Post</button>
                    </form>
                </div>
            )}

            <div className="posts-feed">
                {posts.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                        <p style={{ color: '#6b6258' }}>No posts yet. Be the first to share!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <h3>{post.title}</h3>
                                <span className="post-meta">
                                    {post.user.username} · {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p>{post.content}</p>
                            <div className="post-footer">
                                <button 
                                    className={`like-btn ${post.is_liked ? 'liked' : ''}`}
                                    onClick={() => toggleLike(post.id)}
                                >
                                    ❤️ {post.like_count}
                                </button>
                                <span>💬 {post.comment_count} comments</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CommunityPosts;