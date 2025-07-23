
import React from 'react'
import HeroCard from '../components/HeroCard'

export default function Home() {
  return (
    <div>
      <h1>As-Sweida Memory Platform</h1>
      <p>Welcome. Here we remember the heroes and victims of the As-Sweida massacre.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <HeroCard name="Ahmad Al-Khatib" story="Protected his family and saved 3 children." image="/src/assets/ahmad.jpg" />
        <HeroCard name="Layla Matar" story="Warned her neighbors before the attack." image="/src/assets/layla.jpg" />
      </div>
    </div>
  )
}
