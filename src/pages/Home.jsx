import React from 'react';
import { Link } from 'react-router-dom';

function Home({ isAuthenticated }) {
    return (
        <>
            <section className="hero">
                <h1>Track your <span>carbon footprint</span></h1>
                <p>
                    Understand your impact on the planet and take meaningful action.
                    Simple questions, clear insights, and practical steps.
                </p>
                <div className="btn-group">
                    {isAuthenticated ? (
                        <Link to="/calculator">
                            <button className="btn-primary">Calculate Now</button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/register">
                                <button className="btn-primary">Get Started</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn-secondary">Sign In</button>
                            </Link>
                        </>
                    )}
                </div>
            </section>

            <div className="features">
                <div className="feature-card">
                    <div className="icon">📊</div>
                    <h3>Calculate Your Impact</h3>
                    <p>Answer a few simple questions about your lifestyle and see your carbon footprint instantly.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">💡</div>
                    <h3>Get Personalized Insights</h3>
                    <p>Receive actionable tips tailored to your habits to help you reduce your carbon footprint.</p>
                </div>

                <div className="feature-card">
                    <div className="icon">📈</div>
                    <h3>Track Your Progress</h3>
                    <p>Monitor your improvements over time and see how small changes add up to make a difference.</p>
                </div>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e1e2a', marginBottom: '8px' }}>Why it matters</h3>
                <p style={{ color: '#6b6258', fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                    The average person produces about <strong style={{ color: '#2d6a4f' }}>4–5 tonnes of CO₂ per year</strong>.
                    Small changes in your daily habits can make a significant difference for the planet.
                </p>
            </div>
        </>
    );
}

export default Home;