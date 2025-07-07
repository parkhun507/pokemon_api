import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../types';
import { getKoreanName } from '../lib/getKoreanName';

const Home = () => {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const detailed = await Promise.all(
        data.results.map(async (poke: any) => {
          const res = await fetch(poke.url);
          const info = await res.json();
          return {
            id: info.id,
            name: getKoreanName(info.name),
            image: info.sprites.front_default,
            height: info.height,
            weight: info.weight,
            types: info.types.map((t: any) => t.type.name)
          };
        })
      );
      setPokemons(detailed);
    };
    fetchData();
  }, []);

  const filtered = pokemons.filter(p => p.name.includes(search));

return (
  <div
    style={{
      background: '#f0f4ff',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <h1
      style={{
        textAlign: 'center',
        color: '#33475b',
        fontSize: '2.8rem',
        marginBottom: '30px',
        fontWeight: '700',
      }}
    >
      포켓몬 도감
    </h1>

    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <input
        type="text"
        placeholder="포켓몬 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '280px',
          maxWidth: '90%',
          padding: '12px 18px',
          fontSize: '1rem',
          borderRadius: '30px',
          border: '1.8px solid #3b4cca',
          boxShadow: '0 2px 8px rgba(59, 76, 202, 0.2)',
          outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = '#6278ff';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(98, 120, 255, 0.4)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = '#3b4cca';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 76, 202, 0.2)';
        }}
      />
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '20px',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      {filtered.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  </div>
);}


export default Home;
