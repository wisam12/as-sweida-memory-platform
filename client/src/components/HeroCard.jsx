
import React from 'react'

export default function HeroCard({ name, story, image, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        backgroundColor: '#111',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        margin: '10px',
        padding: '20px',
        width: '300px',
        textAlign: 'center',
        transition: 'transform 0.2s',
      }}
    >
      {image && (
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
        />
      )}
      <h3>{name}</h3>
      <p>{story}</p>
      <button style={{ backgroundColor: '#444', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px' }}>
        קרא עוד
      </button>
    </div>
  )
}
