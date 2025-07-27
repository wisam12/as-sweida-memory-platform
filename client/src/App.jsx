import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HeroProfile from './pages/HeroProfile';
import AdminPanel from './components/AdminPanel';
import BackgroundAudio from './components/BackgroundAudio';
import UploadHeroModal from './components/UploadHeroModal';
import { LanguageProvider, useLanguage } from './LanguageContext';

function MainLayout() {
    const [selectedHero, setSelectedHero] = React.useState(null);
    const { lang, setLang, t } = useLanguage();

    return (
        <div>
            <nav style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <a href="/">{t.home}</a>
                    <UploadHeroModal />
                </div>
                <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ marginLeft: '10px' }}>
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                </select>
            </nav>
            <Routes>
                <Route path="/" element={<Home setRoute={() => { }} setSelectedHero={setSelectedHero} />} />
                <Route path="/profile" element={<HeroProfile name={selectedHero} onBack={() => window.history.back()} />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/*" element={<MainLayout />} />
                </Routes>
                <BackgroundAudio />
            </Router>
        </LanguageProvider>
    );
}
