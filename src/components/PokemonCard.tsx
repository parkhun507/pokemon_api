import React from 'react';
import { Pokemon } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  pokemon: Pokemon;
  toggleLike: (id: number) => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, toggleLike }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: '20px',
        background: pokemon.liked ? '#fce4ec' : '#f5f5f5',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px 10px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid #ddd',
      }}
      onClick={() => navigate(`/detail/${pokemon.id}`)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
    >
      <div
        style={{
          width: '96px',
          height: '96px',
          margin: '0 auto 10px',
          borderRadius: '50%',
          background: '#fff',
          border: '2px solid #90caf9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
        />
      </div>
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{pokemon.name}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(pokemon.id);
        }}
        style={{
          fontSize: '1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {pokemon.liked ? '❤️' : '♡'}
      </button>
    </div>
  );
};

export default PokemonCard;

