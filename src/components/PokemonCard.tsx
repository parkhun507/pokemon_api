import React from 'react';
import { Pokemon } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: '12px',
        padding: '15px',
        background: 'linear-gradient(135deg, #f0f4ff, #d9e4ff)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        userSelect: 'none',
      }}
      onClick={() => navigate(`/detail/${pokemon.id}`)}
      onMouseEnter={e => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1.05)';
        target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={e => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        width={96}
        style={{ borderRadius: '50%', marginBottom: '10px', border: '2px solid #4a90e2', background: 'white' }}
      />
      <p
        style={{
          fontWeight: '700',
          fontSize: '1.1rem',
          color: '#33475b',
          margin: 0,
          textTransform: 'capitalize',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {pokemon.name}
      </p>
    </div>
  );
};


export default PokemonCard;
