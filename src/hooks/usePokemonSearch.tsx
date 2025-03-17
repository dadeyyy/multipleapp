// hooks/usePokemonSearch.ts
'use client';
import { useState, useEffect } from 'react';

type PokemonType = {
  name: string;
  url: string;
  image: string;
};

export default function usePokemonSearch(initialPokemons: PokemonType[]) {
  const [allPokemons] = useState<PokemonType[]>(initialPokemons);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonType[]>(initialPokemons);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPokemons(allPokemons);
      return;
    }

    const filtered = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPokemons(filtered);
  }, [searchTerm, allPokemons]);

  const sortPokemon = () => {
    const sortedPokemon = [...filteredPokemons].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredPokemons(sortedPokemon);
  };

  const sortUpload = () => {
    setFilteredPokemons(initialPokemons);
  };

  return {
    filteredPokemons,
    searchTerm,
    setSearchTerm,
    sortPokemon,
    sortUpload
  };
}
