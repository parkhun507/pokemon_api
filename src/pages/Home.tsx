import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { getKoreanName } from '../lib/getKoreanName';
import { Pokemon } from '../types';


interface Props {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  toggleLike: (id: number) => void;
  showFavoritesOnly: boolean;
}

const Home: React.FC<Props> = ({
  pokemons,
  setPokemons,
  toggleLike,
  showFavoritesOnly
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (pokemons.length) return;

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
            types: info.types.map((t: any) => t.type.name),
            liked: false,
          };
        })
      );
      setPokemons(detailed);
    };
    fetchData();
  }, [pokemons, setPokemons]);

  const filtered = pokemons
    .filter(p => p.name.includes(search))
    .filter(p => !showFavoritesOnly || p.liked);

  return (
  <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
    {/* 상단 타이틀 */}
    <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>
      포켓몬 도감
    </h1>

    {/* 검색창 */}
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="포켓몬 검색"
        style={{
          padding: '12px 16px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '300px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      />
    </div>

    {/* 카드 그리드 */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '20px'
      }}
    >
      {filtered.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          toggleLike={toggleLike}
        />
      ))}
    </div>
  </div>
 );
};

export default Home;

