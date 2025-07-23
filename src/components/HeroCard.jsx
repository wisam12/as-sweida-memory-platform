
import React from 'react'

export default function HeroCard({ name, story, image }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px', padding: '10px', width: '200px' }}>
      <img src={image} alt={name} style={{ width: '100%', borderRadius: '4px' }} />
      <h3>{name}</h3>
      <p>{story}</p>
    </div>
  )
}
