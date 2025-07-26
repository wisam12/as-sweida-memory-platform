import React from 'react'
import { useLanguage } from '../LanguageContext'

const heroData = {
    "ghassan": {
        nameKey: "name_ghassan",
        storyKey: "ghassanStory",
        video: "/videos/testimony1.mp4"
    },
    "aunt": {
        nameKey: "name_aunt",
        storyKey: "auntStory",
        video: "/videos/aunt_hikmat.mp4"
    },
    "hala": {
        nameKey: "name_hala",
        storyKey: "halaStory",
        video: "/public/heroes_input/hala_alkhatib/hala_alkhatib_vedio.mp4"
    }
}

export default function HeroProfile({ name, onBack }) {
    const { t } = useLanguage();
    const hero = heroData[name];
    if (!hero) return <p>Hero not found.</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: 'white' }}>
            <button onClick={onBack}>{t.back}</button>
            <h2 style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '20px 0'
            }}>
                {t[hero.nameKey]}
            </h2>
            <p>{t[hero.storyKey]}</p>
            {hero.video && (
                <video controls width="100%">
                    <source src={hero.video} type="video/mp4" />
                </video>
            )}
        </div>
    );
}
