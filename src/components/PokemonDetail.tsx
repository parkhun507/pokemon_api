import React from 'react';
import { Pokemon } from '../types';

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  return (
    <div
      style={{
        background: '#f9fbff',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: '40px auto',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          marginBottom: '20px',
          color: '#3b4cca',
          textTransform: 'capitalize',
        }}
      >
        {pokemon.name}
      </h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'contain',
          borderRadius: '50%',
          border: '4px solid #3b4cca',
          background: 'white',
          marginBottom: '25px',
          boxShadow: '0 4px 12px rgba(59, 76, 202, 0.3)',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '25px',
          color: '#555',
          fontWeight: '600',
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: '1rem' }}>📏 크기</p>
          <p style={{ margin: 0, fontSize: '1.2rem' }}>{pokemon.height} m</p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '1rem' }}>⚖️ 무게</p>
          <p style={{ margin: 0, fontSize: '1.2rem' }}>{pokemon.weight} kg</p>
        </div>
      </div>

      <div>
        <p style={{ fontWeight: '700', marginBottom: '10px' }}>타입</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {pokemon.types.map(type => (
            <span
              key={type}
              style={{
                backgroundColor: '#3b4cca',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '20px',
                fontWeight: '600',
                textTransform: 'capitalize',
                boxShadow: '0 2px 6px rgba(59, 76, 202, 0.4)',
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PokemonDetail;
