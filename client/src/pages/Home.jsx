import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function Home({ setSelectedHero, setRoute }) {
    const { lang, t } = useLanguage();
    const [heroes, setHeroes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/heroes')
            .then(res => res.json())
            .then(data => setHeroes(data))
            .catch(err => console.error("Failed to load heroes:", err));
    }, []);

    return (
        <div style={{ padding: '30px', color: 'white' }}>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>

            {heroes.length === 0 && <p>{lang === 'ar' ? 'لا يوجد أبطال حالياً.' : 'No heroes yet.'}</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {heroes.map((hero) => (
                    <div
                        key={hero.id}
                        onClick={() => navigate("/profile", { state: { hero } })}
                        style={{
                            background: 'black',
                            border: '1px solid #555',
                            padding: '15px',
                            borderRadius: '10px',
                            width: '300px',
                            cursor: 'pointer'
                        }}
                    >
                        <h3>{hero.name}</h3>
                        <p>{hero.story}</p>

                        {/* ✅ Priority to profileImage, fallback to first image */}
                        {hero.profileImage ? (
                            <img
                                src={hero.profileImage}
                                alt={hero.name}
                                style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
                            />
                        ) : hero.images?.length > 0 && (
                            <img
                                src={hero.images[0]}
                                alt={hero.name}
                                style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
                            />
                        )}

                        {hero.videos?.length > 0 && (
                            <video controls width="100%">
                                <source src={hero.videos[0]} type="video/mp4" />
                            </video>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
