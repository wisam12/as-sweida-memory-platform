import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HeroProfile() {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const { state } = useLocation();
    const hero = state?.hero;

    if (!hero) return <p>{lang === 'ar' ? 'البطل غير موجود' : 'Hero not found'}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: 'white' }}>
            <button onClick={() => navigate(-1)}>{t.back}</button>

            <h2 style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '20px 0'
            }}>
                {hero.name}
            </h2>

            <p>{hero.story}</p>

            {hero.videos && hero.videos.length > 0 && (
                <video controls width="100%" style={{ marginTop: '20px' }}>
                    <source src={`http://localhost:5000${encodeURI(hero.videos[0])}`} type="video/mp4" />
                    {lang === 'ar'
                        ? 'المتصفح لا يدعم تشغيل الفيديو'
                        : 'Your browser does not support the video tag.'}
                </video>
            )}
        </div>
    );
}
