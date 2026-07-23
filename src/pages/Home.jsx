import React from 'react';
import { Link } from 'react-router-dom';

function Home({ isAuthenticated }) {
    const heroStyle = {
        background: 'linear-gradient(135deg, #15803d, #064e3b)',
        color: 'white',
        padding: '60px 40px',
        borderRadius: '16px',
        textAlign: 'center',
        marginBottom: '32px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginTop: '32px'
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
    };

    const whyStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginTop: '32px',
        textAlign: 'center'
    };

    return (
        <div>
            <div style={heroStyle}>
                <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
                    🌍 Track Your Carbon Footprint
                </h1>
                <p style={{ fontSize: '20px', marginBottom: '24px' }}>
                    Understand your impact on the planet and take action to reduce it.
                </p>
                {isAuthenticated ? (
                    <Link to="/calculator">
                        <button style={{
                            backgroundColor: 'white',
                            color: '#15803d',
                            padding: '12px 32px',
                            border: 'none',
                            borderRadius: '9999px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Calculate Now →
                        </button>
                    </Link>
                ) : (
                    <Link to="/register">
                        <button style={{
                            backgroundColor: 'white',
                            color: '#15803d',
                            padding: '12px 32px',
                            border: 'none',
                            borderRadius: '9999px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Get Started →
                        </button>
                    </Link>
                )}
            </div>

            <div style={gridStyle}>
                <div style={cardStyle}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Calculate Your Impact</h3>
                    <p style={{ color: '#6b7280' }}>Answer simple questions about your lifestyle to see your carbon footprint.</p>
                </div>

                <div style={cardStyle}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>💡</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Get Personalized Tips</h3>
                    <p style={{ color: '#6b7280' }}>Receive actionable suggestions to reduce your footprint based on your habits.</p>
                </div>

                <div style={cardStyle}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📈</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Track Your Progress</h3>
                    <p style={{ color: '#6b7280' }}>See how your footprint changes over time and celebrate your improvements.</p>
                </div>
            </div>

            <div style={whyStyle}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>🌱 Why It Matters</h3>
                <p style={{ color: '#6b7280' }}>
                    The average person produces about <strong style={{ color: '#15803d' }}>4-5 tonnes of CO₂ per year</strong>.
                    Small changes can make a big difference. Join thousands of people tracking their climate impact!
                </p>
            </div>
        </div>
    );
}

export default Home;