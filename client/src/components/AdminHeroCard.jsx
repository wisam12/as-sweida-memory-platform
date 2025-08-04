import React, { useState } from 'react';
import './HeroCard.css';

export default function AdminHeroCard({ hero, onApprove, onReject }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    return (
        <div className="hero-card">
            {/* תמונת פרופיל */}
            {hero.profileImage && (
                <img
                    src={`${import.meta.env.VITE_API_URL}${hero.profileImage.replace('/heroes_input', '/pending_heroes')}`}
                    alt={hero.name}
                    className="hero-card-image"
                />
            )}
            <h3>{hero.name}</h3>

            {/* כפתורי ניהול */}
            <div style={{ marginTop: '10px' }}>
                <button
                    onClick={(e) => { e.stopPropagation(); onApprove(hero.id); }}
                    style={{ marginRight: '10px' }}
                >
                    ✅ Approve
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onReject(hero.id); }}
                >
                    ❌ Reject
                </button>
            </div>

            {/* כפתור צפייה בפרטים נוספים */}
            <button
                onClick={toggleExpand}
                style={{
                    marginTop: '10px',
                    backgroundColor: '#444',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                {expanded ? 'Hide Details' : 'View Details'}
            </button>

            {/* פרטי הגיבור (סיפור, תמונות, ווידאו) */}
            {expanded && (
                <div className="hero-details" style={{ marginTop: '10px', textAlign: 'left' }}>
                    {hero.story && (
                        <p style={{ whiteSpace: 'pre-wrap' }}>{hero.story}</p>
                    )}

                    {/* תמונות נוספות */}
                    {hero.images && hero.images.length > 0 && (
                        <div>
                            <h4>Images:</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {hero.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${import.meta.env.VITE_API_URL}${img.replace('/heroes_input', '/pending_heroes')}`}
                                        alt={`extra-${index}`}
                                        style={{ width: '100%', maxWidth: '120px', borderRadius: '5px' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* וידאו */}
                    {hero.videos && hero.videos.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                            <h4>Videos:</h4>
                            {hero.videos.map((video, index) => (
                                <video
                                    key={index}
                                    controls
                                    width="100%"
                                    style={{ borderRadius: '5px', marginBottom: '10px' }}
                                >
                                    <source
                                        src={`${import.meta.env.VITE_API_URL}${video.replace('/heroes_input', '/pending_heroes')}`}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
