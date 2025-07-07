import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../types';
import PokemonDetail from '../components/PokemonDetail';
import { getKoreanName } from '../lib/getKoreanName';

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      const detailed: Pokemon = {
        id: data.id,
        name: getKoreanName(data.name),
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t: any) => t.type.name)
      };
      setPokemon(detailed);
    };
    fetchDetail();
  }, [id]);

  if (!pokemon) return <p>불러오는 중...</p>;

  return <PokemonDetail pokemon={pokemon} />;
};

export default Detail;
