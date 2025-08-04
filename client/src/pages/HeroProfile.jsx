import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HeroProfile() {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const { state } = useLocation();
    const hero = state?.hero;

    console.log("HERO STATE:", state);
    console.log("HERO OBJ:", hero);

    if (!hero) return <p>{lang === 'ar' ? 'البطل غير موجود' : 'Hero not found'}</p>;

    const isRTL = lang === 'ar';

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '800px',
                margin: 'auto',
                color: 'white',
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
                position: 'relative'
            }}
        >
            {/* כפתור Back קבוע בצד שמאל */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    margin: '20px',
                    backgroundColor: '#444',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 10
                }}
            >
                {t.back}
            </button>

            <h2 style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '20px 0'
            }}>
                {hero.name}
            </h2>

            {/* סיפור הגבורה */}
            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{t.story}</h3>
                <p style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{hero.story}</p>
            </section>

            {/* גלריית תמונות נוספות */}
            {hero.images?.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{t.images}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {hero.images.filter(img => img !== hero.profileImage).map((img, index) => (
                            <img key={index} src={img} alt={`extra-${index}`} style={{ width: '100%', maxWidth: '250px', borderRadius: '8px' }} />
                        ))}
                    </div>
                </section>
            )}

            {/* סרטונים */}
            {hero.videos?.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{t.videos}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {hero.videos.map((video, index) => (
                            <video key={index} controls width="100%">
                                <source src={video} type="video/mp4" />
                                {lang === 'ar' ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support the video tag'}
                            </video>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
