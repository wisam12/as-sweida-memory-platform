
import React from 'react'
import HeroCard from '../components/HeroCard'
import { useLanguage } from '../LanguageContext'

export default function Home({ setRoute, setSelectedHero }) {
  const { t } = useLanguage()

  const goToProfile = (name) => {
    setSelectedHero(name)
    setRoute("profile")
  }

  return (
    <div style={{ padding: '30px' }}>
          <h2 style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              margin: '20px 0'
          }}>
              {t.title}
          </h2>
      <p>{t.subtitle}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <HeroCard name={t.name_ghassan} story={t.ghassanStory} image="/src/assets/ghassan.jpg" onClick={() => goToProfile("ghassan")} />
        <HeroCard name={t.name_aunt} story={t.auntStory} image="/src/assets/aunt.jpg" onClick={() => goToProfile("aunt")} />
        <HeroCard name={t.name_hala} story={t.name_hala} image="/src/assets/aunt.jpg" onClick={() => goToProfile("hala")} />
      </div>
    </div>
  )
}
