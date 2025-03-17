// app/pokemon/page.tsx
import { Suspense } from 'react';
import PokemonList from '@/components/pokemon/PokemonsList';

async function fetchPokemons() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100', { cache: 'force-cache' });
  const data = await res.json();

  return data.results.map((pokemon: any) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
}

export default async function PokemonPage() {
  const pokemons = await fetchPokemons();

  return (
    <div className="flex flex-col gap-10 max-w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonList initialPokemons={pokemons} />
      </Suspense>
    </div>
  );
}
