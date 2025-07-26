
import React from 'react'
import Home from './pages/Home'
import HeroProfile from './pages/HeroProfile'
import { LanguageProvider, useLanguage } from './LanguageContext'
import BackgroundAudio from './components/BackgroundAudio'
import UploadHeroModal from './components/UploadHeroModal';

function AppRoutes() {
  const [route, setRoute] = React.useState("home")
  const [selectedHero, setSelectedHero] = React.useState("")
  const { lang, setLang, t } = useLanguage()

  return (
    <div>
          <nav style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                  <button onClick={() => setRoute("home")}>{t.home}</button>
                  <UploadHeroModal />
              </div>
              <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ marginLeft: '10px' }}>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
              </select>
          </nav>
      {{
        home: <Home setRoute={setRoute} setSelectedHero={setSelectedHero} />,
        profile: <HeroProfile name={selectedHero} onBack={() => setRoute("home")} />
      }[route]}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
      <BackgroundAudio />
  </LanguageProvider>
  )
}
