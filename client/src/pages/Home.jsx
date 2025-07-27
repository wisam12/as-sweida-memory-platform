import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
            <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{t.title}</h1>
            <p style={{ marginBottom: '30px' }}>{t.subtitle}</p>

            {heroes.length === 0 && (
                <p>{lang === 'ar' ? 'لا يوجد أبطال حالياً.' : 'No heroes yet.'}</p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {heroes.map((hero) => (
                    <div
                        key={hero.id}
                        style={{
                            background: '#111',
                            border: '1px solid #555',
                            padding: '15px',
                            borderRadius: '10px',
                            width: '300px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/profile', { state: { hero } })}
                    >
                        {hero.images.length > 0 && (
                            <img
                                src={hero.images[0]}
                                alt={hero.name}
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        )}
                        <h3 style={{ marginTop: '10px' }}>{hero.name}</h3>
                        <button style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            background: '#4caf50',
                            border: 'none',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                            {t.readMore}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
