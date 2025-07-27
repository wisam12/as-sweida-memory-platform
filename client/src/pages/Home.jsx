import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useNavigate } from 'react-router-dom';
import HeroCard from '../components/HeroCard';

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
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>

            {heroes.length === 0 && (
                <p>{lang === 'ar' ? 'لا يوجد أبطال حالياً.' : 'No heroes yet.'}</p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {heroes.map((hero) => (
                    <HeroCard
                        key={hero.id}
                        name={hero.name}
                        image={hero.profileImage}
                        onClick={() => navigate('/hero', { state: { hero } })}
                    />
                ))}
            </div>
        </div>
    );
}
