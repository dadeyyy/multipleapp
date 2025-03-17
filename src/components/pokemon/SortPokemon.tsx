'use client';

import usePokemonSearch from '@/hooks/usePokemonSearch';
import { PokemonType } from './PokemonsList';

export default function SortPokemon({ pokemons }: { pokemons: PokemonType[] }) {
  const { filteredPokemons, searchTerm, setSearchTerm } = usePokemonSearch(pokemons);

  return <div>SortPokemon</div>;
}
